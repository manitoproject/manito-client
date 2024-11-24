import { TreasureStartBg } from '@/assets/imgs';
import { Button } from '@/components/common/buttons/buttons';
import useSetHeader from '@/hooks/use-set-header';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';

export default function TreasureBoxMessageCreate() {
  useSetHeader({
    title: '보물선택',
    bg: 'treasure-teal-700',
    color: 'white',
    font: 'Cafe24Ohsquare',
    rightBtn: false,
  });

  return (
    <div>
      <Button
        font="Cafe24Ohsquare"
        // disabled={!name.length || isError || isPending}
        // onClick={handleSubmit}
      >
        선택하기
      </Button>
      <StyledBackdrop bg={TreasureStartBg} />
    </div>
  );
}
