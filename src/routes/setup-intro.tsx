import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import makeCakeBg from '../assets/imgs/intro/make-a-cake-bgx4@4x-100.webp';
import rollingBg from '../assets/imgs/intro/rollring-paper-B@4x-1004.webp';
import { LinkButton } from '../components/common/button/buttons';
import { useMessageCounts } from '../queries/message';
import routes from '../routes';
import { getFontSizeAndWeight, StyledFixedBackground } from '../styles/mixins';

const contents: Record<CategoryLowerCase, { bg: string; url: string }> = {
  rollingpaper: { bg: rollingBg, url: routes.rollingpaper.setup() },
  cake: { bg: makeCakeBg, url: routes.cake.setup() },
  treasure: { bg: '', url: '' },
};

export default function SetupIntro() {
  const { content } = useParams<{ content: CategoryLowerCase }>();

  if (!content) throw new Error('invalid parameter');
  const { data } = useMessageCounts(content);
  const currentTheme = contents[content];
  return (
    <StyledWrapper>
      <StyledButtonWrapper>
        <div>
          <span>{data?.data?.count}</span>명이 참여했어요
        </div>
        <LinkButton to={currentTheme.url}>시작하기</LinkButton>
      </StyledButtonWrapper>
      <StyledBackdrop bg={currentTheme.bg} />
    </StyledWrapper>
  );
}

const StyledButtonWrapper = styled.div`
  margin-top: auto;
  z-index: 50;
  display: grid;
  gap: 12px;
  div {
    padding: 8px 24px;
    width: fit-content;
    border-radius: 99999px;
    border: ${({ theme }) => `1px dashed ${theme.colors['strawberry-300']}`};
    color: ${({ theme }) => theme.colors['gray-900']};
    ${getFontSizeAndWeight('heading2', 'medium')}
    background-color: ${({ theme }) => theme.colors.white};
    span {
      color: ${({ theme }) => theme.colors['strawberry-300']};
      ${getFontSizeAndWeight('heading2', 'bold')}
    }
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledBackdrop = styled.div<{ bg: string }>`
  ${StyledFixedBackground};
  background-image: ${({ bg }) => `url(${bg})`};
`;
