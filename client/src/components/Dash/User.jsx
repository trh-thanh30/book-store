import dayjs from "dayjs";
import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/user/get-users", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers(data.data.users);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const handleDeleteUser = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You will no longer be able to access or find this users",
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

        //call api
        const handleDelete = async () => {
          try {
            const res = await fetch(
              `http://localhost:3000/api/user/delete-user/${id}`,
              {
                method: "DELETE",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await res.json();
            if (!res.ok) {
              console.log(data.message);
            } else {
              getAllUsers();
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        handleDelete();
      }
    });
  };
  return (
    <>
      <div className="w-full p-3 overflow-x-auto">
        <div className="flex items-center justify-between mt-2 mb-4">
          <h1 className="text-2xl font-semibold text-slate-500">User Admin</h1>
        </div>
        {/* {users.length === 0 && !loading ? (
          <div className="flex items-center justify-center w-full mt-5 text-2xl font-semibold text-slate-500">
            <p>There are no users</p>
          </div>
        ) : ( */}
        <>
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <Spinner color="info" size={"lg"}></Spinner>
            </div>
          ) : (
            <Table>
              <Table.Head className="font-semibold text-slate-500">
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>USER IMAGE</Table.HeadCell>
                <Table.HeadCell>USER NAME</Table.HeadCell>
                <Table.HeadCell>GMAIL</Table.HeadCell>
                <Table.HeadCell>ROLE</Table.HeadCell>
                <Table.HeadCell>DELETE</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {users.map((user) => (
                  <Table.Row key={user._id} className="bg-white">
                    <Table.Cell>
                      <span>{dayjs(user.updatedAt).format("YYYY-MM-DD ")}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        className="inline object-cover w-10 h-10 rounded-full"
                        src={user.profilePicture}
                        alt=""
                      />
                    </Table.Cell>
                    <Table.Cell className="font-medium text-gray-900 whitespace-nowrap ">
                      {user.username}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell
                      className={`uppercase font-semibold ${
                        user.role === "admin"
                          ? "text-green-500"
                          : "text-slate-500"
                      }`}
                    >
                      {user.role}
                    </Table.Cell>
                    <Table.Cell
                      onClick={() => handleDeleteUser(user._id)}
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
        {/* )} */}
      </div>
    </>
  );
}
