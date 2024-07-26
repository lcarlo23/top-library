// variables

const library = [];
const domTitle = document.getElementById('title');
const domAuthor = document.getElementById('author');
const domPages = document.getElementById('pages');
const domRead = document.getElementById('read');
const cardsDiv = document.getElementById('cards');
const newBtn = document.getElementById('newBook');
const dialog = document.getElementsByTagName('dialog')[0];
const form = document.getElementsByTagName('form')[0];
const submitModal = document.getElementsByClassName('modal-add')[0];
const cancelModal = document.getElementsByClassName('modal-cancel')[0];


//  create new book

class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    addBook() {
        
        library.push(this);

        const card = document.createElement('div');
        const h3 = document.createElement('h3');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const readBtn = document.createElement('button');
        const delBtn = document.createElement('img');

        h3.textContent = this.title;
        p1.textContent = this.author;
        p2.textContent = this.pages;

        card.classList.add('card');
        p1.classList.add('author');
        p2.classList.add('pages');
        readBtn.classList.add('card-read');
        readBtn.textContent = this.read === true ? 'READ' : 'NOT READ';
        delBtn.classList.add('card-delete');
        delBtn.src = './delete.svg';
        card.setAttribute('data-index', library.indexOf(this));

        card.appendChild(h3);
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(readBtn);
        card.appendChild(delBtn);
        
        cardsDiv.appendChild(card);

    }
};


// Load initial library

(function () {

    const book1 = new Book('The Hobbit', 'J. R. R. Tolkien', 310, true);
    const book2 = new Book('The Lord of the Rings', 'J. R. R. Tolkien', 1077, false);

    book1.addBook();
    book2.addBook();

})();


// function for card interactions

function cardBtns(e) {

    const parent = e.target.parentNode;
    const dataInd = parent.getAttribute('data-index');
    const targetClass = e.target.classList;

    if (targetClass.contains('card-delete')) {
        cardsDiv.removeChild(parent);
        library.splice(dataInd, 1);
    };
    
    if (targetClass.contains('card-read')) {
        library[dataInd].read === true ?
        library[dataInd].read = false :
        library[dataInd].read = true;
        e.target.textContent =
        library[dataInd].read === true ?
        'READ' : 'NOT READ';
    };

};


// Listeners

newBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.showModal();
});

cancelModal.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
});

submitModal.addEventListener('click', (e) => {
    if (form.checkValidity()) {
        e.preventDefault()
    }  else {
        return
    };

    const newBook = new Book(
        domTitle.value,
        domAuthor.value,
        domPages.value,
        domRead.checked ? true : false
    );

    newBook.addBook();

    dialog.close();

    domTitle.value = '';
    domAuthor.value = '';
    domPages.value = '';
    domRead.checked = false;
});

cardsDiv.addEventListener('click', cardBtns);