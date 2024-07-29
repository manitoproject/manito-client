import { createPortal } from 'react-dom';

export const Portal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById('portal');
  return createPortal(children, el!);
};
