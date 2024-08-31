function myFunction(){
    var x=document.getElementById('myInput');
    var y=document.getElementById('hide');
    var z=document.getElementById('show');

    if(x.type==='password'){
        x.type='text';
        y.style.display='none';
        z.style.display='block';
    }
    else{
        x.type='password';
        y.style.display='block';
        z.style.display='none';
    }
}

