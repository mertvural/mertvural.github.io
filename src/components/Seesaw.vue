<template>

    <div class="seesaw">

        <div class="seesaw__pole" :style="{ transform: 'rotate(' + getSeesawBalance + 'deg)' }">

            <div v-for="leftElement in getLeftElement" class="weight-wrapper--item weight-wrapper--item--left"
                :class="leftElement.getObjectType, getFallDirection"
                :style="{ left: leftElement.getLeftWeightPosition + '%', fontSize: leftElement.getfallingWeight < 3 || leftElement.getfallingWeight + 'em' }">
                <span class="weight-wrapper--item-inner">{{ leftElement.getfallingWeight }}</span>
            </div>


            <div v-for="rightElement in getRightElement" class="weight-wrapper--item weight-wrapper--item--right"
                :class="rightElement.getObjectType, getFallDirection"
                :style="{ left: rightElement.getRightWeightPosition + '%', fontSize: rightElement.getfallingWeight < 3 || rightElement.getfallingWeight + 'em' }">
                <span class="weight-wrapper--item-inner">{{ rightElement.getfallingWeight }}</span>
            </div>

        </div>

        <div class="seesaw__scroller"></div>

    </div>

</template>
<script>
import { mapGetters } from 'vuex'
export default {

    computed: {
        ...mapGetters([
            'getFallDirection',
            'getLeftElement',
            'getRightElement',
            'getSeesawBalance',
            'getRightWeightPosition'
        ])
    },

    mounted() {
        this.$store.commit("rightElementAdd", {
            getObjectType: this.$store.getters.getObjectType,
            getfallingWeight: this.$store.getters.getfallingWeight,
            getRightWeightPosition: this.$store.getters.getRightWeightPosition
        })
    },

}
</script>
<style lang="scss">
.seesaw {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__pole {
        width: 50rem;
        transition: all .3s linear;

        &::after {
            content: "";
            height: 6px;
            background-color: #dd0000;
            display: block;
        }
    }

    &__scroller {
        width: 0;
        height: 0;
        border-bottom: 13rem solid #404040;
        border-left: 10rem solid transparent;
        border-right: 10rem solid transparent;
    }
}

.weight-wrapper--item {

    &--left,
    &--right {
        opacity: .75;
    }

    &--right {
        animation: topBottom .5s;

        @keyframes topBottom {
            0% {
                top: -70px
            }

            100% {
                top: 0px
            }
        }
    }
}
</style>