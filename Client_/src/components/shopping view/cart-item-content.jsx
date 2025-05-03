import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/store/shop/cart-slice";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleItemUpdateQnty(getCartItem, typeOfAction) {
    dispatch(
      updateCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "increase"
            ? getCartItem.quantity + 1
            : getCartItem.quantity - 1,
      })
    ).then((data) => {
      if (data.payload.success) {
        toast.success(
          `Product Quantity ${
            typeOfAction === "increase" ? "increased" : "decreased"
          }!`
        );
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      if (data.payload.success) {
        toast.success("Product removed from cart!");
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1 font-semibold">
        <h3>{cartItem.title}</h3>
        <div className="flex gap-1.5 items-center mt-2">
          <Button
            variant={"outline"}
            size="icon"
            className={"w-6 h-6 rounded-full"}
            onClick={() => handleItemUpdateQnty(cartItem, "decrease")}
            disabled={cartItem.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="px-5 border-1 text-sm">{cartItem.quantity}</span>
          <Button
            variant={"outline"}
            size="icon"
            className={"w-6 h-6 rounded-full"}
            onClick={() => handleItemUpdateQnty(cartItem, "increase")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <p className="font-bold mr-1">Total =</p>
      <div className="flex gap-4 items-end">
        <span className="font-semibold text-md">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </span>
        <Trash2
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer"
          size={24}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
