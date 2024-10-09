import { Outlet, Link } from 'react-router-dom';

function RootLayout() {
  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/new" className="mr-4">Add Secret</Link>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;