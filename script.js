let mylibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    if (pages == '') {
        this.pages = null;
    } else {
        this.pages = pages;
    }
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);

    mylibrary.push(book);
}

function createBookCard(book) {
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
    buttons.appendChild(readBtn);

    let remove = document.createElement('button');
    remove.textContent = "Remove";
    buttons.appendChild(remove);

    item.appendChild(info);
    item.appendChild(buttons);

    let container = document.querySelector('.container');
    container.appendChild(item);

    console.log(item);
}

let addBookBtn = document.getElementById("addBookBtn");
let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let submit = document.querySelector('button[type="submit"]');


addBookBtn.addEventListener('click', displayAddBookForm);
overlay.addEventListener('click', dismissDisplay);
submit.addEventListener('click', addNewBook);

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
    createBookCard(mylibrary[mylibrary.length - 1]);

    console.table(mylibrary);
    
    dismissDisplay();
    e.preventDefault();
}

