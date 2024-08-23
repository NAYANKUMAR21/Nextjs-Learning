'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

async function getAllTodos(id: string) {
  try {
    const data = await axios.get('/api/todos/' + id);
    console.log(data.data.data);
    return data.data.data;
  } catch (er: any) {
    throw Error(er.message);
  }
}
interface Todos {
  _id: string;
  todo: string;
  isCompleted: boolean;
  update: boolean;
}
export default function TodosFN() {
  // const [inputShow, setInputShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [todos, setAllTodos] = useState<Todos[]>([]);

  const params = useParams();

  console.log(params);

  const toggleComplete = async (index: number): Promise<void> => {
    let id = todos[index]._id;
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    let isCOmpleted = todos[index].isCompleted;
    setAllTodos(newTodos);
    await axios.post('/api/todos/' + id, {
      todo: inputValue,
      isCompleted: isCOmpleted,
    });
    return;
  };
  const addTodo = async (): Promise<void> => {
    setAllTodos([
      ...todos,
      {
        _id: `${todos.length}`,
        todo: inputValue,
        isCompleted: false,
        update: false,
      },
    ]);
    setInputValue('');

    await axios.post('/api/todos/', { todo: inputValue });
    let getTodos = await getAllTodos(params.slug as string);
    setAllTodos(getTodos);
    return;
  };
  const ShowInputBox = (index: number) => {
    todos[index].update = !todos[index].update;
    setAllTodos([...todos]);
  };
  const updateTodo = async (id: string, index: number): Promise<void> => {
    let isCOmpleted = todos[index].isCompleted;
    todos[index].todo = inputValue;
    await axios.post('/api/todos/' + id, {
      todo: inputValue,
      isCompleted: isCOmpleted,
    });
  };

  const deleteTodo = async (index: number): Promise<void> => {
    let id = todos[index]._id;
    setAllTodos(todos.splice(index, 1));
    await axios.delete('/api/todos/' + id);
  };
  const updateTodoText = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    console.log(index, inputValue);
    let singleTodo = todos[index];
    // setInputValue(e.target.value);
    // setAllTodos([...todos, { ...singleTodo, todo: e.target.value }]);
    singleTodo.todo = e.target.value;
    setAllTodos(todos);
    console.log(singleTodo);
    // (e) => setInputValue(e.target.value);
  };
  useEffect(() => {
    const AsynCall = async (): Promise<void> => {
      let getAllData = await getAllTodos(params.slug as string);
      setAllTodos(getAllData);
    };
    AsynCall();
  }, []);
  return (
    <div className="text-black">
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>

          {/* Input Box */}
          <div className="flex mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a new todo..."
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
            >
              Add
            </button>
          </div>

          {/* Todo List */}
          <ul>
            {todos.map(({ _id, todo, isCompleted, update }, index) => (
              <div className="flex justify-between mt-5" key={index}>
                {!update ? (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-md mb-2  overflow-scroll"
                    onClick={() => ShowInputBox(index)}
                  >
                    <span
                      className={
                        isCompleted ? 'line-through text-gray-400' : ''
                      }
                    >
                      {todo}
                    </span>
                  </li>
                ) : (
                  <div className="flex justify-between">
                    <input
                      type="text"
                      value={todo}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateTodoText(e, index)
                      }
                      className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Add a new todo..."
                    />
                    <button
                      className={`p-1 ml-3 text-sm rounded-md focus:outline-none: bg-gray-200`}
                      onClick={() => updateTodo(_id, index)}
                    >
                      Update
                    </button>
                  </div>
                )}

                <div className="flex justify-between  w-16">
                  <div>
                    <button
                      onClick={() => toggleComplete(index)}
                      className={`p-1 text-sm rounded-full focus:outline-none ${
                        isCompleted ? 'bg-green-400 text-white' : 'bg-gray-200'
                      }`}
                    >
                      {isCompleted ? '✖️' : '✔️'}
                    </button>
                  </div>
                  <div>
                    <button onClick={() => deleteTodo(index)}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
      {params.slug}
    </div>
  );
}
