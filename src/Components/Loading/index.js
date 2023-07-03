import { Spin } from "antd";

const Loading = ({ width = 300, height = 100 }) => {
  return (
    <div
      style={{
        margin: "20 0",
        marginBottom: 20,
        padding: `width/2+" "+height/2`,
        textAlign: "center",
        background: "rgba(0, 0, 0, 0.05)",
        borderRadius: 4,
      }}
    >
      <Spin />
    </div>
  );
};

export default Loading;
