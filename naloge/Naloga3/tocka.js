class Tocka{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.dx = (Math.random() * 3) + 1;
        this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        this.dy = (Math.random() * 3) + 1;
        this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        this.r = (Math.random() * 6) + 1;
    }
    static po(){
        this.x += this.dx;
        this.y += this.dy;
    }
    
}