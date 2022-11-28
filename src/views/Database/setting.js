import React from "react";
import {
  TableContainer,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  Checkbox,
} from "@material-ui/core";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridEventListener,
} from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { PageBody, PageHeader } from "../../components";
import MainCard from "../../components/MainCard";
import { useEffect, useRef, useState } from "react";
import { margin } from "@mui/system";
import api from "../../url/baseUrl";
import { Password } from "@mui/icons-material";
import swal from "sweetalert";

const DBSetting = () => {
  const [dbSelect, setDBSelect] = useState("");
  const [dbAddress, setDBAddress] = useState("");
  const [dbId, setDBId] = useState("");
  const [dbPw, setDBPw] = useState("");
  const [dbSchema, setDBSchema] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState([]);
  const [dbTable, setDBTable] = useState([]);
  const [selectedTable, setSelectedTable] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [cellSelect, setCellSelect] = useState(1);
  const [isCsv, setIsCsv] = useState(false);
  const [csvList, setCsvList] = useState([]);
  const [selectCsvList, setSeletCsvList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [dbStartList, setDbStartList] = useState([]);
  const [csvButtonClick, setCsvButtonClick] = useState(false);

  const inputDBAdrressRef = useRef("");
  const inputDBIdRef = useRef("");
  const inputDBPwRef = useRef("");

  useEffect(() => {
    api.get("api/list/db", {}).then((res) => {
      setDbStartList(res.data.dbStartList);
    });
  }, []);

  useEffect(() => {
    api
      .post("api/list/db/selectList", {
        dbStartList: dbStartList,
      })
      .then((res) => {});
  }, [dbStartList]);

  useEffect(() => {
    if (csvButtonClick) {
      api
        .post("api/row-encrypt/db", {
          data: JSON.stringify(selectCsvList),
        })
        .then((res) => {
          if (res.data.isValid) {
            swal(
              "EXCEL Export 완료!",
              "해당 테이블의 암호파일이 생성되었습니다",
              "success"
            );
          }
        })
        .catch((err) => console.log(err));

      setCsvButtonClick((csvButtonClick) => false);
    }
  }, [selectCsvList]);

  useEffect(() => {
    api
      .post("api/add/db", {
        dbStartList: dbStartList,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  }, [dbStartList]);

  const dbmsList = ["MariaDB", "MsSQL", "Oracle", "MySQL"];

  const onChangeDBList = (e) => {
    const { name, value } = e.target;
    setDBSelect((dbSelect) => value);
  };

  const onClickConnetion = (e) => {
    setDBAddress(inputDBAdrressRef.current.value);
    setDBId(inputDBIdRef.current.value);
    setDBPw(inputDBPwRef.current.value);
    if (dbSelect === "") {
      swal("연결 실패!", "DBMS를 선택하셔야합니다.", "error");
    }
    if (
      inputDBAdrressRef.current.value == "" &&
      inputDBIdRef.current.value == "" &&
      inputDBPwRef.current.value == ""
    ) {
      swal("연결 실패!", "DB정보를 입력하셔야합니다.", "error");
    }
    api
      .post("dbConnect/init", {
        connectDBType: dbSelect,
        dbAddress: inputDBAdrressRef.current.value,
        userId: inputDBIdRef.current.value,
        pwd: inputDBPwRef.current.value,
      })
      .then((res) => {
        setDBSchema(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSchemaChange = (event, row) => {
    setSelectedSchema(row);
    api
      .post("dbConnect/schema", {
        schema: row,
      })
      .then((res) => {
        setDBTable(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleTableChange = (event, row) => {
    setSelectedTable(row);
    api
      .post("dbConnect/table", {
        tableName: row,
      })
      .then((res) => {
        setColumns((columns) => res.data.fieldHeader);
        setRows((rows) => res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCellClick = (event) => {
    setCellSelect(event.row.id);
  };

  const onClickCSV = () => {
    if (isCsv) setIsCsv(false);
    else setIsCsv(true);
  };

  const onClickDownload = () => {
    setCsvButtonClick((csvButtonClick) => true);
    setIsCsv(false);
    setSeletCsvList((setSeletCsvList) => []); //초기화

    setSeletCsvList(
      ...selectCsvList,
      csvList.map((list) => rows[Number(list) - 1])
    );
  };

  const onChangeSingleCheck = (e) => {
    const { value, checked } = e.target;
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
      dbStartList.map((row, i) => (list[i] = String(i)));
    }
    setCheckList(list);
  };

  const onClickDbDelete = () => {
    let deleteApiList = [];
    dbStartList.map((row, index) =>
      checkList.includes(String(index)) ? null : deleteApiList.push(row)
    );

    setDbStartList((rows) => deleteApiList);
    setCheckList([]);

    api
      .post("api/add/db", {
        deleteApiList: deleteApiList,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const onClickDBListSet = () => {
    setDbStartList((dbStartList) => [
      ...dbStartList,
      {
        dbmsName: dbSelect,
        dbAddress: dbAddress,
        userID: dbId,
        userPW: dbPw,
        schemaName: selectedSchema,
        tableName: selectedTable,
        startPoint: cellSelect,
      },
    ]);
  };

  return (
    <React.Fragment>
      <PageHeader title="환경설정 - DB 관리" />
      <PageBody>
        <Grid container justifyContent="center" alignItems="center">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "30px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                background: "#B2CCFF",
                height: "50px",
                width: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                minWidth: "200px",
              }}
            >
              <span style={{ marginRight: "10px", fontWeight: "bold" }}>
                DB종류
              </span>
              <FormControl variant="standard" style={{ minWidth: "80px" }}>
                <Select
                  name="db"
                  value={dbSelect}
                  onChange={onChangeDBList}
                  label="DB종류"
                >
                  {dbmsList.map((db, index) => (
                    <MenuItem key={index} value={db}>
                      <span style={{ fontWeight: "bold" }}>{db}</span>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div
              style={{
                border: "2px solid #6799FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "80px",
                borderRadius: "20px",
                width: "600px",
                margin: "0px 50px 0px 50px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80%",
                }}
              >
                <TextField
                  display="flex"
                  type="text"
                  variant="standard"
                  style={{
                    width: "100%",
                    minWidth: "200px",
                  }}
                  inputProps={{
                    style: {
                      textAlign: "center",
                      fontSize: 13,
                      color: "black",
                    },
                  }} // font size of input text
                  inputRef={inputDBAdrressRef}
                  placeholder="DB 주소 입력 &#13;&#10; ex(localhost:3306)"
                ></TextField>
              </div>
            </div>

            <div
              style={{
                border: "2px solid #6799FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "80px",
                borderRadius: "20px",
                width: "600px",
                margin: "0px 50px 0px 0px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "40%",
                }}
              >
                <TextField
                  display="flex"
                  type="text"
                  variant="standard"
                  style={{
                    width: "100%",
                    minWidth: "200px",
                  }}
                  inputProps={{
                    style: {
                      textAlign: "center",
                      fontSize: 13,
                      color: "black",
                    },
                  }} // font size of input text
                  inputRef={inputDBIdRef}
                  placeholder="DBMS ID입력 &#13;&#10; ex : root"
                ></TextField>
                <div
                  style={{
                    marginLeft: "20px",
                  }}
                ></div>
                <TextField
                  display="flex"
                  type="Password"
                  variant="standard"
                  style={{
                    width: "100%",
                    minWidth: "200px",
                  }}
                  inputProps={{
                    style: {
                      textAlign: "center",
                      fontSize: 13,
                      color: "black",
                    },
                  }} // font size of input text
                  inputRef={inputDBPwRef}
                  placeholder="DBMS PW입력 &#13;&#10; ex : root"
                ></TextField>
              </div>
            </div>

            <Button
              type="submit"
              variant="contained"
              color="default"
              size="medium"
              disableRipple
              onClick={onClickConnetion}
              style={{
                border: "none",
                background: "#6799FF",
                color: "white",
              }}
            >
              연결
            </Button>
          </div>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TableContainer
                    component={Paper}
                    style={{ background: "#B2CCFF", borderRadius: "20px" }}
                  >
                    <Table>
                      <TableHead style={{ background: "#6799FF" }}>
                        <TableRow>
                          <TableCell
                            align="center"
                            style={{
                              color: "white",
                              fontSize: "20px",
                              fontWeight: "bold",
                            }}
                          >
                            스키마 이름
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dbSchema.map((row, index) => {
                          return (
                            <TableRow
                              hover
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 1,
                                },
                              }}
                              onClick={(event) =>
                                handleSchemaChange(event, row.schemaName)
                              }
                              selected={row.schemaName === selectedSchema}
                              value={row.schemaName}
                            >
                              <TableCell
                                style={{ color: "black", fontWeight: "bold" }}
                                align="center"
                              >
                                {row.schemaName}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid item xs={6}>
                  <TableContainer
                    component={Paper}
                    style={{ background: "#B2CCFF", borderRadius: "20px" }}
                  >
                    <Table>
                      <TableHead style={{ background: "#6799FF" }}>
                        <TableRow>
                          <TableCell
                            align="center"
                            style={{
                              color: "white",
                              fontSize: "20px",
                              fontWeight: "bold",
                            }}
                          >
                            테이블 이름
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dbTable.map((row, index) => {
                          return (
                            <TableRow
                              hover
                              key={index}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                              onClick={(event) =>
                                handleTableChange(event, row.tableName)
                              }
                              selected={row.tableName === selectedTable}
                              value={row.tableName}
                            >
                              <TableCell
                                align="center"
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                {row.tableName}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                height: "400px",
                width: "100%",
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                experimentalFeatures={{ newEditingApi: false }}
                checkboxSelection={isCsv}
                onCellClick={(event) => handleCellClick(event)}
                onSelectionModelChange={(itm) => setCsvList(itm)}
                column={{ background: "black" }}
                style={{
                  borderRadius: "20px",
                }}
              />
            </div>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={3} style={{ minWidth: "340px" }}>
              <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={4} style={{ minWidth: "160px" }}>
                  <Button
                    style={{
                      minWidth: "140px",
                      border: "none",
                      background: "#6799FF",
                      color: "white",
                    }}
                    variant="contained"
                    color="default"
                    size="small"
                    onClick={onClickCSV}
                  >
                    Exel파일 만들기
                  </Button>
                </Grid>

                <Grid item xs={4}>
                  {isCsv ? (
                    <Button
                      style={{
                        minWidth: "140px",
                        border: "none",
                        background: "#6799FF",
                        color: "white",
                      }}
                      variant="contained"
                      color="default"
                      size="small"
                      onClick={onClickDownload}
                    >
                      Exel파일 다운로드
                    </Button>
                  ) : null}
                </Grid>

                <Grid item xs={3}></Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Box textAlign="center">
                <Button
                  style={{
                    minWidth: "210px",
                    border: "none",
                    background: "#6799FF",
                    color: "white",
                  }}
                  variant="contained"
                  color="default"
                  size="large"
                  onClick={onClickDBListSet}
                >
                  실시간 암호화 위치 지정
                </Button>
              </Box>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            style={{
              margin: "auto",
              marginTop: "20px",
              marginBottom: "100px",
            }}
          ></Grid>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={8}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        {dbStartList !== undefined ? (
                          <Checkbox
                            checked={dbStartList.length === checkList.length}
                            onChange={onChangeAllCheck}
                          ></Checkbox>
                        ) : null}
                      </TableCell>
                      <TableCell>DBMS명</TableCell>
                      <TableCell>DB주소</TableCell>
                      <TableCell>UserID</TableCell>
                      <TableCell>UserPW</TableCell>
                      <TableCell>스키마명</TableCell>
                      <TableCell>테이블명</TableCell>
                      <TableCell>시작PK위치</TableCell>
                    </TableRow>
                  </TableHead>

                  {dbStartList !== undefined ? (
                    <TableBody>
                      {dbStartList.map((row, index) => {
                        return (
                          <TableRow
                            hover
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 1 },
                            }}
                          >
                            <TableCell>
                              <Checkbox
                                value={index}
                                onChange={onChangeSingleCheck}
                                checked={checkList.includes(String(index))}
                              ></Checkbox>
                            </TableCell>
                            <TableCell>{row.dbmsName}</TableCell>
                            <TableCell>{row.dbAddress}</TableCell>
                            <TableCell>{row.userID}</TableCell>
                            <TableCell>{row.userPW}</TableCell>
                            <TableCell>{row.schemaName}</TableCell>
                            <TableCell>{row.tableName}</TableCell>
                            <TableCell>{row.startPoint}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  ) : null}
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={1}>
              <Grid item style={{ marginRight: "20px" }}>
                <Button
                  variant="contained"
                  onClick={onClickDbDelete}
                  style={{
                    background: "#6799FF",
                    color: "white",
                  }}
                >
                  DB 삭제
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </PageBody>
    </React.Fragment>
  );
};

export default DBSetting;
