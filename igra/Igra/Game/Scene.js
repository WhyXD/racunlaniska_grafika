export default class Scene {

    constructor() {
        this.nodes = [];
    }

    addNode(node) {
        this.nodes.push(node);
    }

    traverse(before, after) {
        this.nodes.forEach(node => node.traverse(before, after));
    }
    removeNode(node){
        console.log(this.nodes.length+"pred")
        const index = this.nodes.indexOf(node);
        if (index >= 0) {
            this.nodes.splice(index, 1);
        }
        console.log(this.nodes.length+"po")
    }

}
