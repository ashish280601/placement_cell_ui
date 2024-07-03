import React, { useState } from "react";

function InterviewResults() {
  const [getResultData, setGetResultData] = useState([]);
  const dispatch = useDispatch();

  const fetchInterviewResultData = () => {
    dispatch(fetchInterviewResultSlice({}))
      .then((res) => {
        console.log(res);
        const { data } = res.payload.data;
        console.log("studentResults", data);
        setGetResultData(data);
      })
      .catch((error) => {
        console.log(error);
        throw Error;
      });
  };

  const handleDownloadExcel = () => {
    const formattedData = getResultData.flatMap((data) =>
      data.students.map((student) => ({
        Name: student?.name || "-",
        College: student?.college || "-",
        Batch: student?.batch || "-",
        Status: student?.status || "-",
        "React Score": student?.score?.React_Score || "-",
        "Web Score": student?.score?.Web_Score || "-",
        "DSA Score": student?.score?.DSA_Score || "-",
        "Company Name": data.company || "-",
        "Company Location": data.location || "-",
        Designation: data.designation || "-",
        Mode: data.mode || "-",
        "Interview Date": new Date(data.date).toLocaleDateString() || "-",
        Result: student?.result || "-",
      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Set column widths
    worksheet['!cols'] = [
      { wch: 20 }, // Name
      { wch: 20 }, // College
      { wch: 10 }, // Batch
      { wch: 15 }, // Status
      { wch: 15 }, // React Score
      { wch: 15 }, // Web Score
      { wch: 15 }, // DSA Score
      { wch: 25 }, // Company Name
      { wch: 20 }, // Company Location
      { wch: 25 }, // Designation
      { wch: 15 }, // Mode
      { wch: 20 }, // Interview Date
      { wch: 15 }  // Result
    ];

    // Customize headers
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "4F81BD" } }
    };

    Object.keys(worksheet).forEach(cell => {
      if (cell.startsWith('!')) return; // Skip special cells

      const cellRef = XLSX.utils.decode_cell(cell);
      if (cellRef.r === 0) {
        worksheet[cell].s = headerStyle;
      }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Interview Results");
    XLSX.writeFile(workbook, "InterviewResults.xlsx");
  };

  useEffect(() => {
    fetchInterviewResultData();
  }, []);

  return (
    <section className="studs_sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12" style={{ textAlign: "end" }}>
            <button type="button" className="btn btn-outline-warning" onClick={handleDownloadExcel}>
              Download Excel
            </button>
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
                    <th>Company Name</th>
                    <th>Company Location</th>
                    <th>Designation</th>
                    <th>Mode</th>
                    <th>Interview Date</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {console.log(getResultData?.length)}
                  {getResultData?.length > 0 ? (
                    getResultData.map((data, idx) =>
                      data.students.map((student, stdId) => (
                        <tr key={`${idx}-${stdId}`}>
                          <td>{student?.name || "-"}</td>
                          <td>{student?.college || "-"}</td>
                          <td>{student?.batch || "-"}</td>
                          <td>{student?.status || "-"}</td>
                          <td>{student?.score?.React_Score || "-"}</td>
                          <td>{student?.score?.Web_Score || "-"}</td>
                          <td>{student?.score?.DSA_Score || "-"}</td>
                          <td>{data.company || "-"}</td>
                          <td>{data.location || "-"}</td>
                          <td>{data.designation || "-"}</td>
                          <td>{data.mode || "-"}</td>
                          <td>{new Date(data.date).toLocaleDateString() || "-"}</td>
                          <td>{student?.result || "-"}</td>
                        </tr>
                      ))
                    )
                  ) : (
                    <tr>
                      <td colSpan="13" style={{ textAlign: "center" }}>
                        <h6>No Data Available</h6>
                      </td>
                    </tr>
                  )}
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
