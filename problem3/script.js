// when user searches github user, clicking search button, function runs
document.getElementById('searchBtn').addEventListener('click', async function(){
    event.preventDefault();

    //display section class elements
    let sections = document.getElementsByClassName('section');
    for (let section of sections){
        section.style.display = 'grid';
    }

    //get input from search bar and send request using api with username, parsing the returned data to json
    let searchUser = document.getElementById('userName').value;
    const res = await fetch('https://api.github.com/users/' + searchUser);
    let userData = await res.json()


    // assign variable to each piece of data returned, and add it to html elements
    let image = userData.avatar_url;
    let username = userData.login;
    let email = userData.email;
    let location = userData.location;
    let gists = userData.public_gists;
    let avatarSection = `<img src="` + image + `">`;
    let infoSection = `<p> Name: ` + username + `</p>
                        <p> Email: ` + email + `</p>
                        <p> Location: ` + location + `</p>
                        <p> Number of Gists: ` + gists + `</p>`;
            
    document.getElementById('avatarSection').innerHTML = avatarSection;
    document.getElementById('infoSection').innerHTML = infoSection;
    
    // fetch repo data, parse it to json 
    let repos = userData.repos_url;    
    const response = await fetch(repos);
    let repo_res = await response.json(); 

    // create table for repo info
    let repoTableBody= `<thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody id='tableBody'>
                    </tbody>`
    document.getElementById('repoTable').innerHTML = repoTableBody;
    
    // for each repo in response, assign to variable and add into repo table
    repo_res.forEach( repo_res => {
        let repoName = repo_res.name;
        let repoDesc = repo_res.description;

        let repoContents = `<tr>
                                <td>` + repoName + `</td>
                                <td>` + repoDesc + `</td>
                            </tr>`

        document.getElementById('tableBody').innerHTML += repoContents
    }
    )

    // if repo table has more than 5 rows, add class scrollable, which will add scroll to table using css
    let repoRows = document.getElementById('repoTable').rows.length;
    //console.log(repoRows)
    if (repoRows > 5){
        document.getElementById('userRepos').classList.add('scrollable');
    }
    else{
        document.getElementById('userRepos').classList.remove('scrollable');

    }

})

