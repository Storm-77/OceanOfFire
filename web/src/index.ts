import { IndexBuffer } from "./core/buffer.js";
import { RendererCommands } from "./core/render_commands.js";
import { gl, Init } from "./core/setup.js";
import { Shader } from "./core/shader.js";
import { Texture2d } from "./core/texture.js";
import { LayoutAttribute, VertexArray } from "./core/vertex_array.js";

const vertexSource = `
    #define GLSLIFY 1

    attribute vec2 position;    
    attribute vec4 v_color;    
    attribute vec2 tex;    
    varying vec4 color;    
    varying vec2 vTex;


    void main(void) {
        gl_Position = vec4(position, -1.0, 1.0);
        color = v_color;
        vTex = tex;

    }
`;

const fragmentSource = `
    #define GLSLIFY 1
    precision mediump float;

    varying vec4 color;    
    varying vec2 vTex;

    uniform sampler2D texId;

    void main(void) {
        gl_FragColor = texture2D(texId,vTex);

    }
`;



window.addEventListener("load", async () => {

    Init();

    const va = new VertexArray();

    va.Buffer.UploadData(

        // Positions
        [
            0.5, 0.5, 0.2, 1.0, 0.2, 1.0, 1.0, 0.0,// Top right
            0.5, -0.5, 0.2, 0.2, 1.0, 1.0, 1.0, 1.0, // Bottom right
            -0.5, -0.5, 1.0, 0.2, 0.2, 1.0, 0.0, 1.0,// Bottom left
            -0.5, 0.5, 0.2, 1.0, 0.2, 1.0, 0.0, 0.0,// Top left 

        ]
    )

    const ib = new IndexBuffer();
    ib.UploadData([0, 1, 3, 1, 2, 3]);

    const texture = new Texture2d();
    texture.Fetch("https://picsum.photos/800/400");

    const shader = new Shader();

    shader.Compile(vertexSource, fragmentSource);

    shader.SetUniformInt("texId", 0);

    let time_old = 0;

    va.Layout.Add(LayoutAttribute.vec2f);
    va.Layout.Add(LayoutAttribute.vec4f);
    va.Layout.Add(LayoutAttribute.vec2f);

    const animate = function(time: number) {
        // @ts-ignore
        let dt = time - time_old;
        time_old = time;

        RendererCommands.UseViewPort();
        RendererCommands.Clear();

        shader.Bind();

        va.Bind();
        ib.Bind();

        gl.drawElements(gl.TRIANGLES, ib.Count(), gl.UNSIGNED_SHORT, 0);

        window.requestAnimationFrame(animate);

    }

    animate(0);

})
