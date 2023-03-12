export default function DeleteUser(props: any) {
  return (
    <div
      className={`${
        props.isOpen ? "" : "hidden"
      } fixed pt-24 left-0 top-0 w-full h-full z-30`}
    >
      {props.isOpen && (
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>

              <div className="mt-2 text-center">
                <h3
                  className="text-lg font-medium leading-6 text-gray-800 capitalize "
                  id="modal-title"
                >
                  Delete User
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Are you sure you want to delete the user?
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <button className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide  capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 ">
                Cancel
              </button>

              <button
                onClick={props.handleDeleteUserConfirm}
                className="w-full px-4 py-2 mt-2 text-sm text-red-300 font-medium tracking-wide  capitalize transition-colors duration-300 transform bg-red-600 rounded-md sm:w-auto sm:mt-0 "
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
