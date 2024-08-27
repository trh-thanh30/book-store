/* eslint-disable react/prop-types */
import { Alert, Button, Label, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordModal({
  openModalChangPassword,
  setOpenModalChangPassword,
}) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const onChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      setError(null);
      // call api
      const res = await fetch(
        "http://localhost:3000/api/user/refesh-paasword",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.message);
      } else {
        setOpenModalChangPassword(false);
        navigate("/sign-in");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Modal
      show={openModalChangPassword}
      onClose={() => setOpenModalChangPassword(false)}
      className={openModalChangPassword ? "modal-fade-in" : ""}
    >
      <Modal.Header className="border-b border-solid border-b-slate-200">
        Change Password
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer w-fit"
                htmlFor="password"
                value="Password"
              />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={onChanges}
                className="text-sm transition-all border rounded-lg border-slate-500 text-slate-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer w-fit"
                htmlFor="newPassword"
                value="New Password"
              />
              <input
                type="password"
                id="newPassword"
                placeholder="Enter your new password"
                onChange={onChanges}
                className="text-sm transition-all border rounded-lg border-slate-500 text-slate-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer w-fit"
                htmlFor="confirmNewPassword"
                value="Confirm New Password"
              />
              <input
                type="password"
                id="confirmNewPassword"
                placeholder="Enter your confirm new password"
                onChange={onChanges}
                className="text-sm transition-all border rounded-lg border-slate-500 text-slate-500 focus:ring-blue-500"
              />
            </div>
            {error && (
              <Alert color={"failure"} onDismiss={() => setError(null)}>
                {error}
              </Alert>
            )}
            <Modal.Footer className="flex items-center justify-between pb-0 border-t border-solid border-t-slate-200">
              <div className="flex items-center justify-end w-full gap-2">
                <Button gradientDuoTone={"purpleToBlue"} outline type="submit">
                  {loading ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Spinner size={"sm"}></Spinner>
                      <span>Loading ...</span>
                    </div>
                  ) : (
                    "Change Password"
                  )}
                </Button>
                <Button
                  color="gray"
                  onClick={() => setOpenModalChangPassword(false)}
                >
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
