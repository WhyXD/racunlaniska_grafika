class Drevo{
    constructor(meja, n){
       this.meja = meja;
       this.velikost = n;
       this.seznamTock = [];
       this.razdeljeno = false;
       this.mreza=document.getElementById("mreza").checked;
       this.kopijaTock =[];

    }
    t(){
        let st = document.getElementById("stevilo_tock").value;
        this.mreza = document.getElementById("mreza").checked;
       // console.log(checked);
    }
    vstavi(tocka){
        if(!this.meja.neVsebuje(tocka)){
            return;
        }
       if(this.seznamTock.length < this.velikost){
           this.seznamTock.push(tocka);
       }else{
           if(!this.razdeljeno){
            this.razdeli();
           }
           this.zgoraj_desno.vstavi(tocka);
           this.zgoraj_levo.vstavi(tocka);
           this.spodaj_desno.vstavi(tocka);
           this.spodaj_levo.vstavi(tocka);
       }
       this.prikazi_crte();
    }
    prikazi_crte(){
       // Izvedba.meje(this.meja.x - this.meja.w ,this.meja.y - this.meja.h , this.meja.w * 2 , this.meja.h * 2); //this.meja.x, this.meja.y, this.meja.w * 2 , this.meja.h * 2
       // console.log(this.meja.x, this.meja.y, this.meja.w*2  , this.meja.h*2 )
       if(!this.mreza){
         //  Izvedba.pocisti();  
       }
       this.prikazi_tocke(); 
       Izvedba.meje(this.meja.x - this.meja.w, this.meja.y - this.meja.h, this.meja.w*2  , this.meja.h *2); 
       
        if(this.razdeljeno){
            this.zgoraj_desno.prikazi_crte();
            this.zgoraj_levo.prikazi_crte();
            this.spodaj_desno.prikazi_crte();
            this.spodaj_levo.prikazi_crte();  
        }       
   }
   prikazi_tocke(){
       this.kopijaTock = this.seznamTock.slice();
        for(let p of this.seznamTock){
            Izvedba.tocke(p.x, p.y);
        }
   }
   static redraw(){
     
       for(let o of this.kopijaTock(1,2)){
            let p = o;
           Izvedba.tocke(p.x, p.y);
       }
   }

    razdeli(){
        let x = this.meja.x;
        let y = this.meja.y;
        let w = this.meja.w;
        let h = this.meja.h;
     
        let zgoraj_desno  = new Pravokotnik(x + w / 2, y - h / 2 , w / 2, h / 2);// + -
        this.zgoraj_desno = new Drevo(zgoraj_desno, this.velikost);
        
        let zgoraj_levo   = new Pravokotnik(x - w / 2, y - h / 2 , w / 2, h / 2);// - -
        this.zgoraj_levo  = new Drevo(zgoraj_levo, this.velikost);
        
        let spodaj_desno  = new Pravokotnik(x + w / 2, y + h / 2, w / 2, h / 2);// + +
        this.spodaj_desno = new Drevo(spodaj_desno, this.velikost);
        
        let spodaj_levo   = new Pravokotnik(x - w / 2, y + h / 2, w / 2, h / 2);// - +
        this.spodaj_levo  = new Drevo(spodaj_levo, this.velikost);
        
        this.razdeljeno = true;
    }  
}
