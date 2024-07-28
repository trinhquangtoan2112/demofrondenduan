import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { GetChiTietChuongTruyenAction } from "../../service/actions/TruyenAction";
import parse from "html-react-parser";
import { message } from "antd";
import { apiKey } from "../../service/http";
import { useSelector } from "react-redux";
import axios from "axios";
import BinhLuanSection from "../StoryDetail/BinhLuanSection";
import dayjs from "dayjs";
import ReportForm from "../BaoCao/ReportForm";
import {
  themlike,
  xoalike,
  checklike,
} from "../../service/actions/LikeAction.js";
import { setFontStyle, setFormChu } from "../../store/reducer/TienIchReducer.js";

function Chapter(props) {
  const [setting, setSetting] = useState(true);
  const { maChuong, name } = useParams();
  const [chapter, setChapter] = useState({});
  const [manual, setManual] = useState("");
  const [content, setContnet] = useState("Khong co gi");
  const [lineHeight, setLineHeight] = useState(1.5);
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const userInfo = useSelector((state) => state.UserReducer.userInfo);
  console.log(userInfo);
  const [maChuongTruyenBaoCao, setReportingChuongtruyen] = useState(null);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [likesChuong, setLikesChuong] = useState({});
  const allFontKieuChu = useSelector((state) => state.TienIchReducer.allFontKieuChu);
  const { fontChu, fontStyle } = useSelector((state) => state.TienIchReducer);

  console.log(fontChu)
  console.log(fontStyle)
  useEffect(() => {
    const handleSetReading = async () => {
      const data = {
        maChuong: maChuong,
      };
      const result = await GetChiTietChuongTruyenAction(data);

      if (result.status === 401) {
        message.error("Lỗi xảy ra");
        setChapter({
          ...data,
          content: "Hãy mua chương",
        });
        setManual({
          result: result,
        });
      } else {
        setChapter({
          machuongtruyen: result.data.data.machuongtruyen,
          tenChuong: result.data.data.tenChuong,
          content: result.data.data.noiDung,
          stt: result.data.data.stt,
          maTruyen: result.data.data.maTruyen,
          solike: result.data.data.maTruyen,
        });
        setContnet(getTextContent(result?.data?.data?.noiDung));
        setManual({
          result,
        });
      }
      window.scrollTo(0, 0);
    };
    const LuuLichSu = async () => {
      const data = {
        maChuong,
      };
      const result = await apiKey.postToken(
        "LichSuDoc/CapNhapLichSuDoc",
        null,
        data
      );
      console.log(result);
    };
    const themLuotDoc = async () => {
      const data = {
        id: maChuong,
      };
      try {
        const result = await apiKey.post("Chuongtruyens/Themluotdoc", null, data);
      } catch (error) {

      }

    }
    const checkLike = async () => {
      try {
        const maid = {
          loaiThucTheLike: 5,
          maThucThes: [maChuong], // Pass the list of IDs here
        };
        const result = await checklike(maid);
        // Assume result.data is a dictionary with IDs as keys and like statuses as values
        setLikesChuong(result[maChuong]);
      } catch (error) {
        console.error("Error checking like:", error);
      }
    };
    themLuotDoc()
    checkLike();

    handleSetReading();
    if (localStorage.getItem("TOKEN")) {
      LuuLichSu();
    }
  }, [maChuong]);
  const [operationName, setOperationName] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const handleSpeak = async () => {
    const data = {
      noiDung: content,
    };
    try {
      const result = await axios.post(
        "https://localhost:7094/Chuongtruyens/DocChuongTruyen",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob", // Đảm bảo nhận được phản hồi dưới dạng blob
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([result.data], { type: "audio/mpeg" })
      );
      setAudioUrl(url);
    } catch (error) {
      console.error("Error during text-to-speech:", error);
    }
  };
  const getTextContent = (node) => {
    let textContent = "";
    if (typeof node === "string") {
      textContent += node;
    } else if (Array.isArray(node)) {
      node.forEach(getTextContent);
    } else if (node && node.props && node.props.children) {
      getTextContent(node.props.children);
    }

    const parser1 = new DOMParser();
    const doc = parser1.parseFromString(textContent, "text/html");

    return doc.body.textContent || "";
  };

  const handleReportClick = (maChuongtruyenBaocao) => {
    if (userInfo) {
      setReportingChuongtruyen(maChuongtruyenBaocao);
      setReportModalVisible(true);
    } else {
      message.success("Hãy đăng nhập để báo cáo nội dung này");
    }
  };

  const handLike = async (number) => {
    if (!userInfo) {
      message.success("Hãy đăng nhập để like truyện");
      return;
    }

    const maid = {
      loaiThucTheLike: 5,
      maThucThe: maChuong,
    };

    try {
      if (number === 0) {
        await themlike(maid);
        setLikesChuong(true);
        setChapter((prev) => ({
          ...prev,
          solike: prev.solike + 1,
        }));
      } else if (number === 1) {
        await xoalike(maid);
        setLikesChuong(false);
        setChapter((prev) => ({
          ...prev,
          solike: prev.solike - 1,
        }));
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to update like status.");
    }
  };
  const renderNoiDung = () => {
    return <div>{parse(chapter.content)}</div>;
  };
  const renderTienIchFontSize = () => {
    const options = [];
    for (let i = 10; i < 30; i++) {
      options.push(<option key={i} value={i}>{i}px</option>);
    }
    return options
  }
  const renderTienIchFont = () => {
    const options = [];
    for (let i = 0; i < allFontKieuChu.length; i++) {
      options.push(<option key={allFontKieuChu[i].style} value={allFontKieuChu[i].style}>{allFontKieuChu[i].name}</option>);
    }
    return options
  }
  return (
    <>
      <div
        className="main"
        style={{ backgroundColor: "#ced9d9", paddingTop: "30px" }}
      >
        <div className="chapter-manual__popup w-6/12 mx-auto" >
          <div>  <a onClick={() => {
            setSetting(!setting)
          }} className="flex flex-row items-center"><h4>Cài đặt</h4><i className="fa-solid fa-gear ml-1"></i></a></div>
          {setting ? <li className={`chapter-manual__item active`} onClick={(e) => {

            console.log("24124214")
          }}>

            <div className="chapter-manual__popup">

              <div className="chapter-setting">
                <table className='chapter-setting__body fs-18'>
                  <tbody>
                    <tr className="mb-2">
                      <td className='col-4'>
                        <p>Font size</p>
                      </td>
                      <td className='col-8'>
                        <div className='d-flex chapter-setting__input'>

                          <select defaultValue={fontChu} onChange={(e) => {
                            dispatch(setFormChu(e.target.value))
                          }}>
                            {renderTienIchFontSize()}
                          </select>
                        </div>
                      </td>
                    </tr>
                    <tr className="mb-2">
                      <td className='col-4'>
                        <p>Font</p>
                      </td>
                      <td className='col-8'>
                        <div className='d-flex chapter-setting__input'>

                          <select defaultValue={fontStyle} onChange={(e) => {
                            dispatch(setFontStyle(e.target.value))
                          }}>
                            {renderTienIchFont()}
                          </select>
                        </div>
                      </td>
                    </tr>
                    {userInfo.vip ?
                      <tr className="mb-2">
                        <td className='col-4'>
                          <button onClick={handleSpeak}>Đọc văn bản</button>
                        </td>
                        <td className='col-8'>
                          <div className='d-flex chapter-setting__input'>

                            <div>   {audioUrl && <audio controls src={audioUrl}
                            //  onEnded={() => {
                            //   window.alert("Keets thuc")
                            // }}
                            ></audio>}
                            </div>

                          </div>
                        </td>
                      </tr> : null}
                  </tbody>
                </table>
              </div>

            </div>
          </li>
            : null}

        </div>




        <div className="container">
          <div
            className="main-content"
            style={{
              position: "relative",
              margin: "0 80px",
              backgroundColor: "#e1e8e8",
            }}
          >


            <div
              className="d-lex"
              style={{ fontSize: `${fontChu}px`, fontFamily: `${fontStyle}` }}
            >
              {chapter?.stt ? (
                <h1 className="chapter-name">
                  {" "}
                  CHƯƠNG {chapter?.stt}: {chapter?.tenChuong.toUpperCase()}
                </h1>
              ) : null}
              <div style={{ lineHeight: `${lineHeight}` }}>
                <div id="chapter-content">
                  {chapter?.content ? (
                    renderNoiDung()
                  ) : (
                    <p>Lỗi xảy ra hãy reset lại web</p>
                  )}
                </div>

              </div>
              <div>Số Like: {chapter?.solike || 0}</div>
            </div>
            <div className="w-1/6 mx-auto flex flex-row justify-between">
              {manual?.result?.data.data.trangTruoc ? (
                <Link
                  className="cursor-pointer"
                  to={`/truyen/${name}/${manual?.result.data.data.trangTruoc}`}
                >
                  <button className="px-5 py-1 bg-green-500">
                    <i className="fa fa-arrow-left" />
                  </button>
                </Link>
              ) : (
                <button className="px-5 py-1 bg-green-300" disabled>
                  <i className="fa fa-arrow-left" />
                </button>
              )}

              <div style={{ display: "flex" }}>
                <button
                  style={{ padding: "5px 10px", border: "1px solid #ff7300", margin: '0 5px' }}
                  className="text-yellow-500 hover:text-yellow-600"
                  onClick={() => handleReportClick(maChuong)}
                >
                  <i className="fa-solid fa-flag"></i>
                </button>
                {likesChuong ? (
                  <button
                    style={{ minWidth: "10px", color: "red", padding: "5px 10px", border: "1px solid #ff7300", margin: '0 5px' }}
                    onClick={() => handLike(1)}
                  >
                    <i className="fa fa-heart"></i>
                  </button>
                ) : (
                  <button
                    style={{ minWidth: "10px", padding: "5px 10px", border: "1px solid #ff7300", margin: '0 5px' }}
                    onClick={() => handLike(0)}
                  >
                    <i className="fa fa-heart"></i>
                  </button>
                )}
              </div>

              {manual?.result?.data.data.trangTiep ? (
                <Link
                  className="cursor-pointer"
                  to={`/truyen/${name}/${manual?.result.data.data.trangTiep}`}
                >
                  <button className="px-5 py-1 bg-green-500">
                    <i className="fa fa-arrow-right" />
                  </button>
                </Link>
              ) : (
                <button className="px-5 py-1 bg-green-300" disabled>
                  {" "}
                  <i className="fa fa-arrow-right" />
                </button>
              )}
            </div>
            <BinhLuanSection id={chapter?.maTruyen} />

            <ReportForm
              visible={reportModalVisible}
              onCancel={() => setReportModalVisible(false)}
              maThucThe={maChuongTruyenBaoCao ? maChuongTruyenBaoCao : null}
              LoaiBaoCao={5}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chapter;
