export default {

    props: ['drills', 'bombs', 'strengths',],

    template: `
        <div class="powerup-container">
            <button
            class ="powerup-button"
            @click="engagePowerup()"
            >{{bombLabel}}
            </button>

            <button
            class ="powerup-button"
            @click="engagePowerup2()"
            > {{drillLabel}}
            </button>

            <button
            class ="powerup-button"
            @click="engagePowerup3()"
            > {{strengthLabel}}
            </button>
        </div>
    
    `,
    data() {
        return {
        }
    },

    computed: { 
        
        bombLabel: function(){
            return "Bombs: " + this.bombs +"x"   
        },

        drillLabel: function(){
            return "Drills: " + this.drills +"x"
        },

        strengthLabel: function(){
            return "Potions of strength: " + this.strengths +"x"
        },    

    },

    methods: {

        engagePowerup: function (){

            if(this.bombs > 0) {
                this.$emit('respondToPowerUp', {special: "bomb"})
            }            
        },

        engagePowerup2: function (){

            if(this.drills > 0){
                this.$emit('respondToPowerUp', {special: "drill"})
            }
            
        },

        engagePowerup3: function (){

            if(this.strengths > 0){
                this.$emit('respondToPowerUp', {special: "strength"})
            }
            
        }

    },
}