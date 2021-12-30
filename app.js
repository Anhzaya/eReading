if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

var currentPage = localStorage.getItem("currentPage");
if (!currentPage)
    currentPage = "home";

class Home {
    build = () => {
        this.categorySection = document.createElement("div");
        this.categorySection.className = "d-flex align-items-md-center mt-4 mb-4 justify-content-center scrollable"
        this.categorySection.id = "category"
        let content = document.getElementById("content");
        content.append(this.categorySection);

        this.featuredSection = document.createElement("section");
        let featuredSectionTitle = document.createElement("h4");
        featuredSectionTitle.innerText = "Онцлох бүтээлүүд";
        this.featuredSection.append(featuredSectionTitle);
        let featuredSectionContent = document.createElement("div");
        featuredSectionContent.className = "d-flex align-items-md-center mt-3 scrollable";
        featuredSectionContent.id = "featured-content-container";
        this.featuredSection.append(featuredSectionContent);
        content.append(this.featuredSection);

        this.recentlySection = document.createElement("section");
        this.recentlySection.className = "mt-3 mb-3";
        let recentlySectionTitle = document.createElement("h4");
        recentlySectionTitle.innerText = "Сүүлд нэмэгдсэн";
        this.recentlySection.append(recentlySectionTitle);
        let recentlySectionContent = document.createElement("div");
        recentlySectionContent.className = "d-flex align-items-md-center mt-3 scrollable";
        recentlySectionContent.id = "recently-content-container";
        this.recentlySection.append(recentlySectionContent);
        content.append(this.recentlySection);
    }

    startFetchData = () => {
        this.fetchData();
        this.interval = setInterval(() => this.fetchData(), 3000);
    }

    fetchData = () => {
        fetch("https://api.jsonbin.io/b/618de3b64a56fb3dee0dabfb", {
            method: "GET",
            headers: {
                "secret-key": "$2b$10$y1oW0SJgZ.ymzBnRxCr95uaCOt7d98nGbiqHEJBJDrKEiMxVAyZm."
            }
        }).then(response => {
            response.json().then(result => this.setupCategoryComponent(result)
            ).catch(err => console.log(err))
        }).catch(error => console.log(error))

        fetch("/api/books", {
            method: "GET",
            mode: "no-cors"
        }).then(response => {
            response.json().then(result => this.setupFeaturedComponent(result)
            ).catch(err => console.log(err))
        }).catch(error => console.log(error))

        fetch("https://api.jsonbin.io/b/618de8e3820eda3cc81c2450", {
            method: "GET",
            headers: {
                "secret-key": "$2b$10$y1oW0SJgZ.ymzBnRxCr95uaCOt7d98nGbiqHEJBJDrKEiMxVAyZm."
            }
        }).then(response => {
            response.json().then(result => this.setupRecentlyAddedComponent(result)
            ).catch(err => console.log(err))
        }).catch(error => console.log(error))
    }

    setupCategoryComponent = (data) => {
        const container = document.getElementById("category");
        container.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            let category = document.createElement("a");
            category.className = "category-link";
            let div = document.createElement("div");
            div.className = "category-grid";
            let image = document.createElement("img");
            image.src = "./assets/img/no-img.png";
            image.alt = "category";
            image.width = 40;
            let span = document.createElement("span");
            span.innerText = data[i].name;
            div.append(image);
            div.append(span);
            category.append(div);
            container.append(category)
        }
    }

    setupFeaturedComponent = (data) => {
        const container = document.getElementById("featured-content-container");
        container.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            let book = document.createElement("book-list-item")
            book.className = "book"
            book.data = data[i];
            book.onclick = () => onClickContent()
            container.appendChild(book)
        }
    }

    setupRecentlyAddedComponent = (data) => {
        const container = document.getElementById("recently-content-container");
        container.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            let book = document.createElement("a");
            book.className = "book";
            let div = document.createElement("div");
            let image = document.createElement("img");
            image.src = "./assets/img/no-img.png";
            image.alt = "book";
            image.width = 150;
            let span = document.createElement("span");
            span.innerText = data[i].name;
            div.append(image);
            div.append(span);
            book.append(div);
            container.append(book)
        }
    }

    stopFetchData = () => {
        clearInterval(this.interval);
    }
}

class Search {
    build = () => {
        let content = document.getElementById("content");
        content.innerHTML = `
        <div class="content phone-content-filter mt-3">
            <h5>Шүүлтүүр</h5>
            <div class="d-flex flex-column">
                <span class="mb-1 form-title">Хэвлэсэн он</span>
                <div class="d-flex">
                    <input name="published_year" />
                    <a class="btn btn-light btn-sm ms-2">Хайх</a>
                </div>
            </div>
        </div>
        <div class="d-flex mt-3">
            <section class="content col-lg-9" id="search-result">
                <h4 class="mb-3">Хайлтын үр дүн</h4>
                <div class="d-flex mb-3">
                    <img src="./assets/img/no-img.png" alt="book" width="100" />
                    <div class="ms-3">
                        <h5>Бүтээлийн нэр</h5>
                        <p>Тайлбар</p>
                    </div>
                </div>
                <div class="d-flex mb-3">
                    <img src="./assets/img/no-img.png" alt="book" width="100" />
                    <div class="ms-3">
                        <h5>Бүтээлийн нэр</h5>
                        <p>Тайлбар</p>
                    </div>
                </div>
                <div class="d-flex mb-3">
                    <img src="./assets/img/no-img.png" alt="book" width="100" />
                    <div class="ms-3">
                        <h5>Бүтээлийн нэр</h5>
                        <p>Тайлбар</p>
                    </div>
                </div>
                <div class="d-flex mb-3">
                    <img src="./assets/img/no-img.png" alt="book" width="100" />
                    <div class="ms-3">
                        <h5>Бүтээлийн нэр</h5>
                        <p>Тайлбар</p>
                    </div>
                </div>
                <div class="d-flex mb-3">
                    <img src="./assets/img/no-img.png" alt="book" width="100" />
                    <div class="ms-3">
                        <h5>Бүтээлийн нэр</h5>
                        <p>Тайлбар</p>
                    </div>
                </div>
            </section>
            <section class="content ms-3 col-lg-3 content-filter">
                <div class="d-flex align-items-md-center">
                    <img src="assets/icons/filter.svg" width="20" style="margin-top: -8px;" class="me-2" />
                    <h5>Шүүлтүүр</h5>
                </div>
                <div class="d-flex flex-column">
                    <span class="mb-1 form-title">Хэвлэсэн он</span>
                    <div class="d-flex">
                        <input name="published_year" />
                        <a class="btn btn-light btn-sm ms-2">Хайх</a>
                    </div>
                </div>
            </section>
        </div>
        `
    }
}

class Author {
    build = () => {
        let content = document.getElementById("content");
        content.innerHTML = `
        <div class="content mt-3" style="height: 95vh;">
            <div class="d-flex">
                <img src="./assets/img/no-img.png" alt="author" width="150" />
                <div class="ms-3">
                    <h4>Зохиогчийн нэр</h4>
                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem.</p>
                </div>
            </div>
            <div class="mt-3">
                <h4>Бүтээлүүд</h4>
                <div class="d-flex scrollable">
                    <a class="book" href="content.html">
                        <div>
                            <img src="./assets/img/no-img.png" alt="book" width="100" />
                            <span>Бүтээлийн нэр</span>
                        </div>
                    </a>
                    <a class="book" href="content.html">
                        <div>
                            <img src="./assets/img/no-img.png" alt="book" width="100" />
                            <span>Бүтээлийн нэр</span>
                        </div>
                    </a>
                    <a class="book" href="content.html">
                        <div>
                            <img src="./assets/img/no-img.png" alt="book" width="100" />
                            <span>Бүтээлийн нэр</span>
                        </div>
                    </a>
                    <a class="book" href="content.html">
                        <div>
                            <img src="./assets/img/no-img.png" alt="book" width="100" />
                            <span>Бүтээлийн нэр</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        `
    }
}

class Contact {
    build = () => {
        let content = document.getElementById("content");
        content.innerHTML = `
        <div class="content mt-3">
            <h4>ХОЛБОО БАРИХ</h4>
            <p>Бидэнд илгээх саналаа доорх формд оруулан илгээнэ үү.</p>
            <form>
                <div class="d-flex flex-column">
                    <label class="mb-2">Таны нэр</label>
                    <input name="name" class="col-lg-4 col-sm-6 col-xs-12" />
                </div>
                <div class="d-flex flex-column mt-3">
                    <label class="mb-2">Таны и-мэйл</label>
                    <input name="email" class="col-lg-4 col-sm-6 col-xs-12" />
                </div>
                <div class="d-flex flex-column mt-3">
                    <label class="mb-2">Гарчиг</label>
                    <input name="title" class="col-lg-4 col-sm-6 col-xs-12" />
                </div>
                <div class="d-flex flex-column mt-3">
                    <label class="mb-2">Агуулга</label>
                    <textarea style="height: 250px;"></textarea>
                </div>
                <input type="submit" value="Илгээх" class="btn btn-light mt-3" />
            </form>
        </div>
        `
    }
}

class Content {
    build = () => {
        const container = document.getElementById("content");
        let page = document.createElement("div");
        page.className = "d-flex mt-3";
        let content = document.createElement("div");
        content.className = "content col-md-10 col-sm-12";
        let detail = document.createElement("div");
        detail.className = "d-flex";
        let img = document.createElement("img");
        img.src = "./assets/img/no-img.png";
        img.alt = "book";
        img.width = 200;
        img.height = 300;
        let detailContent = document.createElement("div");
        detailContent.className = "ms-3";
        let title = document.createElement("h4");
        title.innerText = "Эсрэг цаг";
        let author = document.createElement("a");
        author.href = "#";
        author.onclick = "onClickAuthor()";
        author.innerText = "Зохиолч: Author";
        let p = document.createElement("p");
        p.innerText = `
            Асар баялаг Оросын утга зохиолын орчин үеийн хамгийн сод төлөөлөгчдийн нэг
            Венедикт Ерофеевийн энэхүү зохиол нь 1973 онд анх Израйлд, 1977 онд Парист хэвлэгдэж барууны уран
            зохиолын ертөнцөд дуулиан тарьж байжээ.
            Үүнээс хойш хэдэн арав дахин хэвлэгдэж, дэлхийн сонгодог зохиолын тоонд зүй ёсоор орсон энэ бүтээл
            Зөвлөлт холбоот улсад дөнгөж 1989 онд хэвлэгдэж байжээ.
            Библийн яруу найргийн дотоод уялдаа холбоог нэн чадамгай ашигласан энэ зохиолыг судлаачид
            сюрреализмын үнэт бүтээл, тэр дундаа Оросын постмодернизмын нэгэн
            оргил хэмээн дуу нэгтэй үнэлжээ. Танд авъяаслаг зохиолч, орчуулагч Дашийн Оюунчимэгийн орчуулснаар
            хүргэж байна.
        `;
        detailContent.append(title, author, p);
        detail.append(img, detailContent);
        content.append(detail);

        let category = document.createElement("section");
        category.className = "content ms-3 col-md-2 category-list d-flex flex-column";
        let categoryTitle = document.createElement("h4");
        categoryTitle.className = "mb-3";
        categoryTitle.innerText = "Ангилал";
        category.append(categoryTitle);

        page.append(content, category);
        container.append(page);
        this.fetchData(category)
    }

    fetchData = (container) => {
        fetch("https://api.jsonbin.io/b/618de3b64a56fb3dee0dabfb", {
            method: "GET",
            headers: {
                "secret-key": "$2b$10$y1oW0SJgZ.ymzBnRxCr95uaCOt7d98nGbiqHEJBJDrKEiMxVAyZm."
            }
        }).then(response => {
            response.json().then(result => this.setupCategory(result, container)
            ).catch(err => console.log(err))
        }).catch(error => console.log(error))
    }

    setupCategory = (data, container) => {
        for (let i = 0; i < data.length; i++) {
            let url = document.createElement("a");
            url.innerText = data[i].name;
            url.href = "#";
            url.onclick = onClickBook;
            container.append(url)
        }
    }
}

this.home = new Home();
this.search = new Search();
this.author = new Author();
this.contact = new Contact();
this.content = new Content();

onClickHome = () => {
    navigateTo("home");
}

onClickBook = () => {
    navigateTo("book");
}

onClickAuthor = () => {
    navigateTo("author");
}

onClickContact = () => {
    navigateTo("contact");
}

onClickContent = () => {
    navigateTo("content");
}

navigateTo = (name) => {
    localStorage.setItem("currentPage", name);
    let content = document.getElementById("content");
    content.innerHTML = "";
    if (name == "home") {
        this.home.build();
        this.home.startFetchData();
    } else {
        this.home.stopFetchData();
        if (name == "book") {
            this.search.build();
        } else if (name == "author")
            this.author.build();
        else if (name == "contact")
            this.contact.build();
        else if (name == "content")
            this.content.build();
    }
}

navigateTo(currentPage);