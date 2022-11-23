import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
const DoubleCheckSymmetricKeyDialog = ({
  secondOpen,
  handleClickSecondClose,
  handleCreateSymmetricKey,
}) => {
  return (
    <Dialog open={secondOpen} onClose={handleClickSecondClose}>
      <DialogTitle>난수 대칭키 생성 확인</DialogTitle>
      <DialogContent>
        <DialogContentText>
          대칭키를 정말 새로 생성하시겠습니까?
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
          onClick={handleCreateSymmetricKey}
          autoFocus
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DoubleCheckSymmetricKeyDialog;
