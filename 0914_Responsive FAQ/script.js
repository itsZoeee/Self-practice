let li = document.querySelectorAll(".faq-text li");

for (var i = 0; i < li.length; i++) {
  li[i].addEventListener("click", (e)=>{
    let clickedLi;
    console.log(e);
    if(e.target.classList.contains("question")){
      clickedLi = e.target.parentElement.parentElement;
      console.log(`contains>>> ${clickedLi} `);
    }else{
      clickedLi = e.target.parentElement;
      console.log(clickedLi);
    }
   clickedLi.classList.toggle("showAnswer");
  });
}