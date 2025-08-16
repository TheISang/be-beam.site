import { useEffect, useId, useMemo } from 'react';
import EditIcon from '../../../shared/components/icons/EditIcon';

export default function ProfileImageInput({
  image,
  onImageChange,
  defaultImage,
}: {
  image?: File;
  onImageChange: (file: File) => void;
  defaultImage?: string;
}) {
  const id = useId();

  const imageUrl = useMemo(() => {
    return image ? URL.createObjectURL(image) : defaultImage;
  }, [image, defaultImage]);

  useEffect(() => {
    return () => {
      if (image && imageUrl && imageUrl !== defaultImage) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, image, defaultImage]);

  return (
    <div className="relative flex size-25 items-center justify-center">
      <div className="relative">
        <img
          src={imageUrl}
          alt=""
          className="size-20 rounded-full object-cover"
        />
        <input
          hidden
          type="file"
          id={id}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onImageChange(file);
            }
          }}
        />
        <label
          htmlFor={id}
          className="absolute right-0 bottom-0 inline-flex size-5 cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-white"
        >
          <EditIcon className="size-3 text-gray-500" />
        </label>
      </div>
    </div>
  );
}
