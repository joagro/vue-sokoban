import Tile from './Tile.js'
import { levels } from './levels.js'

export default {
    components: {
        Tile
    },
    template: `<div>
    <h1> Avatar location: {{avatarPosY}} {{avatarPosX}} </h1>
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

            testLevels: levels[1],

        }
    },
    computed: {

        is10Long: function(){

            if (this.testLevels[0].length == 10) {
                return true
            }else{
                return false
            }

        },

        is7Long: function(){

            if (this.testLevels[0].length == 7) {
                return true
            }else{
                return false
            }

        },

        
        is5Long: function(){

            if (this.testLevels[0].length == 5) {
                return true
            }else{
                return false
            }

        },

        gridRows: function(){

            console.log("calculating grid rows: " + this.testLevels.length)

            return this.testLevels.length

        },

        gridColumns: function(){

            console.log("calculating grid cols: " + this.testLevels[0].length)

            return this.testLevels[0].length

        },

        containerSelector: function(){

            console.log("number of tiles per row" + this.testLevels.length)

            if(this.testLevels.length == 10) {

                console.log("10 tile container selected")

                return "grid-layout-10"

            }else if(this.testLevels == 5) {
                console.log("5 tile container selected")

                return "grid-layout-5"
            }

        },

        flatTiles() {
            return this.tiles.flat()
        },
        //updateBoxList(oldY, oldX, newY, newX) {

        //    console.log("computing tile list")

        //    for (this.i = 0; this.i < this.listOfBoxes.length ; this.i++) {

        //        if (this.listOfBoxes[this.i][0] == this.oldY && this.listOfBoxes[this.i][1] == this.oldX){

        //            this.listOfBoxes[this.i] = [newY, newX]
        //        }
        //    }
        //    return this.listOfBoxes

        //},
    },

    watch: {

        listOfBoxes: {
            deep: true,

            handler(){
                console.log("list of boxes has been updated!")
                
                this.points = this.score()

                console.log("Current score: " + this.points)

                this.targetPoints = this.listOfBoxes.length

                if(this.points == this.targetPoints){
                    console.log("Level cleared!")
                }

            }
                //console.log("tile list has been updated")
        },

        testObjectList: {
            deep: true,

            handler(){
                console.log("test object list has been updated")
                //console.log(this.testObjectList[0])
            }
        },
    },
    methods: {

        gridRowPixelLength: function() {

        },

        drawLevel: function(){

            //console.log("drawlevel running")
            

            for(this.row = 0; this.row < this.testLevels.length; this.row++){
                
                for(this.col = 0; this.col < this.testLevels[this.row].length;this.col++){

                    //console.log("Y: " + this.row + " X: " + this.col + " " + this.testLevels[this.row][this.col])

                    if(this.testLevels[this.row][this.col] === "W"){

                        //console.log("wall has been found")
                        this.listOfWalls.push([this.row, this.col])
                    
                    }else if(this.testLevels[this.row][this.col] === "B"){
                        this.listOfBoxes.push([this.row, this.col])

                    }else if(this.testLevels[this.row][this.col] === "P"){
                        this.listOfParkingLots.push([this.row, this.col])

                    }else if(this.testLevels[this.row][this.col] === "H"){
                        this.avatarPosY = this.row
                        this.avatarPosX = this.col

                    }


                }

            }
            //console.log(this.listOfWalls)
            //console.log(this.listOfBoxes)

        },

        score: function(){

            //let winningScore = this.listOfBoxes.length

            this.currentScore = 0

            let i = 0

            let j = 0

            for (this.i = 0; this.i < this.listOfBoxes.length ; this.i++) {

                console.log(i)

                for (this.j = 0; this.j < this.listOfParkingLots.length ; this.j++) {

                    if(this.listOfBoxes[this.i][0] == this.listOfParkingLots[this.j][0] && this.listOfBoxes[this.i][1] == this.listOfParkingLots[this.j][1]){

                        console.log("Box parked in parking lot at: " + this.listOfParkingLots[this.j][0] + " " +this.listOfParkingLots[this.j][1])

                        this.currentScore++
                    }

                }

            }
            console.log(this.currentScore)
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
        
        addBox: function(posY, posX) {

            this.listOfBoxes.push([posY, posX])

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

            //this.drawLevel()

            this.args = args

            //checking tile is occupied by a box

            if (this.isBox(this.args.y, this.args.x)){
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

                if (this.isWall(this.newBoxPosY, this.newBoxPosX) == true){
                    console.log("Wall found at Y: " + this.newBoxPosY + " X: " + this.newBoxPosX)
                }else {
                    console.log("No wall found at Y: " + this.newBoxPosY + " X: " + this.newBoxPosX)
                }

                if (this.isBox(this.newBoxPosY, this.newBoxPosX) == true){
                    console.log("box found at Y: " + this.newBoxPosY + " X: " + this.newBoxPosX)
                }else {
                    console.log("No box found at Y: " + this.newBoxPosY + " X: " + this.newBoxPosX)
                }

                
                if (this.isFreeSpace(this.newBoxPosY, this.newBoxPosX) == true){
                    console.log("Free space found at Y: " + this.newBoxPosY + " X: " + this.newBoxPosX)
                }else {
                    console.log("Free space found at Y: " + this.newBoxPosY + " X: " + this.newBoxPosX)
                }

                if (this.checkIfBetween(this.newBoxPosY, 0, this.gridRows) == true 
                    && this.checkIfBetween(this.newBoxPosX, 0, this.gridColumns) == true
                    && this.isFreeSpace(this.newBoxPosY, this.newBoxPosX) == true){

                    //console.log("both numbers Y: " + this.newBoxPosY + " X: " + this.newBoxPosX + " are within the bounds")
                    //console.log("tile Y:" + this.newBoxPosY + " X:" + this.newBoxPosX + " is free unoccupied space")

                    this.moveBoxTo(this.args.y, this.args.x, this.newBoxPosY, this.newBoxPosX)

                }else{
                    //pass
                    //console.log("none or one of the numbers Y: " + this.newBoxPosY + " and X: " + this.newBoxPosX + " are within bounds")
                    //console.log("Or the space behind is occupied")
                }


            }else{
                //console.log("tile is not a box")
                this.avatarPosY = this.args.y
                this.avatarPosX = this.args.x
            }

        },
        checkLegalMove: function(initialPosX, initialPosY, newpPosX, newpPosY ){
            if (Math.abs(initialPosX + initialPosY - newpPosX - newpPosY) == 1){
                console.log("move is legal")
            }else{
                console.log("illegal move")
            }

        },
        //setSpace: function(tileY, tileX){
        //    console.log("leaving empty space behind!")
        //    tiles[this.avatarPosY][this.avatarPosX].setAllFalse()
        //    tiles[this.avatarPosY][this.avatarPosX].isSpace = true
        //},

        checkWithinRange: function(yval, xval){
            this.yval = yval
            this.xval = xval

            if (x >= 0 && x <= this.gridColumns){
                console.log("variable is within range")
                return true
            }else{
                console.log("variable is out of range")
                return false
            }

        },
        moveAvatar: function(args){

            this.args = args
            this.avatarPosY = this.args.y
            this.avatarPosX = this.args.x
        },
       
    },
    created() {
        console.log(this.testLevels)

        //this.addBox(2,2)
        //console.log(this.listOfBoxes)
        //console.log(this.testLevels)

        this.drawLevel()

        //this.gridRows = this.testLevels.length
        //this.gridColumns = this.testLevels[0].length
        

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

        //console.log(this.listOfParkingLots.length)
        //this.$set(this.listOfParkingLots, 0, [5,5])
        //this.$set(this.listOfParkingLots, 1, [0,5])
        //this.$set(this.listOfParkingLots, 2, [5,1])

        //this.addBox(2,2)
        //this.$set(this.listOfBoxes, 0, [1,1])
        //this.$set(this.listOfBoxes, 1, [2,2])
        //this.$set(this.listOfBoxes, 2, [3,3])
        //console.log(this.listOfBoxes)

        //this.$set(this.testObjectList, 3, this.$set(th))
        //this.drawLevel()

        //console.log(this.listOfWalls)
        //console.log(this.testLevels)


    },
    mounted() {
        //this.drawLevel()

    },

}