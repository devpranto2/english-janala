const loadlessons=()=>{
    url="https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        displayLesson(data.data)
    })
}

const loadLevelWork=(id)=>{
    console.log(id);

    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        displayLevelword(data.data)
    })
};

const displayLevelword=(words)=>{
    const wordContainer=document.getElementById("word-container");
    wordContainer.innerHTML=""; 

    words.forEach(word => {
        console.log(word);
        const cardDiv=document.createElement("div")
        cardDiv.innerHTML=`<div class="bg-white rounded-xl shadow-xl text-center py-10 px-5 space-y-4 ">
            <h2 class="text-3xl font-bold ">${word.word}</h2>
            <p>Meaning /Pronounciation</p>
            <h1 class="text-2xl font-semibold font-bangla mt-3">"${word.meaning} / ${word.Pronounciation}"</h1>
            <div class="flex justify-between items-center">
                <button class="bg-[#1A91FF20] hover:bg-[#1A91FF60] btn"><i class="fa-regular fa-circle-question"></i></button>
                <button class="bg-[#1A91FF20] hover:bg-[#1A91FF60] btn"><i class="fa-solid fa-volume-high"></i></button>
            </div>
         </div>`

        wordContainer.append(cardDiv)
    });
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
                <button onclick="loadLevelWork(${lesson.level_no})" class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open-reader"></i>Lesson - ${lesson.level_no}</button>`
    //4.append into container

    levelContainer.append(btnDiv)

    }
    

}
loadlessons()