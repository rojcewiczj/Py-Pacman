import React from "react"

export class Matrix{
    constructor(){
        this.arrays = []
        this.connections = {}
        this.points = 0
    }
  
    generate(){
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
          this.arrays.push(row)
    }}
    
    gen_connections(){
        for (let x = 0; x < this.arrays.length ; x ++){
            for(let y  = 0; y < this.arrays[x].length ; y ++){
              if (this.is_not_ex(x, y)){
                this.connections[`${x},${y}`] = []
                if(this.is_not_ex(x +1, y)){
                  this.connections[`${x},${y}`].push([x + 1,  y])
                }
                if (this.is_not_ex(x -1, y)){
                  this.connections[`${x},${y}`].push([x - 1 , y])
                }
                if (this.is_not_ex(x , y + 1)){
                  this.connections[`${x},${y}`].push([x  , y + 1])
                }
                if (this.is_not_ex(x, y - 1)){
                  this.connections[`${x},${y}`].push([x , y - 1])
                }
          
              }
            }
          }
    }
   is_not_ex(x, y){
        if (this.arrays[x][y] != "X"){
          return true
        }
        else{
          return false
      }}

    insert(x, y, elem){
        this.arrays[x][y] = elem.value
        elem.location = [x, y]
      }
 

}