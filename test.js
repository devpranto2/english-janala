const createElements=(arr)=>{
   const htmlelement=arr.map(el=>`<span class="btn">${el}</span>`)
    console.log(htmlelement.join(" "))
}

const synonyms=["hello","hi","hola"]

createElements(synonyms)