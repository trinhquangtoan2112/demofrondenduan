import React, { useEffect, useState } from 'react'
import avt from '../../assets/img/avt.png'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loading from './../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { DangTruyen } from '../../service/actions/TruyenAction';
import { useNavigate, useParams } from 'react-router-dom';
import { layDanhSachButDanh } from '../../service/actions/ButDanhAction';

export default function CreateNovel(props) {


    const navigate = useNavigate();

    const theLoai = useSelector(state => state.TheLoaiReducer.theLoai);

    const [ckValue, setCkValue] = useState(true);
    // const user = useSelector(state=>state.auth.login.user)
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState(avt)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [listTacgia, setListTacGia] = useState(null);
    const [tacgia, setTacgia] = useState();
    const [theloai, setTheloai] = useState(theLoai[0]);
    // const loading = useSelector(state => state.message.loading)
    const [loadingUser, setLoadingUser] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        getButDanh()
    }, [])
    const getButDanh = async () => {
        const result = await layDanhSachButDanh();
        if (result === false) {
            setListTacGia(null);
        } else {
            setListTacGia(result)
            setTacgia(result[0].maButDanh)
        }
    }
    console.log(listTacgia)
    // const handleCreateNovel = async (data) => {//xử lý gọi tạo truyện mới
    //     try {
    //         apiMain.createNovel(data,user, dispatch, loginSuccess )
    //             .then(res =>{
    //                 toast.success("Đăng truyện thành công")
    //                 dispatch(setLoading(false))
    //             })
    //             .catch(err=>{

    //                 dispatch(setLoading(false))
    //                 toast.error(getData(err.response)?.details.message)
    //             })
    //     } catch (error) {
    //         console.log(error)
    //         toast.error("Lỗi cập nhật thông tin")
    //     }
    // }

    const handleCreate = async (e) => {//xử lý tạo truyện
        e.preventDefault()


        const form = new FormData();
        form.append('tenTruyen', name);
        form.append('moTa', description);
        form.append('MaTheLoai', theloai);
        form.append('maButDanh', tacgia);
        form.append('anhBia', image);
        const result = await DangTruyen(form);
        if (result) {
            setCkValue(" ")
            setTimeout(() => {
                setCkValue(true)
            }, [1])
            setName("")
            setDescription("")
            setPreview(avt)
            navigate(-1);
        }
    }

    ///OnChange event
    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeImage = (e) => {
        if (e.target.files.lenght !== 0) {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    const labelStyle = { 'minWidth': '100px', 'display': 'inline-block' }
    return (
        <>
            {/* {
                loadingUser ? <LoadingData />
                    : */}
            {listTacgia != null ? <div className="">

                <div className="profile__wrap ">
                    <div className="profile__main ">
                        <form className=' d-flex flex-row flex-wrap items-center'>
                            <div className="group-info col-3">
                                <label htmlFor="" style={labelStyle}>Tên truyện</label>
                                <input
                                    onChange={onChangeName}
                                    value={name || ""} />
                            </div>

                            {/* <div className="group-info col-3">
                <label style={labelStyle}>Tác giả</label>
                <input required
                    onChange={e => { setTacgia(e.target.value) }} value={tacgia}
                ></input>
            </div> */}
                            <div className="group-info col-6">
                                <div className=" profile__avt flex flex-row items-center" style={{ flexDirection: "row" }}>
                                    <img src={preview} alt="" />
                                    <input type={"file"} accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" name={"avatar"}
                                        onChange={onChangeImage}
                                    />
                                </div>
                            </div>
                            <div className="group-info col-3">
                                <label for="types">Thể loại</label>
                                <select style={labelStyle} onChange={e => { console.log(e.target.value); setTheloai(e.target.value) }} value={theloai} id="types" name="types">
                                    {
                                        theLoai.map(item => { return (<option value={item.maTheLoai}>{item.tenTheLoai}</option>) })
                                    }
                                </select>
                            </div>
                            <div className="group-info col-3">
                                <label for="types">Bút danh</label>
                                <select style={labelStyle} onChange={e => { console.log(e.target.value); setTacgia(e.target.value) }} defaultValue={listTacgia[0].maButDanh} id="types" name="types">
                                    {
                                        listTacgia?.map(item => (
                                            item.trangthai === 0 ? (
                                                <option key={item.maButDanh} value={item.maButDanh}>
                                                    {item.tenButDanh}
                                                </option>
                                            ) : null
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="group-info col-12">
                                <label htmlFor="" style={labelStyle}>Mô tả</label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    config={{ placeholder: "Please enter your comment" }}
                                    data={ckValue}
                                    onReady={editor => {

                                    }}
                                    onChange={
                                        (_, editor) => setDescription(editor.getData().trim())
                                    }
                                    onBlur={(event, editor) => {

                                    }}
                                    onFocus={(event, editor) => {

                                    }}
                                />
                            </div>
                            <div className="d-flex">
                                <button
                                    onClick={handleCreate}
                                >
                                    Đăng truyện</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> : <p>Lỗi xảy ra </p>}

            {/* } */}
        </>

    )
}