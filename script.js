function zacetek(){
var canvas=document.getElementById("myCanvas");
var gl=canvas.getContext("webgl");
var dosegljivost=document.getElementById("dela");

if(!gl){ 
    var gl=canvas.getContext("experimental-webgl");
}
if(!gl){
    alert("Brskalnik ne podpira webgl");
}else{
    dosegljivost.innerText="Lahko boste igrali igro";
}

gl.clearColor(0.2,0.3,0.4,1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPH_BUFFER_BIT);

/*Full screen canvas*/
canvas.style.width=window.innerWidth + "px";
canvas.style.height=window.innerHeight + "px";
};

function vertexShader(vertPosition,vertColor){
    return {
        fragColor:vertColor,
        gl_Position:[vertPosition.x,vertPosition.y, 0.0,1.0]
    };
};

/*
var linije=[
    1,0,0,
    2,2,0
]
var vertex_buffer=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(linije),gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER,null);

var vertCode='attribute vec3 coordinates;' +
'void main(void) {' +
   ' gl_Position = vec4(coordinates, 1.0);' +
'}';
var vertShader=gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader,vertCode);
gl.compileShader(vertShader);
*/
