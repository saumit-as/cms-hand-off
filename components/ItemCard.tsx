"use client";

import { Suspense, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon, Trash } from "lucide-react";
import { ItemCardModal } from "./ItemModalCard";
import { CartItem, Food, Stay, Travel } from "@/types";
import { CartContext } from "@/context/CartContext";

export function ItemCard({ item, type }: { item: Stay | Travel | Food; type: "stay" | "travel" | "food" }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartContext = useContext(CartContext);
  const isStayVendor = (vendor: any): vendor is Stay => type === "stay";
  const isTravelVendor = (vendor: any): vendor is Travel => type === "travel";
  const isFood = (vendor: any): vendor is Food => type === "food";
  const [foodItem, setFoodItem] = useState<CartItem>();
  useEffect(() => {
    if (isFood(item)) {
      setFoodItem(cartContext.foodItems.find((food) => food.id === item.foodId));
    }
  }, [cartContext]);
  return (
    <>
      <Card
        className="overflow-hidden cursor-pointer transition-shadow hover:shadow-lg w-full max-w-2xl mx-auto"
        onClick={() => {
          !isFood(item) && setIsModalOpen(true);
        }}
      >
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row h-full">
            <div className="relative w-full md:w-2/5 min-h-48 md:h-auto">
              <Image src={item.imgUrls[0]?.firebaseUrl || "/placeholder.svg"} alt={item.name || "Placeholder image"} layout="fill" sizes="100%" objectFit="cover" priority />
            </div>
            <div className="flex flex-col justify-between p-4 md:w-3/5">
              <div>
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                {isTravelVendor(item) && <p className="text-sm text-cms">{item.availability ? `Available` : `Next available: ${item.nextAvailability}`}</p>}
                {isFood(item) && <p className="text-sm text-cms">{item.availability ? `Available` : `Next available: ${item.nextAvailability}`}</p>}
                {isStayVendor(item) && <p className="text-sm text-cms">{item.availability ? `${item.roomsAvailable} rooms left` : `Next available: ${item.nextAvailability}`}</p>}
              </div>
              <div className="flex justify-between items-center mt-4">
                {isStayVendor(item) && (
                  <p className="text-lg font-bold">
                    ₹{item.price} <span className="text-sm text-muted-foreground font-normal">per night</span>
                  </p>
                )}
                {isTravelVendor(item) && (
                  <p className="text-lg font-bold">
                    ₹{item.costPerDay} <span className="text-sm text-muted-foreground font-normal">per day</span>
                  </p>
                )}
                {isFood(item) && (
                  <p className="text-lg font-bold">
                    ₹{item.price} <span className="text-sm text-muted-foreground font-normal">per qty</span>
                  </p>
                )}
                <div>
                  {isFood(item) &&
                    (!foodItem ? (
                      <Button
                        className="w-sm bg-cms hover:bg-green-600"
                        onClick={() => {
                          cartContext.events.addItemsToCart({ catergory: "foodItems", items: [{ category: "food", id: item.foodId, name: item.name, itemCount: 1, price: item.price }] });
                        }}
                      >
                        Add to cart
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <div className="flex gap-3 items-center justify-center">
                          <Button
                            variant={"outline"}
                            size={"sm"}
                            onClick={() => {
                              foodItem?.category === "food" && foodItem?.itemCount - 1 ? cartContext?.events?.updateCount({ itemId: item?.foodId, count: Number(foodItem?.category === "food" ? foodItem?.itemCount ?? 0 : 0) - 1 }) : cartContext.events.removeItemsFromCart({ removeItemPayload: [{ itemType: "foodItems", itemIds: [item.foodId] }] });
                            }}
                          >
                            -
                          </Button>
                          <span className="w-full text-center">{`${foodItem?.category === "food" && foodItem?.itemCount}`}</span>
                          <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={() => {
                              cartContext?.events?.updateCount({ itemId: item?.foodId, count: Number(foodItem?.category === "food" ? foodItem?.itemCount ?? 0 : 0) + 1 });
                            }}
                          >
                            +
                          </Button>
                          <Button
                            variant={"destructive"}
                            size={"sm"}
                            onClick={() => {
                              cartContext.events.removeItemsFromCart({ removeItemPayload: [{ itemType: "foodItems", itemIds: [item.foodId] }] });
                            }}
                          >
                            <Trash />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Suspense fallback={<></>}>
        <ItemCardModal type={type} vendor={item} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </Suspense>
    </>
  );
}
