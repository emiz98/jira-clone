import { BugReport, Construction, QuestionMark } from "@mui/icons-material";
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Issue = ({ id, title, issueType, issueStatus }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(issueStatus);
  const [finalStatus, setFinalStatus] = useState(issueStatus);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const issueStatusHandler = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async () => {
    if (issueStatus == status || status == "") {
      return;
    }

    await axios
      .post("http://localhost:8080/api/v1/issue/update", {
        id: id,
        status: status,
      })
      .then((res) => {
        setFinalStatus(status);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="flex flex-col md:flex-row items-start md:items-center bg-gray-100 p-8 mb-3 justify-between 
    rounded-md border space-y-4 md:space-x-5 md:space-y-0 border-gray-200 hover:bg-gray-200 cursor-pointer"
    >
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center backdrop-blur-sm">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Change state
                </Dialog.Title>
                <div className="mt-5 mb-5">
                  <select
                    className="outline-none w-1/2"
                    value={status}
                    onChange={issueStatusHandler}
                  >
                    <option defaultChecked value="">
                      Select a state
                    </option>
                    {finalStatus == "open" && (
                      <>
                        <option value="inprogress">In-Progress</option>
                      </>
                    )}
                    {finalStatus == "inprogress" && (
                      <>
                        <option value="waiting">Waiting On Client</option>
                        <option value="resolved">Resolved</option>
                      </>
                    )}
                    {finalStatus == "waiting" && (
                      <>
                        <option value="inprogress">In-Progress</option>
                        <option value="resolved">Resolved</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSubmit}
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Link to={`/issue/${id}`}>
        <h3 className="text-2xl font-medium hover:underline">{title}</h3>
      </Link>
      <div className="flex text-sm md:text-base items-center justify-between flex-1 space-x-5">
        {issueType == "bug" && (
          <span className="text-green-600 flex items-center border-2 border-green-600 rounded-full px-3 py-1">
            <BugReport className="!text-sm md:!text-base mr-1" /> Bug
          </span>
        )}
        {issueType == "question" && (
          <span className="text-red-600 flex items-center border-2 border-red-600 rounded-full px-3 py-1">
            <QuestionMark className="!text-sm md:!text-base mr-1" /> Question
          </span>
        )}
        {issueType == "improvement" && (
          <span className="text-yellow-600 flex items-center border-2 border-yellow-600 rounded-full px-3 py-1">
            <Construction className="!text-sm md:!text-base mr-1" /> Improvement
          </span>
        )}
        {finalStatus == "open" && (
          <span className="border-red-600 border-2 px-3 py-1 font-medium text-red-600 rounded-full">
            Open
          </span>
        )}
        {finalStatus == "inprogress" && (
          <span className="border-yellow-600 border-2 px-3 py-1 font-medium text-yellow-600 rounded-full">
            In-Progress
          </span>
        )}
        {finalStatus == "waiting" && (
          <span className="border-blue-600 border-2 px-3 py-1 font-medium text-blue-600 rounded-full">
            Waiting On Client
          </span>
        )}
        {finalStatus == "resolved" && (
          <span className="border-green-600 border-2 px-3 py-1 font-medium text-green-600 rounded-full">
            Resolved
          </span>
        )}
      </div>
      {finalStatus != "resolved" && (
        <span
          onClick={openModal}
          className="border-black border p-3 w-full md:mt-0 md:w-auto text-center mt-3 text-sm md:text-base hover:bg-gray-300 text-black rounded-md font-medium cursor-pointer"
        >
          Change state
        </span>
      )}
    </div>
  );
};

export default Issue;
