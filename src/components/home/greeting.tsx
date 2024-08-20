import styled from '@emotion/styled';

import { useUserSuspenseQuery } from '../../queries/users';
import { getFontSizeAndWeight } from '../../styles/mixins';

export default function Greeting() {
  const { data } = useUserSuspenseQuery();
  return (
    <StyledGreeting>
      {<p>{data.data?.nickname}님 안녕하세요!</p>}
      <StyledGreetingDescription>
        <strong>다양한 컨텐츠</strong>를 즐겨보세요.
      </StyledGreetingDescription>
    </StyledGreeting>
  );
}

const StyledGreeting = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  p:nth-of-type(1) {
    ${getFontSizeAndWeight('heading2', 'medium')}
    color: ${(props) => props.theme.colors['gray-800']};
  }
`;

export const StyledGreetingDescription = styled.p`
  color: ${(props) => props.theme.colors['gray-900']};
  ${getFontSizeAndWeight('heading1', 'bold')}
  strong {
    color: ${(props) => props.theme.colors['powderBlue-900']};
  }
`;
