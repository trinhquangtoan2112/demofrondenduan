import React, { useCallback, useEffect, useState } from 'react'
import Grid from '../../components/Grid'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, message, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { getDanhSachBanThaoTheoTruyenAction } from '../../service/actions/BanThaoAction'

export default function DanhSachBanThao() {
    const { id } = useParams()
    console.log(id)
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
        const result = await getDanhSachBanThaoTheoTruyenAction(id);
        if (result === false) {
            setChapters(null)
        }
        else {
            setChapters(result.data)
        }
    }
    useEffect(() => {
        getData()
    }, [id])

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
        <div>
            <div className='d-flex mb-1' style={{ 'justifyContent': 'space-between' }}>
                <a onClick={() => { nav("/tacgia/QuanLyBanThao") }}
                //  onClick={onClickBackFromListChap}
                ><i className="fa-solid fa-angle-left"></i> Danh sách truyện</a>
                <span className='fs-20 fw-6'>Danh sách bản thảo </span>

            </div>
            <Grid gap={15} col={2} snCol={1}>
                {
                    chapters?.map((item, index) => {
                        return (
                            <div key={item.maBanThao}>
                                <div className='d-flex'>
                                    <div className="col-9 d-flex" style={{ 'alignItems': 'center' }}>
                                        <p key={item.maBanThao} name={item.tenBanThao} className='text-overflow-1-lines'>Tên bản thảo: {item.tenBanThao}</p>
                                    </div>
                                    <div className="col-3">
                                        <Link to={`/ChinhSuaChuong/${item.maBanThao} `}
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
    )
}
