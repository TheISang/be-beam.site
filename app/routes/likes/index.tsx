import { Chip } from '@/shared/components/ui/Chip';
import ArrowRightIcon from '@/shared/components/icons/ArrowRightIcon';
import { Tag } from '@/shared/components/ui/Tag';
import { Link, useSearchParams } from 'react-router';
import { metaTemplates } from '@/shared/config/meta-templates';

export function meta() {
  return metaTemplates.likes();
}

const wishListTabs: {
  label: string;
  value: string;
}[] = [
  {
    label: '정기모임',
    value: 'regular',
  },
  {
    label: '소모임',
    value: 'small',
  },
  {
    label: '후기',
    value: 'review',
  },
  {
    label: '호스트',
    value: 'host',
  },
];

const wishMeetingList: {
  id: number;
  name: string;
  type: 'regular' | 'small';
  image: string;
  status: string;
  location: string;
  startMeetingDate: string;
  isLiked: boolean;
}[] = [
  {
    id: 1,
    name: '인문학 원데이 독서 모임',
    type: 'regular',
    image: 'https://picsum.photos/id/1/400/400',
    status: '모집중',
    location: '부산 동래구 복천동',
    startMeetingDate: '2025-06-20',
    isLiked: false,
  },
  {
    id: 2,
    name: '서점 탐방 모임',
    type: 'small',
    image: 'https://picsum.photos/id/2/400/400',
    status: '모집중',
    location: '서울 강남구 역삼동',
    startMeetingDate: '2025-06-27',
    isLiked: false,
  },
  {
    id: 3,
    name: '산책 모임',
    type: 'regular',
    image: 'https://picsum.photos/id/3/400/400',
    status: '모집중',
    location: '인천 부평구 부평동',
    startMeetingDate: '2025-07-01',
    isLiked: false,
  },
  {
    id: 4,
    name: '게임 모임',
    type: 'small',
    image: 'https://picsum.photos/id/4/400/400',
    status: '모집중',
    location: '경기 안산시 상록구',
    startMeetingDate: '2025-07-03',
    isLiked: false,
  },
];

const wishReviewList: {
  id: number;
  author: {
    id: number;
    name: string;
    profileImage: string;
  };
  meeting: {
    id: number;
    name: string;
  };
  rating: number;
  content: string;
  images: string[];
  createdAt: string;
}[] = [
  {
    id: 1,
    meeting: {
      id: 1,
      name: '인문학 원데이 독서 모임',
    },
    rating: 5,
    content: '후기 내용',
    images: ['https://picsum.photos/id/1/400/400'],
    createdAt: '2025-06-20',
    author: {
      id: 1,
      name: '이름',
      profileImage: 'https://picsum.photos/id/1/400/400',
    },
  },
  {
    id: 2,
    meeting: {
      id: 2,
      name: '서점 탐방 모임',
    },
    rating: 5,
    content: '후기 내용',
    images: ['https://picsum.photos/id/2/400/400'],
    createdAt: '2025-06-27',
    author: {
      id: 2,
      name: '이름',
      profileImage: 'https://picsum.photos/id/2/400/400',
    },
  },
  {
    id: 3,
    meeting: {
      id: 3,
      name: '산책 모임',
    },
    rating: 5,
    content: '후기 내용',
    images: ['https://picsum.photos/id/3/400/400'],
    createdAt: '2025-07-01',
    author: {
      id: 3,
      name: '이름',
      profileImage: 'https://picsum.photos/id/3/400/400',
    },
  },
  {
    id: 4,
    meeting: {
      id: 4,
      name: '게임 모임',
    },
    rating: 5,
    content: '후기 내용',
    images: ['https://picsum.photos/id/4/400/400'],
    createdAt: '2025-07-03',
    author: {
      id: 4,
      name: '이름',
      profileImage: 'https://picsum.photos/id/4/400/400',
    },
  },
];

export default function Wishlist() {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedTab = searchParams.get('tab') || 'regular';

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-2.5">
        <h1 className="text-h2">찜리스트</h1>
        <p className="text-b2 text-gray-600">
          참여 완료한 모임의 후기를 작성할 수 있어요.
        </p>
      </div>
      <div className="mt-12 flex gap-3">
        {wishListTabs.map((tab) => (
          <Chip
            key={tab.value}
            variant={selectedTab === tab.value ? 'primary' : 'secondary'}
            asChild
          >
            <button
              onClick={() => setSearchParams({ tab: tab.value })}
              className="cursor-pointer"
            >
              {tab.label}
            </button>
          </Chip>
        ))}
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-5">
          {selectedTab === 'regular'
            ? wishMeetingList.map((meeting) => (
                <WishMeetingCard key={meeting.id} meeting={meeting} />
              ))
            : wishReviewList.map((review) => (
                <WishReviewCard key={review.id} review={review} />
              ))}
        </div>
      </div>
    </div>
  );
}

function WishMeetingCard({
  meeting,
}: {
  meeting: (typeof wishMeetingList)[0];
}) {
  return (
    <div key={meeting.id} className="relative flex flex-col gap-3">
      <img src={meeting.image} alt={meeting.name} className="rounded-3xl" />
      <div className="absolute top-5 left-4.5">
        <Tag variant="blue">{meeting.status}</Tag>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-b2 text-primary">
          {meeting.type === 'regular' ? '정기모임' : '소모임'}
        </span>
        <p className="text-t2">{meeting.name}</p>
      </div>
      <div className="flex flex-col gap-1 text-b1 text-gray-600">
        <p>{meeting.location}</p>
        <p>
          {new Intl.DateTimeFormat('ko-KR', {
            month: 'long',
            day: 'numeric',
          }).format(new Date(meeting.startMeetingDate))}
        </p>
      </div>
    </div>
  );
}

function WishReviewCard({ review }: { review: (typeof wishReviewList)[0] }) {
  return (
    <div
      key={review.id}
      className="rounded-2xl border border-gray-300 px-6.5 pt-6.5 pb-6"
    >
      <div className="flex gap-4.5">
        <img
          src={review.author.profileImage}
          alt={review.author.name}
          className="size-10 rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-b2 text-gray-800">{review.author.name}</p>
          <p className="text-c2 text-gray-600">{review.createdAt}</p>
        </div>
      </div>
      <div className="mt-4">
        {Array.from({ length: review.rating }).map((_, index) => (
          <span key={index}>⭐</span>
        ))}
      </div>
      <div className="mt-5.5">
        <p className="text-b1 text-gray-600">{review.content}</p>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-3 gap-1.5">
          {review.images.map((image) => (
            <img
              key={image}
              src={image}
              alt="review"
              className="aspect-square rounded-lg"
            />
          ))}
        </div>
      </div>
      <div className="mt-6">
        <Link
          to={`/meeting/${review.id}`}
          className="flex items-center gap-1 text-t3 text-gray-600"
        >
          <span>`{review.meeting.name}` 모임 보러가기</span>
          <ArrowRightIcon className="size-6" />
        </Link>
      </div>
      <div className="mt-8">
        <button>좋아요</button>
      </div>
    </div>
  );
}
