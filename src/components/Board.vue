<template>
    <div class="board">
        <div class="board__left">
            <div class="board__wrapper">
                <h3>Your Score</h3>
                <p>Total Weight : <strong>{{ getYourTotalWeight }}</strong></p>
                <p>Momentum : <strong>{{ getYourMomentum }}</strong></p>
            </div>
        </div>
        <div class="option-game">
            <button class="option-game--newgame" onclick="window.location.reload(true)">New Game</button>
            <button class="option-game--play" @click="playPauseControl(playPause)">
                {{ playPause == 0 ? "Play" : "Pause" }}
            </button>
            <p>
                Game Level : <strong>{{ getGameLevel }}</strong>
            </p>
        </div>
        <div class="board__right">
            <div class="board__wrapper">
                <h3>Computer Score</h3>
                <p>Total Weight : <strong>{{ getPcTotalWeight }}</strong></p>
                <p>Momentum : <strong>{{ getPcMomentum }}</strong></p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {

    data() {
        return {
            playPause: 0 //1=play, 0=pause
        }
    },

    computed: {

        ...mapGetters([
            'getGameLevel'
        ]),

        getYourTotalWeight() {
            return this.$store.getters.getYourTotalWeight.reduce((acc, current) => acc + current, 0)
        },

        getYourMomentum() {
            return this.$store.getters.getYourMomentum.reduce((acc, current) => acc + current, 0).toFixed(2)
        },

        getPcTotalWeight() {
            return this.$store.getters.getPcTotalWeight.reduce((acc, current) => acc + current, 0)
        },
        getPcMomentum() {
            return this.$store.getters.getPcMomentum.reduce((acc, current) => acc + current, 0).toFixed(2)
        },
    },

    methods: {
        playPauseControl(option) {
            option === 1 ? this.playPause = 0 : this.playPause = 1;
            this.$store.commit("playPause", this.playPause)
        }
    },

}
</script>
<style lang="scss">
.board {
    flex: 1;
    display: flex;
    max-width: 50em;
    justify-content: space-between;
    width: 100%;

    &__wrapper {
        padding: 15px;
        gap: 5px;
        display: grid;
        background: #f7f7f7;
        border: 1px solid #ddd;

        p {
            display: flex;
            justify-content: space-between;
            min-width: 125px;
        }
    }
}

.option-game {
    padding: 5px 0;
    display: flex;
    flex-direction: column;

    >button {
        width: 120px;
        height: 40px;
        border: 1px solid;
        outline: 0;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        margin: 5px 0;

        &:hover {
            opacity: .8
        }
    }

    &--play {
        background-color: #007a00;
    }

    &--newgame {
        background-color: #dd0000;
    }
}
</style>