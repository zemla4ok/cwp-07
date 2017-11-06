let field;
let order;

let httpReq = new XMLHttpRequest();
httpReq.open('POST', "./api/articles/readall", true);
httpReq.onreadystatechange = req;
httpReq.send(JSON.stringify({}));

window.onload = function(){
    field = document.getElementById("field");
    field.addEventListener("change", onChange, false);
    order = document.getElementById("order");
    order.addEventListener("change", onChange, false);
}

function onChange(){
    httpReq = new XMLHttpRequest();
    httpReq.open('POST', "./api/articles/readall");
}

function req(){
    if(httpReq.readyState === 4 && httpReq.status === 200){
        getArticles(httpReq);
    }
}

function getArticles(httpReq){
    let res = JSON.parse(httpReq.responseText);
    let articles = document.getElementById("articles");
    articles.setAttribute("class", "card-column");

    res.items.forEach((item) => {
        let div = document.createElement("div");
        div.setAttribute("class", "article card text-center");
        div.setAttribute("id", item.id);

        let title = document.createElement("h3");
        title.setAttribute("class", "article-title card-title bg-light");
        title.appendChild(document.createTextNode(item.title));
        div.appendChild(title);

        let date = document.createElement("h6");
        date.setAttribute("class", "article-date card-subtitle text-muted");
        date.appendChild(document.createTextNode("Date: " + item.date));
        div.appendChild(date);

        let author = document.createElement("h6");
        author.setAttribute("class", "article-date card-subtitle text-muted");
        author.appendChild(document.createTextNode("Author: " + item.author));
        div.appendChild(author);

        let text = document.createElement("p");
        text.setAttribute("class", "article-text card-body");
        text.appendChild(document.createTextNode(item.text));
        div.appendChild(text);

        articles.appendChild(div);
    });
}