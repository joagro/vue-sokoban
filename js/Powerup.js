export default {

    props: ['drills', 'bombs', 'strengths'],

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

            bomb: "Bomb",
            drill: "Drill",
            strength: "Mega-strength",
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
            return "Bombs: " + this.strengths +"x"
        },    

    },

    methods: {

        engagePowerup: function (){
            //console.log(this.bombs)
            this.$emit('respondToPowerUp', {special: "bomb"})
        },

        engagePowerup2: function (){
            //console.log(this.drills)
            this.$emit('respondToPowerUp', {special: "drill"})
        },

        engagePowerup3: function (){
            //console.log(this.strengths)
            this.$emit('respondToPowerUp', {special: "strength"})
        }

    },
}