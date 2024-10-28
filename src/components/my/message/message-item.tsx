import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { EditSquare, Trash } from '@/assets/svg/icons';
import DeleteModal from '@/components/modal/delete-modal';
import EmojiSkin from '@/components/rollingpaper/emoji-skin';
import {
  StyledEditButton,
  StyledMessageItem,
  StyledTrashButton,
} from '@/components/rollingpaper/list/item.style';
import { findSvgByThemeName } from '@/constants/cake-decoration';
import { getRollingThemeName } from '@/constants/rolling-paper';
import { useDeleteMessage } from '@/queries/message';
import routes from '@/routes';
import theme from '@/styles/theme';
import { Message } from '@/types/message';

interface MyMessageItemProps {
  message: Message<User>;
  activeCagegory: CategoryLowerCase;
}
export default function MyMessageItem({
  message,
  activeCagegory,
}: MyMessageItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useDeleteMessage({
    paperId: message.paperId,
  });
  const navigate = useNavigate();
  const Svg = findSvgByThemeName(message.theme);

  const handleEditMessage = () => {
    navigate(routes[activeCagegory].form('edit', message.paperId), {
      state: {
        ...message,
        paperTheme: getRollingThemeName(message),
      },
    });
  };

  const handleViewDetailItem = async () => {
    navigate({
      pathname: routes[activeCagegory].detail(message.paperId),
      search: createSearchParams({ id: String(message.id) }).toString(),
    });
  };

  return (
    <StyledMessageItem isServerData>
      <StyledEditButton type="button" onClick={handleEditMessage}>
        <EditSquare width={24} height={24} fill={theme.colors['gray-600']} />
      </StyledEditButton>
      <StyledTrashButton type="button" onClick={() => setIsModalOpen(true)}>
        <Trash width={24} height={24} fill={theme.colors['gray-700']} />
      </StyledTrashButton>
      <EmojiSkin
        onClick={handleViewDetailItem}
        paperId={message.paperId}
        isSmall
        message={message}
      >
        {Svg && <Svg />}
        <p>{activeCagegory === 'rollingpaper' && message.content}</p>
      </EmojiSkin>
      {isModalOpen && (
        <DeleteModal
          isMessageDelete
          setIsOpen={setIsModalOpen}
          isOpen={isModalOpen}
          handler={() => mutate(message.id)}
        />
      )}
    </StyledMessageItem>
  );
}
