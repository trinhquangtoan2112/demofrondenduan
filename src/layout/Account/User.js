import React, { useEffect, useState } from 'react';
import Modal, { ModalContent } from '../../components/Modal';
import { useDispatch } from 'react-redux';
import { Button, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import AddUser from './AddUser';
import { searchUserAction } from '../../service/actions/UserAction';
import ChooseRoles from './ChooseRoles';
import { apiKey } from '../../service/http';

export default function User() {
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [searchUser, setSearchUser] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const dispatch = useDispatch();

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            render: (_, record, index) => (<a>{index + 1}</a>)
        },
        {
            title: 'UserName',
            dataIndex: 'tenNguoiDung',
            key: 'tenNguoiDung',
            render: (th) => <>{th != null ? <p>{th}</p> : <p>Không có</p>} </>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày Sinh',
            dataIndex: 'ngaySinh',
            key: 'ngaySinh',
            render: (th) => <>{th != null ? <p>{dayjs(th).format("DD-MM-YYYY")}</p> : <p>Không có</p>} </>
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioiTinh',
            key: 'gioiTinh',
            render: (th) => <>{th != null ? <p>{th}</p> : <p>Không xác định</p>} </>
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            render: (th) => <Tag color={th ? "green" : "volcano"}>{th ? "True" : "False"}</Tag>
        },
        {
            title: 'Đã xóa',
            dataIndex: 'daXoa',
            key: 'daXoa',
            render: (th) => <Tag color={th ? "green" : "volcano"}>{th ? "True" : "False"}</Tag>
        },
        {
            title: 'Quyền',
            dataIndex: 'tenQuyen',
            key: 'tenQuyen',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    {record.tenQuyen === "Admin" ? <p>Bạn không có quyền</p> : !record.daXoa ? (
                        <>
                            <Button style={{ marginRight: 8 }} onClick={() => handleChangeRole(record)}>Thay quyền</Button>
                            <Button>Khóa tk</Button>
                        </>
                    ) : <p>Tài khoản đã bị xóa</p>}
                </div>
            ),
        }
    ];

    useEffect(() => {
        const getListNguoiDung = async () => {
            const result = await apiKey.get("/Login/GetDsNguoiDung");
            setListUser(result.data.data);
        };
        getListNguoiDung();
    }, []);

    const handleClickAddUser = () => {
        setSelectedUser(null);
        setModalVisible(true);
    };

    const handleChangeRole = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSearchUsers = async () => {
        const data = { search };
        const result = await searchUserAction(data);
        if (result.success === 200) {
            setSearchUser(result.data);
            setIsSearching(true);
        }
    };

    const onRoleUpdate = (updatedRole) => {
        const updatedUsers = listUser.map(user => 
            user.email === selectedUser.email ? { ...user, tenQuyen: updatedRole } : user
        );
        setListUser(updatedUsers);
        setModalVisible(false);
    };

    return (
        <>
            <div className='flex flex-row justify-between items-center mb-1'>
                <h1>Danh sách tài khoản</h1>
                <input
                    className='w-3/4'
                    placeholder='Tìm kiếm'
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchUsers();
                        }
                    }}
                />
                <Button onClick={handleClickAddUser} type="primary">Thêm tài khoản</Button>
            </div>
            <Table columns={columns} dataSource={isSearching ? searchUser : listUser} />
            <Modal active={modalVisible}>
                <ModalContent onClose={closeModal}>
                    {selectedUser ? (
                        <ChooseRoles user={selectedUser} onClose={closeModal} onRoleUpdate={onRoleUpdate} />
                    ) : (
                        <AddUser onClose={closeModal} />
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
