"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CartContext } from "@/context/CartContext";
interface DatePickerProps {
  onChange: (date: Date, bool: boolean) => void;
  value?: string | Date;
  placeholder?: string | undefined;
  isDateFilled?: boolean;
  onDateSelect?: () => void;
  minDate?: string;
}
export const DatePicker = ({ onChange, placeholder = "Select date", value, isDateFilled = true, onDateSelect, minDate }: DatePickerProps) => {
  const context = React.useContext(CartContext);
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (value) return new Date(value);
    return undefined;
  });
  const [openDP, setOpenDP] = React.useState(!value);

  const dateRange = (date: Date): boolean => {
    const onlyTodayDate = new Date();
    onlyTodayDate.setHours(0, 0, 0, 0);
    const onlyDate = new Date(date);
    onlyDate.setHours(0, 0, 0, 0);

    //CheckIn < CheckOut && PickUp < DropOff
    if (minDate) {
      const onlyMinDate = new Date(minDate);
      onlyMinDate.setHours(0, 0, 0, 0);
      if (onlyDate <= onlyMinDate) {
        return true;
      }
    }
    //Disable Past Days
    if (onlyDate < onlyTodayDate) return true;
    return false;
  };
  return (
    <div>
      <Popover open={openDP} onOpenChange={setOpenDP}>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={cn("max-w-sm w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpenDP(false);
              if (date) onChange(date, true);
              if (onDateSelect) onDateSelect();
            }}
            initialFocus={!value}
            disabled={(date) => dateRange(date)}
          />
        </PopoverContent>
      </Popover>
      {!isDateFilled && <p className="text-xs text-red-500">please fill the date</p>}
    </div>
  );
};
