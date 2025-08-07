// Change Status
const buttonsChangeStatus = document.querySelectorAll('[button-change-status]');

// console.log(buttonsChangeStatus);

if (buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector('#form-change-status');
    // console.log(formChangeStatus);
    const path = formChangeStatus.getAttribute('data-path');
    // console.log(path);

    buttonsChangeStatus.forEach(button => {
        button.addEventListener('click', () => {
            console.log('ok');
            const statusCurrent = button.getAttribute('data-status');
            const id = button.getAttribute('data-id');

            let statusChange = statusCurrent == "In Stock" ? "Out of Stock" : "In Stock";

            // console.log(statusChange);
            // console.log(id);
            // console.log(statusChange);

            const action = `${path}/${statusChange}/${id}?_method=PATCH`;
            console.log(action);

            formChangeStatus.action = action;
            formChangeStatus.submit();
        });
    });
}

// End Change Status

// Delete Item

const buttonsDelete = document.querySelectorAll('[button-delete]');

if (buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector('#form-delete-item');
    const path = formDeleteItem.getAttribute('data-path');

    buttonsDelete.forEach(button => {
        button.addEventListener('click', () => {
            const isConfirm = confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');

            if (isConfirm) {
                const id = button.getAttribute('data-id');
                // console.log(id);

                const action = `${path}/${id}?_method=DELETE`;
                // console.log(action);

                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}

// End Delete Item
