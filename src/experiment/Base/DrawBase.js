class DrawBase {
    constructor(gl) {
        this.gl = gl;
        this.shaderProgram = null;
    }

    // 子类必须实现：加载 shader 并创建 program
    async initShader() {
        throw new Error('initShader() must be implemented by subclass');
    }

    // 子类可重写：设置 attribute、uniform、缓冲区等。返回 true/Promise<true> 表示可以绘制。
    async setup() { return true; }

    // 子类可重写：执行绘制命令
    draw() {}

    // 模板方法，只有 setup() 返回 true 才执行 draw()
    async render() {
        if (!this.shaderProgram) {
            this.shaderProgram = await this.initShader();
        }
        const gl = this.gl;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(this.shaderProgram);
        const canDraw = await this.setup();
        if (canDraw) {
            this.draw();
        }
    }
}

export default DrawBase; 