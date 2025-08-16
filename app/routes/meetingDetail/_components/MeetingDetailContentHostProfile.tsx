import Text from '../../../shared/components/ui/Text';

interface MeetingDetailContentHostProfileProps {
  profileRef: React.ForwardedRef<HTMLDivElement>;
  hostImg: string;
  hostName: string;
}

export default function MeetingDetailContentHostProfile({
  profileRef,
  hostImg,
  hostName,
}: MeetingDetailContentHostProfileProps) {
  return (
    <div ref={profileRef} className="flex cursor-pointer flex-col items-center">
      <img
        className="h-16 w-16 rounded-full object-cover"
        src={hostImg}
        alt="host_img"
      />
      <div className="mt-3 flex items-center gap-x-1">
        <img src="/images/icons/host.svg" alt="host_icon" />
        <Text variant="B2_Medium">{hostName}</Text>
        <img
          className="h-[10px] w-[10px]"
          src="/images/icons/next.svg"
          alt="next_icon"
        />
      </div>
    </div>
  );
}
