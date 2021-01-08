import Camera from "./Camera.js";
import Kovanc from "./Kovanc.js";
import Krog from "./Krog.js";
import Roke from "./Roke.js";

const vec3 = glMatrix.vec3;
const mat4 = glMatrix.mat4;

export default class Physics {

    constructor(scene) {
        this.scene = scene;

        document.addEventListener("keypress",this.keypressedHandler.bind(this))  
        this.presed = false;
    }
    
    update(dt) {
        
     
        this.scene.traverse(node => { 
            if(node instanceof Camera ){
                if (node.velocity) {  
                    vec3.scaleAndAdd(node.translation, node.translation, node.velocity, dt);
                    
                  /* node.children.forEach(n => {         
                     vec3.scaleAndAdd(n.translation, n.translation, node.velocity, dt);  
                    // vec3.scaleAndAdd(n.rotation,n.rotation, node.rotation,dt);  
                     n.updateTransform();
                      
                 });*/
                 node.updateTransform();  
                 if(node.children ){
                    const c1 = node.children[0];
                    const c2 = node.children[1];
                    vec3.scaleAndAdd(c1.translation, c1.translation, node.velocity, dt);  
                    c1.updateTransform();
                    vec3.scaleAndAdd(c2.translation, c2.translation, node.velocity, dt);  
                    c2.updateTransform();  
                 }     
            }   
        }
                this.scene.traverse(other => {
                    if (node !== other) {
                        this.resolveCollision(node, other);
                    }
                        if(node instanceof Camera ){     // ce je kamera od kovanca oddalena manj kot 1                
                            this.scene.traverse(kovanc =>{
                                if(kovanc instanceof Kovanc){
                                    if(node !== kovanc ){ 
                                        if(this.distance(node, kovanc) && this.presed){
                                            if(kovanc.dangerous){
                                                let a = new Audio("../../common/images/video/game-over.mp3")
                                                a.play();
                                                this.gameOver();                                        
                                            }else{
                                                let a = new Audio("../../common/images/video/coin-drop.mp3")
                                                a.play();
                                                let v = document.getElementById("dosezene").innerHTML; 
                                                let m = document.getElementById("p").innerHTML;
                                                if(v == m){
                                                    this.zmaga();
                                                } 
                                                let t = parseInt(kovanc.points)+ +v;
                                                document.getElementById("dosezene").innerHTML = t;
                                                this.scene.removeNode(kovanc);
                                            }
                                            this.disable();                               
                                        }
                                    }
                                }     
                            })        
                }
            })
        });
        this.scene.traverse(node=>{
            if(node instanceof Camera){
                this.scene.traverse(krog=>{
                    if(krog instanceof Krog){ 
                        if(node !== krog){
                             if(this.resolveCollision(node, krog)){
                                let a = new Audio("../../common/images/video/game-over.mp3")
                                a.play();
                                setTimeout(this.gameOverLuknja(),2000);
                            }
                        }
                    }
                })
            }
        }) 
      
    }
    zmaga(){
        alert("Cesitamo zbrali ste v mozne tocke. "+ m);
    }
    gameOver(){
       
        setTimeout( alert("Konec igre pobrali ste nevaren kovanc. "+ 
        "Vaš rezultat je "+ document.getElementById("dosezene").innerHTML+" točk" ),3000);
        window.location.reload();
    }
    gameOverLuknja(){
        setTimeout( alert("Konec igre stopili ste v črno luknjo. "+ 
        "Vaš rezultat je "+ document.getElementById("dosezene").innerHTML+" točk" ),3000);
        window.location.reload();
    }
    
    disable() {
        document.removeEventListener('keypress',this.keypressedHandler)
        this.presed = false;
    }
    keypressedHandler(e){  
        if(e.code === "Space"){
            this.presed = true;
        }
    }
    
    intervalIntersection(min1, max1, min2, max2) {
        return !(min1 > max2 || min2 > max1);
    }

    aabbIntersection(aabb1, aabb2) {
        return this.intervalIntersection(aabb1.min[0], aabb1.max[0], aabb2.min[0], aabb2.max[0])
            && this.intervalIntersection(aabb1.min[1], aabb1.max[1], aabb2.min[1], aabb2.max[1])
            && this.intervalIntersection(aabb1.min[2], aabb1.max[2], aabb2.min[2], aabb2.max[2]);
    }

    resolveCollision(a, b) {
        // Update bounding boxes with global translation.
        const ta = a.getGlobalTransform();
        const tb = b.getGlobalTransform();

        const posa = mat4.getTranslation(vec3.create(), ta);
        const posb = mat4.getTranslation(vec3.create(), tb);

        const mina = vec3.add(vec3.create(), posa, a.aabb.min);
        const maxa = vec3.add(vec3.create(), posa, a.aabb.max);
        const minb = vec3.add(vec3.create(), posb, b.aabb.min);
        const maxb = vec3.add(vec3.create(), posb, b.aabb.max);

        // Check if there is collision.
        const isColliding = this.aabbIntersection({
            min: mina,
            max: maxa
        }, {
            min: minb,
            max: maxb
        });

        if (!isColliding) {
            return false;
        }

        // Move node A minimally to avoid collision.
        const diffa = vec3.sub(vec3.create(), maxb, mina);
        const diffb = vec3.sub(vec3.create(), maxa, minb);

        let minDiff = Infinity;
        let minDirection = [0, 0, 0];
        if (diffa[0] >= 0 && diffa[0] < minDiff) {
            minDiff = diffa[0];
            minDirection = [minDiff, 0, 0];
        }
        if (diffa[1] >= 0 && diffa[1] < minDiff) {
            minDiff = diffa[1];
            minDirection = [0, minDiff, 0];
        }
        if (diffa[2] >= 0 && diffa[2] < minDiff) {
            minDiff = diffa[2];
            minDirection = [0, 0, minDiff];
        }
        if (diffb[0] >= 0 && diffb[0] < minDiff) {
            minDiff = diffb[0];
            minDirection = [-minDiff, 0, 0];
        }
        if (diffb[1] >= 0 && diffb[1] < minDiff) {
            minDiff = diffb[1];
            minDirection = [0, -minDiff, 0];
        }
        if (diffb[2] >= 0 && diffb[2] < minDiff) {
            minDiff = diffb[2];
            minDirection = [0, 0, -minDiff];
        }

        vec3.add(a.translation, a.translation, minDirection);
        a.updateTransform();
        return true;
    }
    razdalja (a, b){ // b = kovanc
        const xa = a.translation[0];
        const ya = a.translation[1];
        const za = a.translation[2];

        const xb = b.translation[0];
        const yb = b.translation[1];
        const zb = b.translation[2];

        let d = Math.sqrt(2 * (xb - xa) + 2 * (yb - ya) + 2 * (zb - za));
 
        if(d <= 2 ){   
            return true;
        }else{
            return false;
        }
    }
    razdaljaKroga (a, b){ // b = krog
        const xa = a.translation[0];
        const ya = a.translation[1];

        const xb = b.translation[0];
        const yb = b.translation[1];
        const radiusB = b.radius;
      // let d = Math.sqrt(2 * (xb - xa) + 2 * (yb - ya) + 2 * (zb - za));
      
        let rez = Math.pow((xa - xb), 2) + Math.pow((ya - yb), 2);
        console.log(rez)
        let r2 = Math.pow(radiusB, 2);
        console.log(rez)
        console.log(r2);
        console.log("xa",xa);
      // console.log("xb",xb);
        console.log("ya",ya);
        //console.log("yb",yb);
        

        if (rez < r2 ) {
            return true;
        } else {
            return false;
        } 
    }
    distance (a, b){ 
        let dx = a.translation[0] - b.translation[0]; 
        let dy = a.translation[1] - b.translation[1]; 
        let dz = a.translation[2] - b.translation[2];

        let rez = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (rez < 0.5) {
            return true;
        } else {
            return false;
        } 
    }
}
