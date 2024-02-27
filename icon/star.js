const Star = ({ width, height, color, ...props }) => (
  <svg
    {...props}
    width={width || "16"}
    height={height || width || "16"}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00002 12.6733L3.29802 15.3053L4.34802 10.02L0.391357 6.36133L5.74269 5.72666L8.00002 0.833328L10.2574 5.72666L15.6087 6.36133L11.652 10.02L12.702 15.3053L8.00002 12.6733Z"
      fill="#FFBD12"
    />
  </svg>
);

export default Star;
