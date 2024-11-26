import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useToastActions } from '@/stores/toast-store';

const content_map: Record<RouteContentType, { text: string; url: string }> = {
  makecake: {
    text: '케이크를 꾸며주세요 :)',
    url: 'https://github.com/user-attachments/assets/9478a827-738d-45ed-9086-1513b1261faf',
  },
  rollingpaper: {
    text: '롤링페이퍼를 작성해주세요 :)',
    url: 'https://github.com/user-attachments/assets/00c85838-9fd9-48c2-90d1-e359dc447eee',
  },
  treasurebox: {
    text: '마음의 보물상자를 채워주세요 :)',
    url: 'https://github.com/user-attachments/assets/2ad50dcd-d42c-43b0-be30-c7f1042c514f',
  },
};

export default function useShare(content: RouteContentType) {
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
          description: `${nickname}님의 ${content_map[content].text}`,
          imageUrl: content_map[content].url,
          imageHeight: 400,
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
    [content, pathname, toastActions],
  );

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return { handleKakakoShare, handleUrlCopy };
}
