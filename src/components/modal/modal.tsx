import { useEffect } from 'react';

import { RadioButton, RadioButtonActive } from '../../assets/svg/icons';
import { nicknameMaxLength } from '../../constants/regexPatterns';
import { useNameForm, useOutsideClick } from '../../hooks';
import Input from '../common/input';
import {
  StyledButton,
  StyledButtonWrapper,
  StyledCheckboxFormTitleWrapper,
  StyledCheckboxFormWrapper,
  StyledCheckboxItem,
  StyledModalMainWrapper,
} from './modal.style';
import ModalContext, { useModalContext } from './modalContext';
import useModal from './useModal';

const CHECKBOX_LIST = ['공개로 작성할래요.', '익명으로 작성할래요.'];

function TitleWrapper({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
function Title({ children }: { children: React.ReactNode }) {
  return <h1>{children}</h1>;
}
function Description({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

function CheckboxForm() {
  const { activeIndex, setActiveIndex } = useModalContext();
  const { setIsError } = useModalContext();
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('nickname');

  useEffect(() => {
    setIsError(isError || !name.length);
  }, [isError, name.length, setIsError]);

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
          ref={nameRef}
          value={name}
          onChange={handleNameChange}
          onClick={handleNameReset}
        >
          <span>
            {name.length} / {nicknameMaxLength}
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
  const { isError, setIsError, activeIndex, setActiveIndex } = useModal();
  const ref = useOutsideClick(onClick, isOpen);

  return (
    <ModalContext.Provider
      value={{ isError, setIsError, activeIndex, setActiveIndex }}
    >
      <StyledModalMainWrapper>
        <div ref={ref}>{children}</div>
      </StyledModalMainWrapper>
    </ModalContext.Provider>
  );
}

export const Modal = Object.assign(ModalMain, {
  Buttons: Buttons,
  Button: Button,
  TitleWrapper: TitleWrapper,
  Title: Title,
  Description: Description,
  CheckboxForm: CheckboxForm,
});
