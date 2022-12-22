import store from "./store"
import{setUser} from "./store/auth";

export const userHendle = data =>{
    store.dispatch(setUser(data))
}