import { VertexBuffer } from "./buffer";
import { Logger } from "./logger";
import { gl } from "./setup";


export enum LayoutAttribute {
    none = 0,
    vec1f,
    vec2f,
    vec3f,
    vec4f
}

export type WebGlDataFormat = number;

const helper = {

    getAttribType: function(attrib: LayoutAttribute): WebGlDataFormat {
        const attribTypes = new Map<LayoutAttribute, number>([
            [LayoutAttribute.vec1f, gl.FLOAT],
            [LayoutAttribute.vec2f, gl.FLOAT],
            [LayoutAttribute.vec3f, gl.FLOAT],
            [LayoutAttribute.vec4f, gl.FLOAT],
        ]);
        if (!attribTypes.has(attrib)) {
            throw new Error("Invalid opengl data attribute")
        }
        return attribTypes.get(attrib)!;
    },

    getSizeOfType: function(type: WebGlDataFormat): number {

        const sizeOfType = new Map<number, number>([
            [gl.FLOAT, 4]
        ]);

        if (!sizeOfType.has(type)) {
            throw new Error("Unsupported opengl data type")
        }
        return sizeOfType.get(type)!;

    },

    getAttribComponentCount: function(attrib: LayoutAttribute): number {
        const attribComponentCount = new Map<LayoutAttribute, number>([
            [LayoutAttribute.vec1f, 1],
            [LayoutAttribute.vec2f, 2],
            [LayoutAttribute.vec3f, 3],
            [LayoutAttribute.vec4f, 4],
        ]);
        if (!attribComponentCount.has(attrib)) {
            throw new Error("Unsupported attribute type")
        }
        return attribComponentCount.get(attrib)!;
    },

    applyVertexLayout: function(attribs: LayoutAttribute[], startIdx: number = 0): void {

        let vertexSize = 0;
        attribs.forEach(atr => {
            vertexSize += helper.getAttribComponentCount(atr) * helper.getSizeOfType(helper.getAttribType(atr));
        });

        let offset = 0;
        for (let idx = startIdx; idx < attribs.length + startIdx; idx++) {
            const el = attribs[idx - startIdx];
            const componentCount = helper.getAttribComponentCount(el);
            const type = helper.getAttribType(el);
            gl.vertexAttribPointer(idx, componentCount, type, false, vertexSize, offset);
            offset += componentCount * helper.getSizeOfType(type);
            gl.enableVertexAttribArray(idx);
        }
    }

}


class VertexLayout {

    private m_attribs: LayoutAttribute[] = [];
    private m_hasChanged: boolean = true;

    constructor() {
    }

    public _refresh(): void {
        if (this.m_attribs.length === 0) {
            Logger.Error("VertexLayout cannot be unset");
            throw new Error("VertexLayout cannot be unset");
        }

        helper.applyVertexLayout(this.m_attribs);
        this.m_hasChanged = false;
    }

    public Add(att: LayoutAttribute) {
        this.m_attribs.push(att);
        this.m_hasChanged = true;
    }

    public Get(): LayoutAttribute[] {
        return this.m_attribs;
    }

    public HasChanged(): boolean {
        return this.m_hasChanged;
    }

    public InUnset(): boolean {
        return this.m_attribs.length === 0;
    }

}


export class VertexArray {

    private m_glVertexArray: WebGLVertexArrayObject;

    public Buffer: VertexBuffer = new VertexBuffer();
    public Layout: VertexLayout = new VertexLayout();

    constructor() {

        const _glid = gl.createVertexArray();

        if (_glid == null) {
            Logger.Error("Couldn't create webgl vertex array");
            throw new Error("Couldn't create webgl vertex array");
        }
        this.m_glVertexArray = _glid;
    }

    public Bind(): void {

        if (!this.Layout.HasChanged()) {
            gl.bindVertexArray(this.m_glVertexArray);
            return;
        }

        //check empty buffer case

        this.Buffer.Bind();
        gl.bindVertexArray(this.m_glVertexArray);
        this.Layout._refresh();
    }

    public UnBind(): void {
        gl.bindVertexArray(null);
        this.Buffer.UnBind();
    }

    public Kill(): void {
        gl.deleteVertexArray(this.m_glVertexArray);
        this.Buffer.Kill();
    }

}
