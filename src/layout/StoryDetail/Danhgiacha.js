import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { layDSDanhGia, DsDanhGiaChuaDangNhap, checkDanhgia, themdanhgiatruyen } from "../../service/actions/DanhGiaAction";
import RateForm from "./RateForm";
import DSDanhGia from "./DSDanhGia";

const DanhGiaPage = () => {
  const { id } = useParams();
  const userInfo = useSelector((state) => state.UserReducer.userInfo);
  const [danhSachDanhGia, setDanhSachDanhGia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRated, setIsRated] = useState(false);

  const fetchData = async () => {
    try {
      const response = userInfo
        ? await layDSDanhGia({ maTruyen: id })
        : await DsDanhGiaChuaDangNhap({ maTruyen: id });

      if (userInfo) {
        const result = await checkDanhgia({ maTruyen: id });
        setIsRated(result.data);
      }

      setDanhSachDanhGia(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      message.error(`Failed to fetch reviews: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, userInfo]);

  const handleRateSubmit = async (data) => {
    try {
      await themdanhgiatruyen(data);
      await fetchData();
    } catch (error) {
      console.error("Error:", error);
      message.error("Gửi đánh giá thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {!isRated && (
        <RateForm onSubmit={handleRateSubmit} />
      )}
      <DSDanhGia
        danhSachDanhGia={danhSachDanhGia}
        loading={loading}
        fetchData={fetchData}
      />
    </div>
  );
};

export default DanhGiaPage;
