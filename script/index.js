const loadlessons=()=>{
    url="https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        displayLesson(data.data)
    })
}

const displayLesson=(lessons)=>{
    // 1.get the container 
    const levelContainer=document.getElementById("level-container");
    levelContainer.innerHTML="";
    //2. get into every  lesson
    for (const lesson of lessons) {
        // 3.create element
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`
                <a class="btn btn-outline btn-primary" href="">
                <i class="fa-solid fa-book-open-reader"></i>Lesson - ${lesson.level_no}</a>
        `
    //4.append into container

    levelContainer.append(btnDiv)

    }
    

}
loadlessons()