'use client';
import axios from 'axios';
import { Spinner5 } from '@/Components/Loaders';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

interface Data {
  id: string | number;
  todoText: string;
  userId: string;
  isCompleted: boolean;
}
const GetTodo = async () => {
  try {
    const result = await axios.get('/api/todos/', { withCredentials: true });

    // const result = 'data';
    console.log(result.data.data);
    return result.data.data;
  } catch (er: unknown) {
    if (er instanceof Error) {
      throw new Error(er.message);
    } else {
      throw new Error('Something went wrong');
    }
  }
};
export default function Home() {
  const router = useRouter();
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);

  // const [error, setError] = useState<boolean>(false);
  const [delTodoLoader, setdelTodoLoader] = useState<boolean>(false);
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
    const userId = data[0]?.userId;
    const todoText = text;
    const isCompleted = false;

    setdelTodoLoader(true);

    const todo = await axios.post(
      '/api/todos',
      { todoText },
      { withCredentials: true }
    );
    console.log(todo);
    if (todo.data.success) {
      setdelTodoLoader(false);
      setData([
        ...data,
        {
          id: todo.data.storeData.id,
          todoText,
          userId,
          isCompleted,
        },
      ]);
      setText('');
    }

    // make axios post request along with userId
  };

  const deleteTodo = async (id: string | number) => {
    // make axios delete request

    try {
      setdelTodoLoader(true);
      const FreshArray = data.filter((ele) => ele.id !== id);
      setData(FreshArray);
      await axios.delete('/api/todos/' + id, { withCredentials: true });
      setdelTodoLoader(false);
    } catch (er: unknown) {
      setdelTodoLoader(false);
      if (er instanceof Error) {
        throw new Error(er.message);
      } else {
        throw new Error('Something went wrong');
      }
    }
  };

  const handleUpdate = useCallback(() => {
    console.log('update');
  }, []);
  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout', { withCredentials: true });
      return router.push('/login');
    } catch (er: unknown) {
      if (er instanceof Error) {
        console.log(er.message);
      } else {
        console.log('Something wrong happened....');
      }
    }
  };
  useEffect(() => {
    console.log('inside effect');
    setdelTodoLoader(true);
    GetTodo()
      .then((data) => {
        setData(data);
      })
      .catch((er) => console.log(er.message));
    setdelTodoLoader(false);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedTodo(null);
        console.log('Pressed Esc');
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [handleUpdate]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-4">
      <div className="flex justify-start w-full">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <form onSubmit={handleAddTodo} className="w-full max-w-sm mt-6">
        <div className="mb-4">
          <label htmlFor="" className="block text-white text-lg mb-2">
            Enter Todo:
          </label>
          <input
            value={text}
            type="text"
            onChange={handleReadTodo}
            className="bg-gray-700 border border-gray-600 w-full px-4 py-2 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        {delTodoLoader ? (
          <Spinner5 />
        ) : (
          data?.map((ele: Data, index: number) => {
            return (
              <div key={index}>
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
                    <div
                      onClick={() => deleteTodo(ele.id)}
                      className="w-6 h-6 border-2 border-red-600 rounded-full flex items-center justify-center"
                    ></div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Popup div to display the clicked todo */}
      {selectedTodo && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closePopup}
          >
            <div
              className="bg-white text-black p-8 rounded-lg shadow-lg relative w-2/5"
              onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the popup
            >
              <h2 className="text-lg font-bold mb-4">Todo Details</h2>
              {/* <p>{selectedTodo}</p> */}
              <div className="border-black">
                <input
                  type="text"
                  value={selectedTodo}
                  className="p-5 text-md"
                />
              </div>
              {/* Update button */}
              <button
                // onClick={() => handleUpdate(selectedTodo)} // Function to handle the update
                className="mt-4 bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg mr-10"
              >
                Update
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
