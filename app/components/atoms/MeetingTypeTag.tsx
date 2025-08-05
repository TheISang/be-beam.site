import { Tag } from './tag/Tag';

interface MeetingTypeTagProps {
  type: '정기모임' | '소모임';
}

export default function MeetingTypeTag({ type }: MeetingTypeTagProps) {
  return <Tag variant={type === '정기모임' ? 'blue' : 'primary'}>{type}</Tag>;
}
