"use client";

import { PhoneCall, CalendarIcon, UsersIcon, UtensilsIcon } from "lucide-react";
import React from "react";
import { EnquiryForm } from "./EnquiryForm";

export function FoodEnquiry() {
  return (
    <EnquiryForm>
      <EnquiryForm.Field name="phone" label="Phone" placeholder="Phone Number" icon={<PhoneCall className="h-5 w-5" />} />
      <EnquiryForm.Field name="foodDate" label="Delivery Date" type="date" placeholder="When do you want?" />
    </EnquiryForm>
  );
}
