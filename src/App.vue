<template>
  <v-app>
    <v-container>
      <v-layout
        text-center
        wrap
      >
        <v-flex xs12>
          <v-img
            :src="require('./assets/logo.svg')"
            class="my-3"
            contain
            height="200"
          ></v-img>
        </v-flex>

        <v-flex class="d-flex justify-space-between mb-5" xs12 md10 offset-md-1 xl6 offset-xl-3>
          <h1 class="headline">Serviços Corporativos</h1>
        </v-flex>

        <v-flex v-if="cCorporate.sum > 0" class="d-flex justify-space-between" xs12 md10 offset-md-1 xl6 offset-xl-3>
          <v-progress-linear indeterminate></v-progress-linear>
        </v-flex>

        <v-flex class="d-flex justify-space-between mb-10" xs12 md10 offset-md-1 xl6 offset-xl-3>
          <v-expansion-panels>
            <v-expansion-panel v-for="(item,i) in sCorporate" :key="i">
              <v-expansion-panel-header  disable-icon-rotate>
                {{ item.name }}
                <template v-slot:actions>
                  <v-chip v-show="item.status === undefined" class="py-0" color="yellow darken-3" label text-color="white">
                    Verificando...
                    <v-icon right style="color: #fff;">hourglass_empty</v-icon>
                  </v-chip>
                  <v-chip v-show="item.status === true" class="py-0" color="green" label text-color="white">
                    Operacional!
                    <v-icon right style="color: #fff;">done</v-icon>
                  </v-chip>
                  <v-chip v-show="item.status === false" class="py-0" color="red" label text-color="white">
                    Inacessível!
                    <v-icon right style="color: #fff;">error</v-icon>
                  </v-chip>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="font-weight-light text-start">
                <a :href="item.url" target="_blank">{{ item.url }}</a>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-flex>

        <v-flex class="d-flex justify-space-between mb-5" xs12 md10 offset-md-1 xl6 offset-xl-3>
          <h1 class="headline">Unidade Descentralizada</h1>
        </v-flex>

        <v-flex class="d-flex justify-center mb-3" xs12 md6 offset-md-3 xl4 offset-xl-4>
            <v-select
              v-model="unity"
              label="Selecione a unidade..."
              solo
              :items="unities"
              item-text="name"
              :hint="'Em ' + unity.local"
              persistent-hint
              append-outer-icon="location_city"
              return-object
              v-on:change="changeUnity()"
            ></v-select>
        </v-flex>

        <v-flex v-if="cLocal.sum > 0" class="d-flex justify-space-between" xs12 md10 offset-md-1 xl6 offset-xl-3>
          <v-progress-linear indeterminate></v-progress-linear>
        </v-flex>

        <v-flex class="d-flex justify-space-between mb-10" xs12 md10 offset-md-1 xl6 offset-xl-3 v-if="unity">
          <v-expansion-panels>
            <v-expansion-panel v-for="(item,i) in sLocal[unity.domain]" :key="i">
              <v-expansion-panel-header  disable-icon-rotate>
                {{ item.name }}
                <template v-slot:actions>
                  <v-chip v-show="item.status === undefined" class="py-0" color="yellow darken-3" label text-color="white">
                    Verificando...
                    <v-icon right style="color: #fff;">hourglass_empty</v-icon>
                  </v-chip>
                  <v-chip v-show="item.status === true" class="py-0" color="green" label text-color="white">
                    Operacional!
                    <v-icon right style="color: #fff;">done</v-icon>
                  </v-chip>
                  <v-chip v-show="item.status === false" class="py-0" color="red" label text-color="white">
                    Inacessível!
                    <v-icon right style="color: #fff;">error</v-icon>
                  </v-chip>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="font-weight-light text-start">
                <a :href="item.url" target="_blank">{{ item.url }}</a>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-flex>
      </v-layout>

      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-text>
            <p class="text-center pt-4"><v-icon large color="red">cloud_off</v-icon></p>
            Você está sem conexão com a internet! Ela é necessária para utilizar este serviço. Por favor, verifique sua rede de dados.
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="green darken-1" text @click="reload()">Tentar Novamente</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'
import https from 'https'

import unities from './settings/unities.json'

import external from './settings/services/external.json'
import corporate from './settings/services/corporate.json'
import local from './settings/services/local.json'

export default {
  data: () => ({
    online: false,
    dialog: false,
    unity: null,
    unities: unities,
    sExternal: external,
    sCorporate: corporate,
    sLocal: local,
    cCorporate: { sum: 0 },
    cLocal: { sum: 0 }
  }),
  beforeMount () {
    this.unity = unities[0]

    if (typeof window.navigator.onLine === 'undefined') {
      this.online = true
    } else {
      this.online = window.navigator.onLine
    }
  },
  mounted () {
    if (this.online) {
      this.sCorporate.forEach(item => {
        this.cCorporate.sum++

        console.log('Checking ' + item.url)

        this.check(item, this.cCorporate)
      })

      this.checkUnitiesServices()
    } else {
      this.dialog = true
    }
  },
  methods: {
    check (item, counter) {
      const agent = new https.Agent({
        rejectUnauthorized: false
      })

      let options = {
        httpsAgent: agent,
        crossdomain: true,
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }

      axios.head(item.url, options).then(response => {
        console.log('Ok to ' + item.url + '!')
        item.status = true
      }).catch(error => {
        console.log('Failed to ' + item.url + ' - ' + error)
        item.status = false
      }).finally(() => {
        counter.sum--
        console.log('counter: ' + counter.sum)
        this.$forceUpdate()
      })
    },
    reload () {
      location.reload()
    },
    changeUnity () {
      this.$forceUpdate()

      this.checkUnitiesServices()
    },
    checkUnitiesServices () {
      if (this.sLocal[this.unity.domain] !== undefined) {
        this.sLocal[this.unity.domain].forEach(item => {
          this.cLocal.sum++

          console.log('Checking ' + item.url)

          this.check(item, this.cLocal)
        })
      }
    }
  }
}
</script>
