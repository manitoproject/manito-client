import styled from '@emotion/styled';

export const StyledMessageItem = styled.div<{ isServerData: boolean }>`
  cursor: ${({ isServerData }) => (isServerData ? 'auto' : 'pointer')};
  position: relative;
  width: 100%;
  button {
    z-index: 50;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    padding: 4px;
    position: absolute;
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
  }
`;

export const StyledTrashButton = styled.button`
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.white};
`;
export const StyledEditButton = styled.button`
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors['gray-200']};
`;

export const StyledEmptySvg = styled.div`
  border-radius: 999px;
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors['powderBlue-50']};
`;

export const StyledItem = styled.li<{ isOwner: boolean }>`
  border: ${({ theme, isOwner }) =>
    isOwner ? 'none' : `1px dashed ${theme.colors.white}`};
  background: ${({ isOwner }) =>
    isOwner ? 'transparent' : 'rgba(249, 249, 249, 0.5)'};
  border-radius: 4px;
  aspect-ratio: 1;
  pointer-events: ${({ isOwner }) => (isOwner ? 'none' : 'auto')};
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;
