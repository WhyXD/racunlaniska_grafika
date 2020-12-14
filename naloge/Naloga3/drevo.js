class Drevo {
    constructor(meja, n, canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.meja = meja;
        this.velikost = n;
        this.seznamTock = [];
        this.razdeljeno = false;
        this.mreza = document.getElementById("mreza").checked;
        this.kopijaTock = [];

    }
    t() {
        let st = document.getElementById("stevilo_tock").value;
        this.mreza = document.getElementById("mreza").checked;
        // console.log(checked);
    }
    vstavi(tocka) {
        if (!this.meja.neVsebuje(tocka)) {
            return;
        }
        if (this.seznamTock.length < this.velikost) {
            this.seznamTock.push(tocka);
        } else {
            if (!this.razdeljeno) {
                this.razdeli();
            }
            this.zgoraj_desno.vstavi(tocka);
            this.zgoraj_levo.vstavi(tocka);
            this.spodaj_desno.vstavi(tocka);
            this.spodaj_levo.vstavi(tocka);
        }
        
        if(mreza){
            this.prikazi_crte();
        }
    }
    prikazi_crte() {
        // Izvedba.meje(this.meja.x - this.meja.w ,this.meja.y - this.meja.h , this.meja.w * 2 , this.meja.h * 2); //this.meja.x, this.meja.y, this.meja.w * 2 , this.meja.h * 2
        // console.log(this.meja.x, this.meja.y, this.meja.w*2  , this.meja.h*2 )
        //   if(!this.mreza){
        //  Izvedba.pocisti();  
        // }
        //this.prikazi_tocke(); 


       // this.tocke();
       if(mreza)
            this.meje(this.meja.x - this.meja.w, this.meja.y - this.meja.h, this.meja.w * 2, this.meja.h * 2);

        if (this.razdeljeno) {
            this.zgoraj_desno.prikazi_crte();
            this.zgoraj_levo.prikazi_crte();
            this.spodaj_desno.prikazi_crte();
            this.spodaj_levo.prikazi_crte();
        }
        
    }
    /*prikazi_tocke(){
         for(let p of this.seznamTock){
             //Izvedba.tocke(p.x, p.y);
           //  p.x += p.dx;
            // p.y += p.dy;
             Izvedba.tocke(p.x, p.y);
         }
       //  window.requestAnimationFrame(this.prikazi_tocke());
        // this.animacija();
    } */
    tocke() {
        for (let p of this.seznamTock) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2, false);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.closePath();
        }

    }
    meje(x, y, x1, y1) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.rect(x, y, x1, y1);
        ctx.stroke();
        ctx.closePath();
    }

    posodobi() {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        let a = 0;
        for (let p of this.seznamTock) {
            p.x += p.dx;
            p.y += p.dy;
            if (p.x + p.r > canvas.clientWidth || p.x - p.r < 0) {
                p.dx = -p.dx;
            }
            if (p.y + p.r > canvas.clientHeight || p.y - p.r < 0) {
                p.dy = -p.dy;
            }
            this.update(p.x, p.y, a);

            /* ctx.beginPath();
             ctx.arc(p.x, p.y , 5 , 0 , Math.PI*2, false);
             ctx.fillStyle = "red";
             ctx.fill(); 
             ctx.closePath(); */
            this.animacija(a);
        }
        a=0;
        window.requestAnimationFrame(this.posodobi);
    }

    update(x, y, i) {
        this.seznamTock[i].x = x;
        this.seznamTock[i].y = y;
    }
    animacija(a) {
        ctx.beginPath();
        ctx.arc(this.seznamTock[a].x, this.seznamTock[a].y, 5, 0, Math.PI * 2, false);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
    seznam() {
        return this.seznamTock;
    }


    razdeli() {
        let x = this.meja.x;
        let y = this.meja.y;
        let w = this.meja.w;
        let h = this.meja.h;

        let zgoraj_desno = new Pravokotnik(x + w / 2, y - h / 2, w / 2, h / 2);// + -
        this.zgoraj_desno = new Drevo(zgoraj_desno, this.velikost);

        let zgoraj_levo = new Pravokotnik(x - w / 2, y - h / 2, w / 2, h / 2);// - -
        this.zgoraj_levo = new Drevo(zgoraj_levo, this.velikost);

        let spodaj_desno = new Pravokotnik(x + w / 2, y + h / 2, w / 2, h / 2);// + +
        this.spodaj_desno = new Drevo(spodaj_desno, this.velikost);

        let spodaj_levo = new Pravokotnik(x - w / 2, y + h / 2, w / 2, h / 2);// - +
        this.spodaj_levo = new Drevo(spodaj_levo, this.velikost);

        this.razdeljeno = true;
    }
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let mreza = document.getElementById("mreza").checked;
let st = document.getElementById("stevilo_tock").value;

let me = new Pravokotnik(0, 0, canvas.clientWidth, canvas.clientHeight);
let sd = new Drevo(me, 10, canvas, ctx);
//let iz = new Izvedba(canvas,ctx,meja);
let md = false;

for (let i = 0; i <st ; i++) {
    let x = (Math.random() * canvas.clientWidth);
    let y = (Math.random() * canvas.clientHeight);
    let t = new Tocka(x, y);
    sd.vstavi(t);

}


canvas.addEventListener("mousedown", () => {
    md = true;
    canvas.addEventListener("mousemove", (ev) => {
        if (md) {
            let mx = ev.clientX - canvas.offsetLeft// - centerCX;
            let my = ev.clientY - canvas.offsetTop //- centerCY;
            let p = new Tocka(mx, my)
            sd.vstavi(p);
            md = true;
        }
    });

});
canvas.addEventListener("mouseup", () => {
    md = false;
});
//window.requestAnimationFrame(sd.posodobi)
window.requestAnimationFrame(i);

function i(){
ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
let s = sd.seznam();
let a=0;
for(let p of s){
    p.x += p.dx;
    p.y += p.dy;
    if(p.x + p.r > canvas.clientWidth || p.x - p.r < 0){
        p.dx = -p.dx;
    }
    if(p.y + p.r > canvas.clientHeight || p.y - p.r < 0){
        p.dy = -p.dy;
    }
    sd.update(p.x,p.y,a);
    let n = new Tocka(p.x,p.y);
    sd.vstavi(n);
    
   sd.animacija(a);
/*
     ctx.beginPath();
     ctx.arc(p.x, p.y , 5 , 0 , Math.PI*2, false);
     ctx.fillStyle = "red";
     ctx.fill();
     ctx.closePath();
     a++;*/
}
a=0;
window.requestAnimationFrame(i);
}

