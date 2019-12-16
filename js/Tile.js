export default {

    props: ['position', 'avatarPosX', 'avatarPosY', 'listOfBoxes', 'listOfParkingLots', 'listOfWalls'],

    template: `

       <div 
       class ="tile-div"
       
       v-bind:class="tileSelector" @click="toggleClass3()">
       {{tileSymbol}}
       </div>
    `,
    data () { return {
        //v-bind:class="tileSelector" @click="toggleClass2()">

        }

    },
    computed: {
        
        isHero: function() {

            if(this.avatarPosY == this.position.y && this.avatarPosX == this.position.x){
                return true
            }else{
                return false
            }

        },

        isWall: function() {

            for(this.i = 0; this.i < this.listOfWalls.length ; this.i++){

                if(this.listOfWalls[this.i][0] == this.position.y && this.listOfWalls[this.i][1] == this.position.x){

                    //console.log("wall found in: " + this.listOfWalls[this.i][0] + " " +this.listOfWalls[this.i][1])
                    return true
                }
            }
        },
        isBox: function() {

            for(this.i = 0; this.i < this.listOfBoxes.length ; this.i++){
                
                if(this.listOfBoxes[this.i][0] == this.position.y && this.listOfBoxes[this.i][1] == this.position.x){

                        //console.log("box found in: " + this.listOfBoxes[this.i][0] + " " +this.listOfBoxes[this.i][1])
                        return true
                }

            }
            return false

        },
        isParkingLot: function() {

            for(this.i = 0; this.i < this.listOfParkingLots.length ; this.i++){

                //console.log(this.i)
                
                if(this.listOfParkingLots[this.i][0] == this.position.y && this.listOfParkingLots[this.i][1] == this.position.x){

                        //console.log("parking lot found in: " + this.listOfParkingLots[this.i][0] + " " +this.listOfParkingLots[this.i][1])
                        return true
                }

            }
            return false

        },
        isSpace: function() {

            if(this.isHero == false && this.isBox == false && this.isParkingLot == false){
                return true
            }else{
                return false
            }
        },

        tileSymbol:{ 
            get:function () {

                if(this.isHero == true){
                    return "H"
                }else if(this.isBox == true){
                    return "B"

                }else if(this.isWall == true){
                    return "B"
                }else{
                    return "O"
                }
            },
        },
        tileSelector:{ 
            get:function () {

                //console.log("changing tile Y:" + this.position.y + " X:" + this.newpPosX)

                if(this.isHero == true){
                    return 'tile-div-red'

                }else if(this.isWall == true){
                    return 'tile-div-brown'

                }else if(this.isBox == true){
                    return 'tile-div-blue'
                }
                //else if(this.isParkingLot == true){
                else if(this.isParkingLot == true){
                    return 'tile-div-green'
                }
                else if(this.isSpace == true){
                    return 'tile-div'
                }
                else{
                    console.log("Error in tile selection")
                }
            },
        },
    },

    methods: {

        computeIsHero: function(){
            if (this.position.y == this.avatarPosY && this.position.x == this.avatarPosX){

            }
        },



        checkLegalMove2: function(initialPosX, initialPosY, newpPosX, newpPosY ){
            
            if (Math.abs(initialPosX + initialPosY - newpPosX - newpPosY) == 1){
                return true
            }else{
                return false
            }

        },

        toggleClass3: function(event) {

            this.$emit('respondToClick', {x: this.position.x, y: this.position.y})


        },
        toggleClass2: function(event) {

            //console.log(this.position)
            //console.log(this.listOfBoxes)
            //console.log(this.isTileaBox())
            console.log("is this a box?")
            console.log(this.isBox)
            console.log("is this space?")
            console.log(this.isSpace)
            

            if(this.checkLegalMove2(this.position.y, this.position.x, this.avatarPosY, this.avatarPosX) == true){
                //console.log("move is legal bool")

                if(this.isSpace == true){

                    console.log("previous avatar position!")
                    console.log(this.avatarPosY + "," + this.avatarPosX)

                    this.$emit('updateAvatar', {x: this.position.x, y: this.position.y})

                }
                else if (this.isBox){

                    console.log("Alas! A box stands in the way of your progress!")

                    //emitting the position of the tile the avatar is moving onto the box from
                    this.$emit('updateBox', {x: this.position.x, y: this.position.y})
                
                }
                else if(this.isHero){

                    console.log("this is the hero")

                    console.log(this.position)

                    console.log(this.isBox)
                    console.log(this.isSpace)
                
                }
                else{
           
                    console.log("you fucked up")
                }

            }else {

                if(this.isHero == true){
                    console.log("this is the position of the hero")
                }
                console.log("illegal move")
            }

        },
    },
    created () {

    },

    watch: {

        listOfBoxes: {

            deep: true,

            handler(){
                //console.log("boxes has been updated! (tile)")
            }
                
        },
    },
}