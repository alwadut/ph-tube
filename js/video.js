// 1. fetch , load and show catagory on html
// if i use async await steps
// 1. fetch data
// 2. load data
// 3. show data
// 4. call the function
// 5. check the console
// 6. show the data on html

//create loadCatagory function
const loadCatagory = async () => {
  const url = "https://openapi.programming-hero.com/api/phero-tube/categories";
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  const showCatagory = displayCatagory(data.categories);
  // console.log(showCatagory);
};

const loadVideo = async ( searchText="" ) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/videos?titel=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  const showVideo = displayVideo(data.videos);
  console.log(showVideo);
};

function timeString(time){
  const year = parseInt(time/31536000);
  let remainingDays = time%31536000;
  const days = parseInt(remainingDays/86400);
  const hour = parseInt(days/3600);
  let remainingMinutes = time%3600;
  const minutes = parseInt(remainingMinutes/60);
  const seconds = remainingMinutes%60;
  return `${year}y ${days} d ${hour}h ${minutes}m ${seconds}s`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("cetegory-btn");
  // console.log(buttons);
  for(let btn of buttons ){
    btn.classList.remove("active");
  }
  return;
}

const loadCatagoryVideo =(id)=> {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then((data )=> {
    // sob  active class remove koro 
    removeActiveClass();

    // id class active koro 
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add("active");
    displayVideo(data.category);
    
  
  })
  .catch(err => {
    console.log(err);
  });
 
}

const videoDetails = async (video_id) => {
  // console.log(video_id);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
}
const displayDetails = (video) => {
  const modal = document.getElementById("video-details")
  modal.innerHTML = `
    <img src="${video.thumbnail}"/>
    <div>
      <h3 class="font-bold"> 
        ${video.title}
      </h3>
      <p>
        ${video.description}
      </p>
    </div>

    
    `
    

  document.getElementById("my_modal_5").showModal()
};

// {
//     "category_id": "1001",
//     "video_id": "aaah",
//     "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//     "title": "Colors of the Wind",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//             "profile_name": "Ethan Clark",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "233K",
//         "posted_date": "16090"
//     },
//     "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// }

const displayVideo = (videos) => {
  const videocontainer = document.getElementById("video");
  videocontainer.innerHTML = "";

  if(videos.length === 0){
    videocontainer.classList.remove("grid");
    videocontainer.innerHTML = `<div class=" min-h-[300px] w-full flex flex-col items-center justify-center gap-2">
    <img  src="/icon.png"/>
    <h1 class="text-3xl font-bold"> Ops sorry No video is found </h1>
    </div>`;
    return;
  }
else{
  videocontainer.classList.add("grid");
}
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact ";
    card.innerHTML = `<figure class="h[200px] relative">
        <img class="w-full h-48 object-cover"
        src=${video.thumbnail} />
        ${
          video.others.posted_date?.length == 0 ? "":`<span class="absolute right-2 bottom-2 bg-black p-2 rounded text-white  "> ${timeString(video.others.posted_date)} </span>`
        }
        
    </figure>
    <div class="px-0 py-2 flex gap-2">
    <div>
        <img class="w-10 h-10 rounded-full object-cover " src="${video.authors[0].profile_picture}"/>

    </div>
    <div class >
        <h3 class="font-bold ">${video.title} </h3>
    <div class="flex gap-2"> 
        <p>${video.authors[0].profile_name} </p>
        ${
          video.authors[0].verified === true ? `<img class="w-5" src="/image.png"/>` : ""
        }
    </div>
        <button class="btn btn-primary" onclick="videoDetails('${video.video_id}')">
          Details
        </button>
    </div>
       
    </div>
    </div> `
    
    ;


    
    videocontainer.appendChild(card);
  });
};

// create display data function
/*category: "Music"
category_id: "1001"
*/



const displayCatagory = (catagories) => {
  const catagoryContainer = document.getElementById("catagories");

  catagories.forEach((item) => {
    // console.log(item);

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCatagoryVideo(${item.category_id})" class="btn cetegory-btn">${item.category}
    </button>
    `;

    catagoryContainer.appendChild(buttonContainer);
  });
};


document.getElementById("Search").addEventListener("keyup",(e)=>{
  loadVideo(e.target.value);
});





loadCatagory();
loadVideo();
