import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
        className={`cursor-pointer border-red-700 ${
          selectedId?._id === addressInfo?._id
            ? "border-red-900 border-[4px]"
            : "border-black"
        }`}
    >
      <CardContent className="grid p-3 gap-3">
        <Label>Name: {addressInfo?.username}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Village/Local Area: {addressInfo?.villageLocalArea}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>State: {addressInfo?.state}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        {addressInfo?.alternativeAddress && (
          <Label>Alternate address: {addressInfo.alternativeAddress}</Label>
        )}
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>
          <AiFillEdit />
          Edit
        </Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>
          <MdDelete />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
