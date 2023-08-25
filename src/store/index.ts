import { createContext, useContext } from "react";
import demoStore from "./demoStore";
import iconsStore from "./iconsStore";

const context = createContext({
    iconsStore,
    demoStore
})

const useStore = () => useContext(context)

const stores = { demoStore, iconsStore }

export { useStore }

export default stores