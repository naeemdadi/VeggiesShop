import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorBox from "../../components/ErrorBox/ErrorBox";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import Sidebar from "../../components/Sidebar/Sidebar";
import WishlistScreen from "../../container/WishlistScreen/WishlistScreen";
import vegetablesList from "../../store/actions/actionCreators/productsListAction";
import { getWishlist } from "../../store/actions/actionCreators/wishlistAction";

import "./Wishlist.css";

const Wishlist = () => {
  const wishlistData = useSelector((state) => state.fullWishlist);
  const vegetablesData = useSelector((state) => state.products);
  const removeFromWishlist = useSelector((state) => state.removeFromWishlist);

  const { loading, error, wishlist } = wishlistData;
  const { vegetables } = vegetablesData;
  const [wishlistEmpty, setwishlistEmpty] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist());
    dispatch(vegetablesList());
  }, [dispatch]);

  useEffect(() => {
    if (removeFromWishlist.loading === false) {
      dispatch(getWishlist());
      dispatch(vegetablesList());
    }
  }, [dispatch, removeFromWishlist]);

  useEffect(() => {
    if (wishlist && wishlist.length === 0) {
      setwishlistEmpty(true);
    }
  }, [wishlist]);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "24px" }}>Your Wishlist</h1>
      {loading && <LoadingBox></LoadingBox>}
      {error && <ErrorBox varient="error">{error}</ErrorBox>}
      {wishlistEmpty ? (
        <h2 className="wishlistempty">Please add some products to wishlist</h2>
      ) : (
        <React.Fragment>
          <div className="row center">
            {wishlist &&
              vegetables &&
              wishlist.map((wishlist) => (
                <WishlistScreen
                  key={wishlist._id}
                  productData={vegetables}
                  wishlist={wishlist}
                />
              ))}
          </div>
          <Sidebar />
        </React.Fragment>
      )}
    </div>
  );
};

export default Wishlist;
