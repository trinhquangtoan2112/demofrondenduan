import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { GetChiTietChuongTruyenAction } from '../../service/actions/TruyenAction';
import parse from 'html-react-parser';
import { message } from 'antd';
import { apiKey } from '../../service/http';
import axios from 'axios';
function Chapter(props) {
    console.log(111)
    const { maChuong, name } = useParams();
    const [chapter, setChapter] = useState({})
    const [manual, setManual] = useState("")
    const [content, setContnet] = useState("Khong co gi")
    const [fontsize, setFontsize] = useState(18);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [fontName, setFontName] = useState("Arial");
    // const user = useSelector(state => state.auth.login?.user)
    const dispatch = useDispatch()
    const contentRef = useRef(null)

    useEffect(() => {//xử lý đánh dấu truyện đang đọc
        const handleSetReading = async () => {//tạo hàm

            const data = {
                maChuong: maChuong
            }
            const result = await GetChiTietChuongTruyenAction(data)

            if (result.status === 401) {
                message.error("Lỗi xảy ra")
                setChapter({
                    ...data,
                    content: "Hãy mua chương"
                })
                setManual({
                    result: result
                }
                )
            } else {
                setChapter({
                    machuongtruyen: result.data.data.machuongtruyen,
                    tenChuong: result.data.data.tenChuong,
                    content: result.data.data.noiDung,
                    stt: result.data.data.stt
                })
                setContnet(getTextContent(result?.data?.data?.noiDung))
                setManual({
                    result
                })
            }
            window.scrollTo(0, 0)

        }
        const LuuLichSu = async () => {
            const data = {
                maChuong
            }
            const result = await apiKey.postToken("LichSuDoc/CapNhapLichSuDoc", null, data);
            console.log(result)
        }
        handleSetReading();//gọi hàm
        // if (localStorage.getItem("TOKEN")) {
        //     try {
        //         LuuLichSu()
        //     } catch (error) {

        //     }
        // }
        if (localStorage.getItem("TOKEN")) {
            LuuLichSu()
        }


    }, [maChuong])
    console.log(parse('<h1>single</h1>'))
    const [operationName, setOperationName] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const handleSpeak = async () => {
        const data = {
            noiDung: content
        }
        console.log(data)
        try {
            const result = await axios.post('https://localhost:7094/Chuongtruyens/DocChuongTruyen', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'blob', // Đảm bảo nhận được phản hồi dưới dạng blob
            });
            const url = window.URL.createObjectURL(new Blob([result.data], { type: 'audio/mpeg' }));
            setAudioUrl(url)
        } catch (error) {
            console.error('Error during text-to-speech:', error);
        }
    };
    const getTextContent = (node) => {
        let textContent = "";
        if (typeof node === 'string') {
            textContent += node;
        } else if (Array.isArray(node)) {
            node.forEach(getTextContent);
        } else if (node && node.props && node.props.children) {
            getTextContent(node.props.children);
        }

        const parser1 = new DOMParser();
        const doc = parser1.parseFromString(textContent, 'text/html');

        return doc.body.textContent || "";
    };
    // useEffect(() => {//Xử lý load dữ liệu chương truyện
    //     const getChapter = async () => {//tạo hàm
    //         apiMain.getChapterByNumber(url, chapnum)
    //             .then(res => {
    //                 setChapter(getData(res))
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //     }
    //     getChapter()//gọi hàm
    // }, [chapnum])

    // useEffect(() => {//xử lý hiển thị nội dung truyện
    //     contentRef.current.innerHTML = chapter?.content || ""
    // }, [chapter])

    // useEffect(() => {//xử lý sự kiện click khi đọc truyện
    //     const handleClick = () => {//khi click sẽ set manual về "" để ẩn manual
    //         setManual("")
    //     }
    //     document.addEventListener("click", handleClick)
    //     return () => { document.removeEventListener("click", handleClick) }
    // }, [])
    const renderNoiDung = () => {

        return <div>
            {
                parse(chapter.content)
            }
        </div>
    }
    const renderTienIchFontSize = () => {
        const options = [];
        for (let i = 10; i < 30; i++) {
            options.push(<option key={i} value={i}>{i}px</option>);
        }
        return options
    }
    const renderTienIchFont = () => {
        const fonts = [
            { name: "Arial", style: 'Arial' },
            { name: "Courier New", style: 'Courier New ' },
            { name: "Georgia", style: 'Georgia' },
            { name: "Times New Roman", style: 'Times New Roman' },
            { name: "Verdana", style: 'Verdana' }
        ];
        const options = [];
        for (let i = 0; i < fonts.length; i++) {
            options.push(<option key={fonts[i].style} value={fonts[i].style}>{fonts[i].name}</option>);
        }
        return options
    }
    return (<>
        <div className="main" style={{ backgroundColor: "#ced9d9", paddingTop: "30px" }}>
            {audioUrl && <audio controls src={audioUrl}></audio>}
            <p>Font size</p>
            <select defaultValue={18} onChange={(e) => {
                setFontsize(e.target.value)
            }}>
                {renderTienIchFontSize()}

            </select>
            <p>Font</p>
            <select defaultValue={"Arial"} onChange={(e) => {
                console.log(e.target.value)
                setFontName(e.target.value)
            }}>
                {renderTienIchFont()}
            </select>
            <div className="container">
                <div className="main-content" style={{ "position": "relative", margin: "0 80px", backgroundColor: "#e1e8e8" }}>
                    {/* <ul className='chapter-manual fs-24'>
                        <li className={`chapter-manual__item ${manual === 'list-chap' ? 'active' : ''}`} onClick={(e) => {
                            e.stopPropagation();
                            if (manual === 'list-chap')
                                setChapter("")
                            else
                                setManual("list-chap")
                        }}>
                            <a><i className="fa-solid fa-bars"></i></a>
                            <div className="chapter-manual__popup" >
                                <div className="list-chapter" style={{ width: "700px", "maxHeight": "500px", "overflow": "scroll" }}>
                                    {/* <ListChapter url={url} col={2} fontsize={15} /> */}
                    {/* </div>
                            </div>

                        </li>
                        <li className={`chapter-manual__item ${manual === 'setting' ? 'active' : ''}`} onClick={(e) => {
                            e.stopPropagation();
                            if (manual === "setting")
                                setManual("")
                            else
                                setManual("setting")
                        }}>
                            <a><i className="fa-solid fa-gear"></i></a>
                            <div className="chapter-manual__popup">
                                <h4>Cài đặt</h4>
                                <div className="chapter-setting">
                                    <table className='chapter-setting__body fs-18'>
                                        <tbody>
                                            <tr>
                                                <td className='col-4'>
                                                    <div className='chapter-setting__label'>
                                                        <i className="fa-solid fa-font"></i>
                                                        Cỡ chữ
                                                    </div>
                                                </td>
                                                <td className='col-8'>
                                                    <div className='d-flex chapter-setting__input'>
                                                        <button onClick={() => { setFontsize(pre => pre - 1) }}><i className="fa-solid fa-minus"></i></button>
                                                        <div>{`${fontsize}px`}</div>
                                                        <button onClick={() => { setFontsize(pre => pre + 1) }}><i className="fa-solid fa-plus"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='col-4'>
                                                    <div className='chapter-setting__label'>
                                                        <i className="fa-solid fa-font"></i>
                                                        Giãn dòng
                                                    </div>
                                                </td>
                                                <td className='col-8'>
                                                    <div className='d-flex chapter-setting__input'>
                                                        <button onClick={() => { setLineHeight(pre => { return Number((pre - 0.1).toFixed(1)) }) }}><i className="fa-solid fa-minus"></i></button>
                                                        <div>{`${lineHeight}`}</div>
                                                        <button onClick={() => { setLineHeight(pre => { return Number((pre + 0.1).toFixed(1)) }) }}><i className="fa-solid fa-plus"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </li>
                        <li className='chapter-manual__item'>
                            <a
                            // to={`/truyen/${url}`}
                            ><i className="fa-solid fa-arrow-left"></i></a>
                        </li>
                        <li className='chapter-manual__item'><a><i className="fa-solid fa-comments"></i></a> </li>

                    </ul> */}
                    <button onClick={handleSpeak}>
                        Đọc văn bản
                    </button>
                    <div className="d-lex"
                        style={{ fontSize: `${fontsize}px`, fontFamily: `${fontName}` }}
                    >
                        {chapter?.stt ? <h1 className='chapter-name'> CHƯƠNG {chapter?.stt}: {chapter?.tenChuong.toUpperCase()}</h1> : null}
                        <div style={{ "lineHeight": `${lineHeight}` }}>
                            <div id="chapter-content"  >{chapter?.content ? renderNoiDung() : <p>Lỗi xảy ra hãy reset lại web</p>}</div>
                        </div>
                    </div>
                    <div className='w-1/6 mx-auto flex flex-row justify-between'>
                        {manual?.result?.data.data.trangTruoc ? <Link className='cursor-pointer' to={`/truyen/${name}/${manual?.result.data.data.trangTruoc}`}><button className='px-5 py-1 bg-green-500'><i className="fa fa-arrow-left" /></button>
                        </Link> : <button className='px-5 py-1 bg-green-300' disabled><i className="fa fa-arrow-left" /></button>}
                        {manual?.result?.data.data.trangTiep ? <Link className='cursor-pointer' to={`/truyen/${name}/${manual?.result.data.data.trangTiep}`}>
                            <button className='px-5 py-1 bg-green-500'><i className="fa fa-arrow-right" /></button>
                        </Link> : <button className='px-5 py-1 bg-green-300' disabled> <i className="fa fa-arrow-right" /></button>}
                    </div>
                </div>
            </div>
        </div >


    </>)
}

export default Chapter