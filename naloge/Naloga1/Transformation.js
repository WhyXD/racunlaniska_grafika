class Transformation{
    constructor(){
        this.tra_matrika = //new Matrix4f([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]])  
        new Matrix4f([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]])        
    };

translate(vektor){
    var w = vektor.w;
    var x = vektor.x;
    var y = vektor.y;
    var z = vektor.z;

  /*  if(!(w==1)){
        x = x / w;
        y = y / w;
        z = z / w;
        w = w / w; 
    }*/   
    var matrika_z_vektorjem = new Matrix4f([[1,0,0,x],[0,1,0,y],[0,0,1,z],[0,0,0,1]]);

    var m = this.tra_matrika.multiply(matrika_z_vektorjem, this.tra_matrika);
    
    return document.getElementById("translacijaT").innerHTML = m; 
}
scale(vektor){
    var w = vektor.w;
    var x = vektor.x;
    var y = vektor.y;
    var z = vektor.z;

   /* if(!(w==1)){
        x = x / w;
        y = y / w;
        z = z / w;
        w = w / w; 
    }*/    
    var matrika_z_vektorjem = new Matrix4f([[x,0,0,0],[0,y,0,0],[0,0,z,0],[0,0,0,1]]);

    var m = this.tra_matrika.multiply(matrika_z_vektorjem, this.tra_matrika);

    return document.getElementById("skalacijaT").innerHTML = m; 
}
rotateX(kot_v_stopinja){
    var x = kot_v_stopinja * ( Math.PI / 180);

    var rx = new Matrix4f([[1, 0, 0, 0],
                           [0, Math.cos(x), - Math.sin(x), 0],
                           [0, Math.sin(x),   Math.cos(x), 0],
                           [0, 0, 0, 1]]);

    var m = this.tra_matrika.multiply(rx, this.tra_matrika);

    return document.getElementById("rotacijaX").innerHTML = m;
}
rotateY(kot_v_stopinja){
    var x = kot_v_stopinja * (Math.PI / 180);
    var ry = new Matrix4f([[  Math.cos(x), 0, Math.sin(x), 0],
                           [0, 1, 0, 0],
                           [- Math.sin(x), 0, Math.cos(x), 0],
                           [0, 0, 0, 1]]);

    var m = this.tra_matrika.multiply(ry, this.tra_matrika);

    return document.getElementById("rotacijaY").innerHTML=m;
}
rotateZ(kot_v_stopinja){
    var x = kot_v_stopinja * (Math.PI / 180);
    
    var rz = new Matrix4f([[Math.cos(x), - Math.sin(x), 0, 0],
                           [Math.sin(x),   Math.cos(x), 0, 0],
                           [0, 0, 1, 0],
                           [0, 0, 0, 1]]);

    var m = this.tra_matrika.multiply(rz, this.tra_matrika);
    //this.tra_matrika= -->

    return document.getElementById("rotacijaZ").innerHTML = m;
    // in vrnes = this.tra_matrika
}

transformPoint(tocka){ 
    
    var m=this.moje();
    var x = tocka.x;
    var y = tocka.y;
    var z = tocka.z;
    var spr = [x, y, z]; 
    var rez = [3];
    //this.tra_matrika.matrika[i].length
    for(var i = 0;i < m.matrika.length; i++){
        var vsota = 0;
        for(var j = 0; j < m.matrika[i].length; j++){
            vsota += m.matrika[i][j] * spr[i];
            //this.tra_matrika.matrika[i][j]   
        }
        rez[i] = vsota;
    }
    var nov = new Vector4f(rez[0], rez[1], rez[2], 1);

    this.prikaziMatriko(m);

    return document.getElementById("transformPoint").innerHTML = nov.toString();
   // document.getElementById("tra").innerHTML=this.tra_matrika; 
}
moje(){
    var transformacija = new Transformation(); 
    var m = new Transformation();
    
    transformacija.translate(new Vector4f(1.25,0,0,0));
    m.tra_matrika=transformacija.translate(new Vector4f(1.25,0,0,0));
    
    transformacija = new Transformation();
    transformacija.rotateZ(Math.PI/3);
    m.tra_matrika=transformacija.rotateZ(Math.PI/3);
   
    transformacija = new Transformation();
    transformacija.translate(new Vector4f(0,0,4.15,0));
    m.tra_matrika=transformacija.translate(new Vector4f(0,0,4.15,0));

    transformacija = new Transformation();
    transformacija.translate(new Vector4f(0,3.14,0,0));
    m.tra_matrika=transformacija.translate(new Vector4f(0,3.14,0,0));
    
    transformacija = new Transformation();
    transformacija.scale(new Vector4f(1.12,1.12,1,0));
    m.tra_matrika=transformacija.scale(new Vector4f(1.12,1.12,1,0));

    transformacija = new Transformation();
    transformacija.rotateY(5*(Math.PI/8));
    m.tra_matrika=transformacija.rotateY(5*(Math.PI/8));

    return m.tra_matrika;
} 

prikaziMatriko(m){
    var vrstica='';
    for(var i=0; i<m.matrika.length;){
        for(var j=0;j<m.matrika[i].length;j++){
            vrstica+=m.matrika[i][j];
        }
        console.log(vrstica);
    }
}  
}

 
