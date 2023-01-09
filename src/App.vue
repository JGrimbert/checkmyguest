<template>
  <div id="app">
      <div class="header">
          <h1 class="text-6xl m-5">Calculez vos mensualités</h1>
          <p>
            Calculez rapidement le montant de vos mensualités de remboursement de votre investissement locatif.
            Vous retrouverez en détails le montant du remboursement dû à votre emprunt ainsi que le coût des intérêts.
          </p>
      </div>
      <div class="body">
        <div>
          <InputXL
              :input="inputs.credit"
              @update-amount="updateAmount"
          />
          <apexchart
              type="donut"
              height="400"
              :options="chartOptions"
              :series="coutMensuel"
          />
        </div>
        <div class="flex flex-col mx-12">
          <InputRange
              :range="inputs.provision"
              :args="{ amountProvision: amountProvisionEuro }"
              @update-amount="updateAmount"
          />
          <InputRange
              :range="inputs.duree"
              @update-amount="updateAmount"
          />
          <InputRange
              :range="inputs.taux"
              @update-amount="updateAmount"
          />
        </div>
      </div>
    </div>
</template>

<script>

import InputXL from "./components/InputXL.vue";
import InputRange from "@/components/InputRange.vue";
import {Vue, Component, Provide } from "vue-property-decorator";

@Component({
  components: { InputXL, InputRange }
})
export default class ComponentInputRange extends Vue {

  @Provide() inputs = {
      credit: {
        name: 'credit',
        amount:100000,
        label: "Montant du bien",
        append: "€",
      },
      provision: {
        name: 'provision',
        type: "range",
        label: "Montant&nbsp;de l'apport",
        amount:20,
        min:10,
        max:40,
        legend: ({ amount, amountProvision }) => `${Math.floor(amountProvision)}€ - ${amount}% du prix`,
      },
      duree:{
        name: 'duree',
        type: "range",
        label: 'Durée de',
        amount:20,
        min:10,
        max:30,
        legend: ({ amount }) => `Durée de ${amount} ans`,
      },
      taux:{
        name: 'taux',
        type: "range",
        label: "Taux d'intérêt",
        amount:165,
        min:100,
        max:300,
        legend: ({ amount }) => amount/100 + "%",
      },
    };

  /** ApexChart options **/
  @Provide() chartOptions = {
      colors:['#FF0058', '#FF645A'],
      labels:["Mensualités", "Coût des intérêts"],
      chart: {
        type: 'donut',
        dropShadow: {
          enabled: false,
          top: 0,
          left: 0,
          blur: 8,
          opacity: 0.1
        },
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          customScale: 0.9,
        }
      },
      legend: {
        position: "bottom",
        horizontalAlign: 'left',
        offsetY: 20,
        fontFamily: 'URW Geometric',
        fontSize: 16,
        markers: {
          offsetY: 3,
          offsetX: -8,
          width: 16,
          height:16,
          radius: 4,
        },
        itemMargin: {
          horizontal: 24,
          vertical: 8
        },
        formatter: function(seriesName, opts) {
          return [seriesName, ":<b class='text-lg'>", opts.w.globals.series[opts.seriesIndex] + "€ / mois</b>"]
        }
      },
    };

    updateAmount (name, amount) {
      this.inputs[name].amount = amount.value;
    }

    get amountProvisionEuro () {
      return this.inputs.credit.amount/100*this.inputs.provision.amount;
    }

    get monthlyPayement () {
      return Math.floor((this.inputs.credit.amount-this.amountProvisionEuro)/(this.inputs.duree.amount * 12))
    }

    get interetCost () {

      const amountTauxReal = (this.inputs.taux.amount/100);
      const coutWithoutProvision = (this.inputs.credit.amount/(this.inputs.duree.amount * 12)) / amountTauxReal;
      const coutWithProvision = this.monthlyPayement / amountTauxReal;
      const diffWithProvision = (coutWithoutProvision - coutWithProvision)*1.8;

      return Math.floor(coutWithProvision-diffWithProvision)
    }

    get coutMensuel () {
      return [this.monthlyPayement,this.interetCost]
    }

}
</script>

<style lang="scss">

#app {

  font-family: URW Geometric;
  color: #2c3e50;
  width: 100%;
  padding:2em 20%;

  .header {
    @apply grid grid-cols-1 text-center text-xl mb-12
  }

  .body {
    @apply grid grid-cols-1 lg:grid-cols-2 mb-8
  }

  .apexcharts {

    &-canvas {
      margin: 2em auto 4em;
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
          content:" ";
          display: inline-block;
          width: 1em;
          height: 1em;
          position: relative;
          top:3px;
          left:-1em;
          border-radius: 0.33em;
        }

        &-interetCost::before {
          background:#FF645A;
        }

        &-monthlyPayement::before {
          background: #FF0058;
        }
    }
  }

}
</style>
