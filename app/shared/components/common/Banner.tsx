import { cn } from '@/styles/tailwind';

interface MeetingBannerProps {
  imageUrl: string;
  height: string;
}

export default function Banner({ imageUrl, height }: MeetingBannerProps) {
  return (
    <div
      className={cn(
        `${height} w-full overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat`,
      )}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  );
}
