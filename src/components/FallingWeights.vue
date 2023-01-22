<template>

    <div class="weight-wrapper"
        :style="{ top: getDropPosition + 'px', transform: 'rotate(' + getSeesawBalance + 'deg)' }">
        <div class="weight-wrapper--item" :class="getObjectType"
            :style="{ left: getLeftWeightPosition + '%', fontSize: getfallingWeight < 3 || getfallingWeight + 'em' }">
            <span class="weight-wrapper--item-inner">{{ getfallingWeight }}</span>
            {{ isPause }}
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            intervalid: null,
            objectType: null,
            fallingWeight: null,
            leftWeightPosition: 0,
            gameLevel : 1
        }
    },
    computed: {

        ...mapGetters([
            'getDropPosition',
            'getSeesawBalance',
            'getObjectType'
        ]),

        getLeftWeightPosition() {
            var self = this;
            document.onkeydown = function (e) {

                switch (e.which) {
                    case 37: // left             
                        self.leftWeightPosition !== 0 ? self.leftWeightPosition -= 10 : ""
                        break;
                    case 39: // right
                        self.leftWeightPosition !== 40 ? self.leftWeightPosition += 10 : ""
                        break;

                    default: return;
                }
                e.preventDefault();
            };
            return self.leftWeightPosition
        },
        isPause() {
            this.$store.getters.getGamePlayPause === 1 ? this.startGame() : this.pauseGame()
        },

        getObjectType() {
            this.objectType = this.$store.getters.getObjectType;
            return this.objectType;
        },
 
        getfallingWeight() {
            this.fallingWeight = this.$store.getters.getfallingWeight;
            return this.fallingWeight;
        }
    },

    methods: {
        startGame() {
            const seesawOffsetTop = document.querySelector(".seesaw").offsetTop;
            this.intervalid = setInterval(() => {
                this.$store.commit("dropPosition", this.$store.getters.getFallSpeed.topPositionSpeed + this.gameLevel)
                if (this.$store.getters.getDropPosition >= seesawOffsetTop - this.$store.getters.getFallSpeed.topPositionSpeed + this.gameLevel) {
                    clearInterval(this.intervalid)
                    this.weightCalculation()
                }
            }, this.$store.getters.getFallSpeed.interval);

        },

        pauseGame() {
            clearInterval(this.intervalid)
        },

        weightCalculation() {

            this.$store.commit("leftElementAdd", {
                getObjectType: this.objectType,
                getfallingWeight: this.fallingWeight,
                getLeftWeightPosition: this.leftWeightPosition
            })

            this.$store.commit("rightElementAdd", {
                getObjectType: this.$store.getters.getObjectType,
                getfallingWeight: this.$store.getters.getfallingWeight,
                getRightWeightPosition: this.$store.getters.getRightWeightPosition
            })
            
            this.$store.commit("nextElement", 1);
            this.objectType = this.$store.getters.getObjectType;
            this.fallingWeight = this.$store.getters.getfallingWeight;
            this.startGame();
            this.gameLevel += 1;
            this.$store.commit("gameLevel",this.gameLevel)
        }
    }
}
</script>
<style lang="scss">
.weight-wrapper {
    width: 50rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    max-width: 100%;
    height: 6px;
    margin: 5px auto;

    &--item {
        z-index: 1;
        position: absolute;
        top: 0;
        width: 0.6em;
        height: 0.6em;
        border: 0.05em solid transparent;
        transform: translate(-50%, -100%);
        color: #000;
        text-align: center;
        line-height: .5em;
        font-weight: 700;
        font-size: 3em;
        transition: transform 1s linear;

        &.triangle {
            border-width: 0 0.5em 0.5em;
            border-color: transparent transparent #ff9900;

            >span {
                position: absolute;
                left: 50%;
                top: 0;
                -webkit-transform: translate(-50%);
                transform: translate(-50%);
                line-height: 2.75em;
            }
        }

        &.circle {
            border-radius: 50%;
            background-color: #ccc;
        }

        &.rectangle {
            background-color: #6aa84f
        }
        &.fall-left {
            transform: translate(-500%, -100%) !important
        }
        &.fall-right {
            transform: translate(500%, -100%) !important
        }
    }

    &--item-inner {
        display: block;
        font-size: .3em;
    }
}
</style>