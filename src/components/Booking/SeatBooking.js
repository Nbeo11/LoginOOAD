import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from "react-router-dom"
import '../../css/booking.css'

class SeatBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectingSeats: []
        }
    }
    componentDidMount() {
        axios.get('').then(res => {
            // console.log(res.data)
            const resData = res.data;
            for(let i=0;i<resData.length;i++){
                if(resData[i].available === false){
                    document.getElementById(resData[i].seatNumber).setAttribute("disabled", true)
                }
            }
        })
    }
    choiceSeat = (seat) => {
        const newBookedSeats = [ ...this.state.selectingSeats, seat ];
        this.setState({
            selectingSeats: newBookedSeats
        })
    };
    SelectSeats = () => {
        const Selected = this.state.selectingSeats;
        if(Selected.length !== 0)
        {
            axios.post('http://localhost:8080/bookSeat', {"seats": Selected}).then(res => {
                this.props.history.push('/invoice')
            })
        }
        else {
            alert('Please Select Seats')
        }
    };

    render() {
        const seatsColumns = ['1', '2', '3', '4', '5', '', '6', '7', '8', '9', '10', '11', '12'];
        const seatsRows = ['A', 'B','C', 'D', 'E', '', 'F', 'G', 'H', 'I', 'J'];
        const seatsGenerator = () => {
            return (
                <table id="seatsBlock">
                    <tbody>
                    <tr>
                        <td></td>
                        {seatsColumns.map((column, index) => <td key={index}>{column}</td>)}
                    </tr>
                    {
                        seatsRows.map((row, index) =>
                            row === ''
                                ?
                                <tr key={index} className="seatVGap"></tr>
                                :
                                <tr key={index}>
                                    <td>
                                        {row}
                                    </td>
                                    {seatsColumns.map((column, index) => {
                                        return (
                                            column === ''
                                                ?
                                                <td key={index} className="seatGap"></td>
                                                :
                                                <td key={index}>
                                                    <input onClick={() => this.choiceSeat(`${row}${column}`)} type="checkbox" className="seats" id={`${row}${column}`} value={`${row}${column}`} />
                                                </td>
                                        )
                                    })}
                                </tr>)
                    }
                    </tbody>
                </table>
            );
        };
        return (
            <div>
                <div>
                    <h1 style={{ color: "black" }}>Lựa chọn chỗ ngồi</h1>
                    <h1 style={{ fontSize: '15px' }}>PHIM: Tên phim</h1>
                    <h1 style={{ fontSize: '15px' }}>Khung giờ chiếu: 12h - 14h</h1>
                    <div className="containerbooking">
                        <div className="w3ls-reg" style={{paddingTop: '0px'}}>
                            <ul className="seat_w3ls">
                                <li className="smallBox greenBox">Ghế đang chọn</li>

                                <li className="smallBox redBox">Ghế đã đặt trước</li>

                                <li className="smallBox emptyBox">Các ghế trống</li>
                            </ul>
                            <div className="seatStructure txt-center" style={{overflowX:'auto'}}>
                                {seatsGenerator()}
                                <div className="screen">
                                    <h2 className="wthree">Đây là màn hình</h2>
                                </div>
                                <button onClick={() => { this.SelectSeats()}}>Confirm Selection</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SeatBooking;