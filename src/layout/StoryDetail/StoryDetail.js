import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { message } from "antd";
import LoadingData from "../../components/LoadingData";
import Grid from "../../components/Grid";
import Pagination from "./../../components/Pagination";
import { GetChiTietChuongTruyen } from "../../service/actions/TruyenAction";
import {
  themdanhdautruyen,
  checkDanhDau,
  XoaDanhDauTruyen,
} from "../../service/actions/DanhDauAction";
import {
  themlike,
  xoalike,
  checklike,
} from "../../service/actions/LikeAction.js";
import dayjs from "dayjs";
import parse from "html-react-parser";
import { apiKey } from "../../service/http";
import { useSelector } from "react-redux";
import Danhgiacha from "./Danhgiacha";
import ReportForm from "../BaoCao/ReportForm.js";

import DSDanhGia from "./DSDanhGia";
import BinhLuanSection from "./BinhLuanSection";

const nav = [
  { path: "rate", display: "Đánh giá" },
  { path: "chapter", display: "Danh sách chương" },
  { path: "comment", display: "Bình luận" },
];

function StoryDetail() {
  const { id } = useParams();
  const [truyen, setTruyen] = useState(null);
  const [catGiu, setCatGiu] = useState(100);
  const [lichSu, setLichSu] = useState(null);
  const [tab, setTab] = useState("rate");
  const active = nav.findIndex((e) => e.path === tab);
  const [loadingData, setLoadingData] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesStatus, setLikesStatus] = useState({}); // New state for likes
  const userInfo = useSelector((state) => state.UserReducer.userInfo);
  const [maTruyenBaoCao, setReportingTruyen] = useState(null);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const getStory = async () => {
      const result = await GetChiTietChuongTruyen(id);
      const maTruyen = { maTruyen: id };
      if (localStorage.getItem("TOKEN")) {
        try {
          const getLichSuDoc = await apiKey.getToken(
            "LichSuDoc/LichSuDocTheoTruyen",
            maTruyen
          );
          setLichSu(getLichSuDoc.data.data);
        } catch (error) {
          console.log(error);
        }
      }
      const chapters = result?.data || []; // Default to an empty array if undefined

      // Calculate chapter likes only if chapters is an array
      const chapterLikes = Array.isArray(chapters)
        ? chapters.reduce((sum, chapter) => sum + (chapter.solike || 0), 0)
        : 0;
      setTruyen(result);
      setLikesCount(result?.solike + chapterLikes || 0);
    };
    getStory();
  }, []);

  useEffect(() => {
    if (!userInfo) {
      console.log("Chưa đăng nhập nên không checkBookmark, và like được");
    } else if (truyen) {
      const checkBookmark = async () => {
        try {
          const maid = { maTruyen: truyen?.maTruyen };
          const result = await checkDanhDau(maid);
          setIsBookmarked(result.data);
        } catch (error) {
          console.error("Error checking bookmark:", error);
        }
      };

      const checkLike = async () => {
        try {
          const maid = {
            loaiThucTheLike: 1,
            maThucThes: [truyen?.maTruyen], // Pass the list of IDs here
          };
          const result = await checklike(maid);
          // Assume result.data is a dictionary with IDs as keys and like statuses as values
          setLikesStatus(result[truyen?.maTruyen]);
        } catch (error) {
          console.error("Error checking like:", error);
        }
      };

      checkBookmark();
      checkLike();
    }
  }, [userInfo, truyen]);

  const handleBookmark = async () => {
    if (!userInfo) {
      message.success("Hãy đăng nhập để đánh dấu truyện");
    } else {
      const maid = { maTruyen: truyen?.maTruyen };
      try {
        await themdanhdautruyen(maid);
        setIsBookmarked(true);
      } catch (error) {
        console.error("Error:", error);
        message.error("Failed to add bookmark. It might already exist.");
      }
    }
  };

  const handleRemoveBookmark = async () => {
    if (!userInfo) {
      message.success("Hãy đăng nhập để đánh dấu truyện");
    } else {
      const maid = { maTruyen: truyen?.maTruyen };
      try {
        await XoaDanhDauTruyen(maid);
        setIsBookmarked(false);
      } catch (error) {
        console.error("Error:", error);
        message.error("Failed to remove bookmark. Please try again.");
      }
    }
  };

  const handLike = async (number) => {
    if (!userInfo) {
      message.success("Hãy đăng nhập để like truyện");
    } else {
      const maid = {
        loaiThucTheLike: 1,
        maThucThe: truyen?.maTruyen,
      };
      try {
        if (number === 0) {
          await themlike(maid);
          setLikesStatus(true);
          setLikesCount((prevCount) => prevCount + 1); // Increment the likes count
        } else if (number === 1) {
          await xoalike(maid);
          setLikesStatus(false);
          setLikesCount((prevCount) => prevCount - 1); // Decrement the likes count
        }
      } catch (error) {
        console.error("Error:", error);
        message.error("Failed to add bookmark. It might already exist.");
      }
    }
  };

  const copyToClipboard = () => {
    const link = window.location.href;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert("Lấy đường dẫn chia sẻ thành công: " + link);
      })
      .catch((err) => {
        console.error("Thất bại", err);
      });
  };

  const handleReportClick = (maTruyenBaocao) => {
    if (userInfo) {
      setReportingTruyen(maTruyenBaocao);
      setReportModalVisible(true);
    } else {
      message.success("Hãy đăng nhập để báo cáo nội dung này");
    }
  };

  const handleSetPage = async () => {
    console.log(214124124);
  };

  const handleTabChange = (e) => {
    setTab(e.target.name);
  };

  const liClass = "border-primary rounded-2 color-primary m-1";
  return (
    <Layout>
      <div className="main-content">
        {loadingData ? (
          <LoadingData />
        ) : (
          <>
            <div className="heroSide d-flex">
              <div className="img-wrap">
                <img src={truyen?.anhBia} className="h-full" alt="" />
              </div>
              <div className="sm:col-4">
                <div className="heroSide__main">
                  <h2 className="mb-1 bold">{truyen?.tenTruyen}</h2>
                  <ul className="flex flex-col w-full">
                    <li className={liClass}>Tác giả: {truyen?.tacGia}</li>
                    <li className={liClass}>Thể loại: {truyen?.tenTheLoai}</li>
                    <li className={liClass}>
                      Ngày cập nhập:{" "}
                      {dayjs(truyen?.ngayCapNhat).format("DD/MM/YYYY")}
                    </li>
                    <li>
                      Điểm đánh giá: {truyen?.diemDanhGia ? `${truyen?.diemDanhGia}/5` : '0/5'}
                      <i className='fa-solid fa-star text-yellow-500' />
                    </li>
                  </ul>
                  <div style={{ display: "flex" }}>
                    <ul className="heroSide__info">
                      <li>
                        <span className="fs-16 bold">
                          {truyen?.tongLuotDoc || "0"}
                        </span>
                        <br />
                        <span>Lượt đọc</span>
                      </li>
                    </ul>
                    <ul className="heroSide__info">
                      <li>
                        <span className="fs-16 bold">{likesCount}</span>
                        <br />
                        <span>Lượt like</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  {lichSu ? (
                    <Link
                      to={`/truyen/${truyen?.tenTruyen}/${lichSu?.maChuongTruyen}`}
                      className="btn-outline m-0 p-0"
                      style={{ minWidth: "10px" }}
                    >
                      <i className="fa fa-book-reader"></i>
                    </Link>
                  ) : truyen?.data[0] ? (
                    <Link
                      to={`/truyen/${truyen?.tenTruyen}/${truyen?.data[0].maChuong}`}
                      className="btn-outline m-0 p-0"
                      style={{ minWidth: "10px" }}
                    >
                      <i className="fa fa-book-reader"></i>
                    </Link>
                  ) : (
                    <button
                      className="btn-primary m-0 p-0"
                      style={{ minWidth: "10px" }}
                      disabled
                    >
                      <i className="fa fa-book-reader"></i>
                    </button>
                  )}
                  {isBookmarked ? (
                    <button
                      className="btn-primary m-0 p-0"
                      style={{ minWidth: "10px" }}
                      onClick={() => handleRemoveBookmark()}
                    >
                      <i className="fa fa-check"></i>
                    </button>
                  ) : (
                    <button
                      className="btn-outline m-0 p-0"
                      style={{ minWidth: "10px" }}
                      onClick={() => handleBookmark()}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  )}
                  {likesStatus ? (
                    <button
                      className="btn-primary m-0 p-0"
                      style={{ minWidth: "10px" }}
                      onClick={() => handLike(1)}
                    >
                      <i className="fa fa-heart"></i>
                    </button>
                  ) : (
                    <button
                      className="btn-outline m-0 p-0"
                      style={{ minWidth: "10px" }}
                      onClick={() => handLike(0)}
                    >
                      <i className="fa fa-heart"></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="col-9 content123" style={{ overflowY: "scroll" }}>
                <div className="flex justify-between items-center">
                  <div className="row bold">Giới Thiệu</div>
                  <div>
                    <button
                      style={{ border: '1px solid gray', padding: '5px 10px', borderRadius: '50%' }}
                      className="text-yellow-500 hover:text-yellow-600"
                      onClick={() => handleReportClick(truyen.maTruyen)}
                    >
                      <i className="fa-solid fa-flag"></i>
                    </button>
                    <button
                      style={{ border: '1px solid gray', padding: '5px 10px', borderRadius: '50%', marginLeft: '10px' }}
                      className="text-yellow-500 hover:text-yellow-600"
                      onClick={copyToClipboard}
                    >
                      <i className="fa-solid fa-share"></i>
                    </button>
                  </div>
                </div>

                {truyen?.moTa != null ? parse(truyen?.moTa) : "Không có gì"}
              </div>
            </div>

            <div className="story-detail">
              <div className="navigate">
                {nav.map((item, index) => (
                  <a
                    className={`navigate__tab fs-20 bold ${active === index ? "tab_active" : ""
                      }`}
                    key={index}
                    name={item.path}
                    onClick={handleTabChange}
                  >
                    {item.display}
                  </a>
                ))}
              </div>
            </div>

            <ReportForm
              visible={reportModalVisible}
              onCancel={() => setReportModalVisible(false)}
              maThucThe={maTruyenBaoCao ? maTruyenBaoCao : null}
              LoaiBaoCao={4}
            />

            <div className="story-detail__tab__main">
              {tab === "rate" && <Rate />}
              {tab === "chapter" && (
                <ListChapter
                  dsChuong={truyen?.data}
                  tenTruyen={truyen?.tenTruyen}
                />
              )}
              {tab === "comment" && <Comment />}
            </div>
            {tab === "chapter" && (
              <Pagination
                handleSetPage={handleSetPage}
                itemsPerPage={15}
                dataLength={truyen?.data?.length}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export const ListChapter = (props) => {
  const { dsChuong, tenTruyen } = props;
  const [chapters, setChapters] = useState([dsChuong]);
  const [loadingData, setLoadingData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setChapters(dsChuong);
  });

  return (
    <>
      <h3>Danh sách chương</h3>
      {loadingData ? (
        <LoadingData />
      ) : (
        <Grid gap={15} col={props.col || 3} snCol={1}>
          {chapters?.map((item, index) => {
            return (
              <Link
                to={`/truyen/${tenTruyen}/${item?.maChuong}`}
                // to={`/truyen/${url}/${item.chapnumber}`}
                key={item?.maChuong}
                className="text-overflow-1-lines"
                style={{ fontSize: `${props.fontsize || 16}px` }}
              >
                Chương {item?.stt}: {item?.tenChuong}
              </Link>
            );
          })}
        </Grid>
      )}
    </>
  );
};

const Rate = () => {
  return (
    <div>
      <Danhgiacha />
    </div>
  );
};

const Comment = () => {
  const { id } = useParams();

  return (
    <div>
      <BinhLuanSection id={id} />
    </div>
  );
};

export default StoryDetail;
