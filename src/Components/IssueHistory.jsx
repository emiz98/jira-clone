import React from "react";
import Moment from "react-moment";

const IssueHistory = ({ issueStatus, timestamp }) => {
  return (
    <div className="w-full flex items-center justify-between bg-gray-100 p-5 rounded-md mb-3">
      <div className="flex flex-col md:flex-row md:items-center space-y-2">
        <span>Changed to</span>
        {issueStatus == "open" && (
          <span className="border-red-600 md:ml-5 border-2 px-4 py-1 font-medium text-red-600 rounded-full">
            Open
          </span>
        )}
        {issueStatus == "inprogress" && (
          <span className="border-yellow-600 md:ml-5 border-2 px-4 py-1 font-medium text-yellow-600 rounded-full">
            In-Progress
          </span>
        )}
        {issueStatus == "waiting" && (
          <span className="border-blue-600 md:ml-5 border-2 px-4 py-1 font-medium text-blue-600 rounded-full">
            Waiting On Client
          </span>
        )}
        {issueStatus == "resolved" && (
          <span className="border-green-600 md:ml-5 border-2 px-4 py-1 font-medium text-green-600 rounded-full">
            Resolved
          </span>
        )}
      </div>
      <div className="text-gray-600 md:ml-40">
        <Moment className="" fromNow>
          {timestamp}
        </Moment>
      </div>
    </div>
  );
};

export default IssueHistory;
