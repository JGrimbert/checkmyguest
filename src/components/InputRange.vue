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
      :value="range.amount"
      @input="({ target }) => updateAmount(target)"
    />
    <div class="legend">{{ legend }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Emit } from 'vue-property-decorator'
import { IInputRange } from '@/models/inputs'
import { ILegend } from '@/models/inputs'

@Component
export default class ComponentInputRange extends Vue {
  @Prop() range: IInputRange
  @Prop() args: ILegend | { amountProvision: 0 }

  @Provide() style = '' as string

  get legend() {
    return this.range.legend({ ...this.args, amount: this.range.amount })
  }

  @Emit()
  updateAmount(target: HTMLInputElement) {
    const min: number = parseInt(target.min)
    const max: number = parseInt(target.max)
    const val: number = parseInt(target.value)

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%'

    return this.range.name
  }

  mounted() {
    this.updateAmount(this.$refs['range'] as HTMLInputElement)
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
  -webkit-box-shadow: 6px 6px 12px -1px rgba(0, 0, 0, 0.14);
  box-shadow: 6px 6px 12px -1px rgba(0, 0, 0, 0.14);
  background-image: linear-gradient(#ff0058, #ff0058);
  background-size: 70% 100%;
  background-repeat: no-repeat;

  margin-bottom: 20px;

  &-wrapper {
    margin: auto 2em;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #f7f7fb;

    -webkit-box-shadow: 6px 6px 12px -1px rgba(0, 0, 0, 0.14);
    box-shadow: 2px 2px 1px 0px rgba(0, 0, 0, 0.14);

    cursor: pointer;
  }
}

.legend {
  width: 80%;
  padding: 6px 18px 8px;
  margin: 0 auto 2em;
  font-size: 1em;
  text-align: center;
}
</style>
