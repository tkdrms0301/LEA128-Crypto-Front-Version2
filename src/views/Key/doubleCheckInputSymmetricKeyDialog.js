import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
const DoubleCheckInputSymmetricKeyDialog = ({
  secondOpen,
  handleClickSecondClose,
  handleCreateInputSymmetricKey,
  input,
}) => {
  return (
    <Dialog open={secondOpen} onClose={handleClickSecondClose}>
      <DialogTitle>사용자 입력 대칭키 생성 확인</DialogTitle>
      <DialogContent>
        <DialogContentText>
          정말 {input} 값으로 대칭키를 새로 생성하시겠습니까?
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
          onClick={handleCreateInputSymmetricKey}
          autoFocus
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DoubleCheckInputSymmetricKeyDialog;
