import { LinkProps } from 'react-router-dom';

import { KakaoLogo } from '@/assets/svg/icons';
import {
  StyledButton,
  StyledKakaoButton,
  StyledLinkButton,
} from '@/components/common/button/buttons.style';
import { ColorName } from '@/styles/theme';

export interface CommonButtonProps {
  backgroundColor?: ColorName;
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    CommonButtonProps {}

export interface LinkButtonProps extends LinkProps, CommonButtonProps {
  disabled?: boolean;
}

export function KakaoLoginButton({ ...props }: ButtonProps) {
  return (
    <StyledKakaoButton {...props}>
      <KakaoLogo />
      <span>카카오 로그인</span>
    </StyledKakaoButton>
  );
}

export function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export function LinkButton({ children, ...props }: LinkButtonProps) {
  return <StyledLinkButton {...props}>{children}</StyledLinkButton>;
}
