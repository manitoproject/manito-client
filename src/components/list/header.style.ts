import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '@/styles/mixins';

export const StyledListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
  position: relative;
  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  button:nth-of-type(1) {
    height: 40px;
    padding: 8px 16px;
    ${getFontSizeAndWeight('body1', 'medium')}
    color:${({ theme }) => theme.colors.black};
    border: 1px solid ${({ theme }) => theme.colors['gray-300']};
  }
  button {
    padding: 8px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors['gray-100']};
  }
`;

export const StyledShareModal = styled.div`
  display: flex;
  gap: 20px;
`;

export const StyledShareLinkBtn = styled.button`
  padding: 0 16px;
  align-items: center;
  div {
    border-radius: 4px;
    padding: 15px;
    background-color: ${({ theme }) => theme.colors['gray-100']};
  }
  color: ${({ theme }) => theme.colors['gray-800']};
  display: flex;
  gap: 12px;
  flex-direction: column;
`;
