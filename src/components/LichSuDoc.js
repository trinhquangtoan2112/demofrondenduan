import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiKey } from '../service/http';
import { Button, message, Popconfirm } from 'antd';

export default function LichSuDoc() {
    const [lichSu, setLichSu] = useState();

    const getLichSuDoc = async () => {
        try {
            const result = await apiKey.getToken("LichSuDoc/DanhSachLichSuDoc");
            setLichSu(result.data.data);
        } catch (error) {
            console.log(error);
            setLichSu(null);
        }
    };

    useEffect(() => {
        getLichSuDoc();
    }, []);

    const removeFromLichSuDoc = async (id) => {
        const data = {
            maChuong: id
        };

        try {
            const result = await apiKey.deleteToken("LichSuDoc/XoaLichSuDoc", data);
            if (result.data.status === 204) {
                message.success("Xóa lịch sử thành công");
                getLichSuDoc();
            }
        } catch (error) {
            console.log(error);
            message.error("Xóa lịch sử không thành công");
        }
    };

    const cancel = (e) => {
        console.log(e);
        message.error('Bạn chọn không');
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Danh Sách Lịch Sử Đọc Truyện</h1>
            <div className="bg-yellow-50 p-4 rounded-lg shadow-lg">
                {lichSu ? (
                    lichSu.map((data) => (
                        <div key={data.idMaChuong} className="flex items-center justify-between mb-4 p-4 border-b border-gray-200 last:border-0">
                            <Link to={`/truyen/${data.tenTruyen}/${data.idMaChuong}`} className="flex items-center space-x-4 w-3/4">
                                <div className="w-1/4 flex-shrink-0">
                                    <div className="relative" style={{ paddingTop: '75%' }}> {/* 3:4 aspect ratio */}
                                        <img src={data?.anhBia || "https://docln.net/img/nocover.jpg"} alt={data.tenChuong} className="absolute top-0 left-0 w-full h-full object-cover rounded" />
                                    </div>
                                </div>
                                <div className="w-3/4">
                                    <p className="font-semibold truncate">{data.tenTruyen}</p>
                                    <p className="text-sm text-gray-700">Chương: {data.tenChuong}</p>
                                </div>
                            </Link>
                            <Popconfirm
                                title="Xóa lịch sử đọc"
                                description="Bạn có muốn xóa lịch sử đọc của truyện này không?"
                                onConfirm={() => removeFromLichSuDoc(data.idMaChuong)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button danger>
                                    <i className="fa fa-trash" />
                                </Button>
                            </Popconfirm>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-700">Không có lịch sử đọc</p>
                )}
            </div>
        </div>
    );
}
