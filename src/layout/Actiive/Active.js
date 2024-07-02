import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingData from '../../components/LoadingData'
import Layout from '../../components/Layout'
import { authenAccount } from '../../service/actions/UserAction';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

export default function Active() {
    const urlParams = new URLSearchParams(window.location.search);

    const token = urlParams.get('check');
    console.log(token)
    const [loadingData, setLoadingData] = useState(true)
    const [msg, setMsg] = useState("")
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        const active = async () => {
            const result = await authenAccount(dispatch);
            if (result) {
                message.success("Xác thực thành công")
                setLoadingData(false)
                setCount(5);
            }
        }
        active();
    }, [])

    useEffect(() => {
        const countDown = async () => {//hàm xử lý đếm ngược 5s sau khi kích hoạt xong

            if (loadingData)
                return
            setTimeout(() => {
                if (count > 0) {
                    setCount(pre => pre - 1)
                    console.log(count)
                }
                else {
                    navigate("/")
                }
            }, 1000)
        }
        countDown();
    }, [count])

    return (

        <Layout >
            <div className="main-content">
                {loadingData ?
                    <>
                        <LoadingData />
                        <div className='d-flex mt-2'><h4>Đang kích hoạt tài khoản</h4></div>
                    </>
                    :
                    <>
                        <div className='d-flex mt-2'><h4>{msg}</h4></div>
                        <span>Sẽ chuyển đến trang chủ trong {count} giây</span>
                    </>
                }
            </div>
        </Layout>
    )
}
