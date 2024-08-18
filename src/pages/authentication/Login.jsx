import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {

    const { login, googleSignIn } = useContext(AuthContext);


    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(true);
  


    const handleLogin = e => {
        e.preventDefault();

        const form = new FormData(e.currentTarget)

        const email = form.get("email");
        const password = form.get("password");

        e.target.reset();



        login(email, password)
            .then(() => {
                toast.success("Login Successfully!");
                navigate(location?.state ? location.state : '/');
            })
            .catch(() => {

                toast.error("User not found")
            })
    }


    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        googleSignIn(provider)
            .then(() => {
                toast.success("Login Successfully!");
                navigate(location?.state ? location.state : '/');

            })
            .catch(error => {
                console.error(error);
            })
    }


    return (
        <div className={` bg-[url('https://i.ibb.co/87P5DHm/Polygon-Luminary-1.png')] bg-no-repeat bg-cover `}>
            <div className="max-w-[1536px] mx-auto min-h-[calc(100vh-112px)] flex justify-center items-center">
                <div className="bg-indigo-100 bg-opacity-40 p-10 lg:m-20 ">

                    <form onSubmit={handleLogin}>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            <div className=''>
                                <img src='https://i.ibb.co/w0v1XrC/registeration.png' alt="" />
                            </div>

                            <div className="max-w-full max-h-full flex flex-col items-center justify-center">
                                <h1
                                    className="text-indigo-800 font-semibold text-center text-2xl my-4">
                                    Login Now!
                                </h1>


                                <div className="space-y-2 w-full">

                                    <div>
                                        <input
                                            className=" font-medium border-b-2 border-indigo-300 py-3 px-4 my-3 focus:outline-none focus:border-b-2 placeholder-indigo-300 focus:border-indigo-700 w-full"
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            required />
                                    </div>

                                    <div className="relative">
                                        <input
                                            className=" font-medium border-b-2 border-indigo-300 py-3 px-4 my-3 focus:outline-none focus:border-b-2 placeholder-indigo-300 focus:border-indigo-700 w-full"
                                            type={showPassword ? 'password' : 'text'}
                                            name="password"
                                            placeholder="Password"
                                            required />

                                        <div
                                            onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-7">
                                            {
                                                showPassword ? <FaEye className="text-indigo-700"></FaEye> : <FaEyeSlash className="text-indigo-700"></FaEyeSlash>
                                            }
                                        </div>

                                    </div>

                                    <div>
                                        <input
                                            className="w-full bg-indigo-700 font-semibold text-indigo-200 py-3 mt-3 border-2 border-indigo-700 hover:bg-transparent duration-500 hover:border-2 hover:text-indigo-700 hover:border-indigo-700 cursor-pointer"
                                            type="submit"
                                            value='Login' />
                                    </div>

                                    <div className="text-center text-sm mt-4">
                                        <p>
                                            Are you new here? <Link className="font-bold text-rose-500 cursor-pointer" to="/register">Register</Link> now!
                                        </p>
                                    </div>

                                    <div className="flex text-3xl justify-center gap-4 pt-4">
                                        <Link onClick={handleGoogleSignIn} to=""><FcGoogle className="hover:scale-110 duration-700 cursor-pointer" /></Link>
                                        
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;