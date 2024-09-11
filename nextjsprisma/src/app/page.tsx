'use client';
import axios from 'axios';
import Spinner5 from '@/Components/Loaders';
import { NextResponse } from 'next/server';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Data {
  id: string | number;
  todoText: string;
  userId: string;
  isCompleted: boolean;
}
const GetTodo = async (id: string) => {
  try {
    let result = await axios.get('/api/todos/' + id, { withCredentials: true });
    return result.data;
  } catch (er: any) {
    throw new Error(er.message);
  }
};
export default function Home(req: NextResponse) {
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);
  const [text, setText] = useState<string>('');

  const handleReadTodo = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const handleTodoClick = (todoText: string) => {
    setSelectedTodo(todoText);
  };

  const closePopup = () => {
    setSelectedTodo(null); // Closes the popup when clicked outside or on close
  };
  const handleAddTodo = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    // make axios post request
    e.preventDefault();
    let userId = data[0]?.userId;
    let todoText = text;
    let isCompleted = false;

    setLoading(true);
    setData([...data, { id: data.length - 1, todoText, userId, isCompleted }]);

    await axios.post('/api/todos', { todoText, userId });

    setLoading(false);
    // make axios post request along with userId
  };

  const deleteTodo = (id: string | number) => {
    // make axios delete request
    setData(data.filter((ele) => ele.id !== id));
  };

  const handleUpdate = () => {
    // console.log()
  };
  useEffect(() => {
    console.log('inside effect');
  }, []);

  if (loading) {
    return <Spinner5 />;
  }
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4">
      <form onSubmit={handleAddTodo} className="w-full max-w-sm mt-6">
        <div className="mb-4">
          <label htmlFor="" className="block text-white text-lg mb-2">
            Enter Todo:
          </label>
          <input
            type="text"
            onChange={handleReadTodo}
            className="w-full px-4 py-2 text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add your todo"
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
            Add Todo
          </button>
        </div>
      </form>
      <div className="w-full max-w-sm mt-8">
        {data?.map((ele: Data, index: number) => {
          return (
            <>
              <div
                key={index}
                className="bg-gradient-to-r bg-slate-50  text-black p-4 my-2 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 flex justify-between items-center border border-black"
                // from-purple-400 via-pink-500 to-red-500
              >
                <div
                  onClick={() => handleTodoClick(ele.todoText)}
                  className="flex-1"
                >
                  <span>{ele.todoText}</span>
                </div>
                <div className="ml-4">
                  <input
                    type="radio"
                    className="form-radio text-purple-600 w-6 h-6" // Makes the radio button bigger
                  />
                </div>
              </div>
            </>
          );
        })}
      </div>
      {/* Popup div to display the clicked todo */}
      {selectedTodo && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closePopup}
          >
            <div
              className="bg-white text-black p-8 rounded-lg shadow-lg relative"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the popup
            >
              <h2 className="text-lg font-bold mb-4">Todo Details</h2>
              <p>{selectedTodo}</p>

              {/* Update button */}
              <button
                // onClick={() => handleUpdate(selectedTodo)} // Function to handle the update
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-10"
              >
                Update
              </button>
              <button
                // onClick={() => handleUpdate(selectedTodo)} // Function to handle the update
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                ✔️
              </button>

              <button
                onClick={closePopup}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full"
              >
                X
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
