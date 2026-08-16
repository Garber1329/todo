import {createPortal} from 'react-dom'

const modalRoot = document.getElementById('portal-root')

export const Modal = ({children, isOpen, onClose}) => {

    if (!isOpen) return null

    return createPortal(
        <div className="backdrop">
            <div className="modal">
                <button className="btn-close" onClick={onClose}>X</button>
                {children}
            </div>
        </div>,
        modalRoot
    )
}