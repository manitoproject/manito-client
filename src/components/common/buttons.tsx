import { KakaoLogo } from '../../assets/svg';
import { BackgroundColor } from '../../styles/theme';
import { StyledButton, StyledKakaoButton } from './buttons.style';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hasMarginBottom?: boolean;
  backgroundColor?: BackgroundColor;
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
