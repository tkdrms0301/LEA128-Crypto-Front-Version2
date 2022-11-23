import React, { useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import DoubleCheckCreateRSAKeyDialog from "./doubleCheckRSAKeyDialog";

const CheckCreateRSAKey = ({ handleCreateRSAKey }) => {
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
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
            height: "50vh",
            width: "30vw",
            borderRadius: "30px",
            display: "flex ",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3vw",
            fontWeight: "bold",
            color: "white",
          }}
          onClick={handleOpen}
        >
          공개키 생성
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>난수 공개키, 개인키 생성</DialogTitle>
          <DialogContent>
            <DialogContentText>
              공개키, 개인키를 새로 생성하겠습니까?
            </DialogContentText>
            <DoubleCheckCreateRSAKeyDialog
              secondOpen={secondOpen}
              handleClickSecondOpen={handleClickSecondOpen}
              handleClickSecondClose={handleClickSecondClose}
              handleCreateRSAKey={handleCreateRSAKey}
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
export default CheckCreateRSAKey;
