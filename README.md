# Py-Pacman
Pacman style python game

---- update as of Sept 9th 2020:
you can now play my game at https://py-pacman-javascript.vercel.app/


This was a solo project I did for myself, to see how well I understood 2-D arrays, classes, pathfinding algorithms and many more powerful and fundamental tools of programming!
I used very few outside references for design or implementation, so what you see is essentially from my own thinking. 
After developing the logic and functionality, I turned towards recreating the functionality of the game in React. This required
translating all my Python code to Javascript, as well as implementing a system to update state and trigger rerendering.

Just to high light a few interesting solution I came up with to get this project working....

Here I have a class for rerendering the map every second and moving all enemy entities towards the player. I did this my retooling a javascript component initially designed to rerender a clock as the hands change position. 

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

      }
Below you can see where I defined the paramenters of my "map" using a matrix, and then created a adajency dictionary so that my map could be traversed using
graph traversal techniques.
        
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


Below is the "Entity" class which I used to define how my enemies and player entities would be able traverse the map. This includes the enemies ability to search and move towards the player and the rules regarding avoiding obstacles.

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
