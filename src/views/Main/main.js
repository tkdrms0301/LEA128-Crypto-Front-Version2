import React from "react";
import { PageBody, PageHeader } from "../../components";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useRef, useState, useEffect } from "react";
import api from "../../url/baseUrl";
import { Grid, Box } from "@material-ui/core";
import { CircularProgress } from "@mui/material";

const Main = () => {
  const [connectState, setConnectState] = useState(undefined);
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(cunnetedCheck, 2000);
  }, []);

  const cunnetedCheck = () => {
    api
      .get("connect")
      .then((res) => {
        setConnectState((connectState) => res.data.isLogin);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <PageHeader title="메인메뉴 - 장비연결상태" />
      <PageBody>
        <Grid item xs={12}>
          <Box
            style={{
              marginTop: "25%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {connectState != undefined ? (
              connectState ? (
                <h1 style={{ color: "blue" }}>
                  Connecting Security Equipment...
                </h1>
              ) : (
                <h1 style={{ color: "red" }}>
                  Not connecting Security Equipment...
                </h1>
              )
            ) : null}
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              {connectState != undefined ? (
                connectState ? (
                  <LinearProgress />
                ) : (
                  <LinearProgress color="error" />
                )
              ) : (
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
              )}
            </Stack>
          </Box>
        </Grid>
      </PageBody>
    </React.Fragment>
  );
};

export default Main;
