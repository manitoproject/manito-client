import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '../../utils/style';
import { SideMenuProps } from './sidebar';

const fadeIn = keyframes`
   0% {
     opacity: 0;
   }

   15% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

export const StyledOverlay = styled.div<Pick<SideMenuProps, 'isOpen'>>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 52;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
`;

export const StyledNavLinkWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;
export const StyledInnerNav = styled.div<Pick<SideMenuProps, 'isOpen'>>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 12px;
  width: 240px;
  position: fixed;
  height: 100vh;
  padding: 46px 24px;
  button {
    padding: 8px 0;
    ${getFontSizeAndWeight('heading4', 'medium')}
    display: flex;
    gap: 6px;
    color: ${(props) => props.theme.colors['gray-600']};
  }
  animation: ${fadeIn} 300ms ease-in;
`;
export const StyledNav = styled.nav<Pick<SideMenuProps, 'isOpen'>>`
  width: 240px;
  height: 100%;
  background-color: ${(props) => props.theme.colors.white};
  position: absolute;
  top: 0;
  right: ${(props) => (props.isOpen ? 0 : '-240px')};
  z-index: 999;
  transition: right 300ms ease;
  box-shadow: ${(props) =>
    props.isOpen ? ' 0px 0px 4px 0px rgba(0, 0, 0, 0.2)' : 'none'};
`;

export const StyledNicknameWrapper = styled.div`
  padding: 8px 0;
  gap: 4px;
  display: flex;
  align-items: center;
  position: relative;
  img {
    width: 32px;
    height: 32px;
    border-radius: 999px;
  }
  span {
    ${getFontSizeAndWeight('heading4', 'bold')}
    display: inline-block;
    max-width: 118px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    border-bottom: 1px dashed ${(props) => props.theme.colors['powderBlue-300']};
  }
`;

export const StyledNavLinks = styled.ul`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 4px;
  li {
    ${getFontSizeAndWeight('heading3', 'regular')}
    color: ${(props) => props.theme.colors['gray-900']};
    a {
      align-items: center;
      padding: 6px 8px;
      gap: 6px;
      display: flex;
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`;
