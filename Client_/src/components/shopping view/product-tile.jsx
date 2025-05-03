import { useState } from "react";
import { brandOptionsmap, categoryOptionsmap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { CiShoppingTag } from "react-icons/ci";
import { TbHeartPlus, TbHeartCheck } from "react-icons/tb";
import { ShoppingBag } from "lucide-react";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Card className="w-full max-w-sm mx-auto pt-0">
      <div
        className="bg-background rounded-t-lg"
        onClick={() => handleGetProductDetails(product._id)}
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full object-cover h-[280px] rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-400 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-400 hover:bg-red-600">
              {"Only few items left"}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-400 hover:bg-red-600">
              <CiShoppingTag className="h-4 w-4" /> {/* Sale Tag */}
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          <div className="flex flex-col justify-center mb-2 gap-1">
            <span className="text-sm">{product.description}</span>
            <div className="flex gap-2 justify-center">
              <span className="text-sm">
                {categoryOptionsmap[product.category]}
              </span>
              <span className="text-sm">{brandOptionsmap[product.brand]}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } text-lg text-primary font-semibold`}
            >
              ${product.price}
            </span>
            {product.salePrice > 0 ? (
              <span className="text-lg font-bold text-primary">
                ${product.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex gap-1 w-full ">
        <Button size="icon" className="w-[22%]" onClick={toggleWishlist}>
          {isWishlisted ? <TbHeartCheck /> : <TbHeartPlus />} {/* Wishlist */}
        </Button>
        <Button
          onClick={() => handleAddToCart(product._id)}
          className="w-[78%]"
        >
          <ShoppingBag /> Add to Cart
        </Button>
        {/* {productDetails?.totalStock === 0 ? (
              <Button className="w-[78%] opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-[78%]"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )} */}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
