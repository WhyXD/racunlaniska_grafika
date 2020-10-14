class Matrix4f{
    constructor(mat1) {
    this.matrika = mat1;
        }
negacija(m1) {
    var matrika1 = new Matrix4f([[],[],[],[]]);
    var je=this.aliJeStevilo(m1);
    for(var i = 0; i <m1.matrika.length; i++) {
        for(var j = 0; j < m1.matrika[i].length; j++) {
            if(je){
                if(m1.matrika[i][j]>0) {
                    matrika1.matrika[i][j] = m1.matrika[i][j] * (-1);     
                }else{
                    matrika1.matrika[i][j] = m1.matrika[i][j];
                }   
            }else{
                return document.getElementById("negacijaM").innerHTML="Napaka: Vsebuje string";
            }
        } 
    }
        return document.getElementById("negacijaM").innerHTML=matrika1;
    }
add(m1,m2){
    var nova= new Matrix4f ([[],[],[],[]]);
    var prvaJe=this.aliJeStevilo(m1);
    var drugaJe=this.aliJeStevilo(m2);
    if(prvaJe && drugaJe){
        for(var i=0; i <m1.matrika.length; i++){
            for(var j=0; j< m1.matrika[i].length; j++){
                 nova.matrika[i][j]= m1.matrika[i][j] + m2.matrika[i][j];
            }
        }
        return document.getElementById("vsotaM").innerHTML=nova;
    }else{
        return document.getElementById("vsotaM").innerHTML="Napaka: Matrika vsebuje string";
    }
       
}
transpose(m){
  var nova= new Matrix4f ([[],[],[],[]]);
    if(this.aliJeStevilo(m)){
        for(var i=0;i<m.matrika.length;i++){
            for(var j=0;j<m.matrika[i].length;j++){
                nova.matrika[j][i]=m.matrika[i][j];
            }
        }
        return document.getElementById("transposeM").innerHTML=nova;
    }else{
        return document.getElementById("transposeM").innerHTML="Napaka: Vsebuje string";
    }
  
}
multiplyScalar(skalar,m1){
    var nova= new Matrix4f([[],[],[],[]]);
    
    if(this.aliJeStevilo(m1)){
        for(var i=0;i<m1.matrika.length;i++){
            for(var j=0;j<m1.matrika[i].length;j++){
                nova.matrika[i][j]=m1.matrika[i][j] * skalar;
            }
        }
        return document.getElementById("multiplyScalarM").innerHTML=nova;
    }else{
        return document.getElementById("multiplyScalarM").innerHTML="Vsebuje string";
    }
    
}
multiply(m1,m2){
  var nova = new Matrix4f([[],[],[],[]]);
  var prvaJe=this.aliJeStevilo(m1);
  var drugaJe=this.aliJeStevilo(m2);
  var vsota=0;
  if(prvaJe && drugaJe){
      for(var i=0; i<m1.matrika.length; i++){
          for(var j=0; j<m1.matrika[i].length; j++){
              for(var c=0; c<m1.matrika.length; c++){
                var r = m1.matrika[i][c] * m2.matrika[c][j];
                vsota+= r;
              }  
              nova.matrika[i][j]=vsota; 
              vsota=0;  
          }
      }
      return document.getElementById("multiplyM").innerHTML=nova;
  }  else{
      return document.getElementById("multiplyM").innerHTML="Napaka: Vsebuje string";
  }
}
aliJeStevilo(m){
    var je;
    for(var i =0;i<m.matrika.length;i++){
        for(var j=0; j<m.matrika[i].length;j++){
            if((isNaN(m.matrika[i][j]))) return je = false;
            else je=true;
        }
    }
    return je;
}

toString(){
    var rezultat="";
    for(var i = 0;i < this.matrika.length; i++){
        rezultat+="[";
        for(var j = 0;j < this.matrika[i].length; j++){
            if(j==this.matrika[i].length-1){
                rezultat+=this.matrika[i][j];
            }else{
                rezultat+= this.matrika[i][j]+", ";
            }  
        }
        rezultat+="]\n"+("<br>");
    }   
return rezultat;
}

}