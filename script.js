const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data?.data?.tools));
};

const displayData = (data) => {
  // initially show only the first 6 cards
  data?.slice(0, 6).forEach((card) => {
    const cardElement = createCardElement(card);
    cardContainer.appendChild(cardElement);
  });

  // when the "Show All" button is clicked, show all cards
  showAllBtn.addEventListener("click", () => {
    cardContainer.innerHTML = "";
    data?.forEach((card) => {
      const cardElement = createCardElement(card);
      cardContainer.appendChild(cardElement);
    });
    showAllBtn.classList.add("hidden");
  });

  // when the "sort by date" button is clicked, sort by date all cards
  sortByDateBtn.addEventListener("click", () => {
    cardContainer.innerHTML = "";

    // data.sort((a, b) => a.published_in - b.published_in);
    // console.log(data);

    // Define a compare function to compare two dates in the format "mm/dd/yyyy"
    function compareDates(data1, data2) {
      const parts1 = data1?.published_in.split("/");
      const parts2 = data2?.published_in.split("/");
      const year1 = parseInt(parts1[2], 10);
      const year2 = parseInt(parts2[2], 10);
      const month1 = parseInt(parts1[0], 10);
      const month2 = parseInt(parts2[0], 10);
      const day1 = parseInt(parts1[1], 10);
      const day2 = parseInt(parts2[1], 10);
      if (year1 < year2) {
        return -1;
      } else if (year1 > year2) {
        return 1;
      } else {
        if (month1 < month2) {
          return -1;
        } else if (month1 > month2) {
          return 1;
        } else {
          if (day1 < day2) {
            return -1;
          } else if (day1 > day2) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    }

    // Sort the array of dates using the custom compare function
    data.sort(compareDates);

    data?.slice(0, 6).forEach((card) => {
      const cardElement = createCardElement(card);
      cardContainer.appendChild(cardElement);
    });
  });

  console.log(data);
};
loadData();

const cardContainer = document.getElementById("card-container");
const showAllBtn = document.getElementById("show-all-btn");
const sortByDateBtn = document.getElementById("sort-by-date-btn");

function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("border", "rounded-lg", "p-6");
  cardElement.innerHTML = `
    <div>
        <img class="md:w-full md:h-[312px]" src=${card?.image} alt="" />
    </div>
    <div>
        <div class="py-6 border-b">
            <h4 class="text-2xl font-semibold pb-4">Features</h4>
            <p>1. ${card?.features[0]}</p>
            <p>2. ${card?.features[1]}</p>
            ${card?.features[2] ? `<p>3. ${card?.features[2]}</p>` : ""} 
            ${card?.features[3] ? `<p>4. ${card?.features[3]}</p>` : ""} 
        </div>
    <div class="py-6 flex justify-between items-center">
        <div>
            <h4 class="text-2xl font-semibold pb-4">${card?.name}</h4>
            <div>
                <i class="fa-solid fa-calendar mr-2"></i>
                <span>${card?.published_in}</span>
            </div>
        </div>
    <div>
        <label id="modal-opening-button" for="my-modal-${
          card?.id
        }" class="btn border-none bg-[#FEF7F7] text-[#EB5757] hover:bg-[#EB5757] hover:text-white rounded-full py-3 px-4">
            <i class="fa-solid fa-arrow-right"></i>
        </label>
        <input type="checkbox" id="my-modal-${card?.id}" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box w-11/12 max-w-5xl lg:p-20">
                <label 
                for="my-modal-${card?.id}"
                class="btn btn-sm btn-circle absolute right-2 top-2 bg-[#EB5757] border-none">✕</label>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div class="bg-[#fef7f7] border border-[#EB5757] rounded-lg p-2 sm:p-7">
                        <h4 class="text-2xl font-semibold">ChatGPT is an AI-powered chatbot platform that uses OpenAI's GPT technology to simulate human conversation.</h4>
                        <div class="grid grid-cols-3 gap-4 my-5">
                            <div class="sm:p-5 text-center"><h5 class="text-[#03A30A] sm:font-semibold">$10/<br/>month<br/>Basic</h5></div>
                            <div class="sm:p-5 text-center"><h5 class="text-[#F28927] sm:font-semibold">$50/<br/>month<br/>Pro</h5></div>
                            <div class="sm:p-5 text-center"><h5 class="text-[#EB5757] sm:font-semibold">Contact<br/>us<br/>Enterprise</h5></div>
                        </div>
                        <div class="lg:flex">
                            <div class="lg:w-7/12">
                                <h4 class="text-2xl font-semibold mb-4">Features</h4>
                                <ul class="list-disc pl-5">
                                    <li>${card?.features[0]}</li>
                                    <li>${card?.features[1]}</li>
                                    ${
                                      card?.features[2]
                                        ? `<li>${card?.features[2]}</li>`
                                        : ""
                                    } 
                                    ${
                                      card?.features[3]
                                        ? `<li>${card?.features[3]}</li>`
                                        : ""
                                    } 
                                </ul>
                            </div>
                            <div class="lg:w-5/12 mt-5 lg:mt-0">
                                <h4 class="text-2xl font-semibold mb-4">Integrations</h4>
                                <ul class="list-disc pl-5">
                                    ${
                                      card?.links[0]?.name
                                        ? `<li>${card?.links[0]?.name}</li>`
                                        : "No data found"
                                    }
                                    ${
                                      card?.links[1]?.name
                                        ? `<li>${card?.links[1]?.name}</li>`
                                        : ""
                                    }
                                    ${
                                      card?.links[2]?.name
                                        ? `<li>${card?.links[2]?.name}</li>`
                                        : ""
                                    }
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="border rounded-lg p-2 sm:p-7">
                        <div class="relative">
                            <img class="md:w-full md:h-[312px] rounded-lg" src=${
                              card?.image
                            } alt="" />
                            <span class="absolute top-2 right-2 py-1 px-2 rounded-lg bg-[#EB5757] text-white font-semibold">94% accuracy</span>
                        </div>
                        <div class="text-center">
                            <h4 class="py-5 text-2xl font-semibold">Hi, how are you doing today?</h4>
                            <p>I'm doing well, thank you for asking. How can I assist you today?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

  return cardElement;
}
