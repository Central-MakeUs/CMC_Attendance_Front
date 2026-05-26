'use client';

import { useEffect, useState } from 'react';

type KakaoLoadState = 'idle' | 'loading' | 'ready' | 'error';

let loadState: KakaoLoadState = 'idle';
const listeners = new Set<(state: KakaoLoadState) => void>();

const notify = (state: KakaoLoadState) => {
  loadState = state;
  listeners.forEach((fn) => fn(state));
};

const loadKakaoSDK = () => {
  if (loadState !== 'idle') return;
  notify('loading');

  const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  if (!appKey) {
    notify('error');
    return;
  }

  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;
  script.onload = () => {
    window.kakao.maps.load(() => notify('ready'));
  };
  script.onerror = () => notify('error');
  document.head.appendChild(script);
};

export const useKakaoLoader = () => {
  const [state, setState] = useState<KakaoLoadState>(() => {
    if (loadState === 'idle') return 'idle';
    return loadState;
  });

  useEffect(() => {
    listeners.add(setState);
    if (loadState === 'idle') loadKakaoSDK();
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return state;
};
