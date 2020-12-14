class Izvedba{
    constructor(canvas, ctx, meja){
        this.canvas = canvas;
        this.ctx = ctx;
        this.checked;
        this.st;
        this.meja = meja;
    }
    static t(){
        this.st = document.getElementById("stevilo_tock").value;
        this.checked = document.getElementById("mreza").checked;
        console.log(this.checked); 
       
        //iz.pripravi();
        Izvedba.pripravi();
    }
    pripravi(){
    //this.meja = new Pravokotnik(0,0,600,600);
    //this.sd = new Drevo(this.meja,4); 
    //for(let i = 0;i<5;i++){
       //let p = new Tocka(x,y);
        // let p = new Tocka(Math.random()*600, Math.random()*100);
      //  this.sd.vstavi(p);
    //}
    //console.log(this.sd);
     /*   if(this.checked){
            this.sd.prikazi();
            this.sd.prikazi_tocke();
        }else{
            this.sd.prikazi_tocke(); 
        }*/
      //  this.sd.prikazi_crte();
        //this.sd.prikazi_tocke();
    }
    static tocke(x, y){
        ctx.beginPath();
        ctx.arc(x, y , 5 , 0 , Math.PI*2, false);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
      //  console.log(x,y);
    }

    static meje(x,y,x1,y1){
        ctx.beginPath();
        ctx.strokeStyle="black";
        ctx.rect(x,y,x1,y1);
        ctx.stroke();
        ctx.closePath();
    }
    static pocisti(){
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);     
    }
    static animacija(i){
       // ctx.clearRect(0,0, canvas.clientWidth,canvas.clientHeight);
        let s = sd.seznam();
        ctx.beginPath();
        ctx.arc(s[i].x, s[i].y , 5 , 0 , Math.PI*2, false);
        ctx.fillStyle = "red";
        ctx.fill();  
    }
     
}
  
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let mreza = document.getElementById("mreza").checked;
//let centerCX = canvas.clientWidth * 0.5;
//let centerCY = canvas.clientHeight * 0.5;

//ctx.translate(centerCX,centerCY);
//console.log(centerCX,centerCY);
let meja = new Pravokotnik(0,0,canvas.clientWidth,canvas.clientHeight);
let sd = new Drevo(meja,10); 
let iz = new Izvedba(canvas,ctx,meja);
let md = false;
for(let i = 0;i<10;i++){
    let x = (Math.random() * canvas.clientWidth);
    let y = (Math.random() * canvas.clientHeight);
    let t = new Tocka(x,y);
    sd.vstavi(t);
    
}
sd.posodobi();
canvas.addEventListener("mousedown",()=>{
    md =true;
        canvas.addEventListener("mousemove", (ev)=>{
        if(md){
            let mx = ev.clientX - canvas.offsetLeft// - centerCX;
            let my = ev.clientY - canvas.offsetTop //- centerCY;
            let p = new Tocka(mx,my)
            sd.vstavi(p);
           md = true; 
        }
    }); 
    

   
   // let mx = e.clientX - canvas.offsetLeft// - centerCX;
    //let my = e.clientY - canvas.offsetTop //- centerCY;
    /*if(my < 0 && mx < 0){
        my = my * -1;
    }else if(mx > 0 && my < 0){
        my = my * -1;
    }else if(mx < 0 && my > 0){
        my = my * -1;
    }else if(mx > 0 && my > 0){
        mx = mx * -1;
        my = my * -1;
    }*/
    
    //let p = new Tocka(mx,my)
    //sd.vstavi(p);
   // sd.prikazi_tocke();
    //console.log(sd);
    //console.log(mx,my);
});
canvas.addEventListener("mouseup",()=>{
    md = false;
   
});


//https://www.youtube.com/watch?v=OJxEcs0w_kE
//https://www.youtube.com/watch?v=z0YFFg_nBjw