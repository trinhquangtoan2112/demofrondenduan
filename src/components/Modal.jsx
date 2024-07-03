import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { closeButton } from '../store/reducer/UserReducer';

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
    const { onClose } = props;

    const dispatch = useDispatch();
    const onClickButtonq = () => {
        dispatch(closeButton())
    }
    return (
        <div className="modal__content active">
            {props.children}
            <div className="modal__content__close" >
                <i className="fa-solid fa-xmark" onClick={onClose ? onClose : onClickButtonq}></i>
            </div>
        </div>
    )
}



