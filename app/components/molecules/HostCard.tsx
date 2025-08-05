import HeartFillIcon from '../atoms/icons/HeartFillIcon';

export default function HostCard({
  host,
}: {
  host: {
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
          className="w-full rounded-3xl object-cover"
        />
        <button className="absolute top-5 right-5">
          <HeartFillIcon className="size-8 text-error" />
        </button>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-t2">{host.nickname}</p>
        <p className="text-b3 text-gray-600">{host.introduction}</p>
      </div>
    </div>
  );
}
