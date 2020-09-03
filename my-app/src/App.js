import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';
import logo from './logo.svg';
import './App.css';
import {Ef} from './Ef'

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
  const [userInput, setInput] = useState("")

 const points = 0
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
 function insert(x,y,value){
   grid[x][y] = value.value
   value.location = [x,y]
 }
 const elem = new Ef("F", grid, connections,userInput)
 const enem = new Ef("W", grid, connections, userInput)
 const enem1 = new Ef("W", grid, connections, userInput)
 const enem2 = new Ef("W", grid, connections, userInput)
 const enem3 = new Ef("W", grid, connections, userInput)
 const money = new Ef("$", grid, connections, userInput)
 const ex = new Ef("X", grid, connections, userInput)
insert(1,2, elem)
insert(3,3, ex)
insert(7,4, ex)
insert(2,7, ex)
insert(3,9, ex)
insert(9,13, ex)
insert(13,18, ex)
insert(11,16, ex)
insert(15,5, ex)
insert(17,2, ex)
insert(14,6, ex)
insert(17,9, ex)
insert(4,5, enem)
insert(2,3, enem1)
insert(5,6, enem2)
insert(15,16, enem3)
insert(4,5, money)
insert(2,6, money)
insert(5,8, money)
insert(8,1, money)
insert(15,5, money)
insert(12,11, money)
insert(11,18, money)
insert(16,3, money)
insert(6,13, money)
insert(9,9, money)
insert(17,12, money)
 
 elem.get_neighbors()

 console.log(grid)
 console.log(connections)
 const [running, setRunning] = useState(false);
 const runningRef = useRef(running);
 runningRef.current = running

 const runGame = useCallback(()=> {
   if (!runningRef.current) {
     return;
   }
   elem.move(elem, enem)
   enem.move(enem, elem)
   enem1.move(enem1, elem)
   enem2.move(enem2, elem)
   enem3.move(enem3, elem)
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
