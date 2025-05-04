import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  CircleUserRound,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
} from "lucide-react";
import { GiHearts } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { shoppingHeaderMenuItem } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItem } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import logoImg from "../../assets/X-Plore.png";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");

    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            Category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center lg:flex-row gap-6">
      {shoppingHeaderMenuItem.map((menuItem) => (
        <Label
          key={menuItem.id}
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-300"
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openCartSheet, setOpenCartSheet] = useState(false);

  function handleLogout() {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login"); 
  }

  useEffect(() => {
    dispatch(fetchCartItem(user?.id));
  }, [dispatch]);

  return (
    <div className="flex items-center gap-4">
      <Link to="/shop/search" size="icon" className="cursor-pointer">
        <Search />
      </Link>
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="cursor-pointer relative"
        >
          <ShoppingCart className="h-6 w-6" />

          {cartItems?.items?.length > 0 ? (
            <span className="absolute top-[-11px] right-[-2px] text-sm font-medium bg-red-400 text-white h-5 w-5 rounded-full">
              {cartItems?.items?.length}
            </span>
          ) : null}
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarImage />
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigate("/shop/account");
            }}
          >
            <CircleUserRound className="m-2 w-6 h-6" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/shop/wishlist")}>
            <GiHearts className="m-2 w-6 h-6" />
            Wishlists
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="m-2 w-6 h-6" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShopingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex justify-between items-center h-16 px-4 md:px-6 ">
        {/* Mobile View */}
        <div className="lg:hidden flex justify-between items-center w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-6">
              <MenuItems />
            </SheetContent>
          </Sheet>
          <Link to="/shop/home" className="flex items-center gap-2">
            <GoHomeFill className="h-6 w-6" />
            <span className="font-bold tracking-normal text-xl"> X-PLoRE</span>
            {/* <img src={logoImg} alt="Logo" className="w-[120px] h-[60px]"/> */}
          </Link>
          <HeaderRightContent />
        </div>

        {/* Desktop View */}
        <div className="hidden lg:flex justify-between items-center w-full">
          <Link to="/shop/home" className="flex items-center gap-2 ">
            <GoHomeFill className="h-6 w-6" />
            <span className="font-bold tracking-normal text-xl"> X-PLoRE</span>
          </Link>
          <MenuItems />
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShopingHeader;
