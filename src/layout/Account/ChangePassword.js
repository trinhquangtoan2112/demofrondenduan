import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChangePasswordAction } from '../../service/actions/UserAction';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export default function ChangePassword() {
    // const loading = useSelector(state => state.message.loading)
    const urlParams = new URLSearchParams(window.location.search);
    const nav = useNavigate();
    const token = urlParams.get('token');
    console.log(token);
    const [currentPW, setCurrentPW] = useState("")
    const [newPW, setNewPW] = useState("")
    const [newCfPW, setNewCfPW] = useState("")
    const [msgNewPW, setMsgNewPW] = useState("")
    const [msgNewCfPW, setMsgCfNewPW] = useState("")
    const [valid, setValid] = useState({ new: false, cf: false });
    // const user = useSelector(state => state.auth.login?.user)
    // const dispatch = useDispatch();
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");//regex kiểm tra mật khẩu hợp lệ

    const onChangeCurrentPW = (e) => {//xử lý khi nhập mật khẩu
        setCurrentPW(e.target.value)
    }
    const onChangeNewPW = (e) => {//xử lý khi nhập mật khẩu mới
        setNewPW(e.target.value)
        if (strongRegex.test(e.target.value)) {
            setMsgNewPW("Mật khẩu hợp lý")
            setValid(pre => { return { ...pre, new: true } })
        } else {
            setMsgNewPW("Mật khẩu phải có ít nhất 8 kí tự. Chứa kí tự thường, kí tự hoa và số")
            setValid(pre => { return { ...pre, new: false } })
        }
    }
    const onChangeNewCfPW = (e) => {//xử lý nhập mật khẩu xác nhận
        setNewCfPW(e.target.value)
        if (newPW.localeCompare(e.target.value) == 0) {
            setMsgCfNewPW("Trùng khớp")
            setValid(pre => { return { ...pre, cf: true } })
        }
        else {
            setMsgCfNewPW("Mật khẩu không trùng khớp")
            setValid(pre => { return { ...pre, cf: false } })
        }
    }


    const onClickChangePassword = async (e) => {
        e.preventDefault()
        if (valid.new && valid.cf) {//kiểm tra dữ liệu đầu vào
            const params = {//payload
                token: token,
                password: newPW
            }
            const result = await ChangePasswordAction(params)

            if (result) {
                message.success("Thay đổi mật khẩu thành công vui lòng đăng nhập lại ")
                nav("/")
            }
        }
    }

    //style
    const labelStyle = { 'minWidth': '100px', 'display': 'inline-block' }

    return (
        <div className="profile__main">
            <form>

                <div className="group-info">
                    <label htmlFor="" style={labelStyle}>Mật khẩu mới</label>
                    {<input type={"password"}
                        onChange={onChangeNewPW}
                        value={newPW}></input>}
                    <span>{msgNewPW}</span>
                </div>
                <div className="group-info">
                    <label htmlFor="" style={labelStyle}>Xác nhận mật khẩu mới</label>
                    <input type={"password"}
                        onChange={onChangeNewCfPW}
                        id="birthday" value={newCfPW}></input>
                    <span>{msgNewCfPW}</span>
                </div>
                <div className="d-flex">
                    <button
                        onClick={onClickChangePassword}
                    >
                        {/* {loading ? <Loading/> : ''}  */}
                        Đổi mật khẩu</button>
                </div>
            </form>

        </div>
    )
}
