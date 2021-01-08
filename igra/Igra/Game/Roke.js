import Camera from './Camera.js';
import Node from './Node.js';
import Utils from './Utils.js';


const mat4 = glMatrix.mat4;
export default class Roke extends Node {
    
    constructor(mesh, image, options) {
        super(options);
        this.mesh = mesh;
        this.image = image;

        this.projection = mat4.create();
        this.updateProjection();
        Utils.init(this, this.constructor.defaults, options);
    }
    updateProjection() {
        mat4.perspective(this.projection, this.fov, this.aspect, this.near, this.far);   
    }
}
Roke.defaults = {
    aspect           : 1,
    fov              : 1.5,
    near             : 0.01,
    far              : 100,
    velocity         : [0, 0, 0],
    mouseSensitivity : 0.002,
    maxSpeed         : 5, // 3
    friction         : 0.2,
    acceleration     : 20 //20
};
