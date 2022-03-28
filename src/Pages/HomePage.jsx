import React, { useEffect } from "react";
import Header from "../Components/Header";
import Issue from "../Components/Issue";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  let [isOpen, setIsOpen] = useState(false);
  let [isVerified, setIsVerified] = useState(false);
  let login = JSON.parse(localStorage.getItem("loginData"));
  const [issues, setIssues] = useState([]);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueType, setIssueType] = useState("bug");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function fetchIssues() {
    await fetch("http://localhost:8080/api/v1/issues")
      .then((res) => res.json())
      .then((res) => setIssues(res))
      .catch((errors) => console.log(errors));
  }

  const issueTitleHandler = (e) => {
    setIssueTitle(e.target.value);
  };

  const issueTypeHandler = (e) => {
    setIssueType(e.target.value);
  };

  const handleSubmit = async () => {
    if (issueTitle == "") {
      alert("Please enter a valid title");
      return;
    }

    if (isVerified == false) {
      alert("Please verify you are a human!");
      return;
    }

    await axios
      .post("http://localhost:8080/api/v1/issue/create", {
        title: issueTitle,
        type: issueType,
        status: "open",
      })
      .then((res) => {
        closeModal();
        setIssueTitle("");
        setIssueType("bug");
        setIsVerified(false);
        fetchIssues();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function onChange(value) {
    setIsVerified(true);
  }

  useEffect(() => {
    if (login == null) {
      history.push("/login");
      return;
    }
    fetchIssues();
  }, []);

  return (
    <div>
      <Header userLogged={login} />
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
                  Create an issue
                </Dialog.Title>
                <div className="mt-5 mb-5">
                  <input
                    type="text"
                    placeholder="Enter issue title"
                    className="outline-none"
                    value={issueTitle}
                    onChange={(e) => issueTitleHandler(e)}
                  />
                </div>
                <div className="mt-5 mb-5">
                  <select
                    className="outline-none w-1/2"
                    value={issueType}
                    onChange={(e) => issueTypeHandler(e)}
                  >
                    <option value="bug">Bug</option>
                    <option value="question">Question</option>
                    <option value="improvement">Improvement</option>
                  </select>
                </div>
                <div className="pt-5 pb-5">
                  <ReCAPTCHA
                    style={{ display: "inline-block" }}
                    sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA}
                    onChange={onChange}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSubmit}
                  >
                    Create
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
      <div className="px-4 md:px-10 mt-10">
        <div className="flex justify-end">
          <span
            onClick={openModal}
            className="bg-blue-600 p-3 rounded-md font-medium cursor-pointer hover:bg-blue-700 text-white"
          >
            Create a new issue
          </span>
        </div>
        <div></div>
        <div className="mt-10">
          {issues.length > 0 ? (
            <>
              {issues
                .slice()
                .reverse()
                .map((issue) => (
                  <Issue
                    key={issue.id}
                    id={issue.id}
                    title={issue.title}
                    issueType={issue.type}
                    issueStatus={issue.status}
                  />
                ))}
            </>
          ) : (
            <div className="flex flex-col text-center items-center justify-center space-y-2 h-52">
              <span className="font-medium text-xl">
                No Issues Available Yet.
              </span>
              <span className="text-gray-600">
                If you want to create an issue please select create a new issue.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
