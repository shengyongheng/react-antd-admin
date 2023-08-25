import { makeAutoObservable } from "mobx"
class IconsStore {
    constructor() {
        makeAutoObservable(this)
    }
    name = "Icons"
    changeNameOfIcons = () => {
        this.name = "new Icons"
    }
}
const iconsStore = new IconsStore()

export default iconsStore