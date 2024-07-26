import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TimKiemTruyenAcion } from '../service/actions/TruyenAction';

export default function Searching() {
    const [list, setList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 8; // Số lượng truyện trên mỗi trang
    const { state } = useLocation();

    const getData = async () => {
        const result = await TimKiemTruyenAcion(state);
        if (result === false) {
            setList([]);
            setTotalPages(1); // Nếu không có dữ liệu, chỉ có 1 trang
        } else {
            const data = result.data;
            setList(data);
            setTotalPages(Math.ceil(data.length / itemsPerPage)); // Tính số trang dựa trên số lượng truyện
        }
    };

    useEffect(() => {
        getData();
    }, [state]);

    // Phân trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Cắt dữ liệu để hiển thị theo trang
    const paginatedList = list.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="container mx-auto mt-8">
            <p className="text-lg font-medium mb-4">Danh sách truyện</p>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {paginatedList.length > 0 ? paginatedList.map((data) => (
                    <Link
                        to={`/truyen/${data.maTruyen}`}
                        key={data.maTruyen}
                        className='border border-orange-500 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300'
                    >
                        <div className='relative w-full' style={{ paddingTop: '133.33%' }}>
                            <img src={data.anhBia} alt={data.tenTruyen} className='absolute top-0 left-0 w-full h-full object-cover rounded mb-4' />
                        </div>
                        <p className="text-center font-medium mb-2 truncate">{data.tenTruyen}</p>
                        <div className='flex justify-between items-center w-full text-sm'>
                            <p className="text-gray-700">{data.tenButDanh}</p>
                            <p className="text-gray-700">
                                {data.diemDanhGia ? `${data.diemDanhGia}/5` : '0/5'} 
                                <i className='fa-solid fa-star text-yellow-500' />
                            </p>
                            <p className="text-gray-700">{data.tenTheLoai}</p>
                        </div>
                        {/* {data.coPhi ? (
                            <p className='bg-yellow-300 text-white text-center px-3 py-1 rounded-full mt-2'>Vip</p>
                        ) : (
                            <p className='bg-gray-300 text-center px-3 py-1 rounded-full mt-2'>Free</p>
                        )} */}
                    </Link>
                )) : (
                    <p className="text-center text-gray-500 col-span-full">Không tìm thấy</p>
                )}
            </div>

            <div className="flex justify-center mt-8">
                <div className="flex items-center">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`mx-1 px-3 py-1 rounded-full ${page === currentPage ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-orange-600`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
