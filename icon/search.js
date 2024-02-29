const Search = ({ width, height, color, ...props }) => (
  <svg
    {...props}
    width={width || "25"}
    height={height || width || "24"}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_20_392)">
      <path
        d="M18.9846 16.617L23.2676 20.899L21.8526 22.314L17.5706 18.031C15.9774 19.3082 13.9956 20.0029 11.9536 20C6.98561 20 2.95361 15.968 2.95361 11C2.95361 6.032 6.98561 2 11.9536 2C16.9216 2 20.9536 6.032 20.9536 11C20.9565 13.042 20.2618 15.0237 18.9846 16.617ZM16.9786 15.875C18.2477 14.5699 18.9565 12.8204 18.9536 11C18.9536 7.132 15.8206 4 11.9536 4C8.08561 4 4.95361 7.132 4.95361 11C4.95361 14.867 8.08561 18 11.9536 18C13.774 18.0029 15.5235 17.2941 16.8286 16.025L16.9786 15.875Z"
        fill={color || "currentColor"}
      />
    </g>
    <defs>
      <clipPath id="clip0_20_392">
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

export default Search;
