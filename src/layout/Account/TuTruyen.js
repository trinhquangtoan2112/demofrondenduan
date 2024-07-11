import React, { useCallback, useEffect, useState } from 'react'
import Readdding from './../../components/Readdding';
import LoadingData from './../../components/LoadingData';
import avt from '../../assets/img/avt.png'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Grid from '../../components/Grid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnTruyen, AnTruyenAction, DangChuongTruyenAction, DangTruyen, GetCHiTietChuongTruyen, GetChuongTruyenTheoIDTruyen, GetThongTinTruyen, GetTruyenTheoButDanh, HienTruyenAction, SuaChuongTruyenAction, SuaTruyen } from '../../service/actions/TruyenAction';
import { AddUserByAdmin, deleteUserAdmin, getUserInAdmin, searchUserAction, UpdateUserByAdmin } from '../../service/actions/UserAction';
import { Button, Table, Tag, DatePicker, Form, Input, InputNumber, Checkbox, Select, message, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';

import dayjs from 'dayjs';
import { GetButDanhTheoTokenAction, ThemButDanhAction } from '../../service/actions/ButDanhAction';
import Modal, { ModalContent } from '../../components/Modal';
const nav = [
    {
        path: 'reading',
        display: 'Đang đọc'
    },
    {
        path: 'saved',
        display: 'Đánh dấu'
    },
    {
        path: 'created',
        display: 'Đã đăng'
    },
]
const types = [
    {
        id: 1,
        tenTag: "Tiên Hiệp"
    },
    {
        id: 2,
        tenTag: "Kiếm hiệp"
    },
    {
        id: 3,
        tenTag: "Dã sử"
    },
    {
        id: 4,
        tenTag: "Kì ảo"
    },
    {
        id: 5,
        tenTag: "Huyễn Huyền"
    },
    {
        id: 6,
        tenTag: "Khoa Huyễn"
    },
    {
        id: 7,
        tenTag: "Ngôn tình"
    },
]
export default function TuTruyen(props) {
    const { id } = useParams();
    const [list, setList] = useState()
    console.log(list)
    const getBang = async () => {
        const result = await GetTruyenTheoButDanh(id);
        console.log(result)
        if (result.status === 200) {
            setList(result.data)
        }
    }
    useEffect(() => {
        getBang()
    }, [])
    const cancel = (e) => {
        message.error('Bạn đã hủy');
    };
    const AnTruyen = async (id1) => {
        const result = await AnTruyenAction(id1);
        if (result) {
            message.success("Thành công ẩn truyện")
            getBang()
        }
    };
    const HienTruyen = async (id1) => {
        const result = await HienTruyenAction(id1);
        if (result) {
            message.success("Thành công hiện truyện")
            getBang()
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
            title: 'Ngày Cập nhập',
            dataIndex: 'ngayCapNhat',
            key: 'ngayCapNhat',
            render: (th) => <>{th != null ? <p>{dayjs(th).format("DD-MM-YYYY")}</p> : <p>Không có</p>} </>
        },
        {
            title: 'Lượt đọc',
            dataIndex: 'luotdoc',
            key: 'luotdoc',
            render: (th) => <>{th != null ? <p>{th}</p> : <p>Không xác định</p>} </>
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
            title: 'Có phí',
            dataIndex: 'coPhi',
            key: 'coPhi',
            render: (th) => <>{th ? <i className="fa fa-check bg-green-500 p-2 rounded-2xl" />
                : <p>Không</p>} </>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                < div >
                    <Link to={`/CapNhapTruyen/${_.maTruyen}`}><Button><EditOutlined /></Button></Link>
                    <Link to={`/QuanLyChuong/${_.maTruyen}`}><Button><FormOutlined /></Button></Link>
                    {_.congBo == 1 ? <Popconfirm
                        title="Ẩn truyện"
                        description="Bạn có chắc muốn ẩn truyện ko không?"
                        onConfirm={() => {
                            AnTruyen(_.maTruyen)
                        }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button><EyeInvisibleOutlined /></Button>
                    </Popconfirm> : <Popconfirm
                        title="Hiện người dùng"
                        description="Bạn có chắc muốn hiện người dùng không?"
                        onConfirm={() => {
                            HienTruyen(_.maTruyen)
                        }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button><EyeOutlined /></Button>
                    </Popconfirm>}
                </div >
            ),
        }
    ];
    const nav = useNavigate();
    const onClickAddChapter = () => {
        nav(`/DangTruyen/${id}`)
    }
    return (
        <>

            <button className='btn-primary' style={{ 'margin': '0px 10px' }}
                onClick={onClickAddChapter}
            >Thêm truyện</button>
            {list ? <h1>Truyện của: {list[0]?.tenButDanh}</h1> : null}
            <Table columns={columns} dataSource={list ? list : null} />


        </>
    )
}


export const Readings = (props) => {
    const { dispatch, user } = props
    const [readings, setReadings] = useState([])
    useEffect(async () => {

    }, [])

    return (
        <div>
            {
                readings.map((item, i) => <div key={item._id} >
                    <Readdding data={{
                        tentruyen: item.dautruyenId.tentruyen,
                        hinhanh: item.dautruyenId.hinhanh,
                        dadoc: item.chapNumber,
                        total: item.dautruyenId?.sochap,
                        url: item.dautruyenId.url
                    }} />
                    <hr /></div>)

            }</div>)
}
export const StoryCreate = (props) => {
    // const { userInfo } = props;
    const [storys, setStorys] = useState([])
    const [listChap, setListChap] = useState(false)
    const [editNovel, setEditNovel] = useState(false)
    // const user = useSelector(state => state.auth.login.user)
    // const dispatch = useDispatch()
    const [url, setUrl] = useState('')


    const onClickUpdateStory = (e) => {
        setEditNovel(true)
        setUrl(e.target.name)
    }
    const onClickBackFromListChap = useCallback(() => {
        setListChap(false)
        setEditNovel(false)
    })

    const onClickTruyen = (e) => {
        setUrl(e.target.name)
        setListChap(true)
    }
    const onClickBackFromEditNovel = useCallback(() => {
        setEditNovel(false)
    })
    return (<>
        {/* {listChap ? */}
        <ListChap onClickBackFromListChap={onClickBackFromListChap}
        // url={url} user={user} 
        />
        {/* :
            editNovel 
            ? 
            <EditNovel url={url} user={user} dispatch={dispatch} onClickBackFromEditNovel={onClickBackFromEditNovel} /> :
                storys.map(data => {
                    return (<div key={data._id}>
                        <div className="reading-card">
                            <div className="reading-card__img-wrap">
                                <img src={data.hinhanh} alt="" />
                            </div>
                            <div className="reading-card__content">
                                <a onClick={onClickTruyen} name={data?.url} className="reading-card__title">
                                    {data.tentruyen}
                                </a>
                                <div className="d-flex" style={{ 'gap': '15px' }}>
                                    <a onClick={onClickUpdateStory} name={data.url}><i className="fa-solid fa-marker"></i> Sửa</a>
                                    <a onClick={onClickDeleteStory} name={data.url}><i className="fa-solid fa-trash"></i> Xoá</a>

                                </div>
                            </div>

                        </div><hr /></div>
                    )
                }) 
         } */}
    </>
    )
}

export const ListChap = (props) => {
    const { idChuong } = useParams()
    console.log(idChuong)
    const [chapters, setChapters] = useState([])
    // const location = useLocation()
    const [addChap, setAddChap] = useState(false)
    const [chapnumber, setChapnumber] = useState(null)
    const nav = useNavigate()
    const onClickUpdateChap = (e) => {
        setChapnumber(e.target.name)
        setAddChap(true)
    }
    const getData = async () => {
        const result = await GetChuongTruyenTheoIDTruyen(idChuong)
        console.log(result)
        if (result.status == 200) {
            setChapters(result.data)
        } else {
            setChapters(null)
        }
    }
    useEffect(() => {
        getData()
    }, [idChuong])
    // const onClickDeleteChap = (e) => {
    //   if (e.target.name) {
    //     apiMain.deleteChapter({ url, chapnumber: e.target.name }, user, dispatch, loginSuccess)
    //       .then(res => {
    //         getChapter()
    //         toast.success(res.message, { hideProgressBar: true, autoClose: 1000, pauseOnHover: false })
    //       })
    //       .catch(err => {
    //         console.log(err)
    //         toast.error(err.response.details.message, { hideProgressBar: true, autoClose: 1000, pauseOnHover: false })
    //       })
    //   }
    // }

    // const getChapter = useCallback(async () => {
    //   apiMain.getNameChapters(url, {})
    //     .then(res => setChapters(res))})

    // useEffect(() => {
    //     getChapter()
    // }, [])
    console.log(chapters)
    const onClickAddChapter = (e) => {
        e.preventDefault()
        setAddChap(true)
        setChapnumber(null)
    }
    const onClickBackFromAddChap = useCallback(() => {
        setAddChap(false)
    })
    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    return (
        <>
            {/* {
            addChap ? <AddChapter url={url} chapnumber={chapnumber} user={user} dispatch={dispatch}
                onClickBackFromAddChap={onClickBackFromAddChap}
                getChapters={getChapter} /> : */}

            <div>
                <div className='d-flex mb-1' style={{ 'justifyContent': 'space-between' }}>

                    <a onClick={() => { nav(-1) }}
                    //  onClick={onClickBackFromListChap}
                    ><i className="fa-solid fa-angle-left"></i> Danh sách truyện</a>
                    <span className='fs-20 fw-6'>Danh sách chương</span>
                    <Link to={`/ThemTruyen/${idChuong}`}><button className='btn-primary' style={{ 'margin': '0px 10px' }}

                    >Thêm chương</button></Link>
                </div>
                <Grid gap={15} col={2} snCol={1}>
                    {
                        chapters.map((item, index) => {
                            return (
                                <div key={item.machuongtruyen}>
                                    <div className='d-flex'>
                                        <div className="col-9 d-flex" style={{ 'alignItems': 'center' }}>
                                            <p key={item.machuongtruyen} name={item.tenChuong} className='text-overflow-1-lines'>Chương {item.stt}: {item.tenChuong}</p>
                                        </div>
                                        <div className="col-3">
                                            <Link to={`/ChinhSuaChuong/${item.machuongtruyen} `}
                                                // onClick={onClickUpdateChap}
                                                className=''><Button><EditOutlined /></Button> </Link>
                                            <Popconfirm
                                                title="Bạn có muốn ẩn truyện không"
                                                description="Bạn có chắc không?"
                                                onConfirm={confirm}
                                                onCancel={cancel}
                                                okText="Có"
                                                cancelText="Không"
                                            >
                                                <Button><DeleteOutlined /></Button>
                                            </Popconfirm>

                                        </div>
                                    </div><hr /></div>
                            )
                        })
                    }
                </Grid>
            </div>
            {/* } */}
        </>
    )
}
export const ListButDanh = (props) => {
    const { idNguoiDung } = useParams()
    console.log(idNguoiDung)
    const [chapters, setChapters] = useState([])
    // const location = useLocation()
    const [tenButDanh, setTenButDanh] = useState()
    const [chapnumber, setChapnumber] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);

    const nav = useNavigate()
    const onClickUpdateChap = (e) => {
        setChapnumber(e.target.name)

    }
    const getData = async () => {
        const result = await GetButDanhTheoTokenAction()
        console.log(result)
        if (result.status == 200) {
            setChapters(result.data)
        } else {
            setChapters(null)
        }
    }
    useEffect(() => {
        getData()
    }, [idNguoiDung])
    // const onClickDeleteChap = (e) => {
    //   if (e.target.name) {
    //     apiMain.deleteChapter({ url, chapnumber: e.target.name }, user, dispatch, loginSuccess)
    //       .then(res => {
    //         getChapter()
    //         toast.success(res.message, { hideProgressBar: true, autoClose: 1000, pauseOnHover: false })
    //       })
    //       .catch(err => {
    //         console.log(err)
    //         toast.error(err.response.details.message, { hideProgressBar: true, autoClose: 1000, pauseOnHover: false })
    //       })
    //   }
    // }

    // const getChapter = useCallback(async () => {
    //   apiMain.getNameChapters(url, {})
    //     .then(res => setChapters(res))})

    // useEffect(() => {
    //     getChapter()
    // }, [])
    console.log(chapters)
    const onClickAddChapter = (e) => {
        e.preventDefault()

        setChapnumber(null)
    }
    const onClickBackFromAddChap = useCallback(() => {

    })
    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };
    const closeModal = () => {
        setModalVisible(false)
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const ThemButDanh = async (e) => {
        e.preventDefault();
        const data = {
            tenButDanh
        }
        const result = await ThemButDanhAction(data)
    }
    return (
        <>
            {/* {
            addChap ? <AddChapter url={url} chapnumber={chapnumber} user={user} dispatch={dispatch}
                onClickBackFromAddChap={onClickBackFromAddChap}
                getChapters={getChapter} /> : */}

            <div className='mt-2'>
                <div className='d-flex mb-1' style={{ 'justifyContent': 'space-between' }}>

                    <a onClick={() => { nav(-1) }}
                    //  onClick={onClickBackFromListChap}
                    ><i className="fa-solid fa-angle-left"></i> Danh sách truyện</a>
                    <span className='fs-20 fw-6'>Danh sách chương</span>
                    <button className='btn-primary' style={{ 'margin': '0px 10px' }} onClick={() => { setModalVisible(true) }}> Thêm bút danh</button>
                </div>
                <Grid gap={15} col={2} snCol={1}>
                    {
                        chapters.map((item, index) => {
                            return (
                                <div key={item.maButDanh}>
                                    <div className='d-flex'>
                                        <div className="col-9 d-flex" style={{ 'alignItems': 'center' }}>
                                            <Link className='cursor-pointer
                    '  to={`/QuanLyTruyen/${item.maButDanh}`}>{item.tenButDanh}</Link>
                                        </div>
                                        <div className="col-3">
                                            <Link to={`/ChinhSuaChuong/${item.maButDanh} `}
                                                // onClick={onClickUpdateChap}
                                                className=''><Button><EditOutlined /></Button> </Link>
                                            <Popconfirm
                                                title="Bạn có muốn khóa bút danh không"
                                                description="Bạn có chắc không?"
                                                onConfirm={confirm}
                                                onCancel={cancel}
                                                okText="Có"
                                                cancelText="Không"
                                            >
                                                <Button><DeleteOutlined /></Button>
                                            </Popconfirm>

                                        </div>
                                    </div><hr /></div>
                            )
                        })
                    }
                </Grid>

                <Modal active={modalVisible}>
                    <ModalContent onClose={closeModal}>

                        <form className="max-w-sm mx-auto" onSubmit={ThemButDanh}>
                            <div className="mb-5 flex flex-col items-center">
                                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 ">Nhập vào tên bút danh</label>

                                <input onChange={(e) => {
                                    setTenButDanh(e.target.value)
                                }} className="bg-gray-50 border  text-gray-900 text-sm rounded-lg ring-blue-500 border-blue-500 block w-full p-2.5 " placeholder="Tên bút danh" required />
                                <button type="submit" className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                            </div>
                        </form>


                    </ModalContent>
                </Modal>
            </div >
            {/* } */}
        </>
    )
}
export const AddChapter = () => {
    const { idChuong } = useParams()
    const nav = useNavigate()
    const [content, setContent] = useState("")
    const [tenchuong, setTenchuong] = useState("")
    const [edit, setEdit] = useState(false)
    const onChangeTenchuong = (e) => {
        setTenchuong(e.target.value)
    }
    const CapNhap = async () => {
        const data = {
            tenchuong,
            noiDung: edit,
            maTruyen: idChuong
        }

        const result = await DangChuongTruyenAction(data);
        console.log(result)
    }

    const labelStyle = { 'minWidth': '100px', 'margin': '5px 0px', 'display': 'inline-block' }
    return (<>
        <div>
            <a onClick={() => { nav(-1) }}
            //  onClick={onClickBackFromListChap}
            ><i className="fa-solid fa-angle-left"></i> Danh sách Chương</a>
        </div>
        <div className="group-info" style={{ 'marginBottom': '10px' }}>
            <label htmlFor="" className='fs-16' style={labelStyle}>Tên chương</label>
            <input onChange={onChangeTenchuong} value={tenchuong || ""} />
        </div>
        <label htmlFor="" className='fs-16' style={labelStyle}>Nội dung chương</label>
        <CKEditor
            editor={ClassicEditor}
            data={edit || ''}
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                setEdit(editor.getData())
            }}
            onBlur={(event, editor) => {
                console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                console.log('Focus.', editor);
            }}
        />
        <div className='d-flex'>
            {/* {
            edit ?  */}
            <button className='btn-primary'
                onClick={CapNhap}
                style={{ 'margin': '20px auto' }}>Thêm chương</button>

            {/* : <button className='btn-primary' onClick={onClickAddChapter} style={{ 'margin': '20px auto' }}>Thêm chương</button>} */}


        </div>
    </>)
}
export const EditChapter = () => {
    const { idChuong } = useParams();
    const nav = useNavigate()

    const [content, setContent] = useState("")
    const [tenchuong, setTenchuong] = useState("")
    const [edit, setEdit] = useState(false)
    const onChangeTenchuong = (e) => {
        setTenchuong(e.target.value)
    }
    const CapNhap = async () => {
        const data = {
            tenchuong,
            noiDung: edit
        }

        const result = await SuaChuongTruyenAction(idChuong, data);
        console.log(result)
    }
    const GetTruyen = async () => {
        const result = await GetCHiTietChuongTruyen(idChuong);
        console.log(result)
        setTenchuong(result.data.tenChuong);
        setEdit(result.data.noiDung);
    }
    useEffect(() => {
        GetTruyen()
    }, [idChuong])
    const labelStyle = { 'minWidth': '100px', 'margin': '5px 0px', 'display': 'inline-block' }
    return (
        <>
            <div>
                <a onClick={() => { nav(-1) }}
                //  onClick={onClickBackFromListChap}
                ><i className="fa-solid fa-angle-left"></i> Danh sách chương</a>
            </div>
            <div className="group-info" style={{ 'marginBottom': '10px' }}>
                <label htmlFor="" className='fs-16' style={labelStyle}>Tên chương</label>
                <input onChange={onChangeTenchuong} value={tenchuong || ""} />
            </div>
            <label htmlFor="" className='fs-16' style={labelStyle}>Nội dung chương</label>
            <CKEditor
                editor={ClassicEditor}
                data={edit || ''}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    setEdit(editor.getData())
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            <div className='d-flex'>
                {/* {
                edit ?  */}
                <button className='btn-primary'
                    onClick={CapNhap}
                    style={{ 'margin': '20px auto' }}>Cập nhật chương</button>

                {/* : <button className='btn-primary' onClick={onClickAddChapter} style={{ 'margin': '20px auto' }}>Thêm chương</button>} */}


            </div>
        </>)
}



export function EditNovel() {
    const { id } = useParams();

    const [image, setImage] = useState("");
    const [preview, setPreview] = useState(avt)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tacgia, setTacgia] = useState("");
    const [theloai, setTheloai] = useState("");

    const [ckValue, setCkValue] = useState(true);

    const [trangthai, settrangthai] = useState(true)

    const handleCreate = async (e) => {
        e.preventDefault()
        const form = new FormData();
        form.append('tenTruyen', name);
        form.append('moTa', description);
        form.append('MaTheLoai', theloai);
        form.append('TrangThai', trangthai);
        form.append('anhBia', image);
        const result = await SuaTruyen(id, form);
        if (result) {
            setCkValue(" ")
            setTimeout(() => {
                setCkValue(true)
            }, [1])
            setName("")
            setDescription("")
            setPreview(avt)
        }
    }
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeImage = (e) => {
        if (e.target.files.lenght !== 0) {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
    }
    useEffect(() => {
        const getData = async () => {
            const result = await GetThongTinTruyen(id);
            setImage(null);
            setPreview(result.anhBia)
            setName(result.tenTruyen);
            setTheloai(result.maTheLoai)
            setDescription(result.moTa)
            settrangthai(result.trangThai)
        }
        getData();

    }, [])


    console.log(theloai)
    const labelStyle = { 'minWidth': '100px', 'display': 'inline-block' }
    return (
        <div className="">

            <div className="profile__wrap ">
                <div className="profile__main ">
                    <form className=' d-flex flex-row flex-wrap items-center'>
                        <div className="group-info col-3">
                            <label htmlFor="" style={labelStyle}>Tên truyện</label>
                            <input
                                onChange={onChangeName}
                                value={name || ""} />
                        </div>

                        {/* <div className="group-info col-3">
                                <label style={labelStyle}>Tác giả</label>
                                <input required
                                    onChange={e => { setTacgia(e.target.value) }} value={tacgia}
                                ></input>
                            </div> */}
                        <div className="group-info col-6">
                            <div className=" profile__avt flex flex-row items-center" style={{ flexDirection: "row" }}>
                                <img src={preview} alt="" />
                                <input type={"file"} accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*" name={"avatar"}
                                    onChange={onChangeImage}
                                />
                            </div>
                        </div>
                        <div className="group-info col-3">
                            <label for="types">Thể loại</label>
                            <select style={labelStyle}
                                onChange={e => { setTheloai(e.target.value) }}
                                value={theloai} id="types" name="types">
                                {
                                    types.map(item => { return (<option value={item.id}>{item.tenTag}</option>) })
                                }
                            </select>
                        </div>
                        <div className="group-info col-12">
                            <label htmlFor="" style={labelStyle}>Mô tả</label>
                            <CKEditor
                                editor={ClassicEditor}
                                config={{ placeholder: "Please enter your comment" }}
                                data={description}
                                onReady={editor => {

                                }}
                                onChange={
                                    (_, editor) => setDescription(editor.getData().trim())
                                }
                                onBlur={(event, editor) => {

                                }}
                                onFocus={(event, editor) => {

                                }}
                            />
                        </div>
                        <div className="d-flex">
                            <button
                                onClick={handleCreate}
                            >
                                Cập nhập truyện</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
