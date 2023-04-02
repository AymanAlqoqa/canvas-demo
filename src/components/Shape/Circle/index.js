import React, { useRef, useCallback } from "react";
import { Circle as KonvaCircle, Text, Group } from "react-konva";
import { useDispatch, useSelector } from "react-redux";

import {
  selectShape,
  moveShape,
  createConnector,
  clearFromShapeId,
  setFromShapeId,
} from "../../../store/shapeReducer";

function Circle({ type, id, label, isSelected, ...shapeProps }) {
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

  const handleDrag = useCallback(
    (event) => {
      dispatch(moveShape({ id, x: event.target.x(), y: event.target.y() }));
    },
    [id]
  );

  const textProps = {
    x: shapeProps.x - 15,
    y: shapeProps.y - 10,
    fontSize: 15,
    fill: shapeProps.labelColor,
  };

  return (
    <>
      <Group
        onClick={handleSelect}
        onTap={handleSelect}
        onDragStart={handleSelect}
        onDragEnd={handleDrag}
        offset={{
          x: shapeProps?.width / 2,
          y: shapeProps?.height / 2,
        }}
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
        <KonvaCircle
          {...shapeProps}
          draggable
          fill={fromShapeId === id ? "red" : shapeProps.fill}
        />
        <Text text={label} {...textProps} draggable />
      </Group>
    </>
  );
}

export default Circle;
