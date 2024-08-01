import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '../components/common/buttons';
import useToastStore from '../stores/toast-store';
import { getFontSizeAndWeight } from '../styles/mixins';

export default function Contact() {
  const [message, setMessage] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const { add } = useToastStore();
  const handleSendMessage = () => {
    if (message.length) {
      add('문의하기가 완료 되었습니다.');
      setMessage('');
    }
  };
  return (
    <StyledWrapper>
      <div>
        <h2>문의 내용</h2>
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => setIsFocus(false)}
            onFocus={() => setIsFocus(true)}
            placeholder="문의 내용을 작성해주세요."
          />
          {!isFocus && !message.length && (
            <span>*심한 욕설과 비난은 자제해주세요.</span>
          )}
        </div>
      </div>
      <div>
        <Button disabled={!message.length} onClick={handleSendMessage}>
          문의하기
        </Button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  div:nth-of-type(1) div {
    position: relative;
  }
  div:nth-of-type(2) {
  }
  h2 {
    color: ${({ theme }) => theme.colors['gray-900']};
    ${getFontSizeAndWeight('heading1', 'bold')}
  }
  span {
    pointer-events: none;
    position: absolute;
    left: 0;
    display: inline-block;
    padding: 50px 12px;
    color: ${({ theme }) => theme.colors['powderBlue-700']};
    ${getFontSizeAndWeight('body1', 'regular')}
  }
  textarea {
    height: 320px;
    padding: 20px 12px;
    width: 100%;
    resize: none;
    outline: none;
    color: ${({ theme }) => theme.colors.black};
    box-sizing: border-box;
    padding: 20.5px 44px 20.5px 12px;
    width: 100%;
    ${getFontSizeAndWeight('heading3', 'regular')}
    background-color: ${({ theme }) => theme.colors['powderBlue-50']};
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors['powderBlue-300']};
  }

  textarea::placeholder {
    color: ${(props) => props.theme.colors['gray-500']};
  }
  textarea:focus {
    background-color: ${({ theme }) => theme.colors['powderBlue-100']};
    border: 1px solid ${({ theme }) => theme.colors['powderBlue-900']};
  }
`;
