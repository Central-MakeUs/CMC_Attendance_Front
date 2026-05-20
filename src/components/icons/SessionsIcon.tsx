interface Props {
  isActive?: boolean;
}

export default function SessionsIcon({ isActive = false }: Props) {
  const primary = isActive ? '#6B81FF' : '#A9ABBF';
  const secondary = isActive ? '#C1CAFF' : '#D7D8E2';

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 4H20V7H4V4Z" fill={primary} />
      <path d="M4 4V3C3.44772 3 3 3.44772 3 4H4ZM20 4H21C21 3.44772 20.5523 3 20 3V4ZM20 7V8H21V7H20ZM4 7H3V8H4V7ZM4 4V5H20V4V3H4V4ZM20 4H19V7H20H21V4H20ZM20 7V6H4V7V8H20V7ZM4 7H5V4H4H3V7H4Z" fill={primary} />
      <path d="M4 9H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V9Z" fill={secondary} stroke={secondary} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 3V5" stroke={secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 3V5" stroke={secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
