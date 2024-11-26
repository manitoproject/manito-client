import styled from '@emotion/styled';

import { TreasureLetter } from '@/assets/svg/icons';
import { getFontSizeAndWeight } from '@/styles/mixins';

interface TreasureBoxTextareaProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TreasureBoxTextarea({
  onChange,
  value,
}: TreasureBoxTextareaProps) {
  return (
    <StyledTextarea>
      <TreasureLetter />
      <textarea value={value} disabled={!onChange} onChange={onChange} />
    </StyledTextarea>
  );
}

const StyledTextarea = styled.div`
  position: relative;
  z-index: 10;
  margin-top: 24px;
  textarea,
  svg {
    height: 240px;
    width: 100%;
  }
  svg {
    top: 0;
    position: absolute;
  }
  textarea {
    color: ${({ theme }) => theme.colors['brown-700']};
    resize: none;
    outline: none;
    position: relative;
    font-family: ${({ theme }) => theme.fontFamily.Cafe24Ohsquare};
    ${getFontSizeAndWeight('heading3', 'bold')}
    z-index: 50;
    background: transparent;
    padding: 28px 65px;
  }
`;
