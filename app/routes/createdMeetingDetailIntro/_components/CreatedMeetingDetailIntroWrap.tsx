import { useEffect, useRef, useState } from 'react';
import { useSuspenseQueries } from '@tanstack/react-query';
import useEditMeetingIntroMutation from '@/features/meetings/hooks/useEditMeetingIntroMutation';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { editCreatedMeetingFirstSchema } from '@/features/meetings/schemas/meeting';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { getMyCreatedMeetingIntro } from '@/shared/api/endpoints/users';
import { getTopics } from '@/shared/api/endpoints/topics';

import type { Topic } from '@/shared/types/entities';
import { cn } from '@/styles/tailwind';
import Text from '../../../shared/components/ui/Text';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { Textarea } from '../../../shared/components/ui/Textarea';

export default function CreatedMeetingDetailIntroWrap({
  meetingId,
}: {
  meetingId: number;
}) {
  const [{ data: intro }, { data: topics }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['createdMeetingIntro', meetingId],
        queryFn: () => getMyCreatedMeetingIntro(meetingId),
      },
      {
        queryKey: ['topics'],
        queryFn: () => getTopics(),
      },
    ],
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenSpanRef = useRef<HTMLSpanElement>(null);
  const [currentHashtagInput, setCurrentHashtagInput] = useState('');

  const [thumbnailImage, setThumbnailImage] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState([]);

  const { mutate: editCreateMeeting, isPending } = useEditMeetingIntroMutation(
    meetingId,
    existingImages,
  );

  const { control, handleSubmit, formState } = useForm<
    z.infer<typeof editCreatedMeetingFirstSchema>
  >({
    resolver: zodResolver(editCreatedMeetingFirstSchema),
    defaultValues: {
      name: intro.name ?? '',
      introduction: intro.introduction ?? '',
      topicId: intro.topicId ?? undefined,
      hashtags:
        intro.hashtags.map((hashtag: string) => ({ value: hashtag })) ?? [],
      thumbnailImage: undefined,
      images: [],
      hostDescription: intro.hostDescription ?? '',
    },
  });

  // 'hashtags' 배열 필드 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hashtags',
  });

  // 이미지 배열 필드 관리 (useFieldArray)
  const { append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: 'images',
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: File | undefined) => void,
  ) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const newImageUrl = URL.createObjectURL(file);
      setThumbnailImage(newImageUrl);
      fieldOnChange(file);
    }
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const currentTotalImages = images.length;
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
      setImages((prev) => [...prev, URL.createObjectURL(file)]);
    });
    e.target.value = '';
  };

  const handleAddHashtag = () => {
    const trimmedTag = currentHashtagInput.trim();
    if (trimmedTag && !fields.some((field) => field.value === trimmedTag)) {
      append({ value: trimmedTag });
      setCurrentHashtagInput('');
    }
  };

  useEffect(() => {
    if (intro) {
      setThumbnailImage(intro.meetingThumbnail);
      setImages(intro.meetingImages);
      setExistingImages(intro.meetingImages);
    }
  }, [intro]);

  useEffect(() => {
    if (hiddenSpanRef.current && inputRef.current) {
      const minWidth = 40;

      hiddenSpanRef.current.textContent = currentHashtagInput;
      const contentWidth = hiddenSpanRef.current.offsetWidth;
      const newWidth = Math.max(minWidth, contentWidth + 10);

      inputRef.current.style.width = `${newWidth}px`;
    }
  }, [currentHashtagInput]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);

        if (isPending) return;
        editCreateMeeting(data);
      })}
      className="w-full py-8"
    >
      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="thumbnailImage"
          className="mb-3 block text-t2 text-gray-900"
        >
          썸네일 이미지
        </label>

        <div className="relative h-32 w-32">
          <img
            className="h-full w-full overflow-hidden rounded-lg border-1 border-gray-300 object-cover"
            src={thumbnailImage}
            alt="meeting_thumbnail_image"
          />

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
                    handleFileChange(e, field.onChange);
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
      </div>

      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label htmlFor="name" className="mb-3 block text-t2 text-gray-900">
          모임명
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="모임명을 입력해주세요."
              value={field.value}
              onChange={(e) => field.onChange(e)}
              className="mt-3"
            />
          )}
        />
      </div>

      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
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
              onChange={(e) => field.onChange(e)}
              className="mt-1 h-[144px] bg-white"
            />
          )}
        />
      </div>

      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label htmlFor="topic" className="mb-3 block text-t2 text-gray-900">
          모집 토픽
        </label>
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
                  }}
                >
                  {topic.topic}
                </Button>
              ))}
            </>
          )}
        />
      </div>

      <div className="mb-4 box-border block w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label htmlFor="hashtags" className="mb-3 text-t2 text-gray-900">
          해쉬태그
        </label>

        <div className="flex w-full flex-wrap items-center gap-2">
          <div className="flex w-auto items-center bg-primary-light pr-2">
            <Input
              ref={inputRef}
              className="h-auto w-auto border-0 bg-transparent py-2 pl-2 text-b1 text-primary shadow-none"
              value={currentHashtagInput}
              onChange={(e) => setCurrentHashtagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddHashtag();
                }
              }}
            />
            <span
              ref={hiddenSpanRef}
              className="invisible absolute box-border p-2 whitespace-pre text-inherit"
            />

            <button
              onClick={() => setCurrentHashtagInput('')}
              className={cn(
                currentHashtagInput.length === 0 && 'hidden',
                'cursor-pointer',
              )}
            >
              <img src="/images/icons/orange_close.svg" alt="close_icon" />
            </button>
          </div>

          {fields.map((field, idx) => (
            <div key={idx}>
              <div className="flex gap-1 rounded-lg bg-primary-light p-2 text-b1 text-primary">
                {field.value}
                <button onClick={() => remove(idx)} className="cursor-pointer">
                  <img src="/images/icons/orange_close.svg" alt="close_icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <label
          htmlFor="meetingImages"
          className="mb-3 block text-t2 text-gray-900"
        >
          모임 사진
        </label>

        <div
          className={cn(
            images.length > 0 && 'flex',
            'w-full items-center gap-2',
          )}
        >
          <div className="flex items-center gap-2">
            {images.map((image, idx) => (
              <div key={idx} className="relative">
                <img
                  className="h-32 w-32 overflow-hidden rounded-lg border-1 border-gray-300 object-cover"
                  src={image}
                  alt="meeting_thumbnail_image"
                />
                <button
                  className="absolute top-2 right-2 cursor-pointer rounded-full bg-gray-300"
                  onClick={() => {
                    removeImage(idx);
                    setImages((prev) =>
                      prev.filter((_, index) => index !== idx),
                    );
                    setExistingImages((prev) =>
                      prev.filter((_, index) => index !== idx),
                    );
                  }}
                >
                  <img src="/images/icons/close.svg" alt="close_icon" />
                </button>
              </div>
            ))}
          </div>

          <label
            className={cn(
              images.length >= 10 && 'hidden',
              'flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-500',
            )}
          >
            <input
              id="meetingImages"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFilesChange}
            />
            <div className="flex flex-col items-center">
              <img
                className="h-5 w-5"
                src="/images/icons/camera.svg"
                alt="camera_icon"
              />
              <Text variant="B3_Regular" color="gray-500" className="mt-[6px]">
                {images.length}/10
              </Text>
            </div>
          </label>
        </div>
      </div>
      <div className="mb-4 box-border w-full rounded-lg border-1 border-gray-300 bg-gray-100 p-5">
        <Controller
          name="hostDescription"
          control={control}
          render={({ field }) => (
            <Textarea
              label="호스트 소개"
              labelClassName="block text-t2 text-gray-900"
              maxLength={1000}
              placeholder="호스트 소개를 입력해주세요."
              value={field.value}
              onChange={(e) => field.onChange(e)}
              className="mt-1 box-border h-[124px] w-full border border-gray-300 bg-white p-3 shadow-none"
            />
          )}
        />
      </div>

      <div className="flex w-full justify-center">
        <Button
          className="mt-5 min-w-100"
          type="submit"
          disabled={!formState.isValid || images.length === 0}
        >
          수정 완료
        </Button>
      </div>
    </form>
  );
}
