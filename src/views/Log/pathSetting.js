import React from "react";
import { Grid, Box, TextField, Button } from "@material-ui/core";

const pathSettingDemo = ({
  pathSettinngHandleClick,
  directoryPath,
  setDirectoryPath,
  inputRef,
}) => {
  return (
    <Grid container justifyContent="center">
      <div
        style={{
          border: "2px solid #6799FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "120px",
          borderRadius: "20px",
          width: "600px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  display="flex"
                  type="text"
                  variant="standard"
                  sx={{ border: "1px solid green", borderRadius: 1 }}
                  inputProps={{
                    style: {
                      textAlign: "center",
                      fontSize: 13,
                      color: "black",
                    },
                  }} // font size of input text
                  inputRef={inputRef}
                  placeholder="로그를 저장하거나, 불러올 로그 상위 폴더 지정(날짜 경로 이전)"
                ></TextField>
              </Grid>
              <Grid item xs={3}>
                <Button
                  size="small"
                  variant="contained"
                  type="submit"
                  onClick={pathSettinngHandleClick}
                  style={{
                    background: "#6799FF",
                    color: "white",
                  }}
                >
                  경로설정
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={8} align="center">
              <Box> 현재경로 : {directoryPath} </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default pathSettingDemo;
