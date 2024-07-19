import { useState } from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const RateForm = ({ onSubmit }) => {
  const { id } = useParams();
  const userInfo = useSelector((state) => state.UserReducer.userInfo);
  const [diemDanhGia, setDiemDanhGia] = useState(5);
  const [hover, setHover] = useState(null);
  const [noiDung, setNoiDung] = useState("");

  const handleRateSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      message.error("Hãy đăng nhập để đánh giá");
      return;
    }
    const data = {
      diemDanhGia,
      noiDung,
      maTruyen: id,
    };
    onSubmit(data);
  };

  return (
    <div>
        <form
          onSubmit={handleRateSubmit}
          className="rate-form bg-white shadow-md rounded-lg p-6 border border-gray-300"
        >
          <>
            <h3 className="text-xl font-semibold mb-4">Đánh giá</h3>
            <div className="mb-4">
              <span className="text-gray-700">Điểm đánh giá:</span>
              <div className="flex mt-1">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setDiemDanhGia(ratingValue)}
                        checked={ratingValue === diemDanhGia}
                        className="hidden"
                      />
                      <i
                        className={`fa-solid fa-star text-3xl cursor-pointer transition transform duration-200 ${
                          ratingValue <= (hover || diemDanhGia)
                            ? "text-yellow-400 scale-125"
                            : "text-gray-300"
                        }`}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => setDiemDanhGia(ratingValue)}
                      ></i>
                    </label>
                  );
                })}
              </div>
            </div>
            <label className="block mb-4">
              <span className="text-gray-700">Nội dung:</span>
              <textarea
                value={noiDung}
                onChange={(e) => setNoiDung(e.target.value)}
                required
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border-2"
              ></textarea>
            </label>
            <button
              type="submit"
              className="w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Gửi đánh giá
            </button>
          </>
        </form>
    </div>
  );
};

export default RateForm;
