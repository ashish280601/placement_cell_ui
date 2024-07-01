import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCompanyData } from "../../slice/companySlice";
import { getStudentData } from "../../slice/studentSlice";
import { allocateInterview } from "../../slice/interviewSlice";

function Interview() {
  const [inputData, setInputData] = useState(null);
  const [getData, setGetData] = useState({
    companyData: null,
    studentData: null,
  });
  // state to stor the id of an selected student row
  const [selectedStudentId, setSelectedStudentId] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("student data change", inputData);

  const fetchInterviewData = async () => {
    try {
      const res = await dispatch(getCompanyData({}));
      const { data } = res.payload.data;
      setGetData((prevData) => ({
        ...prevData,
        companyData: data,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStudentData = async () => {
    try {
      const res = await dispatch(getStudentData({}));
      const { allStudent } = res.payload.data;
      setGetData((prevData) => ({
        ...prevData,
        studentData: allStudent,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAllocateInterview = async () => {
    // write your code here.
    try {
      // write your code logic here.
      const res = await dispatch(
        allocateInterview({
          companyId: inputData.company,
          studentsId: selectedStudentId,
        })
      );
      console.log("res data from allocated interview component", res);
      if (res?.payload?.data?.data?.status === true) {
        setInputData(null);
        setSelectedStudentId([]);
        return;
      }
    } catch (error) {
      console.error("error while adding student data", error);
    }
  };

  console.log(getData?.studentData);
  console.log(getData?.companyData);

  useEffect(() => {
    fetchInterviewData();
    fetchStudentData();
  }, []);
  console.log("selectedStudentId", selectedStudentId);
  return (
    <>
      <section className="studs_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="input_box">
                <div className="form-group">
                  <label>List Of Company: </label>
                  {/* <input type="text" name="name" value="" onChange={handleChange} /> */}
                  <select
                    name="company"
                    value={inputData?.company || ""}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="---Select---">---Select---</option>
                    {getData?.companyData?.map((data, idx) => (
                      <option value={data._id} key={idx}>
                        {data.company}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="" style={{ marginTop: "25px" }}>
                <button
                  className="btn-outline-success"
                  onClick={handleAllocateInterview}
                >
                  Add Interview
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table_box">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th rowSpan="2">Name</th>
                      <th rowSpan="2">College</th>
                      <th rowSpan="2">Batch</th>
                      <th rowSpan="2">Status</th>
                      <th>React Score</th>
                      <th>Web Score</th>
                      <th>DSA Score</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getData?.studentData?.map((data, idx) => (
                      <tr
                        key={idx}
                        style={{
                          backgroundColor: selectedStudentId.includes(data._id) ? "lightblue" : "white",
                        }}
                        onClick={() => {
                          setSelectedStudentId((prevSelected) =>
                            prevSelected.includes(data._id)
                              ? prevSelected.filter((id) => id !== data._id)
                              : [...prevSelected, data._id]
                          );
                        }}
                      >
                        <td>{data?.name || "-"}</td>
                        <td>{data?.college || "-"}</td>
                        <td>{data?.batch || "-"}</td>
                        <td>{data?.status || "-"}</td>
                        <td>{data?.score?.React_Score || "-"}</td>
                        <td>{data?.score?.Web_Score || "-"}</td>
                        <td>{data?.score?.DSA_Score || "-"}</td>

                        <td>
                          <button
                            data-toggle="modal"
                            data-target="#exampleModalAddbox"
                          >
                            {" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#000000"
                              stroke-width="3"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="16"></line>
                              <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                          </button>
                        </td>

                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="exampleModalAddbox"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Result Add
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {" "}
              <section className="studs_info_sec">
                <div className="container">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="input_box">
                        <div className="form-group">
                          <label>Interview Results: </label>
                          {/* <input type="text" name="name" value="" onChange={handleChange} /> */}
                          <select
                            name="result"
                            value={inputData?.result || ""}
                            onChange={handleChange}
                            className="form-control"
                          >
                            <option value="---Select---">---Select---</option>
                            <option value="Pass">Pass</option>
                            <option value="Fail">Fail</option>
                            <option value="Didn't Attempt">
                              Didn't Attempt
                            </option>
                            <option value="On Hold">On Hold</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="" style={{ marginTop: "25px" }}>
                        <button onClick={handleAllocateInterview}>
                          Add Results
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Interview;
