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

        fetch("https://api.jsonbin.io/b/618de89b820eda3cc81c2436", {
            method: "GET",
            headers: {
                "secret-key": "$2b$10$y1oW0SJgZ.ymzBnRxCr95uaCOt7d98nGbiqHEJBJDrKEiMxVAyZm."
            }
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
            let book = document.createElement("a");
            book.href = "#";
            book.onclick = () => onClickContent();
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
    build = () => {}
}

class Author {
    build = () => {}
}

class Contact {
    build = () => {}
}

{/* <div class="d-flex mt-3">
    <div class="content col-md-10 col-sm-12">
        <div class="d-flex">
            <img src="./assets/img/book1.png" alt="book" width="200" height="300" />
            <div class="ms-3">
                <h4>Эсрэг цаг</h4>
                <a href="./author.html">Зохиолч: Author</a>
                <p>Асар баялаг Оросын утга зохиолын орчин үеийн хамгийн сод төлөөлөгчдийн нэг
                    Венедикт Ерофеевийн энэхүү зохиол нь 1973 онд анх Израйлд, 1977 онд Парист хэвлэгдэж барууны уран
                    зохиолын ертөнцөд дуулиан тарьж байжээ.
                    Үүнээс хойш хэдэн арав дахин хэвлэгдэж, дэлхийн сонгодог зохиолын тоонд зүй ёсоор орсон энэ бүтээл
                    Зөвлөлт холбоот улсад дөнгөж 1989 онд хэвлэгдэж байжээ.
                    Библийн яруу найргийн дотоод уялдаа холбоог нэн чадамгай ашигласан энэ зохиолыг судлаачид
                    сюрреализмын үнэт бүтээл, тэр дундаа Оросын постмодернизмын нэгэн
                    оргил хэмээн дуу нэгтэй үнэлжээ. Танд авъяаслаг зохиолч, орчуулагч Дашийн Оюунчимэгийн орчуулснаар
                    хүргэж байна.</p>
            </div>
        </div>
        <div class="mt-3">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dignissim dolor non vehicula ornare. Donec tincidunt, eros quis pellentesque tincidunt, tortor turpis lobortis odio, non porta odio sem id diam. Etiam condimentum commodo sem, ac porta enim tristique quis. Vivamus malesuada, felis eu gravida sollicitudin, lacus ligula dignissim felis, vitae vestibulum neque sem nec mi. Morbi vulputate orci et metus volutpat elementum eu at quam. Ut dapibus vel neque a maximus. Integer efficitur, neque ac sodales commodo, lectus dui ullamcorper turpis, a porttitor justo nisi et urna. Quisque bibendum aliquet purus id imperdiet. In consectetur est eget enim varius, sed ornare eros efficitur. Morbi sed venenatis metus. Maecenas finibus convallis tincidunt. Suspendisse vitae porttitor sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed sit amet euismod nibh, vel molestie velit.
            </p>
            <p>Maecenas bibendum maximus orci, ac aliquam tellus commodo luctus. Sed pellentesque pharetra mi, vitae egestas mauris euismod quis. Quisque varius libero eget sagittis pretium. Vestibulum dapibus tellus sit amet suscipit luctus. Etiam id nisl auctor, viverra nibh vitae, luctus tellus. Mauris eleifend, tortor et molestie posuere, nunc ligula aliquet metus, a hendrerit quam leo in orci. Fusce at mauris a mi hendrerit dignissim. Cras cursus mauris a sapien iaculis, a pretium augue suscipit. In hac habitasse platea dictumst. Aliquam sit amet libero est.</p>
            <p>Aenean sed massa in dolor iaculis pharetra. Duis sem est, sodales in dui id, consectetur lobortis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec congue risus vel quam tincidunt, vitae congue sem rhoncus. Praesent suscipit nulla turpis, vel varius libero pretium eget. Nulla malesuada pharetra elit convallis commodo. Fusce et metus tristique, fringilla turpis vitae, lobortis sem. Pellentesque lobortis ante et tincidunt tincidunt. Donec aliquam id tellus id porttitor. Proin lacinia venenatis massa eu feugiat. Aliquam erat volutpat. Nulla vitae hendrerit nisi. Nullam pulvinar iaculis venenatis. Integer tincidunt semper libero a pharetra.</p>
        </div>
    </div>
    <section class="content ms-3 col-md-2 category-list d-flex flex-column">
        <h4 class="mb-3">Ангилал</h4>
        <a href="./search.html">Шинжлэх ухаан</a>
        <a href="./search.html">Уран зохиол</a>
        <a href="./search.html">Үлгэр</a>
        <a href="./search.html">Хувь хүний хөгжил</a>
    </section>
</div> */}

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
    navigateTo("contract");
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