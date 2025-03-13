function loadCategories() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

// load Categories video
const loadCategoriesVideo = (id) => {
  showLoader();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category));
};

function displayCategories(categories) {
  const categoriesContainer = document.getElementById("categoriesContainer");
  // for of loop
  for (let cat of categories) {
    // create elements
    const div = document.createElement("div");
    div.innerHTML = `
              <button onclick="loadCategoriesVideo(${cat.category_id})" class="btn btn-sm font-semibold text-[18px] hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>

        `;
    categoriesContainer.append(div);
  }
}

// display videos
function loadVideos(searchText = "") {
  showLoader();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}

// loadVideoDetails
const loadVideoDetails = (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLoadVideoDetails(data.video));
};

// Display load Video Details
const displayLoadVideoDetails = (video) => {
  document.getElementById("showModal").showModal();

  const modalTitleContainr = document.getElementById("modalTitleContainr");
  const div = document.createElement("div");
  div.innerHTML = `
  <h2>${video.title}</h2>
  `;
  modalTitleContainr.append(div);
  // document.getElementById("videoDetails").showModal();
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.innerHTML = `
  <div class="col-span-full flex flex-col items-center">
          <img class="w-[120px]" src="images/Icon.png" alt="" />
          <h2 class="font-bold text-3xl mt-9 text-center">
            Oops!! Sorry, There is no <br />content here
          </h2>
        </div>
  `;
    hideLoader();
    return;
  }

  videos.forEach((video) => {
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
          <p>
          ${video.authors[0].profile_name}
          <div>
          ${
            video.authors[0].verified == true
              ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=SRJUuaAShjVD&format=png" alt="">`
              : ``
          }</div>
          </p>
          
        </div>
        <p class="pt-3">${video.others.views}</p>
        <div class="pt-5">
        <button onclick=loadVideoDetails("${
          video.video_id
        }") class="btn btn-block">Show Details</button>
        </div>
      </div>
    `;
    videoContainer.append(videoCards);
  });
  hideLoader();
};

// search
document.getElementById("search").addEventListener("keyup", (event) => {
  const input = event.target.value;
  loadVideos(input);
});

// loader
const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("videoContainer").classList.add("hidden");
};

const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("videoContainer").classList.remove("hidden");
};

loadCategories();
