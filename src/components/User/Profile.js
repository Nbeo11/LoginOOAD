import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import "../../css/table.css";
import "../../css/style.css";
import "../../css/responsive.css";
import "../../css/lightbox.min.css";
import "../../css/bootstrap.min.css";
import UpdateUser from "./UpdateUser";

import axios from "axios";

export default function Profile(props) {
  const [Profile, setProfile] = useState([]);
  const { token } = useParams();

  useEffect(() => {
    refreshProfile();
  }, [token]);

  function refreshProfile() {
    const ProjectAPI = axios
      .get(`http://localhost:3001/api/user`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {/*<div className="image-head-wrapper"   style={{ backgroundImage: "url(" + banner0 + ")" }} >
            <div className="inner-wrapper">
             </div>
    </div>*/}
      <div
        className="col-md-10
                 col-sm-12 col-xs-12 remove-padd"
      >
        <nav className="navbar navbar-default">
          <div className="navbar-header page-scroll">
            <button
              data-target=".navbar-ex1-collapse"
              data-toggle="collapse"
              className="navbar-toggle"
              type="button"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div className="collapse navigation navbar-collapse navbar-ex1-collapse remove-space">
            <ul className="list-unstyled nav1 cl-effect-10">
              <li>
                <a data-hover="Vé đã đặt" href="/profile/userbooking">
                  <span>Vé đã đặt</span>
                </a>
              </li>
              <li>
                <a data-hover="GIỚI THIÊU" href="/intro">
                  <span>GIỚI THIÊU</span>
                </a>
              </li>
              <li>
                <a data-hover="LỊCH CHIẾU" href="/schedule">
                  <span>LỊCH CHIẾU</span>
                </a>
              </li>
              {/*<li><a data-hover="LIÊN HOAN PHIM" href="/event"><span>LIÊN HOAN PHIM</span></a></li>*/}
              <li>
                <a data-hover="TIN TỨC" href="/news">
                  <span>TIN TỨC</span>
                </a>
              </li>
              {/* <li><a data-hover="GIÁ VÉ" href="/price"><span>GIÁ VÉ</span></a></li>*/}
              <li>
                <a data-hover="THÀNH VIÊN" href="/member">
                  <span>THÀNH VIÊN</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div style={{ marginLeft: "8%" }}>
        <h2> THÔNG TIN CÁ NHÂN </h2>
      </div>
      <div className="resort-overview-block">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-sm-12 col-xs-10 ">
              <div className="side-A">
                <div col-md-9 col-sm-8 col-xs-12 className="film-detail">
                  <p>First Name: {Profile.user?.firstName}</p>
                  <p>Last Name: {Profile.user?.lastName}</p>
                  <p>Email: {Profile.user?.email}</p>
                  <p>Password: {Profile.user?.password}</p>
                </div>
              </div>
              <div
                className="modal fade"
                id="modalUpdateUserForm"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content single-bottom comment-form">
                    <UpdateUser />
                  </div>
                </div>
              </div>
              <div>
                <Link to="/profile/updateuser">
                  <button class="button-39" role="button">
                    Cập nhật thông tin
                  </button>
                </Link>
              </div>
              <div>
                <Link to="/profile/updatepassword">
                  <button class="button-39" role="button">
                    Thay đổi mật khẩu
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    </div>
  );
}
