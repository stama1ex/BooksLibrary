import { Button } from '@headlessui/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  className?: string;
}

export const MyButton: React.FC<MyButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      className={clsx(
        'inline-flex items-center gap-2 rounded-md bg-gray-800 active:bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-gray-600 cursor-pointer',
        className
      )}
    >
      {children}
    </Button>
  );
};

export default MyButton;
