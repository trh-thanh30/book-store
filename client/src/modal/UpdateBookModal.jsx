/* eslint-disable react/prop-types */
import { Alert, Button, Label, Modal, Select, Spinner } from "flowbite-react";
import { useState } from "react";
export default function UpdateBookModal({
  openModalUpdate,
  setOpenmodalUpdate,
  categories,
  book,
  fetchBooks,
  loadingUpdate,
}) {
  console.log(book);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const onChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // chua lam duoc thay doi anh => mai phai lam duoc 1. Xoa anh duoc 2. Phai lam duoc thay doi anh 3. lam lai handleSubmit de co the upload anh len clondlidary
  const handleChangeFiles = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imagesArray.push(reader.result);
        if (imagesArray.length === files.length) {
          setFormData({ ...formData, image: files });
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `http://localhost:3000/api/books/update/${book._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.message);
      } else {
        setOpenmodalUpdate(false);
        fetchBooks();
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <Modal show={openModalUpdate} onClose={() => setOpenmodalUpdate(false)}>
        <Modal.Header className="border-b border-solid border-b-slate-200">
          Update Books
        </Modal.Header>
        {loadingUpdate ? (
          <div className="flex items-center justify-center h-screen">
            <Spinner size={"lg"} color="info"></Spinner>
          </div>
        ) : (
          <Modal.Body>
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <Label
                    className="cursor-pointer"
                    htmlFor="title"
                    value="Title"
                  ></Label>
                  <input
                    type="text"
                    id="title"
                    defaultValue={book.title}
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
                    id="author"
                    defaultValue={book.author}
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
                  <Select
                    defaultValue={book.category}
                    onChange={onChanges}
                    id="category"
                  >
                    {categories.map((category) => (
                      <option key={category._id} id="category">
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
                    id="image"
                    className="text-sm transition-all border border-gray-300 text-slate-500 focus:border-blue-50"
                  ></input>
                  <div className="flex gap-2">
                    {book?.image?.map((image, index) => (
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
                    defaultValue={book.description}
                    onChange={onChanges}
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
                        "Update"
                      )}
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => setOpenmodalUpdate(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Modal.Footer>
              </form>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
}
