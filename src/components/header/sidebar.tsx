import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { Document, Home, Logout, My, Profile } from '../../assets/svg';
import useOutsideClick from '../../hooks/useOutsideClick';
import { routes } from '../../router';

interface SideMenuProps {
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
const StyledOverlay = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
`;

const StyledNavLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  button {
    display: flex;
    gap: 4px;
    font-size: 14px;
    color: ${(props) => props.theme.colors.gray[600]};
  }
`;

const StyledNav = styled.nav<{ isOpen: boolean }>`
  padding: 46px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: ${(props) => props.theme.colors.white};
  position: absolute;
  top: 0;
  right: ${(props) => (props.isOpen ? 0 : '-48%')};
  width: 48%;
  height: 100vh;
  z-index: 999;
  transition: right 500ms ease;
  box-shadow: ${(props) =>
    props.isOpen ? ' 0px 0px 4px 0px rgba(0, 0, 0, 0.2)' : 'none'};
`;

const StyledNicknameWrapper = styled.div`
  padding: 8px 0;
  gap: 4px;
  display: flex;
  border-bottom: 1px dashed ${(props) => props.theme.colors.powderBlue[300]};
  align-items: center;
  div {
    min-width: 32px;
    min-height: 32px;
    border-radius: 999px;
    background-color: ${(props) => props.theme.colors.gray[300]};
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledNavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  li {
    color: ${(props) => props.theme.colors.gray[900]};
    a {
      align-items: center;
      padding: 6px 8px;
      gap: 4px;
      display: flex;
      svg {
        width: 18px;
        height: 18px;
      }
      span {
        font-size: 14px;
      }
    }
  }
`;
