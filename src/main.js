// main.js file for initializing WebGL and rendering graphics

/* import DrawRect from './experiment/DrawRect.js';
import DrawColorCoordinate from './experiment/DrawColorCoordinate.js'; */
import DrawTexture from './experiment/DrawTexture.js';

function initWebGL(canvas) {
    let gl = null;
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {
        console.error("Unable to initialize WebGL. Your browser may not support it.");
    }
    return gl;
}

async function main() {
    const canvas = document.getElementById("webgl-canvas");
    //让 canvas 在页面上始终铺满整个浏览器窗口，无论窗口多大，canvas 都会自适应填满，每次窗口大小变化时同步更新 canvas 的 width/height 属性。
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //把 canvas 的 CSS 宽高设置为视口宽高的 100%（vw = viewport width）
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    const gl = initWebGL(canvas);
    // 只需替换这里的类即可切换实验
    //const drawInstance = new DrawRect(gl);
    //const drawInstance = new DrawColorCoordinate(gl);
    const drawInstance = new DrawTexture(gl);
    await drawInstance.render();
}

window.onload = main;