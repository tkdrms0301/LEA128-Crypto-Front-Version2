import React, { useState } from "react";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import DoubleCheckInputSymmetricKeyDialog from "./doubleCheckInputSymmetricKeyDialog";
const CheckCreateInputSymmetricKey = ({
  handleCreateInputSymmetricKey,
  input,
}) => {
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const handleOpen = () => {
    if (input === "") {
      alert("키 값을 입력해야 합니다.");
    } else setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickSecondOpen = () => {
    setSecondOpen(true);
  };
  const handleClickSecondClose = () => {
    setSecondOpen(false);
  };
  return (
    <React.Fragment>
      <Grid>
        <Button
          style={{
            borderRadius: "30px",
            display: "flex ",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "15px",
            fontWeight: "bold",
            color: "white",
            background: "#6799FF",
          }}
          onClick={handleOpen}
        >
          대칭키 변경
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>사용자 입력 대칭키 생성</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {input} 값으로 대칭키를 새로 생성하겠습니까?
            </DialogContentText>
            <DoubleCheckInputSymmetricKeyDialog
              secondOpen={secondOpen}
              handleClickSecondOpen={handleClickSecondOpen}
              handleClickSecondClose={handleClickSecondClose}
              handleCreateInputSymmetricKey={handleCreateInputSymmetricKey}
              input={input}
            />
          </DialogContent>
          <DialogActions>
            <Button
              style={{
                background: "#F32222",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={handleClose}
            >
              거절
            </Button>
            <Button
              style={{
                background: "#37A3F3",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={handleClickSecondOpen}
              autoFocus
            >
              동의
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
};
export default CheckCreateInputSymmetricKey;
