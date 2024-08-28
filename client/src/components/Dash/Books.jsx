import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import AddBooksModal from "../../modal/AddBooksModal";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [openModal, setOpenmodal] = useState(false);
  const [loading, setLoading] = useState(true);
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
                <Table.Body className="divide-y">
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
                      <Link className="font-medium text-blue-600 hover:underline">
                        <Table.Cell>Edit</Table.Cell>
                      </Link>
                      <Table.Cell className="font-medium text-red-600 cursor-pointer hover:underline">
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
      ></AddBooksModal>
    </>
  );
}
