// EditableTabLabel.tsx
import { Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useFolderStore } from '../../store/folderStore';
import type { InputRef } from 'antd';

interface Props {
  folderKey: string;
  label: string;
}

export const EditableTabLabel: React.FC<Props> = ({ folderKey, label }) => {
  const renameFolder = useFolderStore((s) => s.renameFolder);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(label);
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isEditing) {
      const t = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(t);
    }
  }, [isEditing]);

  const handleRename = () => {
    if (value.trim() && value !== label) {
      renameFolder(folderKey, value.trim());
    }
    setIsEditing(false);
  };

  return isEditing ? (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleRename}
      onPressEnter={handleRename}
      size="small"
      onClick={(e) => e.stopPropagation()}
    />
  ) : (
    <div
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      title="Double-click to rename"
    >
      {label}
    </div>
  );
};
