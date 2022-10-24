// async function to return posts with more than 6 words 
async function listPosts() {
    try 
    {     
        // fetch data from api   
        const res = await fetch('http://jsonplaceholder.typicode.com/todos')
        // parse to json
        let posts = await res.json();
        // return titles from the post, and filter where titles have more than 6 words and print
        let title = posts.map(posts => posts.title);
        title
        .filter(title => title.split(' ').length > 6)
        .forEach(titlesOverSix => console.log(titlesOverSix))
    }
    catch (error){
        console.log(error)
    }
}

//async function to return the frequency of each word
async function wordFrequency(){
    try{
        // data from api
        const res = await fetch('http://jsonplaceholder.typicode.com/posts');

        //map to store key value pairs as the word and frequency the word occurs
        let freqMap = {};

        //parse to json
        let posts = await res.json();

        //return body contents from map
        let bodyContents = posts.map(posts => posts.body);

        //split the body contents, to get each word, then go through each word and check against freqMap
        // if it is in freqMap, increment freqMap value for that word by one, 
        // else if it is not set a key as the word and set the value pair as one
        bodyContents.map(bodyContents => bodyContents.split(' ').map(word => word.replace('\\', ' ')).map(word => {
            if(word in freqMap){
                freqMap[word]++;
            }
            else{
                freqMap[word] = 1;
            }
        }
        ));

        // iterate through the map to print each key pair value
        let keys = Object.keys(freqMap);
        console.log(keys)
        //keys.forEach(key => console.log(key + ' is found ' + freqMap[key] + ' time(s)'));
    }
    catch(error){
        console.log(error)
    }
}

listPosts();
wordFrequency();