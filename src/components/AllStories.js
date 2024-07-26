import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetTruyenMain } from '../service/actions/TruyenAction';
import { Link, useLocation } from 'react-router-dom';

export default function AllStories() {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [storiesPerPage] = useState(8);
    const dispatch = useDispatch();
    const theLoai = useSelector(state => state.TheLoaiReducer.theLoai);
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const genre = query.get('genre') || '';
        
        setSelectedGenre(genre);
    }, [location.search]);

    useEffect(() => {
        const getStories = async () => {
            const result = await GetTruyenMain();
            const allStories = [...result.conlai, ...result.dexuat]; // Kết hợp cả hai danh sách
            setList(allStories);
        };

        getStories();
    }, [dispatch]);

    useEffect(() => {
        const filtered = selectedGenre ? list.filter(story => story.tenTheLoai === selectedGenre) : list;
        setFilteredList(filtered);
    }, [list, selectedGenre]);

    const handleGenreChange = (event) => {
        const genre = event.target.value;
        setSelectedGenre(genre);
        const query = new URLSearchParams(location.search);
        query.set('genre', genre);
        window.history.pushState(null, '', `AllStories?${query.toString()}`);
    };

    // Logic phân trang
    const indexOfLastStory = currentPage * storiesPerPage;
    const indexOfFirstStory = indexOfLastStory - storiesPerPage;
    const currentStories = filteredList.slice(indexOfFirstStory, indexOfLastStory);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredList.length / storiesPerPage);

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Tất cả truyện</h1>
            <div className="mb-4">
                <label htmlFor="genre-select" className="mr-2">Chọn thể loại:</label>
                <select
                    id="genre-select"
                    onChange={handleGenreChange}
                    value={selectedGenre || ""}
                    className="border p-2 rounded"
                >
                    <option value="">Tất cả</option>
                    {theLoai.map((genre) => (
                        <option key={genre.maTheLoai} value={genre.tenTheLoai}>
                            {genre.tenTheLoai}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentStories.length > 0 ? currentStories.map((data) => (
                    <Link
                        to={`../../truyen/${data.maTruyen}`}
                        key={data.maTruyen}
                        className="border border-orange-500 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="relative w-full" style={{ paddingTop: '133.33%' }}> {/* Tỷ lệ 3:4 */}
                            <img src={data.anhBia} alt={data.tenTruyen} className="absolute top-0 left-0 w-full h-full object-cover rounded mb-4" />
                        </div>
                        <p className="text-center font-medium mb-2 truncate">{data.tenTruyen}</p> {/* Cắt ngắn tiêu đề */}
                        <div className="flex justify-between items-center w-full text-sm">
                            <p className="text-gray-700">{data.tenButDanh}</p>
                            <p className="text-gray-700">
                                {data.diemDanhGia ? `${data.diemDanhGia}/5` : '0/5'} 
                                <i className='fa-solid fa-star text-yellow-500' />
                            </p>
                            <p className="text-gray-700">{data.tenTheLoai}</p>
                        </div>
                    </Link>
                )) : <p className="text-center col-span-full">Không tìm thấy truyện nào</p>}
            </div>
            <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-orange-600`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
