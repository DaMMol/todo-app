import { useState } from 'react';
import TodoModal from './TodoModal';
import useInput from '../hooks/useInput';
import InputBase from './InputBase';

const CreateTodo = ({
  onSubmit,
  onClose,
}: {
  onSubmit: (title: string, notes: string | null) => void;
  onClose: () => void;
}) => {
  const [notes, setNotes] = useState('');

  const todoTitle = useInput({
    placeholder: 'Todo Title',
    className: 'w-full p-2 mb-2',
    required: true,
    maxLength: '100',
  });

  const handleSubmit = () => {
    if (!todoTitle.value.trim()) return;

    onSubmit(todoTitle.value, notes.trim() || null);

    todoTitle.onChange();
    setNotes('');
    onClose();
  };

  return (
    <TodoModal onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Create Todo </h2>
      <InputBase props={todoTitle} />
      <textarea
        placeholder="Notes (optional)..."
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md"
        maxLength={500}
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        Create Todo
      </button>
    </TodoModal>
  );
};

export default CreateTodo;
