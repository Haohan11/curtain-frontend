const Cross = ({ width, height, color, ...props }) => (
  <svg
    {...props}
    width={width || "24"}
    height={height || width || "24"}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_123_979)">
      <path
        d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
        fill={color || "currentColor"}
      />
    </g>
    <defs>
      <clipPath id="clip0_123_979">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Cross;