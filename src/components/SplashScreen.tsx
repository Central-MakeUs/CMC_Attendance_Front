'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const DOTS = [
  {
    size: 12,
    left: '16.7%',
    top: '10.4%',
    opacity: 0.95,
    blur: 2,
    animation: 'float-a 4s ease-in-out infinite',
  },
  {
    size: 7,
    left: '11.3%',
    top: '31.6%',
    opacity: 0.75,
    blur: 1.5,
    animation: 'float-b 5s ease-in-out infinite',
  },
  {
    size: 10,
    left: '30.5%',
    top: '23.5%',
    opacity: 0.85,
    blur: 2,
    animation: 'float-c 6s ease-in-out infinite',
  },
  {
    size: 11,
    left: '82.3%',
    top: '83.5%',
    opacity: 0.85,
    blur: 2,
    animation: 'float-b 5.5s ease-in-out infinite',
  },
];

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('splash-shown')) return;
    sessionStorage.setItem('splash-shown', '1');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);

    const showTimer = setTimeout(() => setFadeOut(true), 2000);
    const hideTimer = setTimeout(() => setVisible(false), 2500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`absolute inset-0 z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{
        background:
          'linear-gradient(146.22deg, rgb(107, 129, 255) 0.5%, rgb(193, 202, 255) 95.14%)',
      }}
    >
      {DOTS.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            left: dot.left,
            top: dot.top,
            background: `rgba(255, 255, 255, ${dot.opacity})`,
            filter: `blur(${dot.blur}px)`,
            boxShadow: `0 0 ${dot.size * 2}px ${dot.size}px rgba(255, 255, 255, 0.45)`,
            animation: dot.animation,
          }}
        />
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[100px]">
        <Image src="/cmc-logo.svg" alt="CMC" fill />
      </div>
    </div>
  );
}
