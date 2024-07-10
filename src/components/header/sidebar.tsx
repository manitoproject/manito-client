import { Link } from 'react-router-dom';

import { Document, Home, Logout, My, Profile } from '../../assets/svg/icons';
import { useDisableScroll } from '../../hooks';
import useOutsideClick from '../../hooks/useOutsideClick';
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
    href: () => routes.my,
    name: '마이 페이지',
    svg: <My />,
  },
];

export default function Sidebar({ onClose, isOpen }: SideMenuProps) {
  const ref = useOutsideClick(() => onClose(), isOpen);
  useDisableScroll(isOpen);

  return (
    <div>
      <StyledOverlay isOpen={isOpen} />
      <StyledNav ref={ref} isOpen={isOpen}>
        <StyledNicknameWrapper>
          <div>
            <Profile />
          </div>
          <span>아침점심저녁벽dasdasdaddddddd</span>
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
