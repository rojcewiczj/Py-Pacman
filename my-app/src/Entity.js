import React from "react";


export class Entity{
    constructor(value, mappy, connections, userInput){
        this.value = value
        this.connections = connections
        this.map = mappy
        this.state = {
            map : this.map
        }
        this.location = []
        this.neighbors = []
        this.points = 0
        this.userInput = userInput
    
    }
    get_neighbors(){
        this.neighbors = []
        this.neighbors.push([this.map[this.location[0] + 1][this.location[1]], `${this.location[0] + 1},${this.location[1]}`])
        this.neighbors.push([this.map[this.location[0] - 1][this.location[1]], `${this.location[0] - 1},${this.location[1]}`])
        this.neighbors.push([this.map[this.location[0]][this.location[1] + 1], `${this.location[0]},${this.location[1] + 1}`])
        this.neighbors.push([this.map[this.location[0]][this.location[1] - 1], `${this.location[0]},${this.location[1] - 1}`])
    }
    move (elem, enem){
        
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
            console.log(elem.value)
            let dir = this.userInput
            console.log(this.userInput)
            info[0] = dir
            console.log(dir)
            console.log(this.location)
            }
        else if(elem.value == "W"){
            let queue = [[`${elem.location[0]},${elem.location[1]}`]]
            let visited = []
            while (queue.length > 0){
                let path = queue.shift()
                info[1] = path
                let location = path[path.length -1]
                if (location == `${enem.location[0]},${enem.location[1]}`){
                    console.log("found")
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
            
            console.log(info[1])
            let  choices = ["w","s","d","a","path","path","path","path","path","path","path"]
            const random = Math.floor(Math.random() * choices.length);
            info[0] = choices[random]
            
        }
       
        if (directions[info[0]] != "X"){
            console.log(info[0])
            if (info[0] =="path"){
                info[1].shift(0)
                let to_find = info[1][0]
                console.log(to_find)
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
                    }}console.log(info[0])}

            if (info[0] == "w"){
                console.log(info[0])
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
                console.log(this.location)
                if(this.map [this.location[0]][this.location[1]] == "$"){
                    this.points += 1
                }
                }
            this.map[this.location[0]][this.location[1]] = elem.value
            this.map = this.map
            this.get_neighbors()
           
            
    }
  
    render_map(){
        
        return(
            <table>
            {
              this.map.map((row, index) => (
                <tr key={`${row[0]}, ${index}`}>
                  {row.map(cellId => <th key={cellId}>{cellId}</th>)}
                </tr>
              ))
            }
          </table>
        )
    }
        }

   