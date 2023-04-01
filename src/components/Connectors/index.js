import React from "react";
import { Arrow } from "react-konva";
import { useSelector } from "react-redux";
import { SHAPE_TYPES } from "../../constants";

function Connectors() {
  const shapes = useSelector((state) =>
    Object.entries(state?.diagrams?.shapes)
  );
  const connectors = useSelector((state) =>
    Object.entries(state?.diagrams?.connectors)
  );

  return (
    <>
      {connectors?.map((con) => {
        const from = shapes.find((s) => s[0] === con[1].from);
        const to = shapes.find((s) => s[0] === con[1].to);
        const fromX =
          from?.[1]?.type === SHAPE_TYPES.RECT
            ? from?.[1]?.x + from?.[1]?.width / 2
            : from?.[1]?.x;
        const fromY =
          from?.[1]?.type === SHAPE_TYPES.RECT
            ? from?.[1]?.y + from?.[1]?.height / 2
            : from?.[1]?.y;
        const toX =
          to?.[1]?.type === SHAPE_TYPES.RECT
            ? to?.[1]?.x + to?.[1]?.width / 2
            : to?.[1]?.x;
        const toY =
          to?.[1]?.type === SHAPE_TYPES.RECT
            ? to?.[1]?.y - to?.[1]?.height / 2
            : to?.[1]?.y;

        return (
          <Arrow
            key={con[0]}
            points={[fromX, fromY, toX, toY]}
            stroke="black"
            pointerLength={30}
            pointerWidth={15}
            draggable
          />
        );
      })}
    </>
  );
}

export default Connectors;
