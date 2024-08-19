import { useState } from 'react';

import { Button } from '../../components/common/button/buttons';
import NameForm from '../../components/common/name-form';
import ThemeCarousel from '../../components/setup/theme-carousel';
import { titleMaxLength } from '../../constants/regex-patterns';
import themeList from '../../constants/theme-list';
import { useNameForm } from '../../hooks';
import { useCreateRollingpaper } from '../../queries/paper';
import {
  StyledHeading,
  StyledSectionWrapper,
  StyledWrapper,
} from './setup.style';

export default function RollingpaperSetup() {
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('title');
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const { mutate, isPending } = useCreateRollingpaper();
  const handleSubmit = () => {
    mutate({
      category: 'ROLLING_PAPER',
      theme: themeList[activeThemeIndex].themeEng,
      title: name,
    });
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
        onClick={handleSubmit}
      >
        시작하기
      </Button>
    </StyledWrapper>
  );
}
