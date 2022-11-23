import React from "react";
import { Grid, Box, Button } from "@material-ui/core";
import { PageBody, PageHeader } from "../../components";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import PathSetting from "./excelPathSetting";
import api from "../../url/baseUrl";
import dayjs from "dayjs";

const DatabaseLive = () => {
  const [running, setRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:0:0");
  const [standardTime, setStandardTime] = useState();
  const interval = useRef(null);
  const tileLabel = ["Hours", "Mins", "Secs"];
  const inputRef = useRef(null);
  const [directoryPath, setDirectoryPath] = useState();

  const pathSettinngHandleClick = (e) => {
    setDirectoryPath(inputRef.current.value);

    api
      .put("db-encrypt-file/path", {
        downloadPath: inputRef.current.value,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    api.get("stateLive/db", {}).then((res) => {
      if (res.data.running) {
        setStandardTime((standardTime) => dayjs(new Date(res.data.startTime)));
        setRunning(res.data.running);
      } else {
        setRunning(res.data.running);
      }
    });

    api.get("db-encrypt-file/path", {}).then((res) => {
      setDirectoryPath(res.data.downloadPath);
    });
  }, []);

  useEffect(() => {
    if (!running) {
      clearInterval(interval.current);
      setCurrentTime("00:00:00");
    } else {
      if (standardTime !== undefined) {
        interval.current = setInterval(currentDate, 1000);
        return () => clearInterval(interval.current);
      }
    }
  }, [running]);

  const currentDate = () => {
    const date = dayjs(new Date());

    const hours = date.diff(standardTime, "hour");
    const minutes = date.diff(standardTime, "minute") % 60;
    const seconds = date.diff(standardTime, "second") % 60;

    setCurrentTime(`${hours}:${minutes}:${seconds}`);
  };

  const onClick = () => {
    if (running) {
      setRunning(false);
      /* 초기화*/
      api
        .post("stopLive/db", {})
        .then((res) => {})
        .catch((err) => console.log(err));
    } else {
      api
        .post("startLive/db", {})
        .then((res) => {})
        .catch((err) => console.log(err));

      /* 시작 상태 전달 */
      setRunning(true);
      setStandardTime((standardTime) => new Date());
      const nowTime = new Date();
    }
  };

  return (
    <React.Fragment>
      <PageHeader title="DB 실시간 동작" />
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
        <Grid
          container
          spacing={3}
          style={{
            background: "#4C4C4C",
          }}
        >
          <Grid item xs={12}>
            <Box align="center">
              {running ? (
                <span
                  style={{
                    fontSize: "50px",
                    borderRadius: "20px",
                    color: "#D5D5D5",
                  }}
                >
                  Enable encryption...
                </span>
              ) : (
                <span
                  style={{
                    fontSize: "50px",
                    borderRadius: "20px",
                    color: "#D5D5D5",
                  }}
                >
                  Disable encryption...
                </span>
              )}
            </Box>
          </Grid>
          <Grid container spaacing={2}>
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  alignitem: "center",
                  justifyContent: "center",
                }}
              >
                {currentTime.split(":").map((time, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "200px",
                      height: "200px",
                      background: "#177FF0",
                      borderRadius: "20px",
                      margin: "20px",
                    }}
                  >
                    <span
                      style={{
                        color: "#C0C0C0",
                        fontSize: "80px",
                      }}
                    >
                      {time}
                    </span>
                    <span
                      style={{
                        color: "white",
                        fontSize: "40px",
                      }}
                    >
                      {tileLabel[index]}
                    </span>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} align="center">
            {running ? (
              <Button
                style={{
                  fontSize: 20,
                  background: "#F15F5F",
                  color: "white",
                }}
                size="large"
                variant="contained"
                onClick={onClick}
              >
                중지
              </Button>
            ) : (
              <Button
                style={{
                  fontSize: 20,
                  background: "#4141CC",
                  color: "white",
                }}
                size="large"
                variant="contained"
                onClick={onClick}
              >
                실시간 암호화 진행
              </Button>
            )}
          </Grid>
        </Grid>
      </PageBody>
    </React.Fragment>
  );
};

export default DatabaseLive;
