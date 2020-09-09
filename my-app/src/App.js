import React, {useState, useCallback, useREntity, useEffect} from 'react';
import produce from 'immer';
import "./App.css"
import logo from './logo.svg';
import Sketch from "react-p5";
import './App.css';
import {Entity} from "./Entity"
import {Matrix} from "./matrix"
import p5Types from "p5";
import { render } from '@testing-library/react';
import up from './images/up-arrow.png'
import down from './images/down-arrow.png'
import right from './images/right-arrow.png'
import left from './images/left-arrow.png'
import wheel from './images/steering.png'
function App() {


const grid = new Matrix()

grid.generate()
grid.gen_connections()

  
const elem = new Entity("P", grid.arrays, grid.connections)
const enem = new Entity("W", grid.arrays, grid.connections)
const enem1 = new Entity("W", grid.arrays, grid.connections)
const enem2 = new Entity("W", grid.arrays, grid.connections)
const enem3 = new Entity("W", grid.arrays, grid.connections)
const money = new Entity("$", grid.arrays, grid.connections)
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
grid.gen_connections()

let userInput = ""

elem.get_neighbors()

let running = true

function run(){
  if (running == true){
    running = false
  }
  else{
    running = true
  }
}
function startOrStop(){

  if (running == true){
    return <div onClick = { ()=> run()} className="button">
      STOP
    </div>
  }
  else{
    return (
      <div onClick = { ()=> run()} className="button">
        START
      </div>
    )
  }
}


function runFunctions(string){
  
  userInput = string
  elem.move(elem, enem, userInput) 

  
}
class Render_Map extends React.Component {
  constructor() {
    super();
    this.state = {map: elem.Map(),
    div: startOrStop()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    yarn
    this.timerID = setInterval(
      () => this.update_buttton(),
      100
    );
    
   
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    if (running == true){
    enem.move(enem, elem)
    enem1.move(enem1, elem)
    enem2.move(enem2, elem)
    enem3.move(enem3, elem)

  }
  
    this.setState({
      map: elem.Map(),
     
    });
  }
 update_buttton() {
  this.setState({
    div: startOrStop()
  });
  }
  render() {
    return (
      <div>
        <h2>{this.state.map}</h2>
        <h2>{this.state.div}</h2>
      </div>
    );
  }
}





return(
  <div className="App">
     <div className='mainDiv'>
     <div className='contentDiv'>
     <div className='map'>
    <Render_Map/>
 
    <div className='moveDiv'>
            
          
            <div className='steerTop'>
            <img src={up} onClick = { ()=> runFunctions('w')} alt='up' className='upArrow' />
            </div>
            <div className='steerMid'>
            <img src={left} onClick = { ()=> runFunctions('a')} alt='left' className='leftArrow' />
            <img src={wheel} alt='steering wheel' className='wheel' onClick = { ()=> run()} />
            <img src={right} onClick = { ()=> runFunctions('d')} alt='right' className='rightArrow' />
            </div>
            <div className='steerBot'>
            <img src={down} onClick = { ()=> runFunctions('s')} alt='down' className='downArrow' />
            </div> 
              </div>
              </div>
        </div>
        </div>
 
</div>
);
  
}

export default App;
