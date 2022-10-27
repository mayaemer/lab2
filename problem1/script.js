// validates the name input is only alphabetical letters, and is between 1 and 20 characters
function validateName(name){
    if (/^[A-Za-z\s]{1,20}$/.test(name)) {
        return true;
        
    }
    else{
        return 'Error with name'
    }
}

// validates the number input is only integer number, and is 10 characters
function validateNumber(number){
    if (/^[0-9]{10}$/.test(number)) {
        return true;
        
    }
    else{
        return 'Error with number'
    }
}

// validates email is an email address and it less than 40
function validateEmail(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && email.length < 40) {
        return true;
        
    }
    else{
        return 'Error with email'
    }
}

// search function to search for phone numbers
function search(){
    let searchItem = document.getElementById('searchbox').value;
    let num = document.getElementsByClassName('number')
    let contactRow = document.getElementsByClassName('contactRow')
    let searchError = document.getElementById('searchError');
    let count = 0


    // if there is no input, display no error
    if(searchItem == ''){
        searchError.style.display = 'none'; 
        count = 0
    }

    // loop through each number and check if it includes the item in the search bar,
    // if it is, keep displaying that number and increment the count var by 1
    //, else set the number to be hidden
    // if the count is 0, display error
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

//array to store contacts
let contactsArray = []

// function to add a new contact
document.getElementById('add').addEventListener('click', function(){
    event.preventDefault();

    // get the input values and store in variables
    let name = document.getElementById('name').value;
    let number = document.getElementById('number').value;
    let email = document.getElementById('email').value;

    let nameErr = document.getElementById('nameError');
    let numErr = document.getElementById('numError');
    let emailErr = document.getElementById('emailError');

    // set the error elements to empty     
    document.getElementById('nameError').innerHTML = '';
    document.getElementById('numError').innerHTML = '';
    document.getElementById('emailError').innerHTML = '';

    // if all the validations are correct, create text to add html to table
    //add a row to the table with the inputted details
    // also push details of contact as an array into the contacts array
    if (validateName(name) == true && validateNumber(number) == true && validateEmail(email) == true){
        let contact = `<tr class='contactRow'><td class='name'>` + name + `</td> <td class='number'>` + number + `</td> <td class='email'>` + email+ `</td></tr>`
        let arrayItem = [name, number, email]
        contactsArray.push(arrayItem)

        // if the table id is table body, add the html text to the table
        // else if the table id is sorted table, do the same
        if (document.getElementById('tableBody') != undefined){
            let table = document.getElementById('tableBody');
            table.innerHTML += contact
        }
        else if (document.getElementById('sortedTable') != undefined){
            let table = document.getElementById('sortedTable');
            table.innerHTML += contact
        }
        
        // clear the input sections
        document.getElementById('name').value = "";
        document.getElementById('number').value = "";
        document.getElementById('email').value = "";
    }
    // if validation is not successful, return errors
    else{
        let nameOut= validateName(name)
        let numOut= validateNumber(number)
        let emailOut = validateEmail(email)

        if (nameOut != true){
            nameErr.innerHTML += nameOut
        }
        if (numOut != true){
            numErr.innerHTML += numOut
        }
        if (emailOut != true){
            emailErr.innerHTML += emailOut
        }
    }
})


// function to sort names
document.getElementById('nameHeader').addEventListener('click', function(){
    // if table id is table body, sort the contacts array
    // empty the table and re add the sorted data
    //when data is added, set the id of table to sorted table
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
    // if table id is sorted table, sort the data in reverse, clear the table
    // and re add the data in reverse sorted order
    // then set table id to table body
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

