<template>
  <div>
    <label for="montant">{{ input.label }}</label>
    <div class="inputXL">
      <span>{{ input.append }}</span>
      <input
          id="montant"
          type="number"
          ref="input"
          :value="input.montant"
          @input="updateInput"
      >
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "InputXL",
  props: {
    input: {
      label: { default: "" },
      append: { default: "" },
      montant: { default: 0 },
      name: { default: "" }
    },
  },
  methods: {
    updateInput () {
      this.$emit('updateInput', this.$refs["input"].value, this.input.name)
    }
  }
})
</script>

<style scoped lang="scss">
.inputXL {

  border-radius:8px;
  -webkit-box-shadow: 4px 5px 5px -2px #D8D8E0;
  box-shadow: 4px 5px 5px -2px #D8D8E0;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 2px;
  font-size: 2.1em;

  input {
    -webkit-appearance: none;
    -moz-appearance: textfield;
    appearance: none;
    padding: 4px 70px;
    border: 0px;
    color: #ABAFCC;
    background: #F7F7FB;
    border-radius: 16px;
    -webkit-box-shadow: inset 0px 0px 15px 0px #EAEAEE;
    box-shadow: inset 16px 0px 10px 4px #EAEAEE;

    &:focus-visible {
      outline: transparent;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

  }

  span {
    position:absolute;
    color:#ABAFCC;
    background: #F5F4FC;
    line-height: 1.75em;
    padding: 0 12px;
    border-radius: 15px 0 0 15px;
  }

}
</style>