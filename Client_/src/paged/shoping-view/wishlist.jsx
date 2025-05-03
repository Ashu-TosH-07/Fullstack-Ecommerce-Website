// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { fetchWishlist, toggleWishlist } from "@/store/shop/wishlist-slice";
// import { addToCart, fetchCartItem } from "@/store/shop/cart-slice";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

function Wishlist() {
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  // const { items: wishlistItems } = useSelector((state) => state.wishlist);

  // useEffect(() => {
  //   if (user?.id) dispatch(fetchWishlist(user.id));
  // }, [dispatch, user?.id]);

  // const handleAddToCart = (productId) => {
  //   dispatch(addToCart({ userId: user.id, productId, quantity: 1 })).then((res) => {
  //     if (res.payload.success) {
  //       dispatch(fetchCartItem(user.id));
  //       toast.success("Added to cart");
  //     }
  //   });
  // };

  // const handleToggleWishlist = (productId) => {
  //   dispatch(toggleWishlist({ userId: user.id, productId })).then(() => {
  //     toast.info("Wishlist updated");
  //   });
  // };

  return (
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
    //   {wishlistItems.length === 0 ? (
    //     <p>No items in wishlist.</p>
    //   ) : (
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    //       {wishlistItems.map((product) => (
    //         <div key={product._id} className="border rounded-lg p-4">
    //           <img
    //             src={product.image}
    //             alt={product.title}
    //             className="w-full h-48 object-cover mb-2"
    //           />
    //           <h2 className="text-lg font-semibold">{product.title}</h2>
    //           <p className="text-sm text-muted-foreground mb-2">
    //             {product.description}
    //           </p>
    //           <p className="font-bold mb-2">
    //             ${product.salePrice > 0 ? product.salePrice : product.price}
    //           </p>
    //           <div className="flex gap-2">
    //             <Button
    //               variant="outline"
    //               // onClick={() => handleToggleWishlist(product._id)}
    //             >
    //               Remove
    //             </Button>
    //             <Button onClick={() => handleAddToCart(product._id)}>
    //               Add to Cart
    //             </Button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      <p>No items in wishlist.</p>
    </div>
  );
}

export default Wishlist;
