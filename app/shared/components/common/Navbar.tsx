'use client';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import Logo from '../ui/Logo';
import NavMenu from './NavMenu';
import SearchInput from './SearchInput';
import NavbarUserSection from './NavbarUserSection';
import useUserSession from '@/features/users/hooks/useUserSession';
import {
  ChevronLeftIcon,
  LogOutIcon,
  MenuIcon,
  SearchIcon,
} from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog';
import type { MyProfileResult } from '@/shared/api/endpoints/users';
import Text from '../ui/Text';
import { Button } from '../ui/Button';
import { cn } from '@/styles/tailwind';
import useLogoutMutation from '@/features/auth/hooks/useLogoutMutation';
import { DialogDescription } from '../ui/Dialog';

type MenuItem = {
  to: string;
  label: string;
};

const COMMON_MENU_ITEMS: MenuItem[] = [
  { to: '/meetings', label: '모임' },
  { to: '/reviews', label: '모임 후기' },
  { to: '/guideBooks', label: '가이드북' },
];

const USER_MENU_ITEMS: MenuItem[] = [
  { to: '/myPage/participated', label: '😎 나의 모임' },
  { to: '/myPage/reviews', label: '✍️ 나의 후기' },
  { to: '/myPage/likes', label: '💖 좋아요 리스트' },
  { to: '/myPage/following', label: '⭐ 팔로잉 리스트' },
  { to: '/myPage/info', label: '🙆 개인정보 수정' },
];

const useSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleKeyDown,
  };
};

export default function Navbar() {
  const { user } = useUserSession();

  return (
    <div className="fixed top-0 left-0 z-22 w-full border-b-1 border-gray-300 bg-white">
      <NavbarMobileContent user={user} />
      <NavbarDesktopContent user={user} />
    </div>
  );
}

function NavbarMobileContent({ user }: { user: MyProfileResult | null }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();
  const { searchQuery, setSearchQuery, handleSearch } = useSearch();

  const handleNavigate = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const handleMobileKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearchOpen(false);
      handleSearch();
    }
  };

  return (
    <div className="mx-auto flex h-18 max-w-[1480px] items-center justify-between px-4 lg:hidden">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <MenuIcon className="shrink-0 text-black" />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-50 bg-black/50" />
          <DialogContent className="fixed top-0 z-50 h-full w-full max-w-xs bg-white">
            <DialogTitle hidden>메뉴</DialogTitle>
            <DialogDescription hidden>사이드바 메뉴입니다.</DialogDescription>
            <div className="flex h-full flex-col justify-between overflow-auto px-6 py-8">
              <div>
                <Logo />
                <div className="mt-6">
                  {user ? (
                    <div className="flex w-full flex-col items-center border-b-1 border-gray-300 p-5 pb-6">
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={user.profileImage}
                        alt="profile_img"
                      />
                      <Text variant="T2_Semibold" className="mt-4">
                        {user.nickname}
                      </Text>

                      <Button
                        variant="outline"
                        onClick={() => handleNavigate('/myPage/profile')}
                        className="mt-6 cursor-pointer rounded-lg border-1 border-gray-300 px-5 py-3 text-b3"
                      >
                        프로필 보기
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleNavigate('/login')}
                    >
                      로그인 / 회원가입
                    </Button>
                  )}
                </div>
                <CommonMenuItems onNavigate={() => setOpen(false)} />
                {user && <UserMenuItems onNavigate={() => setOpen(false)} />}
              </div>
              {user && (
                <div className="mt-12">
                  <button
                    onClick={() => {
                      setOpen(false);
                      logoutMutation.mutate();
                    }}
                    className="flex items-center gap-2"
                  >
                    <LogOutIcon className="text-black" />
                    <span>로그아웃</span>
                  </button>
                </div>
              )}
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
      <Logo />
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogTrigger>
          <SearchIcon className="shrink-0 text-black" />
        </DialogTrigger>
        <DialogPortal>
          <DialogContent className="fixed top-0 z-50 flex h-18 w-full items-center gap-2 bg-white p-4">
            <DialogClose className="p-2">
              <ChevronLeftIcon />
            </DialogClose>
            <DialogTitle hidden>검색</DialogTitle>
            <div onKeyDown={handleMobileKeyDown} className="w-full">
              <SearchInput
                placeHolder="원하는 검색어를 입력하세요."
                inputStyle="bg-gray-200 placeholder:text-gray-500 text-t4 p-3 rounded-lg w-full"
                onSearchChange={setSearchQuery}
                search={searchQuery}
              />
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}

function NavbarDesktopContent({ user }: { user: MyProfileResult | null }) {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, handleKeyDown } = useSearch();

  return (
    <div className="mx-auto hidden h-25 max-w-[1480px] items-center justify-between gap-x-8 px-4 lg:flex">
      <div className="flex items-center gap-24">
        <Logo />
        <NavMenu />
      </div>

      <div className="flex flex-1 items-center justify-end gap-8">
        <SearchInput
          onKeyDown={handleKeyDown}
          placeHolder="원하는 검색어를 입력하세요."
          inputStyle="bg-gray-200 placeholder:text-gray-500 text-t4 p-3 rounded-lg max-w-[400px] w-full"
          onSearchChange={setSearchQuery}
          search={searchQuery}
        />
        {user ? (
          <NavbarUserSection profileImage={user?.profileImage} />
        ) : (
          <button
            className="shrink-0 cursor-pointer rounded-lg bg-primary px-4 py-3 whitespace-nowrap text-white"
            onClick={() => navigate('/login')}
          >
            가입 / 로그인
          </button>
        )}
      </div>
    </div>
  );
}

function CommonMenuItems({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col pt-3">
      {COMMON_MENU_ITEMS.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive, isPending }) =>
            cn(
              'px-2.5 py-4 text-t2 whitespace-nowrap',
              isActive ? 'text-primary' : '',
              isPending ? 'text-primary' : '',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

function UserMenuItems({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col border-t-1 border-gray-300 pt-3">
      {USER_MENU_ITEMS.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.to}
          onClick={onNavigate}
          className={({ isActive, isPending }) =>
            cn(
              'px-2.5 py-4 text-t2 whitespace-nowrap',
              isActive ? 'text-primary' : '',
              isPending ? 'text-primary' : '',
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}
