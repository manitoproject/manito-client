import styled from '@emotion/styled';
import { ForwardedRef, forwardRef } from 'react';

import Input from './input';

interface NameFormProps {
  children: React.ReactNode;
  isError: boolean;
  onClick: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
}

export default forwardRef(function NameForm(
  { children, isError, maxLength, ...rest }: NameFormProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { value } = rest;
  return (
    <StyledWrapper>
      {children}
      <div>
        <Input ref={ref} isError={isError} {...rest}>
          <span>
            {value.length} / <strong>{maxLength}</strong>
          </span>
        </Input>
      </div>
    </StyledWrapper>
  );
});

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
