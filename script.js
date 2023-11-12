let mylibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        if (pages == '') {
            this.pages = null;
        } else {
            this.pages = pages;
        }
        this.read = read;
    }
}

// function Book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     if (pages == '') {
//         this.pages = null;
//     } else {
//         this.pages = pages;
//     }
//     this.read = read;
// }

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);

    mylibrary.push(book);
}

function displayAllBooks() {
    let container = document.querySelector('.container');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (let i = 0; i < mylibrary.length; i++) {
        createBookCard(mylibrary[i], i);
    }
}

function createBookCard(book, index) {
    let item = document.createElement('div');
    item.classList.add('item');

    let info = document.createElement('div');
    info.classList.add('info');
    
    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let title = document.createElement('h1');
    title.textContent = book.title;
    info.appendChild(title);

    let author = document.createElement('p');
    author.textContent = "by " + book.author;
    info.appendChild(author);

    let pages = document.createElement('p');
    if (book.pages != null) {
        pages.textContent = book.pages + "pgs";
    } else {
        pages.innerHTML = "&nbsp;";
    }

    info.appendChild(pages);

    let readBtn = document.createElement('button');
    if (book.read) {
        readBtn.textContent = "Read";
    } else {
        readBtn.classList.add("notRead");
        readBtn.textContent = "Not Read";
    }
    readBtn.setAttribute("index", index);
    readBtn.addEventListener('click', changeReadStatus);
    buttons.appendChild(readBtn);

    let remove = document.createElement('button');
    remove.textContent = "Remove";
    remove.setAttribute("index", index);
    remove.addEventListener('click', removeBook);
    buttons.appendChild(remove);

    item.appendChild(info);
    item.appendChild(buttons);

    let container = document.querySelector('.container');
    container.appendChild(item);
}

function displayAddBookForm() {
    modal.classList.add('active');
    overlay.classList.add('active');
}

function dismissDisplay() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function addNewBook(e) {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;

    if (title == "" || author == "") {
        return;
    }

    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pages').value = "";
    document.getElementById('read').checked = false;

    addBookToLibrary(title, author, pages, read);
    createBookCard(mylibrary[mylibrary.length - 1], mylibrary.length - 1);
    
    dismissDisplay();
    e.preventDefault();
}

function removeBook(e) {
    let index = e.target.getAttribute("index");

    mylibrary.splice(index, 1);

    displayAllBooks();
}

function changeReadStatus(e) {
    let index = e.target.getAttribute("index");

    mylibrary[index].read = !mylibrary[index].read;

    if (mylibrary[index].read) {
        e.target.classList.remove('notRead');
        e.target.textContent = "Read";
    } else {
        e.target.classList.add('notRead');
        e.target.textContent = "Not Read";
    }

    console.table(mylibrary);
}

let addBookBtn = document.getElementById("addBookBtn");
let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let submit = document.querySelector('button[type="submit"]');


addBookBtn.addEventListener('click', displayAddBookForm);
overlay.addEventListener('click', dismissDisplay);
submit.addEventListener('click', addNewBook);
