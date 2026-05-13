varying vec2 vUv;
uniform float uTime;
uniform vec3 uColor;

void main() {
  float dist = distance(vUv, vec2(0.5));
  float pulse = sin(uTime * 2.0 - dist * 10.0) * 0.5 + 0.5;
  float alpha = smoothstep(0.5, 0.2, dist) * pulse;
  
  gl_FragColor = vec4(uColor, alpha);
}
