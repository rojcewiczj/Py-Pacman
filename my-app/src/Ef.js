import React from 'react'

export class Ef{
    constructor (value, mappy, dict, userInput){
        this.value = value
        this.dict= dict
        this.map = mappy
        this.userInput = userInput
        this.location = []
        this.neighbors = []
    }
     get_neighbors(){
        this.neighbors = []
        this.neighbors.push([this.map[this.location[0] + 1][this.location[1]], `${this.location[0]+1},${this.location[1]}`])
        this.neighbors.push([this.map[this.location[0] -1 ][this.location[1]],`${this.location[0]-1},${this.location[1]}`])
        this.neighbors.push([this.map[this.location[0]][this.location[1] + 1],`${this.location[0]},${this.location[1]+ 1}`])
        this.neighbors.push([this.map[this.location[0]][this.location[1] - 1],`${this.location[0]},${this.location[1]-1}`])
     }
    move(elem, enem){
        function list(iterable) {
            return [...iterable];  
          }
        this.get_neighbors()
        let directions = {
            "w": this.neighbors[1][0],
            "s": this.neighbors[0][0],
            "d": this.neighbors[2][0],
            "a": this.neighbors[3][0],
            "path": "path"
        }
        let dir = ""
        let path = []
        if (elem.value == "P"){
            let dir = this.userInput
            if (!(dir in directions)){
                let dir = this.userInput
            }
        }
        else if (elem.value == "W"){
            let queue = [[`${elem.location[0]},${elem.location[1]}`]]
            let visited = []
            while (queue.length > 0){
                let path = queue.pop(0)
                let location = path[-1]
                if (location == `${enem.location[0]},${enem.location[1]}`){
                    break
                }

                else if (!(location in visited)){
                    for (const neighbor in this.dict[location]){
                        let new_path = list(path)
                        new_path.push(`${neighbor[0]},${neighbor[1]}`)
                        queue.push(new_path)
                    }
                    visited.push(location)
                }
                }
            let choices = ["w","s","d","a","path","path","path","path","path","path","path"]
            const random = Math.floor(Math.random() * choices.length);
            let dir = choices[random]
        }
        if (directions[dir] != "X"){
            if (dir =="path"){
                path.pop(0)
                let to_find = path[0]
                for(let i = 0; i < this.neighbors.length; i++){     
                    if (this.neighbors[i][1] == to_find){
                        if (i == 0){
                            dir = "s"
                        }
                        if (i == 1){
                            dir = "w"
                        }
                        if (i == 2){
                            dir = "d"
                        }
                        if (i == 3){
                            dir = "a"
                        }
                        
                        }}}}

            if (dir  == "w"){
                this.location[0] -= 1 
                this.map[this.location[0] + 1][this.location[1]] = "."
            }
            if (dir == "s"){
                this.location[0] += 1
                this.map[this.location[0] - 1][this.location[1]] = "."
            }
            if (dir == "d"){
                this.location[1] += 1
                this.map[this.location[0]][this.location[1] - 1] = "."
            }
            if (dir == "a"){
                this.location[1] -= 1
                this.map[this.location[0]][this.location[1] + 1] = "."
            }
           

    

            if (elem.value == "P"){
                if (this.map[this.location[0]][this.location[1]] == "$"){
                    this.points += 1
                }}
            this.map[this.location[0]][this.location[1]] = elem.value
            this.get_neighbors()
        }
}

