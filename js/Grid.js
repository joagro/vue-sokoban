import Tile from './Tile.js'
import Powerup from './Powerup.js'
import { levels } from './levels.js'

export default {
    components: {
        Tile,
        Powerup,
    }, // <h1> Avatar location: {{avatarPosY}} {{avatarPosX}} </h1>
        //            <div
        //class ="tile-div"
        //
        //> dude
        //</div>
    template: `<div>

            <powerup
            v-on:respondToPowerUp="powerUpHandler($event)" 
            v-bind:drills="drills"
            v-bind:bombs="bombs"
            v-bind:strengths="strengths"
            />        
            <div 
            v-bind:class="{'grid-layout-10': is10Long, 'grid-layout-7': is7Long, 'grid-layout-5': is5Long}"
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
            //levelMap: levels[0],

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

            //console.log("computing level map, currentlevel is: " + this.currentlevel + " and totallevels: " + this.listOfLevels.length)

            if (this.currentlevel == this.listOfLevels.length){

                return this.listOfLevels[this.currentlevel -1]

            }else{
                return this.listOfLevels[this.currentlevel]
            }
        },

        is10Long: function(){

            if (this.levelMap[0].length == 10) {
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
            //console.log("calculating grid rows: " + this.levelMap.length)
            return this.levelMap.length
        },

        gridColumns: function(){
            //console.log("calculating grid cols: " + this.levelMap[0].length)
            return this.levelMap[0].length
        },

        flatTiles() {
            return this.tiles.flat()
        },
    },

    watch: {

        listOfBoxes: {
            deep: true,

            handler(){
                //console.log("list of boxes has been updated!")
                
                this.points = this.score()

                //console.log("Current score: " + this.points)

                this.targetPoints = this.listOfBoxes.length

                if(this.points == this.targetPoints){

                    if (this.currentlevel < this.lastLevel) {
                        this.currentlevel++
                        //this.currentlevel++
                        this.levelMap= levels[this.currentlevel]
                        //console.log(this.levelMap)
                        this.drawLevel()
                        //console.log(this.listOfBoxes)
                        //console.log(this.listOfParkingLots)
                        this.createTiles()
                        console.log("Level cleared!")
                    }else{
                        this.currentlevel
                        console.log("replaying final level")
                    }

                    //this.currentlevel++
                    //this.levelMap= levels[this.currentlevel]
                    //console.log(this.levelMap)
                    //this.drawLevel()
                    //console.log(this.listOfBoxes)
                    //console.log(this.listOfParkingLots)
                    //this.createTiles()
                    //console.log("Level cleared!")

                }

            }
                //console.log("tile list has been updated")
        },
    },
    methods: {
        powerUpHandler: function(args){

            this.args = args

            switch(this.args.special) {
                case "bomb":
                    //console.log("Case1")
                    this.bombActive = true
                    this.drillActive = false
                    this.strengthActive = false
                    break
                case "drill":
                    //console.log("Case2")
                    this.bombActive = false
                    this.drillActive = true
                    this.strengthActive = false
                    break
                case "strength":
                    //console.log("Case3")
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

            this.listOfWalls = []

            this.listOfBoxes = []

            this.listOfParkingLots = []
            
            for(this.row = 0; this.row < this.levelMap.length; this.row++){
                
                for(this.col = 0; this.col < this.levelMap[this.row].length;this.col++){

                    if(this.levelMap[this.row][this.col] === "W"){

                        this.listOfWalls.push([this.row, this.col])
                    
                    }else if(this.levelMap[this.row][this.col] === "B"){
                        //console.log("box found row: " + this.row + " column: " +this.col)
                        this.listOfBoxes.push([this.row, this.col])

                    }else if(this.levelMap[this.row][this.col] === "P"){
                        //console.log("parking lot found row: " + this.row + " column: " +this.col)
                        this.listOfParkingLots.push([this.row, this.col])

                    }else if(this.levelMap[this.row][this.col] === "H"){
                        this.avatarPosY = this.row
                        this.avatarPosX = this.col

                    }
                }
            }
        },

        score: function(){

            //let winningScore = this.listOfBoxes.length

            this.currentScore = 0

            let i = 0

            let j = 0

            for (this.i = 0; this.i < this.listOfBoxes.length ; this.i++) {

                //console.log(i)

                for (this.j = 0; this.j < this.listOfParkingLots.length ; this.j++) {

                    if(this.listOfBoxes[this.i][0] == this.listOfParkingLots[this.j][0] && this.listOfBoxes[this.i][1] == this.listOfParkingLots[this.j][1]){

                        //console.log("Box parked in parking lot at: " + this.listOfParkingLots[this.j][0] + " " +this.listOfParkingLots[this.j][1])

                        this.currentScore++
                    }

                }

            }
            //console.log(this.currentScore)
            return this.currentScore

        },

        moveBoxTo: function (originY, originX, destinationY, destinationX){

            this.originY = originY
            this.originX = originX
            this.destinationY = destinationY
            this.destinationX = destinationX

            for (this.i = 0; this.i < this.listOfBoxes.length ; this.i++){

                if(this.listOfBoxes[this.i][0] === this.originY && this.listOfBoxes[this.i][1] === this.originX){
                    //console.log("found the box to move!")
                    //console.log("moving box at Y: " + this.originY + " X: " + this.originX)
                    //console.log("to destination Y: " + this.destinationY + " X: " + this.destinationX)

                    this.$set(this.listOfBoxes, this.i, [this.destinationY, this.destinationX])
                }
            }

        },

        checkIfBetween: function(value, lowerLimit, upperLimit){

            this.value = value
            this.lowerLimit = lowerLimit
            this.upperLimit = upperLimit

            if (this.value >= this.lowerLimit && this.upperLimit > this.value){
                //console.log("input value is: " + this.value + " is higher than: " + this.lowerLimit + " and less than " +this.upperLimit)
                return true
            }else{
                //console.log("input value is: " + this.value + " lower bound is: " + this.lowerLimit + " higher bound is: " +this.upperLimit)
                return false
            }

        },
        
        isBox: function(posY, posX) {

            this.posY = posY
            this.posX = posX

            for (this.i = 0; this.i < this.listOfBoxes.length ; this.i++){

                //console.log("Box at Y:" + this.listOfBoxes[this.i][0] +" X: " + this.listOfBoxes[this.i][1])

                if(this.listOfBoxes[this.i][0] === this.posY && this.listOfBoxes[this.i][1] === this.posX){
                    //console.log("box found by ixBox!")
                    return true
                }
            }
            //console.log("returning false")
            return false

        },

        isWall: function(posY, posX) {

            this.posY = posY
            this.posX = posX

            //console.log("running isWall")

            for (this.i = 0; this.i < this.listOfWalls.length ; this.i++){

                //console.log("Wall at Y:" + this.listOfWalls[this.i][0] +" X: " + this.listOfWalls[this.i][1])

                if(this.listOfWalls[this.i][0] === this.posY && this.listOfWalls[this.i][1] === this.posX){
                    //console.log("wall found by isWall!")
                    return true
                }
            }
            //console.log("returning false")
            return false

        },

        isFreeSpace: function(posY, posX) {

            this.posY = posY
            this.posX = posX

            //console.log("Checking if tile is free at Y: " + this.posY + " X: " + this.posX)

            if (this.isBox(this.posY, this.posX) == true ||
                this.isWall(this.posY, this.posX) == true){
                return false

            }else{

                return true
            }
        },

        clickHandler: function(args){

            this.args = args

            //checking tile is occupied by a box

            if (this.isBox(this.args.y, this.args.x) == true && this.bombActive == true){

                this.removeBox(this.args.y, this.args.x)
                this.bombActive = false
                this.bomb--

            }
            if (this.isBox(this.args.y, this.args.x) == true){
                //console.log("tile is a box")

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

                //if (this.isWall(this.newBoxPosY, this.newBoxPosX) == true){
                //    console.log("Wall found at Y: " + this.newBoxPosY + " X: " + this.newBoxPosX)
                //}else {
                //    console.log("No wall found at Y: " + this.newBoxPosY + " X: " + this.newBoxPosX)
                //}

                //if (this.isBox(this.newBoxPosY, this.newBoxPosX) == true){
                //    console.log("box found at Y: " + this.newBoxPosY + " X: " + this.newBoxPosX)
                //}else {
                //    console.log("No box found at Y: " + this.newBoxPosY + " X: " + this.newBoxPosX)
                //}

                
                //if (this.isFreeSpace(this.newBoxPosY, this.newBoxPosX) == true){
                //    console.log("Free space found at Y: " + this.newBoxPosY + " X: " + this.newBoxPosX)
                //}else {
                //    console.log("Free space found at Y: " + this.newBoxPosY + " X: " + this.newBoxPosX)
                //}

                if (this.checkIfBetween(this.newBoxPosY, 0, this.gridRows) == true 
                    && this.checkIfBetween(this.newBoxPosX, 0, this.gridColumns) == true
                    && this.isFreeSpace(this.newBoxPosY, this.newBoxPosX) == true){

                    //console.log("both numbers Y: " + this.newBoxPosY + " X: " + this.newBoxPosX + " are within the bounds")
                    //console.log("tile Y:" + this.newBoxPosY + " X:" + this.newBoxPosX + " is free unoccupied space")

                    this.moveBoxTo(this.args.y, this.args.x, this.newBoxPosY, this.newBoxPosX)

                }else if(this.strengthActive == true &&
                        this.isFreeSpace(this.newBoxPosY + this.deltaY, this.newBoxPosX+ this.deltaX) == true &&
                        this.checkIfBetween(this.newBoxPosY + this.deltaY, 0, this.gridRows) == true &&
                         this.checkIfBetween(this.newBoxPosX, + this.deltaX, this.gridColumns) == true
                        )
                        {
                    //conditions, str active == true, isbox(newpos) == true, isfree(newpost + delta) == true

                    this.moveBoxTo(this.newBoxPosY, this.newBoxPosX, this.newBoxPosY + this.deltaY, this.newBoxPosX + this.deltaX)
                    this.moveBoxTo(this.args.y, this.args.x, this.newBoxPosY, this.newBoxPosX)
                    this.strengths--
                    this.strengthActive == false

                }else{

                }
                
            }else if(this.isWall(this.args.y, this.args.x) == false){
                //console.log("tile is not a box")
                this.avatarPosY = this.args.y
                this.avatarPosX = this.args.x

            }else if(this.isWall(this.args.y, this.args.x) == true && this.drillActive == true){

                //console.log("drilling")
                //console.log(this.drillActive)
                this.removeWall(this.args.y, this.args.x)
                this.drills--
                this.drillActive = false
            }

        },
        checkLegalMove: function(initialPosX, initialPosY, newpPosX, newpPosY ){
            if (Math.abs(initialPosX + initialPosY - newpPosX - newpPosY) == 1){
                console.log("move is legal")
            }else{
                console.log("illegal move")
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

        //this.gridRows = this.levelMap.length
        //this.gridColumns = this.levelMap[0].length
        



    },
    mounted() {

    },

}