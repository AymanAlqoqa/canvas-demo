export const SHAPE_TYPES = {
  RECT: "rect",
  CIRCLE: "circle",
  Arrow: "arrow",
};

export const DEFAULTS = {
  RECT: {
    STROKE: "rgb(158 158 158)",
    FILL: "rgb(245 245 245)",
    WIDTH: 200,
    HEIGHT: 50,
    ROTATION: 0,
    LABEL: "node",
    LABEL_COLOR: "#3b441f",
  },
  CIRCLE: {
    STROKE: "rgb(158 158 158)",
    FILL: "rgb(245 245 245)",
    RADIUS: 50,
    LABEL: "node",
    LABEL_COLOR: "#3b441f",
  },
};

export const LIMITS = {
  RECT: {
    MAX: 1000,
    MIN: 10,
  },
  CIRCLE: {
    MAX: 500,
    MIN: 5,
  },
};

export const DRAG_DATA_KEY = "__drag_data_payload__";
