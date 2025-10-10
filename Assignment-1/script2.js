const apiKey = '5b5453fc998d44f1818a5d4b24b22ba1';
const baseUrl = 'https://api.gamebrain.co/v1/games?query=action+adventure';
let offset = 0;   // track how many items we’ve loaded
const limit = 10; // API max per request

async function getGames() {
    try {
        const response = await fetch(`${baseUrl}&limit=${limit}&offset=${offset}`, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const container = document.getElementById("game_container");

        data.results.forEach(item => {
            if (!item.short_description) return; // skip empty descriptions

            const box = document.createElement("div");
            box.className = "box";
            const title = item.name;
            box.innerHTML = `
                <img src="${item.image}" alt="${title}">
                <ul>
                    <h1>Title - ${title}</h1>
                    <h3>Released in ${item.year || "N/A"}</h3>
                    <p>${item.short_description}</p>
                </ul>
            `;
            container.appendChild(box);
        });

        // Update offset for next page
        offset += limit;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Initial fetch
getGames();

// Optional: Load more button
document.getElementById("loadMoreBtn").addEventListener("click", () => {
    getGames();
});
