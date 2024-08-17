import { ForwardedRef, forwardRef, useEffect } from 'react';

import { nicknameMaxLength } from '../../constants/regex-patterns';
import { useDisableScroll, useOutsideClick } from '../../hooks';
import useModalStore from '../../stores/modal-store';
import RadioButton from '../common/button/radio-button';
import Input from '../common/input';
import { Portal } from '../common/portal';
import {
  StyledButton,
  StyledButtonWrapper,
  StyledModalMainWrapper,
  StyledRadioFormTitleWrapper,
  StyledRadioFormWrapper,
  StyledTitleWrapper,
} from './modal.style';
import ModalContext, { useModalContext } from './modal-context';
import useModal from './use-modal';

const LABELS = ['공개로 작성할래요.', '익명으로 작성할래요.'];

interface RadioFormProps {
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  nickname: string;
  handleNameReset: () => void;
}

function TitleWrapper({ children }: { children: React.ReactNode }) {
  return <StyledTitleWrapper>{children}</StyledTitleWrapper>;
}
function Title({ children }: { children: React.ReactNode }) {
  return <h1>{children}</h1>;
}
function Description({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

function RadioForm(
  { handleNameChange, isError, nickname, handleNameReset }: RadioFormProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { activeIndex, setActiveIndex } = useModalContext();
  const { setIsError } = useModalContext();

  useEffect(() => {
    setIsError(isError || !nickname.length);
  }, [isError, nickname.length, setIsError]);

  return (
    <StyledRadioFormWrapper>
      <StyledRadioFormTitleWrapper>
        <h1>작성한 편지를 공개 하시겠어요?</h1>
        <p>익명 선택시 익명, 공개 선택시 설정한 이름으로 공개됩니다.</p>
      </StyledRadioFormTitleWrapper>
      <div>
        {LABELS.map((item, i) => (
          <RadioButton
            key={item}
            isActive={activeIndex === i}
            onChangeIndex={() => setActiveIndex(i)}
          >
            <p>{item}</p>
          </RadioButton>
        ))}
      </div>
      {activeIndex === 1 && (
        <Input
          isError={isError}
          ref={ref}
          value={nickname}
          onChange={handleNameChange}
          onClick={handleNameReset}
        >
          <span>
            {nickname.length} / {nicknameMaxLength}
          </span>
        </Input>
      )}
    </StyledRadioFormWrapper>
  );
}

function Button({
  children,
  onClick,
  isActionBtn,
  isPending,
  ...rest
}: {
  isPending?: boolean;
  isActionBtn?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const { isError, activeIndex } = useModalContext();
  return (
    <StyledButton
      {...rest}
      type="button"
      disabled={(isActionBtn && isError && !!activeIndex) || isPending}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

function Buttons({ children }: { children: React.ReactNode }) {
  return <StyledButtonWrapper>{children}</StyledButtonWrapper>;
}

function ModalMain({
  children,
  isOpen,
  onClick,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) {
  const { isError, setIsError } = useModal();
  const { activeIndex, setActiveIndex } = useModalStore();
  const ref = useOutsideClick(onClick, isOpen);
  useDisableScroll(isOpen);

  useEffect(() => {
    return () => setActiveIndex(0);
  }, [setActiveIndex]);

  return (
    <Portal>
      <ModalContext.Provider
        value={{ isError, setIsError, activeIndex, setActiveIndex }}
      >
        <StyledModalMainWrapper>
          <div ref={ref}>{children}</div>
        </StyledModalMainWrapper>
      </ModalContext.Provider>
    </Portal>
  );
}

export const Modal = Object.assign(ModalMain, {
  Buttons: Buttons,
  Button: Button,
  TitleWrapper: TitleWrapper,
  Title: Title,
  Description: Description,
  RadioForm: forwardRef(RadioForm),
});
