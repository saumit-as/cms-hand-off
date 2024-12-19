"use client";
import React, { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartContext } from "@/context/CartContext";
import { DatePicker } from "./DatePicker";

type FormData = Record<string, string | Date>;

interface FormContextType {
  formData: FormData;
  updateFormData: (field: string, value: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface EnquiryFormProps {
  // onSubmit: (data: FormData) => void;
  children: React.ReactNode;
}

export function EnquiryForm({ children }: EnquiryFormProps) {
  const context = useContext(CartContext);
  const [formData, setFormData] = useState<FormData>({ ...context.customerInfo });
  console.log(formData);
  const updateFormData = (field: string, value: string) => {
    context.events.updateCustomerInfo({ field: field, value: value });
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  // };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      <form className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">{children}</div>
        <div className="mt-4 flex space-x-4 items-center w-full justify-between lg:text-sm text-xs text-muted-foreground">
          <p>Simplify Your Plans with Pre-Booked Services</p>
        </div>
      </form>
    </FormContext.Provider>
  );
}

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

export function Field({ name, label, type = "text", placeholder, icon }: FieldProps) {
  const context = useContext(FormContext);
  if (!context) throw new Error("Field must be used within a EnquiryForm");

  const { formData, updateFormData } = context;

  return (
    <div className="space-y-2">
      <label htmlFor={name}>{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
        {type === "date" ? (
          <DatePicker value={formData[name]} onChange={(date) => updateFormData(name, date.toISOString())} placeholder={placeholder} />
        ) : (
          <Input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={
              formData[name] instanceof Date
                ? formData[name].toISOString().split("T")[0] // Convert Date to YYYY-MM-DD
                : formData[name] || ""
            }
            onChange={(e) => updateFormData(name, e.target.value)}
            className={icon ? "pl-10" : ""}
            required
          />
        )}
      </div>
    </div>
  );
}

EnquiryForm.Field = Field;
