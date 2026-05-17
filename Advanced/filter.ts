// deno-lint-ignore-file no-explicit-any
import { MK_NATIVE_FN, MK_NUMBER, MK_ARRAY, ArrayVal, RuntimeVal } from "../../values.ts";
import Environment from "../../environment.ts";
import { invokeCallback } from "./utils.ts";

export function registerFilter(env: Environment) {
    env.declareVar("filter", MK_NATIVE_FN((args, currentEnv) => {
        if (args.length < 2) throw "Runtime Error: filter() requires an array and a predicate function.";
        if (args[0].type !== "array") throw `Runtime Error: filter() expects an array, got '${args[0].type}'`;
        
        const arrayVal = args[0] as ArrayVal;
        const callback = args[1];
        const resultElements: RuntimeVal[] = [];

        for (let i = 0; i < arrayVal.elements.length; i++) {
            const item = arrayVal.elements[i];
            const index = MK_NUMBER(i);
            const condition = invokeCallback(callback, [item, index], currentEnv);
            
            const isTruthy = condition.type === "boolean" 
                ? (condition as any).value 
                : condition.type !== "null";

            if (isTruthy) {
                resultElements.push(item);
            }
        }

        return MK_ARRAY(resultElements);
    }), true);
}