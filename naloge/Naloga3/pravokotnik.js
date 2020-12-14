class Pravokotnik{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    neVsebuje(tocka){
        return tocka.x > this.x - this.w &&
        tocka.x < this.x + this.w &&
        tocka.y > this.y - this.h &&
        tocka.y < this.y + this.h;
    }
}