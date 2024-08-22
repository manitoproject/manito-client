import { useLocation, useNavigate } from 'react-router-dom';

import { HamburgerMenu, LeftChevron } from '../../assets/svg/icons';
import headerMap, { HeaderConfig } from '../../constants/header-config';
import { usePaperDetailQuery } from '../../queries/paper';
import routes from '../../routes';
import theme from '../../styles/theme';
import { token } from '../../utils/storage';
import { HeaderSkeleton } from '../skeletons/skeletons';
import {
  StyledHeader,
  StyledLeftButton,
  StyledMenuButton,
} from './header.style';

interface HeaderProps {
  onSidebarOpen: () => void;
}

export type EditedHeaderConfig = {
  headerColor: string;
  hasBorder: boolean;
} & Pick<HeaderConfig, 'isShowLeftBtn' | 'isShowMenuBtn' | 'title'>;

const headerColorByTheme: Record<RollingThemeName, string> = {
  animal: theme.colors.white,
  nature: theme.colors['powderBlue-800'],
  space: theme.colors['powderBlue-900'],
};

export default function Header({ onSidebarOpen }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = usePaperDetailQuery();
  const paper = data?.data;

  if (isLoading) return <HeaderSkeleton />;

  const header = headerMap.reduce<EditedHeaderConfig | object>(
    (result, item) => {
      if (paper) {
        let title = '';
        if (location.search) title = '편지 작성';
        else if (location.pathname.includes('edit')) title = '수정하기';
        else if (location.pathname.includes('create')) title = '편지 선택';
        return {
          headerColor: headerColorByTheme[paper.theme],
          hasBorder: paper.theme === 'animal',
          title: title || paper.title,
          isShowLeftBtn: true,
          isShowMenuBtn: true,
        };
      }
      if (item.pathname() === location.pathname) {
        return {
          title: item.title,
          isShowLeftBtn: item.isShowLeftBtn,
          isShowMenuBtn: item.isShowMenuBtn,
          hasBorder: true,
          headerColor: theme.colors.white,
        };
      }
      return result;
    },
    {},
  );
  const handleNavigation = () => {
    const isHomePage = location.pathname === routes.home;
    const isDetailPageAndUnAuth = paper && !token.getAccessToken();
    if (isHomePage || isDetailPageAndUnAuth) return navigate(routes.landing);
    return navigate(-1);
  };

  if (!('headerColor' in header))
    throw Error('서버 데이터 에러 발생 (header config)');

  return (
    <StyledHeader headerColor={header.headerColor} hasBorder={header.hasBorder}>
      <div>
        {header.isShowLeftBtn && (
          <StyledLeftButton
            headerColor={header.headerColor}
            onClick={handleNavigation}
          >
            <LeftChevron />
          </StyledLeftButton>
        )}
        <h1>{header.title}</h1>
        {header.isShowMenuBtn && (
          <StyledMenuButton
            headerColor={header.headerColor}
            onClick={onSidebarOpen}
          >
            <HamburgerMenu />
          </StyledMenuButton>
        )}
      </div>
    </StyledHeader>
  );
}
