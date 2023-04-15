import React, {useState}   from 'react';
import {useEffect} from 'react';
import '../css/style.css'
import '../css/responsive.css'
import '../css/lightbox.min.css'
import '../css/bootstrap.min.css'
import film1 from '../images/film1.png'

import { Link } from "react-router-dom";
import axios from 'axios';
import ViewFilmDetail from '../components/View/ViewFilmDetail'
import Popup from "reactjs-popup";


export default function FilmList(){
  
        const [FilmList, setFilmList] = useState([])

          useEffect(() => {
            refreshFilmList();
          }, [])
        
          function refreshFilmList() {
            const ProjectAPI = axios.get('http://localhost:3001/api/movie')
              .then(res => setFilmList(res.data))
              .catch(err => console.log(err))
              .then((result) => {
                console.log(result);
                //localStorage.setItem("status", result.status);
                //thêm token vào local storage
                // các màn khác phải xét nếu chưa có token thì ra màn login
                // chị nghĩ các em làm bấm vào logout nó ra màn login là đc, dành thời gian sửa cái khác
                // alert("Thanh cong"); //ko cần dòng này
                
              
                
              }
              )
          }
          
       
          
         
    return (
        <>
        <section className="gallery-block gallery-front">
          <div className="container">
          <div className="collapse navigation navbar-collapse navbar-ex1-collapse remove-space">
              <ul className="list-unstyled nav1 cl-effect-10">
              <li>
              <Link data-hover="PHIM ĐANG CHIẾU" to="/phimdangchieu" className="active" ><span>PHIM ĐANG CHIẾU</span></Link>
                </li>
              
                <li>
                <Link data-hover="PHIM SẮP CHIẾU" to="/phimsapchieu" ><span>PHIM SẮP CHIẾU</span></Link>
                </li>
            
                
                
              </ul>
            </div>
          
            {
              
              FilmList.allMovie?.map((e, i) =>
             
              <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12" key={i}>
              
                <div className="gallery-image" style={{width: '100%', height: '100%'}}>
                  <img className="img-responsive" src={film1}style={{width: '100%', height: '100%'} }/>
                  <div className="overlay">
 
                    <p>
                      
                    <Link to={`/thisfilm/${e._id}`}> 
                    {e.title} 
                     </Link>
                     </p>

                    <a href="" className="button_book_tickets" aria-hidden="true" > ĐẶT VÉ</a>
              </div>

              </div>
              </div>
             
              
              )
              
            }
           
            </div>
            </section>
      </>
      
    )
}
