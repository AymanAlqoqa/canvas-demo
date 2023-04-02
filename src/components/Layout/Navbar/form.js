import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAttribute, clearSelection } from "../../../store/shapeReducer";

import { InputContainer, Label, StyledButton, Input } from "./styles";

function Form() {
  const dispatch = useDispatch();
  const shapeSelector = useSelector((state) => state?.diagrams?.selected);
  const selectedShape = useSelector(
    (state) => state?.diagrams?.shapes[shapeSelector]
  );
  const [nodeLabel, setNodeLabel] = useState(selectedShape?.label || "");

  useEffect(() => {
    if (selectedShape) {
      setNodeLabel(selectedShape?.label);
    }
  }, [selectedShape]);

  const handleUpdate = () => {
    dispatch(updateAttribute({ attr: "label", value: nodeLabel }));
    dispatch(clearSelection());
  };

  return (
    <Box display={"flex"} flexWrap={"wrap"}>
      <InputContainer>
        <Label aria-label="label" hide={!shapeSelector ? "true" : "false"}>
          Node Text:
        </Label>
        <Input
          name="node-input"
          aria-label="node-input"
          hide={!shapeSelector ? "true" : "false"}
          onChange={(event) => setNodeLabel(event.target.value)}
          value={nodeLabel}
        />
      </InputContainer>
      <StyledButton
        variant="contained"
        aria-label="update button"
        hide={!shapeSelector ? "true" : "false"}
        onClick={handleUpdate}
      >
        Update
      </StyledButton>
    </Box>
  );
}

export default Form;
