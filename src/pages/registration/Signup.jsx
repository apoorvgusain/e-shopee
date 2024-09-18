/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { fireDB, auth } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const [userSignUp, setUserSignUp] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const userSignUpFunction = async () => {
    if (
      userSignUp.name === "" ||
      userSignUp.email === "" ||
      userSignUp.password === ""
    ) {
      toast.error("All Fields are required ");
    }
    console.log(userSignUp);
    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignUp.email,
        userSignUp.password
      );
      console.log(users);
      const user = {
        name: userSignUp.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignUp.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      const userReference = collection(fireDB, "user");
      addDoc(userReference, user);
      setUserSignUp({
        name: "",
        email: "",
        password: "",
      });
      toast.success("Signup Successfully");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Login Form  */}
      <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500 ">
            Signup
          </h2>
        </div>

        {/* Input One  */}
        <div className="mb-3">
          <input
            onChange={(e) => {
              setUserSignUp({
                ...userSignUp,
                name: e.target.value,
              });
            }}
            type="text"
            placeholder="Full Name"
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Input Two  */}
        <div className="mb-3">
          <input
            onChange={(e) => {
              setUserSignUp({
                ...userSignUp,
                email: e.target.value,
              });
            }}
            type="email"
            placeholder="Email Address"
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Input Three  */}
        <div className="mb-5">
          <input
            onChange={(e) => {
              setUserSignUp({
                ...userSignUp,
                password: e.target.value,
              });
            }}
            type="password"
            placeholder="Password"
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Signup Button  */}
        <div className="mb-5">
          <button
            type="button"
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
            onClick={userSignUpFunction}
          >
            SignUp
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Have an account{" "}
            <Link className=" text-pink-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>{" "}
      {loading === true ? <Loader /> : ""}
    </div>
  );
};

export default Signup;
