
import React, { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  required?: boolean;
}

export function FormSection({ title, children, required = false }: FormSectionProps) {
  return (
    <div className="question-box">
      <h3 className="text-lg font-medium mb-3">
        {title}
        {required && <span className="required-asterisk">*</span>}
      </h3>
      <div>{children}</div>
    </div>
  );
}

export default FormSection;
