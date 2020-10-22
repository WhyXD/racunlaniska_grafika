class PointManager{
    constructor(){    
    }

branje(){
    var podatki = document.getElementById("vnosnoPolje").value;
    return podatki;
}
izvedi(){
    var podatki = this.branje(); // branje textarea
    var vrstice = podatki.split('\n'); // stevilo vrstic
    var vektor;
    for(var i = 0; i<vrstice.length;i++){
        var rez = vrstice[i].split(" ");
        vektor = new Vector4f(rez[0], rez[1], rez[2],0); 
    }  
    document.getElementById("izpis").innerHTML = vektor; 

    return vektor; 
}
pobrisi(){
    document.getElementById("vnosnoPolje").value="";
    document.getElementById("izpis").value="";
}
}

PM = new PointManager(); 
