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