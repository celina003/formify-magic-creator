
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioOptionProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export function RadioOption({ id, name, value, label, checked, onChange }: RadioOptionProps) {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <RadioGroupItem 
        id={id} 
        value={value} 
        checked={checked}
        onClick={() => onChange(value)}
      />
      <Label htmlFor={id} className="text-sm cursor-pointer">{label}</Label>
    </div>
  );
}

export default RadioOption;
