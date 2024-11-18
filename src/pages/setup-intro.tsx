import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import makeCakeBg from '@/assets/imgs/intro/make-a-cake-bgx4@4x-100.webp';
import rollingBg from '@/assets/imgs/intro/rollring-paper-B@4x-1004.webp';
import { LinkButton } from '@/components/common/button/buttons';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { useMessageCounts } from '@/queries/message';
import routes from '@/routes';
import { getFontSizeAndWeight, StyledFixedBackground } from '@/styles/mixins';
import { ColorName } from '@/styles/theme';

const CONTENTS: Record<
  CategoryLowerCase,
  { bgUrl: string; path: string; title: string; bgColor: ColorName }
> = {
  rollingpaper: {
    bgUrl: rollingBg,
    path: routes.rollingpaper.setup(),
    title: 'Rollring paper',
    bgColor: 'white',
  },
  cake: {
    bgUrl: makeCakeBg,
    path: routes.cake.setup(),
    title: '케이크 만들기',
    bgColor: 'pink-300',
  },
  treasure: { bgUrl: '', path: '', title: '보물상자', bgColor: 'pink-300' },
};

export default function SetupIntro() {
  const { content } = useParams<{ content: CategoryLowerCase }>();

  if (!content) throw new Error('invalid parameter');
  const { data } = useMessageCounts(content);
  const currentTheme = CONTENTS[content];
  useSetHeader({
    title: currentTheme.title,
    rightBtn: false,
    bg: currentTheme.bgColor,
    color: currentTheme.bgColor !== 'white' ? 'white' : undefined,
  });

  return (
    <StyledWrapper>
      <StyledButtonWrapper>
        <div>
          <span>{data?.data?.count}</span>명이 참여했어요
        </div>
        <LinkButton to={currentTheme.path}>시작하기</LinkButton>
      </StyledButtonWrapper>
      <StyledBackdrop bg={currentTheme.bgUrl} />
      <ReactHelmet title={`${currentTheme.title} - 마니또`} />
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
    border: ${({ theme }) => `1px dashed ${theme.colors['pink-300']}`};
    color: ${({ theme }) => theme.colors['gray-900']};
    ${getFontSizeAndWeight('heading2', 'medium')}
    background-color: ${({ theme }) => theme.colors.white};
    span {
      color: ${({ theme }) => theme.colors['pink-300']};
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
