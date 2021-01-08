import Node from './Node.js';

export default class Krog extends Node {

    constructor(mesh, image, options) {
        super(options);
        this.mesh = mesh;
        this.image = image;
    }

}