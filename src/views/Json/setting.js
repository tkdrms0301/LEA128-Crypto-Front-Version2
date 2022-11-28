import React, { useEffect, useRef, useState } from "react";
import {
  Checkbox,
  TableContainer,
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Table,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Manual from "./manual";
import api from "../../url/baseUrl";
import { PageBody, PageHeader } from "../../components";
const JsonApi = () => {
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const tableNameRef = useRef();
  const apiAllListRef = useRef();
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    console.log("api 리스트 요청");
    api.get("api/list", {}).then((res) => {
      console.log(res.data);
      if (res.data.valid == undefined) {
        setRows(res.data);
      }
    });
  }, []);

  const onChangeSingleCheck = (e) => {
    const { value, checked } = e.target;
    console.log(checked);
    let updateCheckList = [...checkList];
    if (checked) {
      updateCheckList = [...checkList, value];
    } else {
      updateCheckList.splice(checkList.indexOf(value), 1);
    }
    setCheckList(updateCheckList);
  };

  const onChangeAllCheck = (e) => {
    const { value, checked } = e.target;
    let list = [];
    if (checked) {
      rows.map((row, i) => (list[i] = String(i)));
    }
    console.log(list);
    setCheckList(list);
  };

  const onClickApiAdd = () => {
    let isDoubleCheck = false;

    if (rows !== undefined) {
      rows.map((row, index) =>
        row.tableName === tableNameRef.current.value
          ? (isDoubleCheck = true)
          : (isDoubleCheck = false)
      );
    }

    if (!isDoubleCheck) {
      setRows([
        ...rows,
        {
          tableName: tableNameRef.current.value,
          api: apiAllListRef.current.value,
          isValidation: false,
        },
      ]);
    } else {
      window.alert("테이블명 중복");
    }
  };

  const onClickApiDelete = () => {
    let deleteApiList = [];
    rows.map((row, index) =>
      checkList.includes(String(index)) ? null : deleteApiList.push(row)
    );

    api
      .post("api/add", {
        apiList: deleteApiList,
      })
      .then((res) => {
        console.log(res.data);
        setRows((rows) => res.data.apiList);
      })
      .catch((err) => console.log(err));
    setCheckList([]);
  };

  const onClickApiSet = () => {
    const apiList = [];
    rows.map((row) => apiList.push(row));
    api
      .post("api/add", {
        apiList: apiList,
      })
      .then((res) => {
        console.log(res.data.apiList);
        setRows((rows) => res.data.apiList);
      })
      .catch((err) => console.log(err));
  };
  return (
    <React.Fragment>
      <PageHeader title="환경설정 - API 관리" />
      <PageBody>
        <Grid container justifyContent="center" alignItems="center">
          <div>
            <Grid
              item
              xs={8}
              style={{
                margin: "auto",
                marginTop: "50px",
                minWidth: "1100px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Manual />
            </Grid>
            <Grid
              container
              justifyContent="center"
              style={{
                margin: "auto",
                marginTop: "20px",
                marginBottom: "100px",
              }}
            >
              <Grid
                item
                xs={8}
                style={{
                  minHeight: "120px",
                  minWidth: "1100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "20px",
                  border: "2px solid #6799FF",
                }}
              >
                <Grid item style={{ marginRight: "20px" }}>
                  <Typography
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    테이블명
                  </Typography>
                  <TextField
                    style={{ width: "120px" }}
                    placeholder="입력"
                    inputRef={tableNameRef}
                  ></TextField>
                </Grid>
                <Grid
                  item
                  style={{
                    marginRight: "20px",
                  }}
                >
                  <Typography
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    API 주소
                  </Typography>
                  <TextField
                    style={{
                      width: "230px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    variant="standard"
                    placeholder="입력"
                    inputRef={apiAllListRef}
                  ></TextField>
                </Grid>
                <Grid item style={{ marginRight: "20px" }}>
                  <Button
                    variant="contained"
                    onClick={onClickApiAdd}
                    style={{
                      background: "#6799FF",
                      color: "white",
                    }}
                  >
                    API 추가
                  </Button>
                </Grid>
                <Grid item style={{ marginRight: "20px" }}>
                  <Button
                    variant="contained"
                    onClick={onClickApiDelete}
                    style={{
                      background: "#6799FF",
                      color: "white",
                    }}
                  >
                    API 삭제
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={onClickApiSet}
                    style={{
                      background: "#4374D9",
                      color: "white",
                    }}
                  >
                    API 설정
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={8}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          {rows !== undefined ? (
                            <Checkbox
                              checked={rows.length === checkList.length}
                              onChange={onChangeAllCheck}
                            ></Checkbox>
                          ) : null}
                        </TableCell>
                        <TableCell>테이블이름</TableCell>
                        <TableCell>API 주소</TableCell>
                        <TableCell>사용 가능 여부</TableCell>
                      </TableRow>
                    </TableHead>

                    {rows !== undefined ? (
                      <TableBody>
                        {rows.map((row, index) => {
                          return (
                            <TableRow
                              hover
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 1,
                                },
                              }}
                            >
                              <TableCell>
                                <Checkbox
                                  value={index}
                                  onChange={onChangeSingleCheck}
                                  checked={checkList.includes(String(index))}
                                ></Checkbox>
                              </TableCell>
                              <TableCell>{row.tableName}</TableCell>
                              <TableCell>{row.api}</TableCell>
                              <TableCell style={{ paddingLeft: "50px" }}>
                                {row.isValidation ? (
                                  <CheckIcon color="success" />
                                ) : (
                                  <CloseIcon color="error" />
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    ) : null}
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </PageBody>
    </React.Fragment>
  );
};
export default JsonApi;
