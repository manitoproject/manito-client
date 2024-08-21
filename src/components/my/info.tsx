import styled from '@emotion/styled';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';

import { Setting } from '../../assets/svg/icons';
import routes from '../../routes';
import { MyProfileSkeleton } from '../skeletons/skeletons';
import MyProfile from './profile';

export default function MyInfo() {
  return (
    <StyledWrapper>
      <Suspense fallback={<MyProfileSkeleton />}>
        <MyProfile />
      </Suspense>
      <StyledSvgWrapper>
        <Link to={routes.my.setting()}>
          <Setting />
        </Link>
      </StyledSvgWrapper>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  display: flex;
  gap: 8px;
  width: 100%;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    border-bottom: 1px dashed ${(props) => props.theme.colors['gray-300']};
  }
  padding-bottom: 12px;
`;

const StyledSvgWrapper = styled.div`
  display: flex;
  align-items: center;
  a {
    padding: 4px;
  }
`;
