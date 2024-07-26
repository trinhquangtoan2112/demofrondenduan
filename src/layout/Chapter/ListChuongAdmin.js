import { Button, message, Popconfirm, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'

import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, LockOutlined, UnlockOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';


import { Link, useParams } from 'react-router-dom';
import Modal, { ModalContent } from './../../components/Modal';
import { GetDanhSachTruyenAdmin, TimKiemTruyenAcion } from '../../service/actions/TruyenAction';
import { apiKey } from '../../service/http';
import { DuyetChuongAction, GetDanhSachChuongAdmin } from '../../service/actions/ChuongTruyenAction';

export default function ListChuongAdmin() {
    const [modalVisible, setModalVisible] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchUser, setSearchUser] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [tenTruyen, settenTruyen] = useState([]);
    const [search, setSearch] = useState("");
    const { id } = useParams();
    const closeModal = () => {

        setModalVisible(false);
    };
    const BoKhoaChuong = async (id) => {
        const data = {
            id: id
        }
        try {

            const result = await apiKey.put("Chuongtruyens/BoKhoaChuong", null, data);

            message.success('Thành công');
            getDs()
        } catch (error) {
            message.error('Không thành công');
        }


    };
    const KhoaChuong = async (id) => {
        const data = {
            id: id
        }
        try {

            const result = await apiKey.put("Chuongtruyens/KhoaChuongTruyen", null, data);
            message.success('Thành công');
            getDs()
        } catch (error) {
            message.error('Không thành công');
        }


    };
    const confirm = async (e) => {
        const result = await DuyetChuongAction(e);
        if (result == false) {
            message.error('Không thành công');
        } else {
            getDs()
            message.success('Thành công');
        }
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',

        },
        {
            title: 'Tên Chương',
            dataIndex: 'tenChuong',
            key: 'tenChuong',
            render: (th) => <>{th != null ? <p>{th}</p> : <p>Không có</p>} </>
        },
        {
            title: 'Ngày cập nhập',
            dataIndex: 'ngayCapNhat',
            key: 'ngayCapNhat',
            render: (th) => <>{th != null ? <p>{dayjs(th).format("DD-MM-YYYY")}</p> : <p>Không có</p>} </>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            render: (th) => (th != 4 ? th != 0 ? <p> Hiển thị</p> : <p>Chưa duyệt</p> : <p>Truyện bị khóa</p>)
        },
        {
            title: 'Hiển thị',
            dataIndex: 'hienThi',
            key: 'hienThi',
            render: (th) => <Tag color={th == 1 ? "green" : "volcano"}>{th == 1 ? "True" : "False"}</Tag>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    {console.log(_)}
                    {_.trangThai == 4 ? <Popconfirm
                        title="Bỏ khóa chương"
                        description="Bạn có chắc muốn bỏ khóa chương không?"
                        onConfirm={() => {
                            BoKhoaChuong(_.machuongtruyen)
                        }}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button><UnlockOutlined /></Button>
                    </Popconfirm> : _.trangThai != 0 ? <Popconfirm
                        title="Khóa chương"
                        description="Bạn có chắc muốn khóa chương không?"
                        onConfirm={() => {
                            KhoaChuong(_.machuongtruyen)
                        }}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button><LockOutlined /></Button>
                    </Popconfirm>
                        : <Popconfirm
                            title="Duyệt chương"
                            description="Bạn có chắc muốn duyệt chương không?"
                            onConfirm={() => {
                                confirm(_.machuongtruyen)
                            }}
                            onCancel={cancel}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button><LockOutlined /></Button>
                        </Popconfirm>
                    }
                </div >
            ),
        }
    ];
    const getDs = async () => {
        const result = await GetDanhSachChuongAdmin(id);
        console.log(result);
        setListUser(result.data)
        settenTruyen(result.tenTruyen)
    }

    const handleSearchUsers = async () => {
        console.log(search)
        if (search != null && search.trim() !== "") {
            const result = await TimKiemTruyenAcion(search);
            console.log(result);
            if (result.status === 200) {
                setSearchUser(result.data);
                setIsSearching(true);
            }
        } else {
            getDs()
            setIsSearching(false);
        }

    };

    useEffect(() => {
        getDs()
    }, [])
    return (
        <>
            <div className='flex flex-row justify-between items-center mb-1'>
                <h1>Danh sách chương của truyện: {tenTruyen}</h1>
                <input
                    className='w-3/4'
                    placeholder='Tìm kiếm'
                    onChange={
                        (e) => setSearch(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchUsers();
                        }
                    }}
                />
                {/* <Button onClick={handleClickAddUser} type="primary">Thêm tài khoản</Button> */}
            </div>
            <Table columns={columns} dataSource={isSearching ? searchUser : listUser ? listUser : null} />
            <div className="">

                <Modal active={modalVisible}>
                    <ModalContent onClose={closeModal}>

                    </ModalContent>
                </Modal>
            </div>

        </>
    )
}
