import { JSX, useState } from 'react';
import { Todo } from '../types/Types';
import { useTodoContext } from '../context/TodoContext';
import { useUser } from '../context/UserContext';

import { FaTrash, FaEdit, FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

import EditTodo from './EditTodo';

const TodoComponent = ({ todo }: { todo: Todo }): JSX.Element => {
  const { todoDelete, todoUpdate } = useTodoContext();
  const { userState } = useUser();

  const [open, setOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async () => {
    if (!userState) return;
    await todoDelete(todo.id, userState.token);
  };

  const handleToggleComplete = async () => {
    if (!userState) return;

    await todoUpdate(
      {
        id: todo.id,
        title: todo.title,
        notes: todo.notes,
        completed: !todo.completed,
      },
      userState.token,
    );
  };

  const handleEditSubmit = async (title: string, notes: string | null) => {
    if (!userState) return;

    await todoUpdate(
      {
        id: todo.id,
        title,
        notes,
        completed: todo.completed,
      },
      userState.token,
    );
  };

  const toggleNotes = () => {
    if (todo.notes) setOpen((prev) => !prev);
  };

  const createdDate = new Date(todo.createdAt).toLocaleString();

  return (
    <>
      <div className="bg-gray-700 border border-gray-600 rounded-lg shadow mb-2 overflow-hidden">
        <div
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700 transition"
          onClick={toggleNotes}
        >
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 shrink-0 flex items-center justify-center text-gray-400">
              {todo.notes ? (
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    open ? 'rotate-180' : ''
                  }`}
                />
              ) : null}
            </span>
            <div>
              <p
                className={`text-lg font-medium ${
                  todo.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-100'
                }`}
              >
                {todo.title}
              </p>

              <p className="text-xs text-gray-400">{createdDate}</p>
            </div>
          </div>
          <div
            className="flex gap-4 text-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleToggleComplete}
              className={`transition ${
                todo.completed
                  ? 'text-green-500 hover:text-green-400'
                  : 'text-gray-500 hover:text-green-500'
              }`}
            >
              {todo.completed ? <FaCheckSquare /> : <FaRegSquare />}
            </button>

            <button
              onClick={() => setShowEdit(true)}
              className="text-blue-500 hover:text-blue-400 transition"
            >
              <FaEdit />
            </button>

            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-400 transition"
            >
              <FaTrash />
            </button>
          </div>
        </div>
        <div
          className={`grid transition-all duration-300 ease-in-out ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            {todo.notes && (
              <div className="px-4 pt-3 pb-4 text-gray-300 whitespace-pre-wrap">
                <div className="border-l-4 border-gray-600 pl-3 text-sm leading-relaxed">
                  {todo.notes}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showEdit && (
        <EditTodo
          todo={todo}
          onSubmit={handleEditSubmit}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  );
};

export default TodoComponent;
