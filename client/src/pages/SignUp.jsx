import { Alert, Button, Label, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const onChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrors(null);
      const res = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) setErrors(data.message);
      if (res.ok) navigate("/sign-in");
    } catch (error) {
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-10 md:mt-20">
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1">
          <div className="mb-4">
            <p className="p-2 text-sm border rounded-full text-slate-500 ">
              Welcome to my bookstore website. Here you can find any book you
              want!
            </p>
          </div>
          <div
            className={`text-5xl font-semibold dark:text-white flex flex-col gap-1`}
          >
            <span
              className={` px-2 rounded-xl text-white py-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-500 w-fit`}
            >
              HuuThanh's
            </span>
            <span className="text-blue-500 ">BooksStore</span>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            You can sign up with your email and password!
          </p>
        </div>
        {/* right */}

        <div className="flex-1 p-5 bg-white rounded-lg shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-blue-500">
                Register account!
              </h1>
              <p className="text-sm text-slate-500">
                Keep all your credetials safe!
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer"
                htmlFor="username"
                value="Username"
              ></Label>
              <input
                type="text"
                onChange={onChanges}
                placeholder="Enter your username"
                id="username"
                className={`p-3 text-sm transition-all border rounded-full text-slate-500 focus:border-blue-50 ${
                  errors === "Username is required"
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              ></input>
            </div>

            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer"
                htmlFor="email"
                value="Email Address"
              ></Label>
              <input
                type="email"
                onChange={onChanges}
                placeholder="example@gmail.com"
                id="email"
                className={`p-3 text-sm transition-all border rounded-full text-slate-500  focus:border-blue-50 ${
                  errors === "Email is required"
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              ></input>
            </div>

            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer"
                htmlFor="password"
                value="Password"
              ></Label>
              <input
                type="password"
                onChange={onChanges}
                placeholder="Password"
                id="password"
                className={`p-3 text-sm transition-all border ${
                  errors === "Password is required"
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-full text-slate-500 focus:border-blue-50`}
              ></input>
            </div>
            {errors && (
              <Alert
                className="p-3 text-sm"
                onDismiss={() => setErrors(null)}
                color={"failure"}
              >
                {errors}
              </Alert>
            )}
            <Button
              gradientDuoTone={"purpleToBlue"}
              outline
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-1">
                  <Spinner
                    aria-label="Extra large spinner button example"
                    size="sm"
                  />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : (
                <span className="text-sm">Sign Up</span>
              )}
            </Button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm">
            <span>
              Have an account?{" "}
              <Link to={"/sign-in"} className="text-blue-500">
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
