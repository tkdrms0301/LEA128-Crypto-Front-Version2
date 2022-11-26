import React from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";
import { PageBody, PageHeader } from "../../components";
import { useEffect, useRef, useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../url/baseUrl";
import PathSetting from "./filePathSetting";
import Alert from "@mui/material/Alert";

const Posts = () => {
  const [fileData, setFileData] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [startDecryption, setStartDecryption] = useState();
  const inputRef = useRef(null);
  const [directoryPath, setDirectoryPath] = useState();

  useEffect(() => {
    api.get("decrypt-file/path", {}).then((res) => {
      setDirectoryPath(res.data.body.decryptedFilePath);
    });
  }, []);

  const pathSettinngHandleClick = (e) => {
    api
      .post("decrypt-file/path", {
        decryptedFilePath: inputRef.current.value,
      })
      .then((res) => {
        setDirectoryPath(inputRef.current.value);
      })
      .catch((err) => console.log(err));
  };
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "blob",
  };

  const handleClickDecryption = (e) => {
    const formData = new FormData();
    formData.append("file", fileData);
    setStartDecryption((startDecryption) => true);
    setIsError((isError) => false);
    setIsSuccess((isSuccess) => false);
    api
      .post(
        "decrypt-file",
        {
          file: fileData,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((res) => {
        if (res.data.decrypted) {
          setIsSuccess((isSuccess) => true);
        } else {
          setIsError((isError) => true);
        }
        setStartDecryption((startDecryption) => false);
      })
      .catch((err) => {
        setIsError((isError) => true);
        setStartDecryption((startDecryption) => false);
      });
  };

  const handleChange = (files) => {
    setFileData(files[0]);
  };

  const MAX_SIZE = 5368709120;
  const useStyles = makeStyles(() => ({
    dropZone: {
      height: "100%",
      fullWidth: "true",
    },
    previewContainer: {
      container: "true",
      width: "100%",
      height: "100%",
    },
    preview: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      item: "true",
    },
    previewImg: {
      //height: '100%',
      //width: '100%',
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <PageHeader title="파일 복호화" />
      <PageBody>
        <div
          style={{
            height: "100px",
          }}
        ></div>
        <PathSetting
          pathSettinngHandleClick={pathSettinngHandleClick}
          inputRef={inputRef}
          setDirectoryPath={setDirectoryPath}
          directoryPath={directoryPath}
        ></PathSetting>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6}>
            <div
              style={{
                background: "#177FF0",
                border: "solid 1px #D5D5D5",
                borderRadius: "20px",
                height: "content",
                padding: "20px 0px 20px 0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    align="center"
                    style={{
                      color: "white",
                      fontSize: "30px",
                    }}
                  >
                    암호화 파일
                  </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid
                  item
                  xs={10}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <DropzoneArea
                    maxFileSize={MAX_SIZE}
                    acceptedFiles={[
                      "image/*",
                      "video/*",
                      ".pptx",
                      ".txt",
                      ".hwp",
                      ".doc",
                      ".docx",
                      ".jpg",
                      ".jpeg",
                      ".png",
                      ".avi",
                      ".mp4",
                      ".gif",
                      ".xlsx",
                      ".zip",
                      ".ppt",
                      ".csv",
                      ".pdf",
                      "",
                    ]}
                    showFileNames
                    dropzoneText="Upload file Drag or Click"
                    showAlerts={true}
                    filesLimit={1}
                    showFileNamesInPreview={false}
                    onChange={handleChange.bind(this)}
                    dropzoneClass={classes.dropZone}
                    previewGridClasses={{
                      item: classes.preview,
                    }}
                  />
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              type="submit"
              component="label"
              size="large"
              style={{
                background: "#6799FF",
                color: "white",
              }}
              onClick={handleClickDecryption}
            >
              복호화 실행
            </Button>
          </Grid>
          <Grid item xs={12}>
            {startDecryption ? (
              <Alert severity="info">복호화 진행중</Alert>
            ) : null}
            {isSuccess ? <Alert severity="success">복호화 완료</Alert> : null}
            {isError ? <Alert severity="error">복호화 실패</Alert> : null}
          </Grid>
        </Grid>
      </PageBody>
    </React.Fragment>
  );
};

export default Posts;
