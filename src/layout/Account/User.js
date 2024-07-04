import React, { useEffect, useState } from 'react'
import Modal, { ModalContent } from '../../components/Modal'
import { useDispatch } from 'react-redux'

import { Button, Space, Table, Tag } from 'antd';
import { render } from '@testing-library/react';
import { apiKey } from '../../service/http';
import dayjs from 'dayjs';
import AddUser from './AddUser';
import { searchUserAction } from '../../service/actions/UserAction';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
export default function User() {
    // const user = useSelector(state => state.auth.login?.user)
    const [listUser, setListUser] = useState([])
    const [choose, setChoose] = useState(null)
    const [roles, setRoles] = useState([])
    const [id, setId] = useState("")
    const [modalRole, setModalRole] = useState(false)
    const [search, setSearch] = useState();
    const [searchUser, setSearchUser] = useState();
    const [type1, setType1] = useState(true);
    const dispatch = useDispatch()
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
            render: (th) => <Tag color={th ? "green" : "volcano"} > {th ? "True" : "False"}</Tag>


        },
        {
            title: 'Đã xóa',
            dataIndex: 'daXoa',
            key: 'daXoa',
            render: (th) => <Tag color={th ? "green" : "volcano"} > {th ? "True" : "False"}</Tag>
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
                    {_.tenQuyen === "Admin" ? <p>Bạn không có quyền</p> : !_.daXoa ? <>    <Button style={{
                        marginRight: 1,
                    }} onClick={() => {

                        if (_.tenQuyen === "Admin") {
                            handleChangeRole(1)
                        } else {
                            handleChangeRole(2)
                        }

                    }}><EditOutlined /></Button>
                        <Button><DeleteOutlined /></Button></> : <p>Tài khoản đã bị xóa</p>}


                </div>
            ),
        },
    ];
    useEffect(() => {
        const getListNguoiDung = async () => {
            const result = await apiKey.get("/Login/GetDsNguoiDung");
            setListUser(result.data.data)
        }
        getListNguoiDung()
    }, [])
    // const onClickRole = (e) => {
    //     const role = document.getElementById(`roles-${e.target.name}`).innerText
    //     setModalRole(true)
    //     setRoles(role.length === 0 ? [] : role.split(', '))
    // }
    // const onClickShow = (e) => {
    //     if (choose === e.target.id) {
    //         setChoose(null)
    //         setId(null)
    //     }
    //     else {
    //         setChoose(e.target.id)
    //         setId(e.target.id)
    //     }
    // }

    // const onClickDelete = async (e) => {
    //     if (id) {
    //         console.log(id)
    //         apiMain.deleteAccount(user, dispatch, loginSuccess, { id: id })
    //             .then(res => {
    //                 console.log(res)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     }
    // }

    // const onClickActive = async (e) => {
    //     if (id) {
    //         apiMain.activeByAdmin(user, dispatch, loginSuccess, { id })
    //             .then(res => {
    //                 const newList = listUser.map(item => { return item._id === res?._id ? res : item })
    //                 setListUser(newList)
    //                 toast.success("Kích hoạt thành công")
    //             })
    //             .catch(err => {
    //                 toast.error("Kích hoạt thất bại")
    //             })
    //     }
    // }

    // const onClickInActive = async (e) => {
    //     if (id) {
    //         apiMain.inactiveByAdmin(user, dispatch, loginSuccess, { id })
    //             .then(res => {
    //                 const newList = listUser.map(item => { return item._id === res?._id ? res : item })
    //                 setListUser(newList)
    //                 toast.success("Khoá thành công", { hideProgressBar: true, pauseOnHover: false, autoClose: 1000 })
    //             })
    //             .catch(err => {
    //                 toast.error("Khoá thất bại", { hideProgressBar: true, pauseOnHover: false, autoClose: 1000 })
    //             })
    //     }
    // }

    // const closeModalRole = useCallback(() => {
    //     setModalRole(false)
    // })
    // const hideMenu = (e) => {
    //     setChoose(null)
    // }

    // useEffect(() => {
    //     const loadUsers = async () => {
    //         apiMain.getAllUser(user, props.dispatch, loginSuccess)
    //             .then(res => {
    //                 setListUser(res)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     }
    //     loadUsers();
    // }, [])
    const handleClickAddUser = () => {
        setModalRole(true);
        setChoose(true)
    }
    const handleChangeRole = (roles) => {
        setModalRole(true);
        setChoose(false);
        setRoles(roles)
    }
    const closeModalRole = () => {
        setModalRole(false);
        setChoose(false)
    }
    const handleSearchUsers = async () => {
        const data = {
            search: search
        }
        const result = await searchUserAction(data);
        if (result.success == 200) {
            console.log(result)
            setSearchUser(result.data);
            setType1(false)
        }
    }
    return (
        <>
            <div className='flex flex-row justify-between items-center mb-1'>
                <h1>Danh sách tài khoản</h1>
                <input className='w-3/4' placeholder='Tìm kiếm' onChange={(e) => {
                    setSearch(e.target.value)
                }} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearchUsers()
                    }
                }}></input>
                <Button
                    onClick={handleClickAddUser}
                    type="primary"

                >
                    Thêm tài khoản
                </Button></div>

            <Table columns={columns} dataSource={type1 ? listUser : searchUser} />

            {/* {modalRole &&  */}
            <Modal active={modalRole}>
                <ModalContent
                    onClose={closeModalRole}
                >
                    {choose ? <AddUser></AddUser> : <ChooseRoles roles={roles} userId={id} />}

                </ModalContent>
            </Modal>
            {/* } */}

        </>

    )
}




const roleBase = [
    {
        id: 1,
        tenQuyen: "Admin"
    },
    {
        id: 2,
        tenQuyen: "User"
    }

]
const ChooseRoles = (props) => {
    // const user = useSelector(state=>state.auth.login?.user)
    const { roles, userId } = props;
    console.log(roles)
    const [role, setRole] = useState();
    useEffect(() => {
        setRole(roles)
    }, [])

    // const dispatch = useDispatch();

    // const  onClickUpdateRole =async(e)=>{
    //   e.preventDefault();
    //   const params = {roles,id:props.userId}
    //   if(user)
    //   apiMain.updateRole(user,dispatch,loginSuccess,params)
    //     .then(res => {
    //       toast.success("Cập nhật quyền thành công",{hideProgressBar:true,autoClose:1200,pauseOnHover:false})
    //     })
    //     .catch(err=>{
    //       let _=err.response?.details?.message
    //       toast.error(_,{hideProgressBar:true,autoClose:1200,pauseOnHover:false})
    //     })


    // }

    // const onClickChooseRole=(e)=>{

    //   if(e.target.name){
    //     let role=e.target.name

    //     if(roles.includes(role)){
    //       let newRoles = roles.filter((item)=>{
    //         return item !==role
    //       })
    //       if(newRoles.length===0){
    //         toast.warning("Phải chọn ít nhất một quyền",{hideProgressBar:true,autoClose:1200})
    //         return
    //       }
    //       setRoles(newRoles)
    //     }
    //     else{
    //        setRoles([...roles,role])
    //     }
    //   }
    // }
    return (
        <>

            <div className="w-80">
                <form action="#">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input id="name" name="name" placeholder="John Doe" type="text" required defaultValue className="appearance-none block w-full px-3 py-2  border-blue-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-600 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input id="name" name="name" placeholder="John Doe" type="text" required defaultValue className="appearance-none block w-full px-3 py-2  border-blue-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-600 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input id="name" name="name" placeholder="John Doe" type="text" required defaultValue className="appearance-none block w-full px-3 py-2  border-blue-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-600 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input id="name" name="name" placeholder="John Doe" type="text" required defaultValue className="appearance-none block w-full px-3 py-2  border-blue-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-600 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input id="name" name="name" placeholder="John Doe" type="text" required defaultValue className="appearance-none block w-full px-3 py-2  border-blue-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-600 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input id="name" name="name" placeholder="John Doe" type="text" required defaultValue className="appearance-none block w-full px-3 py-2  border-blue-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-600 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input id="name" name="name" placeholder="John Doe" type="text" required defaultValue className="appearance-none block w-full px-3 py-2  border-blue-500 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-600 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>

    )
}
