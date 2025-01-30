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
  console.log(data);
  const showCatagory = displayCatagory(data.categories);
  console.log(showCatagory);
};

const loadVideo = async () => {
  const url = "https://openapi.programming-hero.com/api/phero-tube/videos";
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
        <p> </p>
    </div>
       
    </div>
    </div> `;
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
    console.log(item);

    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    catagoryContainer.appendChild(button);
  });
};
loadCatagory();
loadVideo();
