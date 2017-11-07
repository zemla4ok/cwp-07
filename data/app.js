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
    
}

function onClick(page){  
    let request = {
        "sortField": field.options[field.selectedIndex].value,
        "sortOrder": order.options[order.selectedIndex].value,
        "page": page.innerHTML
    }
    httpReq = new XMLHttpRequest();
    httpReq.open("POST", "./api/articles/readall");

    httpReq.onreadystatechange = req;
    httpReq.send(JSON.stringify(request));
}

function req(){
    if(httpReq.readyState === 4 && httpReq.status === 200){
        document.getElementById("articles").innerHTML = "";
        document.getElementById("pages").innerHTML = "";
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

    let pages = document.getElementById("pages");
    let ul = document.createElement("ul");
    ul.setAttribute("class", "pages");
    for(let i = 0; i<res.meta.pages; i++){
        let li = document.createElement("li");
        li.setAttribute("class", "page-item");
        if(i+1 == res.meta.page)
            li.setAttribute("class", "page-item active");

        let a = document.createElement("a");
        a.setAttribute("class", "page-link");
        a.setAttribute("href", "#");
        a.innerHTML = i+1;
        a.setAttribute("onclick", "onClick(this)");

        li.appendChild(a);
        ul.appendChild(li);
    }
    pages.appendChild(ul);
}