"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { AlertCircle, Car, Check, Edit, Edit3, Home, MapPin, Minus, PhoneCall, Plus, ShoppingBagIcon, ShoppingCart, Trash2, Trash2Icon, Utensils } from "lucide-react";
import { CartContext } from "@/context/CartContext";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { ScrollArea } from "./ui/scroll-area";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons/faWhatsapp";
import { addCustomerInfoBooking, formatDetailsForWhatsApp, generateDocRef } from "@/app/actions";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Input } from "./ui/input";
import { DatePicker } from "./DatePicker";
import { useToast } from "@/hooks/use-toast";
type FormData = Record<string, string>;

export function CartFlyout() {
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const [noItemsInCart, setNoItemsInCart] = useState(true);
  const cartContext = React.useContext(CartContext);
  const foodItems = cartContext.foodItems;
  const stayItem = cartContext.stayItem;
  const travelItem = cartContext.travelItem;
  const customerInfo = cartContext.customerInfo;
  const router = useRouter();
  const phoneRef = React.useRef<HTMLInputElement | null>(null);
  const foodDeliveryRef = React.useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({ ...cartContext.customerInfo });
  const [cartCount, setCartCount] = useState(0);
  const updateFormData = (field: string, value: string) => {
    cartContext.events.updateCustomerInfo({ field: field, value: value });
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // const [isStayFilled, setIsStayFilled] = useState<boolean>(!!customerInfo.checkIn && !!customerInfo.checkOut && !!customerInfo.guests);
  // const [isTravelFilled, setIsTravelFilled] = useState<boolean>(!!customerInfo.destination && !!customerInfo.pickUp && !!customerInfo.dropDown);
  // const [isFoodFilled, setIsFoodFilled] = useState<boolean>(!!customerInfo.foodDate);
  const [showEdit, setShowEdit] = useState(customerInfo.phone.length < 10);

  // let isStayFilled = !!customerInfo.checkIn && !!customerInfo.checkOut && !!customerInfo.guests;
  // let isTravelFilled = !!customerInfo.destination && !!customerInfo.pickUp && !!customerInfo.dropDown;
  // let isPhoneFilled = !!(customerInfo.phone.length == 10);
  // let isFoodFilled = !!customerInfo.foodDate;

  let differenceInMilliseconds1 = customerInfo.checkIn && customerInfo.checkOut ? new Date(customerInfo.checkOut).getTime() - new Date(customerInfo.checkIn).getTime() : null;
  let differenceInMilliseconds2 = customerInfo.dropDown && customerInfo.pickUp ? new Date(customerInfo.dropDown).getTime() - new Date(customerInfo.pickUp).getTime() : null;

  let stayDaysCnt = 0;
  if (differenceInMilliseconds1) {
    stayDaysCnt = differenceInMilliseconds1 / (1000 * 60 * 60 * 24);
  }

  let travelDaysCnt = 0;
  if (differenceInMilliseconds2) {
    travelDaysCnt = differenceInMilliseconds2 / (1000 * 60 * 60 * 24);
  }

  const showAlert = () => {
    const notCompleted = [];
    let showAlert = false;
    if ((!customerInfo.phone || customerInfo.phone.length !== 10) && notCompleted.push("Phone Number")) showAlert = true;
    if (foodItems.length && !customerInfo.foodDate && notCompleted.push("Food")) showAlert = true;
    if (stayItem.length && !customerInfo.checkIn && !customerInfo.checkOut && !customerInfo.guests && notCompleted.push("Stay")) showAlert = true;
    if (travelItem.length && !customerInfo.destination && !customerInfo.pickUp && !customerInfo.dropDown && notCompleted.push("Travel")) showAlert = true;
    return { showAlert, notCompleted };
  };
  let alert = showAlert();
  React.useEffect(() => {
    alert = showAlert();
    setNoItemsInCart(!(!!foodItems.length || !!stayItem.length || !!travelItem.length));
    setCartCount(foodItems.length + stayItem.length + travelItem.length);
  }, [cartContext]);

  // const handleEdit = (field: string): void => {
  //   if (field == "phone") setIsPhoneFilled(true);
  //   if (field == "food") setIsFoodFilled(true);
  // };

  const handleEnquireNow = async () => {
    const phoneRegex = /^\d{10}$/;
    if (!customerInfo.phone || !phoneRegex.test(customerInfo.phone)) {
      toast({
        variant: "destructive",
        description: "Phone number is either invalid/missing",
      });
      // setIsPhoneFilled(true);
      phoneRef.current?.focus();
      return;
    }
    if (foodItems.length && !customerInfo.foodDate) {
      foodDeliveryRef.current?.focus();
      return;
    }
    const bookingRef = generateDocRef(`${process.env.NEXT_PUBLIC_FIREBASE_COLLECTION_NAME}`);
    const response = await addCustomerInfoBooking(
      {
        customerInfo: customerInfo,
        stayItem: stayItem,
        travelItem: travelItem,
        foodItems: foodItems,
      },
      bookingRef
    );

    // use api for this
    if (response) {
      setOrderSubmitted(true);

      const formattedMessage = formatDetailsForWhatsApp(customerInfo, stayItem, travelItem, foodItems);
      const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B919842083815&text=${formattedMessage}&app_absent=0&lang=en`;
      window.open(whatsappUrl, "_blank");
      sessionStorage.removeItem("CMS_CartItems");
      cartContext.events.emptyContext();
    } else {
      toast({
        variant: "destructive",
        description: "Some error occured please try again",
      });
    }

    //Storing data in Firestore
  };

  useEffect(() => {
    if (isFlyoutOpen) {
      window.history.pushState({ isModalOpen: true }, "Modal Open");
    }
    const handlePopState = (event: any) => {
      if (event.state && event.state.isModalOpen) {
        setIsFlyoutOpen(false);
        orderSubmitted && router.push("/");
        setOrderSubmitted(false);
      } else {
        setIsFlyoutOpen(false);
        orderSubmitted && router.push("/");
        setOrderSubmitted(false);
      }
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isFlyoutOpen]);

  return (
    <Drawer
      open={isFlyoutOpen}
      onClose={() => {
        setIsFlyoutOpen(false);
        orderSubmitted && router.push("/");
        setOrderSubmitted(false);
      }}
    >
      <DrawerTrigger
        onClick={() => {
          setIsFlyoutOpen(true);
        }}
        asChild
      >
        <div className="p-5 bg-cms text-white rounded-full shadow-lg cursor-pointer relative">
          {<div className={cn(cartCount > 0 ? "" : "hidden", "absolute bg-red-800 px-2  rounded-full left-2 top-2 ")}>{cartCount}</div>}
          <ShoppingCart height={25} width={25} />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        {orderSubmitted ? (
          <div className="h-[520px] lg:h-[624px] flex items-center justify-center flex-col gap-5">
            <div className="rounded-full outline outline-1 outline-green-700 p-5">
              <Check height={20} width={20} className="text-green-700" />
            </div>
            <p>Order succesfully received</p>
            <p>If you faced any difficulties in placing order, Don't worry our exective will be in touch with you</p>
            <Button
              className="bg-cms bg-green-600"
              onClick={() => {
                setIsFlyoutOpen(false);
                router.push("/");
                setOrderSubmitted(false);
              }}
            >
              Return Home
            </Button>
          </div>
        ) : (
          <div className="lg:p-10 p-5 flex flex-col">
            {alert.showAlert ? (
              <Alert variant="destructive" className="max-w-sm  self-end">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>You have some missing details</AlertTitle>
                <AlertDescription>{`${alert.notCompleted.join(", ")} details are missing`}</AlertDescription>
              </Alert>
            ) : (
              <></>
            )}
            <ScrollArea className="mx-auto w-full max-w-xl h-[520px] lg:h-[450px]">
              <div className="flex flex-col space-y-5 lg:space-y-8">
                <DrawerHeader>
                  <DrawerTitle className="text-center">Your Details & Bookings</DrawerTitle>
                  <DrawerDescription className="hidden">Food items in cart</DrawerDescription>
                </DrawerHeader>
                <div className="flex items-center lg:px-5 space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full text-purple-600">
                    <PhoneCall />
                  </div>
                  <div className="flex justify-between space-x-4 items-center w-4/5">
                    <p className="">Phone Number</p>
                    {!showEdit && (
                      <div className="flex gap-2">
                        <p className="text-muted-foreground">{customerInfo.phone}</p>
                        <Edit
                          className="h-4 w-4 mt-0.5 hover:text-gray-800 hover:cursor-pointer text-muted-foreground"
                          onClick={() => {
                            setShowEdit(true);
                          }}
                        />
                      </div>
                    )}

                    {showEdit && (
                      <div className="flex">
                        <Input maxLength={10} value={customerInfo.phone} ref={phoneRef} type="tel" id="phone" name="phone" pattern="^\d{10}$" onChange={(e) => updateFormData("phone", e.target.value.replace(/\D+/g, ""))} className="max-w-fit" placeholder="Enter your number" />
                        <Button
                          className="bg-purple-600 text-purple-100 hover:bg-purple-500 rounded-full ml-2"
                          onClick={() => {
                            if (customerInfo.phone.length === 10) {
                              setShowEdit(false);
                            } else {
                              phoneRef.current?.focus();
                            }
                          }}
                        >
                          <Check />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                {noItemsInCart ? (
                  <div className="flex flex-col items-center gap-5 text-muted-foreground py-10">
                    <ShoppingCart height={100} width={100} />
                    <p className="px-5 ml-2">Your cart is empty</p>
                  </div>
                ) : (
                  <div>
                    <div>
                      {stayItem.length ? (
                        <div className="lg:px-5">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full text-green-600">
                              <Home />
                            </div>
                            <div className="w-4/5 flex justify-between items-center">
                              <div>
                                <p className="">Stay</p>
                                {
                                  <div className="text-xs flex items-center">
                                    <div className="flex lg:space-x-4 space-x-1">
                                      <p>
                                        In: <span className="text-muted-foreground">{customerInfo.checkIn ? format(customerInfo.checkIn, "dd-MM-yyyy") : `-`}</span>
                                      </p>
                                      <p>
                                        Out: <span className="text-muted-foreground">{customerInfo.checkOut ? format(customerInfo.checkOut, "dd-MM-yyyy") : `-`}</span>
                                      </p>
                                      <p>
                                        Guest: <span className="text-muted-foreground">{customerInfo.guests}</span>
                                      </p>
                                    </div>
                                    <Edit
                                      onClick={() => {
                                        router.push("/stays?edit=1");
                                        setIsFlyoutOpen(false);
                                      }}
                                      className="h-4 w-4 hover:text-gray-800 hover:cursor-pointer text-muted-foreground ml-2"
                                    />
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="py-5 lg:px-10 pl-5">
                            {stayItem.map((item, idx) => (
                              <div key={item.id} className="flex items-center space-x-4">
                                <div>
                                  <p className="text-xs text-muted-foreground">{idx + 1}.</p>
                                </div>
                                <div className="flex justify-between space-x-4 items-center w-full">
                                  <p className="">{item.name}</p>
                                  <div className="flex items-center space-x-4">
                                    <p className="text-[14px]">₹{item.price * stayDaysCnt}</p>
                                    <Button
                                      size={"sm"}
                                      variant={"destructive"}
                                      onClick={() => {
                                        cartContext.events.removeItemsFromCart({ removeItemPayload: [{ itemType: "stayItem", itemIds: [item.id] }] });
                                      }}
                                      className="rounded-full"
                                    >
                                      <Trash2 />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      {travelItem.length ? (
                        <div className="lg:px-5">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
                              <Car />
                            </div>
                            <div className="w-4/5 flex justify-between items-center">
                              <div>
                                <p className="">Travel</p>
                                {
                                  <div className="flex items-center ">
                                    <div className="text-xs flex items-center lg:space-x-4 space-x-1">
                                      <p>
                                        Up: <span className="text-muted-foreground">{customerInfo.pickUp ? format(customerInfo.pickUp, "dd-MM-yyyy") : `-`}</span>
                                      </p>
                                      <p>
                                        Off: <span className="text-muted-foreground">{customerInfo.dropDown ? format(customerInfo.dropDown, "dd-MM-yyyy") : `-`}</span>
                                      </p>
                                      <p>
                                        Dest: <span className="text-muted-foreground">{customerInfo.destination}</span>
                                      </p>
                                    </div>
                                    <Edit
                                      onClick={() => {
                                        router.push("/travels?edit=1");
                                        setIsFlyoutOpen(false);
                                      }}
                                      className="h-4 w-4 hover:text-gray-800 hover:cursor-pointer text-muted-foreground ml-2"
                                    />
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="py-5 lg:px-10 pl-5">
                            {travelItem.map((item, idx) => (
                              <div key={item.id} className="flex items-center space-x-4 justify-between w-full">
                                <div className="flex items-center space-x-4">
                                  <p className="text-xs text-muted-foreground">{idx + 1}.</p>
                                  <p className="">{item.name}</p>
                                </div>
                                <div className="flex justify-between space-x-4 items-center">
                                  <p className="text-[14px]">₹{item.price * travelDaysCnt}</p>
                                  <Button
                                    size={"sm"}
                                    variant={"destructive"}
                                    onClick={() => {
                                      cartContext.events.removeItemsFromCart({ removeItemPayload: [{ itemType: "travelItem", itemIds: [travelItem[0].id] }] });
                                    }}
                                    className="rounded-full"
                                  >
                                    <Trash2Icon />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      {foodItems.length ? (
                        <div className="lg:px-5">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 rounded-full text-yellow-600">
                              <Utensils />
                            </div>
                            <div className="w-4/5 flex justify-between items-center">
                              <div>
                                <p className="">Food</p>
                                {
                                  <div className="text-xs flex">
                                    <p className="">
                                      Order Date: <span className="text-muted-foreground">{customerInfo.foodDate ? format(customerInfo.foodDate, "dd-MM-yyyy") : `-`}</span>
                                    </p>
                                    <Edit
                                      onClick={() => {
                                        router.push("/food");
                                        setIsFlyoutOpen(false);
                                      }}
                                      className="h-4 w-4 hover:text-gray-800 hover:cursor-pointer text-muted-foreground ml-2"
                                    />
                                  </div>
                                }
                              </div>
                              {
                                <div className="max-w-sm">
                                  <DatePicker value={customerInfo.foodDate} onChange={(date, bool) => updateFormData("foodDate", date.toISOString())} placeholder="When do you want?" />
                                </div>
                              }
                            </div>
                          </div>
                          <hr />
                          <div className="py-5 lg:px-10 pl-5">
                            {foodItems.map((item, idx) => (
                              <div key={item.id} className="flex items-center space-x-4">
                                <div>
                                  <p className="text-xs text-muted-foreground">{idx + 1}.</p>
                                </div>
                                <div className="flex justify-between space-x-4 items-center w-full">
                                  <div className="flex space-x-4 items-center">
                                    <p className="">{item.name}</p>
                                    <div className="flex gap-3 items-center justify-center">
                                      <div
                                        className="p-1 bg-gray-100 rounded-md"
                                        onClick={() => {
                                          item?.category === "food" && item?.itemCount - 1 ? cartContext?.events?.updateCount({ itemId: item?.id, count: Number(item?.category === "food" ? item?.itemCount ?? 0 : 0) - 1 }) : cartContext.events.removeItemsFromCart({ removeItemPayload: [{ itemType: "foodItems", itemIds: [item.id] }] });
                                        }}
                                      >
                                        <Minus className="w-4 h-4" />
                                      </div>
                                      <p className="w-full text-center text-sm">{`${item?.category === "food" && item?.itemCount}`}</p>
                                      <div
                                        className="p-1 bg-gray-100 rounded-md"
                                        onClick={() => {
                                          cartContext?.events?.updateCount({ itemId: item?.id, count: Number(item?.category === "food" ? item?.itemCount ?? 0 : 0) + 1 });
                                        }}
                                      >
                                        <Plus className="w-4 h-4" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex space-x-4 items-center">
                                    <p className="text-[14px]">₹{item.category === "food" && item.itemCount * item.price}</p>
                                    <Button
                                      size={"sm"}
                                      variant={"destructive"}
                                      onClick={() => {
                                        cartContext.events.removeItemsFromCart({ removeItemPayload: [{ itemType: "foodItems", itemIds: [item.id] }] });
                                      }}
                                      className="rounded-full"
                                    >
                                      <Trash2 />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <DrawerFooter>
              <div className="w-full flex justify-between mx-auto max-w-xl items-center">
                <DrawerClose asChild>
                  <Button>
                    <p className=" text-white">Close</p>
                  </Button>
                </DrawerClose>
                <button disabled={alert.showAlert} className={cn(`${!alert.showAlert ? "bg-green-500 cursor-pointer" : "bg-green-300 cursor-not-allowed"} hover:bg-green-300 space-x-2 py-2 px-4 lg:px-6 flex items-center rounded-full max-w-fit`)} onClick={handleEnquireNow}>
                  <FontAwesomeIcon icon={faWhatsapp} className="text-white lg:w-8 w-6 h-full" />
                  <p className=" text-white">WhatsApp us</p>
                </button>
              </div>
            </DrawerFooter>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
