"use client";
import { CartContextInterface, CartItem, cartContextAction } from "@/types";
import { createContext, ReactNode, useReducer } from "react";

const initalCartContext: CartContextInterface = {
  customerInfo: {
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    foodDate: "",
    destination: "",
    pickUp: "",
    dropDown: "",
  },
  foodItems: [],
  stayItem: [],
  travelItem: [],
  events: {
    updateCustomerInfo: function ({ field, value }: { field: string; value: string }): void {
      throw new Error("Function not implemented.");
    },
    addItemsToCart: function ({ catergory, items }: { catergory: keyof CartContextInterface; items: CartItem[] }): void {
      throw new Error("Function not implemented.");
    },
    removeItemsFromCart: function ({
      removeItemPayload,
    }: {
      removeItemPayload: {
        itemType: keyof CartContextInterface;
        itemIds: string[];
      }[];
    }): void {
      throw new Error("Function not implemented.");
    },
    updateCount: function ({ itemId, count }: { itemId: string; count: number }): void {
      throw new Error("Function not implemented.");
    },
    emptyContext: function (): void {
      throw new Error("Function not implemented.");
    },
  },
  apprxTotal: 0,
  staysTotal: 0,
  travelsTotal: 0,
  foodTotal: 0,
};

export const CartContext = createContext<CartContextInterface>(initalCartContext);

const getContextDataFrom = () => {
  if (typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
    const seesionData = sessionStorage.getItem("CMS_CartItems");
    if (seesionData) {
      return JSON.parse(seesionData) as CartContextInterface;
    } else {
      setContextData(initalCartContext);
    }
  }
  return initalCartContext;
};

const setContextData = (cartData: CartContextInterface) => {
  if (typeof window !== "undefined") sessionStorage.setItem("CMS_CartItems", JSON.stringify(cartData));
};

export const CartContextProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const cartReducer = (state: CartContextInterface, action: cartContextAction) => {
    if (action.itemType === "foodItems") {
      if (action.type === "ADD") {
        const cartData = { ...state, [action.itemType]: [...state[action.itemType], ...action.items] };
        setContextData(cartData);
        return cartData;
      } else if (action.type === "REMOVE") {
        const cartData = { ...state, [action.itemType]: [...state[action.itemType]].filter((item) => !action.itemIds.includes(item.id)) };
        setContextData(cartData);
        return cartData;
      }
    } else if (action.itemType === "stayItem" || action.itemType === "travelItem") {
      if (action.type === "ADD") {
        const cartData = { ...state, [action.itemType]: [...action.items] };
        setContextData(cartData);
        return cartData;
      } else if (action.type === "REMOVE") {
        const cartData = { ...state, [action.itemType]: [] };
        setContextData(cartData);
        return cartData;
      }
    } else if (action.itemType === "customerInfo") {
      if (action.type === "PHONE_UPDATE") {
        const cartData = { ...state, [action.itemType]: { ...state[action.itemType], [action.field]: action.value } };
        setContextData(cartData);
        return cartData;
      } else if (action.type === "UPDATE_COUNT") {
        const updateItem = state["foodItems"].find((item) => item.id === action.itemId);
        if (updateItem) {
          const remainingItems = state["foodItems"].filter((item) => item.id !== action.itemId);
          updateItem?.category === "food" && updateItem?.itemCount && (updateItem.itemCount = action.count);
          const cartData = { ...state, foodItems: [...remainingItems, updateItem] };
          setContextData(cartData);
          return cartData;
        }
        return state;
      }
    } else if (action.type === "CLEAR_CART") {
      return initalCartContext;
    }
    return state;
  };

  const [cartItems, dispatch] = useReducer(cartReducer, getContextDataFrom());
  const addItemsToCart = ({ catergory, items }: { catergory: keyof CartContextInterface; items: CartItem[] }) => {
    dispatch({ type: "ADD", items: items, itemType: catergory });
  };
  const updateCustomerInfo = ({ field, value }: { field: string; value: string }) => {
    dispatch({ type: "PHONE_UPDATE", field: field, value: value, itemType: "customerInfo" });
  };
  const updateCount = ({ itemId, count }: { itemId: string; count: number }) => {
    dispatch({ type: "UPDATE_COUNT", itemId: itemId, count: count, itemType: "customerInfo" });
  };
  const emptyContext = () => {
    dispatch({ type: "CLEAR_CART", itemType: "events" });
  };
  const removeItemsFromCart = ({
    removeItemPayload,
  }: {
    removeItemPayload: {
      itemType: keyof CartContextInterface;
      itemIds: string[];
    }[];
  }) => {
    removeItemPayload.forEach((value) => {
      dispatch({ type: "REMOVE", itemIds: value.itemIds, itemType: value.itemType });
    });
  };
  const contextData = {
    ...cartItems,
    events: {
      addItemsToCart,
      removeItemsFromCart,
      updateCustomerInfo,
      updateCount,
      emptyContext,
    },
  };

  return <CartContext.Provider value={contextData}>{props?.children}</CartContext.Provider>;
};
