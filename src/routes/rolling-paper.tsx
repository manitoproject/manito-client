import styled from '@emotion/styled';
import { useState } from 'react';

import AddCircle from '../assets/svg/add-circle.svg';
import Link from '../assets/svg/link.svg';
import { Button } from '../components/common/buttons';
import { getFontSizeAndWeight } from '../styles/utils';
export default function RollingPaper() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <StyledWrapper>
      <StyledDiv>
        <span>3개의 작성물</span>
        <button>
          <Link />
        </button>
      </StyledDiv>
      <StyledPaperList>
        {Array(10)
          .fill('')
          .map((_, i) => (
            <li key={i}>
              <button type="button" onClick={() => setIsBottomSheetOpen(true)}>
                <AddCircle />
              </button>
            </li>
          ))}
      </StyledPaperList>
      {isBottomSheetOpen && (
        <StyledBottomSheet>
          <div>
            {Array(12)
              .fill('')
              .map((_, i) => (
                <div key={i}>
                  <button type="button"></button>
                </div>
              ))}
          </div>
          <Button>이모지 선택하기</Button>
        </StyledBottomSheet>
      )}
    </StyledWrapper>
  );
}
const StyledBottomSheet = styled.div`
  position: sticky;
  bottom: 0;
  width: inherit;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 24px;
  background-color: ${(props) => props.theme.colors.white};
  & > div:nth-child(1) {
    display: grid;
    gap: 10px 16px;
    grid-template-columns: repeat(4, 1fr);
    div {
      border-radius: 6px;
      height: 66px;
      background-color: ${(props) => props.theme.colors.gray[400]};
    }
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    color: ${(props) => props.theme.colors.gray[800]};
    ${getFontSizeAndWeight('heading3', 'regular')};
  }
  button {
    padding: 6px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.gray[100]};
  }
`;

const StyledPaperList = styled.ul`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  li {
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 148px;
    background-color: ${(props) => props.theme.colors.gray[300]};
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
    }
  }
`;
