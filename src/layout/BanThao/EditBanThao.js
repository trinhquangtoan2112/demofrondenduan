import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { apiKey } from '../../service/http';
import { message } from 'antd';
export default function EditBanThao() {
    const { idChuong } = useParams();
    const nav = useNavigate()

    const [content, setContent] = useState("")
    const [tenchuong, setTenchuong] = useState("")
    const [edit, setEdit] = useState(false)
    const onChangeTenchuong = (e) => {
        setTenchuong(e.target.value)
    }
    const CapNhap = async () => {
        const idBanThao = {
            id: idChuong
        }
        const data = {
            tenBanThao: tenchuong,
            noidung: edit
        }
        try {
            const result = await apiKey.put("api/Banthaos", data, idBanThao);
            console.log(result)
        } catch (error) {
            console.log(error)
            message.error("Lỗi xảy ra")
        }
    }
    const GetTruyen = async () => {
        const data = {
            id: idChuong
        }
        try {
            const result = await apiKey.get("api/Banthaos/LayChiTietBanThao", data);

            setTenchuong(result.data.data.tenBanThao);
            setEdit(result.data.data.noidung)
        } catch (error) {
            message.error("Lỗi xảy ra")
        }


    }
    useEffect(() => {
        GetTruyen()
    }, [idChuong])
    const labelStyle = { 'minWidth': '100px', 'margin': '5px 0px', 'display': 'inline-block' }
    return (
        <>
            <div>
                <a onClick={() => { nav("/tacgia/QuanLyBanThao") }}
                //  onClick={onClickBackFromListChap}
                ><i className="fa-solid fa-angle-left"></i> Quản lý bản thảo</a>
            </div>
            <div className="group-info" style={{ 'marginBottom': '10px' }}>
                <label htmlFor="" className='fs-16' style={labelStyle}>Tên bản thảo</label>
                <input onChange={onChangeTenchuong} value={tenchuong || ""} />
            </div>
            <label htmlFor="" className='fs-16' style={labelStyle}>Nội dung bản thảo</label>
            <CKEditor
                editor={ClassicEditor}
                data={edit || ''}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    setEdit(editor.getData())
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            <div className='d-flex'>
                {/* {
            edit ?  */}
                <button className='btn-primary'
                    onClick={CapNhap}
                    style={{ 'margin': '20px auto' }}>Cập nhật chương</button>

                {/* : <button className='btn-primary' onClick={onClickAddChapter} style={{ 'margin': '20px auto' }}>Thêm chương</button>} */}


            </div>
        </>
    )
}
