#version 120

uniform float    uTime;        // "Time", from Animate( )
varying vec2      vST;        // texture coords
uniform float uKa, uKd, uKs;
uniform vec3 uColor;
uniform vec3 uScolor;
uniform float uShininess;
uniform float uS0, uT0, uS1, uT1;
uniform float uDs, uDt;
uniform float uSize;
uniform int uBottonControl;


varying vec3 vN;
varying vec3 vL;
varying vec3 vE;
void
main( )
{
    vec3 Normal = normalize(vN);
    vec3 Light = normalize(vL);
    vec3 Eye = normalize(vE);
    
    //For lighting
    vec3 ambient = uKa * uColor;
    
    float d = max( dot(Normal,Light), 0. );
    vec3 diffuse = uKd * d * uColor;
    
    float s = 0.5;
    if( dot(Normal,Light) > 0. ) {
        vec3 ref = normalize( reflect( -Light, Normal ) );
        s = pow( max( dot(Eye,ref),0. ), uShininess );
    }
    vec3 specular = uKs * s * uScolor;
    
    //For Texture
    vec3 myColor = uColor;
    
    
    if
     ( uS0-uSize/3. <= vST.s && vST.s <= uS0+uSize/3. &&
        uT0-uSize/2. <= vST.t && vST.t <= uT0+uSize/2.)
    {
        myColor = vec3( 0., 0.1, 0.3);
    }
    ambient = uKa * myColor;
    
    //Draw
    gl_FragColor = vec4( ambient + diffuse + specular, 1. );
}
