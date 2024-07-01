import React, { useState } from "react";

function InterviewResults() {
  const [getData, setGetData] = useState({
    studentData: null,
  });
  return (
    <section className="studs_sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="" style={{ textAlign: "end" }}>
              <button type="button" className="btn btn-outline-warning">
                Warning
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table_box table-responsive-sm">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th rowSpan="2">Name</th>
                    <th rowSpan="2">College</th>
                    <th rowSpan="2">Batch</th>
                    <th rowSpan="2">Status</th>
                    <th colSpan="3" style={{ textAlign: "center" }}>
                      Score
                    </th>
                    <th colSpan="5" style={{ textAlign: "center" }}>
                      Interview
                    </th>
                  </tr>
                  <tr>
                    <th>React Score</th>
                    <th>Web Score</th>
                    <th>DSA Score</th>
                    <th>Company Name</th>
                    <th>Location</th>
                    <th>Desgination</th>
                    <th>Mode</th>
                    <th>Date</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {getData?.studentData?.map((data, idx) => (
                <tr
                key={idx}
                style={{
                    backgroundColor:
                    selectedStudentId === data._id ? "lightblue" : "white",
                }}
                onClick={() => {
                    if (selectedStudentId === data._id) {
                    setSelectedStudentId(null);
                    } else {
                    setSelectedStudentId(data._id);
                    }
                }}
                >
                <td>{data?.name || "-"}</td>
                <td>{data?.college || "-"}</td>
                <td>{data?.batch || "-"}</td>
                <td>{data?.status || "-"}</td>
                <td>{data?.score?.React_Score || "-"}</td>
                <td>{data?.score?.Web_Score || "-"}</td>
                <td>{data?.score?.DSA_Score || "-"}</td>
                </tr>
            ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InterviewResults;
