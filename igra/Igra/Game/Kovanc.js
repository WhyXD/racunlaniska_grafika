import Node from './Node.js';

export default class Kovanc extends Node{
    static velikost = 0;
    
    constructor(mesh, image, options ) {
        super(options);
        this.mesh = mesh;
        this.image = image;   
        Kovanc.velikost++;
    }
    static size(){
        return Kovanc.velikost;
    }
}
// rotacija kovanca
//https://blogoben.wordpress.com/2011/06/22/webgl-basics-6-torus-shaped-strip/