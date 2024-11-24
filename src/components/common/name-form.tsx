import styled from '@emotion/styled';
import { ForwardedRef, forwardRef } from 'react';

import Input from '@/components/common/input';

interface NameFormProps {
  children?: React.ReactNode;
  isError: boolean;
  onClick: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
  placeholder?: string;
}

export default forwardRef(function NameForm(
  {
    children,
    isError,
    maxLength,
    placeholder = '이름을 입력해주세요.',
    ...rest
  }: NameFormProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { value } = rest;
  return (
    <StyledWrapper>
      {children}
      <div>
        <Input placeholder={placeholder} ref={ref} isError={isError} {...rest}>
          <span>
            {value.length}/<strong>{maxLength}</strong>
          </span>
        </Input>
      </div>
    </StyledWrapper>
  );
});

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  z-index: 1;
  gap: 20px;
`;
