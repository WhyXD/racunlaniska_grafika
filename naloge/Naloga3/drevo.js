class Drevo {
    mrez = document.getElementById("mreza").checked;
    static stevilo_trcenj=0;
    constructor(meja, n, canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.meja = meja;
        this.velikost = n;
        this.seznamTock = [];
        this.razdeljeno = false;
        this.kopijaTock = [];
        this.st = 0;
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
         this.prikazi_crte();
        this.kopijaTock.push(tocka);
        this.animacija();
       
          
    }
    ani(){
        if(this.razdeljeno){
            this.zgoraj_desno.animacija();
            this.zgoraj_levo.animacija();
            this.spodaj_desno.animacija();
            this.spodaj_levo.animacija();    
        }
    }

    prikazi_crte() {
      //  this.tocke();
       // this.meje(this.meja.x - this.meja.w, this.meja.y - this.meja.h, this.meja.w * 2, this.meja.h * 2);

        if (this.razdeljeno) {
            this.zgoraj_desno.prikazi_crte();
            this.zgoraj_levo.prikazi_crte();    
            this.spodaj_desno.prikazi_crte();    
            this.spodaj_levo.prikazi_crte();  
        }else{
            this.animacija();
        }
    }
    tocke() {
        for (let p of this.seznamTock) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 8, 0, Math.PI * 2, false);
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

    update(x, y, i) {
        this.seznamTock[i].x = x;
        this.seznamTock[i].y = y;
    }
    animacija() {
    //ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); 
    
    if(this.seznamTock.length >= 0 ){
      for (let i = 0; i < this.seznamTock.length;i++) {   
             let p = this.seznamTock[i];
            if (p.x + p.r >= canvas.clientWidth || p.x - p.r <= 0) {
                p.dx = -p.dx;
            }
            if (p.y + p.r >= canvas.clientHeight || p.y - p.r <= 0) {
                p.dy = -p.dy;
            }    
            for (let j = 1; j < this.seznamTock.length;j++) {   
                 let o = this.seznamTock[j];
                    if (o.x + o.r > canvas.clientWidth || o.x - o.r < 0) {
                        o.dx = -o.dx;
                    }
                    if (o.y + o.r > canvas.clientHeight || o.y - o.r < 0) {
                        o.dy = -o.dy;
                    }
                    o.x += o.dx * 0.1;
                    o.y += o.dy * 0.1;
                    let barv = sd.sekanje(o.x, o.y, o.r, p.x, p.y, p.r, );
                    if ((o != p) && barv) {                
                        console.log(o, ' in ', p)
                       // ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
                      this.pobarvaj(i);
                      this.pobarvaj(j);
                        Drevo.stevilo_trcenj++;
                    }else{
                        //ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
                        ctx.beginPath();
                        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2, false);
                        ctx.fillStyle = "purple";
                        ctx.fill();
                    }
                this.update(o.x, o.y, j);
            }
            this.update(p.x,p.y,i);
        document.getElementById("tocke").innerText = Tocka.size;
        document.getElementById("trcenj").innerText = Drevo.stevilo_trcenj;
        }
     //  window.requestAnimationFrame(this.animacija());
    }else{
        return ;
    }
    }    
    seznam() {
        return this.seznamTock;
    }
    seznam_kopija(){
        return this.kopijaTock;
    }
    sekanje(x1, y1, r1, x2, y2, r2) {
        let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

        return squareDistance <= ((r1 + r2) * (r1 + r2))
    }
    pobarvaj(i) {  
       // ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.beginPath();
        ctx.arc(this.seznamTock[i].x, this.seznamTock[i].y, this.seznamTock[i].r, 0, Math.PI * 2, false);
        ctx.fillStyle = "green";
        ctx.fill();
                 
    }
    razdeli() {
        let x = this.meja.x;
        let y = this.meja.y;
        let w = this.meja.w;
        let h = this.meja.h;

        let zgoraj_desno = new Pravokotnik(x + w / 2, y - h / 2, w / 2, h / 2);// + -
        this.zgoraj_desno = new Drevo(zgoraj_desno, this.velikost, this.canvas, this.ctx);

        let zgoraj_levo = new Pravokotnik(x - w / 2, y - h / 2, w / 2, h / 2);// - -
        this.zgoraj_levo = new Drevo(zgoraj_levo, this.velikost, this.canvas, this.ctx);

        let spodaj_desno = new Pravokotnik(x + w / 2, y + h / 2, w / 2, h / 2);// + +
        this.spodaj_desno = new Drevo(spodaj_desno, this.velikost, this.canvas, this.ctx);

        let spodaj_levo = new Pravokotnik(x - w / 2, y + h / 2, w / 2, h / 2);// - +
        this.spodaj_levo = new Drevo(spodaj_levo, this.velikost, this.canvas, this.ctx);

        this.razdeljeno = true;
    }
    narisi_crte(mre) {
        if(mre){
            this.meje(this.meja.x - this.meja.w, this.meja.y - this.meja.h, this.meja.w * 2, this.meja.h * 2);
            if (this.razdeljeno) {
                this.zgoraj_desno.narisi_crte(mre);
                this.zgoraj_desno.animacija();
                this.zgoraj_levo.narisi_crte(mre);
                this.zgoraj_levo.animacija();
                this.spodaj_desno.narisi_crte(mre);
                this.spodaj_desno.animacija();
                this.spodaj_levo.narisi_crte(mre);
                this.spodaj_levo.animacija();
            }
        }else{
            ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); 
            this.prikazi_crte();
        }   
    }
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let st = document.getElementById("stevilo_tock").value;
const TTT = [];

let me = new Pravokotnik(0, 0, canvas.clientWidth, canvas.clientHeight);
let sd = new Drevo(me, 10, canvas, ctx);
let md = false;

for (let i = 0; i < 50; i++) {
    let x = (Math.random() * canvas.clientWidth) + 1;
    let y = (Math.random() * canvas.clientHeight) + 1;
    let t = new Tocka(x, y)
    TTT.push(t);
    sd.vstavi(t);
}
function klik(){
    let mre = document.getElementById("mreza").checked;
    sd.narisi_crte(mre)
}
//window.requestAnimationFrame(sd.ani);
canvas.addEventListener("mousedown", () => {
    md = true;
    canvas.addEventListener("mousemove", (ev) => {
        if (md) {
            let mx = ev.clientX - canvas.offsetLeft// - centerCX;
            let my = ev.clientY - canvas.offsetTop //- centerCY;
            let p = new Tocka(mx, my)
            TTT.push(p);
            sd.vstavi(p);
            md = true;   
        }
    });
});
canvas.addEventListener("mouseup", () => {
    md = false;
});

