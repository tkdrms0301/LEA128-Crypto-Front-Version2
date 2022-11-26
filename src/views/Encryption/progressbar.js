import React, { useState } from "react";
import { Box, Modal } from "@material-ui/core";
import { CircularProgress, Fade } from "@mui/material";

const Progressbar = ({ open }) => {
  return (
    <Modal open={open}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    </Modal>
  );
};

export default Progressbar;
