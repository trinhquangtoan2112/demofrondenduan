import ChangePassword from "../layout/Account/ChangePassword";
import Profile from "../layout/Account/Profile";
import User from "../layout/Account/User";
import Active from "../layout/Actiive/Active";
import Chapter from "../layout/Chapter/Chapter";
import Home from "../layout/Home/Home";
import HomePage from "../layout/HomePage";
import Admin from "./../layout/Account/Admin";
import Feedback from "./../layout/Feedback/Feedback";
import FeedbackAdmin from "../layout/Feedback/FeedbackAdmin";

import ButDanh from "../layout/Butdanh/ButDanh";
import LayDoanhThuTruyen from "../layout/Account/LayDoanhThuTruyen";
import LayDoanhThuTruyenAdmin from "../layout/Account/LayDoanhThuTruyenAdmin";
import ButDanhAdmin from "../layout/Butdanh/ButDanhAdmin";
import TheLoaiAdmin from "../layout/TheLoai/TheLoaiAdmin";
import LichSuGiaoDich from "../layout/GiaoDich/LichSuGiaoDich";

import TuTruyen, {
  AddChapter,
  EditChapter,
  EditNovel,
  ListButDanh,
  ListChap,
  StoryCreate,
} from "./../layout/Account/TuTruyen";
import CreateNovel from "./../layout/Account/CreateNovel";
import StoryDetail from "../layout/StoryDetail/StoryDetail";
import BaoCaoAdmin from "../layout/BaoCao/BaoCaoAdmin";
import DanhDau from "../layout/QLDanhDau/DanhDau";
import LichSuDoc from "../components/LichSuDoc";
import AdminTruyen from "../components/AdminTruyen";
import KetQuaGiaoDich from "../components/KetQuaGiaoDich";
import DuyetTruyen from "../layout/Admin/DuyetTruyen";
import AllStories from "../components/AllStories";
import DuyetChuong from "../layout/Admin/DuyetChuong";
import Searching from "../components/Searching";
import UserMenuModal from "../components/UserMenuModal";
import QuanLyTruyenAllButDanh from "../layout/Account/QuanLyTruyenAllButDanh";
import QuanLyButDanhUser from "../layout/Account/QuanLyButDanhUser";
import ThembanThao from "../layout/BanThao/ThembanThao";
import DanhSachBanThao from "../layout/BanThao/DanhSachBanThao";
import ListChuongAdmin from "../layout/Chapter/ListChuongAdmin";
import EditBanThao from "../layout/BanThao/EditBanThao";
import DetailTruyen from "../components/DetailTruyen";
import DetailChuong from "../components/DetailChuong";

const ROUTES = [
  {
    index: 1,
    path: "UserDetail",
    element: <Profile></Profile>,
    auth: true,
    roles: [],
  },
  {
    index: 2,
    path: "",
    element: <HomePage></HomePage>,
    auth: true,
    roles: [],
  },
  {
    index: 3,
    path: "authenAccount",
    element: <Active></Active>,
    auth: true,
    roles: [],
  },
  {
    index: 4,
    path: "ChangePassword",
    element: <ChangePassword></ChangePassword>,
    auth: true,
    roles: [],
  },
  {
    index: 5,
    path: "quanlynguoidung",
    element: <User></User>,
    auth: false,
    roles: [],
  },
  {
    index: 6,
    path: ":truyen/:name/:maChuong",
    element: <Chapter></Chapter>,
    auth: true,
    roles: [],
  },
  {
    index: 7,
    path: "Feedback",
    element: <Feedback></Feedback>,
    auth: true,
    roles: [],
  },
  {
    index: 8,
    path: "FeedbackAdmin",
    element: <FeedbackAdmin></FeedbackAdmin>,
    auth: false,
    roles: [],
  },
  {
    index: 9,
    path: "DangTruyen",
    element: <CreateNovel></CreateNovel>,
    auth: false,
    roles: [],
  },

  {
    index: 10,
    path: "CapNhapTruyen/:id",
    element: <EditNovel></EditNovel>,
    auth: false,
    roles: [],
  },
  {
    index: 11,
    path: "truyen/:id",
    element: <StoryDetail></StoryDetail>,
    auth: true,
    roles: [],
  },
  {
    index: 12,
    path: "QuanLyTruyen/:id",
    element: <TuTruyen></TuTruyen>,
    auth: true,
    roles: [],
  },
  {
    index: 13,
    path: "QuanLyChuong/:idChuong",
    element: <ListChap></ListChap>,
    auth: false,
    roles: [],
  },
  {
    index: 14,
    path: "ChinhSuaChuong/:idChuong",
    element: <EditChapter></EditChapter>,
    auth: false,
    roles: [],
  },
  {
    index: 15,
    path: "ThemTruyen/:idChuong",
    element: <AddChapter></AddChapter>,
    auth: false,
    roles: [],
  },
  {
    index: 16,
    path: "ButDanh",
    element: <ButDanh></ButDanh>,
    auth: false,
    roles: [],
  },
  {
    index: 17,
    path: "ThemButDanh/:idNguoiDung",
    element: <ListButDanh></ListButDanh>,
    auth: true,
    roles: [],
  },
  {
    index: 18,
    path: "DanhDau",
    element: <DanhDau></DanhDau>,
    auth: true,
    roles: [],
  },
  {
    index: 19,
    path: "ButDanhAdmin",
    element: <ButDanhAdmin></ButDanhAdmin>,
    auth: false,
    roles: [],
  },
  {
    index: 20,
    path: "TheLoaiAdmin",
    element: <TheLoaiAdmin></TheLoaiAdmin>,
    auth: false,
    roles: [],
  },
  {
    index: 21,
    path: "LichSuDoc",
    element: <LichSuDoc></LichSuDoc>,
    auth: true,
    roles: [],
  },
  {
    index: 22,
    path: "TruyenAdmin",
    element: <AdminTruyen></AdminTruyen>,
    auth: false,
    roles: [],
  },
  {
    index: 23,
    path: "BaoCaoAdmin",
    element: <BaoCaoAdmin></BaoCaoAdmin>,
    auth: false,
    roles: [],
  }, 
  {
    index: 24,
    path: "KetQuaGiaoDich",
    element: <KetQuaGiaoDich></KetQuaGiaoDich>,
    auth: true,
    roles: [],
  },
  {
    index: 25,
    path: "DuyetTruyen",
    element: <DuyetTruyen></DuyetTruyen>,
    auth: false,
    roles: [],
  },

  {
    index: 26,
    path: "DuyetChuong",
    element: <DuyetChuong></DuyetChuong>,
    auth: false,
    roles: [],
  },
  {
    index: 27,
    path: "searchlist/:id",
    element: <Searching></Searching>,
    auth: true,
    roles: [],
  },
  {
    index: 28,
    path: "QuanLyTruyenCuaMinh",
    element: <QuanLyTruyenAllButDanh></QuanLyTruyenAllButDanh>,
    auth: false,
    roles: [],
  },
  {
    index: 29,
    path: "UserMenuModal",
    element: <UserMenuModal></UserMenuModal>,
    auth: true,
    roles: [],
  },
  {
    index: 30,
    path: "QuanLyBanThao",
    element: <QuanLyButDanhUser></QuanLyButDanhUser>,
    auth: false,
    roles: [],
  },
  {
    index: 31,
    path: "ThemBanThao/:id",
    element: <ThembanThao></ThembanThao>,
    auth: false,
    roles: [],
  },
  {
    index: 32,
    path: "DanhSachBanThaoCuaTruyen/:id",
    element: <DanhSachBanThao></DanhSachBanThao>,
    auth: false,
    roles: [],
  },
  {
    index: 33,
    path: "TruyenAdmin/ListChuong/:id",
    element: <ListChuongAdmin></ListChuongAdmin>,
    auth: false,
    roles: [],
  },
  {
    index: 34,
    path: "ChinhSuaBanThao/:idChuong",
    element: <EditBanThao></EditBanThao>,
    auth: false,
    roles: [],
  },
  {
    index: 35,
    path: "AllStories",
    element: <AllStories></AllStories>,
    auth: true,
    roles: [],
  },
  {
    index: 36,
    path: "DuyetTruyen/DetailTruyen/:id",
    element: <DetailTruyen></DetailTruyen>,
    auth: false,
    roles: [],
  },
  {
    index: 38,
    path: "DuyetChuong/DetailChuong/:id",
    element: <DetailChuong></DetailChuong>,
    auth: false,
    roles: [],
  },
  {
    index: 39,
    path: "LichSuGiaoDich",
    element: <LichSuGiaoDich></LichSuGiaoDich>,
    auth: true,
    roles: [],
  },
  {
    index: 39,
    path: "LayDoanhThuTruyen",
    element: <LayDoanhThuTruyen></LayDoanhThuTruyen>,
    auth: false,
    roles: [],
  },
  {
    index: 39,
    path: "LayDoanhThuTruyenAdmin",
    element: <LayDoanhThuTruyenAdmin></LayDoanhThuTruyenAdmin>,
    auth: false,
    roles: [],
  },
];

export default ROUTES;
