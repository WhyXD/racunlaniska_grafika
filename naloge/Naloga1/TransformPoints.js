class TransformPoints{
    constructor(){}
    
    izvedi(){
        var PM = new PointManager();
        var vektor = PM.izvedi();
        var transformacija = new Transformation();
        var v = transformacija.transformPoint(vektor);
    
        return document.getElementById("transformPoint").innerHTML = v;
    }
}
TP = new TransformPoints();