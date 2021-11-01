import * as actionTypes from "../actions/actionTypes/addToCartTypes";
import * as actionT from "../actions/actionTypes/orderTypes";

const initialState = {
  cartData: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : {
        vegetablesCart: [],
        totalQuantity: 0,
        cartTotal: 0,
      },
  sideBarOpen: false,
  customerAddress: localStorage.getItem("customerAddress")
    ? JSON.parse(localStorage.getItem("customerAddress"))
    : {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASING_STATE:
      const purchasingItem = action.payload;
      const cartPurchasingArray = [...state.cartData.vegetablesCart];
      const isAdded = cartPurchasingArray.find(
        (x) => x._id === purchasingItem._id
      );

      if (purchasingItem) {
        purchasingItem.purchasing = true;
        purchasingItem.quantity++;
        cartPurchasingArray.push(purchasingItem);
      } else if (isAdded) {
        return purchasingItem.quantity;
      } else {
        return purchasingItem.quantity;
      }

      const purchasingPrice = purchasingItem.price;

      return {
        ...state,
        cartData: {
          vegetablesCart: cartPurchasingArray,
          totalQuantity: state.cartData.totalQuantity + 1,
          cartTotal: state.cartData.cartTotal + purchasingPrice,
        },
      };

    case actionTypes.INCREMENT_ITEM:
      const cartIncrementArray = [...state.cartData.vegetablesCart];
      const incrementingItem = cartIncrementArray.find(
        (x) => x._id === action.id
      );

      if (incrementingItem) {
        incrementingItem.quantity++;
      } else {
        return incrementingItem.quantity;
      }

      const incrementedPrice = incrementingItem.price;
      return {
        ...state,
        cartData: {
          vegetablesCart: cartIncrementArray,
          cartTotal: state.cartData.cartTotal + incrementedPrice,
          totalQuantity: state.cartData.totalQuantity + 1,
        },
      };

    case actionTypes.DECREMENT_ITEM:
      const cartDecrementArray = [...state.cartData.vegetablesCart];

      const decrementingItem = cartDecrementArray.find(
        (x) => x._id === action.id
      );

      if (decrementingItem) {
        if (decrementingItem.quantity < 2) {
          decrementingItem.quantity--;
          decrementingItem.purchasing = false;
          var index = cartDecrementArray.indexOf(decrementingItem);
          if (index !== -1) {
            cartDecrementArray.splice(index, 1);
          }
        } else if (decrementingItem.quantity < 0) {
          return decrementingItem.quantity;
        } else {
          decrementingItem.quantity--;
        }
      } else {
        return decrementingItem.quantity;
      }

      const decrementedPrice = decrementingItem.price;
      return {
        ...state,
        cartData: {
          vegetablesCart: cartDecrementArray,
          cartTotal: state.cartData.cartTotal - decrementedPrice,
          totalQuantity: state.cartData.totalQuantity - 1,
        },
      };
    case actionTypes.SEND_CUSTOMER_ADDRESS:
      return {
        ...state,
        customerAddress: action.payload,
      };
    case actionT.CLEAR_CART:
      return {
        ...state,
        cartData: {
          vegetablesCart: [],
          totalQuantity: 0,
          cartTotal: 0,
        },
      };
    case actionTypes.SIDEBAR_OPEN:
      return {
        ...state,
        sideBarOpen: true,
      };
    case actionTypes.SIDEBAR_CLOSE:
      return {
        ...state,
        sideBarOpen: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
