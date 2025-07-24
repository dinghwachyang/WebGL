precision mediump float;
// attribute 声明顶点属性
attribute vec2 aPosition;
attribute vec3 aColor;
// varying 声明顶点着色器输出
varying vec3 vColor;
void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
    vColor = aColor;
}