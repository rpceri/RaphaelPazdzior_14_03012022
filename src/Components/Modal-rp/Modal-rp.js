import './style.css';

/**
* Return template of a modal windows
*
* @component
* @summary used in PaIndex
* @param { string } props.handleModalResponse name of handle fonction to hide modal, ex: 1
* @param { boolean } props.isModalVisible ex: true
* @param { string } props.message message to display in the modal
* @param { string } props.buttonLabel label fir tje button
* @return { HTMLElement }
*/
function Modal(props) { 
    return ( 
    <>
        {props.isModalVisible ? 
        <div className='modal-rp'>
            <p className='modal-rp__text'>{props.message}</p>
            <button className='modal-rp__button' onClick={() => props.handleModalResponse()}>{props.buttonLabel}</button>
            <button className='modal-rp__close'  onClick={() => props.handleModalResponse()}>X</button>
        </div> : ''}
    </>
      );
}

export default Modal;