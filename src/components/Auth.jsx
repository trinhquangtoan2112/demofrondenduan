import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DangKy, DangNhap, sendEmailPassword } from '../service/actions/UserAction';
import toast, { Toaster } from 'react-hot-toast';
import Loading from './Loading';
import { message } from 'antd';
import { hienDangNhap } from '../store/reducer/UserReducer';
export default function Auth(props) {
    const [login, setLogin] = useState(props.choose)
    const notify = () => toast('Here is your toast.');
    const [isforgetPasswordForm, setIsforgetPasswordForm] = useState(false)
    const [isActiveForm, setIsActiveForm] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // setLogin(props.choose);
        // dispatch(setLoading(false))
    }, []);

    const handleChooseLogin = () => {
        setLogin(true)
    }
    const handleChooseRegister = useCallback(() => {
        setLogin(false)
    })

    const onClickForgetpw = useCallback(() => {
        setIsforgetPasswordForm(true)

    })

    const onClickActive = useCallback(() => {
        setIsActiveForm(true)
    })
    return (
        <div className='auth-wrap'>
            {
                isforgetPasswordForm ? <ForgetPassword />
                    : isActiveForm ? <ReActive /> :
                        <div>
                            <div className="auth-header">
                                <ul>
                                    <li><a style={login ? { color: 'orange' } : {}} onClick={handleChooseLogin}>Đăng nhập</a></li>
                                    <li><a style={!login ? { color: "orange" } : {}} onClick={handleChooseRegister}>Đăng ký</a></li>
                                </ul>
                            </div>
                            <div className="auth-body">
                                {
                                    login ? <Login
                                        dispatch={dispatch} navigate={navigate} handleChooseRegister={handleChooseRegister}
                                        onClickForgetpw={onClickForgetpw}
                                    />
                                        :
                                        <Register
                                            dispatch={dispatch} navigate={navigate}
                                        />
                                }
                            </div>
                        </div>
            }


        </div >
    )
}
const Login = props => {
    // const loading = useSelector(state => state.message.loading)

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setusernameError] = useState(false);
    const [passwordError, setpasswordError] = useState(false);
    // const msgLogin = useSelector(state => state.message.login?.msg)
    const [check, setCheck] = useState(false);
    useEffect(() => {
        //   if (msgLogin)
        //     props.dispatch(clearMessageLogin())
    }, [])

    const onLogin = async (e) => {//xử lý đăng nhập
        e.preventDefault();
        const user = { username, password };
        const data = {
            email: user.username,
            matKhau: user.password
        }
        const checkEmail = /^(?=.{6,30}$)([^\s@]+@[^\s@]+\.[^\s@]+)$/;
        const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#]).{6,30}$/;
        if (!checkEmail.test(username)) {
            setusernameError(true);

        } else if (!checkPassword.test(password)) {
            setpasswordError(true);

        } else {
            const result = await DangNhap(data, props.dispatch);
            if (result == false) {
                message.error("Đăng nhập thất bại kiểm tra lại email và mật khẩu")
            }
        }

    }
    return (
        <div className="form-wrap">
            <form>
                <div className="form-group d-flex">
                    <div className='d-flex label-group'>
                        <label>Email</label>
                        {/* <a onClick={props.onClickActive}>Kích hoạt tài khoản</a> */}

                    </div>
                    <div className="field-wrap">
                        <input
                            placeholder="Email" required name="username" type="text"
                            onChange={(e) => {
                                setUsername(e.target.value)
                                setusernameError(false)
                            }}
                            value={username}
                        />
                        {usernameError ? <p style={{ color: "red" }}>Hãy nhập lại email</p> : null}
                    </div>
                </div>
                <div className="form-group d-flex">
                    <div className="label-group d-flex">
                        <label>Mật khẩu</label>
                        <a onClick={props.onClickForgetpw}>Quên mật khẩu</a>
                    </div>
                    <div className="field-wrap">
                        <input placeholder="Password" required name="password" type='password'
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                                setpasswordError(false)
                            }}
                        />

                        {passwordError ? <p style={{ color: "red" }}>Hãy nhập lại đúng định dạng mật khẩu</p> : null}

                    </div>
                </div>
                {/* <div className="d-flex">
                    <label className='remember-label' htmlFor="remember">
                        <span>Ghi nhớ mật khẩu</span>
                        <input type="checkbox" id="remember" onChange={(e) => {
                            setCheck(!check)
                        }}></input>
                        <span className="checkmark"></span>
                    </label>
                </div> */}
                <button className='rounded-2'
                    onClick={onLogin}
                >
                    Đăng nhập</button>
            </form>
            <span className="register-choose"><label>Bạn chưa có tài khoản. </label>
                <a onClick={props.handleChooseRegister}>Đăng ký ngay?</a></span>

        </div>
    )
}

const ReActive = props => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    // const onReActive = async (e) => {//xử lý gọi api gửi mail kích hoạt
    //   e.preventDefault()
    //   setLoading(true)
    //   const data = { email }
    //   apiMain.reActive(data)
    //     .then(response => {
    //       toast.success("Đã gửi đường dẫn kích hoạt vào email. Vui lòng kiểm tra", { autoClose: 1200, pauseOnHover: false, hideProgressBar: true });
    //     })
    //     .catch(err => {
    //       toast.error(err.response.data.details.message, { autoClose: 1200, pauseOnHover: false, hideProgressBar: true });
    //     })
    //     .finally(() => { setLoading(false) })

    // }
    return (
        <div className="form-wrap">
            <form>
                <div className="form-group d-flex">
                    <div className='d-flex label-group'>
                        <label >Email</label>
                    </div>
                    <div className="field-wrap">
                        <input
                            placeholder="Email" required name="emailActive" type="text"
                        // onChange={onChangeEmail
                        // } value={email}
                        />
                    </div>
                </div>
                <button className='rounded-2'
                //    onClick={onReActive}
                >
                    {/* {loading ? <Loading /> : ''} */}
                    Gửi đường dẫn kích hoạt</button>
            </form>
        </div>
    )
}

const ForgetPassword = props => { ///Quên mật khẩu
    const [gmail, setGmail] = useState("")
    const [loading, setLoading] = useState(false)

    const onChangeEmail = (e) => {
        setGmail(e.target.value)
    }

    const onForgetPassword = async (e) => { //xử lý gọi API gửi mail quên mật khẩu
        e.preventDefault()
        setLoading(true)
        const data = {
            gmail: gmail
        }
        sendEmailPassword(data)

    }
    return (
        <div className="form-wrap">
            <form>
                <div className="form-group d-flex">
                    <div className='d-flex label-group'>
                        <label>Email</label>
                    </div>
                    <div className="field-wrap">
                        <input
                            placeholder="Email" required name="emailActive" type="text"
                            onChange={onChangeEmail
                            }
                            value={gmail} />
                    </div>
                </div>
                <button className='rounded-2'
                    onClick={onForgetPassword}
                >
                    {loading ? <Loading /> : ''}
                    Thay đổi mật khẩu</button>
            </form>
        </div>
    )
}

const Register = props => {
    // const loading = useSelector(state => state.message.loading)
    const [emailRegister, setEmailRegister] = useState("");
    const [usernameRegister, setUsernameRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [passwordCfRegister, setPasswordCfRegister] = useState("");

    const [valid, setValid] = useState([false, false, true, true])
    const [msgUsername, setMsgUsername] = useState(false)
    const [msgEmail, setMsgEmail] = useState("Nhập email đúng định dạng")
    const [msgPassword, setMsgPassword] = useState(false)
    const [msgCfPassword, setMsgCfPassword] = useState(false)
    // const msgRegister = useSelector(state => state.message.register?.msg)
    const dispatch = useDispatch();
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ ///regex validate email
    const checkEmail = /^(?=.{6,30}$)([^\s@]+@[^\s@]+\.[^\s@]+)$/;
    const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#]).{6,30}$/;
    const onRegister = async (e) => {
        e.preventDefault();
        const checkEmail = /^(?=.{6,30}$)([^\s@]+@[^\s@]+\.[^\s@]+)$/;
        const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@]).{6,30}$/;
        if (!checkEmail.test(emailRegister)) {
            setMsgUsername(true);

        } else if (!checkPassword.test(passwordRegister)) {
            setMsgPassword(true);

        } else if (passwordRegister !== passwordCfRegister) {
            setMsgCfPassword(true)
        } else {
            const user = {
                matKhau: passwordRegister,
                email: emailRegister
            };


            const result = await DangKy(user);
            if (result === false) {
                setMsgUsername(true);
                setMsgEmail("Email đã tồn tại")
            } else {

                message.success("Đăng ký thành công bấm vào đăng nhập để đăng nhập")
            }
        }


    }

    const onChangeEmail = (e) => {
        let email = e.target.value
        setEmailRegister(e.target.value)
        setMsgUsername(false);
        setMsgEmail("Nhập email đúng định dạng")
    }



    const onChangePassword = (e) => {
        let password = e.target.value
        setPasswordRegister(e.target.value)
        setMsgPassword(false);
        console.log(passwordRegister)
    }

    const onChangePasswordCf = (e) => {
        let password = e.target.value
        setPasswordCfRegister(e.target.value)
        setMsgCfPassword(false)
    }
    const notify = () => {
        toast('Here is your toast.')
        console.log(1111)
    };
    return (
        <div className="form-wrap">
            <form>
                <div className="form-group d-flex">
                    <label>Email</label>
                    <div className="field-wrap">
                        <input placeholder="example@gmail.com" required name="emailRegister" type="text" value={emailRegister}
                            onChange={onChangeEmail}
                        />
                    </div>
                    {msgUsername ? <span className={`error`}>{msgEmail}</span> : null}

                </div>

                <div className="form-group d-flex">
                    <label>Mật khẩu</label>
                    <div className="field-wrap">
                        <input required={true} name={"passwordRegister"} type='password' value={passwordRegister}
                            onChange={onChangePassword}
                        />
                    </div>
                    {msgPassword ? <span className={`error`}>Nhập mật khẩu đúng định dạng</span> : null}


                </div>
                <div className="form-group d-flex">
                    <label>Nhập lại mật khẩu</label>
                    <div className="field-wrap">
                        <input required={true} name={"passwordCfRegister"} type='password' value={passwordCfRegister}
                            onChange={onChangePasswordCf}
                        />
                    </div>
                    {msgCfPassword ? <span className={`error`}>Nhập lại mật khẩu phải trùng với mật khẩu</span> : null}

                </div>
                {/* <span>{msgRegister}</span> */}
                <button
                    onClick={onRegister}
                >
                    {/* {loading ? <Loading /> : ""} */}
                    Đăng ký</button>

            </form>
        </div>
    )
}