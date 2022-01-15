fetch("http://hp-api.herokuapp.com/api/characters").then(
    response => response.json()
).then(responseJson => {

    const section = document.querySelector(".section-center");
    const btnContainer = document.querySelector(".btn-container");

    const students = responseJson.reduce(
        (values, item) => {
            if (!values.includes(item.house)) {
                if (item.house != "") {

                    values.push(item.house);
                }
            }
            return values;
        },
        ["All"]
    );

    const houseList = () => {
        const categoryBtns = students
            .map((house) => {
                return `<button class="btn btn-outline-dark btn-item" data-id=${house}>${house}</button>`;
            })
            .join("");

        btnContainer.innerHTML = categoryBtns;
        const filterBtns = document.querySelectorAll(".btn-item");

        //filter menu
        filterBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const house = e.currentTarget.dataset.id;
                console.log(house);
                const hogwartsHouse = responseJson.filter((ıtem) => {
                    if (ıtem.house === house) {
                        return ıtem;
                    }
                });
                if (house === "All") {
                    studentList(responseJson);
                } else {
                    studentList(hogwartsHouse);
                }
            });
        });
    };

    const studentList = (responseJson) => {
        let displayMenu = responseJson.map((item) => {
            return `<div class="menu-items col-lg-12 col-sm-12">
            <img
              src=${item.image}
              alt=${item.actor}
              class="photo"
            />
            <div class="menu-info">
              <div class="menu-title">
                <h4>${item.name}</h4> 
                <h4 class="price">${item.house}</h4>
              </div>
              <div class="menu-text">
              <ul>
              <li> Ancestry: ${item.ancestry} </li>
              <li> Patronus: ${item.patronus} </li>
              <li> BirthDay: ${item.dateOfBirth} </li>
              <li> Wand: ${item.wand.wood} </li>
                </ul>
              </div>
            </div>
          </div>
    `;
        });
        displayMenu = displayMenu.join("");
        section.innerHTML = displayMenu;
    };


    studentList(responseJson);
    houseList()
})





