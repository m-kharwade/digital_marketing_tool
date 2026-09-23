type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

export function ActivityIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 12h4l2.5 7L14 5l2.5 7H21" />
    </svg>
  );
}

export function LightbulbIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.4.3.6.8.6 1.3V16h6v-.9c0-.5.2-1 .6-1.3A6 6 0 0 0 12 3Z" />
    </svg>
  );
}

export function PaletteIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 1.8-2-.1-.6-.4-1.1-.4-1.7 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5Z" />
      <circle cx="7.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="7.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="10.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BarChartIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20V10" />
      <path d="M12 20V4" />
      <path d="M20 20v-6" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}

export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.3 2.3L15.5 9.5" />
    </svg>
  );
}

export function AlertTriangleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10.6 4.1a1.6 1.6 0 0 1 2.8 0l7.6 13.6a1.6 1.6 0 0 1-1.4 2.4H3.4a1.6 1.6 0 0 1-1.4-2.4Z" />
      <path d="M12 9.5v4" />
      <circle cx="12" cy="16.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SparklesIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M11 3v3M11 15v3M4.5 9h3M14.5 9h3" />
      <path d="M11 6a3 3 0 0 0 3 3 3 3 0 0 0-3 3 3 3 0 0 0-3-3 3 3 0 0 0 3-3Z" />
      <path d="M18 15v2.5M16.75 16.25h2.5" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function RefreshIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 12a8.5 8.5 0 0 1 14.9-5.6M20.5 12a8.5 8.5 0 0 1-14.9 5.6" />
      <path d="M18.5 3.5v3.8h-3.8" />
      <path d="M5.5 20.5v-3.8h3.8" />
    </svg>
  );
}

export function PencilIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M16.5 4.5 19.5 7.5 8 19H5v-3Z" />
      <path d="M14.5 6.5 17.5 9.5" />
    </svg>
  );
}

export function TrendingUpIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 17 10 10l4 4 7-7" />
      <path d="M15 6.5h6V12.5" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function InfoIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
