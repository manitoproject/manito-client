import { Portal } from '@/components/common/portal';
import {
  StyledButton,
  StyledButtonWrapper,
  StyledModalMainWrapper,
  StyledRadioFormTitleWrapper,
  StyledRadioFormWrapper,
  StyledTitleWrapper,
} from '@/components/modal/modal.style';
import useDisableScroll from '@/hooks/common/use-disable-scroll';
import useOutsideClick from '@/hooks/common/use-outside-click';

function TitleWrapper({ children }: { children: React.ReactNode }) {
  return <StyledTitleWrapper>{children}</StyledTitleWrapper>;
}
function Title({ children }: { children: React.ReactNode }) {
  return <h1>{children}</h1>;
}
function Description({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

function NicknameVisibility({ children }: { children: React.ReactNode }) {
  return (
    <StyledRadioFormWrapper>
      <StyledRadioFormTitleWrapper>
        <h1>작성한 편지를 공개 하시겠어요?</h1>
        <p>
          익명 선택시 임의의 이름을 작성해서 공개 하실 수 있으며, 공개 선택시엔
          이름으로 공개됩니다.
        </p>
      </StyledRadioFormTitleWrapper>
      {children}
    </StyledRadioFormWrapper>
  );
}

function Button({
  children,
  onClick,
  disabled,
  ...rest
}: {
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <StyledButton {...rest} type="button" disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

function Buttons({ children }: { children: React.ReactNode }) {
  return <StyledButtonWrapper>{children}</StyledButtonWrapper>;
}

function ModalMain({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = useOutsideClick(onClose, true);
  useDisableScroll();

  return (
    <Portal>
      <StyledModalMainWrapper>
        <div ref={ref}>{children}</div>
      </StyledModalMainWrapper>
    </Portal>
  );
}

export const Modal = Object.assign(ModalMain, {
  Buttons: Buttons,
  Button: Button,
  TitleWrapper: TitleWrapper,
  Title: Title,
  Description: Description,
  NicknameVisibility: NicknameVisibility,
});
