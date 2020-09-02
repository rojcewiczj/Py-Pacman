import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';
import logo from './logo.svg';
import './App.css';

const numRows = 20;
const numCols = 20;


function App() {
  const [grid, setGrid] = useState(()=> {
    const rows = [];
    for (let i=0; i < numRows; i++){
      rows.push(Array.from(Array(numCols), ()=> 0));
    }
    return rows
  });
 const connections = {}
 for(let x = 0; x < grid.length; x ++){
   for(let y = 0; y < grid[x].length; y++){
      connections[`${x}, ${y}`] = []
      if((x + 1) < 20){
      connections[`${x}, ${y}`].push([x + 1,  y])
      }
       if((x - 1) > 0){
      connections[`${x}, ${y}`].push([x - 1 , y])
       }
       if((y +1) < 20){
      connections[`${x}, ${y}`].push([x , y + 1])
       }
       if((y -1) > 0){
      connections[`${x}, ${y}`].push([x , y - 1])
    }
   }
 }
 console.log(grid)
 console.log(connections)
 const [running, setRunning] = useState(false);
 const runningRef = useRef(running);
 runningRef.current = running

 const runGame = useCallback(()=> {
   if (!runningRef.current) {
     return;
   }
   setTimeout(runGame, 1000);
 }, [])

  return (
    <>
    <button onClick={()=>{
      setRunning(!running);
    }}
    >
      {running ? "stop": "start"}</button>
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numCols}, 20px)`
    }}>
     {grid.map((rows, i) => rows.map((col, k) =>( 
     <div 
     keys={`${i}-${k}`} 
     onClick = {()=> {
       const newGrid = produce(grid, gridCopy => {
         gridCopy[i][k] = grid[i][k] ? 0 : 1 ;
       })
     setGrid(newGrid)
     }}
     style={{
       width:20, 
       height: 20, 
       backgroundColor: grid[i][k] ? "pink" : undefined,
       border: "solid 1px black"}} />
     ))
     )}
    </div>
    </>
  );
}

export default App;
