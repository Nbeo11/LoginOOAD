import { Component } from "react";
import "../../css/table.css";

import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

//import DeleteIcon from "@mui/icons-material/Delete";
//import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";

class UserBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      cols: [],
      openEditItem: false,
      openDeleteShow: false,
      openAddNew: false,
      emtom:"",
    };
  }
  refresh = () => {
    window.location.reload();
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/booking", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          rows: data,
          //sItem: this.state.rows.listBooking.show.movie,
        });
      });
    
  }

  handleOpenAddNew = () => {
    this.setState({
      openAddNew: true,
    });
  };

  handleClickOpens = (item) => {
    this.setState({
      openEditItem: true,
      selectedItem: item,
    });
  };

  handleDeleteItems = (item) => {
    this.setState({
      openDeleteShow: true,
      selectedItem: item,
    });
  };

  handleClose = () => {
    this.setState({
      openEditItem: false,
      openDeleteShow: false,
      openAddNew: false,
      selectedItem: null,
    });
    {
      localStorage.removeItem("Hall_id");
    }
  };

  handleChange = (event, target) => {
    this.setState({
      item: {
        ...this.row.item,
        [target]: event.target.value,
      },
    });
  };

  handleChangeDate = (newValue) => {
    this.setState({
      selectedItem: {
        ...this.state.selectedItem,
        date: newValue,
      },
    });
  };

  callApiNameMovie = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", this.state.title);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      `http://localhost:3001/api/movie/${entom}`,
      requestOptions
    ).then((response) => {
      console.log(response);
      this.setState({ cols: response.data.cols });
      if (response.ok) {
        return response.json();
      }
      throw Error(response.status);
    });
  };

  //Xác nhận tương ứng với các hoạt động openEditItem và openDeleteShow
  handleSubmit = (newOne) => {
    let rows = this.state.rows;
    // Edit
    if (this.state.openEditItem) {
      newOne.preventDefault();

      let key = this.state._id;
      this.setState((prevState) => ({
        news: prevState.news.map((elm) =>
          elm._id === key
            ? {
                ...elm,
                title: this.state.title,
                description: this.state.description,
                //content: this.state.content,
              }
            : elm
        ),
      }));
    }
    // Delete
    if (this.state.openDeleteShow) {
      this.callApiDeleteShow();
      {
        this.refresh();
      }
    }
    console.log(newOne);
    // Add new
    if (this.state.openAddNew) {
      rows.push(newOne);
    }
    //Cập nhật rows
    this.setState({
      rows: rows,
    });

    this.handleClose();
  };

  actionsBlock = (item) => {
    return (
      <div className="actionsBlock">
        <Button onClick={() => this.handleDeleteItems(item)}>Hủy vé</Button>
      </div>
    );
  };

  render() {
    return (
      <div col-md-9 col-sm-8 col-xs-12>
        <div id="product-table">
          <h2>Vé đã đặt</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  className="detail"
                  style={{ fontSize: "20px !important" }}
                >
                  <TableCell style={{ width: "5%" }}>STT</TableCell>
                  <TableCell>ID vé</TableCell>
                  <TableCell>Tên phim</TableCell>
                  <TableCell>Thời gian bắt đầu</TableCell>
                  <TableCell>Thời gian kết thúc</TableCell>
                  <TableCell>Thanh toán</TableCell>

                  <TableCell style={{ width: "5%" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="detail">
                {this.state.rows.listBooking?.map((row, i) => (
                 // entom: this.handleChange,
                  <TableRow key={row.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row._id}</TableCell>

                    <TableCell>
                      {this.state.cols.allMovie?.map((col, i) => (
                        <TableRow key={col.id}>
                     
                          <TableCell>{col.title}</TableCell>
                        </TableRow>
                      ))}
                    </TableCell>
                    <TableCell>{row.show?.startTime}</TableCell>
                    <TableCell>{row.show?.endTime}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{this.actionsBlock(row)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default UserBooking;
