// main.js file for initializing WebGL and rendering graphics

function initWebGL(canvas) {
    let gl = null;
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {
        console.error("Unable to initialize WebGL. Your browser may not support it.");
    }
    return gl;
}

function initShaders(gl) {
    const vertexShaderSource = `
        attribute vec4 aVertexPosition;
        void main(void) {
            gl_Position = aVertexPosition;
        }
    `;

    const fragmentShaderSource = `
        void main(void) {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // White color
        }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

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

function main() {
    const canvas = document.getElementById("webgl-canvas");
    const gl = initWebGL(canvas);
    const shaderProgram = initShaders(gl);
    drawScene(gl, shaderProgram);
}

window.onload = main;