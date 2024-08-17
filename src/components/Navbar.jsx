import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div className="flex justify-between items-center px-4 py-4 bg-slate-300">
                <div>
                    <h1 className="text-3xl font-bold"><Link to='/'>ProductSite</Link></h1>
                </div>
                <div>
                    <ul className="flex gap-4 items-center">
                        <li className="text-lg"><Link to='/login'>Login</Link></li>
                        <li className="text-lg"><Link to='/register'>Register</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;