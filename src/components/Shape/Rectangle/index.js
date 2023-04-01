import React, { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Rect as KonvaRectangle, Text, Group } from "react-konva";

import {
  selectShape,
  moveShape,
  createConnector,
  clearFromShapeId,
  setFromShapeId,
} from "../../../store/shapeReducer";

function Rectangle({ type, label, isSelected, id, ...shapeProps }) {
  const dispatch = useDispatch();
  const fromShapeId = useSelector((state) => state?.diagrams?.fromShapeId);
  const shapeRef = useRef();

  const handleSelect = useCallback(
    (event) => {
      event.cancelBubble = true;

      dispatch(selectShape({ id }));
    },
    [id]
  );

  const handleDrag = useCallback(
    (event) => {
      dispatch(moveShape({ id, x: event.target.x(), y: event.target.y() }));
    },
    [id]
  );

  const textProps = {
    x: shapeProps.x + shapeProps.width / 2.5,
    y: shapeProps.y + shapeProps.height / 2.5,
    fontSize: 15,
    fill: shapeProps.labelColor,
  };
  const handleSelectFromShapeId = useCallback(
    (event) => {
      event.cancelBubble = true;

      dispatch(setFromShapeId({ id }));
    },
    [id]
  );
  const handleCreateConnector = useCallback(
    (event) => {
      event.cancelBubble = true;
      const newConnector = {
        from: fromShapeId,
        to: id,
      };

      dispatch(createConnector(newConnector));
    },
    [id, fromShapeId]
  );
  return (
    <>
      <Group
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleSelect}
        onDragEnd={handleDrag}
        draggable
        ref={shapeRef}
        key={id}
        onDblClick={(e) => {
          if (fromShapeId) {
            handleCreateConnector(e);
            dispatch(clearFromShapeId());
          } else {
            handleSelectFromShapeId(e);
          }
        }}
      >
        <KonvaRectangle
          {...shapeProps}
          draggable
          fill={fromShapeId === id ? "red" : shapeProps.fill}
        />
        <Text text={label} {...textProps} draggable />
      </Group>
    </>
  );
}

export default Rectangle;
