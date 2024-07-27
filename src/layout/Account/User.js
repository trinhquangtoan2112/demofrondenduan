import React, { useEffect, useState } from 'react';
import Modal, { ModalContent } from '../../components/Modal';
import { useDispatch } from 'react-redux';
import { Button, Table, Tag, DatePicker, Form, Input, InputNumber, Checkbox, Select, message, Popconfirm, } from 'antd';

import dayjs from 'dayjs';
import AddUser from './AddUser';
import { AddUserByAdmin, deleteUserAdmin, getUserInAdmin, searchUserAction, UpdateUserByAdmin } from '../../service/actions/UserAction';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import ChooseRoles from './ChooseRoles';
import { apiKey } from '../../service/http';

export default function User() {
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(false);
    const [addUser, setAddUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [searchUser, setSearchUser] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [id, setId] = useState(null);
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

                    {_.tenQuyen === "Admin" ? <p>Bạn không có quyền</p> : !_.daXoa ? <>    <Button onClick={() => {


                        handleClickEditUser(_.maNguoiDung)
                    }}><UserOutlined
                        /></Button>
                        <Button
                            onClick={() => handleChangeRole(record)}
                        ><EditOutlined /></Button>
                        <Popconfirm
                            title="Khóa người dùng"
                            description="Bạn có chắc muốn khóa tài khoản không?"
                            onConfirm={() => {
                                handleDelete(_.maNguoiDung)
                            }}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button><DeleteOutlined /></Button>
                        </Popconfirm>
                    </> : < p > Tài khoản đã bị xóa</ p>}


                </div >
            ),
        }
    ];
    const cancel = (e) => {
        message.error('Bạn đã hủy');
    };
    const getListNguoiDung = async () => {
        console.log('getListNguoiDung')
        const result = await apiKey.get("/Login/GetDsNguoiDung");
        setListUser(result.data.data);
    };
    useEffect(() => {

        getListNguoiDung();
    }, []);

    const handleClickAddUser = () => {
        setAddUser(true);
        setModalVisible(true);
        setSelectedUser(false)
    };

    const handleDelete = async (id) => {

        const reslut = await deleteUserAdmin(id);
        if (reslut) {
            getListNguoiDung();
        }
    }
    const handleClickEditUser = (id) => {
        setId(id);
        setAddUser(false);
        setModalVisible(true);
        setSelectedUser(false)
    };
    const handleChangeRole = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
    };

    const closeModal = () => {
        setId(null)
        setModalVisible(false);
    };

    const handleSearchUsers = async () => {
        const data = { search };
        if (search != "" && search != null) {
            const result = await searchUserAction(data);
            if (result.success === 200) {
                setSearchUser(result.data);
                setIsSearching(true);
            }
        } else {
            setIsSearching(false);
            getListNguoiDung()
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
                    onChange={(e) => setSearch(e.target.value.trim())}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchUsers();
                        }
                    }}
                />
                <Button onClick={handleClickAddUser} type="primary">Thêm tài khoản</Button>
            </div>
            <Table columns={columns} dataSource={isSearching ? searchUser : listUser ? listUser : null} />
            <div className={selectedUser ? null : 'add-user-admin'}>

                <Modal active={modalVisible}>
                    <ModalContent onClose={closeModal}>
                        {selectedUser ? (
                            <ChooseRoles user={selectedUser} onClose={closeModal} onRoleUpdate={onRoleUpdate} />
                        ) : addUser ? (
                            <AddUserModal onClose={closeModal} getListNguoiDung={getListNguoiDung} />
                        ) : <EditUserModal onClose={closeModal} getListNguoiDung={getListNguoiDung} id={id}></EditUserModal>}
                    </ModalContent>
                </Modal>
            </div>

        </>

    )
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 60,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const dateFormat = "DD-MM-YYYY";
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const AddUserModal = (props) => {
    const { onClose, getListNguoiDung } = props
    const dispatch = useDispatch();
    const date = new Date();
    let currentDay = date.getDate() + "/"
        + (date.getMonth() + 1) + "/"
        + date.getFullYear()
    const [form] = Form.useForm();
    const [data, setData] = useState({
        "tenNguoiDung": "",
        "matKhau": "",
        "email": "",
        "ngaySinh": currentDay,
        "gioiTinh": "Nam",
        "anhDaiDien": "https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg",
        "trangThai": true,
        "daXoa": false,
        "soDeCu": 0,
        "soXu": 0,
        "soChiaKhoa": 0,
        "vip": false,
        "ngayHetHanVip": currentDay,
        "maQuyen": 1
    });
    const onFinish = async (values) => {
        if (values.ngayHetHanVip !== undefined) {
            values.ngayHetHanVip = values.ngayHetHanVip.$d
        } else {
            values.ngayHetHanVip = null
        }

        values.ngaySinh = values.ngaySinh.$d
        values.anhDaiDien = data.anhDaiDien;
        if (values.gioiTinh === undefined) {
            values.gioiTinh = data.gioiTinh
        }
        if (values.maQuyen === undefined) {
            values.maQuyen = data.maQuyen
        }
        if (values.Vip === undefined) {
            values.Vip = data.vip
        }
        if (values.Vip === undefined) {
            values.Vip = data.vip
        }

        await setData({
            ...data,
            "tenNguoiDung": values.tenNguoiDung,
            "matKhau": values.matKhau,
            "email": values.email,
            "ngaySinh": values.ngaySinh,
            "gioiTinh": values.gioiTinh,
            "anhDaiDien": "https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg",
            "trangThai": true,
            "daXoa": false,
            "soDeCu": values.soDeCu,
            "soXu": values.soXu,
            "soChiaKhoa": values.soChiaKhoa,
            "vip": values.Vip,
            "ngayHetHanVip": values.ngayHetHanVip,
            "maQuyen": values.maQuyen
        })
        const result = await AddUserByAdmin(data);
        if (result) {
            getListNguoiDung()
            form.resetFields();
            onClose()
        }
    };


    const onCancel1 = () => {


        form.resetFields();
        onClose()
    }

    return (
        <Form
            {...formItemLayout}
            form={form}

            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <Form.Item
                name="tenNguoiDung"
                label="UserName"
                rules={[
                    {
                        required: true,
                        message: 'Please input your UserName!',
                        whitespace: true,
                    },
                    {
                        min: 4,
                        message: "Too short"
                    },
                    {
                        max: 25,
                        message: "Too long"
                    }
                ]}
                validateTrigger='onSubmit'
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    {
                        min: 6,
                        message: "Too short"
                    },
                    {
                        max: 30,
                        message: "Too long"
                    }
                ]}
                validateTrigger='onSubmit'
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="gioiTinh"
                label="Giới tính"
                rules={[
                ]}
            >
                <Select defaultValue={data.gioiTinh} onChange={(value) => {

                }} options={[
                    {
                        value: 'Nam',
                        label: 'Nam',
                    },
                    {
                        value: 'Nữ',
                        label: 'Nữ',
                    },

                ]}>

                </Select>
            </Form.Item>
            <Form.Item
                name="maQuyen"
                label="Quyền"
                rules={[
                ]}
            >
                <Select onChange={(value) => {

                }} options={[
                    {
                        value: '1',
                        label: 'Admin',
                    },
                    {
                        value: '2',
                        label: 'User',
                    },

                ]}>

                </Select>
            </Form.Item>
            <Form.Item
                name="Vip"
                label="Vip"
                rules={[

                ]}
                validateTrigger='onSubmit'
                valuePropName="checked"
            >
                <Checkbox onChange={(value) => {
                    setData({
                        ...data,
                        vip: value.target.checked
                    })
                }}>Vip</Checkbox>
            </Form.Item>
            {data.vip ? <Form.Item
                label="Ngày hết hạn vip"
                name="ngayHetHanVip"
                rules={[
                    () => ({
                        validator(_, value) {

                            if (value === undefined || value === "" || value === null) {
                                return Promise.reject(new Error('Nhập ngày hết hạn vip!'));
                            } else {
                                if (value.$d > date) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(new Error('Khong phai la ngay cua tuong lai'));
                                }
                            }


                        },
                    }),

                ]}
                validateTrigger='onSubmit'
            >
                <DatePicker allowClear={false} format={dateFormat} />
            </Form.Item> : null}
            <Form.Item
                label="Ngày sinh"
                name="ngaySinh"
                rules={[
                    () => ({
                        validator(_, value) {

                            if (value === undefined || value === "" || value === null) {
                                return Promise.reject(new Error('Please input your birthDay!'));
                            } else {
                                if (value.$d > date) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(new Error('Khong phai la ngay cua tuong lai'));
                                }
                            }


                        },
                    }),

                ]}
                validateTrigger='onSubmit'
            >
                <DatePicker allowClear={false} format={dateFormat} />
            </Form.Item>
            <Form.Item
                name="soXu"
                label="Số xu"
                rules={[
                    {
                        required: true,
                        message: 'Xin hãy nhập giá trị',
                        whitespace: true,
                        transform(value) {
                            return Number(value)
                        },
                    },

                ]}
                validateTrigger='onSubmit'
            >
                <InputNumber key={data.soXu} />
            </Form.Item>

            <Form.Item
                name="soChiaKhoa"
                label="Số chìa khóa"
                rules={[
                    {
                        required: true,
                        message: 'Xin hãy nhập giá trị',
                        whitespace: true,
                        transform(value) {
                            return Number(value)
                        },
                    },

                ]}

                validateTrigger='onSubmit'
            >
                <InputNumber key={data.soChiaKhoa} />
            </Form.Item>
            <Form.Item
                name="soDeCu"
                label="Số đề cử"
                rules={[
                    {
                        required: true,
                        message: 'Xin hãy nhập giá trị',
                        whitespace: true,
                        transform(value) {
                            return Number(value)
                        },
                    },


                ]}
                validateTrigger='onSubmit'
            >
                <InputNumber key={data.soXu} />
            </Form.Item>
            <Form.Item
                name="matKhau"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: '',
                    },
                    () => ({
                        validator(_, value) {

                            if (value === undefined || value === "" || value === null) {
                                return Promise.reject(new Error('Please input your password!'));
                            }
                            else {
                                const checkPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#]).{6,30}$/;
                                if (checkPassword.test(value)) {
                                    return Promise.resolve();
                                } else if (!checkPassword.test(value)) {
                                    return Promise.reject(new Error('Mật khẩu không đúng định dạng'));
                                }
                            }

                        },
                    }),
                ]}
                validateTrigger='onSubmit'
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('matKhau') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
                validateTrigger='onSubmit'
            >
                <Input.Password />
            </Form.Item>
            <div className='w-full'>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Add user
                    </Button>
                    <Button type="" onClick={() => {
                        onCancel1()
                    }}>
                        Cancel
                    </Button>
                </Form.Item>
            </div>

        </Form >
    );
}

const EditUserModal = (props) => {
    const { onClose, getListNguoiDung, id } = props;
    console.log(id, "id")
    const date = new Date();
    let currentDay = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const dispatch = useDispatch();

    const [idUser, setIdUser] = useState(null)

    const [data, setData] = useState({
        "tenNguoiDung": "",
        "matKhau": "",
        "email": "",
        "ngaySinh": currentDay,
        "gioiTinh": "Nam",
        "anhDaiDien": "https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg",
        "trangThai": true,
        "daXoa": false,
        "soDeCu": 0,
        "soXu": 0,
        "soChiaKhoa": 0,
        "vip": false,
        "ngayHetHanVip": currentDay,
        "maQuyen": 1
    });

    useEffect(() => {

        if (id !== null) {
            setIdUser(id)
            const getDataById = async () => {
                const result = await getUserInAdmin(id);
                if (result !== null) {
                    setData({
                        ...data, vip: result.vip
                    })
                    await form.setFieldsValue({
                        gioiTinh: result.gioiTinh || 'Nam',
                        ngayHetHanVip: result.ngayHetHanVip ? dayjs(result.ngayHetHanVip) : null,
                        ngaySinh: result.ngaySinh ? dayjs(result.ngaySinh) : null,
                        soChiaKhoa: result.soChiaKhoa || 0,
                        soDeCu: result.soDeCu || 0,
                        soXu: result.soXu || 0,
                        tenNguoiDung: result.tenNguoiDung || '',
                        vip: result.vip ? true : false,
                    });
                }
            }
            getDataById()
        }
        return () => {
            setIdUser(null)
        }
    }, [id])
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        if (values.ngayHetHanVip !== undefined) {
            values.ngayHetHanVip = values.ngayHetHanVip.$d
        } else {
            values.ngayHetHanVip = null
        }

        values.ngaySinh = values.ngaySinh.$d
        values.anhDaiDien = data.anhDaiDien;
        if (values.gioiTinh === undefined) {
            values.gioiTinh = data.gioiTinh
        }

        if (values.vip === undefined) {
            values.vip = null
        }


        const result = await UpdateUserByAdmin(idUser, values)
        if (result) {
            onClose()
        }


    };


    const onCancel1 = () => {


        form.resetFields();
        onClose()
    }

    return (
        <Form
            {...formItemLayout}
            form={form}

            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >
            <Form.Item
                name="tenNguoiDung"
                label="UserName"
                rules={[
                    {

                        message: 'Please input your UserName!',
                        whitespace: true,
                    },
                    {
                        min: 4,
                        message: "Too short"
                    },
                    {
                        max: 25,
                        message: "Too long"
                    }
                ]}
                validateTrigger='onSubmit'
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="gioiTinh"
                label="Giới tính"
                rules={[
                ]}
            >
                <Select defaultValue={data.gioiTinh} onChange={(value) => {

                }} options={[
                    {
                        value: 'Nam',
                        label: 'Nam',
                    },
                    {
                        value: 'Nữ',
                        label: 'Nữ',
                    },

                ]}>

                </Select>
            </Form.Item>

            <Form.Item
                name="vip"
                label="Là Vip"
                rules={[

                ]}
                validateTrigger='onSubmit'
                valuePropName="checked"
            >
                <Checkbox onChange={(value) => {

                    setData({
                        ...data,
                        vip: value.target.checked
                    })
                }}></Checkbox>
            </Form.Item>
            {data.vip ? <Form.Item
                label="Ngày hết hạn"
                name="ngayHetHanVip"
                rules={[
                    () => ({
                        validator(_, value) {

                            if (value === undefined || value === "" || value === null) {
                                return Promise.reject(new Error('Nhập ngày hết hạn vip!'));
                            } else {
                                if (value.$d > date) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(new Error('Khong phai la ngay cua tuong lai'));
                                }
                            }


                        },
                    }),

                ]}
                validateTrigger='onSubmit'
            >
                <DatePicker allowClear={false} format={dateFormat} />
            </Form.Item> : null}
            <Form.Item
                label="Ngày sinh"
                name="ngaySinh"
                rules={[
                    () => ({
                        validator(_, value) {

                            if (value === undefined || value === "" || value === null) {
                                return Promise.reject(new Error('Please input your birthDay!'));
                            } else {
                                if (value.$d < date) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(new Error('Khong phai la ngay cua tuong lai'));
                                }
                            }


                        },
                    }),

                ]}
                validateTrigger='onSubmit'
            >
                <DatePicker allowClear={false} format={dateFormat} />
            </Form.Item>
            <Form.Item
                name="soXu"
                label="Số xu"
                rules={[
                    {

                        message: 'Xin hãy nhập giá trị',
                        whitespace: true,
                        transform(value) {
                            return Number(value)
                        },
                    },

                ]}
                validateTrigger='onSubmit'
            >
                <InputNumber key={data.soXu} />
            </Form.Item>

            <Form.Item
                name="soChiaKhoa"
                label="Số chìa khóa"
                rules={[
                    {

                        message: 'Xin hãy nhập giá trị',
                        whitespace: true,
                        transform(value) {
                            return Number(value)
                        },
                    },

                ]}

                validateTrigger='onSubmit'
            >
                <InputNumber key={data.soChiaKhoa} />
            </Form.Item>
            <Form.Item
                name="soDeCu"
                label="Số đề cử"
                rules={[
                    {

                        message: 'Xin hãy nhập giá trị',
                        whitespace: true,
                        transform(value) {
                            return Number(value)
                        },
                    },


                ]}
                validateTrigger='onSubmit'
            >
                <InputNumber key={data.soXu} />
            </Form.Item>
            <div className='w-full'>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Update User                    </Button>
                    <Button type="" onClick={() => {
                        onCancel1()
                    }}>
                        Cancel
                    </Button>
                </Form.Item>
            </div>

        </Form >
    );
}



