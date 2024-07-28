import ReactDOM from 'react-dom';

export const Portal = ({ children }: { children: React.ReactNode }) => {
  const el = document.getElementById('portal');
  return ReactDOM.createPortal(children, el!);
};
