const Image = ({ src, height = 200, width = 200, margins = [0, 0, 0, 0] }) => {
  const customStyle = {
    height: height,
    width: width,
    marginTop: margins[0],
    marginBottom: margins[1],
    marginLeft: margins[2],
    marginRight: margins[3],
    backgroundImage: "url(" + src + ")",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: width,
  };
  return (
    <>
      <div style={customStyle}></div>
    </>
  );
};

export default Image;
