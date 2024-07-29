import React from 'react'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';

function Story(props) {
    const data = props.data;
    return (
        <Link to={`truyen/${data.maTruyen}`} className="flex border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="w-1/6 flex-shrink-0">
                <div className="relative" style={{ paddingTop: '133.33%' }}> {/* 3:4 aspect ratio */}
                    <img src={data.anhBia} alt={data.tenTruyen} className="absolute top-0 left-0 w-full h-full object-cover rounded" />
                </div>
            </div>
            <div className="w-5/6 pl-4">
                <h2 className="text-lg font-semibold mb-2 truncate">{data.tenTruyen}</h2> {/* Truncate title */}
                <div className="text-gray-700 mb-2 line-clamp-2">{data?.moTa ? parse(data.moTa) : null}</div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{data.tacGia}</span>
                    <p className="text-gray-700">
                                {data.diemDanhGia ? `${data.diemDanhGia}/5` : '0/5'} 
                                <i className='fa-solid fa-star text-yellow-500' />
                            </p>
                    <span className="border border-primary text-primary px-2 py-1 rounded">{data.tenTheLoai}</span>
                </div>
            </div>
        </Link>
    )
}

export default Story;
