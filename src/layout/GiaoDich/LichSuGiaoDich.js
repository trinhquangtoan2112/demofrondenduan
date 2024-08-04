import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import { dsGiaodichNguoiDung } from "../../service/actions/GiaoDichAction";
import dayjs from "dayjs";
import 'dayjs/locale/vi'; // Ensure you import the correct locale

dayjs.locale('vi'); // Set locale to Vietnamese

const transactionTypeMap = {
  1: "Mua chương",
  2: "Nạp tiền",
  3: "Nâng cấp tài khoản",
  4: "Đề cử",
  5: "Tặng quà",
  6: "Điểm danh",
};

const LichSuGiaoDich = () => {
  const [giaodiches, setGiaodich] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state) => state.UserReducer.userInfo);

  useEffect(() => {
    if (!userInfo) {
      message.warning("Bạn chưa đăng nhập. Vui lòng đăng nhập để vào trang.");
    } else {
      fetchData();
    }
  }, [userInfo]);

  const fetchData = async () => {
    try {
      const response = await dsGiaodichNguoiDung();
      if (response.status === 200) {
        setGiaodich(response.data);
      } else {
        message.error("Lấy dữ liệu thất bại");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Lỗi khi lấy dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Lịch Sử Giao Dịch</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="p-3 border-b">Mã Giao Dịch</th>
              <th className="p-3 border-b">Thời Gian</th>
              <th className="p-3 border-b">Nội Dung</th>
              <th className="p-3 border-b">Loại Giao Dịch</th>
            </tr>
          </thead>
          <tbody>
            {giaodiches.map((item) => (
              <tr key={item.maGiaoDich} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="p-3 border-b">{item.maGiaoDich}</td>
                <td className="p-3 border-b">{dayjs(item.ngaytao).format("DD/MM/YYYY HH:mm")}</td>
                <td className="p-3 border-b">{item.noiDung}</td>
                <td className="p-3 border-b">{transactionTypeMap[item.loaiGiaoDich] || "Không xác định"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LichSuGiaoDich;
