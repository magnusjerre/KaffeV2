import {IAction, IBrygg} from "../models";
import {createBrygg} from "../factory";
import {Action} from "history";

const bryggReducer = (state: IBrygg[] = [createBrygg("Dagens", "Jerre", "1123", 2, 2)], action: IAction<IBrygg>) : IBrygg[] => {
    return state
}

export default bryggReducer