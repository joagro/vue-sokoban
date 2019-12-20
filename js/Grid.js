import Tile from './Tile.js'
import Powerup from './Powerup.js'
import { levels } from './levels.js'

export default {
    components: {
        Tile,
        Powerup,
    },
    template: `<div>

            <powerup
            v-on:respondToPowerUp="powerUpHandler($event)" 
            v-bind:drills="drills"
            v-bind:bombs="bombs"
            v-bind:strengths="strengths"
            />        
            <div 
            v-bind:class="{
                'grid-layout-9': is9Long, 
                'grid-layout-8': is8Long, 
                'grid-layout-7': is7Long, 
                'grid-layout-5': is5Long,}"
            >
            <tile
            v-on:respondToClick="clickHandler($event)"
            
            v-bind:avatarPosY="avatarPosY"
            v-bind:avatarPosX="avatarPosX"


            v-bind:listOfBoxes="listOfBoxes"
            v-bind:listOfParkingLots="listOfParkingLots"
            v-bind:listOfWalls="listOfWalls"

            v-for="tile in flatTiles"
            v-bind:position="tile"
            v-bind:key="'tile' + tile.x + tile.y"
            />
            </div>
        </div>
    
    `,

    data() {
        return {
            tiles: [],

            avatarPosY: 1,
            avatarPosX: 1,

            listOfBoxes: [],
            listOfParkingLots: [],
            listOfWalls: [],
            currentlevel: 0,
            listOfLevels: levels,

            //powerups
            drills: 1,
            bombs: 1,
            strengths: 1,
            drillActive: 0,
            bombActive: 0,
            strengthActive: 0,


        }
    },
    computed: {

        lastLevel: function() {

            return this.listOfLevels.length
        },

        levelMap: function() {

            //TODO remake this using a watcher????

            if (this.currentlevel == this.listOfLevels.length){

                return this.listOfLevels[this.currentlevel -1]

            }else{
                return this.listOfLevels[this.currentlevel]
            }
        },

        is9Long: function(){

            if (this.levelMap[0].length == 9) {
                return true
            }else{
                return false
            }
        },

        is8Long: function(){

            if (this.levelMap[0].length == 8) {
                return true
            }else{
                return false
            }
        },

        is7Long: function(){

            if (this.levelMap[0].length == 7) {
                return true
            }else{
                return false
            }
        },

        is5Long: function(){

            if (this.levelMap[0].length == 5) {
                return true
            }else{
                return false
            }
        },

        gridRows: function(){
            return this.levelMap.length
        },

        gridColumns: function(){
            return this.levelMap[0].length
        },

        flatTiles() {
            return this.tiles.flat()
        },
    },

    watch: {

        listOfBoxes: {

            /* This watcher keeps an eye of when a box is moved, 
            for the reason of keeping track of how many of the level's
            boxes that are placed on parking lots, 
            when all boxes are on parking lots, the next level is loaded
            if it is the final level, it is reloaded*/
            deep: true,

            handler(){
                
                this.points = this.score()

                this.targetPoints = this.listOfBoxes.length

                if(this.points == this.targetPoints){

                    if (this.currentlevel < this.lastLevel) {
                        this.currentlevel++
                        this.levelMap= levels[this.currentlevel]
                        this.drawLevel()
                        this.createTiles()
                        //console.log("Level cleared!")
                    }else{
                        this.currentlevel
                        //console.log("replaying final level")
                    }
                }
            }
        },
    },
    methods: {
        powerUpHandler: function(args){

            this.args = args

            switch(this.args.special) {
                case "bomb":
                    this.bombActive = true
                    this.drillActive = false
                    this.strengthActive = false
                    break
                case "drill":
                    this.bombActive = false
                    this.drillActive = true
                    this.strengthActive = false
                    break
                case "strength":
                    this.bombActive = false
                    this.drillActive = false
                    this.strengthActive = true
                    break
            }
        },
        removeWall: function(row, col){
            this.row = row
            this.col = col

            for (this.i = 0; this.i < this.listOfWalls.length ; this.i++){

                if(this.listOfWalls[this.i][0] === this.row && this.listOfWalls[this.i][1] === this.col){

                    this.listOfWalls.splice(this.i, 1)
                    return true
                }
            }
        },
        removeBox: function(row, col){
            this.row = row
            this.col = col

            for (this.i = 0; this.i < this.listOfBoxes.length ; this.i++){

                if(this.listOfBoxes[this.i][0] === this.row && this.listOfBoxes[this.i][1] === this.col){

                    this.listOfBoxes.splice(this.i, 1)
                    return true
                }
            }
        },
        drawLevel: function(){

            /*loops through the 2D list corresponding to the game board and then adds the each tile to it's corresponding list.

            */

            this.listOfWalls = []

            this.listOfBoxes = []

            this.listOfParkingLots = []
            
            for(this.row = 0; this.row < this.levelMap.length; this.row++){
                
                for(this.col = 0; this.col < this.levelMap[this.row].length;this.col++){

                    if(this.levelMap[this.row][this.col] === "W"){

                        this.listOfWalls.push([this.row, this.col])
                    
                    }else if(this.levelMap[this.row][this.col] === "B"){
                        this.listOfBoxes.push([this.row, this.col])

                    }else if(this.levelMap[this.row][this.col] === "P"){
                        this.listOfParkingLots.push([this.row, this.col])

                    }else if(this.levelMap[this.row][this.col] === "H"){
                        this.avatarPosY = this.row
                        this.avatarPosX = this.col

                    }
                }
            }
        },
        score: function(){

            //this function calculates how many boxes there are that are placed into parking lots.

            this.currentScore = 0

            let i = 0

            let j = 0

            for (this.i = 0; this.i < this.listOfBoxes.length ; this.i++) {

                for (this.j = 0; this.j < this.listOfParkingLots.length ; this.j++) {

                    if(this.listOfBoxes[this.i][0] == this.listOfParkingLots[this.j][0] && this.listOfBoxes[this.i][1] == this.listOfParkingLots[this.j][1]){

                        this.currentScore++
                    }
                }
            }
            return this.currentScore
        },
        moveBoxTo: function (originY, originX, destinationY, destinationX){

            this.originY = originY
            this.originX = originX
            this.destinationY = destinationY
            this.destinationX = destinationX

            for (this.i = 0; this.i < this.listOfBoxes.length ; this.i++){

                if(this.listOfBoxes[this.i][0] === this.originY && this.listOfBoxes[this.i][1] === this.originX){

                    this.$set(this.listOfBoxes, this.i, [this.destinationY, this.destinationX])
                }
            }

        },
        checkIfBetween: function(value, lowerLimit, upperLimit){

            this.value = value
            this.lowerLimit = lowerLimit
            this.upperLimit = upperLimit

            if (this.value >= this.lowerLimit && this.upperLimit > this.value){
                return true

            }else{
                return false
            }
        },
        isBox: function(posY, posX) {

            this.posY = posY
            this.posX = posX

            for (this.i = 0; this.i < this.listOfBoxes.length ; this.i++){

                if(this.listOfBoxes[this.i][0] === this.posY && this.listOfBoxes[this.i][1] === this.posX){
                    return true
                }
            }
            return false
        },

        isWall: function(posY, posX) {

            this.posY = posY
            this.posX = posX

            for (this.i = 0; this.i < this.listOfWalls.length ; this.i++){

                if(this.listOfWalls[this.i][0] === this.posY && this.listOfWalls[this.i][1] === this.posX){
                    return true
                }
            }
            return false

        },

        isFreeSpace: function(posY, posX) {

            //free space is defined as any space  that is not a wall or a box

            this.posY = posY
            this.posX = posX

            if (this.isBox(this.posY, this.posX) == true ||
                this.isWall(this.posY, this.posX) == true){
                return false

            }else{

                return true
            }
        },

        clickHandler: function(args){

            this.args = args

            if (this.isBox(this.args.y, this.args.x) == true && this.bombActive == true){

                this.removeBox(this.args.y, this.args.x)
                this.bombActive = false
                this.bombs--

            }
            else if (this.isBox(this.args.y, this.args.x) == true){

                //deltaX and deltaY is a unit vector corresponding
                // to the move needed for the avatar
                // to move from it's position to the clicked tile

                this.deltaY = this.args.y - this.avatarPosY
                this.deltaX = this.args.x - this.avatarPosX

                /*newBoxPosY and newBoxPosX is the location coordinates
                 for the space right behind the box from the perspective
                 of the avatar
                */

                this.newBoxPosY = this.args.y + this.deltaY
                this.newBoxPosX = this.args.x + this.deltaX


                if (this.checkIfBetween(this.newBoxPosY, 0, this.gridRows) == true 
                    && this.checkIfBetween(this.newBoxPosX, 0, this.gridColumns) == true
                    && this.isFreeSpace(this.newBoxPosY, this.newBoxPosX) == true){

                        /*these conditions check if the suggested new position is not out of bounds and is a free space
                        if this is true, the box is moved and the avatar moves into it's place*/

                    this.moveBoxTo(this.args.y, this.args.x, this.newBoxPosY, this.newBoxPosX)
                    this.avatarPosY = this.args.y
                    this.avatarPosX = this.args.x

                }else if(this.strengthActive == true &&
                        this.isFreeSpace(this.newBoxPosY + this.deltaY, this.newBoxPosX+ this.deltaX) == true &&
                        this.checkIfBetween(this.newBoxPosY + this.deltaY, 0, this.gridRows) == true &&
                         this.checkIfBetween(this.newBoxPosX, + this.deltaX, this.gridColumns) == true
                        )
                        {
                    // same conditions as above, just that it checks if the potion of strength has been activated

                    this.moveBoxTo(this.newBoxPosY, this.newBoxPosX, this.newBoxPosY + this.deltaY, this.newBoxPosX + this.deltaX)
                    this.moveBoxTo(this.args.y, this.args.x, this.newBoxPosY, this.newBoxPosX)
                    this.strengths--
                    this.strengthActive == false
                    this.avatarPosY = this.args.y
                    this.avatarPosX = this.args.x

                }else{

                }
                
            }else if(this.isWall(this.args.y, this.args.x) == false){

                //since this means that the tile is just free space, move the avatar to the new position
                
                this.avatarPosY = this.args.y
                this.avatarPosX = this.args.x

            }else if(this.isWall(this.args.y, this.args.x) == true && this.drillActive == true){

                this.removeWall(this.args.y, this.args.x)
                this.drills--
                this.drillActive = false
            }

        },
        createTiles: function(){

            this.tiles = []

            for(let row = 0; row < this.gridRows; row++){
                this.tiles[row] = []
                
                for(let col = 0; col < this.gridColumns; col++){
                    let position = {
                        x: col,
                        y: row,
                    }
                    this.tiles[row].push(position)
                }
            }
        },
    },
    created() {
        this.drawLevel()
        this.createTiles()
    },
    mounted() {
    },
}