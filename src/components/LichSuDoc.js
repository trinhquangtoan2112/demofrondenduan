import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiKey } from '../service/http';
import { Button, message, Popconfirm } from 'antd';

export default function LichSuDoc() {
    const [lichSu, setLichSu] = useState();
    const getLichSuDoc = async () => {
        try {
            const result = await apiKey.getToken("LichSuDoc/DanhSachLichSuDoc");
            console.log(result)
            setLichSu(result.data.data)
        } catch (error) {
            console.log(error)
            setLichSu(null)
        }
    }
    console.log(lichSu)
    useEffect(() => {
        getLichSuDoc()
    }, [])
    const removeFromLichSuDoc = async (id) => {
        const data = {
            maChuong: id
        }

        console.log(data)
        try {
            const result = await apiKey.deleteToken("LichSuDoc/XoaLichSuDoc", data);
            if (result.data.status == 204) {
                message.success("Xóa lịch sử thành công")
                getLichSuDoc()
            }

        } catch (error) {
            console.log(error)
            message.error("Xóa lịch sử không thành công")
        }
    }
    const cancel = (e) => {
        console.log(e);
        message.error('Bạn chọn không');
    };
    return (
        <div >
            <h1>Danh Sách lịch sử đọc truyện</h1>
            <div className=' bg-yellow-50 w-2/5 mx-auto'>
                {lichSu ? lichSu?.map((data) => (
                    <div className='flex flex-row justify-between items-center w-11/12 mx-auto'>
                        <Link to={`/truyen/${data.tenTruyen}/${data.idMaChuong}`} className="story-card w-3/4 " key={data.idMaChuong}>
                            <div className='truyen-info flex flex-row justify-center '>
                                <div className="story-card__img-wrap w-full " >
                                    <img style={{ width: "100%", height: "100%" }} src={data?.anhBia ? data?.anhBia : "https://docln.net/img/nocover.jpg"} alt={data.tenChuong} />

                                </div>
                                <div className='ml-1'>
                                    <p>{data.tenTruyen}</p>
                                    <p>Chương: {data.tenChuong}</p>
                                </div>

                            </div>
                        </Link>
                        <Popconfirm
                            title="Xóa lịch sử đọc"
                            description="Bạn có muốn xóa lịch sử đọc của truyện này không?"
                            onConfirm={() => {
                                removeFromLichSuDoc(data.idMaChuong)
                            }}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger><i className="fa fa-trash" /></Button>
                        </Popconfirm>

                    </div>

                )) : <p>Không có lịch sử đọc</p>}


            </div>

        </div>
    )
}
