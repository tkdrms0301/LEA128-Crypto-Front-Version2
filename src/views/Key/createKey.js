import React, { useRef, useState } from "react";
import { Box, Grid, TextField, Button, Typography } from "@material-ui/core";
import { PageBody, PageHeader } from "../../components";
import api from "../../url/baseUrl";
import CheckCreateRSAKey from "./checkCreateRSAKey";
import CheckCreateSymmetricKey from "./checkCreateSymmetricKey";
import CheckCreateInputSymmetricKey from "./checkCreateInputSymmetricKey";
import swal from "sweetalert";

const CreateKey = () => {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleCreateRSAKey = () => {
    api
      .get("key-create/rsa", {})
      .then((res) => {
        if (res.data.data) {
          swal("키 생성 완료!", "RSA KEY가 생성되었습니다.", "success").then(
            (result) => {
              if (result) {
                window.location.reload();
              }
            }
          );
        }
      })
      .catch(
        swal("키 생성 실패!", "오류 발생! 경로 확인", "error").then(
          (result) => {
            if (result) {
              window.location.reload();
            }
          }
        )
      );
  };
  const handleCreateSymmetricKey = () => {
    api
      .get("key-create/lea", {})
      .then((res) => {
        if (res.data.data) {
          swal(
            "키 생성 완료!",
            "LEA Random KEY가 생성되었습니다.",
            "success"
          ).then((result) => {
            if (result) {
              window.location.reload();
            }
          });
        }
      })
      .catch(
        swal("키 생성 실패!", "오류 발생! 경로 확인", "error").then(
          (result) => {
            if (result) {
              window.location.reload();
            }
          }
        )
      );
  };
  const handleCreateInputSymmetricKey = () => {
    api
      .post("key-create/input-lea", {
        input: input,
      })
      .then((res) => {
        if (res.data.data) {
          swal("키 생성 완료!", "LEA KEY가 생성되었습니다.", "success").then(
            (result) => {
              if (result) {
                window.location.reload();
              }
            }
          );
        }
      })
      .catch(
        swal("키 생성 실패!", "오류 발생! 경로 확인", "error").then(
          (result) => {
            if (result) {
              window.location.reload();
            }
          }
        )
      );
  };
  return (
    <React.Fragment>
      <PageHeader title="키 확인" />
      <PageBody>
        <Grid container spacing={3}>
          <Grid item xs={1}></Grid>
          <Grid
            item
            xs={4}
            style={{
              marginTop: "100px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                border: "1px solid #6799FF",
                borderRadius: "30px",
                background: "#6799FF",
                color: "white",
                display: "flex ",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckCreateRSAKey handleCreateRSAKey={handleCreateRSAKey} />
            </div>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={4}
            style={{
              marginTop: "100px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                border: "1px solid #6799FF",
                borderRadius: "30px",
                background: "#6799FF",
                color: "white",
                display: "flex ",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CheckCreateSymmetricKey
                handleCreateSymmetricKey={handleCreateSymmetricKey}
              />
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid
            item
            xs={12}
            style={{
              marginTop: "100px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                border: "1px solid #42A2EA",
                width: "25vw",
                borderRadius: "30px",
              }}
            >
              <Grid item xs={6} style={{ marginRight: "30px" }}>
                <TextField
                  fullWidth
                  variant="standard"
                  placeholder="대칭키를 입력하세요"
                  onBlur={handleInput}
                  defaultValue={input}
                ></TextField>
              </Grid>
              <Grid item>
                <CheckCreateInputSymmetricKey
                  handleCreateInputSymmetricKey={handleCreateInputSymmetricKey}
                  input={input}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageBody>
    </React.Fragment>
  );
};
export default CreateKey;
