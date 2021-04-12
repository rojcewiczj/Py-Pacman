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
        
