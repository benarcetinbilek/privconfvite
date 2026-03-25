export const fragmentShader = `
uniform float blendFactor;
uniform vec3 lightPosition;
uniform sampler2D normalMap;
uniform sampler2D canvasToColor;
uniform sampler2D canvasToTexture;

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

    // ----- SPECULAR -----
    vec3 viewDir = normalize(-vPosition);
    vec3 reflectDir = reflect(-lightDir, finalNormal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 100.0);
    spec *= diff;
    spec *= 0.08;
    spec = clamp(spec, 0.0, 0.2);

    // ----- BASE COLOR -----
    vec3 baseColor = vec3(1.0) * blendFactor;

    // ----- LIGHT COMBINATION -----
    vec3 ambient = 0.25 * baseColor;
    vec3 diffuse = 0.75 * diff * baseColor;
    vec3 lighting = ambient + diffuse + vec3(spec);

    // ----- CANVAS TEXTURE -----
    vec3 canvasColor = texture2D(canvasToColor, vUv).rgb;

    // IMPORTANT: overlay RGBA (alpha lazim) 
    vec4 overlay = texture2D(canvasToTexture, vUv);

    // Overlay'i alpha ile base'in ustune bas
    vec3 combined = mix(canvasColor, overlay.rgb, overlay.a);

    vec3 finalColor = combined * lighting;

    // ----- FINAL COLOR -----
    //vec3 finalColor = canvasColor * lighting; // blendFactor zaten baseColor'da var
    finalColor = clamp(finalColor, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, 1.0);
}
`;
