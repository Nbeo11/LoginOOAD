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
import AddNewShow from "./AddNewShow";
import AddNewShow2 from "./AddNewShow2";
import DeleteShow from "./DeleteShow";
import EditShow from "./EditShow";
import axios from "axios";

class NowShowing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      openEditItem: false,
      openDeleteShow: false,
      openAddNew: false,
      selectedItem: null,
    };
  }
  refresh = () => {
    window.location.reload();
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/show")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          rows: data,
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
  checkName = (name) => {
    if (this.state.rows.movie?.find((item) => item.name === name)) {
      return true;
    } else if (name === "") {
      return 1;
    } else return false;
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
      selectedItem: {
        ...this.state.selectedItem,
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

  callApiDeleteShow = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );
    var urlencoded = new URLSearchParams();
    urlencoded.append("_id", this.state._id);
    urlencoded.append("title", this.state.title);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      `http://localhost:3001/api/show/${this.state.selectedItem._id}`,
      requestOptions
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
          alert("thanhcong");
        }
        throw Error(response.status);
      })
      .then((result) => {
        console.log(result);
        this.state.firstName("");
        this.state.lastName("");
        alert("thanh cong");
      })
      .catch((error) => {
        console.log("error", error);
        alert("wrong");
      });
  };

  callApiEditAccount = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", this.state.title);
    urlencoded.append("description", this.state.description);
    urlencoded.append("durationInMins", this.state.durationInMins);
    urlencoded.append("releaseDate", this.state.releaseDate);
    urlencoded.append("director", this.state.director);
    urlencoded.append("actor", this.state.actor);
    urlencoded.append("image_url", this.state.image_url);
    urlencoded.append("trailer_url", this.state.trailer_url);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      `http://localhost:3001/api/movie/${this.state.selectedItem._id}`,
      requestOptions
    ).then((response) => {
      console.log(response);
      this.setState({ rows: response.data.rows });
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
        <Button onClick={() => this.handleClickOpens(item)}>Edit</Button>
        <Button onClick={() => this.handleDeleteItems(item)}>Delete</Button>
      </div>
    );
  };

  render() {
    return (
      <div col-md-9 col-sm-8 col-xs-12>
        <div id="product-table">
          <ButtonGroup>
            <Button color="primary" onClick={() => this.handleOpenAddNew()}>
              Thêm Show mới
            </Button>
          </ButtonGroup>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow
                  className="detail"
                  style={{ fontSize: "20px !important" }}
                >
                  <TableCell style={{ width: "5%" }}>STT</TableCell>
                  <TableCell>Tên phim</TableCell>
                  <TableCell>Thời gian bắt đầu</TableCell>
                  <TableCell>Thời gian kết thúc</TableCell>
                  <TableCell>Sảnh</TableCell>

                  <TableCell style={{ width: "5%" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="detail">
                {this.state.rows.listShow?.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row.movie.title}</TableCell>
                    <TableCell>{row.startTime}</TableCell>
                    <TableCell>{row.endTime}</TableCell>
                    <TableCell>{row.hall.name}</TableCell>
                    <TableCell>{this.actionsBlock(row)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {this.state.openEditItem ? (
            <EditShow
              open={this.state.openEditItem}
              selectedItem={this.state.selectedItem}
              checkName={this.checkName}
              handleClose={this.handleClose}
              handleChange={this.handleChange}
              //handleChangeDate={this.handleChangeDate}
              handleSubmit={this.handleSubmit}
            />
          ) : null}
          {this.state.openDeleteShow ? (
            <DeleteShow
              open={this.state.openDeleteShow}
              selectedItem={this.state.selectedItem}
              handleClose={this.handleClose}
              handleSubmit={this.handleSubmit}
            />
          ) : null}
          {this.state.openAddNew ? (
            <AddNewShow
              rows={this.state.rows}
              open={this.state.openAddNew}
              handleClose={this.handleClose}
              handleChange={this.handleChange}
              handleChangeDate={this.handleChangeDate}
              handleSubmit={this.handleSubmit}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default NowShowing;
