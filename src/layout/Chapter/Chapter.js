import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { GetChiTietChuongTruyenAction } from "../../service/actions/TruyenAction";
import parse from "html-react-parser";
import { message, Button, Modal, Input, Select } from "antd";
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
import { themGiaodich } from "../../service/actions/GiaoDichAction.js";
import {
  setFontStyle,
  setFormChu,
} from "../../store/reducer/TienIchReducer.js";

const { confirm } = Modal;
const { Option } = Select;

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
  const [maChuongTruyenBaoCao, setReportingChuongtruyen] = useState(null);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [likesChuong, setLikesChuong] = useState({});
  const allFontKieuChu = useSelector(
    (state) => state.TienIchReducer.allFontKieuChu
  );
  const { fontChu, fontStyle } = useSelector((state) => state.TienIchReducer);

  const [giftModalVisible, setGiftModalVisible] = useState(false);
  const [selectedGiftAmount, setSelectedGiftAmount] = useState(10);

  useEffect(() => {
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
        const result = await apiKey.post(
          "Chuongtruyens/Themluotdoc",
          null,
          data
        );
      } catch (error) {}
    };
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
    themLuotDoc();
    checkLike();

    handleSetReading();
    if (localStorage.getItem("TOKEN")) {
      LuuLichSu();
    }
  }, [maChuong]);
  const handleSetReading = async () => {
    const data = {
      maChuong: maChuong,
    };
    const result = await GetChiTietChuongTruyenAction(data);

    if (result.status === 401) {
      setChapter({
        ...data,
        stt: result.data.data.stt,
        tenChuong: result.data.data.tenChuong,
        content: "Hãy mua chương để đọc tiếp",
        muachuong: true,
        giachuong: result.data.data.giaChuong,
        maTruyen: result.data.data.maTruyen,
        maChuong: result.data.data.maChuong,
        solike: result.data.data.solike,
        maChuong: result.data.data.machuongtruyen,
      });
      setManual({
        result: result,
      });
    } else {
      setChapter({
        maChuong: result.data.data.machuongtruyen,
        tenChuong: result.data.data.tenChuong,
        content: result.data.data.noiDung,
        stt: result.data.data.stt,
        giachuong: result.data.data.giaChuong,
        maTruyen: result.data.data.maTruyen,
        solike: result.data.data.solike,
      });
      setContnet(getTextContent(result?.data?.data?.noiDung));
      setManual({
        result,
      });
    }
    window.scrollTo(0, 0);
  };
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
    if (!chapter?.content) {
      return <div>Không có nội dung</div>;
    }
    return <div>{parse(chapter.content)}</div>;
  };

  const handGiaodich = async (number) => {
    if (!userInfo) {
      message.success("Hãy đăng nhập để mua chương");
      return;
    }

    let loaiTien;
    let soTien;
    let loaiGiaoDich;

    // Determine the transaction details based on the type
    switch (number) {
      case 0:
        loaiTien = 1;
        loaiGiaoDich = 1;
        soTien = chapter?.giachuong;
        if (userInfo?.soXu < soTien) {
          message.error("Bạn không đủ xu để mua chương này.");
          return;
        }
        break;
      case 1:
        loaiTien = 2;
        loaiGiaoDich = 1;
        soTien = 1;
        if (userInfo?.soChiaKhoa < 1) {
          message.error("Bạn không đủ chìa khóa để mua chương này.");
          return;
        }
        break;
      case 2:
        loaiTien = 4;
        loaiGiaoDich = 4;
        soTien = 1;
        if (userInfo?.soDeCu < soTien) {
          message.error("Bạn không đủ đề cử để đề cử truyện này.");
          return;
        }
        break;
      case 3:
        loaiTien = 1;
        loaiGiaoDich = 5;
        soTien = selectedGiftAmount;
        if (userInfo?.soXu < soTien) {
          message.error("Bạn không đủ xu để gửi quà.");
          return;
        }
        break;
      default:
        return;
    }

    // Show confirmation dialog
    Modal.confirm({
      title: "Xác nhận giao dịch",
      content: `Bạn có chắc chắn muốn thực hiện giao dịch này?`,
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          // Perform the transaction
          await themGiaodich({
            maChuongTruyen: chapter?.maChuong,
            loaiGiaoDich,
            loaiTien,
            soTien,
          });

          // Show success message
          if (number === 0) {
            message.success("Mua chương thành công");
            handleSetReading();
          } else if (number === 1) {
            message.success("Mua chương thành công");
            handleSetReading();
          } else if (number === 2) {
            message.success("Đề cử thành công");
          } else if (number === 3) {
            setGiftModalVisible(false);
          }
        } catch (error) {
          message.error("Giao dịch thất bại");
        }
      },
    });
  };

  const showGiftModal = () => {
    setGiftModalVisible(true);
  };

  const handleGiftModalOk = () => {
    handGiaodich(3); // Trigger the gift transaction
  };

  const handleGiftModalCancel = () => {
    setGiftModalVisible(false);
  };

  const renderTienIchFontSize = () => {
    const options = [];
    for (let i = 10; i < 30; i++) {
      options.push(
        <option key={i} value={i}>
          {i}px
        </option>
      );
    }
    return options;
  };
  const renderTienIchFont = () => {
    const options = [];
    for (let i = 0; i < allFontKieuChu.length; i++) {
      options.push(
        <option key={allFontKieuChu[i].style} value={allFontKieuChu[i].style}>
          {allFontKieuChu[i].name}
        </option>
      );
    }
    return options;
  };
  return (
    <>
      <div
        className="main"
        style={{ backgroundColor: "#ced9d9", paddingTop: "30px" }}
      >
        <div className="chapter-manual__popup flex items-center justify-center w-full  z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <a
              onClick={() => {
                setSetting(!setting);
              }}
              className="flex flex-row items-center cursor-pointer text-gray-700 hover:text-gray-900"
            >
              <h4 className="text-lg font-semibold">Cài đặt</h4>
              <i className="fa-solid fa-gear ml-2 text-xl"></i>
            </a>
          </div>
          {!setting && (
            <ul
              className="chapter-manual__item active bg-white p-4 rounded-lg shadow-lg mt-4"
              onClick={(e) => {
                console.log("24124214");
              }}
            >
              <div className="chapter-manual__popup">
                <div className="chapter-setting">
                  <table className="chapter-setting__body text-lg">
                    <tbody>
                      <tr className="mb-2">
                        <td className="w-1/3">
                          <p>Font size</p>
                        </td>
                        <td className="w-2/3">
                          <div className="flex chapter-setting__input">
                            <select
                              defaultValue={fontChu}
                              onChange={(e) => {
                                dispatch(setFormChu(e.target.value));
                              }}
                              className="border border-gray-300 rounded-md p-2"
                            >
                              {renderTienIchFontSize()}
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr className="mb-2">
                        <td className="w-1/3">
                          <p>Font</p>
                        </td>
                        <td className="w-2/3">
                          <div className="flex chapter-setting__input">
                            <select
                              defaultValue={fontStyle}
                              onChange={(e) => {
                                dispatch(setFontStyle(e.target.value));
                              }}
                              className="border border-gray-300 rounded-md p-2"
                            >
                              {renderTienIchFont()}
                            </select>
                          </div>
                        </td>
                      </tr>
                      {userInfo.vip && (
                        <tr className="mb-2">
                          <td className="w-1/3">
                            <button
                              onClick={handleSpeak}
                              className=" rounded-md px-4 py-2 hover:bg-[#e66700] bg-[#ff7300]"
                            >
                              Đọc văn bản
                            </button>
                          </td>
                          <td className="w-2/3">
                            <div className="flex chapter-setting__input">
                              {audioUrl && (
                                <audio
                                  controls
                                  src={audioUrl}
                                  className="w-full"
                                ></audio>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </ul>
          )}
        </div>

        <div className="container mx-auto p-4">
          <div className="main-content relative mx-8 bg-gray-200 p-4">
            <div
              className="d-lex text-lg"
              style={{ fontSize: `${fontChu}px`, fontFamily: `${fontStyle}` }}
            >
              {chapter?.stt && (
                <h1 className="chapter-name text-xl font-bold mb-4">
                  CHƯƠNG {chapter.stt}: {chapter.tenChuong.toUpperCase()}
                </h1>
              )}
              {chapter?.muachuong == true ? (
                <div>
                  <div id="chapter-content">{renderNoiDung()}</div>
                  <div className="flex justify-center mt-4 space-x-4">
                    <button
                      className=" flex items-center space-x-2 hover:bg-[#e66700] bg-[#ff7300] text-white font-bold py-2 px-4 rounded"
                      onClick={() => handGiaodich(0)}
                    >
                      <span>{chapter?.giachuong}</span>
                      <img
                        className="w-6 h-6"
                        src="https://truyenyy-cdnx.yeuthanky.com/truyenyy/img/spirit-stone-green.png"
                        alt="anhXu"
                      />
                    </button>
                    <button
                      className="flex items-center space-x-2 hover:bg-[#e66700] bg-[#ff7300] text-white font-bold py-2 px-4 rounded"
                      onClick={() => handGiaodich(1)}
                    >
                      <span>1</span>
                      <img
                        className="w-6 h-6"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSksYmpp8joAcU6vmH8yHwdEvp5X3q6o02Uow&s"
                        alt="nganPhieu"
                      />
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ lineHeight: `${lineHeight}` }}>
                  <div id="chapter-content">{renderNoiDung()}</div>
                </div>
              )}
              <div className="mt-4">Số Like: {chapter?.solike || 0}</div>
            </div>
            <div className="w-full flex justify-between mt-4">
              {manual?.result?.data.data.trangTruoc ? (
                <Link
                  className="cursor-pointer"
                  to={`/truyen/${name}/${manual.result.data.data.trangTruoc}`}
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

              <div className="flex">
                <button
                  className="px-2 py-1 border border-orange-500 text-yellow-500 hover:text-yellow-600 mx-1"
                  onClick={() => handleReportClick(maChuong)}
                >
                  <i
                    style={{ fontSize: "25px" }}
                    className="fa-solid fa-flag"
                  ></i>
                </button>
                {likesChuong ? (
                  <button
                    className="px-2 py-1 border border-orange-500 text-red-500 mx-1"
                    onClick={() => handLike(1)}
                  >
                    <i style={{ fontSize: "25px" }} className="fa fa-heart"></i>
                  </button>
                ) : (
                  <button
                    className="px-2 py-1 border border-orange-500 mx-1"
                    onClick={() => handLike(0)}
                  >
                    <i style={{ fontSize: "25px" }} className="fa fa-heart"></i>
                  </button>
                )}
                <button
                  className="px-2 py-1 border border-orange-500 mx-1"
                  onClick={() => handGiaodich(2)}
                >
                  <img
                    style={{ width: "30px", height: "30px" }}
                    src="https://truyenyy-cdnx.yeuthanky.com/truyenyy/svg/tickets.svg"
                    alt="DeCu"
                  />
                </button>
                <button
                  className="px-2 py-1 border border-orange-500 mx-1"
                  onClick={showGiftModal}
                >
                  <i
                    style={{ fontSize: "25px", color: "blue" }}
                    className="fa fa-gift"
                  ></i>
                </button>
              </div>

              {manual?.result?.data.data.trangTiep ? (
                <Link
                  className="cursor-pointer"
                  to={`/truyen/${name}/${manual.result.data.data.trangTiep}`}
                >
                  <button className="px-5 py-1 bg-green-500">
                    <i className="fa fa-arrow-right" />
                  </button>
                </Link>
              ) : (
                <button className="px-5 py-1 bg-green-300" disabled>
                  <i className="fa fa-arrow-right" />
                </button>
              )}
            </div>
            <Modal
              title="Chọn số tiền quà"
              visible={giftModalVisible}
              onOk={handleGiftModalOk}
              onCancel={handleGiftModalCancel}
            >
              <Select
                value={selectedGiftAmount}
                onChange={(value) => setSelectedGiftAmount(value)}
                style={{ width: "100%" }}
              >
                <Option value={10}>10</Option>
                <Option value={20}>20</Option>
                <Option value={50}>50</Option>
                <Option value={100}>100</Option>
              </Select>
            </Modal>
            <BinhLuanSection id={chapter?.maTruyen} />
            <ReportForm
              visible={reportModalVisible}
              onCancel={() => setReportModalVisible(false)}
              maThucThe={maChuongTruyenBaoCao || null}
              LoaiBaoCao={5}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chapter;
