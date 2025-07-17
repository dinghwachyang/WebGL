import DrawBase from './Base/DrawBase.js';
import ShaderLoader from '../tools/ShaderLoader.js';

/**
 * 绘制颜色和坐标
 * 试验一些基础字段，属性，方法
*/
class DrawColorCoordinate extends DrawBase {

    CN_VERTEX_SHADER_SRC = `shaders/vertex/VColorCoordinate.shader`;
    CN_FRAGMENT_SHADER_SRC = `shaders/fragment/FColorCoordinate.shader`;

    async initShader() {
        const gl = this.gl;
        // 加载自定义 shader 文件
        const shaderSources = await ShaderLoader.loadShaders({
            vertex: this.CN_VERTEX_SHADER_SRC,
            fragment: this.CN_FRAGMENT_SHADER_SRC,
        });
        const vertexShader = ShaderLoader.createShader(gl, gl.VERTEX_SHADER, shaderSources.vertex);
        const fragmentShader = ShaderLoader.createShader(gl, gl.FRAGMENT_SHADER, shaderSources.fragment);
        return ShaderLoader.createProgram(gl, vertexShader, fragmentShader);
    }

    setup() {
        const gl = this.gl;
        // 三角形顶点位置和颜色
        const vertices = new Float32Array([
            // x,    y,     r,   g,   b
            0.0,   0.5,   1.0, 0.0, 0.0, // 顶点1 红
            -0.5, -0.5,   0.0, 1.0, 0.0, // 顶点2 绿
            0.5,  -0.5,   0.0, 0.0, 1.0  // 顶点3 蓝
        ]);
        const FSIZE = vertices.BYTES_PER_ELEMENT;
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const aPosition = gl.getAttribLocation(this.shaderProgram, 'aPosition');
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, FSIZE * 5, 0);
        gl.enableVertexAttribArray(aPosition);

        const aColor = gl.getAttribLocation(this.shaderProgram, 'aColor');
        gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
        gl.enableVertexAttribArray(aColor);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    draw() {
        this.gl.drawArrays(this.gl.LINE_LOOP, 0, 4);
    }
}

export default DrawColorCoordinate;