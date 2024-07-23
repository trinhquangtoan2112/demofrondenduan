import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TimKiemTruyenAcion } from '../service/actions/TruyenAction';

export default function Searching() {
    const [list, setList] = useState(null);
    const location = useLocation();
    console.log(location)
    const { state } = useLocation();
    console.log(state)
    const getData = async () => {
        const result = await TimKiemTruyenAcion(state);
        console.log(result)
        if (result == false) {
            setList(null);
        } else {
            setList(result.data)
        }

    }
    useEffect(() => {
        getData()
    }, [state])

    console.log(list)
    return (
        <div>
            <p>Danh sách truyện</p>
            <div className='flex flex-row flex-wrap '>
                {list != null ? list.map((data, index) => {
                    return (
                        <Link to={`/truyen/${data.maTruyen}`} key={data.maTruyen} className='w-1/4 m-1' style={{ border: '1px solid #ff7300', width: "32%" }}>
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
                }) : <p>Không tìm thấy</p>}

            </div >
        </div>
    )
}
