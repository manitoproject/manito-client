import { useLocation, useNavigate } from 'react-router-dom';

import { HamburgerMenu, LeftChevron } from '../../assets/svg/icons';
import headerMap, { HeaderConfig } from '../../constants/header-config';
import routes from '../../constants/routes';
import { usePaperDetailQuery } from '../../queries/paper';
import { useUserQuery } from '../../queries/users';
import theme from '../../styles/theme';
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
  const { data: userData } = useUserQuery();
  const { data, isFetching } = usePaperDetailQuery();
  const paper = data?.data;

  if (isFetching) return <div>loading....</div>;

  const header = headerMap.reduce<EditedHeaderConfig | object>(
    (result, item) => {
      if (paper) {
        return {
          headerColor: headerColorByTheme[paper.theme],
          hasBorder: paper.theme === 'animal',
          title: paper.title,
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
    const isDetailPageAndUnAuth = paper && !userData?.data;
    if (isHomePage || isDetailPageAndUnAuth) return navigate(routes.index);
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
