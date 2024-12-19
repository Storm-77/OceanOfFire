import { Logger } from "./logger.js";
import { gl } from "./setup.js";

export class Shader {

    private m_programId: WebGLProgram = WebGLProgram.prototype;
    private m_uniformLocations: Map<string, WebGLUniformLocation>;

    constructor() {

        const _pid = gl.createProgram();
        if (_pid == null) {
            Logger.Error("Couldn't create webgl program");
            throw new Error("Couldn't create webgl program");
        }
        this.m_programId = _pid;
        this.m_uniformLocations = new Map<string, WebGLUniformLocation>();
    }

    public Compile(VertexSrc: string, FragmentSrc: string): void {

        let vertexShaderId: WebGLShader = gl.createShader(gl.VERTEX_SHADER)!;

        gl.shaderSource(vertexShaderId, VertexSrc);
        gl.compileShader(vertexShaderId);

        const success_vertex = gl.getShaderParameter(vertexShaderId, gl.COMPILE_STATUS);
        if (!success_vertex) {
            const errorLog = gl.getShaderInfoLog(vertexShaderId);
            console.error('Shader compilation failed:', errorLog);
        }

        let fragmentShaderId = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShaderId, FragmentSrc);
        gl.compileShader(fragmentShaderId);

        const success_fragment = gl.getShaderParameter(fragmentShaderId, gl.COMPILE_STATUS);
        if (!success_fragment) {
            const errorLog = gl.getShaderInfoLog(fragmentShaderId);
            console.error('Shader compilation failed:', errorLog);
        }

        gl.attachShader(this.m_programId, vertexShaderId);
        gl.attachShader(this.m_programId, fragmentShaderId);

        gl.linkProgram(this.m_programId);

        gl.detachShader(this.m_programId, vertexShaderId);
        gl.detachShader(this.m_programId, fragmentShaderId);
        gl.deleteShader(vertexShaderId);
        gl.deleteShader(fragmentShaderId);
    }

    public Bind(): void {
        gl.useProgram(this.m_programId);
    }

    public Kill(): void {
        gl.deleteProgram(this.m_programId);
    }

    public GetGlId(): WebGLProgram {
        return this.m_programId;
    }

    private GetUniformLocation(name: string): WebGLUniformLocation {
        if (this.m_uniformLocations.has(name)) {
            return this.m_uniformLocations.get(name)!;
        }

        let location = gl.getUniformLocation(this.m_programId, name)!;
        this.m_uniformLocations.set(name, location);
        return location;
    }

    public SetUniformMat4(name: string, mat: Float32Array): void {
        gl.uniformMatrix4fv(this.GetUniformLocation(name), false, mat);
    }

    public SetUniformInt(name: string, num: number): void {
        gl.uniform1i(this.GetUniformLocation(name), num);
    }

    public GetAttribLocation(name: string): number {
        return gl.getAttribLocation(this.m_programId, name);
    }

    //todo add deletnion afterwards

}
