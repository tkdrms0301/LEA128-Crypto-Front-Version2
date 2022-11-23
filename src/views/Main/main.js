import React from "react";
import { Box } from "@material-ui/core";
import { PageBody, PageHeader } from "../../components";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { useState, useEffect } from "react";
import api from "../../url/baseUrl";
import { Grid } from "@material-ui/core";

const Main = () => {
  const [connectState, setConnectState] = useState(false);

  useEffect(() => {
    api
      .get("connect")
      .then((res) => {
        setConnectState((connectState) => res.data.isLogin);
      })
      .catch((err) => console.log(err));
  }, []);

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
            {connectState ? (
              <h1 style={{ color: "blue" }}>
                Connecting Security Equipment...
              </h1>
            ) : (
              <h1 style={{ color: "red" }}>
                Not connecting Security Equipment...
              </h1>
            )}
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              {connectState ? (
                <LinearProgress />
              ) : (
                <LinearProgress color="error" />
              )}
            </Stack>
          </Box>
        </Grid>
      </PageBody>
    </React.Fragment>
  );
};

export default Main;
