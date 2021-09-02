//Search Books Found
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    const message = document.getElementById('error-msg')

    if (searchText === '') {
        message.textContent = `Search field can't be empty`
    } else {
        message.textContent = '';
    }

    //Show Spinner
    toggleSpinner('block');

    console.log(searchText)
    searchField.value = '';

    // toggleSearchResult('none')

    const url = `http://openlibrary.org/search.json?q=${searchText}`
        // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
}


//Displaying result
const displaySearchResult = books => {
    const numFound = books.numFound;
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    //Books found counter
    const numCounter = document.getElementById('num-counter');
    const p = document.createElement('p');
    p.innerText = `Number of Books Found : ${numFound} `;
    numCounter.textContent = '';
    numCounter.appendChild(p)

    //Books Details
    books.docs.forEach(book => {
        console.log(book)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col">
        <h6> </h6>
        <div class="card">
        <img width="150" height="300" src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top" alt="Image Not Available/May be timeOut">
            <div class="card-body">
                <h4 class="card-title">${book.title.slice(0,20)}</h4>
                <h5> Author: ${book.author_name} </h5>
                <h6> Publisher : ${book.publisher} </h6>
                <h6> Product_id: ${book.id_goodreads ? book.id_goodreads : 'Not Available' } </h6>
                <h6> First Publising Year : ${book.first_publish_year}</h6>
                
            </div>
        </div>
    </div>
        `;
        searchResult.appendChild(div)
    });
    toggleSpinner('none');
    // toggleSearchResult('block')
}



// Spinner

const toggleSpinner = displayStyle => {
        document.getElementById('spinner').style.display = displayStyle;
    }
    //Toggle Search Result
    // const toggleSearchResult = d => {
    //     document.getElementById('search-result').style.display = d;
    // }