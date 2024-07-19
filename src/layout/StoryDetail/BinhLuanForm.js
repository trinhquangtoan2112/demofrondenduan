import { useState } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";

const BinhLuanForm = ({ onAddBinhLuan }) => {
  const userInfo = useSelector((state) => state.UserReducer.userInfo);
  const [noiDung, setNoiDung] = useState("");

  const handleBinhluanSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      message.error("Hãy đăng nhập để bình luận");
      return;
    }
    await onAddBinhLuan(noiDung);
    setNoiDung("");
  };

  return (
    <form onSubmit={handleBinhluanSubmit} className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
      <h3 className="text-xl font-semibold mb-4">Bình luận</h3>
      <label className="block mb-4">
        <textarea
          value={noiDung}
          onChange={(e) => setNoiDung(e.target.value)}
          required
          rows="4"
          className="mt-1 block w-full rounded-md border-[#ff7300] shadow-sm focus:ring focus:ring-[#ff7300] focus:ring-opacity-50 border-2"
          placeholder="Nhập nội dung bình luận..."
        ></textarea>
      </label>
      <button
        type="submit"
        className="w-full  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Gửi bình luận
      </button>
    </form>
  );
};

export default BinhLuanForm;
