import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

function AdminProductTile({
  product,
  setFormData,
  setOpenAddProductDialog,
  setCurrentEditedId,
  setUploadedImageUrl,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto pt-0">
      <div className="bg-background rounded-t-lg">
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[280px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } text-lg text-primary font-semibold`}
            >
              ${product.price}
            </span>
            {product.salePrice > 0 ? (
              <span className="text-lg font-bold">${product.salePrice}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenAddProductDialog(true);
              setCurrentEditedId(product._id);
              setFormData({ ...product });
              setUploadedImageUrl(product.image);
            }}
          >
            <AiFillEdit />
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>
            <MdDelete />
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;