import { cn } from '@/styles/tailwind';

interface InfoItemProps {
  icon: string;
  iconAlt: string;
  text: string;
  wrapStyle?: string;
  iconStyle?: string;
  textStyle?: string;
}

const InfoItem = ({
  icon,
  iconAlt,
  text,
  wrapStyle,
  iconStyle,
  textStyle,
}: InfoItemProps) => (
  <div className={cn('flex items-center', wrapStyle)}>
    <img className={iconStyle} src={icon} alt={iconAlt} />
    <p className={textStyle}>{text}</p>
  </div>
);

export default InfoItem;
