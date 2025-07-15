// main.js file for initializing WebGL and rendering graphics

import ShaderLoader from './experiment/ShaderLoader.js';

function initWebGL(canvas) {
    let gl = null;
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {
        console.error("Unable to initialize WebGL. Your browser may not support it.");
    }
    return gl;
}

async function initShaders(gl) {
    // 支持异步加载 vertex 和 fragment shader 文件
    const shaderSources = await ShaderLoader.loadShaders({
        vertex: 'shaders/vertex/VertexExperiment.shader',
        fragment: 'shaders/fragment/FragmentExperiment.shader',
    });

    // 使用 ShaderLoader 封装的编译和链接方法
    const vertexShader = ShaderLoader.createShader(gl, gl.VERTEX_SHADER, shaderSources.vertex);
    const fragmentShader = ShaderLoader.createShader(gl, gl.FRAGMENT_SHADER, shaderSources.fragment);
    const shaderProgram = ShaderLoader.createProgram(gl, vertexShader, fragmentShader);
    return shaderProgram;
}

function drawScene(gl, shaderProgram) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(shaderProgram);

    // Define a simple triangle
    const vertices = new Float32Array([
        0.0,  0.5,
       -0.5, -0.5,
        0.5, -0.5,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const position = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(position);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

async function main() {
    const canvas = document.getElementById("webgl-canvas");
    const gl = initWebGL(canvas);
    const shaderProgram = await initShaders(gl);
    drawScene(gl, shaderProgram);
}

window.onload = main;