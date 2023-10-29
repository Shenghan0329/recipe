import { Spin } from "antd";
import { useEffect, useState } from "react";

const Loading = ({ children, width = 300, aspectRatio = "3/1", data = [] }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (
      (Object.keys(data).length === 0 && data.constructor === Object) ||
      data.length == 0
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);

  return loading ? (
    <div
      style={{
        width: width,
        aspectRatio: aspectRatio,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "20 0",
        marginBottom: 20,
        textAlign: "center",
        background: "rgba(0, 0, 0, 0.05)",
        borderRadius: 4,
      }}
    >
      <Spin />
    </div>
  ) : (
    <>{children}</>
  );
};

export default Loading;
