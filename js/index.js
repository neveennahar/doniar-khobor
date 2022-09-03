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