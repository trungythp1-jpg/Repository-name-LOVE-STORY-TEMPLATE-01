/* =========================================
   COMMON.JS
   Chức năng dùng chung cho toàn bộ website
========================================= */


const VALID_THEMES = [
    "pink",
    "midnight",
    "rose",
    "gold",
    "green",
    "pastel"
];


/* =========================================
   THEME
========================================= */

function setTheme(theme) {

    if (
        !VALID_THEMES.includes(theme)
    ) {
        theme = "pink";
    }

    document.body.className =
        "theme-" + theme;

}


/* =========================================
   FLOATING HEARTS
========================================= */

function createHearts() {

    const container =
        document.getElementById("hearts");

    if (!container) return;


    const symbols = [
        "♥",
        "♡",
        "❤",
        "💗",
        "💖"
    ];


    container.innerHTML = "";


    for (
        let i = 0;
        i < 22;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.className =
            "heart";


        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.fontSize =
            12 +
            Math.random() * 20 +
            "px";


        heart.style.animationDuration =
            10 +
            Math.random() * 16 +
            "s";


        heart.style.animationDelay =
            -Math.random() * 20 +
            "s";


        container.appendChild(
            heart
        );
    }
}


/* =========================================
   GET GIFT DATA
========================================= */

function getGiftData() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    if (
        !params.has("c") &&
        !params.has("couple")
    ) {

        return null;
    }


    return {

        couple:
            params.get("c") ||
            params.get("couple") ||
            "Anh & Em",

        receiver:
            params.get("t") ||
            params.get("to") ||
            "Em",

        date:
            params.get("d") ||
            params.get("date") ||
            "",

        music:
            params.get("m") ||
            params.get("music") ||
            "",

        letter:
            params.get("l") ||
            params.get("letter") ||
            "",

        theme:
            params.get("theme") ||
            "pink"

    };
}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "";
    }


    const date =
        new Date(
            dateString +
            "T00:00:00"
        );


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return "";
    }


    return date.toLocaleDateString(
        "vi-VN",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );
}


/* =========================================
   INITIALIZE COMMON
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        createHearts();

        const data =
            getGiftData();

        if (data) {

            setTheme(
                data.theme
            );

        } else {

            setTheme(
                "pink"
            );
        }

    }
);