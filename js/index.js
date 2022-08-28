document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("github-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const inputName = document
        .getElementById("search")
        .value.split(" ")
        .join("");
  
      fetchName(inputName);
      form.reset();
    });
  });
  
  function fetchName(user) {
    fetch(`https://api.github.com/users/${user}`)
      .then((resp) => resp.json())
      .then((data) => {
        updateDom(data);
      });
  }
  
  function updateDom(userData) {
    const users = document.getElementById("user-list");
    users.innerHTML = "";
    // console.log(userData.login)
    let li = document.createElement("li");
    li.innerHTML = `
  <a href="https://github.com/${userData.login}" target = "_blank"><img src="${userData.avatar_url}" alt="${userData.login} avatar"></a>
  <h3>${userData.login}</h3>
  <p style = "font-style: italic">${userData.public_repos} repositories</p>
  <button id = "repositories">View Repositories</button>
  `;
    users.appendChild(li);
    let link = `https://api.github.com/users/${userData.login}/repos`;
    let repos = document.getElementById("repositories");
    repos.addEventListener("click", () => {
      repoLink(link);
    });
  }
  
  function repoLink(userRepos) {
    fetch(userRepos)
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data)
        repoNames(data);
      });
  }
  let clicked = true;
  function repoNames(names) {
    if (clicked) {
      names.forEach((element) => {
        let repoContainer = document.getElementById("repos-list");
        let li = document.createElement("li");
        li.textContent = element.name;
        repoContainer.appendChild(li);
      });
      clicked = false;
    }
  }