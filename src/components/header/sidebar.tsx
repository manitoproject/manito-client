import { Link } from 'react-router-dom';

import { Document, Home, Logout, My } from '../../assets/svg/icons';
import { useDisableScroll } from '../../hooks';
import useOutsideClick from '../../hooks/common/useOutsideClick';
import { useUserQuery } from '../../queries/users';
import { routes } from '../../router';
import {
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
    href: () => routes.index,
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
  const ref = useOutsideClick(() => onClose(), isOpen);
  useDisableScroll(isOpen);

  return (
    <div>
      <StyledOverlay isOpen={isOpen} />
      <StyledNav ref={ref} isOpen={isOpen}>
        <StyledNicknameWrapper>
          <img src={data?.data?.profileImage} alt="avatar" />
          <span>{data?.data?.nickname}</span>
        </StyledNicknameWrapper>
        <StyledNavLinkWrapper>
          <StyledNavLinks>
            {LINKS.map((link) => (
              <li key={link.name}>
                <Link onClick={onClose} to={link.href()}>
                  {link.svg}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </StyledNavLinks>
          <button>
            <Logout />
            <span>로그아웃</span>
          </button>
        </StyledNavLinkWrapper>
      </StyledNav>
    </div>
  );
}
