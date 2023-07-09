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

    console.table(mylibrary);
    
    dismissDisplay();
    e.preventDefault();
}

