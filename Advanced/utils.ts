import { MK_NULL, MK_ARRAY, RuntimeVal, FunctionValue, NativeFnValue, ReturnSignal } from "../../values.ts";
import Environment from "../../environment.ts";
import { evaluate } from "../../interpreter.ts";

export function invokeCallback(
    fn: RuntimeVal, 
    args: RuntimeVal[], 
    env: Environment
): RuntimeVal {
    if (fn.type === "function") {
        const func = fn as FunctionValue;
        const scope = new Environment(func.declarationEnv);

        for (let i = 0; i < func.parameters.length; i++) {
            const paramName = func.parameters[i];
            scope.declareVar(paramName, args[i] ?? MK_NULL(), false);
        }

        if (func.variadicParam) {
            const variadicArgs = args.slice(func.parameters.length);
            scope.declareVar(func.variadicParam, MK_ARRAY(variadicArgs), false);
        }

        let lastResult: RuntimeVal = MK_NULL();
        try {
            for (const stmt of func.body) {
                lastResult = evaluate(stmt, scope);
            }
        } catch (e) {
            if (e instanceof ReturnSignal) {
                return e.value;
            }
            throw e;
        }
        return lastResult;
    } 
    
    if (fn.type === "native-fn") {
        return (fn as NativeFnValue).call(args, env);
    }

    throw `Runtime Error: Type '${fn.type}' is not a callable function.`;
}