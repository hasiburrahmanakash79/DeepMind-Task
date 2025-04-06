import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);


  const handleLogout = () => {
    console.log("Logout");
    logOut();
    alert("Logout");
  }

  return (
    <nav className="bg-blue-100 text-black p-4 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Next App</Link>
        <div>
          <Link to="/about" className="mr-4">About</Link>
          <Link to="/contact" className="mr-4">Contact</Link>
          <Link to="/products" className="mr-4">Products</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="mr-4">Dashboard</Link>
              <Link className="w-full" onClick={handleLogout}>
                      Log Out
                    </Link>
            </>
          ) : (
            <Link to="/login" className="mr-4">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
