import styled from '@emotion/styled';

import { SideMenuProps } from './sidebar';

export const StyledOverlay = styled.div<Pick<SideMenuProps, 'isOpen'>>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  height: 100vh;
`;

export const StyledNavLinkWrapper = styled.div`
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

export const StyledNav = styled.nav<Pick<SideMenuProps, 'isOpen'>>`
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
  transition: right 300ms ease-out;
  box-shadow: ${(props) =>
    props.isOpen ? ' 0px 0px 4px 0px rgba(0, 0, 0, 0.2)' : 'none'};
`;

export const StyledNicknameWrapper = styled.div`
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

export const StyledNavLinks = styled.ul`
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
