// moonlight hub
// author: (hook) on discord "drawing.new"
// date: 2023-06-30

function createButton(url) {
    if (document.querySelector(".moonlight-button")) return;

    const gameButton = document.createElement("button");
    const gameButtonIcon = document.createElement("span");
    const gameButtons = document.getElementById("game-details-play-button-container");

    gameButton.classList.add("moonlight-button");
    gameButton.classList.add("btn-secondary-lg");
    gameButtonIcon.classList.add("icon-common-play");

    gameButton.appendChild(gameButtonIcon);
    gameButtons.appendChild(gameButton);

    gameButton.style = "width:65px;min-width:65px;margin-left:5px;position:relative;"

    gameButton.addEventListener("click", () => {
        window.open(url, "_self");
    })
}

switch (!document.getElementById("gamelaunch")) {
    case false:
        const dataToParse = document.getElementById("gamelaunch").src;
        const regex = /placeId%3D([^&]*)%26accessCode%3D([^&]*)%26linkCode%3D([^&]*)/gm;
        const result = regex.exec(dataToParse);
      
        createButton(`roblox://placeID=${result[1]}&accessCode=${result[2]}&linkCode=${result[3]}`);
    case true:
        const reg = /\/games\/(\d+)\//;
        const match = window.location.href.match(reg);
      
        if (match) {
          const gameId = parseInt(match[1]);
      
          fetch(`https://games.roblox.com/v1/games/${gameId}/servers/2?sortOrder=1&excludeFullGames=false&limit=100`)
            .then(response => response.json())
            .then(data => {
                createButton(`roblox://placeID=${gameId}&gameInstanceId=${data.data[0].id}`)
            });
        }
}
