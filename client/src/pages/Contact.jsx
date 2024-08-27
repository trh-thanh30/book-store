import { Alert, Button, FloatingLabel, Spinner } from "flowbite-react";
import { FaPhone, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { MdLocationPin } from "react-icons/md";
import { useState } from "react";
export default function Contact() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const onChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const res = await fetch(
        "http://localhost:3000/api/contacts/user-contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setLoading(true);
      if (!res.ok) setError(data.message);
      if (res.ok) {
        setFormData({});
        setError(null);
        setSuccess(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="h-screen">
        <div className="flex flex-col mt-16 text-center">
          <h1 className="gap-1 text-4xl font-bold">Contact Us</h1>
          <p className="text-sm text-slate-500">
            Any question or remarks? Just write us a message!
          </p>
        </div>
        <div className="flex items-center justify-center mt-14">
          <div className="flex items-center gap-6">
            <div className="flex flex-col flex-1 gap-16 p-4 border border-solid rounded-lg border-slate-300">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">Contact Information</h2>
                <p className="text-sm text-slate-500">
                  Say something to start a live chat!
                </p>
              </div>
              <div className="flex flex-col gap-5 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <FaPhone></FaPhone>
                  <span>+1012 3456 789</span>
                </div>
                <div className="flex items-center gap-1">
                  <CgMail className="text-xl"></CgMail>
                  <span>admin@gmail.com</span>
                </div>
                <div className="flex items-center gap-1">
                  <MdLocationPin className="text-2xl"></MdLocationPin>
                  <span className="">
                    132 Dartmouth Street Boston, Massachusetts 02156 United
                    States
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-slate-500">
                <div className="p-1 transition-all border border-solid rounded-full cursor-pointer border-slate-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500">
                  <FaTwitter></FaTwitter>
                </div>
                <div className="p-1 transition-all border border-solid rounded-full cursor-pointer border-slate-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500">
                  <FaInstagram></FaInstagram>
                </div>
                <div className="p-1 transition-all border border-solid rounded-full cursor-pointer border-slate-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500">
                  <FaFacebook></FaFacebook>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <FloatingLabel
                  id="username"
                  onChange={onChanges}
                  variant="standard"
                  label="Username"
                />
                <FloatingLabel
                  id="email"
                  onChange={onChanges}
                  variant="standard"
                  label="Email"
                />
                <FloatingLabel
                  id="phone"
                  onChange={onChanges}
                  variant="standard"
                  label="Phone Number"
                />
                <FloatingLabel
                  id="message"
                  onChange={onChanges}
                  variant="standard"
                  label="Message"
                />
                {error && (
                  <Alert color="failure" onDismiss={() => setError(null)}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert color={"success"} onDismiss={() => setSuccess(null)}>
                    {success}
                  </Alert>
                )}
                <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
                  {loading ? (
                    <div className="flex items-center gap-1">
                      <Spinner size="sm"></Spinner>
                      <span>Loading ...</span>
                    </div>
                  ) : (
                    <span>Send Message</span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
