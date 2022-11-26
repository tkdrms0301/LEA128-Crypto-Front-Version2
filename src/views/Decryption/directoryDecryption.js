import React, { useEffect } from "react";
import { Box, Grid, Button } from "@material-ui/core";
import { PageBody, PageHeader } from "../../components";
import { useState, useRef } from "react";
import api from "../../url/baseUrl";
import PathSetting from "./filePathSetting";
import DirectoryPathSetting from "./directoryPathSetting";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Progressbar from "./progressbar";

const Posts = () => {
  const inputRef = useRef(null);
  const decryptionDirectoryPathRef = useRef(null);
  const [deDirectoryPath, setDeDirectoryPath] = useState();
  const [directoryPath, setDirectoryPath] = useState();
  const [isDecryption, setIsDecryption] = useState(false);
  const [directoryList, setDirectoryList] = useState();
  const [deDirectoryList, setDeDirectoryList] = useState();
  const [returnDirectoryList, setReturnDirectoryList] = useState();

  const [checked, setChecked] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.get("decrypt-file/path", {}).then((res) => {
      setDirectoryPath(res.data.body.decryptedFilePath);
    });
  }, []);

  useEffect(() => {
    if (isDecryption) {
      console.log(deDirectoryList);
      setIsDecryption((isDecryption) => false);

      api
        .post("decrypt-multiple-file/run", {
          data: deDirectoryList,
        })
        .then((res) => {
          //res.data 데이터 설정
          setReturnDirectoryList((returnDirectoryList) => res.data.body.data);
          console.log(res.data.body.data);

          setOpen((prev) => !prev);
        })
        .catch((err) => {
          setOpen((prev) => !prev);
        });
    }
  }, [isDecryption]);

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

  const dePathSettinngHandleClick = (e) => {
    api
      .post("decrypt-multiple-file/path", {
        path: decryptionDirectoryPathRef.current.value,
      })
      .then((res) => {
        console.log(res.data.dirList);
        setDeDirectoryPath(decryptionDirectoryPathRef.current.value);
        setDirectoryList(res.data.dirList);
      })
      .catch((err) => console.log(err));
  };
  const handleClickDecryption = (e) => {
    setOpen((prev) => !prev);
    setDeDirectoryList([]);
    setIsDecryption((isDecryption) => true);
    for (let i = 0; i < checked.length; i++) {
      setDeDirectoryList((deDirectoryList) => [
        ...deDirectoryList,
        {
          index: checked[i],
          fileName: deDirectoryPath + `/` + directoryList[checked[i]].fileName,
        },
      ]);

      setChecked([]);
    }
  };

  const handleToggle = (index) => () => {
    const currentIndex = checked.indexOf(index);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(index);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <React.Fragment>
      <PageHeader title="폴더 암호화" />
      <PageBody>
        <div
          style={{
            height: "100px",
          }}
        ></div>
        <PathSetting
          pathSettinngHandleClick={pathSettinngHandleClick}
          inputRef={inputRef}
          directoryPath={directoryPath}
        ></PathSetting>
        <DirectoryPathSetting
          dePathSettinngHandleClick={dePathSettinngHandleClick}
          decryptionDirectoryPathRef={decryptionDirectoryPathRef}
          deDirectoryPath={deDirectoryPath}
        ></DirectoryPathSetting>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={2}></Grid>
          <Grid item xs={8} align="center">
            <Box style={{ backgroundColor: "#177FF0", maxWidth: "700px" }}>
              {directoryList != undefined ? (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 600,
                    bgcolor: "background.paper",
                  }}
                >
                  {directoryList.map((list, index) => {
                    const labelId = `checkbox-list-label-${index}`;

                    return (
                      <ListItem
                        key={index}
                        secondaryAction={
                          returnDirectoryList != null ? (
                            returnDirectoryList[index] != undefined ? (
                              returnDirectoryList[index].success == true ? (
                                <CheckCircleIcon color="success" />
                              ) : (
                                <ErrorIcon color="disabled" />
                              )
                            ) : null
                          ) : null
                        }
                        disablePadding
                      >
                        <ListItemButton
                          role={undefined}
                          onClick={handleToggle(index)}
                          dense
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(index) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={list.fileName} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={2}></Grid>
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
            {open && <Progressbar open={open} />}
          </Grid>
        </Grid>
      </PageBody>
    </React.Fragment>
  );
};

export default Posts;
