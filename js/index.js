function loadCategories() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  const categoriesContainer = document.getElementById("categoriesContainer");
  // for of loop
  for (let cat of categories) {
    // create elements
    const div = document.createElement("div");
    div.innerHTML = `
              <button class="btn btn-sm bg-[#FF1F3D]  text-white hover:bg-bl text-[#FF1F3D] font-semibold text-[18px]">${cat.category}</button>

        `;
    categoriesContainer.append(div);
  }
}

// display videos
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}

// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videoContainer");
  videos.forEach((video) => {
    console.log(video);
    
    const videoCards = document.createElement("div");
    videoCards.innerHTML = `
     <div class="card bg-base-100">
        <figure class="relative">
          <img class="rounded-lg object-cover w-full h-[200px]"
            src="${video.thumbnail}"
            alt="Shoes" />
          <span class="px-2 bg-black text-white absolute right-2 bottom-2">3hrs 56 min ago</span>
        </figure>
        
        <div class="flex gap-5 pt-8">
          <div class="avatar">
            <div class="ring-primary  w-10 rounded-full">
              <img src="${video.authors[0].profile_picture}" />
            </div>
          </div>
          <h2 class="card-title font-bold">${video.title}</h2>
        </div>
        <div class="flex gap-3 pt-3 items-center">
          <p>${video.authors[0].profile_name}</p>
          <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=SRJUuaAShjVD&format=png" alt="">
        </div>
        <p class="pt-3">${video.others.views}</p>
      </div>



    `;
    videoContainer.append(videoCards);
  });
};

loadVideos();
loadCategories();
