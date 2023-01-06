<template>
  <div>
    <label for="montant">{{ label }}</label>
    <div class="inputXL">
      <span>{{  append }}</span>
      <input
          id="montant"
          type="number"
          ref="input"
          :value="montant"
          @input="updateInput"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "InputXL",
  props: {
    label: { default: "" },
    append: { default: "" },
    montant: { default: 0 }
  },
  methods: {
    updateInput () {
      this.$emit('updateInput', this.$refs["input"].value)
    }
  }
}
</script>

<style scoped>

</style>