import { useState } from 'react';

import { Button } from '../components/common/buttons';
import NameForm from '../components/common/name-form';
import { Modal } from '../components/modal/modal';
import ThemeCarousel from '../components/setup/theme-carousel';
import { titleMaxLength } from '../constants/regexPatterns';
import themeList from '../constants/theme-list';
import { useNameForm } from '../hooks';
import { useCreateRollingPaper } from '../queries/paper';
import theme from '../styles/theme';
import {
  StyledHeading,
  StyledSectionWrapper,
  StyledWrapper,
} from './rolling-setup.style';

export default function RollingSetup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('title');
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const { mutate, isPending } = useCreateRollingPaper();
  const handleSubmit = () => {
    setIsModalOpen(true);
    // mutate({
    //   category: 'ROLLING_PAPER',
    //   theme: themeList[activeThemeIndex].themeEng,
    //   title: name,
    // });
  };

  return (
    <StyledWrapper>
      <StyledSectionWrapper>
        <NameForm
          ref={nameRef}
          onChange={handleNameChange}
          value={name}
          isError={isError}
          maxLength={titleMaxLength}
          onClick={handleNameReset}
        >
          <StyledHeading>
            <h2>롤링페이퍼</h2>
            <h3>
              <strong>제목</strong>을 입력해주세요.
            </h3>
          </StyledHeading>
        </NameForm>
        <ThemeCarousel
          onActiveIndexChange={(i) => setActiveThemeIndex(i)}
          activeIndex={activeThemeIndex}
        />
      </StyledSectionWrapper>
      <Button
        disabled={!name.length || isError || isPending}
        hasMarginBottom
        onClick={handleSubmit}
      >
        시작하기
      </Button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <Modal.CheckboxForm />
          <Modal.Buttons>
            <Modal.Button
              css={{ border: `1px solid ${theme.colors['gray-300']}` }}
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </Modal.Button>
            <Modal.Button
              isActionBtn
              css={{
                backgroundColor: theme.colors['gray-900'],
                color: theme.colors.white,
              }}
              onClick={() => setIsModalOpen(false)}
            >
              작성하기
            </Modal.Button>
          </Modal.Buttons>
        </Modal>
      )}
    </StyledWrapper>
  );
}
