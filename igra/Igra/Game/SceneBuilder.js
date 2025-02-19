import Mesh from './Mesh.js';

import Node from './Node.js';
import Model from './Model.js';
import Floor from './Floor.js';
import Camera from './Camera.js';

import Scene from './Scene.js';
import Roke from './Roke.js';
import Kovanc from './Kovanc.js';
import Krog from './Krog.js';


export default class SceneBuilder {

    constructor(spec) {
        this.spec = spec;
    }

    createNode(spec) {
        switch (spec.type) {
            case 'camera': return new Camera(spec);
            case 'model': {
                const mesh = new Mesh(this.spec.meshes[spec.mesh]);
                const texture = this.spec.textures[spec.texture];
                return new Model(mesh, texture, spec);
            }
            case 'floor':{
                const mesh = new Mesh(this.spec.meshes[spec.mesh]);
                const texture = this.spec.textures[spec.texture];
                return new Floor(mesh, texture, spec);
            }
            case 'Roke':{
                const mesh = new Mesh(this.spec.meshes[spec.mesh]);
                const texture = this.spec.textures[spec.texture];
                return new Roke(mesh, texture, spec);
            }
            case 'kovanc':{
                const mesh = new Mesh(this.spec.meshes[spec.mesh]);
                const texture = this.spec.textures[spec.texture];
                return new Kovanc(mesh, texture, spec);
            }
            case 'krog':{
                const mesh = new Mesh(this.spec.meshes[spec.mesh]);
                const texture = this.spec.textures[spec.texture];
                return new Krog(mesh, texture, spec);
            }
            default: return new Node(spec);
        }
    }

    build() {
        let scene = new Scene();
        this.spec.nodes.forEach(spec => scene.addNode(this.createNode(spec)));
        return scene;
    }

}
