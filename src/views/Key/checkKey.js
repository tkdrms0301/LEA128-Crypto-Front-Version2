import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  IconButton,
  Card,
  CardContent,
} from "@material-ui/core";
import { PageBody, PageHeader } from "../../components";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import api from "../../url/baseUrl";

const CheckKey = () => {
  const [symmetricKey, setSymmetricKey] = useState(false);
  const [publicKey, setPublicKey] = useState(false);
  const [privateKey, setPrivateKey] = useState(false);
  const [keyInfo, setKeyInfo] = useState([]);

  useEffect(() => {
    api.get("key-check", {}).then((res) => {
      setKeyInfo((keyInfo) => res.data.data);
    });
  }, []);

  const changeStar = (key) => {
    let last = key.substr(key.length, key.length - 1);
    let star = "";
    for (let i = 0; i < key.length - 3; i++) {
      star += "*";
    }
    return star + last;
  };

  const onClick = (keyType) => {
    if ("대칭키" === keyType) {
      setSymmetricKey(() => !symmetricKey);
    } else if ("공개키" === keyType) {
      setPublicKey(() => !publicKey);
    } else if ("비밀키" === keyType) {
      setPrivateKey(() => !privateKey);
    }
  };

  const doCopy = (e) => {
    const content = e.target.innerHTML;

    navigator.clipboard.writeText(content).then(() => {
      alert("복사되었습니다.");
    });
  };
  return (
    <React.Fragment>
      <PageHeader title="키 확인" />
      <PageBody>
        {keyInfo != null ? (
          <Grid container spacing={2} justifyContent="center">
            {keyInfo.map((keys, index) => (
              <Grid item xs={11} key={index}>
                <Card
                  style={{
                    background: "#6799FF",
                    border: "1px solid white",
                    borderRadius: "20px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <CardContent>
                    <Grid
                      container
                      spacing={4}
                      direction="row"
                      alignItems="center"
                    >
                      <Grid item xs={12}>
                        <Grid
                          container
                          spacing={3}
                          direction="row"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography variant="h4">{keys.keyType}</Typography>
                          </Grid>
                          <Grid item>
                            <IconButton onClick={() => onClick(keys.keyType)}>
                              {keys.keyType === "대칭키" ? (
                                symmetricKey ? (
                                  <RemoveRedEyeIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )
                              ) : keys.keyType === "비밀키" ? (
                                privateKey ? (
                                  <RemoveRedEyeIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )
                              ) : keys.keyType === "공개키" ? (
                                publicKey ? (
                                  <RemoveRedEyeIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )
                              ) : null}
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} style={{ marginBottom: "20px" }}>
                        <Grid
                          container
                          spacing={3}
                          direction="row"
                          alignItems="center"
                        >
                          <Grid
                            item
                            xs={2}
                            style={{
                              marginLeft: "20px",
                              borderTop: "1px solid white",
                              borderLeft: "1px solid white",
                              borderBottom: "1px solid white",
                            }}
                          >
                            <Grid item>
                              <Typography
                                style={{
                                  textAlign: "center",
                                  fontWeight: "bold",
                                  fontSize: "1.2vw",
                                }}
                              >
                                키 생성일
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                style={{
                                  color: "#DCE3F4",
                                  fontWeight: "bold",
                                  fontSize: "0.9vw",
                                }}
                              >
                                {keys.createdDate}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Grid
                            item
                            xs={2}
                            style={{ border: "1px solid white" }}
                          >
                            <Grid item>
                              <Typography
                                style={{
                                  textAlign: "center",
                                  fontWeight: "bold",
                                  fontSize: "1.2vw",
                                }}
                              >
                                키 만료일
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                style={{
                                  color: "#DCE3F4",
                                  fontWeight: "bold",
                                  fontSize: "0.9vw",
                                }}
                              >
                                {keys.expirationDate}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Grid
                            item
                            xs={2}
                            style={{
                              borderTop: "1px solid white",
                              borderRight: "1px solid white",
                              borderBottom: "1px solid white",
                            }}
                          >
                            <Grid item>
                              <Typography
                                style={{
                                  textAlign: "center",
                                  fontWeight: "bold",
                                  fontSize: "1.2vw",
                                }}
                              >
                                키 유효기간
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                style={{
                                  textAlign: "center",
                                  color: "#DCE3F4",
                                  fontWeight: "bold",
                                  fontSize: "0.9vw",
                                }}
                              >
                                {keys.validTerm}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          container
                          spacing={3}
                          direction="row"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography variant="h5">키</Typography>
                          </Grid>
                          <Grid style={{ overflow: "hidden" }} item xs={11}>
                            <Button
                              onClick={doCopy}
                              style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "15px",
                              }}
                            >
                              {keys.keyType === "대칭키"
                                ? symmetricKey
                                  ? keys.keyValue
                                  : changeStar(keys.keyValue)
                                : keys.keyType === "비밀키"
                                ? privateKey
                                  ? keys.keyValue
                                  : changeStar(keys.keyValue)
                                : keys.keyType === "공개키"
                                ? publicKey
                                  ? keys.keyValue
                                  : changeStar(keys.keyValue)
                                : null}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : null}
      </PageBody>
    </React.Fragment>
  );
};
export default CheckKey;
