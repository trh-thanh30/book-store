/* eslint-disable react/no-unescaped-entities */
import { Footer } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsDribbble,
  BsGithub,
} from "react-icons/bs";
import Logo from "./Logo";
export default function FooterCom() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid justify-between w-full sm:flex sm:justify-between md:flex md:grid-cols-1 ">
          <div className="mb-4">
            <Logo></Logo>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Huu Thanh's</Footer.Link>
                <Footer.Link href="https://mern-blog-ahrr.onrender.com/">
                  Huu Thanh's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by="HuuThanh's™" year={2024} />
          <div className="flex mt-4 space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              className="hover:text-blue-500"
              href="#"
              icon={BsFacebook}
            />
            <Footer.Icon
              className="hover:text-blue-500"
              href="#"
              icon={BsInstagram}
            />
            <Footer.Icon
              className="hover:text-blue-500"
              href="#"
              icon={BsTwitter}
            />
            <Footer.Icon
              className="hover:text-blue-500"
              href="#"
              icon={BsGithub}
            />
            <Footer.Icon
              className="hover:text-blue-500"
              href="#"
              icon={BsDribbble}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
