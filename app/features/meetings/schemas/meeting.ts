import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

//모임 등록
export const createMeetingFirstSchema = z.object({
  name: z.string().min(2),
  introduction: z.string().min(10).max(1000),
  topicId: z.number().min(1).nullable(),
  hashtags: z
    .array(
      z.object({
        value: z
          .string()
          .trim()
          .min(1, '해시태그는 비어 있을 수 없습니다.')
          .max(20, '해시태그는 최대 20자까지 가능합니다.'),
      }),
    )
    .min(1, '해시태그는 최소 1개 이상 등록해야 합니다.'),
  thumbnailImage: z
    .instanceof(File, { message: '썸네일 이미지를 업로드해주세요.' })
    .refine((file) => file.size > 0, '파일이 비어있습니다.')
    .refine(
      (file) => file.type.startsWith('image/'),
      '이미지 파일만 업로드 가능합니다.',
    )
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `파일 크기는 ${MAX_FILE_SIZE / (1024 * 1024)}MB 이하이어야 합니다.`,
    )
    .nullable(),
  images: z
    .array(
      z.object({
        value: z
          .instanceof(File, { message: '유효한 이미지를 업로드해주세요.' })
          .refine((file) => file.size > 0, '파일이 비어있습니다.')
          .refine(
            (file) => file.type.startsWith('image/'),
            '이미지 파일만 업로드 가능합니다.',
          )
          .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            `파일 크기는 ${MAX_FILE_SIZE / (1024 * 1024)}MB 이하이어야 합니다.`,
          ),
      }),
    )
    .min(1, '이미지는 최소 1장 이상 등록해야 합니다.')
    .max(10, '이미지는 최대 10장까지 등록할 수 있습니다.'),
  hostDescription: z.string().min(10).max(500),
});

export const createMeetingSecondSchema = z
  .object({
    selectionType: z
      .enum(['선착순', '선발형'], {
        required_error: '모집 방법을 선택해주세요.',
      })
      .nullable(),
    meetingMode: z
      .enum(['온라인', '오프라인', '혼합'], {
        required_error: '모집 방식을 선택해주세요.',
      })
      .nullable(),
    minParticipants: z.coerce.number().min(1),
    maxParticipants: z.coerce.number().min(2).max(20),
    recruitingStartTime: z
      .date({
        required_error: '모집 시작일을 선택해주세요.',
      })
      .nullable(),
    recruitingEndTime: z
      .date({
        required_error: '모집 종료일을 선택해주세요.',
      })
      .nullable(),
    paymentAmount: z.coerce.number().min(0),
    info: z.string().min(10).max(2000),
  })
  .refine(
    (data) => {
      if (
        data.minParticipants !== undefined &&
        data.maxParticipants !== undefined
      ) {
        return data.maxParticipants >= data.minParticipants;
      }
      return true;
    },
    {
      message: '최대 인원은 최소 인원보다 크거나 같아야 합니다.',
      path: ['maxParticipants'],
    },
  )
  .refine(
    (data) => {
      if (data.recruitingStartTime && data.recruitingEndTime) {
        return data.recruitingEndTime >= data.recruitingStartTime;
      }
      return true;
    },
    {
      message: '모집 종료일은 시작일보다 빠를 수 없습니다.',
      path: ['recruitingEndTime'],
    },
  );

export const meetingScheduleSchema = z
  .object({
    meetingDate: z.string().min(1, '날짜를 선택해주세요.'),
    meetingStartTime: z.string().min(1, '시작 시간을 선택해주세요.'),
    meetingEndTime: z.string().min(1, '종료 시간을 선택해주세요.'),
    address: z.string().min(1, '모집 장소를 검색해주세요.'),
    addressDetail: z.string().min(1, '상세 주소를 입력해주세요.'),
  })
  .refine(
    (data) => {
      if (data.meetingDate && data.meetingStartTime && data.meetingEndTime) {
        const startDateTime = new Date(
          `${data.meetingDate}T${data.meetingStartTime}`,
        );
        const endDateTime = new Date(
          `${data.meetingDate}T${data.meetingEndTime}`,
        );
        return endDateTime > startDateTime;
      }
      return true;
    },
    {
      message: '종료 시간은 시작 시간보다 늦어야 합니다.',
      path: ['meetingEndTime'],
    },
  );

export const createMeetingFourthSchema = z.object({
  schedules: z
    .array(meetingScheduleSchema)
    .min(1, '최소 1개의 일정을 등록해야 합니다.'),
});

export const applyMeetingSchema = z.object({
  joinReason: z.string().min(10).max(500),
});

export const cancelMeetingReasonSchema = z.object({
  cancellationReasonType: z.enum(['개인일정', '단순변심', '위치', '기타'], {
    required_error: '취소 사유를 선택해주세요.',
  }),
  cancelReason: z
    .string()
    .min(10, '사유는 최소 10자 이상 작성해야 합니다.')
    .max(100, '사유는 최대 100자까지 작성할 수 있습니다.'),
});

// 모임 수정
export const editCreatedMeetingFirstSchema = z.object({
  name: z.string().min(2),
  introduction: z.string().min(10).max(1000),
  topicId: z.number().min(1).nullable(),
  hashtags: z
    .array(
      z.object({
        value: z
          .string()
          .trim()
          .min(1, '해시태그는 비어 있을 수 없습니다.')
          .max(20, '해시태그는 최대 20자까지 가능합니다.'),
      }),
    )
    .min(1, '해시태그는 최소 1개 이상 등록해야 합니다.'),
  thumbnailImage: z
    .instanceof(File, { message: '썸네일 이미지를 업로드해주세요.' })
    .refine((file) => file.size > 0, '파일이 비어있습니다.')
    .refine(
      (file) => file.type.startsWith('image/'),
      '이미지 파일만 업로드 가능합니다.',
    )
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `파일 크기는 ${MAX_FILE_SIZE / (1024 * 1024)}MB 이하이어야 합니다.`,
    )
    .optional(),
  images: z
    .array(
      z.object({
        value: z
          .instanceof(File, { message: '유효한 이미지를 업로드해주세요.' })
          .refine((file) => file.size > 0, '파일이 비어있습니다.')
          .refine(
            (file) => file.type.startsWith('image/'),
            '이미지 파일만 업로드 가능합니다.',
          )
          .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            `파일 크기는 ${MAX_FILE_SIZE / (1024 * 1024)}MB 이하이어야 합니다.`,
          ),
      }),
    )
    .max(10, '이미지는 최대 10장까지 등록할 수 있습니다.')
    .nullable(),
  hostDescription: z.string().min(10).max(500),
});

export const editCreatedMeetingSecondSchema = z
  .object({
    selectionType: z.enum(['선착순', '선발형'], {
      required_error: '모집 방법을 선택해주세요.',
    }),
    meetingMode: z.enum(['온라인', '오프라인', '혼합'], {
      required_error: '모집 방식을 선택해주세요.',
    }),
    minParticipants: z.coerce.number().min(1),
    maxParticipants: z.coerce.number().min(2).max(20),
    recruitingEndTime: z.string({
      required_error: '모집 종료일을 선택해주세요.',
    }),
    paymentAmount: z.coerce.number().min(0),
    info: z.string().min(10).max(2000),
  })
  .refine(
    (data) => {
      if (
        data.minParticipants !== undefined &&
        data.maxParticipants !== undefined
      ) {
        return data.maxParticipants >= data.minParticipants;
      }
      return true;
    },
    {
      message: '최대 인원은 최소 인원보다 크거나 같아야 합니다.',
      path: ['maxParticipants'],
    },
  );

export const editMeetingScheduleSchema = z
  .object({
    id: z.number().nullable(),
    meetingDate: z.string().min(1, '날짜를 선택해주세요.'),
    meetingStartTime: z.string().min(1, '시작 시간을 선택해주세요.'),
    meetingEndTime: z.string().min(1, '종료 시간을 선택해주세요.'),
    address: z.string().min(1, '모집 장소를 검색해주세요.'),
    addressDetail: z.string().min(1, '상세 주소를 입력해주세요.'),
  })
  .refine(
    (data) => {
      if (data.meetingDate && data.meetingStartTime && data.meetingEndTime) {
        const startDateTime = new Date(
          `${data.meetingDate}T${data.meetingStartTime}`,
        );
        const endDateTime = new Date(
          `${data.meetingDate}T${data.meetingEndTime}`,
        );
        return endDateTime > startDateTime;
      }
      return true;
    },
    {
      message: '종료 시간은 시작 시간보다 늦어야 합니다.',
      path: ['meetingEndTime'],
    },
  );

export const editCreatedMeetingThirdSchema = z.object({
  schedules: z
    .array(editMeetingScheduleSchema)
    .min(1, '최소 1개의 일정을 등록해야 합니다.'),
});

export const declareReasonSchema = z.object({
  reasonType: z.enum(
    [
      'ADVERTISEMENT',
      'SEXUAL',
      'PERSONAL_ATTACKS',
      'COMMERCIAL',
      'SPAM',
      'SPYWARE',
      'PRIVACY_VIOLATION',
      'OTHER',
    ],
    {
      required_error: '신고 사유를 선택해주세요.',
    },
  ),
  description: z
    .string()
    .min(10, '사유는 최소 10자 이상 작성해야 합니다.')
    .max(100, '사유는 최대 100자까지 작성할 수 있습니다.'),
});
