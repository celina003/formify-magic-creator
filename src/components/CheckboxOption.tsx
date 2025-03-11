
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxOption({ id, label, checked, onChange }: CheckboxOptionProps) {
  return (
    <div className="flex items-start space-x-2 mb-2">
      <Checkbox 
        id={id} 
        checked={checked} 
        onCheckedChange={onChange} 
        className="mt-1"
      />
      <Label htmlFor={id} className="text-sm leading-tight cursor-pointer">{label}</Label>
    </div>
  );
}

export default CheckboxOption;
