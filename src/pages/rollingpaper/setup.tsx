import { useState } from 'react';

import { Button } from '@/components/common/buttons/buttons';
import NameForm from '@/components/common/name-form';
import RollingpaperSetupThemeCarousel from '@/components/rollingpaper/setup/theme-carousel';
import ReactHelmet from '@/helmet';
import useNameForm from '@/hooks/use-name-form';
import useSetHeader from '@/hooks/use-set-header';
import { titleMaxLength } from '@/lib/regex-patterns';
import { ROLLINGPAPER_THEMES } from '@/lib/rolling-paper';
import { useCreatePaper } from '@/mutations/paper';
import {
  StyledSetupHeading,
  StyledSetupNameFormWrapper,
  StyledSetupWrapper,
} from '@/styles/styled';

export default function RollingpaperSetup() {
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('title');
  const [activeTheme, setActiveTheme] =
    useState<RollingpaperThemeName>('space');
  const { mutate, isPending } = useCreatePaper('rollingpaper');

  const handleSubmit = () => {
    mutate({
      category: 'ROLLING_PAPER',
      theme: ROLLINGPAPER_THEMES.find((theme) => theme.id === activeTheme)!.id,
      title: name,
    });
  };

  useSetHeader({ title: '롤링페이퍼 테마선택', rightBtn: false });

  return (
    <StyledSetupWrapper>
      <StyledSetupNameFormWrapper>
        <NameForm
          placeholder="제목을 입력해주세요."
          ref={nameRef}
          onChange={handleNameChange}
          value={name}
          isError={isError}
          maxLength={titleMaxLength}
          onClick={handleNameReset}
        >
          <StyledSetupHeading>
            <h2>롤링페이퍼</h2>
            <h3>
              <strong>제목</strong>을 입력해주세요.
            </h3>
          </StyledSetupHeading>
        </NameForm>
        <RollingpaperSetupThemeCarousel
          activeTheme={activeTheme}
          onChangeActiveTheme={(theme: RollingpaperThemeName) =>
            setActiveTheme(theme)
          }
        />
      </StyledSetupNameFormWrapper>
      <Button
        disabled={!name.length || isError || isPending}
        onClick={handleSubmit}
      >
        시작하기
      </Button>
      <ReactHelmet title={`롤링페이퍼 테마선택 - 마니또`} />
    </StyledSetupWrapper>
  );
}
