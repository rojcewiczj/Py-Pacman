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
{
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
  
