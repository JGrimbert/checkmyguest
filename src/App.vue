<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col class="header">
          <h1>Calculez vos mensualités</h1>
          <p>
            Calculez rapidement le montant de vos mensualités de remboursement de votre investissement locatif.
            Vous retrouverez en détails le montant du remboursement dû à votre emprunt ainsi que le coût des intérêts.
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="6">
          <InputXL
              label="Montant du bien"
              append="€"
              :montant="pret"
              @updateInput="updatePret"
          />
          <apexchart
              type="donut"
              width="420"
              :options="chartOptions"
              :series="coutMensuel"
          ></apexchart>
        </b-col>
        <b-col xs="6">
          <inputRange
            :range="apport"
            :legende="legendeApport"
            @updateRange="updateApport"
          />
          <inputRange
            :range="duree"
            :legende="legendeDuree"
            @updateRange="updateDuree"
          />
          <inputRange
            :range="taux"
            :legende="legendeTaux"
            @updateRange="updateTaux"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import InputRange from "./components/InputRange.vue";
import InputXL from "./components/InputXL.vue";

export default {
  name: 'App',
  components: { InputRange, InputXL },
  data: () => ({
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
          return [seriesName, ":", opts.w.globals.series[opts.seriesIndex] + "€ / mois"]
        }
      },
    },
    pret: 100000,
    apport: {
      label: "Montant de l'apport",
      montant:20000,
      min:10000,
      max:100000,
    },
    duree:{
      label: 'Durée de',
      montant:20,
      min:10,
      max:30,
    },
    taux:{
      label: "Taux d'intérêt",
      montant:165,
      min:100,
      max:300,
    },
  }),
  methods: {
    updateApport (montant) {
      this.apport.montant = montant;
    },
    updateDuree (montant) {
      this.duree.montant = montant;
    },
    updateTaux (montant) {
      this.taux.montant = montant;
    },
    updatePret (montant) {
      this.pret = montant;
    }
  },
  computed:  {
    legendeApport () {
      return `${this.apport.montant}€ - ${Math.floor(100-((this.pret-this.apport.montant)/this.pret*100))}% du prix`
    },
    legendeDuree () {
      return 'Durée de ' + this.duree.montant + " ans";
    },
    legendeTaux () {
      return this.taux.montant/100 + "%"
    },
    mensualite () {
      return Math.floor((this.pret-this.apport.montant)/(this.duree.montant * 12))
    },
    coutInterets () {
      return Math.floor(this.mensualite / (this.taux.montant/100))
    },
    coutMensuel () {
      return [this.mensualite,this.coutInterets]
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'URW Geometric';
  src: local('URW Geometric Regular'), local('URW-Geometric-Regular'),
  url('assets/URWGeometric-Regular.woff2') format('woff2'),
  url('assets/URWGeometric-Regular.woff') format('woff'),
  url('assets/URWGeometric-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

#app {

  font-family: URW Geometric;
  color: #2c3e50;
  width: 100%;
  padding:2em 20%;

  .header {
    text-align: center;
    margin-bottom: 2em;

    p {
      font-size: 1.2em;
    }
  }

  .apexcharts {

    &-canvas {
      margin: 2em auto 4em;
    }

    &-canvas svg {
      /* Allow the legend to overflow the chart area */
      overflow: visible;
    }

    &-canvas svg foreignObject {
      /* Allow the legend to overflow the legend container */
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
