import { StyledComponent } from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import makeCakeBg from '@/assets/imgs/intro/make-a-cake-bgx4@4x-100.webp';
import rollingBg from '@/assets/imgs/intro/rollring-paper-B@4x-1004.webp';
import treasureBoxBg from '@/assets/imgs/intro/treasure-Bg@4x-100.webp';
import { LinkButton } from '@/components/common/buttons/buttons';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { messageQueries } from '@/lib/query-factory';
import {
  StyledRollingAndCakeAuthorCountDiv,
  StyledSetupIntroBackdrop,
  StyledSetupIntroWrapper,
  StyledStartButtonWrapper,
  StyledTreasureAuthorCountDiv,
} from '@/pages/setup-intro.style';
import routes from '@/routes';
import { ColorName, FontNameWithoutAppleFont } from '@/styles/theme';

const CONTENTS: Record<
  RouteContentType,
  {
    bg: string;
    category: CategoryLowerCase;
    path: string;
    title: string;
    font: FontNameWithoutAppleFont;
    bgColor: ColorName;
    btnLabel: string;
    authorCountDiv: StyledComponent<'div', any>;
  }
> = {
  rollingpaper: {
    bg: rollingBg,
    font: 'SpoqaHanSansNeo',
    path: routes.rollingpaper.setup(),
    title: 'Rollring paper',
    bgColor: 'white',
    category: 'rollingpaper',
    btnLabel: '시작하기',
    authorCountDiv: StyledRollingAndCakeAuthorCountDiv,
  },
  makecake: {
    bg: makeCakeBg,
    font: 'SpoqaHanSansNeo',
    path: routes.makecake.setup(),
    title: '케이크 만들기',
    bgColor: 'pink-300',
    category: 'cake',
    btnLabel: '시작하기',
    authorCountDiv: StyledRollingAndCakeAuthorCountDiv,
  },
  treasurebox: {
    bg: treasureBoxBg,
    font: 'Cafe24Ohsquare',
    path: routes.treasurebox.setup(),
    title: '보물상자',
    bgColor: 'treasure-teal-700',
    category: 'treasure',
    btnLabel: '보물상자 열기',
    authorCountDiv: StyledTreasureAuthorCountDiv,
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
    font: currentTheme.font,
    bg: currentTheme.bgColor,
    color: currentTheme.bgColor !== 'white' ? 'white' : undefined,
  });

  return (
    <StyledSetupIntroWrapper>
      <StyledStartButtonWrapper>
        <currentTheme.authorCountDiv>
          <span>{data?.count}</span>명이 참여했어요
        </currentTheme.authorCountDiv>
        <LinkButton font={currentTheme.font} to={currentTheme.path}>
          {currentTheme.btnLabel}
        </LinkButton>
      </StyledStartButtonWrapper>
      <StyledSetupIntroBackdrop bg={currentTheme.bg} />
      <ReactHelmet title={`${currentTheme.title} - 마니또`} />
    </StyledSetupIntroWrapper>
  );
}
