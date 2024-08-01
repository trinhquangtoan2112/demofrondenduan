import React, { useEffect, useState } from 'react'
import avt from '../../assets/img/avt.png'
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { CapNhapThongTin, ChinhSuaThongTinDangNhap, nangCapAction, napTienAction, sendEmail } from '../../service/actions/UserAction';
import { message, Modal } from 'antd';
export default function Profile(props) {
    const { userInfo } = useSelector(state => state.UserReducer);

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(
        // userInfo?.image || 
        userInfo?.anhDaiDien)
    const [name, setName] = useState(
        userInfo.tenNguoiDung || ""
    );
    const [sex, setSex] = useState(
        userInfo.gioiTinh || ""
    )
    const [birthDate, setBirthDate] = useState(userInfo.ngaySinh ? dayjs(userInfo.ngaySinh).format('YYYY-MM-DD') : '');
    // const loading = useSelector(state => state.message.loading)
    const [loadingUser, setLoadingUser] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const loadUserInfo = async () => {
            await CapNhapThongTin(dispatch)//load thông tin của user
            if (userInfo) {
                setName(userInfo?.tenNguoiDung)
                setBirthDate(userInfo.ngaySinh ? dayjs(userInfo.ngaySinh).format('YYYY-MM-DD') : '')
                setPreview(userInfo?.anhDaiDien)
            }
        }
        loadUserInfo();

    }, [])

    const handleEdit = async (e) => {
        e.preventDefault()


        const form = new FormData();
        form.append('maNguoiDung', userInfo.maNguoiDung);
        form.append('tenNguoiDung', name);
        form.append('ngaySinh', birthDate);
        form.append('gioiTinh', sex);
        form.append('anhDaiDien', image);

        ChinhSuaThongTinDangNhap(form, dispatch);
    }
    console.log(image)
    ///OnChange event
    const onChangeName = (e) => {

        setName(e.target.value)
    }
    const onChangeBirthDate = (e) => {//xử lý khi thay đổi ngày sinh
        console.log(e.target.value)
        try {

            setBirthDate(e.target.value)


        }
        catch (err) {
            setBirthDate(new Date())
        }

    }

    const napTien = async (e) => {
        e.preventDefault();
        const data = {
            idUser: userInfo.maNguoiDung
        }
        const result = await napTienAction(data);
        if (result == false) {
            message.error("Lỗi xảy ra hãy thử lại")
        } else {
            console.log(1)
            window.open(result, '_blank');
        }
        console.log(result)
    }


    const NangCap = async (e) => {
        e.preventDefault();
    
        if (userInfo.soXu < 500) {
            message.error("Bạn không đủ 500 xu để nâng cấp.");
            return;
        }
    
        Modal.confirm({
            title: 'Xác nhận nâng cấp tài khoản',
            content: userInfo.vip 
                ? 'Bạn có muốn dùng 500 xu để gia hạn VIP thêm 30 ngày không?'
                : 'Bạn có muốn dùng 500 xu để nâng cấp tài khoản của mình lên VIP trong 30 ngày không?',
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
        sendEmail()
    }

    const onChangeImage = (e) => {//xử lý chọn ảnh

        if (e.target.files.lenght !== 0) {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    //style
    const labelStyle = { 'minWidth': '100px', 'display': 'inline-block' }
    return (
        <>
            {/* {
                loadingUser ? <LoadingData />
                    : */}
            <div className="profile__wrap d-flex">
                {userInfo ? <>
                    <div className="col-5 profile__avt">
                        {
                            preview ? <img src={preview} alt="anhDaiDien" />
                                : <i style={{ marginRight: 4 + 'px' }} className="fa-solid fa-user"></i>
                        }
                        <input type={"file"} accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" name={"avatar"}
                            onChange={onChangeImage}
                        />
                        <button
                        // onClick={upload}
                        >Upload</button>
                    </div>
                    <div className="col-7 ">
                        <div className="profile__main">
                            <form>
                                <div className="group-info">
                                    <label htmlFor="" style={labelStyle}>Tên người dùng</label>
                                    <input
                                        onChange={onChangeName}
                                        value={name || ""} defaultValue={userInfo.tenNguoiDung} />
                                </div>
                                <div className="group-info">
                                    <label htmlFor="" style={labelStyle}>Giới tính</label>
                                    <select value={sex} defaultValue={"Nam"} onChange={(e) => {
                                        setSex(e.target.value)

                                    }}>
                                        <option value={"Nam"}>Nam</option>
                                        <option value={"Nữ"}>Nữ</option>
                                    </select>

                                </div>
                                <div className="group-info">
                                    <p>{userInfo.vip ? "Vip" : "Chưa kích hoạt vip"}</p>
                                    <p>{userInfo.vip ? `Ngày hết hạn vip: ${dayjs(userInfo.ngayHetHanVip).format("DD/MM/YYYY")} ` : "Kích hoạt vip để tận hưởng các chức năng của trang web"}</p>
                                </div>
                                <div className="group-info">
                                    <label htmlFor="" style={labelStyle}>Tiền tệ</label>
                                    <div className='flex flex-row text-center '>
                                        <div className='w-4/12'>
                                            <p>Tiền xu</p>
                                            <p className='flex flex-row items-center justify-center'><img style={{ width: "30px" }} src='https://truyenyy-cdnx.yeuthanky.com/truyenyy/img/spirit-stone-green.png' alt='anhXu'></img><span>{userInfo.soXu ? userInfo.soXu : 0}</span></p>
                                        </div>
                                        <div className='w-4/12'>
                                            <p>Số chìa khóa</p>
                                            <p className='flex flex-row items-center justify-center'><img style={{ width: "30px" }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSksYmpp8joAcU6vmH8yHwdEvp5X3q6o02Uow&s' alt='nganPhieu'></img><span>{userInfo.soChiaKhoa ? userInfo.soChiaKhoa : 0}</span></p>
                                        </div>
                                        <div className='w-4/12'>
                                            <p>Số đề cử</p>
                                            <p className='flex flex-row items-center justify-center'><img style={{ width: "30px" }} src='https://truyenyy-cdnx.yeuthanky.com/truyenyy/svg/tickets.svg' alt='DeCu'></img><span>
                                                {userInfo.soDeCu ? userInfo.soDeCu : 0}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="group-info">
                                    <label htmlFor="" style={labelStyle}>Ngày sinh</label>
                                    <input
                                        onChange={onChangeBirthDate}
                                        type="date" id="birthday" name="birthday"
                                        value={birthDate} defaultValue={birthDate}></input>
                                </div>
                                <div className="group-info">
                                    <label htmlFor="" style={labelStyle}>Trạng thái của tài khoản</label>
                                    {userInfo.trangThai == 0 ? <button className='btn bg-red-600' onClick={sendEmailToAuthen}>Xác thực tài khoản</button> : <p className='text-green-600'>Đã xác thực tài khoản</p>}
                                </div>

                                <div className="d-flex justify-between">
                                    <div>
                                        <p>Nạp 50000 đồng để thêm 500 xu vào tài khoản</p>
                                        <button onClick={napTien}>Nạp tiền</button>
                                    </div>
                                    <div>
                                        <p>Nâng cấp tài khoản</p>
                                        <button onClick={NangCap}>Nâng cấp</button>
                                    </div>

                                </div>
                                <div className="d-flex justify-between">
                                    <button
                                        onClick={handleEdit}
                                    >
                                        Cập nhật</button>

                                </div>

                            </form>

                        </div>
                    </div></> : <p>Xin hãy đăng nhập tài khoản</p>
                }

            </div >
        </>

    )
}
