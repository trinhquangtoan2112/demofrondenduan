import React, { useEffect, useState } from 'react'
import { DuyetTruyenaction, GetDanhSachTruyenCanDuyet } from '../../service/actions/TruyenAction'
import { Button, message, Popconfirm, Table, Tag } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

export default function DuyetTruyen() {
    const [danhSach, setDanhSach] = useState();
    useEffect(() => {
        getDanhSach()
    }, [])
    const getDanhSach = async () => {
        const result = await GetDanhSachTruyenCanDuyet();
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
        const result = await DuyetTruyenaction(e);
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
            title: 'Tên bút danh',
            dataIndex: 'tenButDanh',
            key: 'tenButDanh',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    {console.log(_)}


                    <Button><EyeOutlined /></Button>
                    <Popconfirm
                        title="Công bố truyện"
                        description="Bạn có chắc muốn Công bố truyện không?"
                        onConfirm={() => {
                            confirm(_.maTruyen)
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
