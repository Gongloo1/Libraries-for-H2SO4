import Environment from "../../environment.ts";
import { registerRange } from "./range.ts";
import { registerMap } from "./map.ts";
import { registerFilter } from "./filter.ts";
import { registerReduce } from "./reduce.ts";
import { registerBenchmark } from "./benchmark.ts";

export function registerAdvanced(env: Environment) {
    registerRange(env);
    registerMap(env);
    registerFilter(env);
    registerReduce(env);
    registerBenchmark(env);
}