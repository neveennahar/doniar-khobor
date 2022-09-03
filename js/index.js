const loading = document.getElementById('loading-spinner');
const contentDiv = document.getElementById('content-area');
const defaultImage = 'https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg';

const toggleSpinner = state => {
    if (state === true) {
        loading.style.display = 'block';
        contentDiv.style.display = 'none';
    } else {
        loading.style.display = 'none';
        contentDiv.style.display = 'block';
    }
}

// Active Category link
const loadCategorizedData = (element, categoryId) => {
    const categoryLinks = document.getElementsByClassName('category-link');
    for (let link of categoryLinks) {
        link.classList.remove('text-primary')
    }
    element.classList.add('text-primary');
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    toggleSpinner(true);
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategorizedData(data.data))
        .catch(error => console.log(error.message))
}

// Display Categorized Data
const displayCategorizedData = data => {

    data.sort((a, b) => b.total_view - a.total_view)

    console.log(data)
    if (data.length !== 0) {
        contentDiv.textContent = '';
        data.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('card', 'mb-3', 'p-4', 'rounded-3')
            div.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-4 col-lg-3">
                <img src="${item?.image_url}" style="height:100%" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8 col-lg-9">
                <div class="card-body">
                    <h5 class="card-title">${item?.title}</h5>
                    <p class="card-text text-secondary">${item?.details?.substring(0, 300)}...</p>
                    <div class="row">
                    <div class="col-6 col-md-6 col-lg-3 d-flex align-items-center my-2">
                        <img class="img-fluid rounded-circle" style="height: 48px; width: 48px;"
                            src="${item?.author?.img || defaultImage}"
                            alt="">
                        <div class="ms-2">
                            <p class="m-0 p-0">${item?.author?.name || 'not found'}</p>
                            <small class="m-0 p-0">${item?.author?.published_date || 'not found'}</small>
                        </div>
                    </div>
                    <div class="col-6 col-md-6 col-lg-3 fs-5 my-2 text-secondary">
                        <i class="fa fa-eye"></i>
                        <span>${item?.total_view || 'not found'}</span>
                    </div>
                    <div class="col-6 col-md-6 col-lg-3 fs-5 my-2">
                        <i class="fa-solid fa-star text-secondary"></i>
                        <i class="fa-regular fa-star text-secondary"></i>
                        <i class="fa-regular fa-star text-secondary"></i>
                        <i class="fa-regular fa-star text-secondary"></i>
                        <i class="fa-regular fa-star text-secondary"></i>
                    </div>
                    <div class="col-6 col-md-6 col-lg-3 fs-5 my-2">
                    <p class="cursor-pointer text-primary" onclick="newsDetails('${item?._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Details
                    <i class="fa-solid fa-arrow-right"></i>
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        `;

            contentDiv.appendChild(div)
        })

        toggleSpinner(false)
    } else {
        contentDiv.innerHTML = '<h1 class="py-3 text-center">No Data Found</h1>'
        toggleSpinner(false)
    }

}

// Single News Details
const newsDetails = id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const modalBody = document.getElementById('modal-body');
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data?.data?.length !== 0) {


                modalBody.innerHTML = `
            <div class="card p-3">
                        <img src="${data?.data[0]?.image_url}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${data?.data[0]?.title}</h5>
                        <div class="p-2 text-priary">
                        <small>Author: ${data?.data[0]?.author?.name || 'not found'}</small><br>
                        <small>Published: ${data?.data[0]?.author?.published_date || 'not found'}</small>
                        </div>
                        <h6>Views: ${data?.data[0]?.total_view || 'not found'
                    }</h6 >
                    <h6>Rating: ${data?.data[0]?.rating?.number}</h6>
                <p class="card-text text-secondary"> <span class="fw-bold">Details: </span>${data?.data[0]?.details}</p>
                        </div >
                    </div >
    `;
            }
            else {
                modalBody.innerHTML = '<h1> No Data Found</h1>'
            }
        })
        .catch(error => alert(error.message))


}


// Loading All Categories
const loadCategories = () => {
    toggleSpinner(true);
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data))
        .catch(error => alert(error.message))
}

// Display all categories Data
const displayCategories = (data) => {
    const categoriesMenu = document.getElementById('categories-menu')
    data?.news_category?.map((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
    <span onclick = "loadCategorizedData(this,${category.category_id})" class="category-link cursor-pointer fw-bold"> ${category.category_name}</span>
        `
        categoriesMenu.appendChild(div)
    })
    toggleSpinner(false)
}
