import React from "react";
import { Grid, Box, TextField, Button } from "@material-ui/core";

const DirectoryPathSetting = ({
  EnPathSettinngHandleClick,
  encryptionDirectoryPathRef,
  enDirectoryPath,
}) => {
  return (
    <Grid
      container
      spacing={3}
      style={{
        background: "#D7E9EF",
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
                  color: "black",
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                },
              }} // font size of input text
              inputRef={encryptionDirectoryPathRef}
              placeholder="암호화할 파일이 있는 경로 [input Directory]"
            ></TextField>
          </Grid>
          <Grid item xs={4}>
            <Button
              size="small"
              variant="contained"
              type="submit"
              onClick={EnPathSettinngHandleClick}
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
          <Box style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>
            현재경로 : {enDirectoryPath}
          </Box>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Grid>
  );
};

export default DirectoryPathSetting;
