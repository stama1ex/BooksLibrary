import React from 'react';
import { Modal } from 'antd';
import type { ReactNode } from 'react';

interface MyModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  title?: string;
  content: string | ReactNode;
}

const MyModal: React.FC<MyModalProps> = ({
  open,
  onOk,
  onCancel,
  title = 'Confirm the action',
  content,
}) => (
  <Modal
    title={title}
    centered
    open={open}
    onOk={onOk}
    onCancel={onCancel}
    okText="Confirm"
    cancelText="Cancel"
  >
    {content}
  </Modal>
);

export default MyModal;
