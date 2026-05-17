// deno-lint-ignore-file no-explicit-any
import { MK_NATIVE_FN, MK_NUMBER } from "../../values.ts";
import Environment from "../../environment.ts";
import { invokeCallback } from "./utils.ts";

export function registerBenchmark(env: Environment) {
    env.declareVar("benchmark", MK_NATIVE_FN((args, currentEnv) => {
        if (args.length < 1) throw "Runtime Error: benchmark() requires a callback function.";
        const callback = args[0];
        const iterations = args.length > 1 && args[1].type === "number" ? (args[1] as any).value : 1;

        const startTime = performance.now();
        for (let i = 0; i < iterations; i++) {
            invokeCallback(callback, [MK_NUMBER(i)], currentEnv);
        }
        const endTime = performance.now();

        return MK_NUMBER(endTime - startTime);
    }), true);
}