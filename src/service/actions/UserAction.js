import toast, { Toaster } from 'react-hot-toast';
import { setUserInformation } from "../../store/reducer/UserReducer"
import { apiKey } from "../http"
import { message } from 'antd';

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
        console.log(user)
        console.log(error)
    }

}

export const DangKy = async (user) => {
    console.log(user)
    try {

        const result = await apiKey.post("Login/SignUp", user)
        console.log(result)

        if (result.data.status == 200) {
            console.log(result, "24124124")
            message.success("Successfully")
        }
    } catch (error) {
        console.log(user)
        console.log(error)
    }

}