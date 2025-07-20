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
        'select-none inline-flex items-center gap-2 rounded-md bg-gray-300 dark:bg-gray-800 active:bg-gray-400 dark:active:bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer transition-colors duration-200',
        className
      )}
    >
      {children}
    </Button>
  );
};

export default MyButton;
