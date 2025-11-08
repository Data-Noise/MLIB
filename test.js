var for_article = document.getElementById("for_article");
var article;


fetch('article_1.txt')
  .then(response => response.text())
  .then(text => console.log(text))


for_article.innerHTML= article
//console.log(mytarget.id);
//console.log("hello!!!");