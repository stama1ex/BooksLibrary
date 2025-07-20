import { Input, Badge } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useFolderStore } from '../../store/folderStore';
import type { InputRef } from 'antd';

interface Props {
  folderKey: string;
  label: string;
  isEditing: boolean;
  setEditingFolderKey: (key: string | null) => void;
  bookCount: number; // 👈 добавлено
}

export const EditableTabLabel: React.FC<Props> = ({
  folderKey,
  label,
  isEditing,
  setEditingFolderKey,
  bookCount,
}) => {
  const renameFolder = useFolderStore((s) => s.renameFolder);

  const [value, setValue] = useState(label);
  const inputRef = useRef<InputRef>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select?.();
    }
  }, [isEditing]);

  useEffect(() => {
    setValue(label);
  }, [label]);

  const handleRename = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== label) {
      renameFolder(folderKey, trimmed);
    }
    setEditingFolderKey(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    timerRef.current = setTimeout(() => {
      setEditingFolderKey(folderKey);
    }, 500);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return isEditing ? (
    <Input
      maxLength={50}
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleRename}
      onPressEnter={handleRename}
      size="small"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleRename();
        }
        e.stopPropagation();
      }}
    />
  ) : (
    <div
      onDoubleClick={(e) => {
        e.stopPropagation();
        setEditingFolderKey(folderKey);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={clearTimer}
      onMouseLeave={clearTimer}
      title="Double-click or hold for 0.5s to rename"
      style={{ userSelect: 'none', cursor: 'pointer' }}
      className="flex items-center gap-2"
    >
      {label}
      {bookCount > 0 && (
        <Badge
          count={bookCount}
          style={{
            backgroundColor: '#1677ff',
            fontSize: 10,
            boxShadow: 'none',
          }}
          size="small"
        />
      )}
    </div>
  );
};
