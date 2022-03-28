import { DoNotDisturb } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import IssueHistory from "../Components/IssueHistory";

// const records = [
//   {
//     id: 1,
//     changedTo: "open",
//     timestamp: "2021-01-11",
//   },
//   {
//     id: 2,
//     changedTo: "inprogress",
//     timestamp: "2021-01-13",
//   },
//   {
//     id: 3,
//     changedTo: "waiting",
//     timestamp: "2021-01-14",
//   },
//   {
//     id: 4,
//     changedTo: "resolved",
//     timestamp: "2021-01-14",
//   },
//   {
//     id: 1,
//     changedTo: "open",
//     timestamp: "2021-01-11",
//   },
//   {
//     id: 2,
//     changedTo: "inprogress",
//     timestamp: "2021-01-13",
//   },
//   {
//     id: 3,
//     changedTo: "waiting",
//     timestamp: "2021-01-14",
//   },
//   {
//     id: 4,
//     changedTo: "resolved",
//     timestamp: "2021-01-14",
//   },
// ];

const IssueDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  let login = JSON.parse(localStorage.getItem("loginData"));
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState([]);

  const showPercentage = (value) => {
    var total =
      summary.openCount +
      summary.progressCount +
      summary.waitingCount +
      summary.resolvedCount;
    var percentage = (value / total) * 100;
    return percentage.toFixed(2);
  };

  useEffect(() => {
    if (login == null) {
      history.push("/login");
      return;
    }
    async function fetchIssueHistory() {
      await fetch("http://localhost:8080/api/v1/issuehistory/" + id)
        .then((res) => res.json())
        .then((res) => setRecords(res))
        .catch((errors) => console.log(errors));
    }
    async function fetchIssueHistorySummary() {
      await fetch("http://localhost:8080/api/v1/issuehistory/summary/" + id)
        .then((res) => res.json())
        .then((res) => setSummary(res))
        .catch((errors) => console.log(errors));
    }
    fetchIssueHistory();
    fetchIssueHistorySummary();
  }, []);

  return (
    <div className="md:h-screen md:overflow-hidden">
      <Header userLogged={login} />
      <div className="px-4 md:px-10 my-10 md:flex justify-evenly items-start">
        <div className="space-y-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold">Jira Clone</h1>
          {records.length != 0 ? (
            <>
              <PieChart
                className="w-60 md:w-80"
                lineWidth={50}
                labelPosition={50}
                data={[
                  {
                    title: "Open " + showPercentage(summary.openCount) + "%",
                    value:
                      summary.openCount != undefined &&
                      parseInt(summary.openCount),
                    color: "#EF4444",
                  },
                  {
                    title:
                      "In-Progress " +
                      showPercentage(summary.progressCount) +
                      "%",
                    value:
                      summary.progressCount != undefined &&
                      parseInt(summary.progressCount),
                    color: "#ffc832",
                  },
                  {
                    title:
                      "Waiting On Client " +
                      showPercentage(summary.waitingCount) +
                      "%",
                    value:
                      summary.waitingCount != undefined &&
                      parseInt(summary.waitingCount),
                    color: "#3B82F6",
                  },
                  {
                    title:
                      "Resolved " + showPercentage(summary.resolvedCount) + "%",
                    value:
                      summary.resolvedCount != undefined &&
                      parseInt(summary.resolvedCount),
                    color: "#22C55E",
                  },
                ]}
              />
              <div className="flex items-center space-x-8 pb-10">
                <div className="flex md:flex-row flex-col items-center space-y-5 md:space-y-0 md:space-x-8">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-green-500 rounded-sm"></span>
                    <span>Resolved</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-red-500 rounded-sm"></span>
                    <span>Open</span>
                  </div>
                </div>

                <div className="flex md:flex-row space-y-5 md:space-y-0 flex-col items-center md:space-x-8">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-yellow-500 rounded-sm"></span>
                    <span>In-Progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-blue-500 rounded-sm"></span>
                    <span>Waiting On Client</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-5 pb-10">
              <img src="/assets/pie.png" alt="" className="opacity-40" />
              <span>Graph Data Not Available</span>
            </div>
          )}
        </div>

        <div>
          <div className="mb-5 font-medium text-xl text-gray-600">History</div>
          <div className="overflow-y-scroll md:h-[25rem] lg:h-[35rem] scrollbar scrollbar-thumb-blue-300 scrollbar-track-white scrollbar-thin">
            {records.length > 0 ? (
              <>
                {records
                  .slice()
                  .reverse()
                  .map((record, i) => (
                    <IssueHistory
                      key={i}
                      issueStatus={record.changedTo}
                      timestamp={record.timestamp}
                    />
                  ))}
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <DoNotDisturb />
                <span>No History Available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
