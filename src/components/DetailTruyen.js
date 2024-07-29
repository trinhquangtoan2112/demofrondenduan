import React, { useCallback, useEffect, useState } from 'react'


import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { useNavigate, useParams } from 'react-router-dom';


import { useSelector } from 'react-redux';
import { DuyetTruyenaction, GetThongTinTruyen } from '../service/actions/TruyenAction';
import { message } from 'antd';

export default function DetailTruyen() {
    const { id } = useParams();
    const nav = useNavigate();
    const theLoai1 = useSelector(state => state.TheLoaiReducer.theLoai);
    console.log(theLoai1)
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState()
    const [name, setName] = useState("");
    const [Nguoiviettruyen, setNguoiVietTruyen] = useState("");
    const [description, setDescription] = useState("");
    const [tacgia, setTacgia] = useState("");
    const [theloai, setTheloai] = useState("");

    const [ckValue, setCkValue] = useState(true);

    const [trangthai, settrangthai] = useState(true)
    console.log(theloai)
    const handleCreate = async (e) => {
        e.preventDefault()
        const result = await DuyetTruyenaction(id);
        if (result == false) {
            message.error('Không thành công');

        } else {
            getData()
            message.success('Thành công');
            window.scrollTo(0, 0);
            nav("/admin/DuyetTruyen")

        }
    }
    const getData = async () => {
        const result = await GetThongTinTruyen(id);
        console.log(14124241214)
        console.log(result)
        setImage(null);
        setPreview(result.anhBia)
        setName(result.tenTruyen);
        setNguoiVietTruyen(result.tacGia);
        setTheloai(result.tenTheLoai)
        setDescription(result.moTa)
        settrangthai(result.trangThai)
    }
    useEffect(() => {

        getData();

    }, [])


    console.log(theloai)
    const labelStyle = { 'minWidth': '100px', 'display': 'inline-block' }
    return (
        <div className="">

            <div className="profile__wrap ">
                <div className="profile__main ">
                    <form className=' d-flex flex-row flex-wrap items-center'>
                        <div className="group-info col-3">
                            <label htmlFor="" style={labelStyle}>Tên truyện</label>
                            <input

                                value={name || ""} disabled />
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

                            </div>
                        </div>
                        <div className="group-info col-3">
                            <label for="types">Thể loại</label>
                            <p>{theloai}</p>

                        </div>
                        <div className="group-info col-3">
                            <label for="types">Tác giả</label>
                            <p>{Nguoiviettruyen}</p>

                        </div>
                        <div className="group-info col-12">
                            <label htmlFor="" style={labelStyle}>Mô tả</label>
                            <CKEditor
                                disabled
                                editor={ClassicEditor}
                                config={{ placeholder: "Please enter your comment" }}
                                data={description || ""}
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
                                Duyệt truyện</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
