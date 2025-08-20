"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Category {
  category_id: number;
  name: string;
}

interface CategorySelectProps {
  value: string | null;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function CategorySelect({ value, onChange, disabled }: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const selectedCategory = categories.find((cat) => cat.category_id === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-between disabled:cursor-default"
          disabled={disabled}
        >
          {selectedCategory ? selectedCategory.name : "Select a category"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[180px] overflow-y-auto">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((cat) => (
          <DropdownMenuItem
            key={cat.category_id}
            onClick={() => onChange(cat.category_id)}
          >
            {cat.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
