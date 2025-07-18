import { Description, Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  description?: string;
  className?: string;
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
  ({ label, description, className, ...props }, ref) => {
    return (
      <div className="w-full max-w-auto px-4">
        <Field className="my-2">
          <Label className="text-sm/6 font-medium text-gray-300">{label}</Label>
          {description && (
            <Description className="text-sm/6 text-white/50">
              {description}
            </Description>
          )}
          <Input
            ref={ref}
            {...props}
            className={clsx(
              'mt-0 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
              className
            )}
          />
        </Field>
      </div>
    );
  }
);

export default MyInput;
