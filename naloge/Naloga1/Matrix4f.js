class Matrix4f{
    constructor(mat1) {
    this.matrika = mat1;
        }
negacija(m1) {
    var matrika1 = new Matrix4f([[],[],[],[]]);
    
    for(var i = 0; i <m1.matrika.length; i++) {
     for(var j = 0; j < m1.matrika[i].length; j++) {
        matrika1.matrika[i][j] = m1.matrika[i][j] * (-1);
            } 
        }
        return document.getElementById("negacijaM").innerHTML=matrika1.toString();
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