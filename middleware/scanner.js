export default async function ({ store }) {
    // check if scannerinfo is empty
    if(!Object.keys(store.state.scanner.scannerInfo).length){
      // get scannerinfo
      await store.dispatch('scanner/setScannerInfo')
    }
}