import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { pushFeedback } from '../../service/actions/FeedbackAction';

const Feedback = () => {
  const userInfo = useSelector(state => state.UserReducer.userInfo);

  const [feedback, setFeedback] = useState({
    NoiDung: '',
    Tieude: '',
    MaNguoiDung: Number, // initialized as null
    TrangThai: 0 // trạng thái mặc định
  });

  useEffect(() => {
    if (userInfo && userInfo.maNguoiDung) {
      setFeedback(prevFeedback => ({
        ...prevFeedback,
        MaNguoiDung: Number(userInfo.maNguoiDung) // set MaNguoiDung from userInfo and ensure it's a number
      }));
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await pushFeedback(feedback);
      message.success("Phản hồi đã được gửi thành công!");
    } catch (error) {
      message.error("Lỗi xảy ra khi gửi phản hồi.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 bg-gray-100 p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#F3EDED' }}>
      <h2 className="text-2xl font-bold mb-5 text-gray-800">Gửi Phản Hồi</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Tieude">
            Tiêu đề
          </label>
          <input 
            type="text"
            name="Tieude"
            id="Tieude"
            value={feedback.Tieude}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập tiêu đề phản hồi..."
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="NoiDung">
            Nội dung
          </label>
          <textarea 
            name="NoiDung"
            id="NoiDung"
            value={feedback.NoiDung}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nhập nội dung phản hồi..."
            required
          />
        </div>
        <input
          type="hidden"
          name="MaNguoiDung"
          value={feedback.MaNguoiDung}
        />
        <div className="flex items-center justify-between">
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Gửi
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
