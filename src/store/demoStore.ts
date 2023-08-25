import { makeAutoObservable } from "mobx"
class DemoStore {
    constructor() {
        makeAutoObservable(this)
    }
    name = "Demo"
    changeNameOfDemo = (val: string): void => {
        this.name = val
    }
    get newName() { return '新 · ' + this.name }
}

const demoStore = new DemoStore()

export default demoStore