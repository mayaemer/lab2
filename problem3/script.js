document.getElementById('searchBtn').addEventListener('click', async function(){
    event.preventDefault();
    let searchUser = document.getElementById('userName').value;
    const res = await fetch('https://api.github.com/users/' + searchUser);
    let userData = await res.json()

    let image = userData.avatar_url;
    let username = userData.login;
    let email = userData.email;
    let location = userData.location;
    let gists = userData.public_gists;
    let info = `<img src="` + image + `">
                <p>` + username + `</p>
                <p>` + email + `</p>
                <p>` + location + `</p>
                <p>` + gists + `</p>`;
    
    document.getElementById('infoSection').innerHTML = info;

    let repos = userData.repos_url;
    console.log(repos);
    
    const response = await fetch(repos);
    let repo_res = await response.json(); 

    let repoTableBody= `<thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody id='tableBody'>
                    </tbody>`
    document.getElementById('repoTable').innerHTML = repoTableBody;
    
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

    let repoRows = document.getElementById('repoTable').rows.length;
    console.log(repoRows)
})

async function getData() {
    try 
    {     
        // fetch data from api   
        const res = await fetch('https://api.github.com/users')
        // parse to json

        let userData = await res.json()
        //console.log(userData)
        let id = userData.map(userData => userData.id);
        let username = userData.map(userData => userData.login);
        let repo = userData.map(userData => userData.repos_url);
        //console.log(id)
        //console.log(userData)
        // possibly use map?
        let name = [];
        let email = [];
        let location = [];
        let gists = [];
        let avatar = [];

        id.forEach(async id => 
          {
                const response = await fetch('https://api.github.com/users/' + id);
                let userInfo = await response.json();
                //console.log(userInfo)
                name.push(userInfo.name);
                email.push(userInfo.email);
                location.push(userInfo.location);
                gists.push(userInfo.gists_url);
                avatar.push(userInfo.avatar_url);

            }
        )

        //console.log(name)
        // console.log(email)
        // console.log(location)
        // console.log(gists)
        // console.log(avatar)



        
        
    
        
    }
    catch (error){
        console.log(error)
    }
}

async function getUserData() {
    try 
    {     
        // fetch data from api   
        const res = await fetch('https://api.github.com/users')
        // parse to json

        let userData = await res.json()
        //console.log(userData)
        let id = userData.map(userData => userData.id);
        let username = userData.map(userData => userData.login);
        let repo = userData.map(userData => userData.repos_url);
        //console.log(id)
        //console.log(userData)



        
        
    
        
    }
    catch (error){
        console.log(error)
    }
}
