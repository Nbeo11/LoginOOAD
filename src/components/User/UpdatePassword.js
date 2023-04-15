import React, { Component } from "react";

// Call API them san pham cua nha may
class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
    };
  }

  setParams = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  callApiUpdatePassword = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("token")}`
    );

    var urlencoded = new URLSearchParams();
    urlencoded.append("password", this.state.password);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/user/updatePassword", requestOptions)
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
        this.state.password("");
        alert("thanh cong");
        
      })
      .catch((error) => {
        console.log("error", error);
        alert("wrong");
      });
  };

  render() {
    return (
      <form>
        <div className="modal-header text-center">
          <h4 className="modal-title w-100 font-weight-bold">
            Thay đổi mật khẩu
          </h4>
          <button
            type="button"
            className="submit-btn"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">Exit</span>
          </button>
        </div>
        <div className="modal-body mx-3">
          <div className="">
          <i className="prefix grey-text" />
            <label
              data-error="wrong"
              data-success="right"
              htmlFor="defaultForm-email"
            >
              Mật khẩu cũ
            </label>
            <input
              name="password"
              type="text"
              id="defaultForm-email"
              className="form-control validate"
              onChange={this.setParams}
            />
            <i className="prefix grey-text" />
            <label
              data-error="wrong"
              data-success="right"
              htmlFor="defaultForm-email"
            >
              Password
            </label>
            <input
              name="password"
              type="text"
              id="defaultForm-email"
              className="form-control validate"
              onChange={this.setParams}
            />

        
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button
            className="btn btn-default"
            
            onClick={this.callApiUpdatePassword}
          >
            OK
          </button>
        </div>
      </form>
    );
  }
}

export default UpdatePassword;
