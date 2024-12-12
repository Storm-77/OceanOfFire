import { gl } from "./setup.js"

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
    }


}


class VertexLayout {

    private attribs: LayoutAttribute[] = [];

    constructor() {
        //todo use vertex array
    }

    public Add(att: LayoutAttribute) {
        this.attribs.push(att);
    }

    public Apply(startIdx: number = 0): void {

        let vertexSize = 0;
        this.attribs.forEach(atr => {
            vertexSize += helper.getAttribComponentCount(atr) * helper.getSizeOfType(helper.getAttribType(atr));
        });

        let offset = 0;
        for (let idx = startIdx; idx < this.attribs.length + startIdx; idx++) {
            const el = this.attribs[idx - startIdx];
            const componentCount = helper.getAttribComponentCount(el);
            const type = helper.getAttribType(el);
            gl.vertexAttribPointer(idx, componentCount, type, false, vertexSize, offset);
            offset += componentCount * helper.getSizeOfType(type);
            gl.enableVertexAttribArray(idx);
        }
    }

}

export class VertexBuffer {

    private m_GlBuffer;
    public layout: VertexLayout;

    constructor() {
        this.m_GlBuffer = gl.createBuffer();
        this.layout = new VertexLayout();
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

    private m_GlBuffer;

    constructor() {
        this.m_GlBuffer = gl.createBuffer();
    }

    public Bind(): void {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_GlBuffer);
    }

    public UnBind(): void {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    public UploadData(data: number[]): void {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_GlBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }

    public Kill(): void {
        gl.deleteBuffer(this.m_GlBuffer);
    }
}

