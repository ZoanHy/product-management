module.exports = (query) => {
    // let keyword = "";
    let objectSearch = {
        keyword: "",
        regex: ""
    }

    if (query.keyword) {
        keyword = query.keyword;
        // findProducts.title = { $regex: keyword, $options: "i" }; // Case-insensitive search using regex
        objectSearch.keyword = keyword;
        objectSearch.regex = { $regex: keyword, $options: "i" }; //
    }

    return objectSearch;
}