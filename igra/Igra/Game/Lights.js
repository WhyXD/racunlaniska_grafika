import Node from './Node.js';

export default class Light extends Node {

    constructor() {
        super();

        Object.assign(this, {
            position         : [-30, -0.5, 30],
            ambient          : 1,
            diffuse          : 1,
            specular         : 1,
            shininess        : 1000,
            color            : [255, 255, 30],
            attenuatuion     : [1.0, 0, 0.02]
        });
    }

}