import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href={'/'}>Checklist</Link>
        </div>
        <div className="flex space-x-6">
          <Link href="/docs">Docs</Link>
          <Link href="/price">Price</Link>
          <Link href="/login">Login</Link>
          <Link href="/newsletter">News Letter</Link>
        </div>
        <div>
          <Link href={'/signup'}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
