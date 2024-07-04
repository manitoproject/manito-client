import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { routes } from '../router';
import { getFontSizeAndWeight } from '../styles/utils';
const CONTENTS = [
  {
    name: '롤링 페이퍼',
    isActive: true,
    href: () => routes.rolling.setup(),
    img: 'src/assets/imgs/rolling.png',
  },
  {
    name: '케이크 꾸미기',
    isActive: false,
    href: () => '',
    img: 'src/assets/imgs/rolling.png',
  },
  {
    name: '보물상자 채우기',
    isActive: false,
    href: () => '',
    img: 'src/assets/imgs/rolling.png',
  },
];

export default function Home() {
  return (
    <StyledWrapper>
      <section>
        <StyledHeading>
          <p>김정윤님 안녕하세요!</p>
          <p>
            <strong>다양한 컨텐츠</strong>를 즐겨보세요.
          </p>
        </StyledHeading>
        <StyeldBanner></StyeldBanner>
        <StyeldContents>
          {CONTENTS.map((content) => (
            <StyledContentItem key={content.name}>
              {content.isActive ? (
                <Link to={content.href()}>
                  <img src={content.img} alt={content.name} />
                </Link>
              ) : (
                <div>{content.name}</div>
              )}
            </StyledContentItem>
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
  p:first-child {
    color: ${(props) => props.theme.colors.gray[800]};

    ${getFontSizeAndWeight('heading2', 'medium')}
  }
  p:last-child {
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
const StyeldContents = styled.ul`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;
const StyledContentItem = styled.li`
  a,
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.powderBlue[100]};
    border-radius: 10px;
    aspect-ratio: 1;

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;
