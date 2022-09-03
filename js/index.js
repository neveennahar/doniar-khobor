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