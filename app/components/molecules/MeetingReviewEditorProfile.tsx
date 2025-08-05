import Text from '../atoms/text/Text';

interface MeetingReviewEditorProfileProps {
  profileImg: string;
  nickname: string;
  createdAt: string;
}

export default function MeetingReviewEditorProfile({
  profileImg,
  nickname,
  createdAt,
}: MeetingReviewEditorProfileProps) {
  return (
    <div className="flex items-center gap-5">
      <img
        className="h-10 w-10 rounded-full object-cover"
        src={profileImg}
        alt="profile_img"
      />
      <div>
        <Text variant="B2_Medium" className="mb-1">
          {nickname}
        </Text>
        <Text variant="C2_Regular" color="gray-600">
          {createdAt.slice(0, 10)}
        </Text>
      </div>
    </div>
  );
}
