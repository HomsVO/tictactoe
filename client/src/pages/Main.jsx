import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Main() {

    const [room,setRoom] = useState(null);
    return (
        <div className="container mt-5 text-center">
            <h1>Введите номер комнаты</h1>
            <input type="number" value={room} onChange={(e)=>setRoom(e.target.value)} className="form-control mt-2"/>
            <Link className={"btn btn-success mt-3" + ((!room)?" disabled":"")} to={'/room/' + room} >Войти</Link>
        </div>
    );
}

export default Main;
