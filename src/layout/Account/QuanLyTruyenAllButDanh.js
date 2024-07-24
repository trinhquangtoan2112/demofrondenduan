import { EditOutlined, EyeInvisibleOutlined, EyeOutlined, FormOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AnTruyenAction, GetTruyenTheoButDanh, GetTruyenTheoIDNguoiDung, HienTruyenAction } from '../../service/actions/TruyenAction';
import dayjs from 'dayjs';

export default function QuanLyTruyenAllButDanh() {
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
                                title="Hiện truyện"
                                description="Bạn có chắc muốn hiện truyện không?"
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
                    }
                </>
            ),
        }
    ];
    const nav = useNavigate();
    const onClickAddChapter = () => {
        nav(`/DangTruyen`)
    }
    return (
        <>

            <button className='btn-primary' style={{ 'margin': '0px 10px' }}
                onClick={onClickAddChapter}
            >Thêm truyện</button>
            <Table columns={columns} dataSource={list && list.length > 0 ? list : null} />
            {/* {list?.map((item) => {
                return (
                    <div>
                        <h1>Truyện của: {item?.tenButDanh}</h1>
                        {item.truyen.length > 0 ? : <p>Chưa có truyện</p>}

                    </div>
                )
            }
            )
            } */}


        </>
    )
}
