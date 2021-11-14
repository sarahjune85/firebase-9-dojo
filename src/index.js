// new for version 9:
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"; // IMPORT ALL THE THINGS in 9.0

const firebaseConfig = {
  apiKey: "AIzaSyDMqdqml-YHjLiKBXdNfhwOrfdWGsGYtxI",
  authDomain: "fir-9-dojo-21710.firebaseapp.com",
  projectId: "fir-9-dojo-21710",
  storageBucket: "fir-9-dojo-21710.appspot.com",
  messagingSenderId: "707917005077",
  appId: "1:707917005077:web:d6b64f53ea33e85676e91c",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection reference: (db, collection)
const colRef = collection(db, "books");

// get collection data: on return, snapshot shows all documents:
getDocs(colRef)
  .then((snapshot) => {
    //   console.log(snapshot.docs);
    let books = [];
    // cycle through the docs on snapshot - pass in a document, spread data()
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => console.log(err.message));

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // takes in two args - (collection reference, object).
  // object values grabbed from form:
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset(); // empty form after async addDoc() runs.
  });
});

// deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // get a reference to doc you want to delete, invoke doc()
  const docRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
