import React, { useCallback, useMemo, useRef, useState } from 'react';
import CameraIcon from '@/shared/components/icons/CameraIcon';
import CloseIcon from '@/shared/components/icons/CloseIcon';
import { FormMessage } from '../ui/FormMessage';

// ========== Types ==========
interface ImageItem {
  id: string;
  type: 'existing' | 'new';
  url?: string;
  file?: File;
  preview?: string;
  originalIndex: number;
}

interface ImageInputProps {
  maxImages?: number;
  existingImages?: string[];
  newImages?: (File & { _uniqueId?: string })[];
  onChange?: (data: {
    existingImages: string[];
    newImages: (File & { _uniqueId?: string })[];
  }) => void;
  className?: string;
  disabled?: boolean;
  error?: string;
}

// ========== Utility Functions (Single Responsibility) ==========
const createUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const createFileWithUniqueId = (
  file: File,
  counter: number,
): File & { _uniqueId: string } => {
  const uniqueId = `${createUniqueId()}-${counter}`;

  Object.defineProperty(file, '_uniqueId', {
    value: uniqueId,
    enumerable: false,
    writable: false,
    configurable: false,
  });

  return file as File & { _uniqueId: string };
};

const createUrlHash = (url: string): string => {
  return btoa(url).replace(/[/+=]/g, '').slice(0, 8);
};

// ========== Custom Hooks (Separation of Concerns) ==========
const useImageCounter = () => {
  const [counter, setCounter] = useState(0);
  const incrementCounter = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  return { counter, incrementCounter };
};

const usePreviewUrls = () => {
  const [previewUrls, setPreviewUrls] = useState<Map<string, string>>(
    new Map(),
  );

  const addPreviewUrl = useCallback((id: string, file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrls((prev) => new Map(prev).set(id, url));
    return url;
  }, []);

  const removePreviewUrl = useCallback((id: string) => {
    setPreviewUrls((prev) => {
      const url = prev.get(id);
      if (url) {
        URL.revokeObjectURL(url);
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      }
      return prev;
    });
  }, []);

  const cleanupUnusedUrls = useCallback((validIds: Set<string>) => {
    setPreviewUrls((prev) => {
      const urlsToRevoke: string[] = [];
      const newMap = new Map(prev);

      prev.forEach((url, id) => {
        if (id.startsWith('new-') && !validIds.has(id)) {
          urlsToRevoke.push(url);
          newMap.delete(id);
        }
      });

      urlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
      return newMap;
    });
  }, []);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return { previewUrls, addPreviewUrl, removePreviewUrl, cleanupUnusedUrls };
};

// ========== Image Items Factory (Factory Pattern) ==========
const createImageItems = (
  existingImages: string[],
  newImages: (File & { _uniqueId?: string })[],
  previewUrls: Map<string, string>,
  addPreviewUrl: (id: string, file: File) => string,
): ImageItem[] => {
  const items: ImageItem[] = [];

  // Create existing image items
  existingImages.forEach((url, index) => {
    const urlHash = createUrlHash(url);
    items.push({
      id: `existing-${urlHash}-${index}`,
      type: 'existing',
      url,
      originalIndex: index,
    });
  });

  // Create new image items
  newImages.forEach((file, index) => {
    const uniqueId = file._uniqueId || createUniqueId();
    const id = `new-${uniqueId}`;

    let preview = previewUrls.get(id);
    if (!preview) {
      preview = addPreviewUrl(id, file);
    }

    items.push({
      id,
      type: 'new',
      file,
      preview,
      originalIndex: index,
    });
  });

  return items;
};

// ========== Event Handlers (Single Responsibility) ==========
const useImageHandlers = (
  existingImages: string[],
  newImages: (File & { _uniqueId?: string })[],
  maxImages: number,
  onChange?: ImageInputProps['onChange'],
  removePreviewUrl?: (id: string) => void,
) => {
  const { counter, incrementCounter } = useImageCounter();

  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;

      const filesArray = Array.from(files);
      const totalImages = existingImages.length + newImages.length;
      const availableSlots = maxImages - totalImages;
      const filesToAdd = filesArray.slice(0, availableSlots);

      if (filesToAdd.length > 0) {
        const filesWithUniqueIds = filesToAdd.map((file) => {
          incrementCounter();
          return createFileWithUniqueId(file, counter);
        });

        const updatedNewImages = [...newImages, ...filesWithUniqueIds];
        onChange?.({
          existingImages: [...existingImages],
          newImages: updatedNewImages,
        });
      }
    },
    [existingImages, newImages, maxImages, onChange, counter, incrementCounter],
  );

  const handleRemoveImage = useCallback(
    (item: ImageItem) => {
      if (item.type === 'existing') {
        const updatedExisting = existingImages.filter(
          (_, i) => i !== item.originalIndex,
        );
        onChange?.({
          existingImages: updatedExisting,
          newImages: [...newImages],
        });
      } else {
        const updatedNew = newImages.filter((_, i) => i !== item.originalIndex);
        removePreviewUrl?.(item.id);
        onChange?.({
          existingImages: [...existingImages],
          newImages: updatedNew,
        });
      }
    },
    [existingImages, newImages, onChange, removePreviewUrl],
  );

  return { handleFileSelect, handleRemoveImage };
};

// ========== UI Components (Interface Segregation) ==========
const ImageItem: React.FC<{
  item: ImageItem;
  onRemove: () => void;
  disabled?: boolean;
}> = ({ item, onRemove, disabled }) => (
  <div key={item.id} className="relative size-26 overflow-hidden rounded-lg">
    <img
      src={item.type === 'existing' ? item.url : item.preview}
      alt="업로드된 이미지"
      className="h-full w-full object-cover"
    />
    <button
      type="button"
      className="absolute top-1.5 right-1.5 size-4 cursor-pointer rounded-full bg-gray-300"
      disabled={disabled}
      onClick={onRemove}
      aria-label="이미지 삭제"
    >
      <CloseIcon className="size-4 text-gray-800" />
    </button>
  </div>
);

const UploadButton: React.FC<{
  onClick: () => void;
  totalImages: number;
  maxImages: number;
  disabled?: boolean;
}> = ({ onClick, totalImages, maxImages, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex size-26 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-500 transition-colors hover:bg-gray-50"
    >
      <CameraIcon className="size-6 text-gray-500" />
      <span className="text-xs text-gray-500">
        {totalImages}/{maxImages}
      </span>
    </button>
  );
};

// ========== Main Component (Open/Closed Principle) ==========
export const ImageInput: React.FC<ImageInputProps> = ({
  maxImages = 10,
  existingImages = [],
  newImages = [],
  onChange,
  className = '',
  disabled = false,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { previewUrls, addPreviewUrl, removePreviewUrl, cleanupUnusedUrls } =
    usePreviewUrls();

  // Memoized image items
  const imageItems = useMemo(() => {
    return createImageItems(
      existingImages,
      newImages,
      previewUrls,
      addPreviewUrl,
    );
  }, [existingImages, newImages, previewUrls, addPreviewUrl]);

  // Event handlers
  const { handleFileSelect, handleRemoveImage } = useImageHandlers(
    existingImages,
    newImages,
    maxImages,
    onChange,
    removePreviewUrl,
  );

  // Cleanup unused preview URLs
  React.useEffect(() => {
    const validIds = new Set(
      newImages
        .map((file) => (file._uniqueId ? `new-${file._uniqueId}` : ''))
        .filter((id) => id !== 'new-'),
    );
    cleanupUnusedUrls(validIds);
  }, [newImages, cleanupUnusedUrls]);

  const handleUploadClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  const handleFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(event.target.files);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [handleFileSelect],
  );

  const totalImages = imageItems.length;
  const canAddMore = totalImages < maxImages && !disabled;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Image Grid */}
      {imageItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {imageItems.map((item) => (
            <ImageItem
              key={item.id}
              item={item}
              onRemove={() => handleRemoveImage(item)}
              disabled={disabled}
            />
          ))}

          {/* Upload Button in Grid */}
          {canAddMore && (
            <UploadButton
              onClick={handleUploadClick}
              totalImages={totalImages}
              maxImages={maxImages}
              disabled={disabled}
            />
          )}
        </div>
      )}

      {/* Initial Upload Button */}
      {imageItems.length === 0 && (
        <UploadButton
          onClick={handleUploadClick}
          totalImages={totalImages}
          maxImages={maxImages}
          disabled={disabled}
        />
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />
      {/* Error message */}
      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
};
