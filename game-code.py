import random
import curses






class Ef:
    def __init__(self, value, mappy, map_object):
        self.value = value
        self.map_object = map_object
        self.map = mappy
        self.location = []
        self.neighbors = []
    def get_neighbors(self):
        self.neighbors = []
        self.neighbors.append([self.map[self.location[0] + 1][self.location[1]], f"{self.location[0]+1},{self.location[1]}"])
        self.neighbors.append([self.map[self.location[0] -1 ][self.location[1]],f"{self.location[0]-1},{self.location[1]}"])
        self.neighbors.append([self.map[self.location[0]][self.location[1] + 1],f"{self.location[0]},{self.location[1]+ 1}"])
        self.neighbors.append([self.map[self.location[0]][self.location[1] - 1],f"{self.location[0]},{self.location[1]-1}"])

    def move(self, elem, enem):
        self.get_neighbors()
        directions = {
            "w": self.neighbors[1][0],
            "s": self.neighbors[0][0],
            "d": self.neighbors[2][0],
            "a": self.neighbors[3][0],
            "path": "path"
        }
        
        if elem.value == "F":
            dir = input("enter a direction :")
            if dir not in directions:
                dir = input("enter a direction :")
               
        elif elem.value == "W":
            queue = [[f"{elem.location[0]},{elem.location[1]}"]]
            visited = []
            while queue:
                path = queue.pop(0)
                location = path[-1]
                if location == f"{enem.location[0]},{enem.location[1]}":
                    break
                elif location not in visited:
                    for neighbor in self.map_object.dict[location]:
                        new_path = list(path)
                        new_path.append(f"{neighbor[0]},{neighbor[1]}")
                        queue.append(new_path)
                    
                    visited.append(location)

            choices = ["w","s","d","a","path","path","path","path","path","path","path"]
            choice = random.choice(choices)
            dir = choice

        if directions[dir] != "X":
            if dir =="path":
                path.pop(0)
                to_find = path[0]
                for i in range(len(self.neighbors)):     
                    if self.neighbors[i][1] == to_find:
                     
                        if i == 0:
                            dir = "s"
                        if i == 1:
                            dir = "w"
                        if i == 2:
                            dir = "d"
                        if i == 3:
                            dir = "a"

            if dir  == "w":
                self.location[0] -= 1 
                self.map[self.location[0] + 1][self.location[1]] = "."
            if dir == "s":
                self.location[0] += 1
                self.map[self.location[0] - 1][self.location[1]] = "."
            if dir == "d":
                self.location[1] += 1
                self.map[self.location[0]][self.location[1] - 1] = "."
            if dir == "a":   
                self.location[1] -= 1
                self.map[self.location[0]][self.location[1] + 1] = "."
           

    

            if elem.value == "F":
                if self.map[self.location[0]][self.location[1]] == "$":
                    self.map_object.points += 1
            self.map[self.location[0]][self.location[1]] = elem.value
            self.get_neighbors()

            

        
        

class matrix:
    def __init__(self):
        self.arrays = []
        self.dict = {}
        self.points = 0
    def generate(self):
        for i in range(21):
            if i == 0 or i == 20:
                self.arrays.append(["X"] * 20)
            else:
                self.arrays.append(["."] * 20)
                self.arrays[i][0] = "X"
                self.arrays[i][-1] = "X"
    def is_not_ex(self, x, y):
        if self.arrays[x][y] != "X":
            return True
        else:
            return False
        
    def adaj_dict_gen(self):
    
        for x in range(len(self.arrays)):
            for y in range(len(self.arrays[x])):
                if self.is_not_ex(x, y):
                    self.dict[f"{x},{y}"] = []
                    if self.is_not_ex(x +1, y):
                        self.dict[f"{x},{y}"].append([x + 1,  y])
                    if self.is_not_ex(x -1, y):
                        self.dict[f"{x},{y}"].append([x - 1 , y])
                    if self.is_not_ex(x, y + 1):
                        self.dict[f"{x},{y}"].append([x , y + 1])
                    if self.is_not_ex(x, y - 1):
                        self.dict[f"{x},{y}"].append([x , y - 1])

    def print_map(self):
        for row in self.arrays:
            print(row)
    def insert(self, x,y,value):
        self.arrays[x][y] = value.value
        value.location = [x, y]
    
                


scores = []
running = False
main_options = ["Play", "Scoreboard"]
back_options = ["Back To Menu!", "Play Again!"]


def main_menu():
    
    map = matrix()
    map.generate()
    map.adaj_dict_gen()
    elem = Ef("F", map.arrays, map)
    enem = Ef("W", map.arrays, map)
    enem1 = Ef("W", map.arrays, map)
    enem2 = Ef("W", map.arrays, map)
    enem3 = Ef("W", map.arrays, map)
    money = Ef("$", map.arrays, map)
    ex = Ef("X", map.arrays, map)
    map.insert(1,2, elem)
    map.insert(3,3, ex)
    map.insert(7,4, ex)
    map.insert(2,7, ex)
    map.insert(3,9, ex)
    map.insert(9,13, ex)
    map.insert(13,18, ex)
    map.insert(11,16, ex)
    map.insert(15,5, ex)
    map.insert(17,2, ex)
    map.insert(14,6, ex)
    map.insert(17,9, ex)
    map.adaj_dict_gen()
    map.insert(4,5, enem)
    map.insert(2,3, enem1)
    map.insert(5,6, enem2)
    map.insert(15,16, enem3)
    map.insert(4,5, money)
    map.insert(2,6, money)
    map.insert(5,8, money)
    map.insert(8,1, money)
    map.insert(15,5, money)
    map.insert(12,11, money)
    map.insert(11,18, money)
    map.insert(16,3, money)
    map.insert(6,13, money)
    map.insert(9,9, money)
    map.insert(17,12, money)
    elem.get_neighbors()
    for options in main_options:
        print(options)
    main_choice =input("To play the game type 'p' and press enter.....To check the Scoreboard type 's' and press enter:")
    if main_choice == 'p':
        running = True
        print(map.print_map())
        while running:
            elem.move(elem, enem)
            enem.move(enem, elem)
            enem1.move(enem1, elem)
            enem2.move(enem2, elem)
            enem3.move(enem3, elem    )
            for row in map.arrays:
                print(row)
            print("TOTAL POINTS: ", map.points)
            if map.arrays[elem.location[0]][elem.location[1]] == "W":
                scores.append(map.points)
                map.points = 0
                if len(scores) > 10:
                    scores.pop(0)
                running = False
                print("YOU HAVE BEEN CONSUMED!")  
                main_menu()
    elif main_choice == 's':
        for score in scores:
            print(score)
        main_menu()


main_menu()



                
           
