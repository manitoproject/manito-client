import { ForwardedRef, forwardRef, useEffect } from 'react';

import { RadioButton, RadioButtonActive } from '../../assets/svg/icons';
import { nicknameMaxLength } from '../../constants/regexPatterns';
import { useDisableScroll, useOutsideClick } from '../../hooks';
import modalStore from '../../stores/modalStore';
import Input from '../common/input';
import { Portal } from '../common/portal';
import {
  StyledButton,
  StyledButtonWrapper,
  StyledCheckboxFormTitleWrapper,
  StyledCheckboxFormWrapper,
  StyledCheckboxItem,
  StyledModalMainWrapper,
  StyledTitleWrapper,
} from './modal.style';
import ModalContext, { useModalContext } from './modalContext';
import useModal from './useModal';

const CHECKBOX_LIST = ['공개로 작성할래요.', '익명으로 작성할래요.'];

interface CheckboxFormProps {
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

function CheckboxForm(
  { handleNameChange, isError, nickname, handleNameReset }: CheckboxFormProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { activeIndex, setActiveIndex } = useModalContext();
  const { setIsError } = useModalContext();

  useEffect(() => {
    setIsError(isError || !nickname.length);
  }, [isError, nickname.length, setIsError]);

  return (
    <StyledCheckboxFormWrapper>
      <StyledCheckboxFormTitleWrapper>
        <h1>작성한 편지를 공개 하시겠어요?</h1>
        <p>익명 선택시 익명, 공개 선택시 설정한 이름으로 공개됩니다.</p>
      </StyledCheckboxFormTitleWrapper>
      <div>
        {CHECKBOX_LIST.map((item, i) => (
          <StyledCheckboxItem
            isActive={i === activeIndex}
            key={item}
            onClick={() => setActiveIndex(i)}
          >
            {activeIndex === i ? <RadioButtonActive /> : <RadioButton />}
            <span>{item}</span>
          </StyledCheckboxItem>
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
    </StyledCheckboxFormWrapper>
  );
}

function Button({
  children,
  onClick,
  isActionBtn,
  ...rest
}: {
  isActionBtn?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const { isError, activeIndex } = useModalContext();
  return (
    <StyledButton
      {...rest}
      type="button"
      disabled={isActionBtn && isError && !!activeIndex}
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
  const { activeIndex, setActiveIndex } = modalStore();
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
  CheckboxForm: forwardRef(CheckboxForm),
});
