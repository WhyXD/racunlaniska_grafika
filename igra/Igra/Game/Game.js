import Application from '../../common/Application.js';

import Renderer from './Renderer.js';
import Physics from './Physics.js';
import Camera from './Camera.js';
import SceneLoader from './SceneLoader.js';
import SceneBuilder from './SceneBuilder.js';
import Mesh from './Mesh.js';
import Roke from './Roke.js';
import Kovanc from './Kovanc.js';
import Light from './Lights.js';
import Node from './Node.js';


const mat4 = glMatrix.mat4;
const vec3 = glMatrix.vec3;

class App extends Application {
    start() {
        const gl = this.gl;
       
        this.renderer = new Renderer(gl);
        this.time = Date.now();
        this.startTime = this.time;
        this.aspect = 1;  

        this.light = new Light();
      
        this.pointerlockchangeHandler = this.pointerlockchangeHandler.bind(this);
        document.addEventListener('pointerlockchange', this.pointerlockchangeHandler);
        this.load('scene.json');
    }

    async load(uri) {
        const scene = await new SceneLoader().loadScene('scene.json');
        const builder = new SceneBuilder(scene);
        this.scene = builder.build();
        this.physics = new Physics(this.scene);
       
        // Find first camera.
        this.camera = null;
        this.scene.traverse(node => {
            if (node instanceof Camera) {
                this.camera = node;
            }
        });
        
        this.scene.addNode(this.light);

        this.roke = null;
        //napiše vse mozne tocke kovancev
        let p = document.createElement("p");
        let t = 0;
       
        this.scene.traverse(node =>{
            if(node instanceof Roke){
                this.roke = node;     
               // this.scene.addNode(this.roke);
               this.camera.addChild(this.roke)   
            }
            if(node instanceof Kovanc){
                t += parseInt(node.points);   
            }
        });

        //dosezene tocke 0
        let pn = document.createTextNode(t)
        p.appendChild(pn);
        document.getElementById("p").appendChild(p);
        document.getElementById("dosezene").innerHTML = 0;
     
        this.camera.aspect = this.aspect;
        this.roke.updateProjection();
        this.camera.updateProjection();
        this.renderer.prepare(this.scene);
    }

   
    enableCamera() {
        this.canvas.requestPointerLock();
    }

    pointerlockchangeHandler() {
        if (!this.camera) {
            return;
        }

        if (document.pointerLockElement === this.canvas) {
            this.camera.enable();
        } else {
            this.camera.disable();
        }
    }

    update() {
        const t = this.time = Date.now();
        const dt = (this.time - this.startTime) * 0.001;
        this.startTime = this.time;

       
        if (this.camera) {
            this.camera.update(dt);
        }


        if (this.physics) {
            this.physics.update(dt);
        } 

    }

    render() {
        if (this.scene) {
            this.renderer.render(this.scene, this.camera, this.light);
        }
    }

    resize() {
        const w = this.canvas.clientWidth;
        const h = this.canvas.clientHeight;
        this.aspect = w / h;
        if (this.camera) {
            this.camera.aspect = this.aspect;
            this.camera.updateProjection();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('canvas');
    const app = new App(canvas);

   // document.getElementById("zacni").addEventListener('click', app.enableCamera.bind(app));  
   addEventListener('click', app.enableCamera.bind(app));     
   
})
