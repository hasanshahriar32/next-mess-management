/* eslint-disable react/jsx-key */
"use client";
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
// import { orderDataSource } from "./data";

import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from "@mui/x-data-grid-pro";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from "@mui/x-data-grid-generator";
import { DataGrid } from "@mui/x-data-grid";

// const initialRows = [
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 25,
//     dateCreated: randomCreatedDate(),
//     lastLogin: randomUpdatedDate(),
//   },

// ];
// console.log(initialRows);
// console.log(orderDataSource[0]);
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const DatabaseId = fetch("https://amin-mess-server.vercel.app/bazar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        budget: "",
        dateCreated: "",
        dateFinished: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const id = data.insertedId;
        return id;
      });
    console.log(DatabaseId);

    const id = DatabaseId;

    setRows((oldRows) => [
      ...oldRows,
      { id, name: "", budget: "", dateCreated: "", dateFinished: "" },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function Bazar() {
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [bazarData, setBazarData] = React.useState([]);
  React.useEffect(() => {
    fetch("https://amin-mess-server.vercel.app/bazar")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //destructure data and set _id to id
        const mybazarData = data.map((bazar) => {
          const { _id, ...rest } = bazar;
          return { id: _id, ...rest };
        });
        // console.log(mybazarData);
        setRows(mybazarData);
        // setRows(bazarData);
        setBazarData(data);
        setLoading(false);
      });
  }, []);
  // const initialRows = bazarData;

  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    //get renderCell params  and set it to a variable
    const row = rows.find((row) => row.id === id);
    console.log(row);
    // console.log(row.name);

    fetch(`https://amin-mess-server.vercel.app/bazar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "",
        budget: "",
        dateCreated: "",
        dateFinished: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    console.log(id);
    console.log(rowModesModel);
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    console.log(id);
    fetch(`https://amin-mess-server.vercel.app/bazar/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    // { field: 'name', headerName: 'Name', width: 180, editable: true },
    // { field: 'budget', headerName: 'Budget', type: 'number', editable: true },
    // {
    //   field: 'dateCreated',
    //   headerName: 'Assigned Date',
    //   type: 'date',
    //   width: 180,
    //   editable: true,
    // },
    // {
    //   field: 'dateFinished',
    //   headerName: 'Finish Time',
    //   type: 'dateTime',
    //   width: 220,
    //   editable: true,
    // },
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   headerName: 'Actions',
    //   width: 100,
    //   cellClassName: 'actions',
    //   getActions: ({ id }) => {
    //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

    //     if (isInEditMode) {
    //       return [
    //         <GridActionsCellItem
    //           icon={<SaveIcon />}
    //           label="Save"
    //           onClick={handleSaveClick(id)}
    //         />,
    //         <GridActionsCellItem
    //           icon={<CancelIcon />}
    //           label="Cancel"
    //           className="textPrimary"
    //           onClick={handleCancelClick(id)}
    //           color="inherit"
    //         />,
    //       ];
    //     }

    //     return [
    //       <GridActionsCellItem
    //         icon={<EditIcon />}
    //         label="Edit"
    //         className="textPrimary"
    //         onClick={handleEditClick(id)}
    //         color="inherit"
    //       />,
    //       <GridActionsCellItem
    //         icon={<DeleteIcon />}
    //         label="Delete"
    //         onClick={handleDeleteClick(id)}
    //         color="inherit"
    //       />,
    //     ];
    //   },
    // },
    // save data of field to a variable
    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
      renderCell: (params) => {
        const { value } = params;
        return <span>{value}</span>;
      },
    },
    {
      field: "budget",
      headerName: "Budget",
      type: "number",
      editable: true,
      renderCell: (params) => {
        const { value } = params;
        return <span>{value}</span>;
      },
    },
    {
      field: "dateCreated",
      headerName: "Assigned Date",
      type: "date",
      width: 180,
      editable: true,
      renderCell: (params) => {
        const { value } = params;
        return <span>{value}</span>;
      },
    },
    {
      field: "dateFinished",
      headerName: "Finish Time",
      type: "dateTime",
      width: 220,
      editable: true,
      renderCell: (params) => {
        const { value } = params;
        return <span>{value}</span>;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,

      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      className="bg-white"
      sx={{
        height: "100vh",
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={10}
        rowsPerPageOptions={[10, 20, 50, 100]}
        // height={500}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
