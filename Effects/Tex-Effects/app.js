class TypeWriter {
    constructor(txtElement, words, wait=500){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;
    }
    type(){
        //Current index of word
        const current = this.wordIndex % this.words.length;
        //Get full text of current word
        const fullTxt = this.words[current];
        
        //Check if deleting
        if(this.isDeleting){
            //Remove char
            this.txt = fullTxt.substring(0,this.txt.length-1);
        }else{
            //Add char
            this.txt = fullTxt.substring(0,this.txt.length+1);
        }
        
        //Insert txt into element
        this.txtElement.innerHTML =`<span class='txt'>${this.txt}</span>`;
        
        //Initial Type Speed
        let typeSpeed = 50;
        if(this.isDeleting){
            typeSpeed/=2;
        }

        //If word is complete
        if(!this.isDeleting && this.txt === fullTxt){
            //Make a pause at the end
            typeSpeed=this.wait;
            this.isDeleting=true;
        }else if(this.isDeleting&&this.txt===''){
            this.isDeleting=false;
            //Move to next word
            this.wordIndex++;
            //Pause before start typing
            typeSpeed = 200;
        }

        setTimeout(()=>this.type(),typeSpeed);
    }

}

//Init on DOM load
document.addEventListener('DOMContentLoaded',init);

//Init App
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    //Init TypeWriter
    new TypeWriter(txtElement,words,wait);
}



const logo = document.querySelectorAll('#logo path');
// console.log(logo);

for(let i=0;i<logo.length; i++){
    console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
    console.log(`${logo[i]}`);
    console.log('---------------');
}
