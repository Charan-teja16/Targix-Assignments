async function getmovies(){
    api_key='ae726a2c936e85b87e5847f35f8057b2';
    api_url=`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;
    try{
        const res=await fetch(api_url)
        if(!res.ok) throw new Error("Could not Fetch the data,Try again");
        const data=await res.json();
        const container=document.getElementById("movie_container");
        container.innerHTML = "";
        data.results.forEach(item => {
            const box =document.createElement("div");
            box.className="box"
            const posterURL = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
            const title=`${item.title}`;
            const releaseDate = new Date(item.release_date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            });
            box.innerHTML=`
            <img src="${posterURL}">
            <ul>
            <h1>Movie - ${title}</h1><br>
            <h3>${releaseDate}</h3><br>
            <h3 style="color:darkgreen;" >Rating - ${Math.floor(item.vote_average)}/10</h3>
            </ul>
            `;
            container.appendChild(box);
        });
        return container;
    }
    catch(error){
        console.log("Error : ",error.message);
        throw error;
    }
}
getmovies();


