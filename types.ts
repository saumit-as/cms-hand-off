export interface Stay {
  vendorId: string;
  name: string;
  price: number;
  availability: boolean;
  nextAvailability?: string;
  roomsAvailable?: number;
  imgUrls: DBImageFile[];
  description?: string;
  rating?: number;
}
export interface Food {
  foodId: string;
  name: string;
  description: string;
  price: number;
  imgUrls: DBImageFile[];
  category: "Veg" | "Non-Veg";
  availability: boolean;
  nextAvailability?: string;
  rating?: number;
  tags?: string[];
}

export interface Travel {
  vendorId: string;
  name: string;
  travelOption: "AC" | "Non-AC";
  costPerDay: number;
  availability: boolean;
  nextAvailability?: string;
  imgUrls: DBImageFile[];
  description?: string;
  rating?: number;
}

export interface DBImageFile {
  firebaseUrl: string;
  imageId: string;
}

export interface FoodItem {
  name: string;
  quantity: number;
}

export type customerInfo = {
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  foodDate: string;
  destination: string;
  pickUp: string;
  dropDown: string;
};
export interface CartContextInterface {
  customerInfo: customerInfo;
  foodItems: CartItem[];
  stayItem: CartItem[];
  travelItem: CartItem[];
  apprxTotal: 0;
  staysTotal: 0;
  travelsTotal: 0;
  foodTotal: 0;
  events: {
    updateCount: ({ itemId, count }: { itemId: string; count: number }) => void;
    updateCustomerInfo: ({ field, value }: { field: string; value: string }) => void;
    addItemsToCart: ({ catergory, items }: { catergory: keyof CartContextInterface; items: CartItem[] }) => void;
    emptyContext: () => void;
    removeItemsFromCart: ({
      removeItemPayload,
    }: {
      removeItemPayload: {
        itemType: keyof CartContextInterface;
        itemIds: string[];
      }[];
    }) => void;
  };
}

export type CartItem = {
  id: string;
  name: string;
  price: number;
} & (
  | {
      category: "food";
      itemCount: number;
    }
  | {
      category: "travel" | "stay";
    }
);

export type cartContextAction = { itemType: keyof CartContextInterface } & ({ items: CartItem[]; type: "ADD" } | { type: "REMOVE"; itemIds: string[] } | { type: "PHONE_UPDATE"; field: string; value: string } | { type: "UPDATE_COUNT"; itemId: string; count: number } | { type: "CLEAR_CART" });
