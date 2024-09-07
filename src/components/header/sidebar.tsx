import { Link } from 'react-router-dom';

import { kakaoProfile } from '../../assets/imgs';
import { Document, Home, Logout, My } from '../../assets/svg/icons';
import useOutsideClick from '../../hooks/common/outside-click';
import { useLogout, useUserQuery } from '../../queries/users';
import routes from '../../routes';
import {
  StyledInnerNav,
  StyledNav,
  StyledNavLinks,
  StyledNavLinkWrapper,
  StyledNicknameWrapper,
  StyledOverlay,
} from './sidebar.style';

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
  const { data } = useUserQuery();
  const { mutate } = useLogout();
  const ref = useOutsideClick(() => onClose(), isOpen);
  // useDisableScroll(isOpen);

  return (
    <div>
      <StyledOverlay isOpen={isOpen} />
      <StyledNav ref={ref} isOpen={isOpen}>
        <StyledInnerNav isOpen={isOpen}>
          <StyledNicknameWrapper>
            {data?.data ? (
              <>
                <img
                  src={
                    data?.data?.isOriginProfile === 'N'
                      ? kakaoProfile
                      : data?.data?.profileImage
                  }
                  alt="avatar"
                />
                <span>{data?.data?.nickname}</span>
              </>
            ) : (
              <span>로그인이 필요합니다.</span>
            )}
          </StyledNicknameWrapper>
          <StyledNavLinkWrapper>
            <div>
              <StyledNavLinks>
                {LINKS.map((link) => {
                  if (!data?.data && link.name === '마이 페이지') return;
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
          {data?.data && (
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
