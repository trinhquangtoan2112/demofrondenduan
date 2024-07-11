import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Section, { SectionBody, SectionHeading } from '../../components/Section';
import './ListStory.scss'
import { GetTruyenMain } from '../../service/actions/TruyenAction';
import Story from './../Account/Story';
import Grid from '../../components/Grid';
import { Link } from 'react-router-dom';
export default function ListStory() {
    const [hover, setHover] = useState(false);
    const [datas, setData] = useState([]);
    const [readings, setReadings] = useState([])
    const [list, setList] = useState([])
    //   const user = useSelector(state => state.auth.login.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const getStory = async () => {
            const result = await GetTruyenMain();
            console.log(result)
            setData(result.dexuat)
            setList(result.conlai)
        }
        getStory()
    }, [])


    return (
        <>
            <div className='d-flex'>
                <div className='col-8'>
                    <Section>
                        <SectionHeading>
                            <h4 className='section-title'>Truyện đề cử</h4>
                            <a to='tat-ca'>Xem tất cả</a>
                        </SectionHeading>
                        <SectionBody>
                            <div className='list-story'>
                                {datas.map((data, index) => <Story key={data.maTruyen} data={data} />)}
                            </div>
                        </SectionBody>
                    </Section>

                </div>
                <div className='col-4'>
                    <Section>
                        <SectionHeading>
                            <h4 className='section-title'>Đang đọc</h4>
                            <a>Xem tất cả</a>
                        </SectionHeading>
                        <SectionBody>
                            <div className='list-reading'>
                                {/* {readings.map((item, i) => <Reading key={i} data={{
                                    tentruyen: item.dautruyenId?.tentruyen,
                                    hinhanh: item.dautruyenId?.hinhanh,
                                    dadoc: item.chapNumber,
                                    total: item.dautruyenId?.sochap,
                                    url: item.dautruyenId?.url
                                }} />)} */}
                            </div>
                        </SectionBody>
                    </Section>

                </div>
            </div>
            <p>Danh sách truyện</p>
            <div className='flex flex-row flex-wrap '>
                {list.map((data, index) => {
                    return (
                        <Link to={`truyen/${data.maTruyen}`} key={data.maTruyen} className='w-1/4 m-1' style={{ border: '1px solid #ff7300', width: "32%" }}>
                            <div className='flex flex-col justify-between items-center' >
                                <img src={data.anhBia} alt={data.tenTruyen} className='w-3/5 h-3/5'></img>
                                <p>{data.tenTruyen}</p>
                                <div className='flex flex-row items-center justify-between w-3/5'>
                                    <p>{data.tenButDanh}</p>
                                    <p>{data.tenTheLoai}</p>
                                </div>
                                {/* {data.coPhi ? <p className='bg-yellow-300 text-white px-3'>Vip</p> : <p className='bg-gray-300 px-3'>Free</p>} */}
                            </div>
                        </Link>
                    )
                })}

            </div >
        </>

    )
}

