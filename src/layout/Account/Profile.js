import React, { useEffect, useState } from "react";
import avt from "../../assets/img/avt.png";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  CapNhapThongTin,
  ChinhSuaThongTinDangNhap,
  nangCapAction,
  napTienAction,
  sendEmail,
} from "../../service/actions/UserAction";
import { message, Modal } from "antd";
export default function Profile(props) {
  const { userInfo } = useSelector((state) => state.UserReducer);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    // userInfo?.image ||
    userInfo?.anhDaiDien
  );
  const [name, setName] = useState(userInfo.tenNguoiDung || "");
  const [sex, setSex] = useState(userInfo.gioiTinh || "");
  const [birthDate, setBirthDate] = useState(
    userInfo.ngaySinh ? dayjs(userInfo.ngaySinh).format("YYYY-MM-DD") : ""
  );
  // const loading = useSelector(state => state.message.loading)
  const [loadingUser, setLoadingUser] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserInfo = async () => {
      await CapNhapThongTin(dispatch); //load thông tin của user
      if (userInfo) {
        setName(userInfo?.tenNguoiDung);
        setBirthDate(
          userInfo.ngaySinh ? dayjs(userInfo.ngaySinh).format("YYYY-MM-DD") : ""
        );
        setPreview(userInfo?.anhDaiDien);
      }
    };
    loadUserInfo();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("maNguoiDung", userInfo.maNguoiDung);
    form.append("tenNguoiDung", name);
    form.append("ngaySinh", birthDate);
    form.append("gioiTinh", sex);
    form.append("anhDaiDien", image);

    ChinhSuaThongTinDangNhap(form, dispatch);
  };
  console.log(image);
  ///OnChange event
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeBirthDate = (e) => {
    //xử lý khi thay đổi ngày sinh
    console.log(e.target.value);
    try {
      setBirthDate(e.target.value);
    } catch (err) {
      setBirthDate(new Date());
    }
  };

  const napTien = async (e) => {
    e.preventDefault();

    Modal.confirm({
        title: "Xác nhận nạp tiền",
        content: "Bạn có muốn nạp 50 nghìn để nhận 500 xu không?",
        onOk: async () => {
            const data = {
                idUser: userInfo.maNguoiDung, 
            };
            const result = await napTienAction(data);
            if (result == false) {
                message.error("Lỗi xảy ra hãy thử lại");
            } else {
                console.log(1);
                window.open(result, "_blank");
            }
        },
    });
};


  const NangCap = async (e) => {
    e.preventDefault();

    if (userInfo.soXu < 500) {
      message.error("Bạn không đủ 500 xu để nâng cấp.");
      return;
    }

    Modal.confirm({
      title: "Xác nhận nâng cấp tài khoản",
      content: userInfo.vip
        ? "Bạn có muốn dùng 500 xu để gia hạn VIP thêm 30 ngày không?"
        : "Bạn có muốn dùng 500 xu để nâng cấp tài khoản của mình lên VIP trong 30 ngày không?",
      onOk: async () => {
        const data = { id: userInfo.maNguoiDung };
        const result = await nangCapAction(data, dispatch);
        if (result === false) {
          message.error("Lỗi xảy ra, xin hãy kiểm tra lại");
        } else {
          message.success("Nâng cấp tài khoản thành công");
        }
      },
    });
  };

  const sendEmailToAuthen = (e) => {
    e.preventDefault();
    sendEmail();
  };

  const onChangeImage = (e) => {
    //xử lý chọn ảnh

    if (e.target.files.lenght !== 0) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  //style
  const labelStyle = { minWidth: "100px", display: "inline-block" };
  return (
    <div className="profile__wrap flex flex-col lg:flex-row p-4 bg-gray-100 rounded-lg shadow-lg">
      {userInfo ? (
        <>
          <div className="profile__avt w-full lg:w-1/2 flex flex-col items-center mb-4 lg:mb-0 p-4 bg-white rounded-lg shadow-md">
            {preview ? (
              <img
                src={preview}
                alt="anhDaiDien"
                className="w-32 h-32 rounded-full border-2 border-gray-300"
              />
            ) : (
              <i className="fa-solid fa-user text-4xl"></i>
            )}
            <input
              type="file"
              accept="image/*"
              name="avatar"
              onChange={onChangeImage}
              className="mt-4"
            />
          </div>
          <div className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
            <div className="profile__main">
              <form style={{ padding: "10px" }}>
                <div className="group-info mb-4">
                  <label
                    htmlFor=""
                    className="min-w-[100px] inline-block font-semibold"
                  >
                    Tên người dùng
                  </label>
                  <input
                    style={{ borderColor: "gray" }}
                    onChange={onChangeName}
                    value={name}
                    className="border"
                  />
                </div>
                <div className="group-info mb-4">
                  <label
                    htmlFor=""
                    className="min-w-[100px] inline-block font-semibold"
                  >
                    Giới tính
                  </label>
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="border"
                    style={{ borderColor: "gray" }}
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
                <div className="group-info mb-4">
                  <p className="font-semibold">
                    {userInfo.vip ? "Vip" : "Chưa kích hoạt vip"}
                  </p>
                  <p>
                    {userInfo.vip
                      ? `Ngày hết hạn vip: ${dayjs(
                          userInfo.ngayHetHanVip
                        ).format("DD/MM/YYYY")}`
                      : "Kích hoạt vip để tận hưởng các chức năng của trang web"}
                  </p>
                </div>
                <div className="group-info mb-4">
                  <label
                    htmlFor=""
                    className="min-w-[100px] inline-block font-semibold"
                  >
                    Tiền tệ
                  </label>
                  <div className="flex flex-row text-center">
                    <div className="w-4/12">
                      <p className="font-semibold">Tiền xu</p>
                      <p className="flex flex-row items-center justify-center">
                        <img
                          style={{ width: "30px" }}
                          src="https://truyenyy-cdnx.yeuthanky.com/truyenyy/img/spirit-stone-green.png"
                          alt="anhXu"
                        />
                        <span>{userInfo.soXu || 0}</span>
                      </p>
                    </div>
                    <div className="w-4/12">
                      <p className="font-semibold">Số chìa khóa</p>
                      <p className="flex flex-row items-center justify-center">
                        <img
                          style={{ width: "30px" }}
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSksYmpp8joAcU6vmH8yHwdEvp5X3q6o02Uow&s"
                          alt="nganPhieu"
                        />
                        <span>{userInfo.soChiaKhoa || 0}</span>
                      </p>
                    </div>
                    <div className="w-4/12">
                      <p className="font-semibold">Số đề cử</p>
                      <p className="flex flex-row items-center justify-center">
                        <img
                          style={{ width: "30px" }}
                          src="https://truyenyy-cdnx.yeuthanky.com/truyenyy/svg/tickets.svg"
                          alt="DeCu"
                        />
                        <span>{userInfo.soDeCu || 0}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group-info mb-4">
                  <label
                    htmlFor=""
                    className="min-w-[100px] inline-block font-semibold"
                  >
                    Ngày sinh
                  </label>
                  <input
                    onChange={onChangeBirthDate}
                    type="date"
                    value={birthDate}
                    className="border "
                    style={{borderColor: "gray" }}
                  />
                </div>
                <div className="group-info mb-4">
                  <label
                    htmlFor=""
                    className="min-w-[100px] inline-block font-semibold"
                  >
                    Trạng thái của tài khoản
                  </label>
                  {userInfo.trangThai === 0 ? (
                    <button
                      className="btn bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                      onClick={sendEmailToAuthen}
                    >
                      Xác thực tài khoản
                    </button>
                  ) : (
                    <p className="text-green-600">Đã xác thực tài khoản</p>
                  )}
                </div>
                <div className="flex flex-wrap justify-between mb-4">
                  <div className="mb-4 lg:mb-0">
                    <button
                      onClick={napTien}
                      className="btn bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                    >
                      Nạp tiền
                    </button>
                  </div>
                  <div className="mb-4 lg:mb-0">
                    <button
                      onClick={NangCap}
                      className="btn bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                    >
                      Nâng cấp
                    </button>
                    
                  </div>
                  <div>
                    <button
                      onClick={handleEdit}
                      className="btn bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-lg font-semibold">
          Xin hãy đăng nhập tài khoản
        </p>
      )}
    </div>
  );
}
