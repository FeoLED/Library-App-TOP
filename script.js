//Declaration of main used variables
let myLibrary = [];
let bookcase = document.querySelector(".bookcase");
let bookForm = document.querySelector(".newBookForm");

//hide the bookForm
bookForm.style.display = "none";

//Book constructor
function Book(title, author, pages,read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.info= function(){
     return `${title} by ${author}, ${pages} pages`;
  }
}

//function: creates book and push it to myLibrary
function addBook(title, author, pages, read){
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

//Random pre-existing books
addBook("White Fang", "Jack London", "350", "Read");
addBook("In the Mountains of Madness", "H. P. Lovecraft", "234", "Read");
addBook("Watership Down", "Richard Adams", "280", "Read");
addBook("Hannibal", "Thomas Harris", "560", "Not Read");

//function: display book
function displayLibrary(element){
  let newBook = document.createElement("p");
  newBook.textContent = element.info();
  newBook.classList.add("book");
  newBook.id = element.id;
  bookcase.appendChild(newBook);
  
  let readButton = document.createElement("button");
  readButton.textContent = element.read;
  readButton.style.color = "#fff";
  if(element.read === "Read"){
    readButton.style.backgroundColor = "green";
  }else if(element.read === "Not Read"){
    readButton.style.backgroundColor = "red";
  }

  readButton.id = element.id;
  readButton.classList.add("readButton");
  readButton.addEventListener("click", function(){
    if(element.read === "Read"){
      element.read="Not Read";
      readButton.textContent = element.read;
      readButton.style.backgroundColor = "red";
    }else if(element.read === "Not Read"){
      element.read = "Read";
      readButton.textContent = element.read;
      readButton.style.backgroundColor = "green"; 
    }
  })
  newBook.appendChild(readButton);

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("deleteButton");
  deleteButton.id = element.id;
  deleteButton.addEventListener("click", function(){
    for(let book in myLibrary){
      if(myLibrary[book].id === this.id){
        myLibrary.splice(book,0);
        bookcase.removeChild(document.getElementById(this.id));
      }
    }
  })
  newBook.appendChild(deleteButton);
}

//loop to display books
for(let book of myLibrary){
  displayLibrary(book);
}

//function: collect form data and add new book to the array
function collectBookData(){
  let bookForm = document.querySelector(".newBookForm");
  let newTitle = document.getElementById("bookTitle").value;
  let newAuthor = document.getElementById("bookAuthor").value;
  let newPages = document.getElementById("bookPages").value;
  let newReadState = document.getElementsByName("readState");
  let state="";
  for(let element of newReadState){
    if(element.checked){
      state = element.value;
    }
  }
  addBook(newTitle, newAuthor, newPages, state);
}

//function:reset values in form
function resetForm(){
  document.getElementById("bookTitle").value = "";
  document.getElementById("bookAuthor").value = "";
  document.getElementById("bookPages").value = "";
  let radios = document.getElementsByName("readState");
  for(let item in radios){
    item.checked = false;
  }
}

bookForm.addEventListener("submit", function(event){
  event.preventDefault();
  collectBookData(); 
  displayLibrary(myLibrary[myLibrary.length-1]);
  resetForm();
  bookForm.style.display = "none";
})

let newButton = document.querySelector(".newBookButton");
newButton.addEventListener("click", function(){
  bookForm.style.display = "grid";
});
