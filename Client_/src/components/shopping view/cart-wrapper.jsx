import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-item-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  // const [openCartSheet, setOpenCartSheet] = useState(false);

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (acc, item) =>
            acc +
            (item.salePrice >= 0 ? item.salePrice : item.price) * item.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md overflow-y-auto overflow-x-hidden">
      <SheetHeader className="ml-2 mt-2">
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-2 space-y-4 p-4 ml-1">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.id} cartItem={item} />
          ))
        ) : (
          <h3 className="font-semibold text-muted-foreground italic">
            Your cart is empty!
          </h3>
        )}
      </div>
      <div className="mt-2 space-y-4 p-4 ml-2">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="max-w-vw m-2 p-2"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
