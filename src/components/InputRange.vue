<template>
  <div class="slider-wrapper">
    <label for="range">{{ range.label }}</label>
    <input
        name="range"
        type="range"
        ref="range"
        class="slider"
        :min="range.min"
        :max="range.max"
        :value="range.montant"
        @input="updateRange"
    >
    <div class="legend">{{ legende }}</div>
  </div>
</template>

<script>
export default {
  name: "InputRange",
  props: {
    range: {
      label: {},
      montant: {},
      min: {},
      max: {},
    },
    legende: {}
  },
  data: () => ({
    style: ''
  }),
  mounted() {
    this.updateRange()
  },
  methods: {
    updateRange () {

      const target = this.$refs["range"];
      const min = target.min
      const max = target.max
      const val = target.value

      target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'

      this.$emit("updateRange", target.value)
    }
  }
}
</script>

<style scoped lang="scss">

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 16px;
  border-radius: 8px;
  -webkit-box-shadow: 6px 6px 12px -1px rgba(0,0,0,0.14);
  box-shadow: 6px 6px 12px -1px rgba(0,0,0,0.14);
  background-image: linear-gradient(#FF0058, #FF0058);
  background-size: 70% 100%;
  background-repeat: no-repeat;

  margin-bottom:20px;

  &-wrapper {
    margin:auto 2em;
  }
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #F7F7FB;

  -webkit-box-shadow: 6px 6px 12px -1px rgba(0,0,0,0.14);
  box-shadow: 2px 2px 1px 0px rgba(0,0,0,0.14);

  cursor: pointer;
}

.legend {
  width: 240px;
  margin: 0 auto 2em;
  font-size: 1.2em;
  text-align: center;
}
</style>