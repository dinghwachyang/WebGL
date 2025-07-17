class ShaderLoader {
    // 加载单个 shader 文件，返回 Promise<string>
    static async loadShader(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Error loading shader file:', error);
            throw error;
        }
    }

    // 批量加载多个 shader 文件，urls: { [key: string]: string }
    // 返回 Promise<{ [key: string]: string }>
    static async loadShaders(urls) {
        const entries = Object.entries(urls);
        const results = await Promise.all(entries.map(async ([key, url]) => {
            const text = await ShaderLoader.loadShader(url);
            return [key, text];
        }));
        return Object.fromEntries(results);
    }

    // 编译 shader，类型为 gl.VERTEX_SHADER 或 gl.FRAGMENT_SHADER
    static createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const info = gl.getShaderInfoLog(shader);
            console.error('Shader compile error:', info);
            gl.deleteShader(shader);
            throw new Error('Shader compile failed: ' + info);
        }
        return shader;
    }

    // 创建并链接 program，传入已编译的 vertexShader 和 fragmentShader
    static createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(program);
            console.error('Program link error:', info);
            gl.deleteProgram(program);
            throw new Error('Program link failed: ' + info);
        }
        return program;
    }
}

export default ShaderLoader; 