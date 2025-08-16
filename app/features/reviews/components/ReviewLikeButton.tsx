import { cn } from '@/styles/tailwind';
import useLikeReviewMutation from '@/features/reviews/hooks/useLikeReviewMutation';
import useUnlikeReviewMutation from '@/features/reviews/hooks/useUnlikeReviewMutation';
import useUserSession from '@/features/users/hooks/useUserSession';
import HeartFillIcon from '@/shared/components/icons/HeartFillIcon';
import HeartIcon from '@/shared/components/icons/HeartIcon';

export default function ReviewLikeButton({
  reviewId,
  liked,
  likesCount,
}: {
  reviewId: number;
  liked: boolean;
  likesCount: number;
}) {
  const { user } = useUserSession();
  const likeMutation = useLikeReviewMutation();
  const unlikeMutation = useUnlikeReviewMutation();

  const handleLike = () => {
    if (!user) {
      return alert('로그인 후 이용해주세요.');
    }
    if (liked) {
      unlikeMutation.mutate({ reviewId });
    } else {
      likeMutation.mutate({ reviewId });
    }
  };

  return (
    <button
      className={cn(
        'flex items-center gap-1 rounded-[28px] border py-2 pr-4 pl-3 text-t4',
        liked
          ? 'border-primary bg-primary-light text-primary'
          : 'border-gray-300 bg-white text-gray-500',
      )}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      onClick={handleLike}
    >
      {liked ? (
        <HeartFillIcon className="size-6 text-primary" />
      ) : (
        <HeartIcon className="size-6 text-gray-500" />
      )}
      <span>좋아요 | {likesCount}</span>
    </button>
  );
}
