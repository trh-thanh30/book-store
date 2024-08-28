/* eslint-disable react/prop-types */
import { Button, Label, Modal, Select } from "flowbite-react";
import { useEffect, useState } from "react";

export default function AddBooksModal({ openModal, setOpenmodal }) {
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]); // Lưu nhiều ảnh
  const [formData, setFormData] = useState({});

  const onChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleChangeFiles = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imagesArray.push(reader.result);
        if (imagesArray.length === files.length) {
          setPreviewImages(imagesArray); // Cập nhật mảng previewImages
          setFormData({ ...formData, images: files }); // Cập nhật formData với nhiều file
        }
      };
      reader.readAsDataURL(file);
    });
  };

  console.log(formData);

  const fetchCategory = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories/get-all", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenmodal(false)}>
        <Modal.Header className="border-b border-solid border-b-slate-200">
          Add Books
        </Modal.Header>
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
                  onChange={onChanges}
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
                  onChange={onChanges}
                  className="p-3 text-sm transition-all border border-gray-300 rounded-full text-slate-500 focus:border-blue-50"
                ></input>
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  className="cursor-pointer"
                  htmlFor="category"
                  value="Category"
                ></Label>
                <Select onChange={onChanges} id="category">
                  {categories.map((category) => (
                    <option
                      key={category._id}
                      value={category.name}
                      id="category"
                    >
                      {category.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  className="cursor-pointer"
                  htmlFor="image"
                  value="Images"
                ></Label>
                <input
                  type="file"
                  multiple
                  onChange={handleChangeFiles}
                  id="image"
                  className="text-sm transition-all border border-gray-300 text-slate-500 focus:border-blue-50"
                ></input>
                <div className="flex gap-2">
                  {previewImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-20 h-20 rounded"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  className="cursor-pointer"
                  value="Description"
                  htmlFor="description"
                ></Label>
                <textarea
                  id="description"
                  onChange={onChanges}
                  placeholder="Write something ..."
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
