import { useCallback, useEffect, useState } from "react";

import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import LoadingData from "../../components/LoadingData";
import Grid from "../../components/Grid";
import Pagination from "./../../components/Pagination";
import { GetChiTietChuongTruyen } from "../../service/actions/TruyenAction";
import {
  themdanhdautruyen,
  checkDanhDau,
  XoaDanhDauTruyen,
} from "../../service/actions/DanhDauAction";
import dayjs from "dayjs";
import parse from "html-react-parser";
import { apiKey } from "../../service/http";
import { useSelector } from "react-redux";

const nav = [
  //navigate
  {
    path: "about",
    display: "Giới thiệu",
  },
  {
    path: "rate",
    display: "Đánh giá",
  },
  {
    path: "chapter",
    display: "Ds Chương",
  },
  {
    path: "comment",
    display: "Bình luận",
  },
  {
    path: "donate",
    display: "Hâm mộ",
  },
];

function StoryDetail() {
  const { id } = useParams();
  const [truyen, setTruyen] = useState(null);
  const [catGiu, setCatGiu] = useState(100);
  const [lichSu, setLichSu] = useState(null);
  const [tab, setTab] = useState("");
  const active = nav.findIndex((e) => e.path === tab);
  const [loadingData, setLoadingData] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const userInfo = useSelector((state) => state.UserReducer.userInfo);

  useEffect(() => {
    //load truyện
    const getStory = async () => {
      const result = await GetChiTietChuongTruyen(id);
      const maTruyen = {
        maTruyen: id
      }
      console.log(result)
      try {
        const getLichSuDoc = await apiKey.getToken("LichSuDoc/LichSuDocTheoTruyen", maTruyen);
        console.log(getLichSuDoc)
        setLichSu(getLichSuDoc.data.data)
      } catch (error) {
        console.log(error)
      }
      setTruyen(result);
    };
    getStory();
  }, []);

  useEffect(() => {
    if (!userInfo) {
      console.log("Chưa đăng nhập nên không checkBoomark được");
    } else if (truyen) {
      const checkBookmark = async () => {
        try {
          const maid = {
            maTruyen: truyen?.maTruyen,
          };
          const result = await checkDanhDau(maid);
          setIsBookmarked(result.data);
        } catch (error) {
          console.error("Error checking bookmark:", error);
        }
      };
      checkBookmark();
    }
  }, [userInfo, truyen]);

  const handleBookmark = async () => {
    if (!userInfo) {
      message.success("Hãy đăng nhập để đánh dấu truyện");
    } else {
      const maid = {
        maTruyen: truyen?.maTruyen,
      };
      try {
        await themdanhdautruyen(maid);
        setIsBookmarked(true);
      } catch (error) {
        console.error("Error:", error); // Log lỗi để kiểm tra chi tiết
        message.error("Failed to add bookmark. It might already exist.");
      }
    }
  };

  const handleRemoveBookmark = async () => {
    if (!userInfo) {
      message.success("Hãy đăng nhập để đánh dấu truyện");
    } else {
      const maid = {
        maTruyen: truyen?.maTruyen,
      };
      try {
        await XoaDanhDauTruyen(maid); // Implement removeBookmark tương tự như themdanhdautruyen
        setIsBookmarked(false); // cập nhật trạng thái
      } catch (error) {
        console.error("Error:", error);
        message.error("Failed to remove bookmark. Please try again.");
      }
    }
  };

  const handleSetPage = async () => {
    console.log(214124124);
  };

  // useEffect(() => {//xử lý đổi tab
  //   switch (tab) {
  //     case 'about':
  //       setMain(<About key={'about'} truyen={truyen} />)
  //       break
  //     case 'rate':
  //       setMain(<Rate key={'rate'} />)
  //       break
  //     case 'chapter':
  //       setMain(<ListChapter key={'chapter'} url={truyen.url} />)
  //       break
  //     case 'comment':
  //       setMain(<Comment key={'comment'} url={truyen.url} />)
  //       break
  //     default:
  //       setMain(<Donate key={'donate'} />)
  //   }
  // }, [tab])

  // const onClickTab = async (e) => {
  //   setTab(e.target.name)
  // }
  //style
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
              <div className="col-3">
                <div className="heroSide__main">
                  <h2 className="mb-1">{truyen?.tenTruyen}</h2>
                  <ul className="flex flex-col w-full">
                    <li className={liClass}>Tác giả: {truyen?.tenButDanh}</li>
                    <li className={liClass}>Thể loại: {truyen?.tenTheLoai}</li>

                    <li className={liClass}>
                      Ngày cập nhập:{" "}
                      {dayjs(truyen?.ngayCapNhat).format("DD/MM/YYYY")}
                    </li>
                  </ul>
                  <ul className="heroSide__info">
                    <li>
                      <span className="fs-16 bold">
                        {truyen?.tongLuotDoc || "0"}
                      </span>
                      <br />
                      <span>Lượt đọc</span>
                    </li>

                    {/* <li>
                    <span className='fs-16 bold'>{catGiu || '0'}</span>
                    <br />
                    <span>Cất giữ</span>
                  </li> */}
                  </ul>

                  {/* <div className="heroSide__rate">
                  <span className={`fa fa-star ${truyen?.danhgia >= 1 ? 'checked' : ''}`}></span>
                  <span className={`fa fa-star ${truyen?.danhgia >= 2 ? 'checked' : ''}`}></span>
                  <span className={`fa fa-star ${truyen?.danhgia >= 3 ? 'checked' : ''}`}></span>
                  <span className={`fa fa-star ${truyen?.danhgia >= 4 ? 'checked' : ''}`}></span>
                  <span className={`fa fa-star ${truyen?.danhgia >= 5 ? 'checked' : ''}`}></span>
                  <span>&nbsp;{truyen?.danhgia}/5   ({truyen?.soluongdanhgia} đánh giá)</span>
                </div>
                */}
                </div>
                <div className="flex flex-row justify-between">
                  {lichSu ? <Link to={`/truyen/${truyen?.tenTruyen}/${lichSu?.maChuongTruyen}`}
                    className="btn-primary m-0 p-0"
                    style={{ minWidth: "10px" }}
                  >
                    <i class="fa fa-book-reader"></i>
                  </Link> : truyen?.data[0] ? <Link to={`/truyen/${truyen?.tenTruyen}/${truyen?.data[0].maChuong}`}
                    className="btn-primary m-0 p-0"
                    style={{ minWidth: "10px" }}
                  >
                    <i class="fa fa-book-reader"></i>
                  </Link> : <button
                    className="btn-primary m-0 p-0"
                    style={{ minWidth: "10px" }}
                    disabled
                  >
                    <i class="fa fa-book-reader" ></i>
                  </button>}

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

                  <button
                    className="btn-outline m-0 p-0"
                    style={{ minWidth: "10px" }}
                  >
                    <i class="fa fa-heart"></i>
                  </button>
                </div>
              </div>
              <div className="col-9" style={{ overflowY: "scroll" }}>
                {truyen?.moTa != null ? parse(truyen?.moTa) : "Khong co gi"}
              </div>
            </div>

            {/* <div className="story-detail">
              <div className="navigate">
                {
                  nav.map((item, index) => {
                    return (
                      <a className={`navigate__tab fs-20 bold ${active === index ? 'tab_active' : ''}`}
                        key={index}
                        name={item.path}
                      // onClick={onClickTab}
                      >{item.display}</a>)
                  })
                }
              </div>
            </div> */}

            <div className="story-detail__tab__main">
              <ListChapter
                dsChuong={truyen?.data}
                tenTruyen={truyen?.tenTruyen}
              ></ListChapter>
            </div>
            {truyen?.totalCount ? (
              <Pagination
                totalPage={truyen?.totalCount}
                currentPage={truyen?.currentPage}
                handleSetPage={handleSetPage}
              ></Pagination>
            ) : null}
          </>
        )}
      </div>
    </Layout>
  );
}

const About = (props) => {
  return (
    <>
      <p>{props.truyen?.noidung}</p>
    </>
  );
};

const Rate = (props) => {
  return <h1>Đánh giá</h1>;
};

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

const Donate = (props) => {
  return <h1>Hâm mộ</h1>;
};
export default StoryDetail;
