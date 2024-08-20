import { KAKAO_PROFILE_URL } from '../constants/profile';
import { discordRequester } from '.';

export const sendFeedbackMessage = async ({
  content,
  user,
}: {
  content: string;
  user?: User;
}) => {
  if (!user) return;
  const { data } = await discordRequester.post('', {
    avatar_url:
      user.isOriginProfile === 'N' ? KAKAO_PROFILE_URL : user.profileImage,
    username: user.email,
    embeds: [
      {
        title: content,
        color: 0xe7d747,
        timestamp: new Date().toISOString(),
      },
    ],
  });
  return data;
};
