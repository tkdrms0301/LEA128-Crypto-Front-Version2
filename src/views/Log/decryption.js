import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { PageBody, PageHeader } from "../../components";
import LogSearch from "./logSearch";
import PathSetting from "./pathSetting";
import axios from "axios";
import api from "../../url/baseUrl";

const Decryption = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [yearList, setYearList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [dayList, setDayList] = useState([]);
  const [requestLog, setRequestLog] = useState("");
  const [rows, setRows] = useState([]);
  const [directoryPath, setDirectoryPath] = useState();
  const inputRef = useRef(null);

  useEffect(() => {
    api.get("log/dir", {}).then((res) => {
      setYearList(res.data.directory);
    });

    api.get("log/path", {}).then((res) => {
      setDirectoryPath(res.data.logPath);
    });
  }, []);

  const pathSettinngHandleClick = (e) => {
    api
      .put("log/path", {
        logPath: inputRef.current.value,
      })
      .then((res) => {
        setDirectoryPath(inputRef.current.value);

        api.get("log/dir", {}).then((res) => {
          setYearList(res.data.directory);
        });
      })
      .catch((err) => console.log(err));
  };

  const contentRequest = (e) => {
    api.get(`log/EN/dir/${year}/${month}/${day}`, {}).then((res) => {
      setRows(res.data.log);
    });
  };

  const onChangeRequestLog = (e) => {
    const { name, value } = e.target;

    if (name === "year") {
      setYear((year) => value);
      api.get(`log/dir/${value}`, {}).then((res) => {
        setMonthList(res.data.directory);
      });
    }

    if (name === "month") {
      setMonth((month) => value);
      api.get(`log/dir/${year}/${value}`, {}).then((res) => {
        setDayList(res.data.directory);
      });
    }

    if (name === "day") {
      setDay((day) => value);
    }
    setRequestLog((requestLog) => ({ ...requestLog, [name]: value }));
  };

  return (
    <React.Fragment>
      <PageHeader title="로그 복호화" />
      <PageBody>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <LogSearch
              year={year}
              month={month}
              day={day}
              yearList={yearList}
              monthList={monthList}
              dayList={dayList}
              onChangeRequestLog={onChangeRequestLog}
              contentRequest={contentRequest}
            />
          </Grid>
          <Grid item xs={6}>
            <PathSetting
              pathSettinngHandleClick={pathSettinngHandleClick}
              inputRef={inputRef}
              setDirectoryPath={setDirectoryPath}
              directoryPath={directoryPath}
            />
          </Grid>

          <Grid item xs={12}>
            <div style={{ marginTop: "50px" }}>
              <Grid container spacing={3}>
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
                            fontWeight: "bold",
                            fontSize: "19px",
                          }}
                        >
                          대칭키
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "19px",
                            overflow: "hidden",
                          }}
                        >
                          암/복호화 데이터
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "19px",
                            overflow: "hidden",
                          }}
                        >
                          날짜
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "19px",
                            overflow: "hidden",
                          }}
                        >
                          서버
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {rows !== null ? (
                      <TableBody style={{}}>
                        {rows.map((row, index) => {
                          return (
                            <TableRow hover key={index}>
                              <TableCell
                                align="center"
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                  width: "200px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "inline-block",
                                    maxWidth: "350px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {row.symmetricKey}
                                </div>
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ fontWeight: "bold", fontSize: "15px" }}
                              >
                                <div
                                  style={{
                                    display: "inline-block",
                                    maxWidth: "280px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {row.title}
                                </div>
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ fontWeight: "bold", fontSize: "15px" }}
                              >
                                <div
                                  style={{
                                    display: "inline-block",
                                    maxWidth: "280px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {row.recordDate}
                                </div>
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ fontWeight: "bold", fontSize: "15px" }}
                              >
                                <div
                                  style={{
                                    display: "inline-block",
                                    maxWidth: "280px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {row.authorInfo}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    ) : null}
                  </Table>
                </TableContainer>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </PageBody>
    </React.Fragment>
  );
};

export default Decryption;
