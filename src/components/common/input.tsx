import { ForwardedRef, forwardRef, useEffect } from 'react';

import { Close } from '../../assets/svg';
import { StyledWrapper } from './input.style';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

export default forwardRef(function Input(
  { children, onClick, isError = false, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  useEffect(() => {
    if (typeof ref !== 'function') ref?.current?.focus();
  }, [ref]);

  return (
    <StyledWrapper isError={isError}>
      <div>
        <input ref={ref} {...props} />
        <button type="button" onClick={onClick}>
          <Close />
        </button>
      </div>
      {children}
    </StyledWrapper>
  );
});
