import React from 'react';
import { useDispatch } from 'react-redux';
import { decrementItem } from '../../store/actions/actionCreators/addToCartAction';

import './Items.css';

export const RemoveItemPrimary = ({ product }) => {

    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(decrementItem(product._id))} className="cartbtn">&#8722;</button>
    )
}

export const RemoveItemSecondary = ({ product }) => {

    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(decrementItem(product._id))} className="cartbtn individual">&#8722;</button>
    )
}

export const RemoveItemTertiary = ({ product }) => {

    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(decrementItem(product._id))} className="cartbtn item__cart">&#8722;</button>
    )
}