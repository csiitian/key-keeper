import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function RootLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">Secret Manager</div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/new" className="hover:underline">Add Secret</Link>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link to="/" className="block px-4 py-2 hover:bg-gray-700 rounded" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/new" className="block px-4 py-2 hover:bg-gray-700 rounded" onClick={toggleMenu}>
              Add Secret
            </Link>
          </div>
        )}
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;