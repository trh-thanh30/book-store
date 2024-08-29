import dayjs from "dayjs";
import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import AddCategoriesModal from "../../modal/AddCategoriesModal";
import Swal from "sweetalert2";
import UpdateCategoryModal from "../../modal/UpdateCategoryModal";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [categoryId, setCategoryId] = useState([]);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openCategoryUpdateModal, setOpenCategoryUpdateModal] = useState(false);

  const getCategory = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/categories/get-all", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setLoading(false);
      setCategory(data.categories);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will no longer be able to access or find this category",
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
      const deleteCategory = async () => {
        try {
          const res = await fetch(
            `http://localhost:3000/api/categories/delete/${id}`,
            {
              method: "DELETE",
              credentials: "include",
            }
          );
          if (res.ok) {
            getCategory();
          } else {
            console.log("Something went wrong");
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      deleteCategory();
    });
  };
  const getCategoryId = async (id) => {
    try {
      setLoadingCategory(true);
      const res = await fetch(
        `http://localhost:3000/api/categories/get/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      setLoadingCategory(false);
      setCategoryId(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="w-full p-3 overflow-x-auto">
        <div className="flex items-center justify-between mt-2 mb-4">
          <h1 className="text-2xl font-semibold text-slate-500">
            Categories Admin
          </h1>
          <p
            onClick={() => setOpenCategoryModal(true)}
            className="p-1 text-sm cursor-pointer text-slate-500 hover:underline"
          >
            Add new categroies
          </p>
        </div>
        {category.length === 0 && !loading ? (
          <div className="flex items-center justify-center w-full mt-5 text-2xl font-semibold text-slate-500">
            <p>There are no categories</p>
          </div>
        ) : (
          <>
            {loading ? (
              <div className="flex items-center justify-center h-screen">
                <Spinner color="info" size={"lg"}></Spinner>
              </div>
            ) : (
              <Table>
                <Table.Head className="font-semibold text-slate-500">
                  <Table.HeadCell>Date Updated</Table.HeadCell>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>NAME</Table.HeadCell>
                  <Table.HeadCell>Edit</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {category.map((category) => (
                    <Table.Row key={category._id} className="bg-white">
                      <Table.Cell>
                        <span>
                          {dayjs(category.updatedAt).format("YYYY-MM-DD ")}
                        </span>
                      </Table.Cell>
                      <Table.Cell>{category._id}</Table.Cell>
                      <Table.Cell className="font-medium text-gray-900 whitespace-nowrap ">
                        {category.name}
                      </Table.Cell>
                      <Table.Cell
                        onClick={() => {
                          setOpenCategoryUpdateModal(true);
                          getCategoryId(category._id);
                        }}
                        className="font-medium text-blue-600 cursor-pointer hover:underline"
                      >
                        Edit
                      </Table.Cell>
                      <Table.Cell
                        onClick={() => handleDeleteCategory(category._id)}
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
      <AddCategoriesModal
        openCategoryModal={openCategoryModal}
        setOpenCategoryModal={setOpenCategoryModal}
        getCategory={getCategory}
      ></AddCategoriesModal>
      <UpdateCategoryModal
        openCategoryUpdateModal={openCategoryUpdateModal}
        setOpenCategoryUpdateModal={setOpenCategoryUpdateModal}
        getCategory={getCategory}
        categoryId={categoryId}
        loadingCategory={loadingCategory}
      ></UpdateCategoryModal>
    </>
  );
}
