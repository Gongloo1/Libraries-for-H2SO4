import { MK_NATIVE_FN, MK_NUMBER, MK_ARRAY, RuntimeVal, NumberVal } from "../../values.ts";
import Environment from "../../environment.ts";

export function registerRange(env: Environment) {
    env.declareVar("range", MK_NATIVE_FN((args) => {
        if (args.length < 2) throw "Runtime Error: range() requires a start and end parameter.";
        if (args[0].type !== "number" || args[1].type !== "number") {
            throw "Runtime Error: range() arguments must be numbers.";
        }

        // Cast explicitly to your NumberVal interface to access .value cleanly
        const start = (args[0] as NumberVal).value;
        const end = (args[1] as NumberVal).value;
        const step = args.length > 2 && args[2].type === "number" 
            ? (args[2] as NumberVal).value 
            : 1;

        if (step === 0) throw "Runtime Error: range() step size cannot be 0.";

        const elements: RuntimeVal[] = [];
        if (step > 0) {
            for (let i = start; i < end; i += step) {
                elements.push(MK_NUMBER(i));
            }
        } else {
            for (let i = start; i > end; i += step) {
                elements.push(MK_NUMBER(i));
            }
        }

        return MK_ARRAY(elements);
    }), true);
}