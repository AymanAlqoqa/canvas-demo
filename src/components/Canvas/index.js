import React, { useRef, useCallback, useState, useEffect } from "react";
import { Layer, Stage } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";

import { DRAG_DATA_KEY, SHAPE_TYPES } from "../../constants";
import {
  createCircle,
  createRectangle,
  clearSelection,
} from "../../store/shapeReducer";
import { Shape } from "../Shape";
import { StyledMain } from "./styles";
import Connectors from "../Connectors";

function Canvas() {
  const dispatch = useDispatch();
  const shapes = useSelector((state) =>
    Object.entries(state?.diagrams?.shapes)
  );

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const stageRef = useRef();

  const handleDragOver = (event) => event.preventDefault();

  const handleDrop = useCallback((event) => {
    const draggedData = event.nativeEvent.dataTransfer.getData(DRAG_DATA_KEY);

    if (draggedData) {
      const { offsetX, offsetY, type, clientHeight, clientWidth, label } =
        JSON.parse(draggedData);

      stageRef.current.setPointersPositions(event);

      const coords = stageRef.current.getPointerPosition();

      if (type === SHAPE_TYPES.RECT) {
        // rectangle x, y is at the top,left corner
        dispatch(
          createRectangle({
            x: coords.x - offsetX,
            y: coords.y - offsetY,
            label,
          })
        );
      } else if (type === SHAPE_TYPES.CIRCLE) {
        // circle x, y is at the center of the circle
        dispatch(
          createCircle({
            x: coords.x - (offsetX - clientWidth / 2),
            y: coords.y - (offsetY - clientHeight / 2),
            label,
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });
  const tab = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, [mobile, tab]);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <StyledMain
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        overflow: tab ? "scroll" : "hidden",
      }}
    >
      <Stage
        scaleX={tab ? 0.5 : mobile ? 0.2 : 1}
        scaleY={tab ? 0.5 : mobile ? 0.2 : 1}
        ref={stageRef}
        width={tab ? windowWidth - 2 : windowWidth - 320}
        height={windowHeight}
        offsetX={mobile ? windowWidth - 2 : 0}
        onClick={() => dispatch(clearSelection())}
      >
        <Layer>
          <Connectors />
          {shapes?.map(([key, shape]) => (
            <Shape key={key} shape={{ ...shape, id: key }} />
          ))}
        </Layer>
      </Stage>
    </StyledMain>
  );
}

export default Canvas;
