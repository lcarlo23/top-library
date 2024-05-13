const library = [
    {
        title: "The Hobbit",
        author: "J. R. R. Tolkien",
        pages: 310,
        read: true,
    },
    {
        title: "The Lord of the Rings",
        author: "J. R. R. Tolkien",
        pages: 1077,
        read: false,
    },
];


// Book constructor

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Functions

function addBook(e) {
    e.preventDefault();

    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');

    const newBook = new Book(
        title.value,
        author.value,
        pages.value,
        read.checked ? true : false
    );

    library.push(newBook);
    createCard();
    dialog.close();
    
    title.value = '';
    author.value = '';
    pages.value = '';
    read.value = '';
};

// Manage cards

const cardsDiv = document.getElementById('cards');

function createCard() {
    cardsDiv.innerHTML = '';
    for (book of library) {
        const card = document.createElement('div');
        const h3 = document.createElement('h3');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const readBtn = document.createElement('button');
        const delBtn = document.createElement('img');

        h3.textContent = book.title;
        p1.textContent = book.author;
        p2.textContent = book.pages;

        card.classList.add('card');
        p1.classList.add('author');
        p2.classList.add('pages');
        readBtn.classList.add('card-read');
        readBtn.textContent = book.read === true ? 'READ' : 'NOT READ';
        delBtn.classList.add('card-delete');
        delBtn.src = './delete.svg';
        card.setAttribute('data-index', library.indexOf(book));

        card.appendChild(h3);
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(readBtn);
        card.appendChild(delBtn);
        
        cardsDiv.appendChild(card);
    }
};

createCard();

function cardBtns(e) {
    const dataInd = e.target.parentNode.getAttribute('data-index');
    if (e.target.classList.contains('card-delete')) {
        library.splice(dataInd, 1);
    } else if (e.target.classList.contains('card-read')) {
        if (library[dataInd].read === true) {
            library[dataInd].read = false;
        } else {
            library[dataInd].read = true;
        }
    };
    createCard();
};


// Listeners

const newBtn = document.getElementById('newBook');
const dialog = document.getElementsByTagName('dialog')[0];
const submitModal = document.getElementsByClassName('modal-add')[0];
const cancelModal = document.getElementsByClassName('modal-cancel')[0];

newBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.showModal();
});

submitModal.addEventListener('click', addBook);

cancelModal.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
});

cardsDiv.addEventListener('click', cardBtns);