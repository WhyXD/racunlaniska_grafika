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

    narisi_tocko(x,y){
    this.tocke_X.push(x);
    this.tocke_Y.push(y);
    this.ctx.beginPath();
    if(this.tocke_X.length == 2 || this.tocke_X.length == 3){
       this.ctx.arc(x, y , 5, 0, 2 * Math.PI, false);
    }else{
        this.ctx.rect(x-4,y-4,8,8);  
    }
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
           // let nx =  3*(Math.pow(1-t,2)*(this.tocke_za_risanje[2]-this.tocke_za_risanje[0])) +(6*(1-t)*t*(this.tocke_za_risanje[4]-this.tocke_za_risanje[2])+ 3*(Math.pow(t,2)* (this.tocke_za_risanje[6] - this.tocke_za_risanje[4])));
            //let ny =  3*(Math.pow(1-t,2)*(this.tocke_za_risanje[3]-this.tocke_za_risanje[1])) +(6*(1-t)*t*(this.tocke_za_risanje[5]-this.tocke_za_risanje[3])+ 3*(Math.pow(t,2)* (this.tocke_za_risanje[7] - this.tocke_za_risanje[5])));

            //let nx = ( (Math.pow(1-t,2)*this.tocke_za_risanje[0]) +(3*(Math.pow(1-t,2)*t*this.tocke_za_risanje[2])+ 3*(1-t)*(Math.pow(t,2))* this.tocke_za_risanje[4]+ Math.pow(t,3)*this.tocke_za_risanje[6]));
            //let ny =  ( (Math.pow(1-t,2)*this.tocke_za_risanje[1]) +(3*(Math.pow(1-t,2)*t*this.tocke_za_risanje[3])+ 3*(1-t)*(Math.pow(t,2))* this.tocke_za_risanje[5]+ Math.pow(t,3)*this.tocke_za_risanje[7]));
            let nx = ((ax * Math.pow(t,3)) + (bx * Math.pow(t,2)) + (cx * t) + this.tocke_za_risanje[0]);
            let ny = ((ay * Math.pow(t,3)) + (by * Math.pow(t,2)) + (cy * t) + this.tocke_za_risanje[1]);          
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

    premakni(Event){
     this.myDown(Event);
     this.myUp(Event);
     this.myMove(Event);
    }
    myDown(Event){
       Event.preventDefault();
       Event.stopPropagation();

        let novx =(Event.clientX -this.offsetLeft );
        let novy = (Event.clientY - this.offsetTop);
        this.drag = false;
        let f = this.premikanje.length;
        for(let i=0;i<f;i++){
            let r = this.premikanje[i];
            if(novx>=r.x && novx<=r.x && novy>=r.y && novy<=r.y){
                this.drag = true;
                r.drzi = true;
            }
        }
        this.start_X = novx;
        this.start_Y = novy;
    }
    myUp(Event){
        Event.preventDefault();
        Event.stopPropagation();
        this.drag=false;
        for(let i=0;i<this.premikanje.length;i++){
            this.premikanje[i].drzi=false;  
        }
    }

    myMove(Event){
        if(this.drzi){
            Event.preventDefault();
            Event.stopPropagation();
            let novx = Event.clientX - this.offsetLeft;
            let novy = Event.clientY  - this.offsetTop;
    
            let dx = novx - this.start_X;
            let dy = novy - this.start_Y;
            for(let i=0;i<this.premikanje.length;i++){
                let r = this.premikanje[i];
                if(r.drzi){
                    r.x += dx;
                    r.y += dy;
                }
            }
            this.izrisi();
            this.start_X = novx;
            this.start_Y = novy;
        } 
    }
    
    izrisi(){
        clear();
        prem(x,y,drzanje);
        for(let i=0;i<this.premikanje.length;i++){
            let r= this.premikanje[i];
            prem(r.x,r.y,r.drzanje);
        }
    }
    clear(){
        ctx.clearRect(0,0,600,600);
    }
    prem(x,y,drzanje){
        ctx.beginPath();
        ctx.prem(x,y,drzanje);
        ctx.closePath();
        ctx.fill();
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

//canvas.onmouseup = b.myUp;
//canvas.onmousemove = b.myMove;
});
/*http://jsfiddle.net/m1erickson/qm9Eb/ */

canvas.addEventListener("mousedown",function(e){
    b.premakni(e);
})

//canvas.onmousedown =b.myDown;
//canvas.onmouseup = b.myUp;
//canvas.onmousemove = b.myMove;

//https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event