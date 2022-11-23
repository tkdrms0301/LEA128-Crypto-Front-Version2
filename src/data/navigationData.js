import UsbIcon from "@mui/icons-material/Usb";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import RouteIcon from "@mui/icons-material/Route";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HttpsIcon from "@mui/icons-material/Https";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import InputIcon from "@mui/icons-material/Input";
import LockResetIcon from "@mui/icons-material/LockReset";
import KeyIcon from "@mui/icons-material/Key";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
export const mainNavigation = [
  {
    name: "장비연결 상태",
    icon: UsbIcon,
    url: `/main`,
  },
  {
    name: "환경 설정",
    icon: RouteIcon,
    url: `/config`,
    navigationData: [
      {
        name: "API 관리",
        icon: InputIcon,
        url: "/config/json",
      },
      {
        name: "DB 관리",
        icon: InputIcon,
        url: "/config/db",
      },
    ],
  },
  {
    name: "데이터 암호화",
    icon: HttpsIcon,
    url: `/encryption`,
    navigationData: [
      {
        name: "JSON 실시간 동작",
        icon: HourglassBottomIcon,
        url: `/encryption/jsonLive`,
      },
      {
        name: "DB 실시간 동작",
        icon: HourglassBottomIcon,
        url: `/encryption/dbLive`,
      },
      {
        name: "파일 암호화",
        icon: UploadFileIcon,
        url: `/encryption/fileCryption`,
      },
      {
        name: "문자열 암호화",
        icon: TextFormatIcon,
        url: `/encryption/stringCryption`,
      },
    ],
  },
  {
    name: "데이터 복호화",
    icon: LockResetIcon,
    url: `/decryption`,
    navigationData: [
      {
        name: "파일 복호화",
        icon: UploadFileIcon,
        url: `/decryption/fileDecryption`,
      },
      {
        name: "문자열 복호화",
        icon: TextFormatIcon,
        url: `/decryption/stringDecryption`,
      },
    ],
  },
  {
    name: "로그 관리",
    icon: NoteAltIcon,
    url: `/log`,
    navigationData: [
      {
        name: "로그 확인",
        icon: LockOpenIcon,
        url: `/log/decryption`,
      },
    ],
  },
  {
    name: "키 관리",
    icon: KeyIcon,
    url: "/key",
    navigationData: [
      {
        name: "키 생성",
        icon: AddCircleOutlineIcon,
        url: "/key/create",
      },
      {
        name: "키 확인",
        icon: TaskAltIcon,
        url: "/key/check",
      },
    ],
  },
];
