const parent = document.querySelector(".pagination");

const settings = {
    numBtns: 5,
};

(() => {
    const { createBtn, append, setPage, createEllipsis } = methods;
    let { numBtns } = settings;

    const totalPages = 12;

    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = +urlParams.get("page") || 1;

    (currentPage < 1 || currentPage > totalPages) && (currentPage = 1);

    const setPagination = () => {
        parent.innerHTML = "";

        const addStartEllipsis = currentPage > 2;
        const addEndEllipsis = currentPage + numBtns < totalPages;

        if (addStartEllipsis) {
            numBtns -= 1;
        }

        if (addEndEllipsis) {
            numBtns -= 1;
        }

        let max = totalPages;
        let start = Math.max(currentPage, 2);

        if (start + numBtns > max) {
            while (start + numBtns > max) {
                start--;
            }
        }

        append(
            parent,
            createBtn("<", false, () => setPage(currentPage - 1, totalPages)),
            createBtn(1, 1 === currentPage, () => {
                setPage(1, totalPages);
            })
        );

        if (addStartEllipsis) {
            append(parent, createEllipsis());
        }

        for (let page = start; page <= start + numBtns - 1; page++) {
            append(
                parent,
                createBtn(page, page === currentPage, () => {
                    setPage(page, totalPages);
                })
            );
        }

        if (addEndEllipsis) {
            append(parent, createEllipsis());
        }

        append(
            parent,
            createBtn(totalPages, totalPages === currentPage, () => {
                setPage(totalPages, totalPages);
            }),
            createBtn(">", false, () => setPage(currentPage + 1, totalPages))
        );
    };

    setPagination();
})();
