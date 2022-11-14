const parent = document.querySelector(".pagination");

const settings = {
    // innerWidth: 7, // Number of items between previous and next buttons (including ellipsis)
    preCurrent: 1, // Number of buttons between start ellipsis (if applicable) and active button
};

(() => {
    const {
        createBtn,
        append,
        setPage,
        createEllipsis,
        calcDefaultPreCurrent,
    } = methods;
    let { innerWidth = 7, preCurrent } = settings;

    const totalPages = 12;

    const urlParams = new URLSearchParams(window.location.search);
    let currentPage = +urlParams.get("page") || 1;

    (currentPage < 1 || currentPage > totalPages) && (currentPage = 1);

    const setPagination = () => {
        // Calculate an automatic default value for preCurrent
        if (typeof preCurrent != "number") {
            preCurrent = calcDefaultPreCurrent(innerWidth);
        }

        // Set an initial value from which to start counting page buttons
        const leftPad = currentPage - preCurrent;
        let start = leftPad > 3 ? leftPad : 2;
        const addStartEllipsis = start > 3;

        // Compensate for start ellipsis and first page button
        if (addStartEllipsis) {
            innerWidth -= 2;
        }

        // Decrease the starting value to fit all buttons within the pages range
        const surplus = start + innerWidth - totalPages;
        if (surplus > 0) {
            start -= surplus;
        }

        console.log(start);
        // Calculate whether a start or an end ellipsis should be added
        const rightPad = currentPage + innerWidth;
        let end = rightPad > 3 ? rightPad : 2;

        console.log(rightPad);

        const addEndEllipsis = rightPad <= totalPages;

        if (addEndEllipsis) {
            innerWidth -= 2;
        }

        append(
            parent,
            createBtn(
                "<",
                false,
                () => setPage(currentPage - 1, totalPages),
                (btn) => {
                    if (currentPage === 1) {
                        btn.classList.add("pagination-btn--disabled");
                    }
                }
            ),
            createBtn(1, 1 === currentPage, () => {
                setPage(1, totalPages);
            })
        );

        if (addStartEllipsis) {
            append(parent, createEllipsis("..."));
        }

        for (let page = start; page <= start + innerWidth - 1; page++) {
            append(
                parent,
                createBtn(page, page === currentPage, () => {
                    setPage(page, totalPages);
                })
            );
        }

        if (addEndEllipsis) {
            append(parent, createEllipsis("..."));
        }

        append(
            parent,
            createBtn(totalPages, totalPages === currentPage, () => {
                setPage(totalPages, totalPages);
            }),
            createBtn(
                ">",
                false,
                () => setPage(currentPage + 1, totalPages),
                (btn) => {
                    if (currentPage === totalPages) {
                        btn.classList.add("pagination-btn--disabled");
                    }
                }
            )
        );
    };

    setPagination();
})();
