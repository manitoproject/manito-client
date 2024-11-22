import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import makeCakeBg from '@/assets/imgs/intro/make-a-cake-bgx4@4x-100.webp';
import rollingBg from '@/assets/imgs/intro/rollring-paper-B@4x-1004.webp';
import { LinkButton } from '@/components/common/buttons/buttons';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { messageQueries } from '@/lib/query-factory';
import routes from '@/routes';
import { getFontSizeAndWeight, StyledFixedBackground } from '@/styles/mixins';
import { ColorName } from '@/styles/theme';

const CONTENTS: Record<
  RouteContentType,
  {
    bgUrl: string;
    category: CategoryLowerCase;
    path: string;
    title: string;
    bgColor: ColorName;
  }
> = {
  rollingpaper: {
    bgUrl: rollingBg,
    path: routes.rollingpaper.setup(),
    title: 'Rollring paper',
    bgColor: 'white',
    category: 'rollingpaper',
  },
  makecake: {
    bgUrl: makeCakeBg,
    path: routes.makecake.setup(),
    title: '케이크 만들기',
    bgColor: 'pink-300',
    category: 'cake',
  },
  treasurebox: {
    bgUrl: '',
    path: '',
    title: '보물상자',
    bgColor: 'pink-300',
    category: 'treasure',
  },
};

export default function SetupIntro() {
  const { content } = useParams<{ content: RouteContentType }>();

  if (!content) throw new Error('invalid parameter');
  const { data } = useQuery(messageQueries.count(CONTENTS[content].category));
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
          <span>{data?.count}</span>명이 참여했어요
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
