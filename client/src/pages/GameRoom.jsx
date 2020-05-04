import React,{ useEffect } from 'react';
import io from 'socket.io-client';
import { Notification } from 'rsuite';
import 'rsuite/dist/styles/rsuite-dark.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { useState } from 'react';
import Grid from '../components/Grid';

const socket = io.connect('http://localhost:8000/');

function GameRoom(props) {
    const room = props.match.params.room
    const [grid, setGrid] = useState([]);
    const [turn, setTurn] = useState();
    const [status, setStatus] = useState();
    const [end, setEnd] = useState('')

    useEffect(()=>{
        socket.emit('join', room);
    },[]);

    socket.on('set:gameState', (data)=>{
      setGrid(data.grid);
      setTurn(data.turn);
      setEnd(data.end)
    });

    socket.on('set:status',( newStatus )=>setStatus(newStatus));

    const restart = () => socket.emit('restart');

    const clickOnCell = (rowIndex,elementIndex) =>{
      if(status === 'S'){
        Notification.warning({
          title: 'Внимание',
          duration: 1000,
          description: (
              <p>Вы всего лишь зритель</p>
          )
        })
        return false;
      } 
      if(status !== turn){
        Notification.warning({
          title: 'Внимание',
          duration: 1000,
          description: (
              <p>Не ваш ход</p>
          )
        })
        return false;
      }
      if(!grid[rowIndex][elementIndex]){      
          socket.emit('makeMove', {
            row:rowIndex,
            cell:elementIndex
          });
      }else{
        Notification.warning({
          title: 'Внимание',
          duration: 1000,
          description: (
              <p>Клетка уже заполнена</p>
          )
        })
      }
    }

  return (
      <div className="container text-center">
          <p className="h4 mb-3">Комната номер {room}</p>
          <p className="h5 mb-2">Вы {status}, Ход {turn}</p>
          <button className="btn btn-success my-2" onClick={restart}>Рестарт</button>
          {end && 
            <p>Игра окончена {end}</p>

          }
          <Grid grid={grid} clickOnCell={clickOnCell} />
      </div>
  );
}

export default GameRoom;
