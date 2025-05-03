import { TbHeartPlus } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItem } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import { setProductDetails } from "@/store/shop/product-slice";
import StarRatingComponent from "../common-/star-rating";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.productReview);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  function handleRatingChange(getRating) {
    setRating(getRating);
    // console.log(getRating, "getRating");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast.message("Review added successfully!");
      } else {
        toast.error("You need to purchase this product to review it.");
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  console.log(reviews, "reviews");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  function handleAddToCart(getCurrentProductId) {
    console.log("Product added to cart successfully", getCurrentProductId);
    dispatch(
      addToCart({
        userId: user.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(fetchCartItem(user.id));
        toast.success("Product added to cart");
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails(null)); // Reset product details when closing the dialog
    setRating(0);
    setReviewMsg("");
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-4 sm:p-10 max-w-[80vw] sm:max-w-[70vw] lg:max-w-[60vw]">
        {productDetails ? ( // Conditional rendering
          <>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={productDetails.image}
                alt={productDetails.title}
                height={500}
                className="object-cover object-center w-full h-full aspect-square"
              />
            </div>
            <DialogHeader className="flex flex-col">
              <DialogTitle className="text-2xl font-extrabold">
                {productDetails.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm mb-2 mt-2">
                {productDetails.description}
              </DialogDescription>

              <div className="flex items-center justify-item-center gap-3">
                <p
                  className={`text-2xl text-primary ${
                    productDetails.salePrice > 0 ? "line-through" : ""
                  }`}
                >
                  ${productDetails.price}
                </p>
                {productDetails.salePrice > 0 ? (
                  <p className="text-2xl font-bold">
                    {productDetails.salePrice}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5">
                  <StarRatingComponent rating={averageReview} />
                </div>
                <span className="text-muted-foreground">
                  ({averageReview.toFixed(1)})
                </span>
              </div>

              <div className="mt-2 w-full gap-1 flex">
                <Button size="icon" className="w-[22%]">
                  <TbHeartPlus />
                  {/* Add to Wishlist */}
                </Button>
                <Button
                  className="w-[78%]"
                  onClick={() => handleAddToCart(productDetails._id)}
                >
                  <ShoppingBag /> Add to Cart
                </Button>
              </div>
              <Separator />
              <div className="mb-2  max-h-[300px] max-w-[90vw] overflow-auto">
                <h2 className="font-medium mb-2 text-center">
                  Product Reviews
                </h2>
                <div className="grid gap-4 ">
                  {reviews && reviews.length > 0 ? (
                    reviews.map((reviewItem) => (
                      <div className="flex gap-4">
                        <Avatar className="w-8 h-8 border">
                          <AvatarFallback>
                            {reviewItem?.userName[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm">
                              {reviewItem?.userName}
                            </h3>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <StarRatingComponent
                              rating={reviewItem?.reviewValue}
                            />
                          </div>
                          <p className="text-muted-foreground">
                            {reviewItem.reviewMessage}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h3 className="text-center text-muted-foreground">
                      No Reviews
                    </h3>
                  )}
                </div>
                <div className="mt-1 flex flex-col  gap-1 ">
                  <Label htmlFor="reviewMsg" className="text-sm font-semibold ">
                    Add a Review
                  </Label>
                  <div className="flex gap-1">
                    <StarRatingComponent
                      rating={rating}
                      handleRatingChange={handleRatingChange}
                    />
                  </div>
                  <textarea
                    name="reviewMsg"
                    value={reviewMsg}
                    onChange={(e) => setReviewMsg(e.target.value)}
                    className="w-full h-auto border border-gray-300 rounded-md p-1"
                    placeholder="Write your review..."
                  />
                  <Button
                    onClick={handleAddReview}
                    disabled={reviewMsg.trim() === ""}
                  >
                    Submit
                  </Button>
                </div>
                {/* </div> */}
              </div>
            </DialogHeader>
          </>
        ) : (
          // Optional: You can render a loading state or a message here
          <div>Loading product details...</div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
