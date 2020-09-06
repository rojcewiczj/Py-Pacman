import React, {useState, useCallback, useREntity, useEffect} from 'react';
import produce from 'immer';
import logo from './logo.svg';
import './App.css';
import {Entity} from "./Entity"
import {Matrix} from "./matrix"



function App() {
const grid = new Matrix()
grid.generate()
grid.gen_connections()
const [userInput, setInput] = useState("")
const [new_map, set_new_map] = useState([])
  
const elem = new Entity("P", grid.arrays, grid.connections, userInput)
const enem = new Entity("W", grid.arrays, grid.connections, userInput)
const enem1 = new Entity("W", grid.arrays, grid.connections, userInput)
const enem2 = new Entity("W", grid.arrays, grid.connections, userInput)
const enem3 = new Entity("W", grid.arrays, grid.connections, userInput)
const money = new Entity("$", grid.arrays, grid.connections, userInput)
const ex = new Entity("X", grid.arrays, grid.connections)
grid.insert(1,2, elem)
grid.insert(3,3, ex)
grid.insert(7,4, ex)
grid.insert(2,7, ex)
grid.insert(3,9, ex)
grid.insert(9,13, ex)
grid.insert(13,18, ex)
grid.insert(11,16, ex)
grid.insert(15,5, ex)
grid.insert(17,2, ex)
grid.insert(14,6, ex)
grid.insert(17,9, ex)
grid.insert(4,5, enem)
grid.insert(2,3, enem1)
grid.insert(5,6, enem2)
grid.insert(15,16, enem3)
grid.insert(4,5, money)
grid.insert(2,6, money)
grid.insert(5,8, money)
grid.insert(8,1, money)
grid.insert(15,5, money)
grid.insert(12,11, money)
grid.insert(11,18, money)
grid.insert(16,3, money)
grid.insert(6,13, money)
grid.insert(9,9, money)
grid.insert(17,12, money)

elem.get_neighbors()

function runFunctions(string){
  setInput(string)
  elem.move(elem, enem)
  enem.move(enem, elem)
  enem1.move(enem1, elem)
  enem2.move(enem2, elem)
  enem3.move(enem3, elem)
  
  setInput(string)
set_new_map(elem.render_map())
}


console.log(new_map)
return(
  <div>
  {new_map}
  <button onClick ={()=>{runFunctions("w")}}>
  UP
  </button>
  <button onClick ={()=>{runFunctions("s")}}>
  DOWN
  </button>
  <button onClick ={()=>{runFunctions("d")}}>
  RIGHT
  </button>
  <button onClick ={()=>{runFunctions("a")}}>
  LEFT
  </button>
 
</div>
);
  
}

export default App;
