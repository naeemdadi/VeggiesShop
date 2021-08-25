import React from 'react';
import { useDispatch } from 'react-redux';
import { incrementItem } from '../../store/actions/actionCreators/addToCartAction';

import './Items.css';

export const AddItemPrimary = ({ product }) => {
    
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(incrementItem(product._id))} className="cartbtn">&#43;</button>
    )
}

export const AddItemSecondary = (props) => {
    const dispatch = useDispatch();
    const { product } = props;

    return (
        <button onClick={() => dispatch(incrementItem(product._id))} className="cartbtn individual">&#43;</button>
    )
}

export const AddItemTertiary = (props) => {
    const dispatch = useDispatch();
    const { product } = props;

    return (
        <button onClick={() => dispatch(incrementItem(product._id))} className="cartbtn item__cart">&#43;</button>
    )
}

