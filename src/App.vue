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
        <div class="mb-8 mx-6">
          <InputXL
              :input="inputs.pret"
              @update-amount="updateAmount"
          />
          <apexchart
              type="donut"
              height="500"
              :options="chartOptions"
              :series="coutMensuel"
          />
        </div>
        <div class="flex flex-col">
          <InputRange
              :range="inputs.apport"
              :args="{ montantApport: montantApportEuro }"
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

export default {
  name: 'App',
  components: { InputXL, InputRange },
  data: () => ({
    inputs: {
      pret: {
        name: 'pret',
        montant:100000,
        label: "Montant du bien",
        append: "€",
      },
      apport: {
        name: 'apport',
        type: "range",
        label: "Montant de l'apport",
        montant:20,
        min:10,
        max:40,
        legend: ({ montant, montantApport }) => `${Math.floor(montantApport)}€ - ${montant}% du prix`,
      },
      duree:{
        name: 'duree',
        type: "range",
        label: 'Durée de',
        montant:20,
        min:10,
        max:30,
        legend: ({ montant }) => `Durée de ${montant} ans`,
      },
      taux:{
        name: 'taux',
        type: "range",
        label: "Taux d'intérêt",
        montant:165,
        min:100,
        max:300,
        legend: ({ montant }) => montant/100 + "%",
      },
    },
    /** ApexChart options **/
    chartOptions: {
      colors:['#E91E63', '#F44336'],
      labels:["Mensualités", "Coût des intérêts"],
      chart: {
        type: 'donut',
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 8,
          opacity: 0.1
        }
      },
      dataLabels: {
        enabled: false
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
    },
  }),
  methods: {
    updateAmount (name, montant) {
      console.log("pkdlmqsdmkq", name, montant)
      this.inputs[name].montant = montant.value;
    }
  },
  computed:  {
    montantApportEuro () {
      return this.inputs.pret.montant/100*this.inputs.apport.montant;
    },
    mensualite () {
      return Math.floor((this.inputs.pret.montant-this.montantApportEuro)/(this.inputs.duree.montant * 12))
    },
    coutInterets () {

      const coutWithoutApport = (this.inputs.pret.montant/(this.inputs.duree.montant * 12)) / (this.inputs.taux.montant/100);
      const coutWithApport = this.mensualite / (this.inputs.taux.montant/100);
      const diffWithApport = (coutWithoutApport - coutWithApport)*1.8;

      return Math.floor(coutWithApport-diffWithApport)
    },
    coutMensuel () {
      return [this.mensualite,this.coutInterets]
    }
  },
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
    @apply grid grid-cols-1 lg:grid-cols-2
  }

  .apexcharts {

    &-canvas {
      margin: 2em auto 4em;
    }

    &-canvas svg {
      overflow: visible;
    }

    &-canvas svg foreignObject {
      overflow: visible;
    }

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

      &-coutInterets::before {
        background:#F44336;
      }

      &-mensualite::before {
        background: #E91E63;
      }

  }

}


</style>
