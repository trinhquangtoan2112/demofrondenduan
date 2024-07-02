import toast, { Toaster } from 'react-hot-toast';
import { setUserInformation } from "../../store/reducer/UserReducer"
import { apiKey } from "../http"
import { message } from 'antd';
import ChangePassword from './../../layout/Account/ChangePassword';

export const DangNhap = async (user, dispatch, check) => {
    try {
        const result = await apiKey.post("Login/Login", user)
        if (result.status == 200) {
            dispatch(setUserInformation(result.data))
            message.success("Successfully")
            if (check) {
                localStorage.setItem("USER_LOGIN", JSON.stringify(result.data.data));
                localStorage.setItem("TOKEN", result.data.token);
            }
        }
    } catch (error) {
        message.error("Lỗi xảy ra")
    }
}
export const DangKy = async (user) => {
    try {
        const result = await apiKey.post("Login/SignUp", user)
        if (result.data.status == 200) {
            message.success("Successfully")
        }
    } catch (error) {
        message.error("Lỗi xảy ra")
    }
}
export const CapNhapThongTin = async (dispatch) => {
    console.log("user")
    try {
        const result = await apiKey.getToken("/Login/updateInfo")

        if (result.status == 200) {
            dispatch(setUserInformation(result.data))
            localStorage.setItem("USER_LOGIN", JSON.stringify(result.data.data));

        }
    } catch (error) {
        message.error("Lỗi xảy ra")
    }
}
export const ChinhSuaThongTinDangNhap = async (user, dispatch) => {
    try {
        const result = await apiKey.putToken("/Login/CapNhapThongtinNguoiDung", user)
        if (result.status == 200) {
            await CapNhapThongTin()
            message.success("Successfully")
        }
    } catch (error) {
        message.error("Lỗi xảy ra")
    }
}
export const sendEmail = async () => {
    try {
        const result = await apiKey.postToken("/Login/changeAuthen")
        console.log(result)
        message.success("Gửi email thành công")

    } catch (error) {
        message.error("Lỗi xảy ra")
        return false;
    }
}
export const sendEmailPassword = async (email) => {
    console.log(email)
    try {
        const result = await apiKey.get("/Login/forgetPassword", email)

        message.success("Gửi email thành công")

    } catch (error) {

        message.error("Lỗi xảy ra")

    }
}
export const authenAccount = async (dispatch) => {

    try {
        const result = await apiKey.putToken("/Login/authenAccount")

        if (result.status == 200) {
            CapNhapThongTin(dispatch)
            return true;
        }
        return false;

    } catch (error) {
        message.error("Lỗi xảy ra")
    }
}
export const ChangePasswordAction = async (data) => {
    console.log(data)
    try {
        const result = await apiKey.put("/Login/ChangePassword", null, data)

        if (result.status == 200) {
            return true;
        }
        message.error("Lỗi xảy ra")
        return false;

    } catch (error) {
        message.error("Lỗi xảy ra")
    }
}