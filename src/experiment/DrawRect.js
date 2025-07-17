import DrawBase from './Base/DrawBase.js';
import ShaderLoader from '../tools/ShaderLoader.js';

/*
 * 绘制矩形
*/
class DrawRect extends DrawBase {

    CN_VERTEX_SHADER_SRC = `shaders/vertex/VertexExperiment.shader`;
    CN_FRAGMENT_SHADER_SRC = `shaders/fragment/FragmentExperiment.shader`;

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
        // 定义矩形顶点
        const vertices = new Float32Array([
            -0.5,  0.5,
            -0.5, -0.5,
             0.5, -0.5,
             0.5,  0.5
        ]);
        // 创建缓冲区对象
        this.vertexBuffer = gl.createBuffer();
        // 绑定缓冲区对象
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        // 将顶点数据复制到缓冲区对象
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        // 获取顶点着色器中的 aVertexPosition 变量的存储位置
        const vertexPos = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
        // 将缓冲区对象中的数据分配给 vertexPos 变量，告诉WebGL如何从缓冲区中获取数据
        gl.vertexAttribPointer(vertexPos, 2, gl.FLOAT, false, 0, 0);
        // 启用顶点着色器中的 aVertexPosition 变量,相当于就是把顶点数据给VertexShader的aVertexPosition变量
        gl.enableVertexAttribArray(vertexPos);
    }

    draw() {
        // 绘制矩形,LINE_LOOP 表示绘制一个闭合的线圈，即连接第一个和最后一个顶点
        this.gl.drawArrays(this.gl.LINE_LOOP, 0, 4);
    }
}

export default DrawRect;