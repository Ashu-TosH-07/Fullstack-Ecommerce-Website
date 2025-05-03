const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");

// const addProductReview = async (req, res) => {
//   try {
//     const { productId, userId, userName, reviewMessage, reviewValue } =
//       req.body;

//     const order = await Order.findOne({
//       userId,
//       "cartItems.productId": productId,
//       orderStatus: { $in: ["confirmed", "delivered"] },
//     });

//     // console.log("Matched order:", order);

//     if (!order) {
//       return res.status(403).json({
//         success: false,
//         message: "You need to purchase this product to add a review.",
//       });
//     }

//     // const checkExistingReview = await ProductReview.findOne({
//     //   productId,
//     //   userId,
//     // });

//     // if (checkExistingReview) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "You already reviewed this product!",
//     //   });
//     // }

//     let existingReview = await ProductReview.findOne({
//       productId,
//       userId,
//     });
    
//     if (existingReview) {
//       existingReview.reviewMessage = reviewMessage;
//       existingReview.reviewValue = reviewValue;
//       await existingReview.save();
//     } else {
//       const newReview = new ProductReview({
//         productId,
//         userId,
//         userName,
//         reviewMessage,
//         reviewValue,
//       });
//       await newReview.save();
//     }
    

//     const newReview = new ProductReview({
//       productId,
//       userId,
//       userName,
//       reviewMessage,
//       reviewValue,
//     });

//     await newReview.save();

//     const reviews = await ProductReview.find({ productId });
//     const totalReviewsLength = reviews.length;
//     const averageReview =
//       reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
//       totalReviewsLength;

//     await Product.findByIdAndUpdate(productId, { averageReview });

//     res.status(201).json({
//       success: true,
//       data: newReview,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error",
//     });
//   }
// };

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } = req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: { $in: ["confirmed", "delivered"] },
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You need to purchase this product to add or update a review.",
      });
    }

    // Check if the review already exists
    let review = await ProductReview.findOne({ productId, userId });

    if (review) {
      // Update existing review
      review.reviewMessage = reviewMessage;
      review.reviewValue = reviewValue;
      await review.save();
    } else {
      // Create new review
      review = new ProductReview({
        productId,
        userId,
        userName,
        reviewMessage,
        reviewValue,
      });
      await review.save();
    }

    // Recalculate average rating
    const reviews = await ProductReview.find({ productId });
    const totalReviews = reviews.length;
    const averageReview =
      reviews.reduce((sum, item) => sum + item.reviewValue, 0) / totalReviews;

    await Product.findByIdAndUpdate(productId, { averageReview });

    return res.status(201).json({
      success: true,
      message: review.isNew ? "Review added" : "Review updated",
      data: review,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Server error while processing review.",
    });
  }
};


const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ProductReview.find({ productId });
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addProductReview, getProductReviews };