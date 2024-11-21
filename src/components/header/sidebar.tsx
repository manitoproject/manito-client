import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { kakaoProfile } from '@/assets/imgs';
import { Document, Home, Logout, My } from '@/assets/svg/icons';
import {
  StyledInnerNav,
  StyledNav,
  StyledNavLinks,
  StyledNavLinkWrapper,
  StyledNicknameWrapper,
  StyledOverlay,
} from '@/components/header/sidebar.style';
import useOutsideClick from '@/hooks/common/use-outside-click';
import { userQueries } from '@/lib/query-factory';
import { useLogout } from '@/mutations/users';
import routes from '@/routes';

export interface SideMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

const LINKS = [
  {
    href: () => routes.landing,
    name: '첫 화면',
    svg: <Home />,
  },
  {
    href: () => routes.home,
    name: '컨텐츠',
    svg: <Document />,
  },
  {
    href: () => routes.my.default,
    name: '마이 페이지',
    svg: <My />,
  },
];

export default function Sidebar({ onClose, isOpen }: SideMenuProps) {
  const { data: user } = useQuery(userQueries.detail());
  const { mutate } = useLogout();
  const ref = useOutsideClick(() => onClose(), isOpen);
  // useDisableScroll(isOpen);

  return (
    <div>
      <StyledOverlay isOpen={isOpen} />
      <StyledNav ref={ref} isOpen={isOpen}>
        <StyledInnerNav isOpen={isOpen}>
          <StyledNicknameWrapper>
            {user ? (
              <>
                <img
                  src={
                    user?.isOriginProfile === 'N'
                      ? kakaoProfile
                      : user?.profileImage
                  }
                  alt="avatar"
                />
                <span>{user?.nickname}</span>
              </>
            ) : (
              <span>로그인이 필요합니다.</span>
            )}
          </StyledNicknameWrapper>
          <StyledNavLinkWrapper>
            <div>
              <StyledNavLinks>
                {LINKS.map((link) => {
                  if (!user && link.name === '마이 페이지') return;
                  return (
                    <li key={link.name}>
                      <Link onClick={onClose} to={link.href()}>
                        {link.svg}
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </StyledNavLinks>
            </div>
          </StyledNavLinkWrapper>
          {user && (
            <button type="button" onClick={() => mutate()}>
              <Logout />
              <span>로그아웃</span>
            </button>
          )}
        </StyledInnerNav>
      </StyledNav>
    </div>
  );
}
