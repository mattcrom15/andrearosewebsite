function formSubmit(){
    event.preventDefault()
    document.querySelector('.submit-gif').style.display = 'block'
    document.getElementById('form-email').style.borderColor = 'rgb(118, 118, 118)'
    document.getElementById('form-name').style.borderColor = 'rgb(118, 118, 118)'
    document.getElementById('form-msg').style.borderColor = 'rgb(118, 118, 118)'
    document.getElementById('form-subject').style.borderColor = 'rgb(118, 118, 118)'
    document.getElementById('form-btn').disabled = true;
    var email = document.getElementById('form-email').value
    var name = document.getElementById('form-name').value
    var msg = document.getElementById('form-msg').value
    var subject = document.getElementById('form-subject').value
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var checks = 0
    if (email.match(mailformat)){
        //pass
        checks ++
    }else{
        document.getElementById('form-email').style.borderColor = '#E90915'
        alert("Please enter a correct email address");
        document.getElementById('form-btn').disabled = false;
        document.querySelector('.submit-gif').style.display = 'none'
    }
    
    if (name === ""){
        document.getElementById('form-name').style.borderColor = '#E90915'
        alert("Please enter your name");
        document.getElementById('form-btn').disabled = false;
        document.querySelector('.submit-gif').style.display = 'none'
    }else{
        checks ++
    }

    if (msg ===""){
        document.getElementById('form-msg').style.borderColor = '#E90915'
        alert("Please enter your message");
        document.getElementById('form-btn').disabled = false;
        document.querySelector('.submit-gif').style.display = 'none'

    }else{
        checks ++
    }

    if (subject ===""){
        document.getElementById('form-subject').style.borderColor = '#E90915'
        alert("Please enter a subject");
        document.getElementById('form-btn').disabled = false;
        document.querySelector('.submit-gif').style.display = 'none'
    }else{
        checks ++
    }
    if (checks === 4){
        var entry =$('form').serializeArray();
        $.ajax({
            type: 'POST',
            url: 'https://www.counselling-with-andrea-rose.com/contact.php',
            data: entry,
            error: function(){
            alert("An error has occured. please refresh the page and try again.");
            },
            success: function(response){  
            console.log(response)
            document.querySelector('.submit-gif').style.display = 'none'
            document.querySelector('.success-modal').style.opacity = 1;
            document.querySelector('.success-modal').style.pointerEvents = 'auto';

            } // this was missing
        });
        document.getElementById('form-email').value = ''
        document.getElementById('form-name').value = ''
        document.getElementById('form-msg').value = ''
        document.getElementById('form-subject').value = ''

    }
    

    
};