import { observable, action } from 'mobx'

class UIStore {
    constructor (rootStore) {
        this.rootStore = rootStore
        this.BASE = 'http://localhost:4000'
    }
}

export default UIStore