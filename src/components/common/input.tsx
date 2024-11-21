import { ForwardedRef, forwardRef, useEffect } from 'react';

import { Close } from '@/assets/svg/icons';
import { StyledInputWrapper } from '@/components/common/input.style';

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
    <StyledInputWrapper isError={isError}>
      <div>
        <input ref={ref} {...props} />
        <button
          onMouseDown={(e) => e.preventDefault()}
          type="button"
          onClick={onClick}
        >
          <Close />
        </button>
      </div>
      {children}
    </StyledInputWrapper>
  );
});
