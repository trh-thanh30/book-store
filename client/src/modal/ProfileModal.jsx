/* eslint-disable react/prop-types */
import { Alert, Button, Label, Modal, Spinner } from "flowbite-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import Swal from "sweetalert2";

export default function ProfileModal({
  openModalProfile,
  setOpenModalProfile,
}) {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  console.log(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username,
    email: currentUser?.email,
    profilePicture: currentUser?.profilePicture,
  });
  const [previewImage, setPreviewImage] = useState(formData.profilePicture);
  const inputRef = useRef();

  const handleChangeProfile = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleChangeProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Hiển thị ảnh xem trước
        setFormData({ ...formData, profilePicture: file }); // Cập nhật formData với file đã chọn
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // xu ly upload anh vao server
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("profilePicture", formData.profilePicture);
      // call api
      dispatch(updateUserStart());
      setSuccess(null);
      const res = await fetch("http://localhost:3000/api/user/update-user", {
        method: "PUT",
        credentials: "include",
        body: formDataToSend,
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
      } else {
        setSuccess("Profile updated successfully");
        dispatch(updateUserSuccess(data));
        setOpenModalProfile(false);
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const alertDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        // call api
        const handleDelete = async () => {
          try {
            const res = await fetch(
              `http://localhost:3000/api/user/delete-user/${currentUser._id}`,
              {
                method: "DELETE",
                credentials: "include",
              }
            );

            const data = await res.json();
            if (!res.ok) {
              dispatch(deleteUserFailure(data.message));
            } else {
              dispatch(deleteUserSuccess(data));
              navigate("/sign-in");
            }
          } catch (error) {
            dispatch(deleteUserFailure(error.message));
          }
        };
        handleDelete();
      }
    });
  };

  return (
    <Modal
      show={openModalProfile}
      onClose={() => setOpenModalProfile(false)}
      className={openModalProfile ? "modal-fade-in" : ""}
    >
      <Modal.Header className="border-b border-solid border-b-slate-200">
        Update Profile
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form className="flex flex-col gap-4" onSubmit={handleUpdateProfile}>
            <input
              onChange={handleChangeProfilePicture}
              type="file"
              ref={inputRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => inputRef.current.click()}
              src={previewImage} // Hiển thị ảnh xem trước
              alt=""
              className="w-40 h-40 mx-auto rounded-full"
            />
            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer w-fit"
                htmlFor="username"
                value="Username"
              />
              <input
                type="text"
                id="username"
                onChange={handleChangeProfile}
                defaultValue={formData.username}
                className="text-sm transition-all border rounded-lg border-slate-500 text-slate-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer w-fit"
                htmlFor="email"
                value="Email"
              />
              <input
                type="email"
                id="email"
                onChange={handleChangeProfile}
                defaultValue={formData.email}
                className="text-sm transition-all border rounded-lg border-slate-500 text-slate-500 focus:ring-blue-500"
              />
            </div>
            {error && <Alert color={"failure"}>{error}</Alert>}
            {success && (
              <Alert color={"success"} onDismiss={() => setSuccess(null)}>
                {success}
              </Alert>
            )}
            <Modal.Footer className="flex items-center justify-between pb-0 border-t border-solid border-t-slate-200">
              <p
                onClick={alertDeleteAccount}
                className="text-sm text-red-500 cursor-pointer"
              >
                Delete Account
              </p>
              <div className="flex items-center gap-2">
                <Button gradientDuoTone={"purpleToBlue"} outline type="submit">
                  {loading ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Spinner size={"sm"}></Spinner>
                      <span>Loading</span>
                    </div>
                  ) : (
                    "Update"
                  )}
                </Button>
                <Button color="gray" onClick={() => setOpenModalProfile(false)}>
                  Cancel
                </Button>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
