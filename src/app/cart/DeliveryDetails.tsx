"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { setDeliveryDetails } from "@/redux/DeliveryDetailsSlice";
import { clearCart } from "@/redux/cartSlice";
import { toast } from 'react-toastify';



interface FormData {
  name: string;
  address: string[];
  selectedAddress: string;
  instructions: string;
}

const DeliveryDetails = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const deliveryDetails = useSelector((state: RootState) => state.deliveryDetails);
  const [savedAddresses, setSavedAddresses] = useState<string[]>(deliveryDetails.address || []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newAddressError, setNewAddressError] = useState("");

  const toastShownRef = useRef(false);




  const dispatch = useDispatch();

  useEffect(() => {
    if (deliveryDetails && Object.keys(deliveryDetails).length > 0) {
      reset(deliveryDetails);
    }
    setSavedAddresses(deliveryDetails.address || []);
    console.log(deliveryDetails);
  }, [deliveryDetails]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: deliveryDetails?.name || '',
      selectedAddress: deliveryDetails?.selectedAddress || ''
    }
  });


  // ✅ Add address logic
  const handleAddAddress = () => {
    if (!newAddress.trim()) {
      setNewAddressError("Address cannot be empty.");
      return;
    }
    if (newAddress.length < 10) {
      setNewAddressError("Address must be at least 10 characters.");
      return;
    }

    const updated = [...savedAddresses, newAddress.trim()];
    setSavedAddresses(updated);
    setValue("selectedAddress", newAddress.trim());
    setNewAddress("");
    setNewAddressError("");
    setDialogOpen(false);
  };


  const handleRemoveAddress = (index: number) => {
    const updated = savedAddresses.filter((_, i) => i !== index);
    const removedAddress = savedAddresses[index];

    setSavedAddresses(updated);
    if (watch("selectedAddress") === removedAddress) {
      setValue("selectedAddress", savedAddresses[0] || "");
    }
  };

  // ✅ Final form submit
  const onSubmit = (data: FormData) => {
    if (savedAddresses.length === 0) {
      setNewAddressError("Please add at least one address.");
      return
    }
    const { instructions, ...rest } = data;
    const deliveryDetails = { ...rest, address: savedAddresses };
    dispatch(setDeliveryDetails(deliveryDetails));

    if (cartItems.length > 0) {
      const mobileNumber = "8448725576";
      const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const message =
        `🛒 *New Order Received*\n\n` +
        `👤 *Name:* ${data.name}\n` +
        `🏠 *Address:* ${data.selectedAddress}\n` +
        `📝 *Instructions:* ${instructions?.trim() || "None"}\n\n` +
        `📦 *Items Ordered:*\n` +
        cartItems.map(
          (item) => `• ${item.name} x${item.quantity} — ₹${item.price * item.quantity}`
        ).join("\n") +
        `\n\n💰 *Total:* ₹${totalAmount} + _delivery Charges\n` +
        `\n✅ Please confirm the order.`; const whatsappUrl = `https://wa.me/${mobileNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
      reset({ instructions: "" });
      dispatch(clearCart());
    } else {
      toast.error("🛒 Your cart is empty. Please add items before placing an order.");
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-4 rounded-xl shadow-sm border border-muted bg-white">
      <CardHeader>
        <CardTitle className="text-lg text-brown">Delivery Details</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              className="form-field md:w-1/2"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
                pattern: { value: /^[a-zA-Z\s]+$/, message: "Only letters and spaces allowed" }
              })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label>Delivery Address *</Label>

            {savedAddresses.length === 0 ? (
              <p className="text-sm text-gray-500">No saved addresses yet.</p>
            ) : (
              savedAddresses.map((addr, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2">
                  <label className="flex items-center gap-2 flex-1">
                    <input
                      type="radio"
                      value={addr}
                      {...register("selectedAddress", {
                        required: "Please select a delivery address",
                      })}
                    />
                    <span className="text-sm text-brown">{addr}</span>
                  </label>

                  {savedAddresses.length >= 3 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveAddress(idx)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))
            )}
            {errors.selectedAddress && (
              <p className="text-red-500 text-sm">{errors.selectedAddress.message}</p>
            )}
            {newAddressError && savedAddresses.length === 0 && (
              <p className="text-red-500 text-sm">{newAddressError}</p>
            )}



            {/* Dialog to add new address */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  disabled={savedAddresses.length >= 3}
                >
                  + Add Delivery Address {savedAddresses.length >= 3 && ("   (Allowed upto 3 addresses)")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl w-full">
                <DialogHeader>
                  <DialogTitle>Select & Add Delivery Address</DialogTitle>
                </DialogHeader>
                <Textarea
                  id="address"
                  value={newAddress}
                  onChange={(e) => {
                    setNewAddress(e.target.value);
                    if (newAddressError) setNewAddressError(""); // Clear error on typing
                  }}
                  className="form-field"
                  rows={3}
                  placeholder="Enter full delivery address"
                />
                {newAddressError && (
                  <p className="text-red-500 text-sm mt-1">{newAddressError}</p>
                )}

                <Button className="w-full mt-2" onClick={handleAddAddress}>Add Address</Button>
              </DialogContent>
            </Dialog>
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Additional Instructions</Label>
            <Textarea
              id="instructions"
              className="form-field"
              rows={3}
              placeholder="Add special requests"
              {...register("instructions")}
            />
          </div>

          {/* Confirm */}
          <Button type="submit" className="w-full">Continue</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DeliveryDetails;
