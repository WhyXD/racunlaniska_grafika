class Transformation{
    constructor(){
        this.tra_matrika = new Matrix4f([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]);
    };
    constructor(tocka = new Vector4f(5,10,15,1)){
        this.tra_tocka = tocka;
    }

translate(vektor){
    var w = vektor.w;
    var x = vektor.x;
    var y = vektor.y;
    var z = vektor.z;

    if(!(w==1)){
        x = x / w;
        y = y / w;
        z = z / w;
        w = w / w; 
    }   
    var matrika_z_vektorjem = new Matrix4f([[1,0,0,x],[0,1,0,y],[0,0,1,z],[0,0,0,1]]);

    this.tra_matrika = this.tra_matrika.multiply(this.tra_matrika, matrika_z_vektorjem);
    
    return document.getElementById("translacijaT").innerHTML = this.tra_matrika; 
}
scale(vektor){
    var w = vektor.w;
    var x = vektor.x;
    var y = vektor.y;
    var z = vektor.z;

    if(!(w==1)){
        x = x / w;
        y = y / w;
        z = z / w;
        w = w / w; 
    }    
    var matrika_z_vektorjem = new Matrix4f([[x,0,0,0],[0,y,0,0],[0,0,z,0],[0,0,0,1]]);

    this.tra_matrika = this.tra_matrika.multiply(this.tra_matrika, matrika_z_vektorjem);

    return document.getElementById("skalacijaT").innerHTML = this.tra_matrika; 
}
rotateX(kot_v_stopinja){

    var x = kot_v_stopinja * ( Math.PI / 180);
    
    var rx = new Matrix4f([[1, 0, 0, 0],
                           [0, Math.cos(x), - Math.sin(x), 0],
                           [0, Math.sin(x),   Math.cos(x), 0],
                           [0, 0, 0, 1]]);

    this.tra_matrika=this.tra_matrika.multiply(this.tra_matrika, rx);

    return document.getElementById("rotacijaX").innerHTML=this.tra_matrika;
}
rotateY(kot_v_stopinja){
    var x = kot_v_stopinja * (Math.PI / 180);
    
    var ry = new Matrix4f([[  Math.cos(x), 0, Math.sin(x), 0],
                           [0, 1, 0, 0],
                           [- Math.sin(x), 0, Math.cos(x), 0],
                           [0, 0, 0, 1]]);

    this.tra_matrika = this.tra_matrika.multiply(this.tra_matrika, ry);

    return document.getElementById("rotacijaY").innerHTML=this.tra_matrika;
}
rotateZ(kot_v_stopinja){
    var x = kot_v_stopinja * (Math.PI / 180);
    
    var rz = new Matrix4f([[Math.cos(x), - Math.sin(x), 0, 0],
                           [Math.sin(x),   Math.cos(x), 0, 0],
                           [0, 0, 1, 0],
                           [0, 0, 0, 1]]);

    this.tra_matrika = this.tra_matrika.multiply(this.tra_matrika, rz);

    return document.getElementById("rotacijaZ").innerHTML = this.tra_matrika;
}
transformPoint(tocka){


    return document.getElementById("transformPoint").innerHTML=x;
}

}
t = new Transformation(); 
toc = new Transformation(to);