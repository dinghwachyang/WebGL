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
    //gl.clearColor(1.0, 1.0, 1.0, 1.0); // White background
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(shaderProgram);

    // WebGL 的顶点坐标范围是 [-1, 1]，即左下角是 (-1, -1)，右上角是 (1, 1)
    // 定义一个简单的矩形， -0.5 和 0.5，表示在整个画布的中心区域，不是像素坐标，而是相对画布的比例坐标
    const vertices = new Float32Array([
        -0.5,  0.5,  // 左上
        -0.5, -0.5,  // 左下
         0.5, -0.5,  // 右下
         0.5,  0.5   // 右上
    ]);

    // 创建一个缓冲区对象，并绑定到 ARRAY_BUFFER 目标
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 获取顶点着色器中的 aVertexPosition 变量的存储位置   
    const vertexPos = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    // 将缓冲区对象中的数据分配给 vertexPos 变量，告诉WebGL如何从缓冲区中获取数据
    gl.vertexAttribPointer(vertexPos, 2, gl.FLOAT, false, 0, 0);
    // 启用顶点着色器中的 aVertexPosition 变量,相当于就是把顶点数据给VertexShader的aVertexPosition变量
    gl.enableVertexAttribArray(vertexPos);

    // 绘制类型， 从第几个顶点开始， 用几个顶点
    //gl.drawArrays(gl.TRIANGLES, 0, 3);
    // 绘制3个像素大小为20的点
    //gl.drawArrays(gl.POINTS, 0, 3);
    gl.drawArrays(gl.LINE_LOOP, 0, 4);
}

async function main() {
    const canvas = document.getElementById("webgl-canvas");
    const gl = initWebGL(canvas);
    const shaderProgram = await initShaders(gl);
    drawScene(gl, shaderProgram);
}

window.onload = main;