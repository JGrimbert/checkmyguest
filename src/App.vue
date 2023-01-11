<template>
  <div id="app">
    <div class="container">
      <div class="header">
        <h1 class="text-6xl m-5">Calculez vos mensualités</h1>
        <p>
          Calculez rapidement le montant de vos mensualités de remboursement de
          votre investissement locatif. Vous retrouverez en détails le montant
          du remboursement dû à votre emprunt ainsi que le coût des intérêts.
        </p>
      </div>
      <div class="body">
        <div>
          <InputXL :input="inputs.credit" @update-amount="updateAmount" />
          <apexchart
            type="donut"
            height="400"
            :options="chartOptions"
            :series="monthlyCostDetails"
          />
        </div>
        <div class="flex flex-col mx-12">
          <InputRange
            :range="inputs.provision"
            :args="{ amountProvision: amountProvisionEuro }"
            @update-amount="updateAmount"
          />
          <InputRange :range="inputs.duration" @update-amount="updateAmount" />
          <InputRange :range="inputs.rate" @update-amount="updateAmount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IInputs, IInputXL, IInputRange } from '@/models/inputs'
import InputXL from './components/InputXL.vue'
import InputRange from '@/components/InputRange.vue'

import { Vue, Component, Provide } from 'vue-property-decorator'

@Component({
  components: { InputXL, InputRange }
})
export default class ComponentInputRange extends Vue {
  @Provide() credit: IInputXL = {
    name: 'credit',
    amount: 100000,
    label: 'Montant du bien',
    append: '€'
  }
  @Provide() provision: IInputRange = {
    name: 'provision',
    label: "Montant de l'apport",
    amount: 20,
    min: 10,
    max: 40,
    legend: ({ amount, amountProvision }) =>
      `${Math.floor(amountProvision)}€ - ${amount}% du prix`
  }
  @Provide() duration: IInputRange = {
    name: 'duration',
    label: 'Durée de',
    amount: 20,
    min: 10,
    max: 30,
    legend: ({ amount }) => `Durée de ${amount} ans`
  }
  @Provide() rate: IInputRange = {
    name: 'rate',
    label: "rate d'intérêt",
    amount: 165,
    min: 100,
    max: 300,
    legend: ({ amount }) => amount / 100 + '%'
  }

  /** ApexChart options **/
  @Provide() chartOptions = {
    colors: ['#FF0058', '#FF645A'],
    labels: ['Mensualités', 'Coût des intérêts'],
    chart: {
      type: 'donut',
      dropShadow: {
        enabled: false,
        top: 0,
        left: 0,
        blur: 8,
        opacity: 0.1
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        customScale: 0.9
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
      offsetY: 20,
      fontFamily: 'URW Geometric',
      fontSize: 16,
      markers: {
        offsetY: 3,
        offsetX: -8,
        width: 16,
        height: 16,
        radius: 4
      },
      itemMargin: {
        horizontal: 24,
        vertical: 8
      },
      formatter: function (seriesName: string, opts: any) {
        return [
          seriesName,
          ":<b class='text-lg'>",
          opts.w.globals.series[opts.seriesIndex] + '€ / mois</b>'
        ]
      }
    }
  }

  updateAmount(name: string, amount: HTMLInputElement) {
    ;(this.inputs[name] as IInputRange | IInputXL).amount = parseInt(
      amount.value
    )
  }

  get amountProvisionEuro() {
    return (this.inputs.credit.amount / 100) * this.inputs.provision.amount
  }

  get monthlyPayement() {
    return Math.floor(
      (this.inputs.credit.amount - this.amountProvisionEuro) /
        (this.inputs.duration.amount * 12)
    )
  }

  get inputs() {
    return {
      credit: this.credit,
      rate: this.rate,
      duration: this.duration,
      provision: this.provision
    } as IInputs
  }

  get interetCost() {
    const amountRateReal = this.inputs.rate.amount / 100
    const costWithoutProvision =
      this.inputs.credit.amount /
      (this.inputs.duration.amount * 12) /
      amountRateReal
    const costWithProvision = this.monthlyPayement / amountRateReal
    const diffWithProvision = (costWithoutProvision - costWithProvision) * 1.8

    return Math.floor(costWithProvision - diffWithProvision)
  }

  get monthlyCostDetails() {
    return [this.monthlyPayement, this.interetCost]
  }
}
</script>

<style lang="scss">
#app {
  font-family: URW Geometric;
  color: #2c3e50;
  width: 100%;
  padding: 2em 20%;

  .header {
    @apply grid grid-cols-1 text-center text-xl mb-12;
  }

  .body {
    @apply grid grid-cols-1 lg:grid-cols-2 mb-8;
  }

  .apexcharts {
    &-canvas {
      margin: 2em auto 4em;
    }

    &-legend {
      padding: 9px 12px 11px;
    }

    &-canvas svg {
      overflow: visible;

      .legend-mouseover-inactive {
        opacity: 1;
      }
    }

    &-canvas svg foreignObject {
      overflow: visible;
    }

    .bullet {
      padding-left: 2em;

      &::before {
        content: ' ';
        display: inline-block;
        width: 1em;
        height: 1em;
        position: relative;
        top: 3px;
        left: -1em;
        border-radius: 0.33em;
      }

      &-interetCost::before {
        background: #ff645a;
      }

      &-monthlyPayement::before {
        background: #ff0058;
      }
    }
  }
}
</style>
