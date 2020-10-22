class Vector4f{
    constructor(_x,_y,_z,_w){
    this.x=_x;
    this.y=_y;
    this.z=_z;
    this.w=_w;
}  
negacija(){
    if(!this.aliSoVseStevilke(this.x, this.y, this.z,0)){
       
      return document.getElementById("negacija").innerHTML=
      new Vector4f(this.aliJeVecjeOdNic(this.x),
            this.aliJeVecjeOdNic(this.y),
            this.aliJeVecjeOdNic(this.z),
            this.aliJeVecjeOdNic(0));
      
    }else{
        return document.getElementById("negacija").innerHTML="Vsebuje string";
  }
}
add(v1,v2){
    if(!this.aliSoVseStevilke(v1.x, v1.y, v1.z,0)){
        if(!this.aliSoVseStevilke(v2.x, v2.y, v2.z,0)){
        return document.getElementById("add").innerHTML=
             new Vector4f((v1.x + v2.x) ,(v2.y + v2.y),(v1.z + v2.z),(0)).toString();
        }  
    }else{
        return document.getElementById("add").innerHTML="Vsebuje string";
    }
}
scalarProduct(faktor,vektor){
    return  document.getElementById("scalarProduct").innerHTML=
        new Vector4f(faktor * vektor.x, faktor * vektor.y, faktor * vektor.z, 0);
}
dotProduct(v1,v2){
    var a = (v1.x * v2.x);
    var b = (v1.y * v2.y);
    var c = (v1.z * v2.z);
    var d = a + b + c;
    return document.getElementById("dotProduct").innerHTML = d;
       
}
length(){
    return document.getElementById("length").innerHTML= Math.sqrt( Math.pow(this.x, 2) + Math.pow( this.y,2), Math.pow( this.z,2)).toFixed(3);
}
crossProduct(v1,v2){
        let a = (v1.y * v2.z) - (v1.z * v2.y);
        let b = (v1.x * v2.z) - (v1.z * v2.x);
        let c = (v1.x * v2.y) - (v1.y * v2.x);  
    return document.getElementById("crossProduct").innerHTML=new Vector4f(a ,-b ,+c ,0 );
}
normalize(v1){
    var jx=this.je(v1.x);
    var jy=this.je(v1.y);
    var jz=this.je(v1.z);
    if(jx && jy && jz){
        let normalizacija = Math.sqrt(( v1.x * v1.x ) + ( v1.y * v1.y ) + ( v1.z * v1.z ));
        let novx = v1.x / Math.abs( normalizacija );
        let novy = v1.y / Math.abs( normalizacija );
        let novz = v1.z / Math.abs( normalizacija );
        return  document.getElementById("normalize").innerHTML= new Vector4f(novx,novy,novz,0);
    }else{
        alert("Deljenje z 0 ni mogoče");
    }
}
project(v1,v2){
    const dot = this.dotProduct( v1, v2);
    var magnituda = Math.abs(Math.sqrt((Math.pow( v2.x, 2)) + Math.pow( v2.y, 2) + Math.pow( v2.z, 2)));
    var projekcija = dot / (Math.pow( magnituda),2);
        return document.getElementById("procject").innerHTML= new Vector4f( v2.x / projekcija, v2.y / projekcija, v2.z / projekcija,0);
}
cosPhi(v1,v2){
    const dot=this.dotProduct(v1, v2);
    var magnitudaV1 = Math.abs( Math.sqrt((Math.pow( v1.x, 2)) + Math.pow( v1.y, 2) + Math.pow( v1.z, 2)));
    var magnitudaV2 = Math.abs( Math.sqrt((Math.pow( v2.x, 2)) + Math.pow( v2.y, 2) + Math.pow( v2.z, 2)));

    return document.getElementById("cosPhi").innerHTML= (dot / (Math.abs( magnitudaV1) * Math.abs(magnitudaV2)));
}

aliSoVseStevilke(x,y,z,w) {
    if(!isNaN(x)){
        if(!isNaN(y)){
            if(!isNaN(z)){
                if(!isNaN(w)){
                    return false;
                }else{
                    return true;
                }
            }else{
                return true;
            }
        }else{
            return true;
        }
    }else{
        return true;
        } 
} 
aliJeVecjeOdNic(x){
    if(x>0)
        return x*-1;
    else
        return x;
}
toString(){
    return "["+
    +this.x+", "+
    +this.y+", "+
    +this.z+", "+
    +this.w+"]";
} 
je(x){
    if(x!=0) return true;
    else return false;
}
}
tocka = new Vector4f(1,2,3,1);
vektor = new Vector4f(1,2,3,1);
