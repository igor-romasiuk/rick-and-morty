"use client";

import * as React from "react";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@radix-ui/react-select";

const updateUrlWithLimit = (value: string) => {
  window.location.search = `?page=1&limit=${value}`;
};

interface SelectClientProps {
  value: string;
}

export const SelectClient = ({ value }: SelectClientProps) => {
  return (
    <div className="flex flex-col items-start w-full max-w-xs mx-auto">
      <label htmlFor="limit-select" className="text-white text-sm mb-2">
        Select number of characters
      </label>
      <Select value={value} onValueChange={(value: string) => updateUrlWithLimit(value)}>
        <SelectTrigger
          id="limit-select"
          className="w-full h-14 p-4 border-2 border-green-600 rounded-lg bg-green-700 text-white shadow-lg hover:border-green-300 transition-all relative z-10 text-lg cursor-pointer"
        >
          <SelectValue placeholder="Choose number" className="text-white" />
        </SelectTrigger>
        <SelectContent
          className="bg-green-800 text-white p-2 rounded-lg shadow-lg z-20 cursor-pointer transform transition-all duration-300 ease-in-out"
          style={{ minWidth: "100%" }}
        >
          <SelectItem value="4" className="p-4 hover:bg-green-600 hover:text-white transition-all text-lg cursor-pointer">
            4 characters
          </SelectItem>
          <SelectItem value="8" className="p-4 hover:bg-green-600 hover:text-white transition-all text-lg cursor-pointer">
            8 characters
          </SelectItem>
          <SelectItem value="16" className="p-4 hover:bg-green-600 hover:text-white transition-all text-lg cursor-pointer">
            16 characters
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
