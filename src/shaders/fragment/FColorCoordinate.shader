// 设置精度
precision mediump float;
// 从顶点着色器传入的varying颜色变量
varying vec3 vColor;
void main() {
    gl_FragColor = vec4(vColor, 1.0);
}