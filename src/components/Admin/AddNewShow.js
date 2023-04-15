import React, { Component, useState } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DatePicker from "react-datepicker";
import "../../css/table.css";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import AddNewShow2 from "./AddNewShow2";
import AddNewShow3 from "./AddNewShow3";
import Show from "./Show";

//import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

class AddNewShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddNew2: false,
      _id: "",
      rows: [],
    };
  }
  idd = localStorage.getItem("_id");
  setParams = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/hall")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          rows: data,
        });
      });
  }
  handleOpenAddNew2 = () => {
    this.setState({
      openAddNew2: true,
    });
  };
  handleClose = () => {
    this.setState({
    openAddNew2: false,
      
    });
    {localStorage.removeItem("Movie_id")}
  };
  actionsBlock = (item) => {
    return (
      <button
        type="button"
        onClick={() => {
          this.handleOpenAddNew2(item);
          localStorage.setItem("Hall_id", item._id);
          //alert("onclick")
        }}
      >
        Chon
      </button>
    );
  };
  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  className="detail"
                  style={{ fontSize: "20px !important" }}
                >
                  <TableCell style={{ width: "5%" }}>STT</TableCell>
                  <TableCell>Tên Phòng</TableCell>
                  <TableCell style={{ width: "5%" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="detail">
                {this.state.rows.listHall?.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{this.actionsBlock(row)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            color="primary"
            onClick={this.props.handleClose}
            className="modal-footer d-flex justify-content-center"
          >
            Cancel
          </Button>
        </Dialog>
        {this.state.openAddNew2 ? (
          <AddNewShow2
            rows={this.state.rows}
            open={this.state.openAddNew2}
            handleClose={this.handleClose}
          />
        ) : null}
      </div>
    );
  }
}
export default AddNewShow;
