// /client/src/components/ui/label.tsx
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

import { Label } from "@/components/ui/label";
  return (
    <label
      className={`text-sm font-medium leading-none ${className}`}
      {...props}
    />
  );
};
export default Label;
