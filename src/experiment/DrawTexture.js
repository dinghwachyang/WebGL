import DrawBase from './Base/DrawBase.js';
import ShaderLoader from '../tools/ShaderLoader.js';

/*
 * 绘制纹理
 * 本质上纹理就是一张图片，通过纹理映射的方式将图片映射到模型上（在渲染时，将纹理贴到模型上）
 * 纹理可以表现复杂的颜色、细节、材质，而不只是单一颜色
 * 
 * 纹理坐标，是一个二维坐标，通常是用(u,v)表示，u和v的取值范围都是[0,1]，表示纹理图片的左下角为(0,0)，右上角为(1,1)
 * 它的作用是：指定几何体上每个顶点对应纹理图片的哪个位置
 * 
 * 创建纹理对象：gl.createTexture()
 * 绑定纹理对象：gl.bindTexture(gl.TEXTURE_2D, texture)
 * 设置参数：
 * gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT) // 水平重复
 * gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE) // 垂直边缘拉伸
 * gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR) // 缩小时线性插值
 * gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST) // 放大时最近邻
 * 
*/
class DrawTexture extends DrawBase {

    CN_VERTEX_SHADER_SRC = `shaders/vertex/VTexture.shader`;
    CN_FRAGMENT_SHADER_SRC = `shaders/fragment/FTexture.shader`;

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
        // 定义矩形顶点和纹理坐标
        const vertices = new Float32Array([
            // x,    y,     u,   v
            -0.5,  0.5,   0.0, 1.0, // 左上
            -0.5, -0.5,   0.0, 0.0, // 左下
             0.5,  0.5,   1.0, 1.0, // 右上
            -0.5, -0.5,   0.0, 0.0, // 左下
             0.5, -0.5,   1.0, 0.0, // 右下
             0.5,  0.5,   1.0, 1.0  // 右上
        ]);

        const gl = this.gl;
        // 获取每个元素的字节数
        const FSIZE = vertices.BYTES_PER_ELEMENT;
        // 创建缓冲区对象并传递顶点和纹理坐标
        const vertexBuffer = gl.createBuffer();
        // 绑定缓冲区对象
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        // 将顶点数据复制到缓冲区对象
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        // 获取顶点着色器中的 a_Position 变量的存储位置
        const a_Position = gl.getAttribLocation(this.shaderProgram, 'a_Position');
        // 将缓冲区对象中的数据分配给 a_Position 变量，告诉WebGL如何从缓冲区中获取数据
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
        gl.enableVertexAttribArray(a_Position);

        // 获取顶点着色器中的 a_TexCoord 变量的存储位置
        const a_TexCoord = gl.getAttribLocation(this.shaderProgram, 'a_TexCoord');
        // 将缓冲区对象中的数据分配给 a_TexCoord 变量，告诉WebGL如何从缓冲区中获取数据
        gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
        // 启用顶点着色器中的 a_TexCoord 变量
        gl.enableVertexAttribArray(a_TexCoord);

        // 创建纹理对象
        const texture = gl.createTexture();
        // 获取片元着色器中的 u_Sampler 变量的存储位置
        const u_Sampler = gl.getUniformLocation(this.shaderProgram, 'u_Sampler');
        // 创建图片对象
        const image = new Image();
        image.src = 'assets/images/HeadIcon.jpg';
        return new Promise((resolve) => {
            image.onload = () => {
                console.log('Image loaded => ', image.width, image.height, image.outerHTML);
                // 设置纹理的参数,将图片的y轴翻转
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
                // 激活纹理单元0
                gl.activeTexture(gl.TEXTURE0);
                // 绑定纹理对象
                gl.bindTexture(gl.TEXTURE_2D, texture);
                // 设置纹理的参数
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                // 将图片数据赋值给纹理对象
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                // 将纹理对象赋值给片元着色器中的 u_Sampler 变量
                gl.uniform1i(u_Sampler, 0);
                // 通知进行下一步流程
                resolve(true);
            }
            image.onerror = () => resolve(false);
        })
    }

    draw() {
        const gl = this.gl;
        // 清除颜色缓冲区
        gl.clear(gl.COLOR_BUFFER_BIT);
        // 绘制矩形
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}

export default DrawTexture;