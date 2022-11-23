import React from "react";
import { Grid, Button, FormControl, Select, MenuItem } from "@material-ui/core";

const LogSearch = ({
  year,
  month,
  day,
  yearList,
  monthList,
  dayList,
  onChangeRequestLog,
  contentRequest,
}) => {
  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item>
        <div
          style={{
            background: "#B2CCFF",
            height: "50px",
            minWidth: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
          }}
        >
          <FormControl variant="standard">
            <Select
              name="year"
              value={year}
              style={{ fontWeight: "bold" }}
              onChange={onChangeRequestLog}
              label="년"
            >
              {yearList !== undefined
                ? yearList.map((years, index) => (
                    <MenuItem key={index} value={years}>
                      {yearList[index]}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <span style={{ fontWeight: "bold" }}>년</span>
        </div>
      </Grid>
      <Grid item>
        <div
          style={{
            background: "#B2CCFF",
            height: "50px",
            minWidth: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
          }}
        >
          <FormControl variant="standard">
            <Select
              name="month"
              style={{ fontWeight: "bold" }}
              value={month}
              onChange={onChangeRequestLog}
              label="월"
            >
              {monthList.map((months, index) => (
                <MenuItem key={index} value={months}>
                  {monthList[index]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <span style={{ fontWeight: "bold" }}>월</span>
        </div>
      </Grid>
      <Grid item>
        <div
          style={{
            background: "#B2CCFF",
            height: "50px",
            minWidth: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
          }}
        >
          <FormControl variant="standard">
            <Select
              name="day"
              style={{ fontWeight: "bold" }}
              value={day}
              onChange={onChangeRequestLog}
              label="일"
            >
              {dayList.map((days, index) => (
                <MenuItem key={index} value={days}>
                  {dayList[index]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <span style={{ fontWeight: "bold" }}>일</span>
        </div>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="default"
          size="large"
          disableRipple
          onClick={contentRequest}
          style={{
            border: "none",
            background: "#6799FF",
            color: "white",
          }}
        >
          검색
        </Button>
      </Grid>
    </Grid>
  );
};

export default LogSearch;
