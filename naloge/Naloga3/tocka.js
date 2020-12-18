class Tocka{
    static size=0;
     constructor(x,y){
        this.x = x;
        this.y = y;
        this.dx = (Math.random() * 2) + 1;
        this.dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        this.dy = (Math.random() * 2) + 1;
        this.dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        this.r = 8;
        this.trk = false;
      Tocka.size++;
    }
     po(){
        this.x += this.dx;
        this.y += this.dy;
    }
    static size(){
        return Tocka.size;
    }
    
}