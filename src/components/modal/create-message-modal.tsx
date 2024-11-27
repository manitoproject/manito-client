import { useState } from 'react';
import { useParams } from 'react-router-dom';

import RadioButton from '@/components/common/buttons/radio-button';
import Input from '@/components/common/input';
import { Modal } from '@/components/modal';
import { MessageForm } from '@/hooks/use-message-form';
import useNameForm from '@/hooks/use-name-form';
import { nicknameMaxLength } from '@/lib/regex-patterns';
import { useCreateMessage } from '@/mutations/message';
import theme from '@/styles/theme';

interface CreateMessageModalProps {
  onCloseModal: () => void;
  contentType: RouteContentType;
  form: MessageForm;
  position: number;
}

export default function CreateMessageModal({
  onCloseModal,
  contentType,
  form,
  position,
}: CreateMessageModalProps) {
  const [isPublic, setIsPublic] = useState(true);
  const params = useParams();
  const { mutate, isPending } = useCreateMessage(
    Number(params.id),
    contentType,
  );
  const {
    handleNameChange,
    handleNameReset,
    isError,
    name: nickname,
    nameRef: nicknameRef,
  } = useNameForm('nickname');

  const handleMessageSubmit = () => {
    mutate({
      ...form,
      position,
      isPublic: isPublic ? 'Y' : 'N',
      paperId: Number(params.id),
      anonymous: !isPublic ? nickname : '',
    });
  };

  return (
    <Modal onClose={onCloseModal}>
      <Modal.NicknameVisibility>
        <div>
          <RadioButton
            isActive={isPublic}
            onChangeActive={() => setIsPublic(true)}
          >
            <p>공개로 작성할래요.</p>
          </RadioButton>
          <RadioButton
            isActive={!isPublic}
            onChangeActive={() => setIsPublic(false)}
          >
            <p>익명으로 작성할래요.</p>
          </RadioButton>
        </div>
        {!isPublic && (
          <Input
            isError={isError}
            ref={nicknameRef}
            value={nickname}
            onChange={handleNameChange}
            onClick={handleNameReset}
          >
            <span>
              {nickname.length} / {nicknameMaxLength}
            </span>
          </Input>
        )}
      </Modal.NicknameVisibility>
      <Modal.Buttons>
        <Modal.Button
          css={{ border: `1px solid ${theme.colors['gray-300']}` }}
          onClick={onCloseModal}
        >
          닫기
        </Modal.Button>
        <Modal.Button
          disabled={(isError && !isPublic) || isPending}
          css={{
            backgroundColor: theme.colors['gray-900'],
            color: theme.colors.white,
          }}
          onClick={handleMessageSubmit}
        >
          작성하기
        </Modal.Button>
      </Modal.Buttons>
    </Modal>
  );
}
