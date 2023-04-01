import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

import { SHAPE_TYPES, DEFAULTS } from "../constants";

const APP_NAMESPACE = "__integrtr_diagrams__";

const baseState = {
  selected: null,
  fromShapeId: null,
  shapes: {},
  connectors: [],
};

export const diagrams = createSlice({
  name: "diagrams",
  initialState: {
    selected: null,
    fromShapeId: null,
    shapes: JSON.parse(localStorage?.getItem(APP_NAMESPACE))?.shapes ?? {},

    connectors:
      JSON.parse(localStorage?.getItem(APP_NAMESPACE))?.connectors ?? [],
  },
  reducers: {
    createRectangle: (state, { payload: { x, y, label } }) => {
      state.shapes[nanoid()] = {
        type: SHAPE_TYPES.RECT,
        width: DEFAULTS.RECT.WIDTH,
        height: DEFAULTS.RECT.HEIGHT,
        fill: DEFAULTS.RECT.FILL,
        stroke: DEFAULTS.RECT.STROKE,
        rotation: DEFAULTS.RECT.ROTATION,
        x,
        y,
        label,
        labelColor: DEFAULTS.RECT.LABEL_COLOR,
      };
    },
    createCircle: (state, { payload: { x, y, label } }) => {
      state.shapes[nanoid()] = {
        type: SHAPE_TYPES.CIRCLE, // circle
        radius: DEFAULTS.CIRCLE.RADIUS, // 50
        fill: DEFAULTS.CIRCLE.FILL, // white
        stroke: DEFAULTS.CIRCLE.STROKE, // black
        x,
        y,
        label,
        labelColor: DEFAULTS.CIRCLE.LABEL_COLOR,
      };
    },

    createConnector: (state, { payload: { from, to } }) => {
      state.connectors = [
        ...state.connectors,
        {
          type: SHAPE_TYPES.Arrow,
          from,
          to,
          id: nanoid(),
        },
      ];
    },

    updateDiagram: (state, { payload: { data } }) => {
      state.shapes = data.shapes;
      state.connectors = data.connectors;
      state.selected = data.selected;
      state.fromShapeId = data.fromShapeId;
      localStorage.setItem(APP_NAMESPACE, JSON.stringify(data));
    },
    reset: (state) => {
      localStorage.removeItem(APP_NAMESPACE);
      state.shapes = baseState.shapes;
      state.connectors = baseState.connectors;
      state.selected = baseState.selected;
      state.fromShapeId = baseState.fromShapeId;
    },
    selectShape: (state, { payload: { id } }) => {
      state.selected = id;
    },
    setFromShapeId: (state, { payload: { id } }) => {
      state.fromShapeId = id;
    },
    clearFromShapeId: (state) => {
      state.fromShapeId = null;
    },
    clearSelection: (state) => {
      state.selected = null;
    },
    moveShape: (state, { payload: { id, x, y } }) => {
      const shape = state?.shapes?.[id];
      if (shape) {
        shape.x = x;
        shape.y = y;
      }
    },

    updateAttribute: (state, { payload: { value, attr } }) => {
      const shape = state.shapes[state.selected];

      if (shape) {
        shape[attr] = value;
      }
      const data = {
        selected: state.selected,
        fromShapeId: state.fromShapeId,
        shapes: { ...state.shapes, shape },
        connectors: state.connectors,
      };
      localStorage.setItem(APP_NAMESPACE, JSON.stringify(data));
    },
  },
});

export const {
  createRectangle,
  createCircle,
  selectShape,
  transformRectangleShape,
  clearSelection,
  moveShape,
  updateDiagram,
  reset,
  transformCircleShape,
  updateAttribute,
  createConnector,
  setFromShapeId,
  clearFromShapeId,
} = diagrams.actions;

export default diagrams.reducer;
