const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhone(phones,isShowAll);
}

const displayPhone = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container');

    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    
    
    phones.forEach(phone => {
         console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-72 bg-base-100 shadow-xl`;
        phoneCard.innerHTML= `
        
        <figure><img src="${phone.image}"
                            alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title mx-auto">${phone.phone_name}</h2>
                        <p class="text-center"></p>
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetail('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">Show Detaile</button>
                        </div>
                    </div>
        
        `;

        phoneContainer.appendChild(phoneCard)
    })

    toggoleLoadingSpinner(false);

}

const handleSearch = (isShowAll) =>{
    toggoleLoadingSpinner(true);
    const searchFeild = document.getElementById('search-btn');
    const searchText = searchFeild.value;
    loadPhone(searchText,isShowAll);
}

const toggoleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}


const handleShowAll = () =>{
        handleSearch(true)
}

const handleShowDetail = async (id) =>{
    // console.log('hello modal', id)

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    showModal(phone)
}

const showModal = (phone) =>{
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
        
    <img src="${phone.image}" alt="" />
    
    
    `
    show_details_modal.showModal()
}

