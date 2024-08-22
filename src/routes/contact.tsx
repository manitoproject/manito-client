import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '../components/common/button/buttons';
import { useSendFeedbackMessage } from '../queries/contact';
import { useUserQuery } from '../queries/users';
import { getFontSizeAndWeight } from '../styles/mixins';

export default function Contact() {
  const { data } = useUserQuery();
  const [message, setMessage] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const { mutate, isPending } = useSendFeedbackMessage(setMessage);
  const handleSendMessage = () => {
    if (message.length) mutate({ content: message, user: data?.data });
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
        <Button
          disabled={!message.length || isPending}
          onClick={handleSendMessage}
        >
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
    font-family: ${({ theme }) => theme.fontFamily.SpoqaHanSansNeo};
    height: 320px;
    padding: 20px 12px;
    width: 100%;
    resize: none;
    outline: none;
    color: ${({ theme }) => theme.colors['gray-900']};
    box-sizing: border-box;
    padding: 20.5px 44px 20.5px 12px;
    width: 100%;
    ${getFontSizeAndWeight('heading3', 'regular')}
    background-color: ${({ theme }) => theme.colors['powderBlue-50']};
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors['powderBlue-300']};
  }

  textarea::placeholder {
    color: ${(props) => props.theme.colors['gray-400']};
  }
  textarea:focus {
    background-color: ${({ theme }) => theme.colors['powderBlue-100']};
    border: 1px solid ${({ theme }) => theme.colors['powderBlue-900']};
  }
`;
