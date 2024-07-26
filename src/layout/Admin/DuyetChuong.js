import React, { useEffect, useState } from 'react'
import { DuyetChuongAction, GetDanhSachChuongCanDuyet } from '../../service/actions/ChuongTruyenAction'
import { Button, message, Popconfirm, Table, Tag } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

export default function DuyetChuong() {
    const [danhSach, setDanhSach] = useState();
    useEffect(() => {
        getDanhSach()
    }, [])
    const getDanhSach = async () => {
        const result = await GetDanhSachChuongCanDuyet();
        if (result == false) {
            setDanhSach(null)
        } else {
            setDanhSach(result)
        }
    }
    console.log(danhSach)
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };
    const confirm = async (e) => {
        const result = await DuyetChuongAction(e);
        if (result == false) {
            message.error('Không thành công');
        } else {
            getDanhSach()
            message.success('Thành công');
        }
    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (_, record, index) => (<a>{index + 1}</a>)
        },
        {
            title: 'Tên chương',
            dataIndex: 'tenChuong',
            key: 'tenChuong',
            render: (th) => <>{th != null ? <p>{th}</p> : <p>Không có</p>} </>
        },
        {
            title: 'Tên bút danh',
            dataIndex: 'tenButdanh',
            key: 'tenButdanh',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'ngayTao',
            key: 'ngayTao',
            render: (th) => <>{th != null ? <p>{dayjs(th).format("DD-MM-YYYY")}</p> : <p>Không có</p>} </>
        },
        {
            title: 'Ngày cập nhập',
            dataIndex: 'ngayCapNhat',
            key: 'ngayCapNhat',
            render: (th) => <>{th != null ? <p>{dayjs(th).format("DD-MM-YYYY")}</p> : <p>Không có</p>} </>
        },
        {
            title: 'Tên truyện',
            dataIndex: 'tenTruyen',
            key: 'tenTruyen',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    {console.log(_)}
                    <Link to={`DetailChuong/${_.machuongtruyen}`}><Button><EyeOutlined /></Button></Link>
                    <Popconfirm
                        title="Công bố chương"
                        description="Bạn có chắc muốn công bố chương không?"
                        onConfirm={() => {
                            confirm(_.machuongtruyen)
                        }}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button><UnlockOutlined /></Button>
                    </Popconfirm>


                </div >
            ),
        }
    ];
    return (
        <Table columns={columns} dataSource={danhSach}></Table>
    )
}
