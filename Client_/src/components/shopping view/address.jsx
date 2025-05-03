import { useEffect, useState } from "react";
import CommonForm from "../common-/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { toast } from "sonner";
import AddressCard from "./address-card";

const initialAddressFormData = {
  username: "",
  phone: "",
  villageLocalArea: "",
  city: "",
  state: "",
  pincode: "",
  alternativeAddress: "",
};


function Address({setCurrentSelectedAddress, selectedId}) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shoppingAddress);

  function handleManageAddress(event) {
    event.preventDefault();

    // Check if the form data is fully populated before dispatching
    if (
      !formData.username ||
      !formData.phone ||
      !formData.villageLocalArea ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      toast.error("Plese enter full Address!");
      return;
    }

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast.warning("You can add max 3 addresses");
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast.success("Address updated successfully");
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            toast.success("Address added successfully");
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast.success("Address deleted successfully");
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    setFormData({
      ...formData,
      username: getCuurentAddress?.username,
      phone: getCuurentAddress?.phone,
      villageLocalArea: getCuurentAddress?.villageLocalArea,
      city: getCuurentAddress?.city,
      state: getCuurentAddress?.state,
      pincode: getCuurentAddress?.pincode,
      alternativeAddress: getCuurentAddress?.alternativeAddress,
    });
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  console.log(user);
  console.log(addressList, "addressList");

  return (
    <Card>
      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3">
        {addressList && addressList.length > 0 ? (
          addressList.map((singleAddressItem) => (
            <AddressCard
              selectedId={selectedId}
              handleDeleteAddress={handleDeleteAddress}
              addressInfo={singleAddressItem}
              handleEditAddress={handleEditAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          ))
        ) : (
          <h3 className="ml-4 font-semibold text-muted-foreground italic">
            No Saved Address..
          </h3>
        )}
      </div>
      <CardHeader>
        <CardTitle className='font-bold text-xl'>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControl={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          submitText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
