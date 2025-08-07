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


// Pagination

const buttonsPagination = document.querySelectorAll('[button-pagination]');

if (buttonsPagination.length > 0) {
    let url = new URL(window.location.href);
    buttonsPagination.forEach(button => {
        button.addEventListener('click', function () {
            const page = button.getAttribute('button-pagination');
            url.searchParams.set('page', page);
            window.location.href = url.href;
        });
    });
}

// End Pagination

// Checkbox Multi
const checkboxMulti = document.querySelector('[checkbox-multi]');

if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector('input[name="check-all"]');
    const inputsId = checkboxMulti.querySelectorAll('input[name="id"]');

    inputCheckAll.addEventListener('click', () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            });
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            });
        }
    });

    inputsId.forEach(input => {
        input.addEventListener('click', () => {
            if (Array.from(inputsId).every(input => input.checked)) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
}

// End Checkbox Multi

// Form Change Multi
const formChangeMulti = document.querySelector('[form-change-multi]');
if (formChangeMulti) {
    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault(); // ngăn cho khi bấm submit thì không reload lại trang

        const checkboxMulti = document.querySelector('[checkbox-multi]');
        const inputsChecked = checkboxMulti.querySelectorAll('input[name="id"]:checked');

        // console.log(inputsChecked);

        const typeChange = e.target.elements.type.value;

        console.log(typeChange);

        if (typeChange === "Delete All") {
            const isConfirm = confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm đã chọn không?');
            if (!isConfirm) { return; }
        }

        if (inputsChecked.length > 0) {
            let ids = [];
            const inputIds = formChangeMulti.querySelector('input[name="ids"]');

            inputsChecked.forEach(input => {
                const id = input.value;

                if (typeChange == 'Change Position') {
                    const position = input.closest('tr').querySelector('input[name="position"]').value;
                    // console.log(position);
                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);
                }
            });
            // console.log(ids);

            inputIds.value = ids.join(', ').trim();

            formChangeMulti.submit();

        } else {
            alert('Vui lòng chọn ít nhất một sản phẩm để thực hiện thao tác!');
        }
    })
}

// End Form Change Multi

// Show Alert
const showAlert = document.querySelector('[show-alert]');

if (showAlert) {
    const time = parseInt(showAlert.getAttribute('data-time'));
    console.log(time);

    setTimeout(() => {
        showAlert.classList.add('alert-hidden');
    }, time);

    const closeAlert = showAlert.querySelector('[close-alert]');
    if (closeAlert) {
        closeAlert.addEventListener('click', () => {
            showAlert.classList.add('alert-hidden');
        });
    }
}


// End Show Alert