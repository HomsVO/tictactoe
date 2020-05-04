import React from 'react';

const Grid = ({clickOnCell, grid}) => {

    return (
        <div className="grid">
            {grid.map((row,i)=>{
                return <div key={i} className="row">{row.map((cell,k)=> (<div key={k} onClick={()=>clickOnCell(i,k)} className="cell">{cell}</div>))}</div>
            })}
        </div>
    )
}

export default Grid