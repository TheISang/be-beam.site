import React, { useEffect, useState } from 'react';
import useTopicsQuery from '@/features/meetings/hooks/useTopicsQuery';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { createMeetingFirstSchema } from '@/features/meetings/schemas/meeting';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import { cn } from '@/styles/tailwind';
import type { CreateMeeting } from '@/shared/types/components';
import type { Topic } from '@/shared/types/entities';
import Text from '@/shared/components/ui/Text';
import { Input } from '@/shared/components/ui/Input';
import { Textarea } from '@/shared/components/ui/Textarea';
import { Button } from '@/shared/components/ui/Button';
import { Tag } from '@/shared/components/ui/Tag';

interface CreateMeetingSecondContentProps {
  tab: number;
  setTab: (tab: number) => void;
  form: CreateMeeting;
  setForm: (form: CreateMeeting) => void;
}

export default function CreateMeetingSecondContent({
  tab,
  setTab,
  form,
  setForm,
}: CreateMeetingSecondContentProps) {
  const { control, handleSubmit, formState } = useForm<
    z.infer<typeof createMeetingFirstSchema>
  >({
    resolver: zodResolver(createMeetingFirstSchema),
    defaultValues: {
      name: form.name ?? '',
      introduction: form.introduction ?? '',
      topicId: form.topicId ?? undefined,
      hashtags: form.hashtags.map((hashtag) => ({ value: hashtag })) ?? [],
      thumbnailImage: form.thumbnailImage ?? undefined,
      images: form.images.map((image) => ({ value: image })) ?? [],
      hostDescription: form.hostDescription ?? '',
    },
  });

  // 'hashtags' 배열 필드 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hashtags',
  });

  // 이미지 배열 필드 관리 (useFieldArray)
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: 'images',
  });

  const { data: topics } = useTopicsQuery();

  const [currentHashtagInput, setCurrentHashtagInput] = useState('');
  const [thumbnailImagePreview, setThumbnailImagePreview] = useState(
    form.thumbnailImagePreview ?? '',
  );

  const handleAddHashtag = () => {
    const trimmedTag = currentHashtagInput.trim();
    if (trimmedTag && !fields.some((field) => field.value === trimmedTag)) {
      append({ value: trimmedTag });
      setForm({ ...form, hashtags: [...form.hashtags, trimmedTag] });
      setCurrentHashtagInput('');
    }
  };

  const handleKeyDownOnHashtagInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddHashtag();
    }
  };

  const handleThumbnailChange = (
    file: File | undefined,
    fieldOnChange: (value: File | undefined) => void,
  ) => {
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setThumbnailImagePreview(newImageUrl);
      fieldOnChange(file);
      setForm({
        ...form,
        thumbnailImage: file,
        thumbnailImagePreview: newImageUrl,
      });
    } else {
      setThumbnailImagePreview('');
      fieldOnChange(undefined);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const currentTotalImages = imageFields.length;
    const newFilesCount = files.length;

    const MAX_IMAGES = 10;

    if (currentTotalImages >= MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}장까지 등록할 수 있습니다.`);
      e.target.value = '';
      return;
    }
    if (currentTotalImages + newFilesCount > MAX_IMAGES) {
      alert(
        `이미지는 최대 ${MAX_IMAGES}장까지 등록할 수 있습니다. 현재 ${currentTotalImages}장, ${newFilesCount}장 추가 시도.`,
      );
      e.target.value = '';
      return;
    }

    const filesToAppend: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 10MB
      if (!file.type.startsWith('image/') || file.size > FILE_SIZE_LIMIT) {
        alert(
          `"${file.name}" 파일은 이미지 형식이 아니거나 10MB를 초과합니다.`,
        );
        continue;
      }
      filesToAppend.push(file);
    }

    filesToAppend.forEach((file) => {
      appendImage({ value: file });
    });
    e.target.value = '';
  };

  useEffect(() => {
    if (imageFields) {
      setForm({
        ...form,
        images: [...imageFields.map((image) => image.value)],
        imagesPreview: [
          ...imageFields.map((image) => URL.createObjectURL(image.value)),
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFields, setForm]);

  return (
    <form onSubmit={handleSubmit(() => setTab(tab + 1))} className="w-full">
      <div className="w-full">
        <div className="mb-7 w-full">
          <Text variant="T2_Semibold">모임명</Text>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="모임명을 입력해주세요."
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  setForm({ ...form, name: e.target.value });
                }}
                className="mt-3"
              />
            )}
          />
        </div>

        <div className="mb-7 w-full">
          <Controller
            name="introduction"
            control={control}
            render={({ field }) => (
              <Textarea
                label="모임 소개"
                labelClassName="text-t2"
                maxLength={1000}
                placeholder="모임 소개를 입력해주세요."
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  setForm({ ...form, introduction: e.target.value });
                }}
                className="mt-1 h-[144px]"
              />
            )}
          />
        </div>

        <div className="mb-7 w-full">
          <Text variant="T2_Semibold">모집 토픽</Text>
          <Controller
            name="topicId"
            control={control}
            render={({ field }) => (
              <>
                {topics?.map((topic: Topic) => (
                  <Button
                    type="button"
                    key={topic.id}
                    variant="tertiary"
                    className={cn(
                      'mt-3 mr-2 h-9 rounded-md border-gray-300 px-4 text-b1',
                      field.value === topic.id
                        ? 'border-primary bg-primary-light text-primary'
                        : 'bg-white text-black',
                    )}
                    onClick={() => {
                      field.onChange(
                        field.value === topic.id ? undefined : topic.id,
                      );
                      setForm({ ...form, topicId: topic.id });
                    }}
                  >
                    {topic.topic}
                  </Button>
                ))}
              </>
            )}
          />
        </div>

        <div className="mb-7 w-full">
          <Text variant="T2_Semibold">해쉬태그</Text>
          <Input
            placeholder="해시태그를 입력해 주세요"
            className="mt-3 flex-1"
            value={currentHashtagInput}
            onChange={(e) => setCurrentHashtagInput(e.target.value)}
            onKeyDown={handleKeyDownOnHashtagInput}
          />

          <div className="mt-3 flex w-full flex-wrap items-center gap-2">
            {fields.map((field, idx) => (
              <div
                key={field.id}
                className="flex h-7 items-center rounded-md bg-primary-light px-3 py-1 text-sm text-primary"
              >
                <span>{field.value}</span>
                <button
                  type="button"
                  onClick={() => {
                    remove(idx);
                    setForm({
                      ...form,
                      hashtags: form.hashtags.filter(
                        (_, index) => index !== idx,
                      ),
                    });
                  }}
                  className="ml-2 text-blue-800 hover:text-blue-600 focus:outline-none"
                >
                  <img src="images/icons/orange_close.svg" alt="close_icon" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-7 w-full">
          <Text variant="T2_Semibold">사진 등록</Text>

          <div className="mt-3 flex w-full items-start gap-3">
            <div className="relative h-[316px] w-[316px] rounded-lg border-1 border-gray-300">
              <img
                className={cn(
                  thumbnailImagePreview === '' && 'hidden',
                  'h-full w-full overflow-hidden rounded-lg object-cover',
                )}
                src={thumbnailImagePreview}
                alt="meeting_thumbnail_image"
              />

              <Tag
                variant="primary"
                className="absolute top-2 left-2 px-2 py-[6px] text-c1"
              >
                대표이미지
              </Tag>

              <Controller
                name="thumbnailImage"
                control={control}
                render={({ field }) => (
                  <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-1 border-white bg-[rgba(0,0,0,0.1)] p-3 transition-all duration-700 hover:bg-[rgba(121,107,107,0.2)]">
                    <input
                      name={field.name}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={field.ref}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        handleThumbnailChange(file, field.onChange);
                      }}
                    />
                    <img
                      className="h-5 w-5"
                      src="/images/icons/w_camera.svg"
                      alt="camera_icon"
                    />
                  </label>
                )}
              />
            </div>

            <div className="grid flex-1 grid-cols-5 items-start gap-2">
              {imageFields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative aspect-square w-full rounded-lg"
                >
                  <img
                    src={URL.createObjectURL(field.value)}
                    alt={`추가 이미지 ${index + 1}`}
                    className="h-full w-full overflow-hidden rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      removeImage(index);
                      URL.revokeObjectURL(URL.createObjectURL(field.value));
                    }}
                    className="absolute top-1 right-1 z-10 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-xs font-bold text-white"
                  >
                    <img src="/images/icons/close.svg" alt="close_icon" />
                  </button>
                </div>
              ))}

              <div
                className={cn(
                  imageFields.length === 10 && 'hidden',
                  'relative aspect-square w-full rounded-lg border-1 border-gray-300',
                )}
              >
                <label className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-1 border-white bg-[rgba(0,0,0,0.1)] p-3 transition-all duration-700 hover:bg-[rgba(121,107,107,0.2)]">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImagesChange}
                  />
                  <img
                    className="h-5 w-5"
                    src="/images/icons/w_camera.svg"
                    alt="add_image_icon"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="mt-3 box-border rounded-lg bg-gray-200 p-3 text-b3 text-gray-600">
            <ul className="specific-dot-list">
              <li>업로드 가능한 파일 형식: JPG, JPEG, PNG(10MB 이하)</li>
              <li>
                모임 사진은 대표이미지(썸네일) 제외 최대 10장까지 등록
                가능합니다.
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-7 w-full">
          <Controller
            name="hostDescription"
            control={control}
            render={({ field }) => (
              <Textarea
                label="호스트 소개"
                labelClassName="text-t2"
                maxLength={1000}
                placeholder="호스트 소개를 입력해주세요."
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  setForm({ ...form, hostDescription: e.target.value });
                }}
                className="mt-1 h-[144px]"
              />
            )}
          />
        </div>
      </div>

      <div className="mt-20 flex w-full items-center gap-3">
        <Button
          type="button"
          variant="tertiary"
          onClick={() => setTab(tab - 1)}
          className="w-[50%]"
        >
          이전
        </Button>
        <Button disabled={!formState.isValid} className="w-[50%]">
          다음
        </Button>
      </div>
    </form>
  );
}
