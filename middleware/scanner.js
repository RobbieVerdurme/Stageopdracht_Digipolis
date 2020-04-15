export default async function ({ store }) {
    // check if scannerinfo is empty
    if(!Object.keys(store.getters['getScannerInfo']).length){
      // get scannerinfo
      await store.dispatch('setScannerInfo')
    }
}