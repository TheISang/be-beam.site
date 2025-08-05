import { useNavigate } from 'react-router';
import Logo from '../atoms/logo/Logo';
import NavMenu from '../molecules/NavMenu';
import SearchInput from '../molecules/SearchInput';
import NavbarUserSection from '../molecules/NavbarUserSection';
import useUserSession from '@/hooks/business/useUserSession';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useUserSession();

  return (
    <div className="fixed top-0 left-0 z-22 h-25 w-full border-b-1 border-gray-300 bg-white">
      <div className="mx-auto flex h-full max-w-[1480px] items-center justify-between gap-x-24 px-4">
        <div className="flex items-center gap-24">
          <Logo />
          <NavMenu />
        </div>

        <div className="flex items-center gap-8">
          <SearchInput
            placeHolder="원하는 검색어를 입력하세요."
            inputStyle="bg-gray-200 placeholder:text-gray-500 text-t4 p-3 rounded-lg w-[400px]"
            onSearchChange={() => console.log('나중에 작성')}
            search=""
          />
          {user ? (
            <NavbarUserSection profileImage={user?.profileImage} />
          ) : (
            <button
              className="cursor-pointer rounded-lg bg-primary px-4 py-3 text-white"
              onClick={() => navigate('/login')}
            >
              가입 / 로그인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
