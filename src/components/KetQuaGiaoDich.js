import React, { useEffect, useState } from 'react'
import { apiKey } from '../service/http';
import { CapNhapThongTin } from '../service/actions/UserAction';
import { useDispatch } from 'react-redux';

export default function KetQuaGiaoDich() {
    const [ketQua, setKetQua] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        console.log(queryString)


        const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
        if (vnp_ResponseCode == "00") {
            getResult(queryString)
            setKetQua(true)
            CapNhapThongTin(dispatch)
        }

    }, [])

    const getResult = async (queryString) => {
        try {
            const result = await apiKey.get(`VNPay/ketQua${queryString}`)
        } catch (error) {

        }
    }
    return (
        <div>Kết quả giao dịch : {ketQua ? "Thành công" : "Thất bại"}</div>
    )
}
