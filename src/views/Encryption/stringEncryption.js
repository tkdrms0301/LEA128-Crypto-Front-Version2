import React from "react";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import { PageBody, PageHeader } from "../../components";
import { useRef, useState } from "react";
import api from "../../url/baseUrl";
const StringEncryption = () => {
  const [stringData, setStingData] = useState("");
  const [encryptionString, setEncryptionString] = useState("");
  const inputRef = useRef(null);

  function handleClick() {
    setStingData(inputRef.current.value);
    /* 문자열 암호화 API */
    api
      .post("encrypt-direct", {
        plainText: inputRef.current.value,
      })
      .then((res) => {
        setEncryptionString(res.data.cipherText);
      })
      .catch((err) => console.log(err));
  }

  return (
    <React.Fragment>
      <PageHeader title="문자열 암호화" />
      <PageBody>
        <div
          style={{
            height: "50px",
          }}
        ></div>
        <Grid container spacing={3} justify="center">
          <Grid item xs={6}>
            <div
              style={{
                background: "#177FF0",
                border: "solid 1px #D5D5D5",
                borderRadius: "20px",
                height: "250px",
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
                    평문
                  </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    display="flex"
                    type="text"
                    multiline
                    variant="standard"
                    inputRef={inputRef}
                    rows={4}
                    style={{
                      background: "white",
                      border: "1px solid gray",
                      borderRadius: "20px",
                    }}
                    inputProps={{
                      style: {
                        textAlign: "center",
                        fontSize: 13,
                        color: "black",
                      },
                    }} // font size of input text
                    placeholder="평문"
                  ></TextField>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              type="submit"
              onClick={handleClick}
              size="large"
              style={{
                background: "#6799FF",
                color: "white",
              }}
            >
              암호화 실행
            </Button>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                background: "#6799FF",
                border: "solid 1px #D5D5D5",
                borderRadius: "20px",
                height: "250px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    align="center"
                    style={{
                      color: "white",
                      fontSize: "30px",
                    }}
                  >
                    암호문
                  </Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    display="flex"
                    type="text"
                    multiline
                    rows={3}
                    value={encryptionString}
                    style={{
                      background: "white",
                      border: "1px solid gray",
                      borderRadius: "20px",
                    }}
                    inputProps={{
                      style: {
                        textAlign: "center",
                        fontSize: 13,
                        color: "black",
                      },
                    }} // font size of input text
                    placeholder="암호문"
                  ></TextField>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </PageBody>
    </React.Fragment>
  );
};

export default StringEncryption;
