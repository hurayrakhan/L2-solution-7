"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { Input, type InputProps } from "@/components/ui/input";

export interface SearchInputProps extends Omit<InputProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  debounceMs?: number;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  debounceMs = 300,
  placeholder = "Search...",
  className,
  ...props
}: SearchInputProps) {
  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [localValue, debounceMs, onChange, value]);

  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      leftIcon={<Search className="size-4" />}
      rightIcon={
        localValue ? (
          <button
            type="button"
            onClick={() => {
              setLocalValue("");
              onChange("");
              onClear?.();
            }}
            className="p-1 hover:text-slate-700 dark:hover:text-slate-200 transition-colors focus:outline-none"
          >
            <X className="size-3.5" />
          </button>
        ) : undefined
      }
      className={className}
      {...props}
    />
  );
}
