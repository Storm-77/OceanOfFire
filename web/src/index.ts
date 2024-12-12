import { IndexBuffer, LayoutAttribute, VertexBuffer } from "./core/buffer.js";
import { RendererCommands } from "./core/render_commands.js";
import { gl, Init } from "./core/setup.js";
import { Shader } from "./core/shader.js";

const vertexSource = `
    #define GLSLIFY 1

    attribute vec2 position;    
    attribute vec4 v_color;    
    varying vec4 color;    

    void main(void) {
        gl_Position = vec4(position, -1.0, 1.0);
        color = v_color;
    }
`;

const fragmentSource = `
    #define GLSLIFY 1
    precision mediump float;

    varying vec4 color;    
    void main(void) {
        gl_FragColor = color; 
    }
`;



window.addEventListener("load", async () => {

    const socket = new WebSocket('ws://localhost:8080/ws');

    const response = await fetch('http://localhost:8080/');
    const result = await response.json();
    console.log(result)

    Init();

    const vb = new VertexBuffer();

    vb.UploadData(

        // Positions
        [
            -0.5, -0.5, 1.0, 0.2, 0.2, 1.0, // Bottom left
            0.0, 0.5, 0.2, 1.0, 0.2, 1.0, // Top
            0.5, -0.5, 0.2, 0.2, 1.0, 1.0 // Bottom right
        ]
    )

    const ib = new IndexBuffer();
    ib.UploadData([0, 1, 2]);

    const shader = new Shader();
    shader.Compile(vertexSource, fragmentSource);

    let time_old = 0;

    vb.layout.Add(LayoutAttribute.vec2f);
    vb.layout.Add(LayoutAttribute.vec4f);

    const animate = function(time: number) {
        // let dt = time - time_old;
        time_old = time;

        RendererCommands.UseViewPort();
        RendererCommands.Clear();

        shader.Bind();

        vb.Bind();
        ib.Bind();


        vb.layout.Apply();

        gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);


        window.requestAnimationFrame(animate);


    }

    animate(0);

})
