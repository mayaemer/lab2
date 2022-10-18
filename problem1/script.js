let increment = (function(i) {
    return function() {
      i += 1;
      return i;
    }
  }(0));
  

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

function search(){
    let searchItem = document.getElementById('searchbox').value;
    let num = document.getElementsByClassName('number')
    let contactRow = document.getElementsByClassName('contactRow')
    let searchError = document.getElementById('searchError');
    let count = 0


    if(searchItem == ''){
        searchError.style.display = 'none'; 
        count = 0
    }

    for (i=0; i<num.length; i++){
        if (num[i].innerHTML.includes(searchItem)) {
            contactRow[i].style.display = ''; 
            searchError.style.display = 'none'; 
            count++;
        }
        else {
            contactRow[i].style.display = 'none';  


            
        }

        if(count == 0){
            searchError.style.display = 'block';
        }
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
        let contact = `<tr class='contactRow'><td class='name'>` + name + `</td> <td class='number'>` + number + `</td> <td class='email'>` + email+ `</td></tr>`
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


// note cap letters then small letters - not sorted together
document.getElementById('nameHeader').addEventListener('click', function(){
    
    if (document.getElementById('tableBody') != undefined){
        const sortedData = contactsArray.sort()
        let table = document.getElementById('tableBody');
        table.innerHTML = '';
        for (i = 0; i < sortedData.length; i++){
            let sortedName = sortedData[i][0]
            let sortedNum = sortedData[i][1]
            let sortedEmail = sortedData[i][2]
    
            let contact = `<tr class='contactRow'><td class='name'>` + sortedName + `</td> <td class='number'>` + sortedNum + `</td> <td class='number'>` + sortedEmail + `</td></tr>`
            table.innerHTML += contact
        
        }
    
        table.setAttribute('id', 'sortedTable')    
    }
    else if(document.getElementById('sortedTable') != undefined){
        const reversedData = contactsArray.reverse()
        let table = document.getElementById('sortedTable');
        table.innerHTML = '';
        for (i = 0; i < reversedData.length; i++){
            let sortedName = reversedData[i][0]
            let sortedNum = reversedData[i][1]
            let sortedEmail = reversedData[i][2]
    
            let contact = `<tr class='contactRow'><td class='name'>` + sortedName + `</td> <td class='number'>` + sortedNum + `</td> <td class='email'>` + sortedEmail + `</td></tr>`
            table.innerHTML += contact
            
            
        }
    
        table.setAttribute('id', 'tableBody')
    }
    else
        console.log('Error')
    
    
})

