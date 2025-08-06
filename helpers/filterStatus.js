module.exports = (query) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Còn hàng",
            status: "In Stock",
            class: ""
        },
        {
            name: "Hết hàng",
            status: "Out of Stock",
            class: ""
        }
    ]

    if (query.availabilityStatus) {
        const index = filterStatus.findIndex(item => item.status == query.availabilityStatus);
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }

    return filterStatus;
}