const createElements=(arr)=>{
   const htmlelement=arr.map(el=>`<span class="btn">${el}</span>`)
    return(htmlelement.join(" "))
}

const manegespin=(status)=>{
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    }else{
        document.getElementById("word-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}


const loadlessons=()=>{
    url="https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        displayLesson(data.data)
    })
}

const removeActive=()=>{
    const lessonButtons=document.querySelectorAll(".lesson-button")
    // console.log(lessonButtons)
    lessonButtons.forEach(btn=>btn.classList.remove("active"))
}

const loadLevelWork=(id)=>{
    manegespin(true);

    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        removeActive();//remove all active class
        const clickbtn=document.getElementById(`lesson-btn-${id}`)
        
        clickbtn.classList.add('active')
        displayLevelword(data.data)

    })
};

const loadworddetail=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url);
    const res=await fetch(url);
    const details=await res.json();
    displayworddetails(details.data)
}

const displayworddetails=(word)=>{
    console.log(word);
    const detailbox=document.getElementById("detail-container")
    detailbox.innerHTML=`<div>
                    <h2 class="text-2xl font-semibold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div>
                    <h2 class="text-xl font-semibold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div>
                    <h2 class="text-xl font-semibold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div>
                    <h2 class="text-xl font-semibold space-y-3">সমার্থক শব্দ গুলো</h2>
                    <div class="">${createElements(word.synonyms)} </div>
                    
                </div> `;
    document.getElementById("word_modal").showModal();
}

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const displayLevelword=(words)=>{
    const wordContainer=document.getElementById("word-container");
    wordContainer.innerHTML=""; 

    if(words.length == 0){
        wordContainer.innerHTML=`<div class="text-center col-span-full">
             <img class="mx-auto" src="assets/alert-error.png" alt="">
            <p class="text-lg text-[#79716B] mb-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-4xl font-semibold font-bangla text-[#292524]">নেক্সট Lesson এ যান</h1>
         </div>`; 
         manegespin(false)
        return
    }

    words.forEach(word => {
        // console.log(word);
        const cardDiv=document.createElement("div")
        cardDiv.innerHTML=`<div class="bg-white rounded-xl shadow-xl text-center py-10 px-5 space-y-4 ">
            <h2 class="text-3xl font-bold ">${word.word ? word.word : "শব্দ খুঁজে পাচ্ছি না।"}</h2>
            <p>Meaning /Pronounciation</p>
            <h1 class="text-2xl font-semibold font-bangla mt-3">"${word.meaning ? word.meaning : "অর্থ খুঁজে পাচ্ছি না"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ খুঁজে পাচ্ছি না।"}"</h1>
            <div class="flex justify-between items-center">
                <button onclick="loadworddetail(${word.id})" class="bg-[#1A91FF20] hover:bg-[#1A91FF60] btn"><i class="fa-regular fa-circle-question"></i></button>
                <button class="bg-[#1A91FF20] hover:bg-[#1A91FF60] btn"><i class="fa-solid fa-volume-high"></i></button>
            </div>
         </div>`

        wordContainer.append(cardDiv)
    });
    manegespin(false)
}

// {
//     "id": 153,
//     "level": 6,
//     "word": "Dichotomy",
//     "meaning": "দ্বৈততা",
//     "pronunciation": "ডাইকোটোমি"
// }

const displayLesson=(lessons)=>{
    // 1.get the container 
    const levelContainer=document.getElementById("level-container");
    levelContainer.innerHTML="";
    //2. get into every  lesson
    for (const lesson of lessons) {
        // 3.create element
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`
                <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWork(${lesson.level_no})" class="btn btn-outline btn-primary lesson-button">
                <i class="fa-solid fa-book-open-reader"></i>Lesson - ${lesson.level_no}</button>`
    //4.append into container

    levelContainer.append(btnDiv)

    }
    

}
loadlessons()