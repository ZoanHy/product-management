// Button status

const buttonsStatus = document.querySelectorAll('[button-status]');

if (buttonsStatus.length > 0) {

    let url = new URL(window.location.href);
    // console.log(url);

    buttonsStatus.forEach(button => {
        button.addEventListener('click', function () {
            const status = button.getAttribute('button-status');
            // console.log(status);

            if (status) {
                url.searchParams.set('availabilityStatus', status);
            } else {
                url.searchParams.delete('availabilityStatus');
            }

            // console.log(url);
            window.location.href = url.href;
        });
    });
}

// End Button status

// Form Search
const formSearch = document.querySelector('#form-search');

if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault(); // ngăn cho khi bấm submit thì không reload lại trang
        // console.log(e.target.keyword.value);

        const keyword = e.target.keyword.value;

        if (keyword) {
            url.searchParams.set('keyword', keyword);
        } else {
            url.searchParams.delete('keyword');
        }

        window.location.href = url.href;
    })
}

// End Form Search