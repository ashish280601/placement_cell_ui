import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCompanyData, getCompanyData } from "../../slice/companySlice";

function Company() {
  const [inputData, setinputData] = useState({});
  const [comapnyData, setComapnyData] = useState(null);
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
  console.log("company data change", inputData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // write your code logic here.
      const res = await dispatch(addCompanyData(inputData));
      console.log("res data from student component", res);
      if (res.payload.data.status) {
        setinputData({});
        fetchInterviewData();
        return;
      }
    } catch (error) {
      console.error("error while adding student data", error);
    }
  };

  const fetchInterviewData = () => {
    dispatch(getCompanyData({})).then((res) => {
      console.log(res);
      const { data } = res.payload.data;
      console.log(data);
      setComapnyData(data);
    });
  };

  useEffect(() => {
    fetchInterviewData();
  }, []);

  console.log("companyData", comapnyData);
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
                        <label>Company Name</label>
                        <input
                          type="text"
                          name="company"
                          className="form-control"
                          value={inputData?.company || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input_box">
                      <div className="form-group">
                        <label>Location</label>
                        <input
                          type="text"
                          name="location"
                          className="form-control"
                          value={inputData?.location || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input_box">
                      <div className="form-group">
                        <label>Designation</label>
                        <input
                          type="text"
                          name="designation"
                          className="form-control"
                          value={inputData?.designation || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input_box">
                      <div className="form-group">
                        <label>Mode</label>
                        {/* <input type="text" name="name" value="" onChange={handleChange} /> */}
                        <select
                          name="mode"
                          className="form-control"
                          value={inputData?.mode || ""}
                          onChange={handleChange}
                        >
                          <option value="---Select---">--Select--</option>
                          <option value="Online">Online</option>
                          <option value="Offline">Offline</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="input_box">
                      <div className="form-group">
                        <label>Interview Date</label>
                        <input
                          type="date"
                          name="date"
                          className="form-control"
                          value={inputData?.date || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="">
                      <button className="btn btn-outline-success">
                        Add Company
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
            <th>Company Name</th>
            <th>Interview Date</th>
            <th>Location</th>
            <th>Designation</th>
            <th>Mode</th>
          </tr>
                </thead>
                <tbody>
                {comapnyData?.map((data, idx) => (
            <tr key={idx}>
              <td>{data?.company || "-"}</td>
              <td>{data?.date.slice(0, 10) || "-"}</td>
              <td>{data?.location || "-"}</td>
              <td>{data?.designation || "-"}</td>
              <td>{data?.mode || "-"}</td>
              {/* <td>
                <h4>...</h4>
              </td> */}
              {/* {data?.students?.map((allocateData, id) => (
                <tr>
                  <td>{allocateData.name}</td>
                </tr>
              ))} */}
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

export default Company;
