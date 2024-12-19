import { Logger } from "./logger.js";
import { gl } from "./setup.js"

export class VertexBuffer {

    private m_GlBuffer: WebGLBuffer;

    constructor() {

        const _glId = gl.createBuffer();
        if (_glId == null) {
            Logger.Error("Couldn't create webgl buffer object");
            throw new Error("Couldn't create webgl buffer object");
        }
        this.m_GlBuffer = _glId;
    }

    public Bind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.m_GlBuffer);
    }

    public UploadData(data: number[]): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.m_GlBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    public UnBind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    public Kill(): void {
        gl.deleteBuffer(this.m_GlBuffer);
    }
}

export class IndexBuffer {

    private m_GlBuffer: WebGLBuffer;
    private m_VerticesCount: number;

    constructor() {
        const _glId = gl.createBuffer();
        if (_glId == null) {
            Logger.Error("Couldn't create webgl buffer object");
            throw new Error("Couldn't create webgl buffer object");
        }
        this.m_GlBuffer = _glId;
        this.m_VerticesCount = 0;
    }

    public Bind(): void {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_GlBuffer);
    }

    public UnBind(): void {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    public UploadData(data: number[]): void {
        this.m_VerticesCount = data.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_GlBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    public Kill(): void {
        gl.deleteBuffer(this.m_GlBuffer);
    }

    public Count(): number {
        return this.m_VerticesCount;
    }
}

