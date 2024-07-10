import React from 'react'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser';

function Story(props) {
  const data = props.data;
  return (
    <Link to={`truyen/${data.maTruyen}`} >
      <div className='story-card'>
        <div className='story-card__img-wrap'>
          <img src={data.anhBia} alt="" />
        </div>
        <div className='story-card__content'>
          <h2 className='story-card__tilte'>Tên truyện: {data.tenTruyen}</h2>
          <div className='story-card__description'>Mô tả: {parse(data.moTa)}</div>
          <div className='story-card__info'>
            <span className='story-card__author'>Tác giả: {data.tenButDanh}</span>
            <span className='story-card__type border border-primary color-primary fs-12' style={{ padding: 4 + 'px' }}>{data.tenTheLoai}</span>
          </div>
        </div>
      </div>
    </Link>

  )
}

export default Story