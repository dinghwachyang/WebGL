precision mediump float;

uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;

void main() {
    gl_FragColor = texture2D(u_Sampler, v_TexCoord);

    // 测试看能否显示出颜色来
    //gl_FragColor = vec4(1,0,0,1);
}