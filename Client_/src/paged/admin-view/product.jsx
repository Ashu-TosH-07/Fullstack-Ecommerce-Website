import CommonForm from "@/components/common-/form";
import { Button } from "@/components/ui/button";
import { Fragment, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { DialogDescription } from "@radix-ui/react-dialog";
import ProductImageUpload from "@/components/admin-view/imageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchProduct,
} from "@/store/admin/product-slice";
import { toast } from "sonner";
import AdminProductTile from "@/components/admin-view/product-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  function onSubmit(e) {
    e.preventDefault();

    const imageDataToSend = uploadedImageUrl || formData.image;

    if (currentEditedId !== null) {
      // Editing an existing product
      dispatch(
        editProduct({
          id: currentEditedId,
          formData: {
            ...formData,
            image: imageDataToSend,
          },
        })
      )
        .then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchProduct());
            setFormData(initialFormData);
            setOpenAddProductDialog(false);
            setCurrentEditedId(null);
            setUploadedImageUrl(""); // Reset uploadedImageUrl
            toast.success(
              data?.payload?.message || "Product updated successfully."
            );
          } else {
            toast.error(
              data?.payload?.message || "Failed to update the product."
            );
          }
        })
        .catch((error) => {
          console.error("Edit Error:", error);
          toast.error("Something went wrong while updating the product.");
        });
    } else {
      // Adding a new product
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      )
        .then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchProduct());
            setOpenAddProductDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            setUploadedImageUrl(""); // Reset uploadedImageUrl
            toast.success(
              data?.payload?.message || "Product added successfully."
            );
          } else {
            toast.error(data?.payload?.message || "Failed to add the product.");
          }
        })
        .catch((error) => {
          console.error("Add Error:", error);
          toast.error("Something went wrong while adding the product.");
        });
    }
  }

  function handleDelete(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data.payload.success) {
        dispatch(fetchProduct());
      }
    });
  }

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="flex justify-end mb-5 w-full">
        <Button
          onClick={() => setOpenAddProductDialog(true)}
          className="px-2 py-5 cursor-pointer"
        >
          ✚ Add New Product
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                setFormData={setFormData}
                setOpenAddProductDialog={setOpenAddProductDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                setUploadedImageUrl={setUploadedImageUrl}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openAddProductDialog}
        onOpenChange={() => {
          setOpenAddProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
          setUploadedImageUrl("");
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              <p className="font-bold text-2xl flex items-center justify-center mt-4 mb-0">
                {currentEditedId !== null
                  ? "Edit a Product"
                  : "Add New Product"}
              </p>
            </SheetTitle>
            <DialogDescription />
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
          />
          <div className="py-4 px-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControl={addProductFormElements}
              submitText={currentEditedId !== null ? "Done" : "Add"}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
