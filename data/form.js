function createArticle(){
    let reqTitle = document.getElementById("title").value;
    let reqText = document.getElementById("text").value;
    let reqAuthor = document.getElementById("author").value;
    let date = new Date();
    let currDate = '' + valid(date.getDate()) + '-' + valid(date.getMonth()+1) + '-' + date.getFullYear();
    let req = {
        title : reqTitle,
        text : reqText,
        author : reqAuthor,
        date : currDate
    }        
    alert("eeee");
    $.post("./api/articles/create", JSON.stringify(req), (data) => {
        alert("create successfull");
    })
   
    window.location.replace("./index.html");
}

function valid(param){
    return param < 10 ? '0' + param : param;
}