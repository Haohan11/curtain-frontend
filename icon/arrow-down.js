const ArrowDown = ({ width, height, color, ...props }) => (
  <svg
    {...props}
    width={width || "25"}
    height={height || width || "24"}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_20_179)">
      <path
        d="M12.9534 15L8.71045 10.757L10.1254 9.34302L12.9534 12.172L15.7814 9.34302L17.1964 10.757L12.9534 15Z"
        fill={color || "currentColor"}
      />
    </g>
    <defs>
      <clipPath id="clip0_20_179">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0.953613)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default ArrowDown;
