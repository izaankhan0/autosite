import type { SVGProps } from "react";

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      <path d="M10.15 10.41L4.6 7.62"></path>
      <path d="M13.85 10.41l5.55-2.79"></path>
      <path d="M12 22.08V12"></path>
      <path d="M18.73 17.5L12 22.08"></path>
      <path d="M5.27 17.5L12 22.08"></path>
    </svg>
  );
}
