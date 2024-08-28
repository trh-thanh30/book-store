import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import AddBooksModal from "../../modal/AddBooksModal";
import Swal from "sweetalert2";
import UpdateBookModal from "../../modal/UpdateBookModal";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [openModal, setOpenmodal] = useState(false);
  const [openModalUpdate, setOpenmodalUpdate] = useState(false);
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(true);
  const [categories, setCategories] = useState([]);
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/books/get-all", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setLoading(false);
      setBooks(data.data.books);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete Books
  const handleDeleteBook = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will no longer be able to access or find this book",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your book has been deleted.",
          icon: "success",
        });
      }
      // call api

      const handleDelete = async () => {
        const res = await fetch(
          `http://localhost:3000/api/books/delete/${id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          fetchBooks();
        }
      };
      handleDelete();
    });
  };

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

  const getBook = async (id) => {
    try {
      setLoadingUpdate(true);
      const res = await fetch(`http://localhost:3000/api/books/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLoadingUpdate(false);
      if (res.ok) {
        setBook(data.book);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full p-3 overflow-x-auto">
        <div className="flex items-center justify-between mt-2 mb-3">
          <h1 className="text-2xl font-semibold text-slate-500">Books Admin</h1>
          <p
            onClick={() => setOpenmodal(true)}
            className="p-1 text-sm cursor-pointer text-slate-500 hover:underline"
          >
            Add new books
          </p>
        </div>
        {books.length === 0 && !loading ? (
          <div className="flex items-center justify-center w-full mt-5 text-2xl font-semibold text-slate-500">
            <p>There are no books</p>
          </div>
        ) : (
          <>
            {loading ? (
              <div className="flex items-center justify-center w-full h-screen">
                <Spinner size={"lg"} color={"info"}></Spinner>
              </div>
            ) : (
              <Table hoverable>
                <Table.Head className="font-semibold text-slate-500">
                  <Table.HeadCell>Date Updated</Table.HeadCell>
                  <Table.HeadCell>Books image</Table.HeadCell>
                  <Table.HeadCell>Books Title</Table.HeadCell>
                  <Table.HeadCell>Category</Table.HeadCell>
                  <Table.HeadCell>Author</Table.HeadCell>
                  <Table.HeadCell>Edit</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y text-nowrap">
                  {books.map((books) => (
                    <Table.Row key={books._id} className="bg-white">
                      <Table.Cell>
                        <span>
                          {dayjs(books.updatedAt).format("YYYY-MM-DD ")}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <img
                          src={books.image[0]}
                          className="inline object-cover w-20 h-10 rounded-md"
                          alt=""
                        />
                      </Table.Cell>
                      <Table.Cell className="font-medium text-gray-900 whitespace-nowrap ">
                        {books.title}
                      </Table.Cell>
                      <Table.Cell>{books.category}</Table.Cell>
                      <Table.Cell>{books.author}</Table.Cell>

                      <Table.Cell
                        onClick={() => {
                          setOpenmodalUpdate(true);
                          getBook(books._id);
                        }}
                        className="font-medium text-blue-600 cursor-pointer hover:underline"
                      >
                        Edit
                      </Table.Cell>

                      <Table.Cell
                        onClick={() => handleDeleteBook(books._id)}
                        className="font-medium text-red-600 cursor-pointer hover:underline"
                      >
                        Delete
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </>
        )}
      </div>
      <AddBooksModal
        openModal={openModal}
        setOpenmodal={setOpenmodal}
        fetchBooks={fetchBooks}
        categories={categories}
      ></AddBooksModal>
      <UpdateBookModal
        openModalUpdate={openModalUpdate}
        setOpenmodalUpdate={setOpenmodalUpdate}
        categories={categories}
        book={book}
        fetchBooks={fetchBooks}
        loadingUpdate={loadingUpdate}
      ></UpdateBookModal>
    </>
  );
}
