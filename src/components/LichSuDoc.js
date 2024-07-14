import React from 'react'
import { Link } from 'react-router-dom'

export default function LichSuDoc() {
    return (
        <div>
            <h1>Danh Sách Truyện Đã Đánh Dấu</h1>
            {danhDaus.map((data) => (
                <Link className="story-card" key={data.maTruyen}>
                    <div className="story-card__img-wrap">
                        <img src={data.anhBia} alt={data.tenTruyen} />
                    </div>

                </Link>
            ))}
        </div>
    )
}
