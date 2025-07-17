attribute vec4 aVertexPosition;
void main(void) {
    // 当前顶点的裁剪坐标空间
    gl_Position = aVertexPosition;
    // 当前顶点的像素大小
    gl_PointSize = 5.0;
}