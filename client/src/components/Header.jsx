import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import { useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <header className="bg-white border-b border-solid shadow-md border-slate-200">
        <Navbar>
          <Logo></Logo>
          <Search />
          <Navbar.Collapse>
            <Navbar.Link
              as={"div"}
              className={`hover:!text-blue-500 ${
                path === "/" ? "!text-blue-500" : ""
              }`}
            >
              <Link className="p-1 " to={"/"}>
                {" "}
                Home
              </Link>
            </Navbar.Link>
            <Navbar.Link
              as={"div"}
              className={`hover:!text-blue-500 ${
                path === "/about" ? "!text-blue-500" : ""
              }`}
            >
              <Link className="p-1" to={"/about"}>
                {" "}
                About
              </Link>
            </Navbar.Link>
            <Navbar.Link
              as={"div"}
              className={`hover:!text-blue-500 ${
                path === "/contact" ? "!text-blue-500" : ""
              }`}
            >
              <Link className="p-1" to={"/contact"}>
                {" "}
                Contact
              </Link>
            </Navbar.Link>
          </Navbar.Collapse>
          <div className="flex self-end md:order-2">
            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img={currentUser?.profilePicture}
                    className="object-cover"
                    rounded
                    status="online"
                    statusPosition="bottom-right"
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Change Password</Dropdown.Item>
                <Dropdown.Divider />
                <div className="flex items-center w-full gap-2 px-3 py-2 text-sm text-gray-700 transition-all cursor-pointer hover:bg-red-50 hover:text-red-500">
                  <CiLogout />
                  <span>Log Out</span>
                </div>
              </Dropdown>
            ) : (
              <Link to="/sign-in">
                <Button gradientDuoTone={"purpleToBlue"} outline>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </Navbar>
      </header>
    </>
  );
}
