export default {

    props: ['position', 'avatarPosX', 'avatarPosY', 'listOfBoxes', 'listOfParkingLots', 'listOfWalls'],

    template: `

       <div 
       class ="tile-div"
       
       v-bind:class="tileSelector" @click="tileClick()">
       
       </div>
    `,
    data () { return {
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

                    return true
                }
            }
        },
        isBox: function() {

            for(this.i = 0; this.i < this.listOfBoxes.length ; this.i++){
                
                if(this.listOfBoxes[this.i][0] == this.position.y && this.listOfBoxes[this.i][1] == this.position.x){

                        return true
                }

            }
            return false

        },
        isParkingLot: function() {

            for(this.i = 0; this.i < this.listOfParkingLots.length ; this.i++){
                
                if(this.listOfParkingLots[this.i][0] == this.position.y && this.listOfParkingLots[this.i][1] == this.position.x){

                        return true
                }

            }
            return false
        },

        isSpace: function() {

            if(this.isHero == false && this.isBox == false && this.isParkingLot == false && this.isWall == false){
                return true
            }else{
                return false
            }
        },
        tileSelector:{ 
            get:function () {

                if(this.isHero == true){
                    return 'tile-div-red'

                }else if(this.isWall == true){
                    return 'tile-div-brown'

                }else if(this.isBox == true){
                    return 'tile-div-blue'
                }
                else if(this.isParkingLot == true){
                    return 'tile-div-green'
                }
                else if(this.isSpace == true){
                    return 'tile-div'
                }
            },
        },
    },
    methods: {

        checkLegalMove: function(initialPosY, initialPosX, newpPosY, newpPosX ){
            
            if (Math.abs(initialPosY + initialPosX - newpPosY - newpPosX) == 1){
                return true
            }else{
                return false
            }
        },
        tileClick: function(event) {

            if(this.checkLegalMove(this.avatarPosY, this.avatarPosX, this.position.y, this.position.x) == true){
                this.$emit('respondToClick', {x: this.position.x, y: this.position.y})
            }
        },
    },
}