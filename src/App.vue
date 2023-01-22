<template lang="">
    <div class="main">
        <Board />
        <FallingWeights />
        <Seesaw />
        <GameOver />
    </div>
</template>
<script>
import Seesaw from "./components/Seesaw.vue"
import Board from "./components/Board.vue"
import FallingWeights from "./components/FallingWeights.vue"
import GameOver from "./components/GameOver.vue"
export default {

    components: {
        Board,
        Seesaw,
        FallingWeights,
        GameOver
    }

}
</script>
<style lang="scss">
.main {
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    height: 100%;
}
</style>