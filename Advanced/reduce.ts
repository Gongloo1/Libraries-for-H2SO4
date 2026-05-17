import { MK_NATIVE_FN, MK_NUMBER, ArrayVal } from "../../values.ts";
import Environment from "../../environment.ts";
import { invokeCallback } from "./utils.ts";

export function registerReduce(env: Environment) {
    env.declareVar("reduce", MK_NATIVE_FN((args, currentEnv) => {
        if (args.length < 3) throw "Runtime Error: reduce() requires an array, an accumulator function, and an initial value.";
        if (args[0].type !== "array") throw `Runtime Error: reduce() expects an array, got '${args[0].type}'`;
        
        const arrayVal = args[0] as ArrayVal;
        const callback = args[1];
        let accumulator = args[2];

        for (let i = 0; i < arrayVal.elements.length; i++) {
            const item = arrayVal.elements[i];
            const index = MK_NUMBER(i);
            accumulator = invokeCallback(callback, [accumulator, item, index], currentEnv);
        }

        return accumulator;
    }), true);
}