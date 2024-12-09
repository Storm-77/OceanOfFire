
window.addEventListener("load", async () => {

    const socket = new WebSocket('ws://localhost:8080/ws');

    const response = await fetch('http://localhost:8080/');
    const result = await response.json();
    console.log(result)


    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    ctx.strokeStyle = 'red';
    
    ctx.moveTo(0, 0);
    ctx.lineTo(1280, 720);


    ctx.moveTo(1280, 0);
    ctx.lineTo(0, 720);

    ctx.stroke();

})
