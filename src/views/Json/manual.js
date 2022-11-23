import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { Stack, IconButton } from "@mui/material";
import { useState } from "react";
import ManualContent from "./manualContent";

const Manual = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{
          background: "#FFCD12",
          color: "#4C4C4C",
          fontWeight: "bold",
        }}
      >
        Json 사용 메뉴얼
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>JSON 연결 사용 메뉴얼</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent style={{ height: "900px" }}>
          <Divider />
          <ManualContent />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};
export default Manual;
