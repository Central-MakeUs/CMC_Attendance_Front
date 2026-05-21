export default function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 4.5H9v6l-2 3h10l-2-3V4.5z"
        fill="#4864FF"
        stroke="#4864FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="12"
        y1="13.5"
        x2="12"
        y2="19"
        stroke="#4864FF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
