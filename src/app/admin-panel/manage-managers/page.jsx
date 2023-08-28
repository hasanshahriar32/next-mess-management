"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "Start\u00a0Date", minWidth: 100 },
  { id: "code", label: "End\u00a0Date", minWidth: 100 },
  {
    id: "title",
    label: "Administration\u00a0Title",
    minWidth: 170,
    align: "right",
  },
  { id: "action", label: "Action", minWidth: 100 },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [managerData, setManagerData] = React.useState([]);
  const managerRows = managerData?.map((manager) => ({
    name: manager.name,
    startDate: manager.validity.startDate,
    endDate: manager.validity.endDate,
    title: manager.administrationTitle,
    _id: manager._id,
    deleteButton: (
      <button className="btn btn-error btn-outline btn-sm">Delete</button>
    ), // Add your delete button component here
  }));
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://inn.vercel.app/api/admin/manage-manager`
        );
        console.log(response);
        setManagerData(response?.data?.admin);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const isDatePassed = (date) => {
    const currentDate = new Date();
    const endDate = new Date(date);
    return endDate < currentDate;
  };

  const handleDelete = async (managerId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this manager?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `https://inn.vercel.app/api/admin/manage-manager/?id=${managerId}`
        );

        // Assuming the response indicates success (e.g., status code 200)
        console.log("Manager deleted successfully:", response.data);

        // Update the UI, remove the deleted manager from the list
        const updatedManagerData = managerData.filter(
          (manager) => manager._id !== managerId
        );
        setManagerData(updatedManagerData);
      } catch (error) {
        console.error("Error deleting manager:", error);
        // Handle error, show a message, etc.
      }
    }
  };

  return (
    <Paper className="mt-5" sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {managerRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isEndDatePassed = isDatePassed(row.endDate);
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={index}
                    style={{
                      textDecoration: isEndDatePassed ? "line-through" : "none",
                    }}
                  >
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.startDate}</TableCell>
                    <TableCell align="left">{row.endDate}</TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">
                      {isEndDatePassed ? (
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleDelete(row._id)}
                        >
                          Expired
                        </button>
                      ) : (
                        <button
                          className="btn btn-error btn-outline btn-sm"
                          onClick={() => handleDelete(row._id)}
                        >
                          Delete
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={managerRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
