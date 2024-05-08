const loadPhone = async (phoneNames) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneNames}`)
  const data = await res.json();
  const transfer = data.data;
  // console.log(transfer)
  displayPhones(transfer)
}

const displayPhones = phones => {
  // console.log(phones)
  const mainDivHtml = document.getElementById('mainDiv');
  mainDivHtml.textContent = " ";
  const btnShows = document.getElementById('btnShows');
  if (phones.length > 12) {
    btnShows.classList.remove('hidden')
  }
  else {
    btnShows.classList.add("hidden");
  }
  phones = phones.slice(0, 12);

  phones.forEach(element => {
    // console.log(element)
    const phoneCard = document.createElement('div');
    phoneCard.classList = ` card w-96 bg-base-100 shadow-xl`;
    phoneCard.innerHTML = ` 
        <figure><img src="${element.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${element.phone_name}</h2>
          <p> ${element.slug} </p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${element.slug}');
            my_modal_5.showModal()
            " class="btn btn-primary w-full">Buy Now</button>
          </div>
        </div>
      </div>
        `;
    mainDivHtml.appendChild(phoneCard);

  });
  funLoadingSpinner(false)
}


const handleShowDetail = async (id) => {
  console.log(id);
  const ress = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await ress.json();
  // console.log(data);
  const datas = data.data
  showMobileDetailse(datas)
}

const showMobileDetailse = (phoneDetailse) =>{
  console.log(phoneDetailse);
  
  const phoneBrandName = document.getElementById('show-Phone-brand');
  phoneBrandName.innerText = `Brand Name: ${phoneDetailse.brand}`;
  const phoneNameModel = document.getElementById('show-Phone-name');
  phoneNameModel.innerText = `Phone Name: ${phoneDetailse.name}`;
   const deatilsePhones = document.getElementById('deatilsePhones');
  /* deatilsePhones.innerText = `Phone Name: ${phoneDetailse.mainFeatures.chipSet}`; */
  const CreatPhoneDeatilse = document.getElementById('deatilsePhones');
  // CreatPhoneDeatilse.classList = ` `;
  CreatPhoneDeatilse.innerHTML =`
  <img class="mx-auto py-6" src="${phoneDetailse.image}" alt="" srcset="">
  <p class="text-sm"> <span class="font-bold">ChipSet:</span> ${phoneDetailse.mainFeatures.chipSet} </p>
  <p class="text-sm"> <span class="font-bold">Display Size:</span> ${phoneDetailse.mainFeatures.displaySize}</p>
  <p class="text-sm"><span class="font-bold"> Memory:</span> ${phoneDetailse.mainFeatures.Memory}</p>
  <p class="text-sm"><span class="font-bold"> Sensors: </span>  ${phoneDetailse.mainFeatures.sensors}</p>
  <p class="text-sm"><span class="font-bold">  Storage: </span>  ${phoneDetailse.mainFeatures.storage}</p>
  `;
}

const handleSearch = () => { 
  funLoadingSpinner(true);
  const inputsMainElement = document.getElementById('inputs');
  const inputsValus = inputsMainElement.value;
  loadPhone(inputsValus)

}

const funLoadingSpinner = (isloading) => {
  const loadingSpiner = document.getElementById('loading-spinner');
  if (isloading) {
    loadingSpiner.classList.remove("hidden");
  }
  else {
    loadingSpiner.classList.add("hidden");
  }
}




// loadPhone()