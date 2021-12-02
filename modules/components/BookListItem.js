class BookListItem extends HTMLElement {
    set data(book) {
        this.innerHTML = `
            <a class="${book.className}" href="#" onclick=${book.onclick}>
                <div>
                    <img src="./assets/img/no-img.png" alt="book" width="150" />
                    <span>${book.name}</span>
                </div>
            </a>
        `
    }
}
customElements.define('book-list-item', BookListItem)