class bezier{
    constructor(ctx){
        this.ctx = ctx;
        this.tocke_X =[];
        this.tocke_Y = []; 
        this.tocke_za_risanje = [];
       
    }
    preberi_barvo(){
        let barva = document.getElementById("barva").value;
        return barva;
    }

    narisi_tocko(x,y){
    this.tocke_X.push(x);
    this.tocke_Y.push(y);
    this.ctx.beginPath();
    this.ctx.arc(x, y , 2, 0, 2 * Math.PI, false)
    this.ctx.moveTo(x,y);
    this.ctx.lineTo(x, y);
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.closePath();
        if(this.tocke_X.length == 4){
            this.povezi();
        }
    }

    povezi(){
     let x1 = this.tocke_X[0];
     let x2 = this.tocke_X[1];
     let x3 = this.tocke_X[2];
     let x4 = this.tocke_X[3];
     
     let y1 = this.tocke_Y[0];
     let y2 = this.tocke_Y[1];
     let y3 = this.tocke_Y[2];
     let y4 = this.tocke_Y[3];

     this.tocke_za_risanje.push(x1,y1);
     this.tocke_za_risanje.push(x2,y2);
     this.tocke_za_risanje.push(x3,y3);
     this.tocke_za_risanje.push(x4,y4);

     this.ctx.beginPath();
     this.ctx.strokeStyle = "black";
     this.ctx.moveTo(x1,y1);
     this.ctx.lineTo(x2,y2);
     this.ctx.stroke();
     this.ctx.closePath();

     this.ctx.beginPath();
     this.ctx.moveTo(x3,y3);
     this.ctx.lineTo(x4,y4);
     this.ctx.stroke();
     this.ctx.closePath();
     this.tocke_X=[];
     this.tocke_Y=[];
     this.krivulja();
    }  

    krivulja(){
        let cx = 3.0 * (this.tocke_za_risanje[2] - this.tocke_za_risanje[0]);
        let bx = 3.0 * (this.tocke_za_risanje[4] - this.tocke_za_risanje[2]) - cx;
        let ax = this.tocke_za_risanje[6] - this.tocke_za_risanje[0] - cx - bx;
        
        let cy = 3.0 * (this.tocke_za_risanje[3] - this.tocke_za_risanje[1]);
        let by = 3.0 * (this.tocke_za_risanje[5] - this.tocke_za_risanje[3]) - cx;
        let ay = this.tocke_za_risanje[7] - this.tocke_za_risanje[1] - cy - by;
    
        let trenutna_y = this.tocke_za_risanje[1];
        let trenuta_x = this.tocke_za_risanje[0];
       
        let b = this.preberi_barvo();
        for(let t = 0.001; t<1; t+=0.001 ){
            this.ctx.beginPath();
            this.ctx.strokeStyle = b;
            this.ctx.moveTo(trenuta_x,trenutna_y);
            let nx = ((ax *Math.pow(t,3)) + (bx * Math.pow(t,2)) + (cx * t) + this.tocke_za_risanje[0]);
            let ny = ((ay *Math.pow(t,3)) + (by * Math.pow(t,2)) + (cy * t) + this.tocke_za_risanje[1]);
            this.ctx.lineTo(nx,ny);
            trenuta_x = nx;
            trenutna_y = ny;
            this.ctx.stroke();
            this.ctx.closePath();
        }
        let x = this.tocke_za_risanje[6];
        let y = this.tocke_za_risanje[7];
        this.tocke_X.push(x);
        this.tocke_Y.push(y);
        this.tocke_za_risanje = [];
           
    }
    
}
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

const b = new bezier(ctx);
canvas.addEventListener("click" , function (e){
let x = e.clientX - this.offsetLeft;
let y = e.clientY- this.offsetTop;
b.narisi_tocko(x,y);
});