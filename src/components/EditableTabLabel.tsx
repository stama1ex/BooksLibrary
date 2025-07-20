import { Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useFolderStore } from '../store/folderStore';
import type { InputRef } from 'antd';

interface Props {
  folderKey: string;
  label: string;
  isEditing: boolean;
  setEditingFolderKey: (key: string | null) => void;
}

export const EditableTabLabel: React.FC<Props> = ({ folderKey, label }) => {
  const renameFolder = useFolderStore((s) => s.renameFolder);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(label);
  const inputRef = useRef<InputRef>(null);

  // Таймер для длительного нажатия
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select?.();
    }
  }, [isEditing]);

  const handleRename = () => {
    const trimmed = value.trim();
    if (trimmed && trimmed !== label) {
      renameFolder(folderKey, trimmed);
    }
    setIsEditing(false);
  };

  // Обработчики для длительного нажатия
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    timerRef.current = setTimeout(() => {
      setIsEditing(true);
    }, 500); // 500 мс
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
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
      onKeyDown={(e) => e.stopPropagation()}
    />
  ) : (
    <div
      onDoubleClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={() => {
        clearTimer();
      }}
      onMouseLeave={() => {
        clearTimer();
      }}
      title="Double-click or hold for 0.5s to rename"
      style={{ userSelect: 'none', cursor: 'pointer' }}
    >
      {label}
    </div>
  );
};
