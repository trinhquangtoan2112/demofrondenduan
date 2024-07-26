import React, { useCallback, useEffect, useState } from 'react'


import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';
import { GetChiTietChuongAdmin, GetCHiTietChuongTruyen } from '../service/actions/TruyenAction';
import { DuyetChuongAction } from '../service/actions/ChuongTruyenAction';
import { message } from 'antd';
export default function DetailChuong() {
    const { id } = useParams();
    const nav = useNavigate()

    const [content, setContent] = useState("")
    const [tenchuong, setTenchuong] = useState("")
    const [edit, setEdit] = useState(false)

    const CapNhap = async () => {
        const result = await DuyetChuongAction(id);
        if (result == false) {
            message.error('Không thành công');
        } else {
            GetTruyen()
            message.success('Thành công');
            window.scrollTo(0, 0);
            nav("/admin/DuyetTruyen")
        }
    }
    const GetTruyen = async () => {
        const result = await GetChiTietChuongAdmin(id);
        console.log(result)
        setTenchuong(result.data.tenChuong);
        setEdit(result.data.noiDung);
    }
    useEffect(() => {
        GetTruyen()
    }, [id])
    const labelStyle = { 'minWidth': '100px', 'margin': '5px 0px', 'display': 'inline-block' }
    return (
        <>
            <div>
                <a onClick={() => { nav("/admin/DuyetChuong") }}
                //  onClick={onClickBackFromListChap}
                ><i className="fa-solid fa-angle-left"></i>Duyệt chương</a>
            </div>
            <div className="group-info" style={{ 'marginBottom': '10px' }}>
                <label htmlFor="" className='fs-16' style={labelStyle}>Tên chương</label>
                <input disabled value={tenchuong || ""} />
            </div>
            <label htmlFor="" className='fs-16' style={labelStyle}>Nội dung chương</label>
            <CKEditor
                editor={ClassicEditor}
                data={edit || ''}
                disabled
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
