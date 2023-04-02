import React, { useState, useRef } from "react";
import { Box, Snackbar, Alert } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { updateDiagram, reset } from "../../../store/shapeReducer";

import {
  StyledToolbar,
  StyledButton,
  StyledAppBar,
  FileInputStyle,
} from "./styles";
import Form from "./form";

export default function Navbar() {
  const dispatch = useDispatch();
  const diagrams = useSelector((state) => state?.diagrams);
  const [error, setError] = useState("");

  const fileRef = useRef();

  const handleDownload = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(diagrams));
    const element = document.createElement("a");
    element.href = dataStr;
    element.download = "structure.json";
    element.setAttribute("style", "display:none");
    document.body.appendChild(element);
    element.click();
  };

  const handleUpload = (file) => {
    if (file.type === "application/json") {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        dispatch(updateDiagram({ data: JSON.parse(reader.result) }));
      };
      reader.onerror = () => {
        setError("error uploading the file!");
      };
    } else {
      setError("File extension is not supported!, please upload json file");
    }
  };

  const handleReset = () => dispatch(reset());

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static" elevation={0}>
        <StyledToolbar>
          <Form />
          <Box alignItems={"flex-end"} display="flex" flexWrap={"wrap"}>
            <Box sx={{ alignSelf: "flex-end", position: "relative" }}>
              <StyledButton variant="contained" aria-label="Upload button">
                Upload
              </StyledButton>
              <FileInputStyle
                type={"file"}
                name="structure"
                accept="*.json"
                ref={fileRef}
                onClick={(e) => (fileRef.current.value = null)} // used to reset input file selection
                onChange={(e) => {
                  if (e.target.files[0]) handleUpload(e.target.files[0]);
                }}
              />
            </Box>

            <StyledButton
              variant="contained"
              aria-label="DownLoad button"
              onClick={handleDownload}
            >
              DownLoad
            </StyledButton>
            <StyledButton
              variant="contained"
              aria-label="Reset button"
              onClick={handleReset}
            >
              Reset
            </StyledButton>
          </Box>
        </StyledToolbar>
      </StyledAppBar>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
