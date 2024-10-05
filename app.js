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
let isDataAvailable;



// Utility Functions -------------------------------->

const getData = async (url) => {
    let promise = await fetch(url);
    let data = await promise.json();
    return data;
}


const checkNull = (data, msg) => {
    if(data == null) return `${msg} Not Available`;
    else return data;
}


const switchTab = (tabName) => {
    tabName === "profile" ? showProfile() : hideProfile();
    tabName === "repos" ? showRepos() : hideRepos();
    tabName === "followers" ? showFollowers() : hideFollowers();
    tabName === "following" ? showFollowing() : hideFollowing();
}


const userNotFound = () => {
    navbarDivs.forEach((e) => {
        e.setAttribute("id", "initial-navbar");
    })
    notFound.setAttribute("id", "not-found");
}


const userFound = () => {
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
    switchTab("");
    navbarDivs.forEach((e) => {
        e.setAttribute("id", "initial-navbar");
    })
}


window.addEventListener("load", () => {
    initialSetup();
})



// Profile Logic -------------------------------->

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
    let url = `https://api.github.com/users/${username}`;
    userData = await getData(url);
    
    if(userData["status"] == undefined) {
        populateInfo(userData);
        userFound();
        switchTab("profile");
        isDataAvailable = true;
    }
    else {
        userNotFound();
        switchTab("");
        isDataAvailable = false;
    }
}


button.addEventListener("click", () => {
    showInfo(username.value);
})

username.addEventListener("keydown", (e) => {
    if(e.key == "Enter") showInfo(username.value);
})

profileTab.addEventListener("click", () => {
    if(isDataAvailable) switchTab("profile");
})



// Repos Logic -------------------------------->

const populateRepos = (repoList) => {
    let string = "";

    repoList.forEach((e) => {
        let name = e["name"];
        let description = checkNull(e["description"], "Description");
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
    let url = await userData["repos_url"];
    let repoList = await getData(url);
    populateRepos(repoList);
}


repoSection.addEventListener("click", () => {
    if(isDataAvailable) {
        displayRepos();
        switchTab("repos");
    }
})



// Followers Logic -------------------------------->

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
    let url = await userData["followers_url"];
    let followersList = await getData(url);
    populateFollowers(followersList);
}


followersSection.addEventListener("click", () => {
    if(isDataAvailable) {
        displayFollowers();
        switchTab("followers");
    }
})



// Following Logic -------------------------------->

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
    let username = await userData["login"];
    let url = `https://api.github.com/users/${username}/following`;
    let followingList = await getData(url);
    populateFollowing(followingList);
}


followingSection.addEventListener("click", () => {
    if(isDataAvailable) {
        displayFollowing();
        switchTab("following");
    }
})