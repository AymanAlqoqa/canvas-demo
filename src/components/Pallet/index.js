import React from "react";
import { DRAG_DATA_KEY, SHAPE_TYPES } from "../../constants";
import { StylesASide, StylesShape } from "./styles";

const handleDragStart = (event) => {
  const type = event.target.dataset.shape;
  const label = event.target.textContent;

  if (type) {
    // x,y coordinates of the mouse pointer relative to the position of the padding edge of the target node
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    // dimensions of the node on the browser
    const clientWidth = event.target.clientWidth;
    const clientHeight = event.target.clientHeight;

    const dragPayload = JSON.stringify({
      type,
      offsetX,
      offsetY,
      clientWidth,
      clientHeight,
      label,
    });

    event.nativeEvent.dataTransfer.setData(DRAG_DATA_KEY, dragPayload);
  }
};

function Pallet() {
  return (
    <StylesASide>
      <StylesShape
        data-shape={SHAPE_TYPES.RECT}
        draggable
        onDragStart={handleDragStart}
        data-testid="rectangle-shape"
      >
        Node
      </StylesShape>
      <StylesShape
        data-shape={SHAPE_TYPES.CIRCLE}
        draggable
        onDragStart={handleDragStart}
        circle="true"
        data-testid="circle-shape"
      >
        Node
      </StylesShape>
    </StylesASide>
  );
}

export default Pallet;
