import Grid from './Grid.js'

export default {
    components: {
        Grid
    },
    template: `
    <div id="app">
        <h1>Sokoban</h1>
        <div class ="game-container">
            <grid/>
        </div>    
    </div>
    `
}