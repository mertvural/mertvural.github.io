<template>
    <div v-if="isGameOver" class="game-over">
        <h1>Game Over</h1>
        <p>
            Score : {{ getGameLevel }}
        </p>
        <a href="javascript:;" class="btn" onclick="window.location.reload(true);">New Game</a>
    </div>
    {{ getSeesawBalance }}
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            isGameOver: false,
            fallDirection: null
        }
    },

    computed: {

        ...mapGetters([
            'getGameLevel'
        ]),

        getSeesawBalance() {
            let getSeesawBalance = this.$store.getters.getSeesawBalance,
                getYourTotalWeight = this.$store.getters.getYourTotalWeight,
                getPcTotalWeight = this.$store.getters.getPcTotalWeight,
                weightDifferencet = getYourTotalWeight.reduce((acc, current) => acc + current, 0) - getPcTotalWeight.reduce((acc, current) => acc + current, 0);

            if (weightDifferencet > 20 || weightDifferencet < -20) {
                this.$store.commit("playPause", 0)
                setTimeout(() => {
                    this.isGameOver = true;
                }, 1200);
            }

            if ((getSeesawBalance >= 15 || getSeesawBalance <= -15) && this.$store.getters.getLeftElement.length > 0) {
                this.$store.commit("playPause", 0)
                this.$store.commit("activeSeesawBalance", getSeesawBalance < 0 ? getSeesawBalance - 20 : getSeesawBalance + 20)
                getSeesawBalance < 0 ? this.fallDirection = "fall-left" : this.fallDirection = "fall-right"
                this.$store.commit("fallDirection", this.fallDirection)
                setTimeout(() => {
                    this.isGameOver = true;
                }, 1200);
            }
        }
    },
}
</script>
<style lang="scss">
.game-over {
    z-index: 10;
    background: #ccc;
    padding: 20px;
    border: 1px solid #ccc;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: fantasy;
    font-size: 45px;
    animation: zoomIn 1s cubic-bezier(0.215, 0.610, 0.355, 1);
    gap: 1.5vw;

    @keyframes zoomIn {
        from {
            transform: scale(.5);
        }

        to {
            transform: scale(1);
        }
    }
}
</style>