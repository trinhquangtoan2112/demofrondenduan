import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

const Modal = props => {
    const { active } = props;
    return (
        <div className={`modal ${active ? 'active' : ''}`}>
            {props.children}
        </div>
    )
}

Modal.propTypes = {
    active: PropTypes.bool
}
export default Modal
export const ModalContent = props => {



    return (
        <div className="modal__content active">
            {props.children}
            <div className="modal__content__close" >
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
    )
}



