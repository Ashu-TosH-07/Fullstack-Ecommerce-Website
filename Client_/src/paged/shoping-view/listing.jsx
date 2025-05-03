import ProductFilter from "@/components/shopping view/filter";
import ProductDetailsDialog from "@/components/shopping view/product-details";
import ShoppingProductTile from "@/components/shopping view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItem } from "@/store/shop/cart-slice";
import {
  fetchFilteredProduct,
  fetchProductDetails,
} from "@/store/shop/product-slice";
// import { console } from "inspector";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramvalue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramvalue)}`);
    }
  }

  return queryParams.join("&");
}

function ShopingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shoppingProducts
  );
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  

  // useEffect(() => {
  //   const savedFilters = JSON.parse(sessionStorage.getItem("filters"));
  //   const savedSort = sessionStorage.getItem("sort") || "price-lowtohigh";

  //   const loadedFilters = savedFilters || {};
  //   setFilters(loadedFilters);
  //   setSort(savedSort);

  //   dispatch(
  //     fetchFilteredProduct({
  //       filterParams: loadedFilters,
  //       sortParams: savedSort,
  //     })
  //   );
  // }, [dispatch]);

  useEffect(() => {
    const savedSort = sessionStorage.getItem("sort") || "price-lowtohigh";
    setSort(savedSort);

    const category = searchParams.get("category");
    const filterObj =
      category !== null
        ? { Category: [category] }
        : JSON.parse(sessionStorage.getItem("filters") || "null") || {};

    setFilters(filterObj);

    dispatch(
      fetchFilteredProduct({
        filterParams: filterObj,
        sortParams: savedSort,
      })
    );
  }, [searchParams, dispatch]);

  useEffect(() => {
    const queryString = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(queryString).toString());
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (sort && filters) {
      dispatch(
        fetchFilteredProduct({
          filterParams: filters,
          sortParams: sort,
        })
      );
    }
  }, [filters, sort, dispatch]);

  function handleSort(value) {
    setSort(value);
    sessionStorage.setItem("sort", value);

    dispatch(
      fetchFilteredProduct({
        filterParams: filters,
        sortParams: value,
      })
    );
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let updatedFilters = { ...filters };

    if (!updatedFilters[getSectionId]) {
      updatedFilters[getSectionId] = [getCurrentOption];
    } else {
      const optionIndex =
        updatedFilters[getSectionId].indexOf(getCurrentOption);
      if (optionIndex === -1) {
        updatedFilters[getSectionId].push(getCurrentOption);
      } else {
        updatedFilters[getSectionId].splice(optionIndex, 1);
        if (updatedFilters[getSectionId].length === 0) {
          delete updatedFilters[getSectionId];
        }
      }
    }

    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

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

  useEffect(() => {
    if (productDetails) {
      setOpenDetailsDialog(true);
    } else {
      setOpenDetailsDialog(false);
    }
  }, [productDetails]);

  console.log("Product List", productList);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold text-lg"> All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className=" h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
          {productList && productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile
                handleGetProductDetails={handleGetProductDetails}
                key={productItem._id}
                product={productItem}
                handleAddToCart={handleAddToCart}
              />
            ))
          ) : (
            <h2>No products available.</h2>
          )}
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShopingListing;
