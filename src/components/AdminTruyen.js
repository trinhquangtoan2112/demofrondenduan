import { Button, message, Popconfirm, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import Modal, { ModalContent } from './Modal';
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, LockOutlined, UnlockOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { GetDanhSachTruyenAdmin, TimKiemTruyenAcion } from '../service/actions/TruyenAction';
import { apiKey } from '../service/http';

export default function AdminTruyen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchUser, setSearchUser] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [search, setSearch] = useState("");
    const closeModal = () => {

        setModalVisible(false);
    };
    const BoKhoaTruyen = async (id) => {
        const data = {
            maTruyen: id
        }
        try {

            const result = await apiKey.put("api/Truyens/MoKhoaTruyen", null, data);

            message.success('Thành công');
            getDs()
        } catch (error) {
            message.error('Không thành công');
        }


    };
    const KhoaTruyen = async (id) => {
        const data = {
            maTruyen: id
        }
        try {

            const result = await apiKey.put("api/Truyens/KhoaTruyen", null, data);

            message.success('Thành công');
            getDs()
        } catch (error) {
            message.error('Không thành công');
        }


    };
    const AnTruyen = async (id) => {
        const data = {
            id
        }
        try {

            const result = await apiKey.put("api/Truyens/AnTruyen", null, data);

            message.success('Thành công');
            getDs()
        } catch (error) {
            message.error('Không thành công');
        }


    };
    const HienTruyen = async (id) => {
        const data = {
            id
        }
        try {

            const result = await apiKey.put("api/Truyens/HienTruyen", null, data);
            console.log(result)
            message.success('Thành công');
            getDs()
        } catch (error) {
            message.error('Không thành công');
        }


    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
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
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            render: (th) => <Tag color={th != 4 && th != 0 ? "green" : "volcano"}>{th != 4 && th != 0 ? "Không khóa" : "Khóa"}</Tag>
        },
        {
            title: 'Hiển thị',
            dataIndex: 'congBo',
            key: 'congBo',
            render: (th) => <Tag color={th ? "green" : "volcano"}>{th ? "True" : "False"}</Tag>
        },
        {
            title: 'Lượt đọc',
            dataIndex: 'luotdoc',
            key: 'luotdoc',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    {console.log(_)}
                    {_.congBo == 0 ? <Popconfirm
                        title="Hiển thị truyện"
                        description="Bạn có chắc muốn hiển thị truyện không?"
                        onConfirm={() => {
                            HienTruyen(_.maTruyen)
                        }}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button><EyeOutlined /></Button>
                    </Popconfirm> : <Popconfirm
                        title="Không hiện truyện"
                        description="Bạn có chắc muốn ẩn truyện không?"
                        onConfirm={() => {
                            AnTruyen(_.maTruyen)
                        }}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button><EyeInvisibleOutlined /></Button>
                    </Popconfirm>}


                    {_.trangThai == 4 ? <Popconfirm
                        title="Bỏ khóa truyện"
                        description="Bạn có chắc muốn bỏ khóa truyện không?"
                        onConfirm={() => {
                            BoKhoaTruyen(_.maTruyen)
                        }}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button><UnlockOutlined /></Button>
                    </Popconfirm> : <Popconfirm
                        title="Khóa truyện"
                        description="Bạn có chắc muốn khóa truyện không?"
                        onConfirm={() => {
                            KhoaTruyen(_.maTruyen)
                        }}
                        onCancel={cancel}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button><LockOutlined /></Button>
                    </Popconfirm>}
                </div >
            ),
        }
    ];
    const getDs = async () => {
        const result = await GetDanhSachTruyenAdmin();

        setListUser(result)
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
                <h1>Danh sách Truyện</h1>
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
