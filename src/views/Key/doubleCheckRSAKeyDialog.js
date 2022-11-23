import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
const DoubleCheckCreateRSAKeyDialog = ({
  secondOpen,
  handleClickSecondClose,
  handleCreateRSAKey,
}) => {
  return (
    <Dialog open={secondOpen} onClose={handleClickSecondClose}>
      <DialogTitle>난수 공개키, 개인키 생성 확인</DialogTitle>
      <DialogContent>
        <DialogContentText>
          공개키, 개인키를 정말 새로 생성하시겠습니까?
        </DialogContentText>
        <DialogContentText>설정 한 이후 되돌릴 수 없습니다.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          style={{ background: "#F32222", color: "white", fontWeight: "bold" }}
          onClick={handleClickSecondClose}
        >
          취소
        </Button>
        <Button
          style={{ background: "#37A3F3", color: "white", fontWeight: "bold" }}
          onClick={handleCreateRSAKey}
          autoFocus
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DoubleCheckCreateRSAKeyDialog;
