document.addEventListener("DOMContentLoaded", function(event) {
   
    const showNavbar = (navId, bodyId, headerId) =>{
    const toggle = document.getElementById('header-toggle'),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)
    

    if(toggle && nav && bodypd && headerpd){
    toggle.addEventListener('click', ()=>{

    nav.classList.toggle('show')

    toggle.classList.toggle('bx-x')

    bodypd.classList.toggle('body-pd')

    headerpd.classList.toggle('body-pd')
    })
    }
    }
    
    showNavbar('header-toggle','nav-bar','body-pd','header')
    
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')
    
    function colorLink(){
    if(linkColor){
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
    }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))
    
     // Your code to run since DOM is loaded and ready
    });