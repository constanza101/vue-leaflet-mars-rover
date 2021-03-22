# vue-leaflet-mars-rover
Moving a rover in mars using Vue, Vuetlify and Leaflet for vue2

Use the app on the following link: 
https://constanza101.github.io/vue-leaflet-mars-rover/


vue2-leaflet source and installation:
https://vue2-leaflet.netlify.app/

## *Mars Rover Mission*
Your Task:
You’re part of the team that explores Mars by sending remotely controlled vehicles to the surface of the planet. Develop a software that translates the commands sent from earth to instructions that are understood by the rover. 
### *Requirements*
* ● You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing. 
* ● The rover receives a collection of commands. (E.g.) FFRRFFFRL 
* ● The rover can move forward (f). 
* ● The rover can move left/right (l,r). 
* ● Suppose we are on a really weird planet that is square. 200x200 for example :) 
* ● Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point, aborts the sequence and reports the obstacle. 


## Install

    $ git clone https://github.com/constanza101/vue-leaflet-mars-rover.git
    $ cd vue-leaflet-mars-rover
    $ npm install
    
    
## Start & watch

    $ npm run serve

## Simple build for production

    $ npm run build

## Description of the project: 

This front-end project is developed in VUE.js, using Vuetify for styling and leaflet for Vue for a geolocalization of the rover.


**1. MAP:**

        - It is a squared map with a squeared "obstacle" randomly placed.
        - It is required that the rover can stop and let the user know that they have reached a boundary or the obstacle.
        - If the user bumps into the obstacle, a dialog will be displayed. 
        - If it finds a boundary you will see the same component with different text. 
        - I have used this dialog as an oportunity to make a *reusable component* to make the excercise more interesting.
        
**2. Instructions and directions:**

        - The instructions and directions panel is placed on the right hand side in big screens and it is hidden in small screens.
        - On smaller screens you can see them by clicking a button, and it will turn up as a bottom bar.
        - There is a text input where the user can type the indicated letters to make the movements when clicking the rocket button.
        - If the user types other characters, they will be ignored.
        - If the rover is moving, the button is disabled.


 **3. Bonus: real time localization**
 
         - There is a localization panel that lets the user know where the rover is located all the time and which side it is facing.

**Thank you for trying out my Mars-rover app, you can see more VUE.js apps on my profile :)**



