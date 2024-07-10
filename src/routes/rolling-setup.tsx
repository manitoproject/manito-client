import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/common/buttons';
import NameForm from '../components/common/name-form';
import ThemeCarousel from '../components/setup/theme-carousel';
import { useNameForm } from '../hooks';
import { titleMaxLength } from '../lib/regexPatterns';
import themeList from '../lib/theme-map';
import { routes } from '../router';
import { getFontSizeAndWeight } from '../utils/style';

const createBoard = async ({
  subject,
  theme,
}: {
  subject: string;
  theme: string;
}) => {
  const { data } = await axios.post<Board>('/rolling/create', {
    subject,
    theme,
  });
  return data;
};

export default function RollingSetup() {
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('title');
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      navigate(routes.rolling.detail(data.id));
    },
  });
  const handleSubmit = () => {
    mutate({ subject: name, theme: themeList[activeThemeIndex].themeEng });
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
            <h2>
              롤링페이퍼
              <br />
              <strong>제목</strong>을 입력해주세요.
            </h2>
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
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  button {
    margin-top: auto;
    z-index: 50;
  }
`;

const StyledHeading = styled.div`
  h2 {
    color: ${(props) => props.theme.colors.gray[900]};
    ${getFontSizeAndWeight('heading3', 'medium')};
  }
  strong {
    font-size: 18px;
    color: ${(props) => props.theme.colors.powderBlue[900]};
    ${getFontSizeAndWeight('heading2', 'bold')};
  }
`;

const StyledSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
