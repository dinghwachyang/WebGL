// main.js file for initializing WebGL and rendering graphics

import DrawRect from './experiment/DrawRect.js';
import DrawColorCoordinate from './experiment/DrawColorCoordinate.js';

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
    const gl = initWebGL(canvas);
    // 只需替换这里的类即可切换实验
    //const drawInstance = new DrawRect(gl);
    const drawInstance = new DrawColorCoordinate(gl);
    await drawInstance.render();
}

window.onload = main;