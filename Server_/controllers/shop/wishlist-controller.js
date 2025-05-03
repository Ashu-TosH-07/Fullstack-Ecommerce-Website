// const Wishlist = require("../../models/Wishlist");

// const toggleWishlistItem = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const userId = req.user._id;

//     let wishlist = await Wishlist.findOne({ user: userId });

//     if (!wishlist) {
//       wishlist = new Wishlist({ user: userId, products: [productId] });
//     } else {
//       const index = wishlist.products.indexOf(productId);
//       if (index > -1) {
//         wishlist.products.splice(index, 1);
//       } else {
//         wishlist.products.push(productId);
//       }
//     }

//     await wishlist.save();
//     res.status(200).json({ success: true, wishlist });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// const getWishlist = async (req, res) => {
//   try {
//     const wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
//       "products"
//     );
//     res.status(200).json(wishlist || { products: [] });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// module.exports = { toggleWishlistItem, getWishlist };