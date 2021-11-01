import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarClose } from '../../store/actions/actionCreators/addToCartAction';
import SidebarDesign from './SidebarDesign';

import './Sidebar.css';

Modal.setAppElement('#root')

const Sidebar = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.cart);

    const { sideBarOpen, cartData } = data;

    return (
        <Modal
            style={{
                overlay: {
                    background: 'rgba(0, 0, 0, 0.8)'
                }
            }}
            className="cart__sidebar"
            shouldCloseOnOverlayClick={true}
            isOpen={sideBarOpen}
            closeTimeoutMS={600}
            onRequestClose={() => dispatch(sidebarClose())}
            >
            <SidebarDesign vegetablesCart={cartData.vegetablesCart} cartTotal={cartData.cartTotal} />
        </Modal>
    )
}

export default Sidebar;
