import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import car from "./images/angryeyes.png"
import enemcar from './images/angryeyesenem.png'
import arrow from "./images/left-arrow.png"
import money from './images/money.png'
export class Entity{
    constructor(value, mappy, connections){
        this.value = value
        this.connections = connections
        this.map = mappy
        this.location = []
        this.neighbors = []
        this.points = 0
        
       
    
    }
    get_neighbors(){
     
        this.neighbors = []
        this.neighbors.push([this.map[this.location[0] + 1][this.location[1]], `${this.location[0] + 1},${this.location[1]}`])
        this.neighbors.push([this.map[this.location[0] - 1][this.location[1]], `${this.location[0] - 1},${this.location[1]}`])
        this.neighbors.push([this.map[this.location[0]][this.location[1] + 1], `${this.location[0]},${this.location[1] + 1}`])
        this.neighbors.push([this.map[this.location[0]][this.location[1] - 1], `${this.location[0]},${this.location[1] - 1}`])
    }
    playerCheck(x,y,map){
        
        if (map[x][y] == "P"){
            return(car)
        }
        
        else if (map[x][y]=="X"){
            return("rgb(63, 39, 100)")
        }
        else if (map[x][y]=="W"){
            return(enemcar)
        }
        else if (map[x][y]=="$"){
            return(money)
        }
    }

    imageOrNot(x, y){
        if(this.map[x][y] == "P" || this.map[x][y] == "$" || this.map[x][y] == "W"){
            return(
                <img
                 src = {this.playerCheck(x,y,this.map)}
                 style={{width:20, height: 20, border: "solid 1px rgb(247, 229, 243)"
                 }} 
                 />
            )}
        else{
            return(
                <div
                style={{width:20, height: 20, backgroundColor: this.playerCheck(x, y, this.map), border: "solid 1px rgb(247, 229, 243)"
                }} 
                />

            )
        }
        
    }
    Map(){
        if (this.value == "P"){
          
        return(
             <div  style = {{
                 display: "grid",
                 gridTemplateColumns: `repeat(${20}, 20px)`,
                 boxShadow: "0 0 2px rgb(236, 203, 234), 0 0 10px rgb(223, 193, 223), 0 0 2px rgb(253, 168, 236), 0 0 2px rgb(253, 168, 236), 0 0 2px rgb(253, 168, 236), 0 0 2px rgb(253, 168, 236), 0 0 2px rgb(253, 168, 236)"
             }}>
                {this.map.map((x,i)=>
                x.map((y,k) => (
                this.imageOrNot(i,k)
                 ))
                )}
            </div>
        )
         }
        }
    move (elem, enem, userInput){
        
        this.get_neighbors()
        function list(iterable) {
            return [...iterable];  
          }
        let directions = {
            "w":    this.neighbors[1][0],
            "s":    this.neighbors[0][0],
            "d":    this.neighbors[2][0],
            "a":    this.neighbors[3][0],
            "path": "path"
        }
        let info = [0,1]
        if (elem.value === "P"){ 
           
            let dir = userInput
            info[0] = dir
           
           
            }
        else if(elem.value == "W"){
            let queue = [[`${elem.location[0]},${elem.location[1]}`]]
            let visited = []
            while (queue.length > 0){
                let path = queue.shift()
                info[1] = path
                let location = path[path.length -1]
                if (location == `${enem.location[0]},${enem.location[1]}`){
                    break
                }
                else if(!(visited.includes(location))){
                    for (const neighbor of this.connections[location]){
                       let new_path = list(path)
                        new_path.push(`${neighbor[0]},${neighbor[1]}`)
                        queue.push(new_path)
                    }
                    visited.push(location)
                }

                }  
            
            
            let  choices = ["w","s","d","a","path","path","path","path","path","path","path"]
            const random = Math.floor(Math.random() * choices.length);
            info[0] = choices[random]
            console.log(info[1])
        }
       
        if (directions[info[0]] != "X"){
            if (info[0] =="path"){
                info[1].shift(0)
                let to_find = info[1][0]
                for (let i = 0; i < this.neighbors.length; i ++){
                   
                    if (this.neighbors[i][1] == to_find){
                        if (i == 0){
                            info[0] = "s"
                        }
                        if (i == 1){
                            info[0] = "w"
                        }
                        if (i == 2){
                            info[0] = "d"
                        }
                        if (i == 3){
                            info[0] = "a"
                        }
                    }}}

            if (info[0] == "w"){
                
                this.location[0] -= 1 
                this.map[this.location[0] + 1][this.location[1]] = "."
            }
            if (info[0] == "s"){
                this.location[0] += 1
                this.map [this.location[0] - 1][this.location[1]] = "."
            }
            if (info[0] == "d"){
                this.location[1] += 1
                this.map[this.location[0]] [this.location[1] - 1] = "."
            }
            if (info[0]== "a"){
                this.location[1] -= 1
                this.map[this.location[0]][this.location[1] + 1] = "."
            }
           }

    

            if (elem.value == "P"){
                if(this.map [this.location[0]][this.location[1]] == "$"){
                    this.points += 1
                }
                }
            this.map[this.location[0]][this.location[1]] = elem.value
            console.log(this.map)
            this.get_neighbors()
            
           
    }


    }

   