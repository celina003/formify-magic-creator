
import React from "react";
import { cn } from "@/lib/utils";

interface RatingScaleProps {
  min: number;
  max: number;
  value: number | null;
  onChange: (value: number) => void;
  showLabels?: boolean;
  minLabel?: string;
  maxLabel?: string;
}

export function RatingScale({
  min,
  max,
  value,
  onChange,
  showLabels = false,
  minLabel = "",
  maxLabel = "",
}: RatingScaleProps) {
  const ratings = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="w-full">
      <div className="flex items-center">
        {showLabels && minLabel && (
          <span className="text-sm text-gray-500 mr-2">{minLabel}</span>
        )}
        <div className="flex-grow rating-scale">
          {ratings.map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onChange(rating)}
              className={cn(
                value === rating ? "selected" : "",
                "focus:outline-none focus:ring-2 focus:ring-blue-500"
              )}
              aria-label={`Rating ${rating}`}
            >
              {rating}
            </button>
          ))}
        </div>
        {showLabels && maxLabel && (
          <span className="text-sm text-gray-500 ml-2">{maxLabel}</span>
        )}
      </div>
    </div>
  );
}

export default RatingScale;
