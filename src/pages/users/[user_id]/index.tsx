import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../../components/layout/NavBar";
import SideBar from "../../../components/layout/SideBar";
import { updateUser } from "../../../redux/actions/userAction";
import { APIFetcher } from "../../../services";
import { IUser } from "../../../types";

function User() {
  const [userDetails, setUserDetails] = React.useState<IUser>();
  const [formErrors, setFromErrors] = React.useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
  });

  const { user_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user_id) {
      APIFetcher(
        `https://blue-journalist-bbrpv.ineuron.app:4000/user/${user_id}`
      )
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => {});
    }
  }, [user_id]);

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
    if (validateFormDetails() && user_id && userDetails) {
      dispatch(updateUser(user_id, userDetails) as any)
        .then((response: any) => {
          navigate("/users");
        })
        .catch((e: any) => {
          console.log(e);
        });
    }
  };

  const handleUserDetails = (key: string, value: any) => {
    if (userDetails) setUserDetails({ ...userDetails, [key]: value });
  };
  return (
    <div>
      <NavBar />
      <div className="bg-slate-200 flex">
        <SideBar />
        <section className="p-6 m-10 w-full bg-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-700  ">
            User Details
          </h2>

          <form onSubmit={handleUpdateUser}>
            {userDetails && (
              <div className="flex flex-col gap-6 mt-4 ">
                <>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={userDetails.firstName}
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
                    value={userDetails.lastName}
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
                    value={userDetails.phoneNumber}
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
                    value={userDetails.age}
                    onChange={(e) => handleUserDetails("age", e.target.value)}
                    className="block w-full px-4 py-1 text-gray-700 bg-white border border-gray-200 rounded-md"
                  />
                </>
                {formErrors["age"].length > 0 && (
                  <span className=" text-red-600">{formErrors["age"]}</span>
                )}
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default User;
