import { Logger } from "./logger.js";

export const canvas = <HTMLCanvasElement>document.querySelector("#canvas");
export let gl: WebGL2RenderingContext;

let is_initialized = false;

export function Init() {

    if (is_initialized) {
        return;
    }

    let _gl = canvas.getContext("webgl2");

    if (_gl == null) { // in case browser dosent support webgl
        const errMsg = "Couldn't iniialize WebGl context";
        Logger.Critical(errMsg);
        throw new Error(errMsg);
    }

    _gl.enable(_gl.DEPTH_TEST);
    _gl.depthFunc(_gl.LEQUAL);

    gl = _gl;
    is_initialized = true;
    console.log("INITIALIZATION !@#")

}
