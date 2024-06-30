import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { getFontSizeAndWeight } from '../styles/utils';

const CONTENTS = [
  {
    name: '롤링 페이퍼',
    isActive: true,
    herf: '/home/rolling-paper',
  },
  {
    name: '케이크 꾸미기',
    isActive: false,
    herf: '',
  },
  {
    name: '보물상자 채우기',
    isActive: false,
    herf: '',
  },
];

export default function Home() {
  return (
    <StyledWrapper>
      <section>
        <StyledHeading>
          <p>김정윤님 안녕하세요!</p>
          <h2>
            <strong>다양한 컨텐츠</strong>를 즐겨보세요.
          </h2>
        </StyledHeading>
        <StyeldBanner></StyeldBanner>
        <StyeldContents>
          {CONTENTS.map((content) => (
            <div key={content.name}>
              {content.isActive ? (
                <Link to={content.herf}>{content.name}</Link>
              ) : (
                <div>{content.name}</div>
              )}
            </div>
          ))}
        </StyeldContents>
      </section>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
const StyledHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  p {
    color: ${(props) => props.theme.colors.gray[800]};

    ${getFontSizeAndWeight('heading2', 'medium')}
  }
  h2 {
    color: ${(props) => props.theme.colors.gray[900]};
    ${getFontSizeAndWeight('heading1', 'bold')}
    strong {
      color: ${(props) => props.theme.colors.powderBlue[900]};
    }
  }
`;
const StyeldBanner = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.powderBlue[300]};
  height: 80px;
`;
const StyeldContents = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  & > div > a,
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.powderBlue[100]};
    border-radius: 10px;
    height: 148px;
  }
`;
