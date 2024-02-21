const addClassName = (Component, className) => {
  const styledComponent = (props) => {
    const newClassName = props.className ? `${className} ${props.className}` : className
    return (
      <Component {...props} className={newClassName} />
    );
  };

  return styledComponent;
};

export default addClassName;
