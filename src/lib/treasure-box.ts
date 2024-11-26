import { FunctionComponent, SVGAttributes } from 'react';

import {
  TreasureBead,
  TreasureBook,
  TreasureClover,
  TreasureDoll,
  TreasureFlower,
  TreasureKey,
  TreasureLetter,
  TreasureMirror,
  TreasureNecklace,
  TreasurePotion,
  TreasureRibbon,
  TreasureSword,
} from '@/assets/svg/treasures';

export type Treasure =
  | 'TreasureBead'
  | 'TreasureBook'
  | 'TreasureClover'
  | 'TreasureDoll'
  | 'TreasureFlower'
  | 'TreasureKey'
  | 'TreasureLetter'
  | 'TreasureMirror'
  | 'TreasureNecklace'
  | 'TreasurePotion'
  | 'TreasureRibbon'
  | 'TreasureSword';

export const findTreasureByName = (name?: string) => {
  return TREASURES.find((treasure) => treasure.name === name);
};

export const TREASURES: {
  title: string;
  desc: string;
  svg: FunctionComponent<SVGAttributes<SVGElement>>;
  name: Treasure;
}[] = [
  {
    name: 'TreasureMirror',
    svg: TreasureMirror,
    title: '직면의 거울',
    desc: '자신을 직면하고 받아들여야할 상황이 있죠. 나를 마주보고 용기를 얻을 수 있도록 도와줄게요. 나를 있는 그대로 볼 수 있는 건 나 자신뿐 이랍니다.',
  },
  {
    name: 'TreasureNecklace',
    svg: TreasureNecklace,
    title: '신비 목걸이',
    desc: '우리가 이해할 수 없는 감정과 생각에 대해 신비함을 느끼며 탐구하고, 이해하며 내면의 성장을 이루게 됩니다. 깊이 있는 자아를 형성해 삶을 더 의미있게 바라볼 수 있어요.',
  },
  {
    name: 'TreasureFlower',
    svg: TreasureFlower,
    title: '은방울꽃',
    desc: "방울꽃의 꽃말은 '틀림없이 행복해진다'와'행복이 온다. 입니다. 지금의 힘든 고난과 시련이 당신의 행복을 막을 순 없어요.",
  },
  {
    name: 'TreasurePotion',
    svg: TreasurePotion,
    title: '기운의 포션',
    desc: '지친 당신이 기운을 내기 위해 필요한 건, 충분한 휴식과 안정이 필요합니다. 기운 포션은 당신의 긍정적인 에너지를 회복할 수 있도록 도움을 줄거예요.',
  },
  {
    name: 'TreasureLetter',
    svg: TreasureLetter,
    title: '진심의 편지',
    desc: '상대방에게 진심을 전하기 어려울 때가 많지 않나요? 복잡한 생각은 접어두고 진심 된 나의 마음을 솔직하게 표현해봐요. 진심된 마음은 반드시 닿을 수 있답니다.',
  },
  {
    name: 'TreasureKey',
    svg: TreasureKey,
    title: '마음의 열쇠',
    desc: '마음을 여는 것은 때로 두렵고어려울 수 있지만, 그 과정을 통해 깊이 있는 관계를 형성할 수 있어요. 나 자신도, 타인도 깊이 있게바라볼 수 있는 열쇠를 드릴게요.',
  },
  {
    name: 'TreasureBook',
    svg: TreasureBook,
    title: '지식책',
    desc: '지식을 습득하는 건, 삶을 더 깊이 이해하고 세상을 더 명확하게 볼 수 있게 해주는 중요한 경험 입니다. 지식을 통해 세상을 더 깊이 이해해보는 시간을 가져보세요.',
  },
  {
    name: 'TreasureClover',
    svg: TreasureClover,
    title: '네잎클로버',
    desc: '네잎클로버는 행운, 평화, 약속을 의미하죠. 지친 당신에게 네잎 클로버의 긍정적인 의미와 기운을 담아 선물할게요.',
  },

  {
    name: 'TreasureRibbon',
    svg: TreasureRibbon,
    title: '하늘 리본',
    desc: '하늘을 바라보는 것은 안정감과 평온함을 주고, 일상 속 스트레스를 완화하는데 도움을 줍니다.하늘 리본을 통해 당신이 마음의 평화를 찾아봐요.',
  },
  {
    name: 'TreasureDoll',
    svg: TreasureDoll,
    title: '추억 곰인형',
    desc: '좋은 기억을 떠올리면 행복한 감정이 생기고, 삶을 이겨낼 수 있는 힘을 얻을 수 있죠. 특별하고 소중한 순간들은 항상 당신과 함께하고 있다는 걸 잊지마세요.',
  },

  {
    name: 'TreasureBead',
    svg: TreasureBead,
    title: '청렴한 구슬',
    desc: '청렴한 태도는 개인의 삶 뿐 만 아니라, 사회의 긍정적인 영향을 미치죠. 개인의 성장을 돕고, 더 나아가 사회의 건강한 발전에 기여할 수 있는 사람이 되길 소망해요.',
  },
  {
    name: 'TreasureSword',
    svg: TreasureSword,
    title: '용기의 검',
    desc: '세상을 헤쳐나가기 위해서는 때로는 용기 있는 결정이 필요하죠.목표를 달성하고 진정한 성장을이루기 위해 두려움을 마주하고앞으로 나아가는 힘을 줄게요. ',
  },
];
