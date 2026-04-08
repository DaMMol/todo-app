import { useState } from 'react';
import TodoModal from './TodoModal';
import { Todo } from '../types/Types';

const EditTodo = ({
  todo,
  onSubmit,
  onClose,
}: {
  todo: Todo;
  onSubmit: (title: string, notes: string | null) => void;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState(todo.title);
  const [notes, setNotes] = useState(todo.notes || '');

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit(title, notes.trim() || null);
    onClose();
  };

  return (
    <TodoModal onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Edit Todo </h2>
      <input
        className="w-full p-2 mb-2 border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo title"
      />
      <textarea
        rows={3}
        className="w-full p-2 mb-4 border border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-md"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes (optional)"
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        Save Changes
      </button>
    </TodoModal>
  );
};

export default EditTodo;
