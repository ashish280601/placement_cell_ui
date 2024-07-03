import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStudentData, getStudentData } from "../../slice/studentSlice";

function Students() {
  const [inputData, setinputData] = useState({});
  const [studentData, setStudentData] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputData((prev) => {
      const keys = name.split(".");
      const lastKey = keys.pop();
      const deepClone = { ...prev };

      let nested = deepClone;
      keys.forEach((key) => {
        if (!nested[key]) {
          nested[key] = {};
        }
        nested = nested[key];
      });

      nested[lastKey] = value;

      return deepClone;
    });
  };
  console.log("student data change", inputData);

  const fetchStudentData = () => {
    dispatch(getStudentData({}))
      .then((res) => {
        console.log(res);
        const { allStudent } = res.payload.data;
        console.log(allStudent);
        setStudentData(allStudent);
      })
      .catch((error) => {
        console.log(error);
        throw Error;
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // write your code logic here.
      const res = await dispatch(addStudentData(inputData));
      // console.log("res data from student component", res);
      if (res.payload.data.status) {
        fetchStudentData();
        setinputData({});
        return;
      }
    } catch (error) {
      console.error("error while adding student data", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  console.log("studentData", studentData);
  return (
    <section className="studs_sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="form_box">
              <form action="post" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-3">
                    <div className="input_box">
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={inputData?.name || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input_box">
                      <div className="form-group">
                        <label>College</label>
                        <input
                          type="text"
                          name="college"
                          className="form-control"
                          value={inputData?.college || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input_box">
                      <div className="form-group">
                        <label>Batch</label>
                        <input
                          type="number"
                          className="form-control"
                          name="batch"
                          value={inputData?.batch || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input_box">
                      <div className="form-group">
                        <label>Status</label>
                        {/* <input type="text" name="name" value="" onChange={handleChange} /> */}
                        <select
                          name="status"
                          className="form-control"
                          value={inputData?.status || ""}
                          onChange={handleChange}
                        >
                          <option value="---Select---">--Select--</option>
                          <option value="Placed">Placed</option>
                          <option value="Not Placed">Not Placed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="title_box">
                      <h6>Skills Score</h6>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input_box">
                      <div className="form-group">
                        <label>React Score</label>
                        <input
                          type="number"
                          className="form-control"
                          name="score.React_Score"
                          value={inputData?.score?.React_Score || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input_box">
                      <div className="form-group">
                        <label>Web Score</label>
                        <input
                          type="number"
                          className="form-control"
                          name="score.Web_Score"
                          value={inputData?.score?.Web_Score || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input_box">
                      <div className="form-group">
                        <label>DSA Score</label>
                        <input
                          type="number"
                          className="form-control"
                          name="score.DSA_Score"
                          value={inputData?.score?.DSA_Score || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="">
                      <button className="btn btn-outline-success">
                        Add Student
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="table_box">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>College</th>
                    <th>Batch</th>
                    <th>Status</th>
                    <th>React Score</th>
                    <th>Web Score</th>
                    <th>DSA Score</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData?.map((data, idx) => (
                    <tr key={idx}>
                      <td>{data?.name || ""}</td>
                      <td>{data?.college || ""}</td>
                      <td>{data?.batch || ""}</td>
                      <td>{data?.status || ""}</td>
                      <td>{data?.score?.React_Score || ""}</td>
                      <td>{data?.score?.Web_Score || ""}</td>
                      <td>{data?.score?.DSA_Score || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Students;
