import React, {useState, useCallback, useREntity} from 'react';
import produce from 'immer';
import logo from './logo.svg';
import './App.css';
import {Entity} from "./Entity"




function App() {

const grid = []
const [userInput, setInput] = useState("")
for(let i = 0; i < 20; i++){
  const row = []
  if(i == 0 || i == 19) {
    for(let j = 0; j < 20; j++){
      row.push("X")
  }}
  else{
    for(let j = 0; j < 20; j++){
      row.push(".")
  }}
row[0] = "X"
row[row.length -1] = "X"
grid.push(row)
}

function is_not_ex(x, y){
  if (grid[x][y] != "X"){
    return true
  }
  else{
    return false
}}

function insert(x, y, elem){
  grid[x][y] = elem.value
  elem.location = [x, y]
}
const connections = {}
  for (let x = 0; x < grid.length ; x ++){
    for(let y  = 0; y < grid[x].length ; y ++){
      if (is_not_ex(x, y)){
        connections[`${x},${y}`] = []
        if(is_not_ex(x +1, y)){
          connections[`${x},${y}`].push([x + 1,  y])
        }
        if (is_not_ex(x -1, y)){
          connections[`${x},${y}`].push([x - 1 , y])
        }
        if (is_not_ex(x , y + 1)){
          connections[`${x},${y}`].push([x  , y + 1])
        }
        if (is_not_ex(x, y - 1)){
          connections[`${x},${y}`].push([x , y - 1])
        }
  
      }
    }
  }
const elem = new Entity("P", grid, connections, userInput)
const enem = new Entity("W", grid, connections, userInput)
const enem1 = new Entity("W", grid, connections, userInput)
const enem2 = new Entity("W", grid, connections, userInput)
const enem3 = new Entity("W", grid, connections, userInput)
const money = new Entity("$", grid, connections, userInput)
const ex = new Entity("X", grid, connections)
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

function runFunctions(string){
  setInput(string)
  elem.move(elem, enem)
  enem.move(enem, elem)
  setInput(string)
  console.log(elem.map)
}


return(
  <div>
  <button onClick ={()=>{runFunctions("w")}}>
  W
  </button>
  <button onClick ={()=>{runFunctions("s")}}>
  S
  </button>
  <button onClick ={()=>{runFunctions("d")}}>
  D
  </button>
  <button onClick ={()=>{runFunctions("a")}}>
  A
  </button>
 
</div>
);
  
}

export default App;
