// imports
// eslint-disable-next-line no-undef
const axios = require('axios')

/**
 * state
 */
export const state = () => ({
  routeinfo: [
    { id: 1, title: 'Muntenroute Gent', info: 'In de Gentse binnenstad komen er duizend ‘munten’ gemaakt uit aluminiumbrons in het wegdek tussen de Grasbrug en het François Laurentplein. De munten zullen een \'spoor\' van duizend meter lang vormen vanaf de Grasbrug via de Graslei, de Hooiaard, de Korenmarkt, de Donkersteeg, het Goudenleeuwplein, het Emile Braunplein, het Sint-Baafsplein, de Mageleinstraat, de Kalandestraat, de Kalandeberg, de Koestraat en de Brabantdam tot aan het François Laurentplein. In de middeleeuwen was dit een stuk van de belangrijke handelsweg van Brugge naar Keulen. Die heeft het stratenpatroon van de binnenstad mee vorm gegeven. De muntenroute visualiseert het deel van deze route tussen de Leie aan de Grasbrug en de (nu overwelfde) Schelde onder het François Laurentplein.\n Hoeveel munten liggen er al? \n De muntenroute wordt in delen gerealiseerd. De eerste munten kwamen in 2011-2012 op straat in het kader van het KoBra-project (de heraanleg van de Korenmarkt, het Emile Braunplein en omliggende straten), met de steun van het Europese PORTICO-project. Aan de Grasbrug, kant Graslei, op de Korenmarkt, in de Donkersteeg, op het Goudenleeuwplein, het Emile Braunplein en het Sint-Baafsplein en ten slotte ook op het houten terras aan het François Laurentplein kwamen er toen in totaal 416 munten.Tijdens de BraVoKo-werken (heraanleg Brabantdam, Vogelmarkt en Kouter) in 2017 kwam er een tweede stuk van de muntenroute klaar. Op het voetpad van de Brabantdam tussen het François Laurentplein en de Koestraat werden 172 munten in de bestrating ingewerkt. In maart-april 2019 werd de muntenroute verder verlengd in de verkeersvrije Koestraat, met 141 munten, en op de Kalandeberg, met 77 munten. Zo kwamen er in totaal 390 munten bij.Na de KoBra- en BraVoKo-werven staat de teller op 806 munten. Dat betekent dat er nog 194 munten te gaan zijn voor de volledige afwerking van de muntenroute. Die munten zullen verspreid worden over de twee ontbrekende schakels van de muntenroute: het traject Graslei-Hooiaard en het traject Mageleinstraat-Kalandestraat. Voor de aanleg ervan is er nog geen planning.' }
  ],
  routepoints: []
})

/**
 * mutations
 */
export const mutations = {
  setRoutepoints(state, payload){
      state.routepoints = payload
  }
}

 /**
  * actions
  */
 export const actions = {
  async setRoutepoints({ commit }){
    // eslint-disable-next-line no-useless-catch
    try{
        await axios.get('/route.json', {proxy: {host: '127.0.0.1', port: '3000'}}).then(({ data }) => {
            commit('setRoutepoints', data.features)
        })
    }catch(error){
        throw error
    }
  }
}
