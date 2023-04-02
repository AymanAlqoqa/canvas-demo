import React from "react";

import { SHAPE_TYPES } from "../../constants";
import { useSelector } from "react-redux";
import Circle from "./Circle";
import Rectangle from "./Rectangle";

export function Shape({ shape }) {
  const { selected } = useSelector((state) => state.diagrams);

  if (shape.type === SHAPE_TYPES.RECT) {
    return <Rectangle {...shape} isSelected={selected === shape.id} />;
  } else if (shape.type === SHAPE_TYPES.CIRCLE) {
    return <Circle {...shape} isSelected={selected === shape.id} />;
  }

  return null;
}
