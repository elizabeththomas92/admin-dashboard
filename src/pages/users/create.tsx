import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/layout/NavBar";
import SideBar from "../../components/layout/SideBar";
import { addUser } from "../../redux/actions/userAction";
import { IUser } from "../../types";

function CreateUser() {
  const [userDetails, setUserDetails] = React.useState<IUser>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
  });
  const [formErrors, setFromErrors] = React.useState<any>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
  });

  // Redux

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const validateFormDetails = () => {
    if (userDetails) {
      if (!userDetails.firstName.length) {
        setFromErrors({ ...formErrors, firstName: "Invalid First Name" });
        return false;
      }
      if (!userDetails.lastName.length) {
        setFromErrors({ ...formErrors, lastName: "Invalid Last Name" });
        return false;
      }
      if (!userDetails.phoneNumber.match(/^\d{10}$/)) {
        setFromErrors({ ...formErrors, phoneNumber: "Invalid Phone number" });
        return false;
      }
      // Assuming the age bracket is not for minors and the age limit is 100
      if (parseInt(userDetails.age) < 18 || parseInt(userDetails.age) > 100) {
        setFromErrors({ ...formErrors, age: "Invalid Age" });
        return false;
      }
      setFromErrors({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        age: "",
      });
      return true;
    }
  };

  const handleUpdateUser = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (validateFormDetails()) {
      dispatch(addUser(userDetails) as any)
        .then(() => {
          console.log("User created successfully!");
          navigate("/users");
        })
        .catch((error: any) => {
          console.log(error?.message);
        });
    }
  };

  const handleUserDetails = (key: string, value: any) => {
    if (userDetails) setUserDetails({ ...userDetails, [key]: value });
  };
  return (
    <div className="bg-slate-300">
      <NavBar />
      <div className="flex gap-2">
        <SideBar />
        <section className="p-6 m-10 w-full bg-white rounded-md  ">
          <h2 className="text-lg font-semibold text-gray-700 capitalize">
            Create User
          </h2>

          <form onSubmit={handleUpdateUser}>
            <div className="flex flex-col gap-6 mt-4 ">
              <>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={userDetails?.firstName}
                  onChange={(e) =>
                    handleUserDetails("firstName", e.target.value)
                  }
                  className="block w-full px-4 py-1 text-gray-700 bg-white border border-gray-200 rounded-md"
                />
                {formErrors["firstName"].length > 0 && (
                  <span className=" text-red-600">
                    {formErrors["firstName"]}
                  </span>
                )}
              </>
              <>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  value={userDetails?.lastName}
                  onChange={(e) =>
                    handleUserDetails("lastName", e.target.value)
                  }
                  className="block w-full px-4 py-1 text-gray-700 bg-white border border-gray-200 rounded-md"
                />
                {formErrors["lastName"].length > 0 && (
                  <span className=" text-red-600">
                    {formErrors["lastName"]}
                  </span>
                )}
              </>
              <>
                <label htmlFor="phone">Phone number</label>
                <input
                  id="phone"
                  type="number"
                  value={userDetails?.phoneNumber}
                  onChange={(e) =>
                    handleUserDetails("phoneNumber", e.target.value)
                  }
                  className="block w-full px-4 py-1 text-gray-700 bg-white border border-gray-200 rounded-md"
                />
                {formErrors["phoneNumber"].length > 0 && (
                  <span className=" text-red-600">
                    {formErrors["phoneNumber"]}
                  </span>
                )}
              </>

              <>
                <label htmlFor="emailAddress">Age</label>
                <input
                  id="emailAddress"
                  type="number"
                  value={userDetails?.age}
                  onChange={(e) => handleUserDetails("age", e.target.value)}
                  className="block w-full px-4 py-1 text-gray-700 bg-white border border-gray-200 rounded-md"
                />
              </>
              {formErrors["age"].length > 0 && (
                <span className=" text-red-600">{formErrors["age"]}</span>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default CreateUser;
