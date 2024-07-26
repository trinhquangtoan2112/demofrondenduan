import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDanhSachBanThaoTheoTruyenAction, getLayChiTietBanThaoAction, suaBanThaoAction, themBanThaoAction, xoaBanThaoAction } from '../../service/actions/BanThaoAction';

export default function ThembanThao() {
    const { id } = useParams();
    console.log(id)
    const nav = useNavigate();
    const [ten, setTen] = useState(false);
    const [edit, setEdit] = useState(false)
    const labelStyle = { 'minWidth': '100px', 'margin': '5px 0px', 'display': 'inline-block' }
    const themBanThao = async () => {
        const data = {
            tenBanThao: ten,
            noidung: edit,
            maTruyen: 1
        }
        const result = await themBanThaoAction(data);
        console.log(result)
    }
    return (
        <><div className='d-flex mb-1' style={{ 'justifyContent': 'space-between' }}>
            <a onClick={() => { nav("/tacgia/QuanLyBanThao") }}
            //  onClick={onClickBackFromListChap}
            ><i className="fa-solid fa-angle-left"></i>Quản lý</a>

        </div>
            <>

                <div className="group-info" style={{ 'marginBottom': '10px' }}>
                    <label htmlFor="" className='fs-16' style={labelStyle}>Tên bản thảo</label>
                    <input
                        onChange={(e) => {
                            setTen(e.target.value);
                        }}
                        value={ten || ""}
                    />
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
                        onClick={themBanThao}
                        style={{ 'margin': '20px auto' }}>Thêm bản thảo</button>

                    {/* : <button className='btn-primary' onClick={onClickAddChapter} style={{ 'margin': '20px auto' }}>Thêm chương</button>} */}


                </div>
            </>
        </>

    )
}
