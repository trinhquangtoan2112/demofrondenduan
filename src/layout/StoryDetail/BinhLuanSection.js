import { useState, useEffect } from "react";
import {
  layDSBinhLuanChuaDangNhap,
  themBinhLuan,
  layDSBinhLuanDaDangNhap,
} from "../../service/actions/BinhLuanAction";
import { message } from "antd";
import { useParams } from "react-router-dom";
import BinhLuanForm from "./BinhLuanForm";
import DanhSachBinhLuan from "./DanhSachBinhLuan";
import { useSelector } from "react-redux";

const BinhLuanSection = () => {
  const { id } = useParams();
  const [binhLuans, setBinhLuans] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const userInfo = useSelector((state) => state.UserReducer.userInfo);

  useEffect(() => {
    const fetchBinhLuans = async () => {
      try {
        if (userInfo) {
          const response = await layDSBinhLuanDaDangNhap({ maTruyen: id });
          if (response.status === 200) {
            setBinhLuans(response.data);
          } else {
            message.error("Lấy danh sách bình luận thất bại.");
          }
        } else {
          const response = await layDSBinhLuanChuaDangNhap({ maTruyen: id });
          if (response.status === 200) {
            setBinhLuans(response.data);
          } else {
            message.error("Lấy danh sách bình luận thất bại.");
          }
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        message.error("Có lỗi xảy ra khi lấy danh sách bình luận.");
      }
    };

    fetchBinhLuans();
  }, [id]);

  const handleAddBinhLuan = async (noiDung) => {
    const data = {
      noiDung,
      maTruyen: id,
    };
    try {
      await themBinhLuan(data);
      // Gọi lại API để lấy danh sách bình luận mới nhất
      if (userInfo) {
        const response = await layDSBinhLuanDaDangNhap({ maTruyen: id });
        if (response.status === 200) {
          setBinhLuans(response.data);
        } else {
          message.error("Lấy danh sách bình luận thất bại.");
        }
      } else {
        const response = await layDSBinhLuanChuaDangNhap({ maTruyen: id });
        if (response.status === 200) {
          setBinhLuans(response.data);
        } else {
          message.error("Lấy danh sách bình luận thất bại.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Bình luận thất bại. Vui lòng thử lại.");
    }
  };

  const handleReplyAdded = async () => {
    const response = await layDSBinhLuanDaDangNhap({ maTruyen: id });
    if (response.status === 200) {
      setBinhLuans(response.data);
    } else {
      message.error("Lấy danh sách bình luận thất bại.");
    }
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <div className="container mx-auto my-8">
      <BinhLuanForm onAddBinhLuan={handleAddBinhLuan} />
      <DanhSachBinhLuan
        binhLuans={binhLuans}
        visibleCount={visibleCount}
        onReplyAdded={handleReplyAdded}
      />
      {visibleCount < binhLuans.length && (
        <div className="text-center mt-4">
          <button
            onClick={handleShowMore}
            className="w-full hover:bg-[#e66700] bg-[#ff7300]  text-white font-bold py-2 px-4 rounded"
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default BinhLuanSection;
