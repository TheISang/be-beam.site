import { useNavigate } from 'react-router';
import Logo from '../atoms/logo/Logo';
import NavMenu from '../molecules/NavMenu';
import SearchInput from '../molecules/SearchInput';

export default function Navbar() {
  const navigate = useNavigate();

  const user = {
    nickName: '비빔 관리자',
    profileImg:
      'https://i.pinimg.com/736x/83/1a/0b/831a0b369f389fdd93d072203287043e.jpg',
  };

  return (
    <div className="h-25 w-full border-b-1 border-gray-300">
      <div className="mx-auto flex h-full max-w-[1480px] items-center justify-between gap-x-24 px-4">
        <div className="flex items-center gap-24">
          <Logo />
          <NavMenu />
        </div>

        <div className="flex items-center gap-8">
          <SearchInput placeholder="원하는 검색어를 입력하세요." />

          {/* 후에 코드 교체 및 공용 컴포넌트 제작 */}
          {user ? (
            <div className="flex items-center gap-x-4">
              <button className="cursor-pointer">
                <img src="/images/icons/like.svg" alt="like_icon" />
              </button>
              <button className="cursor-pointer">
                <img src="/images/icons/bell.svg" alt="bell_icon" />
              </button>
              <button onClick={() => navigate('/myPage/participated')}>
                <img
                  className="h-7 w-7 cursor-pointer rounded-full"
                  src={user.profileImg}
                  alt="profileImg"
                />
              </button>
            </div>
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
