import React, { useState, useEffect } from "react";
import {
  themPhanHoiBinhLuan,
  xoaPhanHoiBinhLuan,
  xoaBinhLuan,
  suaBinhLuan,
  suaPhanHoiBinhLuan,
} from "../../service/actions/BinhLuanAction";
import { message, Modal } from "antd";
import { useSelector } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ReportForm from "../BaoCao/ReportForm.js";
import {
  themlike,
  xoalike,
  checklike,
} from "../../service/actions/LikeAction.js";

const { confirm } = Modal;

const formatTimeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} tháng trước`;
  } else if (days > 0) {
    return `${days} ngày trước`;
  } else if (hours > 0) {
    return `${hours} giờ trước`;
  } else if (minutes > 0) {
    return `${minutes} phút trước`;
  } else {
    return `Vừa xong`;
  }
};

const DanhSachBinhLuan = ({ binhLuans, visibleCount, onReplyAdded,setBinhLuans }) => {
  const [openReplies, setOpenReplies] = useState({});
  const [replyContent, setReplyContent] = useState({});
  const [sortCriteria, setSortCriteria] = useState("latest");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState(null); // "binhLuan" hoặc "phanHoi"
  const userInfo = useSelector((state) => state.UserReducer.userInfo);
  const [maBinhLuanBaoCao, setReportingBinhLuan] = useState(null);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportType, setReportType] = useState(null);
  const [likesBinhLuan, setLikesBinhluan] = useState({});
  const [likesPhanHoiBinhLuan, setLikesPhanHoiBinhluan] = useState({});

  useEffect(() => {
    if (!userInfo) {
      console.log("Chưa đăng nhập nên không thể like được");
    } else {
      const checkLike = async () => {
        try {
          const maThucThes = binhLuans.map((binhLuan) => binhLuan.maBinhLuan); // Lấy danh sách mã bình luận
          const maPhanHoiBinhLuans = binhLuans.flatMap((binhLuan) =>
            binhLuan.dsPhBinhLuan.map(
              (phbinhluan) => phbinhluan.maPhanHoiBinhLuan
            )
          );

          const maid = {
            loaiThucTheLike: 3,
            maThucThes: maThucThes, // Truyền danh sách mã bình luận vào đây
          };
          const maid2 = {
            loaiThucTheLike: 4,
            maThucThes: maPhanHoiBinhLuans, // Truyền danh sách mã phản hồi vào đây
          };

          const result = await checklike(maid);
          const result2 = await checklike(maid2);

          const likesMap = {};
          const likesMap2 = {};

          if (result) {
            // Create a map of maBinhLuan to like status
            binhLuans.forEach((binhLuan) => {
              likesMap[binhLuan.maBinhLuan] =
                result[binhLuan.maBinhLuan] || false;
            });
          }

          if (result2) {
            // Create a map of maPhanHoiBinhLuan to like status
            binhLuans.forEach((binhLuan) => {
              binhLuan.dsPhBinhLuan.forEach((phbinhluan) => {
                likesMap2[phbinhluan.maPhanHoiBinhLuan] =
                  result2[phbinhluan.maPhanHoiBinhLuan] || false;
              });
            });
          }

          setLikesBinhluan(likesMap);
          setLikesPhanHoiBinhluan(likesMap2);
        } catch (error) {
          console.error("Error checking like:", error);
        }
      };
      checkLike();
    }
  }, [userInfo, binhLuans]); // Thêm danhSachDanhGia vào dependency array

  const toggleReplies = (maBinhLuan) => {
    setOpenReplies((prevState) => ({
      ...prevState,
      [maBinhLuan]: !prevState[maBinhLuan],
    }));
  };

  const handleReplyChange = (e, maBinhLuan) => {
    setReplyContent((prevState) => ({
      ...prevState,
      [maBinhLuan]: e.target.value,
    }));
  };

  const handleAddReply = async (maBinhLuan) => {
    if (!replyContent[maBinhLuan]?.trim()) {
      message.error("Phản hồi không được rỗng.");
      return;
    }

    const data = {
      noidung: replyContent[maBinhLuan],
      maBinhLuan,
    };

    try {
      if (!userInfo) {
        message.error("Hãy đăng nhập để bình luận");
        return;
      }
      await themPhanHoiBinhLuan(data);
      setReplyContent((prevState) => ({
        ...prevState,
        [maBinhLuan]: "",
      }));
      onReplyAdded();
    } catch (error) {
      console.error("Error:", error);
      message.error("Phản hồi bình luận thất bại. Vui lòng thử lại.");
    }
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleDeleteBinhLuan = async (maBinhLuan, number) => {
    confirm({
      title: "Xác nhận xóa bình luận?",
      icon: <ExclamationCircleOutlined />,
      okText: "Xóa",
      cancelText: "Hủy",
      async onOk() {
        if (number === 1) {
          try {
            await xoaBinhLuan(maBinhLuan);
            onReplyAdded();
          } catch (error) {
            console.error("Error deleting review:", error);
            message.error(`Xóa bình luận thất bại: ${error.message}`);
          }
        }
        if (number === 2) {
          try {
            await xoaPhanHoiBinhLuan(maBinhLuan);
            onReplyAdded();
          } catch (error) {
            console.error("Error deleting reply:", error);
            message.error(`Xóa phản hồi thất bại: ${error.message}`);
          }
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleEditClick = (id, type, content) => {
    setEditId(id);
    setEditType(type);
    setEditContent(content);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditContent(e.target.value);
  };

  const handleEditSave = async () => {
    try {
      if (editType === "binhLuan") {
        await suaBinhLuan({
          maBinhLuan: editId,
          noidung: editContent,
        });
      } else if (editType === "phanHoi") {
        await suaPhanHoiBinhLuan({
          maPhanHoiBinhLuan: editId,
          noidung: editContent,
        });
      }
      setIsEditing(false);
      onReplyAdded();
    } catch (error) {
      console.error("Error updating:", error);
      message.error("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  const handleReportClick = (maBinhLuan, loaiBaoCao) => {
    if (userInfo) {
      setReportingBinhLuan(maBinhLuan);
      setReportType(loaiBaoCao);
      setReportModalVisible(true);
    } else {
      message.success("Hãy đăng nhập để báo cáo nội dung này");
    }
  };

  const handLike = async (maBinhLuan, number, loaibinhluan) => {
    if (!userInfo) {
      message.success("Hãy đăng nhập để like bình luận");
      return;
    }
    if (loaibinhluan == 0) {
      const maid = {
        loaiThucTheLike: 3,
        maThucThe: maBinhLuan,
      };

      try {
        if (number == 0) {
          await themlike(maid);
          setLikesBinhluan((prevLikes) => ({
            ...prevLikes,
            [maBinhLuan]: true, // Set like status for this review
          }));
          setBinhLuans((prevBinhLuans) =>
            prevBinhLuans.map((binhLuan) =>
              binhLuan.maBinhLuan == maBinhLuan
                ? { ...binhLuan, solike: (binhLuan.solike || 0) + 1 }
                : binhLuan
            )
          );
        } else if (number == 1) {
          await xoalike(maid);
          setLikesBinhluan((prevLikes) => ({
            ...prevLikes,
            [maBinhLuan]: false, // Remove like status for this review
          }));
          setBinhLuans((prevBinhLuans) =>
            prevBinhLuans.map((binhLuan) =>
              binhLuan.maBinhLuan == maBinhLuan
                ? { ...binhLuan, solike: Math.max((binhLuan.solike || 0) - 1, 0) }
                : binhLuan
            )
          );
        } else {
          console.error("Invalid number value:", number);
          message.error("Invalid like action.");
        }
      } catch (error) {
        console.error("Error updating like status:", error);
        message.error("Failed to update like status.");
      }
    }
    if (loaibinhluan == 1) {
      const maid = {
        loaiThucTheLike: 4,
        maThucThe: maBinhLuan,
      };

      try {
        if (number == 0) {
          await themlike(maid);
          setLikesPhanHoiBinhluan((prevLikes) => ({
            ...prevLikes,
            [maBinhLuan]: true, // Set like status for this review
          }));
        } else if (number == 1) {
          await xoalike(maid);
          setLikesPhanHoiBinhluan((prevLikes) => ({
            ...prevLikes,
            [maBinhLuan]: false, // Remove like status for this review
          }));
        } else {
          console.error("Invalid number value:", number);
          message.error("Invalid like action.");
        }
      } catch (error) {
        console.error("Error updating like status:", error);
        message.error("Failed to update like status.");
      }
    }
  };

  const sortedBinhLuans = [...binhLuans].sort((a, b) => {
    switch (sortCriteria) {
      case "oldest":
        return new Date(a.ngayCapNhap) - new Date(b.ngayCapNhap);
      case "mostReplies":
        return b.dsPhBinhLuan.length - a.dsPhBinhLuan.length;
      case "latest":
      default:
        return new Date(b.ngayCapNhap) - new Date(a.ngayCapNhap);
    }
  });

  return (
    <div className="bg-transparent shadow-lg rounded-lg p-6 border border-gray-300 m-4">
      <h3 className="text-2xl font-semibold mb-4">Danh sách bình luận</h3>
      <div className="mb-4 flex items-center">
        <select
          id="sort"
          value={sortCriteria}
          onChange={handleSortChange}
          className="block w-full rounded-md border-[#ff7300] shadow-sm focus:ring focus:ring-[#ff7300] focus:ring-opacity-50 border-2"
        >
          <option value="latest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="mostReplies">Lượt trả lời</option>
        </select>
      </div>
      {sortedBinhLuans.slice(0, visibleCount).map((binhLuan) => (
        <div
          key={binhLuan.maBinhLuan}
          className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md flex flex-col"
        >
          <div className="flex items-start mb-4">
            <img
              src={binhLuan.anhDaiDien}
              alt="Avatar"
              className="w-12 h-12 rounded-full mr-3 shadow-md"
            />
            <div className="flex-1">
              <p className="font-bold text-lg">{binhLuan.tenNguoiDung}</p>
              <p className="text-gray-500 text-sm">
                {formatTimeAgo(binhLuan.ngayCapNhap)}
              </p>
            </div>
            <div className="ml-4 flex items-center">
              <div className="flex space-x-2">
                {binhLuan.checkCuaToi === true && (
                  <button
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() =>
                      handleEditClick(
                        binhLuan.maBinhLuan,
                        "binhLuan",
                        binhLuan.noidung
                      )
                    }
                  >
                    <i className="fa-solid fa-edit"></i>
                  </button>
                )}
                {(userInfo?.maQuyen === 1 || binhLuan.checkCuaToi === true) && (
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDeleteBinhLuan(binhLuan.maBinhLuan, 1)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
                <button
                  className="text-yellow-500 hover:text-yellow-600"
                  onClick={() => handleReportClick(binhLuan.maBinhLuan, 2)}
                >
                  <i className="fa-solid fa-flag"></i>
                </button>
              </div>
            </div>
          </div>
          <p className="mb-4">{binhLuan.noidung}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div>{binhLuan.solike || 0}</div>
              {likesBinhLuan[binhLuan.maBinhLuan] ? (
                <button
                  style={{ minWidth: "10px", color: "red" }}
                  onClick={() => handLike(binhLuan.maBinhLuan, 1, 0)}
                >
                  <i className="fa fa-heart"></i>
                </button>
              ) : (
                <button
                  style={{ minWidth: "10px" }}
                  onClick={() => handLike(binhLuan.maBinhLuan, 0, 0)}
                >
                  <i className="fa fa-heart"></i>
                </button>
              )}
            </div>

            <button
              onClick={() => toggleReplies(binhLuan.maBinhLuan)}
              className="text-[#ff7300] hover:text-[#ff4800] text-sm font-semibold"
            >
              {openReplies[binhLuan.maBinhLuan]
                ? "Ẩn phản hồi"
                : `Hiển thị phản hồi (${binhLuan.dsPhBinhLuan.length})`}
            </button>
            <div></div>
          </div>

          {openReplies[binhLuan.maBinhLuan] && (
            <div className="mt-4 bg-white rounded-lg shadow p-4">
              <div className="mb-4">
                <textarea
                  value={replyContent[binhLuan.maBinhLuan] || ""}
                  onChange={(e) => handleReplyChange(e, binhLuan.maBinhLuan)}
                  placeholder="Nhập phản hồi của bạn"
                  className="block w-full rounded-md border-[#ff7300] shadow-sm focus:ring focus:ring-[#ff7300] focus:ring-opacity-50 border-2"
                />
                <button
                  onClick={() => handleAddReply(binhLuan.maBinhLuan)}
                  className="mt-2 py-2 px-4 bg-[#ff7300] hover:bg-[#ff4800] text-white font-semibold rounded-lg shadow-md"
                >
                  Thêm phản hồi
                </button>
              </div>
              {binhLuan.dsPhBinhLuan.map((phanHoi) => (
                <div
                  key={phanHoi.maPhanHoiBinhLuan}
                  className="p-4 border-t border-gray-300"
                >
                  <div className="flex items-start mb-4">
                    <img
                      src={phanHoi.anhDaiDien}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full mr-3 shadow-md"
                    />
                    <div className="flex-1">
                      <p className="font-bold">{phanHoi.tenNguoiDung}</p>
                      <p className="text-gray-500 text-sm">
                        {formatTimeAgo(phanHoi.ngayCapNhap)}
                      </p>
                      <p className="mt-2">{phanHoi.noidung}</p>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <div>{phanHoi.solike}</div>
                        {likesPhanHoiBinhLuan[phanHoi.maPhanHoiBinhLuan] ? (
                          <button
                            style={{ minWidth: "10px", color: "red" }}
                            onClick={() =>
                              handLike(phanHoi.maPhanHoiBinhLuan, 1, 1)
                            }
                          >
                            <i className="fa fa-heart"></i>
                          </button>
                        ) : (
                          <button
                            style={{ minWidth: "10px" }}
                            onClick={() =>
                              handLike(phanHoi.maPhanHoiBinhLuan, 0, 1)
                            }
                          >
                            <i className="fa fa-heart"></i>
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex items-center">
                      <div className="flex space-x-2">
                        {(userInfo?.maQuyen === 1 ||
                          phanHoi.checkCuaToi === true) && (
                          <div className="flex space-x-2">
                            <button
                              className="text-blue-500 hover:text-blue-600"
                              onClick={() =>
                                handleEditClick(
                                  phanHoi.maPhanHoiBinhLuan,
                                  "phanHoi",
                                  phanHoi.noidung
                                )
                              }
                            >
                              <i className="fa-solid fa-edit"></i>
                            </button>

                            <button
                              className="text-red-500 hover:text-red-600"
                              onClick={() =>
                                handleDeleteBinhLuan(
                                  phanHoi.maPhanHoiBinhLuan,
                                  2
                                )
                              }
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        )}
                        <button
                          className="text-yellow-500 hover:text-yellow-600"
                          onClick={() =>
                            handleReportClick(phanHoi.maPhanHoiBinhLuan, 3)
                          }
                        >
                          <i className="fa-solid fa-flag"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <Modal
        title="Sửa nội dung"
        visible={isEditing}
        onOk={handleEditSave}
        onCancel={() => setIsEditing(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <textarea
          value={editContent}
          onChange={handleEditChange}
          className="block w-full rounded-md border-[#ff7300] shadow-sm focus:ring focus:ring-[#ff7300] focus:ring-opacity-50 border-2"
          rows={4}
        />
      </Modal>

      <ReportForm
        visible={reportModalVisible}
        onCancel={() => setReportModalVisible(false)}
        maThucThe={maBinhLuanBaoCao ? maBinhLuanBaoCao : null}
        LoaiBaoCao={reportType}
      />
    </div>
  );
};

export default DanhSachBinhLuan;
