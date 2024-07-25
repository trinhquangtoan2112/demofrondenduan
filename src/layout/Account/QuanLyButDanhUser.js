import { EditOutlined, EyeInvisibleOutlined, EyeOutlined, FileAddOutlined, FormOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { GetTruyenTheoIDNguoiDung } from '../../service/actions/TruyenAction'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function QuanLyButDanhUser() {
    const [list, setList] = useState()
    useEffect(() => {
        getBang()
    }, [])
    const getBang = async () => {
        const result = await GetTruyenTheoIDNguoiDung();
        console.log(result)
        if (result === false) {
            setList(null)
        }
        if (result.status === 200) {
            setList(result.data)
        }
    }
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (_, record, index) => (<a>{index + 1}</a>)
        },
        {
            title: 'Tên truyện',
            dataIndex: 'tenTruyen',
            key: 'tenTruyen',
            render: (th) => <>{th != null ? <p>{th}</p> : <p>Không có</p>} </>
        },
        {
            title: 'Tên thể loại',
            dataIndex: 'tenTheLoai',
            key: 'tenTheLoai',
        },
        {
            title: 'Ngày Cập nhập',
            dataIndex: 'ngayCapNhat',
            key: 'ngayCapNhat',
            render: (th) => <>{th != null ? <p>{dayjs(th).format("DD-MM-YYYY")}</p> : <p>Không có</p>} </>
        },

        {
            title: 'Công bố',
            dataIndex: 'congBo',
            key: 'congBo',
            render: (th) => (th == 1 ? <p> Hiển thị</p> : <p>Không hiển thị</p>)
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            render: (th) => (th == 1 ? <p> Hiển thị</p> : <p>Không hiển thị</p>)
        },
        {
            title: 'Tên bút danh',
            dataIndex: 'tenButDanh',
            key: 'tenButDanh',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    {
                        _.trangThaiButDanh == 1 ? <p>Bạn đã bị khóa bút danh</p> : < div >
                            <Link to={`/tacgia/ThemBanThao/${_.maTruyen}`}><Button><FileAddOutlined /></Button></Link>
                            <Link to={`/tacgia/DanhSachBanThaoCuaTruyen/${_.maTruyen}`}><Button><UnorderedListOutlined /></Button></Link>

                        </div >
                    }
                </>
            ),
        }
    ];
    return (
        <Table columns={columns} dataSource={list && list.length > 0 ? list : null} />
    )
}
