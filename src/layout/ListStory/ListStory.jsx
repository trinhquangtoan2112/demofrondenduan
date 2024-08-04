import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Section, { SectionBody, SectionHeading } from '../../components/Section';
import { GetTruyenMain } from '../../service/actions/TruyenAction';
import Story from './../Account/Story';
import { Link } from 'react-router-dom';

export default function ListStory() { 
    const [datas, setData] = useState([]);
    const [list, setList] = useState([]);
    const dispatch = useDispatch();
    const theLoai = useSelector(state => state.TheLoaiReducer.theLoai);

    useEffect(() => {
        const getStory = async () => {
            const result = await GetTruyenMain();
            console.log(result);
            setData(result?.dexuat.slice(0, 3)); // Hiển thị 3 câu chuyện cho "Truyện đề cử"
            setList(result?.conlai.slice(0, 12)); // Hiển thị 12 câu chuyện cho "Danh sách truyện"
        };
        getStory();
    }, [dispatch]);

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="lg:w-2/3">
                    <Section>
                        <SectionHeading>
                            <h4 className="text-xl font-semibold mb-4">Truyện đề cử</h4>
                        </SectionHeading>
                        <SectionBody>
                            {datas ? <div className="space-y-4">
                                {datas.map((data) => (
                                    <Story key={data.maTruyen} data={data} />
                                ))}
                            </div> : <p>Không có kết nối</p>}
                        </SectionBody>
                    </Section>
                </div>
                <div className="lg:w-1/3">
                    <Section>
                        <SectionHeading>
                            <h4 className="text-xl font-semibold mb-4">Thể loại</h4>
                        </SectionHeading>
                        <SectionBody>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {theLoai ? theLoai.map((genre) => (
                                    <Link
                                        to={`/AllStories?genre=${encodeURIComponent(genre.tenTheLoai)}`}
                                        key={genre.maTheLoai}
                                        className="border border-gray-300 p-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                    >
                                        <h5 className="text-md font-semibold">{genre.tenTheLoai}</h5>
                                    </Link>
                                )) : null}
                            </div>
                        </SectionBody>
                    </Section>
                </div>
            </div>
            <p className="text-lg font-medium mt-8">Danh sách truyện</p>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {list ? list.map((data) => (
                    <Link
                        to={`truyen/${data.maTruyen}`}
                        key={data.maTruyen}
                        className="relative border border-orange-500 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="relative w-full" style={{ paddingTop: '133.33%' }}> {/* Tỷ lệ 3:4 */}
                            {data.coPhi && (
                            <span style={{zIndex:'2'}} className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-br-lg">
                                VIP
                            </span>
                        )}
                            <img src={data.anhBia} alt={data.tenTruyen} className="absolute top-0 left-0 w-full h-full object-cover rounded mb-4" />
                        </div>
                        <p className="text-center font-medium mb-2 truncate">{data.tenTruyen}</p> {/* Cắt ngắn tiêu đề */}
                        <div className="flex justify-between items-center w-full text-sm">
                            <p className="text-gray-700">{data.tacGia}</p>
                            <p className="text-gray-700">
                                {data.diemDanhGia ? `${data.diemDanhGia}/5` : '0/5'}
                                <i className='fa-solid fa-star text-yellow-500' />
                            </p>
                            <p className="text-gray-700">{data.tenTheLoai}</p>
                        </div>
                    </Link>
                )) : null}
            </div>
        </>
    );
}
