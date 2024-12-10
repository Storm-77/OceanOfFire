
window.addEventListener("load", async () => {

    const socket = new WebSocket('ws://localhost:8080/ws');
    const response = await fetch('http://localhost:8080/');
    const result = await response.json();
    console.log(result)


    const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    type Player = {
        position: { x: number, y: number },
        velocity: { x: number, y: number },
        size: number,
        speed: number,
        isJumping: boolean
    }
    
    const player: Player = {
        position: { x: 100, y: 100 },
        velocity: { x: 0, y: 0 },
        size: 50,
        speed: 3,
        isJumping: true
    };
    
    const gravity = 0.5;
    const friction = 0.75;
    const jumpForce = -13;
    
    let lastTime = 0;
    const targetFPS = 100;
    const timeStep = 1000 / targetFPS;
    
    function drawplayer(): void {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.fillRect(player.position.x, player.position.y, player.size, player.size);
    }
    
    function moveplayer(deltaTime: number): void {
        let dx = 0;
        let dy = 0;
    
        if (keys["ArrowUp"] && !player.isJumping) {
            player.velocity.y = jumpForce;
            player.isJumping = true;
        }
        if (keys["ArrowDown"]) dy += 1;
        if (keys["ArrowLeft"]) dx -= 1;
        if (keys["ArrowRight"]) dx += 1;
    
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        if (magnitude > 0) {
            dx /= magnitude;
            dy /= magnitude;
        }
    
        player.velocity.x += dx * player.speed;
        player.velocity.y += dy * player.speed;
    
        player.velocity.y += gravity;
    
        if (player.position.y + player.size + player.velocity.y >= canvas.height) {
            player.velocity.y = 0;
            player.position.y = canvas.height - player.size;
            player.isJumping = false;
        }
    
        player.velocity.x *= friction;
    
        player.position.x += player.velocity.x;
        player.position.y += player.velocity.y;
    
        player.position.x = Math.max(0, Math.min(canvas.width - player.size, player.position.x));
        player.position.y = Math.max(0, Math.min(canvas.height - player.size, player.position.y));
    }
    
    const keys: { [key: string]: boolean } = {};
    
    window.addEventListener("keydown", (event: KeyboardEvent): void => {
        keys[event.key] = true;
    });
    
    window.addEventListener("keyup", (event: KeyboardEvent): void => {
        keys[event.key] = false;
    });
    
    function gameLoop(timestamp: number): void {
        const deltaTime = timestamp - lastTime;
        if (deltaTime >= timeStep) {
            moveplayer(deltaTime);
            drawplayer();
            lastTime = timestamp;
        }
        requestAnimationFrame(gameLoop);
    }
    
    requestAnimationFrame(gameLoop);
})
