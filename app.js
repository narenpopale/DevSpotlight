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
    let userData = await getData(username);

    if(userData["status"] == undefined) {
        populateInfo(userData);
        console.log("Found");
    }
}


button.addEventListener("click", () => {
    showInfo(username.value);
})