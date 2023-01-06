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

<script>
export default {
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
}
</script>

<style scoped>

</style>