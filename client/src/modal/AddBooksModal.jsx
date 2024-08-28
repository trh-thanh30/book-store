/* eslint-disable react/prop-types */
import { Alert, Button, Label, Modal, Select, Spinner } from "flowbite-react";
import { useState } from "react";

export default function AddBooksModal({
  openModal,
  setOpenmodal,
  fetchBooks,
  categories,
}) {
  const [previewImages, setPreviewImages] = useState([]); // Lưu nhiều ảnh
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
          setFormData({ ...formData, image: files }); // Cập nhật formData với nhiều file
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // handle upload books
  const handeSubmit = async (e) => {
    e.preventDefault();
    const sendFormData = new FormData();
    sendFormData.append("title", formData.title);
    sendFormData.append("author", formData.author);
    sendFormData.append("description", formData.description);
    sendFormData.append("category", formData.category);
    formData?.image?.forEach((image) => {
      console.log(image);
      sendFormData.append(`image`, image);
    });
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/books/create", {
        method: "POST",
        credentials: "include",
        body: sendFormData,
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message);
      } else {
        setFormData({});
        setOpenmodal(false);
        fetchBooks();
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenmodal(false)}>
        <Modal.Header className="border-b border-solid border-b-slate-200">
          Add Books
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form onSubmit={handeSubmit} className="flex flex-col gap-6">
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
                      className="object-cover w-20 h-20 mt-1 rounded"
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
              {error && (
                <Alert color={"failure"} onDismiss={() => setError(null)}>
                  {error}
                </Alert>
              )}
              <Modal.Footer className="flex items-center justify-between pb-0 border-t border-solid border-t-slate-200">
                <div className="flex items-center justify-end w-full gap-2">
                  <Button
                    gradientDuoTone={"purpleToBlue"}
                    outline
                    type="submit"
                  >
                    {loading ? (
                      <div className="flex items-center gap-1">
                        <Spinner color="info" size="sm" />
                        <span>Loading ...</span>
                      </div>
                    ) : (
                      "Save"
                    )}
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
