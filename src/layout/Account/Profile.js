import React, { useEffect, useState } from 'react'
import avt from '../../assets/img/avt.png'
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { ChinhSuaThongTinDangNhap, sendEmail } from '../../service/actions/UserAction';
export default function Profile(props) {
    const { userInfo } = useSelector(state => state.UserReducer);

    const [image, setImage] = useState(userInfo?.anhDaiDien);
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
        const loadUserInfo = async () => {//load thông tin của user
            if (userInfo) {
                setName(userInfo?.tenNguoiDung)
                setBirthDate(userInfo.ngaySinh ? dayjs(userInfo.ngaySinh).format('YYYY-MM-DD') : '')
                setPreview(userInfo?.anhDaiDien)
            }
        }
        loadUserInfo();
    }, [])

    // const upload = async () => { //upload ảnh lên firebase
    //     if (image == null)
    //         return;
    //     const storageRef = ref(storage, `/images/${userInfo?.username}`);
    //     uploadBytes(storageRef, image).then((result) => {
    //         getDownloadURL(result.ref).then(async (url) => {//lấy liên kết tới ảnh
    //             const data = {
    //                 tenhienthi: name,
    //                 image: url,
    //                 birthdate: birthDate
    //             }
    //             await handleSubmitSaveProfile(data)  // xử lý update lại ảnh
    //         })
    //     })
    // }

    // const handleSubmitSaveProfile = async (data) => {//xử lý submit lưu thông tin
    //     try {
    //         dispatch(setLoading(true))
    //         const update = await apiMain.updateUserInfo(user, dispatch, loginSuccess, data)
    //         dispatch(setLoading(false))
    //         toast.success("Cập nhật thông tin thành công", { autoClose: 1000, hideProgressBar: true, pauseOnHover: false })
    //         const newUser = { ...user, image: update.image, tenhienthi: update.tenhienthi }
    //         dispatch(loginSuccess(newUser))
    //         changeUserInfo(update.userInfo)
    //     } catch (error) {
    //         console.log(error)
    //         toast.error("Lỗi cập nhật thông tin", { autoClose: 1000, hideProgressBar: true, pauseOnHover: false })
    //     }
    // }

    const handleEdit = async (e) => {
        e.preventDefault()
        console.log(1214142)

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
                                    <p>{userInfo.vip != null ? "Vip" : "Chưa kích hoạt vip"}</p>
                                    <p>{userInfo.vip != null ? userInfo.ngayHetHanVip : "Kích hoạt vip để tận hưởng các chức năng của trang web"}</p>
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
                                <div className="d-flex">
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
            {/* } */}
        </>

    )
}
