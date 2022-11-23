import React from "react";
import { Grid, Box, TextField, Button } from "@material-ui/core";

const PathSetting = ({ pathSettinngHandleClick, directoryPath, inputRef }) => {
  return (
    <Grid
      container
      spacing={3}
      style={{
        background: "#4C4C4C",
        marginBottom: "20px",
      }}
    >
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              display="flex"
              type="text"
              inputProps={{
                style: {
                  color: "white",
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                },
              }} // font size of input text
              inputRef={inputRef}
              placeholder="암호화된 엑셀파일을 저장할 경로"
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <Button
              size="small"
              variant="contained"
              type="submit"
              onClick={pathSettinngHandleClick}
              style={{
                marginLeft: "20px",
                background: "#6799FF",
                color: "white",
              }}
            >
              경로설정
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4} align="center">
          <Box style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>
            현재경로 : {directoryPath}
          </Box>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Grid>
  );
};

export default PathSetting;
