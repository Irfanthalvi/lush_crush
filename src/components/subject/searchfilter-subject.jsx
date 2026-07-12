"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchFilterSubject = ({
  search,
  setSearch,
  filter,
  setFilter,
  subjects,
}) => {
  // Unique titles from the data (product names)
  const uniqueTitles = Array.from(new Set(subjects.map((sub) => sub.title)));

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      {/* Search Input */}
      <div className="w-full sm:w-56">
        <Input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full h-10 rounded-md
            border border-border 
            bg-background
            hover:border-border 
            active:border-border 
            focus-visible:ring-0 
            focus-visible:border-ring
            transition-none
          "
        />
      </div>

      {/* Filter Dropdown - by product title */}
      <div className="w-full sm:w-56">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger
            className="
              w-full h-10 rounded-md 
              border border-border 
              bg-background 
              hover:border-border 
              active:border-border 
              focus:ring-0 
              focus:border-ring
              transition-none 
              cursor-pointer
            "
          >
            <SelectValue placeholder="Filter by item" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="cursor-pointer">
              All Items
            </SelectItem>
            {uniqueTitles.map((title) => (
              <SelectItem
                key={title}
                value={title.toLowerCase()}
                className="cursor-pointer"
              >
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilterSubject;
