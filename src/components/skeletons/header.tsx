import styled from '@emotion/styled';

import theme from '../../styles/theme';
import { StyledHeader } from '../header/header.style';
import { SkeletonItem } from './skeleton.style';

export default function SkeletonHeader() {
  return (
    <StyledHeader headerColor={theme.colors.white} hasBorder={true}>
      <div>
        <Button />
        <Item />
        <Button />
      </div>
    </StyledHeader>
  );
}

const Button = styled(SkeletonItem)`
  width: 32px;
  height: 32px;
`;
const Item = styled(SkeletonItem)`
  width: 120px;
  height: 30px;
`;
