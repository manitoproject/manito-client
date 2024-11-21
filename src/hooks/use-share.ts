import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useToastActions } from '@/stores/toast-store';

export default function useShare() {
  const { pathname } = useLocation();
  const toastActions = useToastActions();

  const handleUrlCopy = useCallback(async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(
        `${import.meta.env.VITE_CLIENT_URL}${pathname}`,
      );
      toastActions.add('링크가 복사 되었습니다.');
    }
  }, [pathname, toastActions]);

  const handleKakakoShare = useCallback(
    (nickname?: string, paper?: string) => {
      if (!nickname || !paper) {
        return toastActions.add('카카오톡 공유 기능을 사용할 수 없습니다.');
      }
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        itemContent: {
          profileText: '마니또',
          profileImageUrl:
            'https://github.com/user-attachments/assets/54f814ab-dcc3-4a16-8bf3-29117b5d0744',
        },
        content: {
          title: paper,
          description: `${nickname}님의 롤링페이퍼를 작성해주세요 :)`,
          imageUrl:
            'https://github.com/user-attachments/assets/54f814ab-dcc3-4a16-8bf3-29117b5d0744',
          imageHeight: 200,
          link: {
            mobileWebUrl: `${import.meta.env.VITE_CLIENT_URL}${pathname}`,
            webUrl: `${import.meta.env.VITE_CLIENT_URL}${pathname}`,
          },
        },
        buttons: [
          {
            title: '지금 작성하러 가기',
            link: {
              mobileWebUrl: `${import.meta.env.VITE_CLIENT_URL}${pathname}`,
              webUrl: `${import.meta.env.VITE_CLIENT_URL}${pathname}`,
            },
          },
        ],
      });
    },
    [pathname, toastActions],
  );

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return { handleKakakoShare, handleUrlCopy };
}
