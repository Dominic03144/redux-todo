import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { addTodo, toggleTodo, deleteTodo, editTodo } from '../features/todoSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Todo.css';

const Todo: React.FC = () => {
  const [text, setText] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      toast.success('Todo added!');
      setText('');
    } else {
      toast.warning('Please enter a todo.');
    }
  };

  const handleEdit = (id: number, currentText: string) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleEditSave = () => {
    if (editText.trim() && editId !== null) {
      dispatch(editTodo({ id: editId, text: editText }));
      toast.info('Todo updated!');
      setEditId(null);
      setEditText('');
    }
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this todo?');
    if (confirmed) {
      dispatch(deleteTodo(id));
      toast.error('Todo deleted!');
    }
  };

  return (
    <div className="container">
      <h1 className="moving-header">Redux Toolkit Todo App</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleEditSave}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  className={`todo-text ${todo.completed ? 'completed' : ''}`}
                  onClick={() => {
                    dispatch(toggleTodo(todo.id));
                    toast.info('Todo toggled!');
                  }}
                >
                  {todo.text}
                </span>
                <div className="actions">
                  <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default Todo;
