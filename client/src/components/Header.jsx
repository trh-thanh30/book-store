import { Avatar, Button, Dropdown, Navbar, Spinner } from "flowbite-react";
import Logo from "./Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import ProfileModal from "../modal/ProfileModal";
import ChangePasswordModal from "../modal/ChangePasswordModal";
import { signOut } from "../redux/user/userSlice";
export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [openModalChangPassword, setOpenModalChangPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // log out
  const handleLogOut = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        console.log(data);
        dispatch(signOut());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
                <Dropdown.Item onClick={() => setOpenModalProfile(true)}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setOpenModalChangPassword(true)}>
                  Change Password
                </Dropdown.Item>
                {currentUser.role === "admin" && (
                  <Dropdown.Item>
                    <Link to="/dashboard">Dashboard</Link>
                  </Dropdown.Item>
                )}
                <Dropdown.Item>Wish List</Dropdown.Item>
                <Dropdown.Divider />
                <div
                  onClick={handleLogOut}
                  className="flex items-center w-full gap-2 px-3 py-2 text-sm text-gray-700 transition-all cursor-pointer hover:bg-red-50 hover:text-red-500"
                >
                  {loading ? (
                    <>
                      <Spinner size="sm"></Spinner>
                      <span>Loading ...</span>
                    </>
                  ) : (
                    <>
                      <CiLogout />
                      <span>Log Out</span>
                    </>
                  )}
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
      <ProfileModal
        openModalProfile={openModalProfile}
        setOpenModalProfile={setOpenModalProfile}
      ></ProfileModal>
      <ChangePasswordModal
        openModalChangPassword={openModalChangPassword}
        setOpenModalChangPassword={setOpenModalChangPassword}
      ></ChangePasswordModal>
    </>
  );
}
