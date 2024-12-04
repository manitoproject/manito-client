import { useQuery } from '@tanstack/react-query';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';

import { decoPositions } from '@/lib/cake-decoration';
import { findImgByThemeName } from '@/lib/common';
import { messageQueries } from '@/lib/query-factory';
import routes from '@/routes';

interface MakeCakeDecorationButtonsProps {
  activeIndex: number;
}

export default function MakeCakeDecorationButtons({
  activeIndex,
}: MakeCakeDecorationButtonsProps) {
  const { id } = useParams();
  const { data: messages } = useQuery(messageQueries.paper(Number(id)));
  const navigate = useNavigate();
  const handleViewItemDetail = (pageId: number, itemId: number) => {
    navigate({
      pathname: routes.makecake.detail(pageId),
      search: createSearchParams({ id: String(itemId) }).toString(),
    });
  };

  const startIndex = activeIndex === 0 ? 0 : activeIndex === 1 ? 13 : 26;
  const endIndex = activeIndex === 0 ? 13 : activeIndex === 1 ? 26 : 39;

  return messages?.slice(startIndex, endIndex).map((deco, i) => {
    return (
      <button
        style={{ left: decoPositions[i].x, top: decoPositions[i].y }}
        type="button"
        key={deco.id}
        onClick={() => handleViewItemDetail(deco.paperId, deco.id)}
      >
        <img src={findImgByThemeName(deco.theme)} alt={deco.theme} />
      </button>
    );
  });
}
