export const fragmentShader = `
uniform float blendFactor;
uniform vec3 lightPosition;
uniform sampler2D normalMap;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    // ----- NORMAL MAP -----
    vec2 tiledUV = fract(vUv * 9.0);
    vec3 mapNormal = texture2D(normalMap, tiledUV).rgb * 2.0 - 1.0;
    vec3 finalNormal = normalize(vNormal + mapNormal);

    // ----- LIGHT DIRECTION -----
    vec3 lightDir = normalize(lightPosition - vPosition);
    float diff = max(dot(finalNormal, lightDir), 0.0);

    // ----- SPECULAR (controlled) -----
    vec3 viewDir = normalize(-vPosition);
    vec3 reflectDir = reflect(-lightDir, finalNormal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 100.0); // lower exponent
    spec *= diff;                // only on lit areas
    spec *= 0.08;                // reduce intensity further
    spec = clamp(spec, 0.0, 0.2); // hard clamp to prevent hotspots

    // ----- BASE COLOR -----
    vec3 baseColor = vec3(1.0) * blendFactor;

    // ----- LIGHT COMBINATION -----
    vec3 ambient = 0.25 * baseColor; // slightly more ambient
    vec3 diffuse = 0.75 * diff * baseColor; // reduce diffuse a little

    vec3 color = ambient + diffuse + spec;
    color = clamp(color, 0.0, 1.0); // final clamp

    gl_FragColor = vec4(color, 1.0);
  }
`;
