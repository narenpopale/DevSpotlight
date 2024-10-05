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
let followersSection = document.querySelector("#followers");
let followingSection = document.querySelector("#following");
let repoContainer = document.querySelector(".repo-container");
let followersContainer = document.querySelector(".followers-container");
let followingContainer = document.querySelector(".following-container");
let profileTab = document.querySelector("#profile");


let userData;



// Utility Functions -------------------------------->

const checkNull = (data, msg) => {
    if(data == null) return `${msg} Not Available`;
    else return data;
}


const userNotFound = () => {
    notFound.setAttribute("id", "not-found");
    hideProfile();
}


const userFound = () => {
    showProfile();
    navbarDivs.forEach((e) => {
        e.removeAttribute("id");
    })
    notFound.removeAttribute("id");
    notFound.setAttribute("id", "user-found");
}


const showProfile = () => {
    profile.removeAttribute("id");
}


const hideProfile = () => {
    profile.setAttribute("id", "initial-container");
}


const showRepos = () => {
    repoContainer.removeAttribute("id");
}


const hideRepos = () => {
    repoContainer.setAttribute("id", "repo-sec");
}


const showFollowers = () => {
    followersContainer.removeAttribute("id");
}


const hideFollowers = () => {
    followersContainer.setAttribute("id", "followers-sec");
}


const showFollowing = () => {
    followingContainer.removeAttribute("id");
}


const hideFollowing = () => {
    followingContainer.setAttribute("id", "following-sec");
}


const initialSetup = () => {
    hideProfile();
    navbarDivs.forEach((e) => {
        e.setAttribute("id", "initial-navbar");
    })
}


window.addEventListener("load", () => {
    initialSetup();
})



// Profile Logic -------------------------------->

const getData = async (username) => {
    let userPromise = await fetch(`https://api.github.com/users/${username}`);
    let userData = await userPromise.json();
    console.log(userData["login"]);
    return userData;
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


button.addEventListener("click", () => {
    showInfo(username.value);
    hideRepos();
    hideFollowers();
    hideFollowing();
})

profileTab.addEventListener("click", () => {
    showProfile();
    hideRepos();
    hideFollowers();
    hideFollowing();
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
    populateRepos(repoList);
}


repoSection.addEventListener("click", () => {
    displayRepos();
    showRepos();
    hideProfile();
    hideFollowers();
    hideFollowing();
})



// Followers Logic -------------------------------->

const getFollowers = async (url) => {
    let promise = await fetch(url);
    let followersList = await promise.json();
    return followersList;
}


const populateFollowers = (followersList) => {
    let string = "";

    followersList.forEach((e) => {
        let username = e["login"];
        let src = e["avatar_url"];

        string += `
            <div class="box">
                <img src="${src}" alt="img">
                <h2 id="name">${username}</h2>
            </div>
        `;
        
    })

    followersContainer.innerHTML = string;
}


const displayFollowers = async () => {
    let link = await userData["followers_url"];
    let followersList = await getFollowers(link);
    populateFollowers(followersList);
}


followersSection.addEventListener("click", () => {
    displayFollowers();
    showFollowers();
    hideRepos();
    hideProfile();
    hideFollowing();
})



// Following Logic -------------------------------->

const getFollowing = async (url) => {
    let promise = await fetch(url);
    let followingList = await promise.json();
    return followingList;
}


const populateFollowing = (followingList) => {
    let string = "";

    followingList.forEach((e) => {
        let username = e["login"];
        let src = e["avatar_url"];

        string += `
            <div class="box">
                <img src="${src}" alt="img">
                <h2 id="name">${username}</h2>
            </div>
        `;
        
    })

    followingContainer.innerHTML = string;
}


const displayFollowing = async () => {
    let link = `https://api.github.com/users/${userData["login"]}/following`;
    console.log(link);
    let followingList = await getFollowing(link);
    populateFollowing(followingList);
}


followingSection.addEventListener("click", () => {
    displayFollowing();
    showFollowing();
    hideFollowers();
    hideRepos();
    hideProfile();
})