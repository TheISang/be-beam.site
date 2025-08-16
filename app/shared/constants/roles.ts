export const USER_ROLES = {
  GENERAL_PARTICIPANT: '일반 참가자',
  SMALL_GROUP_HOST: '소모임 호스트',
  REGULAR_MEETING_HOST: '정기모임 호스트',
  ADMIN: '관리자',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// 역할 계층 구조 정의
export const ROLE_HIERARCHY = {
  [USER_ROLES.GENERAL_PARTICIPANT]: 1,
  [USER_ROLES.SMALL_GROUP_HOST]: 2,
  [USER_ROLES.REGULAR_MEETING_HOST]: 3,
  [USER_ROLES.ADMIN]: 4,
};

// 역할별 권한 확인 유틸리티
export const hasPermission = (
  userRole: UserRole,
  requiredRole: UserRole,
): boolean => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};
