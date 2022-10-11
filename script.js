function validateName(name){
    if (/^[A-Za-z\s]{1,20}$/.test(name)) {
        return true;
        
    }
    else{
        return 'Error with name'
    }
}

function validateNumber(number){
    if (/^[0-9]{10}$/.test(number)) {
        return true;
        
    }
    else{
        return 'Error with number'
    }
}

function validateEmail(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && email.length < 40) {
        return true;
        
    }
    else{
        return 'Error with email'
    }
}

let contactsArray = []

document.getElementById('add').addEventListener('click', function(){
    event.preventDefault();
    let name = document.getElementById('name').value;
    let number = document.getElementById('number').value;
    let email = document.getElementById('email').value;

    let nameErr = document.getElementById('nameError');
    let numErr = document.getElementById('numError');
    let emailErr = document.getElementById('emailError');

    let arrayItem = [name, number, email]
    contactsArray.push(arrayItem)
    
    document.getElementById('nameError').innerHTML = '';
    document.getElementById('numError').innerHTML = '';
    document.getElementById('emailError').innerHTML = '';

    if (validateName(name) == true && validateNumber(number) == true && validateEmail(email) == true){
        let table = document.getElementById('tableBody');
        let contact = `<tr><td>` + name + `</td> <td>` + number + `</td> <td>` + email+ `</td></tr>`
        table.innerHTML += contact
        
        document.getElementById('name').value = "";
        document.getElementById('number').value = "";
        document.getElementById('email').value = "";
    }
    else{
        let nameOut= validateName(name)
        let numOut= validateNumber(number)
        let emailOut = validateEmail(email)
        
        if (nameOut){
            nameErr.innerHTML = nameOut
        }
        if (!numOut){
            numErr.innerHTML = numOut
        }
        if (!emailOut){
            emailErr.innerHTML = emailOut
        }
    
        document.getElementById('name').value = "";
        document.getElementById('number').value = "";
        document.getElementById('email').value = "";
        
    }
   
})

document.getElementById('searchbox').addEventListener('keypress', function(){
    document.getElementById('searchbox').focus();
    //if (document.getElementById("searchbox").value in tablevalues)
})

document.getElementById('name').addEventListener('click', function(){
    console.log(contactsArray);
})

