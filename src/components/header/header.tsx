import { useLocation, useNavigate } from 'react-router-dom';

import { HamburgerMenu, LeftChevron } from '../../assets/svg/icons';
import headerMap from '../../constants/header-config';
import { usePaperDetailQuery } from '../../queries/paper';
import { routes } from '../../router';
import {
  StyledHeader,
  StyledLeftButton,
  StyledMenuButton,
} from './header.style';

interface HeaderProps {
  onSidebarOpen: () => void;
}

export default function Header({ onSidebarOpen }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = usePaperDetailQuery();
  const headerInfo =
    headerMap.find((header) => {
      let pathname = header.pathname();
      if (header.title.includes(data?.data?.theme)) {
        return header;
      }
      if (!data?.data && pathname.includes('/:')) {
        pathname = pathname.split('/:')[0];
        return location.pathname.includes(pathname);
      }
    }) ?? headerMap[headerMap.length - 1];

  return (
    <StyledHeader
      hasBorder={headerInfo.hasBorder}
      hasHeaderColor={headerInfo.hasHeaderColor}
    >
      <div>
        {headerInfo.isShowLeftBtn && (
          <StyledLeftButton
            hasHeaderColor={headerInfo.hasHeaderColor}
            onClick={() => {
              if (headerInfo.pathname() === routes.home) navigate(routes.index);
              else navigate(-1);
            }}
          >
            <LeftChevron />
          </StyledLeftButton>
        )}
        <h1>{data?.data?.title ?? headerInfo.title}</h1>
        {headerInfo.isShowMenuBtn && (
          <StyledMenuButton
            hasHeaderColor={headerInfo.hasHeaderColor}
            onClick={onSidebarOpen}
          >
            <HamburgerMenu />
          </StyledMenuButton>
        )}
      </div>
    </StyledHeader>
  );
}
