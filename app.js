let username = document.querySelector("#username");
let githubId = document.querySelector("#github-id");
let Name = document.querySelector("#name");
let bio = document.querySelector("#bio");
let button = document.querySelector("button");
let img = document.querySelector("img");
let repoCnt = document.querySelector("#repos-no");
let followersCnt = document.querySelector("#followers-no");
let followingCnt = document.querySelector("#following-no");
let place = document.querySelector("#location");
let twitter = document.querySelector("#twitter");
let email = document.querySelector("#email");
let org = document.querySelector("#org");
let profile = document.querySelector(".container");
let navbarDivs = document.querySelectorAll(".nav-bar div");
let notFound = document.querySelector("#user-found");
let repoSection = document.querySelector("#repos");
let repoContainer = document.querySelector(".repo-container");


let userData;


const getData = async (username) => {
    let userPromise = await fetch(`https://api.github.com/users/${username}`);
    let userData = await userPromise.json();
    console.log(userData["login"]);
    return userData;
}


const checkNull = (data, msg) => {
    if(data == null) return `${msg} Not Available`;
    else return data;
}


const populateInfo = (userData) => {
    img.src = userData["avatar_url"];
    Name.innerText = checkNull(userData["name"], "Name");
    githubId.innerText = userData["login"];
    bio.innerText = checkNull(userData["bio"], "Bio");
    repoCnt.innerText = userData["public_repos"];
    followersCnt.innerText = userData["followers"];
    followingCnt.innerText = userData["following"];
    place.innerText = checkNull(userData["location"], "");
    twitter.innerText = checkNull(userData["twitter_username"], "Twitter");
    email.innerText = checkNull(userData["email"], "");
    org.innerText = checkNull(userData["company"], "");
}


const showInfo = async (username) => {
    userData = await getData(username);
    
    if(userData["status"] == undefined) {
        populateInfo(userData);
        userFound();
        console.log("Found");
    }
    else {
        userNotFound();
    }
}


const userNotFound = () => {
    notFound.setAttribute("id", "not-found");
    hideProfile();
}


const userFound = () => {
    profile.removeAttribute("id");
    navbarDivs.forEach((e) => {
        e.removeAttribute("id");
    })
    notFound.removeAttribute("id");
    notFound.setAttribute("id", "user-found");
}


const hideProfile = () => {
    profile.setAttribute("id", "initial-container");
}


const initialSetup = () => {
    hideProfile();
    navbarDivs.forEach((e) => {
        e.setAttribute("id", "initial-navbar");
    })
}


button.addEventListener("click", () => {
    showInfo(username.value);
})

window.addEventListener("load", () => {
    initialSetup();
})



// Repos Logic -------------------------------->

const getRepos = async (url) => {
    let promise = await fetch(url);
    let repoList = await promise.json();
    return repoList;
}


const populateRepos = (repoList) => {
    let string = "";

    repoList.forEach((e) => {
        let name = e["name"];
        let description = checkNull(e["description"], "Description");
        // console.log(name, " ", description);
        string += `
            <div class="box">
                <h2 id="name">${name}</h2>
                <p id="description">${description}</p>
            </div>
        `;
    })

    repoContainer.innerHTML = string;
}


const displayRepos = async () => {
    let repoLink = await userData["repos_url"];
    let repoList = await getRepos(repoLink);
    hideProfile();
    populateRepos(repoList);
}


repoSection.addEventListener("click", () => {
    displayRepos();
})