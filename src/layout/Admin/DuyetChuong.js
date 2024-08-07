import React, { useEffect, useState } from 'react'
import { DuyetChuongAction, GetDanhSachChuongCanDuyet } from '../../service/actions/ChuongTruyenAction'
import { Button, message, Popconfirm, Table, Tag } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { TimKiemChuongTheoTenTruyenAcion, TimKiemTruyenAcion } from '../../service/actions/TruyenAction'

export default function DuyetChuong() {
    const [danhSach, setDanhSach] = useState();
    const [search, setSearch] = useState("");
    const [searchUser, setSearchUser] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
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
    const handleSearchUsers = async () => {
        console.log(search)
        if (search != null && search.trim() !== "") {
            const result = await TimKiemChuongTheoTenTruyenAcion(search);
            console.log(result);
            if (result.status === 200) {
                setSearchUser(result.data);
                setIsSearching(true);
            }
        } else {
            getDanhSach()
            setIsSearching(false);
        }

    };
    return (
        <>
            <div className='flex flex-row justify-center items-center'>
                <h1>Danh sách chương cần duyệt</h1>
                <input
                    className='w-3/4'
                    placeholder='Tìm kiếm truyện'
                    onChange={
                        (e) => setSearch(e.target.value.trim())
                    }
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchUsers();
                        }
                    }}
                />
            </div>
            <Table columns={columns} dataSource={isSearching ? searchUser : danhSach ? danhSach : null}></Table>
        </>
    )
}
