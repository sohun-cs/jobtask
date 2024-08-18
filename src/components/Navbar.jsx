import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    const navLogout = () => {
        logout()
            .then(() => {

            })
            .catch(() => {
            })
    }


    return (
        <nav>
            <div className="flex justify-between items-center px-4 py-4 bg-blue-200">
                <div className="flex items-center">
                    <img className="w-16" src="https://i.ibb.co/mHScbsL/product.png" alt="" />
                    <h1 className="text-xl lg:text-3xl font-bold text-indigo-700"><Link to='/'>ElectroHub</Link></h1>
                </div>
                <div>
                    <ul className="flex gap-4 items-center text-indigo-700 font-semibold">
                        {
                            user ?

                                <li>
                                    <Link onClick={navLogout}
                                        className="lg:text-lg"
                                        to='/'>
                                        Logout
                                    </Link>
                                </li>

                                :

                                <>
                                    <li className="text-lg"><Link to='/login'>Login</Link></li>
                                    <li className="text-lg"><Link to='/register'>Register</Link></li>
                                </>
                        }


                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;