"use client";
import React from "react";
import { EnquiryForm } from "./EnquiryForm";
import { CalendarIcon, MapPinIcon, UsersIcon, PhoneCall } from "lucide-react";

export function StaysEnquiry() {
  const handleSubmit = (data: Record<string, string>) => {
    // Handle stays search logic here
  };

  return (
    <EnquiryForm>
      <EnquiryForm.Field name="phone" label="Phone" placeholder="Phone Number" icon={<PhoneCall className="h-5 w-5" />} />
      <EnquiryForm.Field name="checkIn" label="Check-in Date" type="date" placeholder="Select Check In Date" />
      <EnquiryForm.Field name="checkOut" label="Check-out Date" type="date" placeholder="Select Check Out Date" />
      <EnquiryForm.Field name="guests" label="Number of Guests" type="number" placeholder="Guests" icon={<UsersIcon className="h-5 w-5" />} />
    </EnquiryForm>
  );
}
