import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function AddUser() {
    //component chưa dùng
    const [emailRegister, setEmailRegister] = useState("");
    const [usernameRegister, setUsernameRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [passwordCfRegister, setPasswordCfRegister] = useState("");
    //    const msgRegister = useSelector(state => state.message.register?.msg)

    //    const onRegister = async (e) => {
    //      e.preventDefault();
    //      const user = {
    //        username: usernameRegister,
    //        password: passwordRegister,
    //        email: emailRegister
    //      };
    //      await handleRegister(user, props.dispatch, props.navigate);
    //    }

    return (
        <div className="form-wrap">
            <h3 className='text-center'>Thêm tài khoản</h3>
            <form>
                <div className="form-group d-flex">
                    <label>Email</label>
                    <div className="field-wrap">
                        <input placeholder="example@gmail.com" required name="emailRegister" type="text" value={emailRegister}
                            onChange={e => { setEmailRegister(e.target.value) }}
                        />
                    </div>

                </div>
                <div className="form-group d-flex">
                    <label>Email</label>
                    <div className="field-wrap">
                        <input placeholder="example@gmail.com" required name="emailRegister" type="text" value={emailRegister}
                            onChange={e => { setEmailRegister(e.target.value) }}
                        />
                    </div>

                </div>

                <div className="form-group d-flex">
                    <label>Mật khẩu</label>
                    <div className="field-wrap">
                        <input required={true} name={"passwordRegister"} type='password' value={passwordRegister}
                            onChange={e => { setPasswordRegister(e.target.value) }}
                        />
                    </div>

                </div>
                <div className="form-group d-flex">
                    <label>Nhập lại mật khẩu</label>
                    <div className="field-wrap">
                        <input required={true} name={"passwordCfRegister"} type='password' value={passwordCfRegister}
                            onChange={e => { setPasswordCfRegister(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="form-group d-flex">
                    <label>Email</label>
                    <div className="field-wrap">
                        <input placeholder="example@gmail.com" required name="emailRegister" type="text" value={emailRegister}
                            onChange={e => { setEmailRegister(e.target.value) }}
                        />
                    </div>

                </div>
                <div className="form-group d-flex">
                    <label>Email</label>
                    <div className="field-wrap">
                        <input placeholder="example@gmail.com" required name="emailRegister" type="text" value={emailRegister}
                            onChange={e => { setEmailRegister(e.target.value) }}
                        />
                    </div>

                </div>
                <div className="form-group d-flex">
                    <label>Email</label>
                    <div className="field-wrap">
                        <input placeholder="example@gmail.com" required name="emailRegister" type="text" value={emailRegister}
                            onChange={e => { setEmailRegister(e.target.value) }}
                        />
                    </div>

                </div>
                <div className="form-group d-flex">
                    <label>Email</label>
                    <div className="field-wrap">
                        <input placeholder="example@gmail.com" required name="emailRegister" type="text" value={emailRegister}
                            onChange={e => { setEmailRegister(e.target.value) }}
                        />
                    </div>

                </div>
                <div className="form-group d-flex">
                    <label>Email</label>
                    <div className="field-wrap">
                        <input placeholder="example@gmail.com" required name="emailRegister" type="text" value={emailRegister}
                            onChange={e => { setEmailRegister(e.target.value) }}
                        />
                    </div>

                </div>
                {/* <span>{msgRegister}</span> */}
                <button
                //  onClick={onRegister}
                >Đăng ký</button>

            </form>
        </div>
    )
}
