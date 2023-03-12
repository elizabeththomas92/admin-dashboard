import React from "react";
import { APIFetcher } from "../services";
import DeleteUser from "./DeleteUser";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { IUser, IUserResponse } from "../types";

const headers = ["First Name", "Last Name", "Phone Number", "Age", "", ""];
export default function AllUsers() {
  const [allUsers, setAllUsers] = React.useState<IUserResponse[]>();
  const [showDeletePopup, setShowDeletePopup] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<any>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    APIFetcher("https://blue-journalist-bbrpv.ineuron.app:4000/users")
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {});
  }, []);

  const handleDeleteUserModal = (userId: string) => {
    setCurrentUser(userId);
    setShowDeletePopup(true);
  };

  const handleDeleteUserConfirm = () => {
    dispatch(deleteUser(currentUser) as any)
      .then(() => {
        setShowDeletePopup(false);
        APIFetcher("https://blue-journalist-bbrpv.ineuron.app:4000/users")
          .then((response) => {
            setAllUsers(response.data);
          })
          .catch((error) => {});
      })
      .catch((e: any) => {});
  };

  return (
    <section className="container px-4 mx-auto mt-4 ">
      <div className="flex justify-end mb-3">
        {" "}
        <button
          onClick={() => navigate(`/users/create`)}
          className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:w-auto sm:mt-0 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        >
          Create User
        </button>
      </div>
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border  md:rounded-lg max-h-[500px] overflow-y-scroll">
              <table className="min-w-full  divide-y divide-gray-200 ">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {headers.map((header) => (
                      <th
                        scope="col"
                        className={`px-4 py-3.5 text-base font-bold text-left text-gray-400 `}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200  ">
                  {allUsers &&
                    allUsers.map((user) => (
                      <tr className="text-gray-500 text-sm font-semibold">
                        <td className="px-4 py-4 whitespace-nowrap">
                          {user.firstName}
                        </td>
                        <td className="px-4 py-4  whitespace-nowrap">
                          {user.lastName}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {user.phoneNumber}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {user.age}
                        </td>
                        <td className="py-4 text-sm whitespace-nowrap">
                          <button
                            className="text-gray-500 "
                            onClick={() => navigate(`/users/${user._id}`)}
                          >
                            Edit
                          </button>
                        </td>
                        <td className="py-4 text-sm whitespace-nowrap">
                          <button
                            className=" text-red-500"
                            onClick={() => handleDeleteUserModal(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>{" "}
      <DeleteUser
        isOpen={showDeletePopup}
        handleDeleteUserConfirm={handleDeleteUserConfirm}
      />
    </section>
  );
}
