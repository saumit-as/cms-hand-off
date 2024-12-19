"use client";
import React, { useContext, useRef, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DatePicker } from "./DatePicker";
import { CartContext } from "@/context/CartContext";
import { Button } from "./ui/button";
import { Food, Stay, Travel } from "@/types";
import { Car, Home } from "lucide-react";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
interface ItemModalCardProp {
  vendorType: "stay" | "travel" | "food";
  item: Stay | Travel | Food | undefined;
  onFormClose: () => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}
type FormData = Record<string, string>;

const ItemModalForm = ({ vendorType, item, onFormClose, setShowForm }: ItemModalCardProp) => {
  const router = useRouter();
  const { toast } = useToast();
  const context = useContext(CartContext);
  const [formData, setFormData] = useState<FormData>({ ...context.customerInfo });
  const updateFormData = (field: string, value: string) => {
    context.events.updateCustomerInfo({ field: field, value: value });
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const customerInfo = context.customerInfo;
  const isStayVendor = (vendor: any): vendor is Stay => vendorType === "stay";
  const isTravelVendor = (vendor: any): vendor is Travel => vendorType === "travel";
  const isFood = (vendor: any): vendor is Food => vendorType === "food";
  const [isInDateFilled, setIsInDateFilled] = useState<boolean>(true);
  const [isOutDateFilled, setIsOutDateFilled] = useState<boolean>(true);
  const [isUpDateFilled, setIsUpDateFilled] = useState<boolean>(true);
  const [isOffDateFilled, setIsOffDateFilled] = useState<boolean>(true);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const guestsRef = useRef<HTMLInputElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);

  const validatePhoneNumbe = () => {
    const phoneRegex = /^\d{10}$/;
    if (!customerInfo.phone || !phoneRegex.test(customerInfo.phone)) {
      toast({
        variant: "destructive",
        description: "Phone number is either invalid/missing",
      });
      phoneRef.current?.focus();
      return;
    }
    return 1;
  };

  const stayFormInputFocus = () => {
    if (!customerInfo.phone) {
      phoneRef.current?.focus();
      return;
    }
    if (!customerInfo.guests) {
      guestsRef.current?.focus();
      return;
    }
    if (!customerInfo.checkIn) {
      setIsInDateFilled(false);
      return;
    }

    if (!customerInfo.checkOut) {
      setIsOutDateFilled(false);
      return;
    }
    return 1;
  };

  const travelFormInputFocus = () => {
    if (!customerInfo.phone) {
      phoneRef.current?.focus();
      return;
    }
    if (!customerInfo.destination) {
      destinationRef.current?.focus();
      return;
    }
    if (!customerInfo.pickUp) {
      setIsUpDateFilled(false);
      console.log("pickup ref");
      return;
    }

    if (!customerInfo.dropDown) {
      setIsOffDateFilled(false);
      return;
    }
    return 1;
  };

  const handleAddToCart = () => {
    if (!validatePhoneNumbe()) return;
    if (isStayVendor(item)) {
      if (!stayFormInputFocus()) return;
      context.events.addItemsToCart({ catergory: "stayItem", items: [{ category: "stay", id: item.vendorId, name: item.name, price: item.price }] });
      setIsInDateFilled(true);
      setIsOutDateFilled(true);
      onFormClose();
    } else if (isTravelVendor(item)) {
      if (!travelFormInputFocus()) return;
      context.events.addItemsToCart({ catergory: "travelItem", items: [{ category: "travel", id: item.vendorId, name: item.name, price: item.costPerDay }] });
      setIsUpDateFilled(true);
      setIsOffDateFilled(true);
      onFormClose();
    }
  };

  const handleSaveForm = () => {
    if (!validatePhoneNumbe()) return;
    if (isStayVendor(item)) {
      if (!stayFormInputFocus()) return;
    } else if (isTravelVendor(item)) {
      if (!travelFormInputFocus()) return;
    }
    setShowForm(false);
    router.back();
  };

  const searchParams = useSearchParams();
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Book Your Stay</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground mt-1 mb-1.5">Please fill in the details below to complete your booking.</DialogDescription>
      </DialogHeader>
      <div className="mt-4">
        {vendorType == "stay" && (
          <div className="space-y-4">
            <div className="flex lg:flex-row lg:space-x-6 flex-col space-y-4 lg:space-y-0">
              <div className="grid w-full max-w-sm  items-center gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input ref={phoneRef} id="phone" type="text" name="phone" value={customerInfo.phone} placeholder="Phone number" onChange={(e) => updateFormData("phone", e.target.value)} />
              </div>
              <div className="grid w-full max-w-sm  items-center gap-1.5 ">
                <Label htmlFor="guests">Guests</Label>
                <Input ref={guestsRef} id="guests" type="number" name="guests" value={customerInfo.guests} placeholder="No of Guests" onChange={(e) => updateFormData("guests", e.target.value)} />
              </div>
            </div>
            <div className="flex lg:flex-row lg:space-x-6 flex-col space-y-4 lg:space-y-0">
              <div className="grid w-full max-w-sm  items-center gap-1.5">
                <Label htmlFor="checkIn">Check In</Label>
                <DatePicker
                  isDateFilled={isInDateFilled}
                  value={customerInfo.checkIn}
                  onChange={(date, bool) => {
                    updateFormData("checkIn", date.toISOString()), setIsInDateFilled(bool);
                  }}
                  placeholder="Pick Check In Date"
                />
              </div>
              <div className="grid w-full max-w-sm  items-center gap-1.5">
                <Label htmlFor="checkOut">Check Out</Label>
                <DatePicker
                  isDateFilled={isOutDateFilled}
                  value={customerInfo.checkOut}
                  minDate={customerInfo.checkIn}
                  onChange={(date, bool) => {
                    updateFormData("checkOut", date.toISOString()), setIsOutDateFilled(bool);
                  }}
                  placeholder="Pick Check Out Date"
                />
              </div>
            </div>
          </div>
        )}
        {vendorType == "travel" && (
          <div className="space-y-4">
            <div className="flex lg:flex-row lg:space-x-6 flex-col space-y-4 lg:space-y-0">
              <div className="grid w-full max-w-sm  items-center gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input ref={phoneRef} id="phone" type="text" name="phone" value={customerInfo.phone} placeholder="Phone number" onChange={(e) => updateFormData("phone", e.target.value)} />
              </div>
              <div className="grid w-full max-w-sm  items-center gap-1.5 ">
                <Label htmlFor="destination">Destination</Label>
                <Input ref={destinationRef} id="destination" type="text" name="destination" value={customerInfo.destination} placeholder="Destination" onChange={(e) => updateFormData("destination", e.target.value)} />
              </div>
            </div>
            <div className="flex lg:flex-row lg:space-x-6 flex-col space-y-4 lg:space-y-0">
              <div className="grid w-full max-w-sm  items-center gap-1.5">
                <Label htmlFor="pickUp">Pick up</Label>
                <DatePicker
                  isDateFilled={isUpDateFilled}
                  value={customerInfo.pickUp}
                  onChange={(date, bool) => {
                    updateFormData("pickUp", date.toISOString()), setIsUpDateFilled(bool);
                  }}
                  placeholder="Select Pick Up Date"
                />
              </div>
              <div className="grid w-full max-w-sm  items-center gap-1.5">
                <Label htmlFor="dropDown">Drop off</Label>
                <DatePicker
                  isDateFilled={isOffDateFilled}
                  value={customerInfo.dropDown}
                  minDate={customerInfo.pickUp}
                  onChange={(date, bool) => {
                    updateFormData("dropDown", date.toISOString()), setIsOffDateFilled(bool);
                  }}
                  placeholder="Select Drop Down Date"
                />
              </div>
            </div>
          </div>
        )}
        {!searchParams.has("edit") ? (
          <>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Selected Item</CardTitle>
                <CardDescription>Review your booking details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className={`h-12 w-12 flex items-center justify-center rounded-full  ${vendorType === "stay" ? "bg-green-100 text-green-600" : vendorType === "travel" ? "bg-blue-100 text-blue-600" : "bg-gray-100"}`}>
                    {vendorType === "stay" && <Home className="h-6 w-6" />}
                    {vendorType === "travel" && <Car className="h-6 w-6" />}
                  </div>
                  <div>
                    <p className="font-medium">{item?.name}</p>
                    <p className="text-sm text-muted-foreground">{isStayVendor(item) || isFood(item) ? `₹${item?.price} per night` : `₹${item?.costPerDay} per day`}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </>
        ) : (
          <div className="flex mt-6 w-full">
            <Button
              type="button"
              className="bg-cms hover:bg-green-600 justify-end"
              onClick={() => {
                handleSaveForm();
              }}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemModalForm;
