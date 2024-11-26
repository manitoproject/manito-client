import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useToastActions } from '@/stores/toast-store';

const content_map: Record<RouteContentType, { text: string; url: string }> = {
  makecake: {
    text: '케이크를 꾸며주세요 :)',
    url: 'https://private-user-images.githubusercontent.com/98396758/390100405-785d1b97-4896-418a-aa94-6cd60061643c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI2NDY3ODEsIm5iZiI6MTczMjY0NjQ4MSwicGF0aCI6Ii85ODM5Njc1OC8zOTAxMDA0MDUtNzg1ZDFiOTctNDg5Ni00MThhLWFhOTQtNmNkNjAwNjE2NDNjLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDExMjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTI2VDE4NDEyMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTkzM2Y3YmU2NzUxMTEzOGU2ODU5ZWI1NTEyMWQ3YmQ0NTZiNWViYjEwZTY5ZmU2OWVkYzU3MDNmOWRhNDI3OTkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.1Ck94VpCk8FhTqBQanpA6FJMFd-8yU0f0Vl7rylttRs',
  },
  rollingpaper: {
    text: '롤링페이퍼를 작성해주세요 :)',
    url: 'https://private-user-images.githubusercontent.com/98396758/390100417-75bda30a-d6c2-4c98-80a2-7ea37c77f2a2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI2NDY3ODEsIm5iZiI6MTczMjY0NjQ4MSwicGF0aCI6Ii85ODM5Njc1OC8zOTAxMDA0MTctNzViZGEzMGEtZDZjMi00Yzk4LTgwYTItN2VhMzdjNzdmMmEyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDExMjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTI2VDE4NDEyMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVhNjhjNGQ2ZGMzMTczYzVhYzMwZDk3ZmE0ZTg5MzY3NDkyMGMwMjA4MjE4MDBhYTgxMWQ5NDI2NzNiMzJlM2MmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.PuY4-pd0wag8LJTztpX_u2nLq7dUzOKSRe8WvmPU0Y0',
  },
  treasurebox: {
    text: '마음의 보물상자를 채워주세요 :)',
    url: 'https://private-user-images.githubusercontent.com/98396758/390100425-e0540c5d-a398-4a95-9a81-9f24c8a8608d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzI2NDY3ODEsIm5iZiI6MTczMjY0NjQ4MSwicGF0aCI6Ii85ODM5Njc1OC8zOTAxMDA0MjUtZTA1NDBjNWQtYTM5OC00YTk1LTlhODEtOWYyNGM4YTg2MDhkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDExMjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTI2VDE4NDEyMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTZhOWU0MjBkMzlkNGY5ODUwNDc3M2FlM2VjZDEyODNhMTJiM2JlMDJjMzM3OGUzOGMzZGNmNDQ5N2JhOGU3MDgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.NOTSXbhOOHBA0h5Fmuf25nrdlAeiCxL-xguRHbr58SU',
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
    [content, pathname, toastActions],
  );

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return { handleKakakoShare, handleUrlCopy };
}
