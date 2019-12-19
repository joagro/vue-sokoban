import Grid from './Grid.js'

export default {
    components: {
        Grid
    },
    template: `
    <div id="app">
        <h1 style="text-align:center">Sokoban</h1>
        <div class ="game-container">
            <grid/>
        </div>    
    </div>
    `
}