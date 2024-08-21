const axios = require('axios');

/*
Task 13:
Add the code for getting the book details based on Title (done in Task 4) using Promise callbacks or async-await with Axios.
*/
const fetchDetailByTitle = async () => {
    try{
        const response = await axios.get('http://localhost:5000/title/Ep');
        console.log(response.data);
    }
    catch(ex){
        console.log('Error : ',ex);
    }

}
fetchDetailByTitle();


/*
Task 12:
Add the code for getting the book details based on Author (done in Task 3) using Promise callbacks or async-await with Axios.
*/
const fetchDetailByAuthor = async () => {
    try{
        const response = await axios.get('http://localhost:5000/author/Chinua');
        console.log(response.data);
    }
    catch(ex){
        console.log('Error : ',ex);
    }

}
//fetchDetailByAuthor();


/*
Task 11:
add the code for getting the book details based on ISBN (done in Task 2) using Promise callbacks or async-await with Axios.
*/
const fetchDetailByISBN = async () => {
    try{
        const response = await axios.get('http://localhost:5000/isbn/1');
        console.log(response.data);
    }
    catch(ex){
        console.log('Error : ',ex);
    }

}
//fetchDetailByISBN();




/*
Task 10:
Add the code for getting the list of books available in the shop (done in Task 1) using Promise callbacks or async-await with Axios.
*/
const fetchByAxios = async () => {
    try{
        const response = await axios.get('http://localhost:5000/');
        console.log(response.data);
    }
    catch(ex){
        console.log('Error : ',ex);
    }

}
//fetchByAxios();

