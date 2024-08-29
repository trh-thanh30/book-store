/* eslint-disable react/prop-types */
import { Alert, Button, Label, Modal, Spinner } from "flowbite-react";
import { useState } from "react";

export default function AddCategoriesModal({
  openCategoryModal,
  setOpenCategoryModal,
  getCategory,
}) {
  const [error, setError] = useState(null);
  const [loading, SetLoading] = useState(false);
  const [name, setName] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      SetLoading(true);
      setError(null);
      const res = await fetch("http://localhost:3000/api/categories/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      SetLoading(false);
      if (!res.ok) {
        setError(data.message);
      } else {
        setOpenCategoryModal(false);
        getCategory();
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Modal show={openCategoryModal} onClose={() => setOpenCategoryModal(false)}>
      <Modal.Header className="border-b border-solid border-b-slate-200">
        Add Categories
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer"
                htmlFor="name"
                value="Name"
              ></Label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your category name"
                id="name"
                className="p-3 text-sm transition-all border border-gray-300 rounded-full text-slate-500 focus:border-blue-50"
              ></input>
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
                    <div className="flex items-center gap-1">
                      <Spinner color="info" size="sm" />
                      <span>Loading ...</span>
                    </div>
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  color="gray"
                  onClick={() => setOpenCategoryModal(false)}
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
