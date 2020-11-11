class bezier{
    constructor(ctx){
        this.ctx = ctx;
        this.tocke_X =[];
        this.tocke_Y = []; 
        this.tocke_za_risanje = [];
        this.drag=false;
        this.premikanje = [];
        this.start_X;
        this.start_Y;
       
    }
    preberi_barvo(){
        let barva = document.getElementById("barva").value;
        return barva;
    }
    preberi_barvo_vozlisc(){
        let barva_vozlisca = document.getElementById("colorVozlisc").value;
        return barva_vozlisca;
    }

    narisi_tocko(x,y){
        this.tocke_X.push(x);
        this.tocke_Y.push(y);
        let v = this.preberi_barvo_vozlisc();
        this.ctx.beginPath();
        if(this.tocke_X.length == 2 || this.tocke_X.length == 3){
        this.ctx.arc(x, y , 5, 0, 2 * Math.PI, false);
        }else{
            this.ctx.rect(x-4,y-4,8,8);  
        }
        this.ctx.moveTo(x,y);
        this.ctx.lineTo(x, y);
        this.ctx.fillStyle = v;
        this.ctx.fill();
        this.ctx.closePath();
            if(this.tocke_X.length == 4){
                this.povezi();
            }
    }

    povezi(){
        let x1 = this.tocke_X[0]; let x2 = this.tocke_X[1];
        let x3 = this.tocke_X[2]; let x4 = this.tocke_X[3];
        
        let y1 = this.tocke_Y[0]; let y2 = this.tocke_Y[1];
        let y3 = this.tocke_Y[2]; let y4 = this.tocke_Y[3];

        this.risanje(x1,x2,x3,x4,y1,y2,y3,y4);

        this.ctx.beginPath();
        this.ctx.strokeStyle = "grey";
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
        let by = 3.0 * (this.tocke_za_risanje[5] - this.tocke_za_risanje[3]) - cy;
        let ay = this.tocke_za_risanje[7] - this.tocke_za_risanje[1] - cy - by;
    
        let trenutna_y = this.tocke_za_risanje[1];
        let trenuta_x = this.tocke_za_risanje[0];
       
        let b = this.preberi_barvo();
        for(let t = 0.001; t<1; t+=0.001 ){
            this.ctx.beginPath();
            this.ctx.strokeStyle = b;
            this.ctx.moveTo(trenuta_x,trenutna_y);
            let nx = ((ax * Math.pow(t,3)) + (bx * Math.pow(t,2)) + (cx * t) + this.tocke_za_risanje[0]);
            let ny = ((ay * Math.pow(t,3)) + (by * Math.pow(t,2)) + (cy * t) + this.tocke_za_risanje[1]);          
            this.ctx.lineTo(nx,ny);
            trenuta_x = nx;
            trenutna_y = ny;
            this.ctx.stroke();
            this.ctx.closePath();
        } 
        //let razdalja4_3x = 2*(this.tocke_za_risanje[6] - this.tocke_za_risanje[4]);
        //let razdalja4_3y = 2*(this.tocke_za_risanje[7] - this.tocke_za_risanje[5]); 
        
        let xx = this.tocke_za_risanje[4];//tretja tocka x
        let yy = this.tocke_za_risanje[5];//tretja tocka y

        let x = this.tocke_za_risanje[6];//6//cetrta tocka x
        let y = this.tocke_za_risanje[7];//6//cetrta tocka y
       

        let r = this.prezrcali(x,y,xx,yy);
        let nox = r.x;
        let noy = r.y;
       // let t =this.zrcalo(x,y,tx,ty);
        //let nox = t.x;
        //let noy = t.y;
        
        this.tocke_X.push(x);
        this.tocke_Y.push(y);
        this.tocke_X.push(nox);
        this.tocke_Y.push(noy);
        
        this.prerisi_zrcalo(x,y,nox,noy);
        this.tocke_za_risanje = [];    
    } 
    prezrcali(x,y,xx,yy){
        let rx = (2 * x - xx);
        let ry = (2 * y - yy);
        return {x:rx, y:ry};
    }
    /*zrcalo(x,y,tx,ty){
        let dx,dy,a,b,novx,novy;
        dx = x - tx;
        dy = y - ty;
        a = (dx *dx - dy * dy) / (dx * dx + dy *dy);
        b = 2 * dx *dy /(dx * dx + dy *dy);
        novx = Math.round( a *(tx - x) + b * (ty - y)+ x);
        novy = Math.round( b *(tx - x) - a * (ty - y)+ y);
        return {x:novx,y:novy};
    }*/
    prerisi_zrcalo(x,y,tx,ty){
        this.ctx.beginPath();
        this.ctx.arc(tx, ty , 5, 0, 2 * Math.PI, false);
        this.ctx.strokeStyle = "grey";
        this.ctx.moveTo(x,y);
        this.ctx.lineTo(tx,ty);
        this.ctx.fillStyle = this.preberi_barvo_vozlisc();
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        }
    
    risanje(x1,x2,x3,x4,y1,y2,y3,y4){
        this.tocke_za_risanje.push(x1,y1);
        this.tocke_za_risanje.push(x2,y2);
        this.tocke_za_risanje.push(x3,y3);
        this.tocke_za_risanje.push(x4,y4);
        
        this.premikanje.push({x:x1,y:y1,drzi:false});
        this.premikanje.push({x:x2,y:y2,drzi:false});
        this.premikanje.push({x:x3,y:y3,drzi:false});
        this.premikanje.push({x:x4,y:y4,drzi:false});
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


//https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event