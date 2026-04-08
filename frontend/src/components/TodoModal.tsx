import { ReactNode } from 'react';

const TodoModal = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-gray-800 text-gray-100 rounded-lg shadow-xl border border-gray-700 w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default TodoModal;
