import { useEffect, useState } from "react";
import Loading from "../Loading";
import { getUrl } from "../../Helpers/store";

const Image = ({
  src = "",
  width = 200,
  aspectRatio = "4/3",
  margins = [0, 0, 0, 0],
}) => {
  const [img, setImg] = useState("");

  const setImage = async (src) => {
    let image = await getUrl(src);
    setImg(image);
  };
  useEffect(() => {
    if (src) {
      setImage(src);
    }
  }, [src]);

  const customStyle = {
    width: width,
    aspectRatio: aspectRatio,
    marginTop: margins[0],
    marginBottom: margins[1],
    marginLeft: margins[2],
    marginRight: margins[3],
    backgroundImage: "url(" + img + ")",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: width,
  };
  return (
    <Loading width={width} aspectRatio={aspectRatio} data={img}>
      <div style={customStyle}></div>
    </Loading>
  );
};

export default Image;
