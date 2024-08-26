import { Button, FloatingLabel } from "flowbite-react";
import { FaPhone, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { CgMail } from "react-icons/cg";
import { MdLocationPin } from "react-icons/md";
export default function Contact() {
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
            <div className="flex flex-col flex-1 gap-16 p-4 border border-black border-solid rounded-md">
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
              <div className="flex items-center gap-6">
                <div className="p-1 transition-all border border-solid rounded-full cursor-pointer border-slate-500 hover:bg-black hover:text-white">
                  <FaTwitter></FaTwitter>
                </div>
                <div className="p-1 transition-all border border-solid rounded-full cursor-pointer border-slate-500 hover:bg-black hover:text-white">
                  <FaInstagram></FaInstagram>
                </div>
                <div className="p-1 transition-all border border-solid rounded-full cursor-pointer border-slate-500 hover:bg-black hover:text-white">
                  <FaFacebook></FaFacebook>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <form className="flex flex-col gap-3" action="">
                <FloatingLabel variant="standard" label="Username" />
                <FloatingLabel variant="standard" label="Email" />
                <FloatingLabel variant="standard" label="Phone Number" />
                <FloatingLabel variant="standard" label="Message" />
                <Button gradientDuoTone={"purpleToBlue"} outline>
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
