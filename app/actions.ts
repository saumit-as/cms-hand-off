import { db } from "@/lib/firebase";
import { getDocs, collection, addDoc, doc, DocumentReference, setDoc } from "firebase/firestore";

// Add a new document with a generated id.
export const generateDocRef = (colletionName: string): DocumentReference => {
  const newDocRef = doc(collection(db, colletionName));
  return newDocRef;
};

export const addCustomerInfoBooking = async (data: any, bookingRef: DocumentReference) => {
  try {
    await setDoc(bookingRef, data);
    console.log("Document written with ID: ", bookingRef.id);
    return 1;
  } catch (e) {
    console.error(e);
    return 0;
  }
};

export const getData = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data: any = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

export const formatDetailsForWhatsApp = (customerInfo: any, stayItem: any, travelItem: any, foodItems: any) => {
  const noItemsSelected = !(!!foodItems.length || !!stayItem.length || !!travelItem.length);

  if (!noItemsSelected) {
    let message = `Hi Chill Mount Stay,\n\nHere are my details and bookings:\n`;

    // Add phone details
    message += `Phone Number: ${customerInfo.phone || "Not provided"}\n`;

    // Add stay details
    if (stayItem.length > 0) {
      message += `\nStay Details:\n`;
      message += `Check-in: ${customerInfo.checkIn || "Not provided"}\n`;
      message += `Check-out: ${customerInfo.checkOut || "Not provided"}\n`;
      message += `Guests: ${customerInfo.guests || "Not provided"}\n`;
      stayItem.forEach((item: any, idx: any) => {
        message += `${idx + 1}. ${item.name} - ₹${item.price} per night\n`;
      });
    }

    // Add travel details
    if (travelItem.length > 0) {
      message += `\nTravel Details:\n`;
      message += `Pick-up: ${customerInfo.pickUp || "Not provided"}\n`;
      message += `Drop-down: ${customerInfo.dropDown || "Not provided"}\n`;
      message += `Destination: ${customerInfo.destination || "Not provided"}\n`;
      travelItem.forEach((item: any, idx: any) => {
        message += `${idx + 1}. ${item.name} - ₹${item.price} per day\n`;
      });
    }

    // Add food details
    if (foodItems.length > 0) {
      message += `\nFood Details:\n`;
      message += `Order Date: ${customerInfo.foodDate || "Not provided"}\n`;
      foodItems.forEach((item: any, idx: any) => {
        message += `${idx + 1}. ${item.name} - Quantity: ${item.itemCount} - ₹${item.itemCount * item.price}\n`;
      });
    }

    return encodeURIComponent(message.trim());
  } else {
    let message = `Hi Chill Mount Stay,\n\nI would like to know more about your services\n`;

    return encodeURIComponent(message.trim());
  }
};
