import HeartIcon from '@/shared/components/icons/HeartIcon';
import HeartFillIcon from '../../../shared/components/icons/HeartFillIcon';
export default function HostCard({
  host,
}: {
  host: {
    id: number;
    liked?: boolean;
    profileImage: string;
    nickname: string;
    introduction: string;
  };
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <img
          src={host.profileImage}
          alt={host.nickname}
          className="h-[226px] w-full rounded-3xl object-cover"
        />
        {host.liked !== undefined && (
          <button className="absolute top-5 right-5">
            {host.liked ? (
              <HeartFillIcon className="size-8 text-error" />
            ) : (
              <HeartIcon className="size-8 text-white" />
            )}
          </button>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-t2">{host.nickname}</p>
        <p className="text-b3 text-gray-600">{host.introduction}</p>
      </div>
    </div>
  );
}
