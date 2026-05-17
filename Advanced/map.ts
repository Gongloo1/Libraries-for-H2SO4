import { MK_NATIVE_FN, MK_NUMBER, MK_ARRAY, ArrayVal, RuntimeVal } from "../../values.ts";
import Environment from "../../environment.ts";
import { invokeCallback } from "./utils.ts";

export function registerMap(env: Environment) {
    env.declareVar("map", MK_NATIVE_FN((args, currentEnv) => {
        if (args.length < 2) throw "Runtime Error: map() requires an array and a callback function.";
        if (args[0].type !== "array") throw `Runtime Error: map() expects an array, got '${args[0].type}'`;
        
        const arrayVal = args[0] as ArrayVal;
        const callback = args[1];
        const resultElements: RuntimeVal[] = [];

        for (let i = 0; i < arrayVal.elements.length; i++) {
            const item = arrayVal.elements[i];
            const index = MK_NUMBER(i);
            const evaluated = invokeCallback(callback, [item, index], currentEnv);
            resultElements.push(evaluated);
        }

        return MK_ARRAY(resultElements);
    }), true);
}