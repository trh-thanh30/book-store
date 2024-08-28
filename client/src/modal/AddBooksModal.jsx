/* eslint-disable react/prop-types */
import { Button, Label, Modal, Select } from "flowbite-react";

export default function AddBooksModal({ openModal, setOpenmodal }) {
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenmodal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <Label
                  className="cursor-pointer"
                  htmlFor="title"
                  value="Title"
                ></Label>
                <input
                  type="text"
                  placeholder="Enter your title books"
                  id="title"
                  className="p-3 text-sm transition-all border border-gray-300 rounded-full text-slate-500 focus:border-blue-50"
                ></input>
              </div>

              <div className="flex flex-col gap-1">
                <Label
                  className="cursor-pointer"
                  htmlFor="author"
                  value="Author"
                ></Label>
                <input
                  type="text"
                  placeholder="Enter your author name"
                  id="author"
                  className="p-3 text-sm transition-all border border-gray-300 rounded-full text-slate-500 focus:border-blue-50"
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  className="cursor-pointer"
                  htmlFor="category"
                  value="Category"
                ></Label>
                <Select id="category">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>France</option>
                  <option>Germany</option>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  className="cursor-pointer"
                  htmlFor="image"
                  value="Image"
                ></Label>
                <input
                  type="file"
                  id="image"
                  className="text-sm transition-all border border-gray-300 text-slate-500 focus:border-blue-50"
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  className="cursor-pointer"
                  value="Description"
                  htmlFor="description"
                ></Label>
                <textarea
                  id="description"
                  placeholder="Wirte something ..."
                  className="h-40 text-sm transition-all border border-gray-300 rounded-md text-slate-500 focus:border-blue-50"
                ></textarea>
              </div>
              <Modal.Footer className="flex items-center justify-between pb-0 border-t border-solid border-t-slate-200">
                <div className="flex items-center justify-end w-full gap-2">
                  <Button
                    gradientDuoTone={"purpleToBlue"}
                    outline
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button color="gray" onClick={() => setOpenmodal(false)}>
                    Cancel
                  </Button>
                </div>
              </Modal.Footer>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
