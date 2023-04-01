import { configureStore } from "@reduxjs/toolkit";
import diagrams from "./shapeReducer";

export default configureStore({
  reducer: {
    diagrams,
  },
});
