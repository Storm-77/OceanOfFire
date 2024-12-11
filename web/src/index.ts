import { VertexBuffer } from "./core/buffer.js";
import { Init } from "./core/setup.js";

window.addEventListener("load", async () => {

    const socket = new WebSocket('ws://localhost:8080/ws');

    const response = await fetch('http://localhost:8080/');
    const result = await response.json();
    console.log(result)

    Init();

    // const vb = new VertexBuffer();
    //
    // vb.UploadData(
    //
    //     // Positions
    //     [
    //         -0.5, -0.5,  // Bottom left
    //         0.5, -0.5,  // Bottom right
    //         0.0, 0.5   // Top
    //     ]
    // )





})
export const testFunction = () => {
    console.log("This is a core test");
};

