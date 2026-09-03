/* =========================================
   STORY.JS

   Phụ trách:
   - Trang mở quà
   - Love Story
   - YouTube
   - Lời nhắn
   - Bộ đếm thời gian
========================================= */


let counterTimer = null;


/* =========================================
   DEFAULT LETTER
========================================= */

const STORY_DEFAULT_LETTER =
`Có lẽ anh không phải là người giỏi nói những lời ngọt ngào.

Nhưng anh muốn em biết rằng, từ ngày chúng ta gặp nhau,
cuộc sống của anh đã có thêm một điều thật đặc biệt.

Cảm ơn em vì đã xuất hiện.
Cảm ơn em vì đã ở bên anh.

Mong rằng chúng ta sẽ còn thật nhiều ngày,
nhiều tháng và nhiều năm nữa cùng nhau.

Anh yêu em. ❤️`;


/* =========================================
   LOAD STORY
========================================= */

function loadStory(data) {

    setTheme(
        data.theme
    );


    /* Couple */

    document.getElementById(
        "storyCouple"
    ).textContent =
        data.couple;


    /* Date */

    document.getElementById(
        "storyDate"
    ).textContent =
        formatDate(
            data.date
        );


    /* Letter */

    document.getElementById(
        "storyLetter"
    ).textContent =
        data.letter &&
        data.letter.trim()
            ? data.letter
            : STORY_DEFAULT_LETTER;


    /* Signature */

    let sender =
        data.couple
            .split("&")[0]
            .trim();


    if (!sender) {
        sender = "Anh";
    }


    document.getElementById(
        "signature"
    ).textContent =
        "— " +
        sender +
        " ❤️";


    /* YouTube */

    setupYoutube(
        data.music
    );


    /* Counter */

    startCounter(
        data.date
    );
}


/* =========================================
   YOUTUBE
========================================= */

function setupYoutube(music) {

    const musicCard =
        document.getElementById(
            "musicCard"
        );


    const frame =
        document.getElementById(
            "youtubeFrame"
        );


    const id =
        getYoutubeIdStory(
            music
        );


    if (!id) {

        musicCard.style.display =
            "none";

        frame.src = "";

        return;
    }


    musicCard.style.display =
        "block";


    frame.src =
        "https://www.youtube.com/embed/" +
        encodeURIComponent(id) +
        "?autoplay=1&rel=0";
}


/* =========================================
   YOUTUBE ID
========================================= */

function getYoutubeIdStory(value) {

    if (!value) {
        return "";
    }


    value =
        value.trim();


    if (
        /^[a-zA-Z0-9_-]{11}$/
            .test(value)
    ) {

        return value;
    }


    try {

        const url =
            new URL(value);


        const host =
            url.hostname
                .replace("www.", "")
                .toLowerCase();


        if (
            host === "youtu.be"
        ) {

            return (
                url.pathname
                    .split("/")
                    .filter(Boolean)[0]
                || ""
            );
        }


        if (
            host === "youtube.com" ||
            host === "m.youtube.com"
        ) {

            const v =
                url.searchParams.get(
                    "v"
                );


            if (v) {
                return v;
            }


            const parts =
                url.pathname
                    .split("/")
                    .filter(Boolean);


            if (
                parts[0] === "shorts" ||
                parts[0] === "embed" ||
                parts[0] === "live"
            ) {

                return parts[1] || "";
            }

        }

    } catch (error) {

        return "";
    }


    return "";
}


/* =========================================
   LOVE COUNTER
========================================= */

function startCounter(dateString) {

    if (counterTimer) {

        clearInterval(
            counterTimer
        );

        counterTimer = null;
    }


    function update() {

        if (!dateString) {

            setCounter(
                0,0,0,0,0,0
            );

            return;
        }


        const start =
            new Date(
                dateString +
                "T00:00:00"
            );


        const now =
            new Date();


        if (
            isNaN(
                start.getTime()
            )
        ) {

            setCounter(
                0,0,0,0,0,0
            );

            return;
        }


        if (
            start > now
        ) {

            setCounter(
                0,0,0,0,0,0
            );

            return;
        }


        /* ==============================
           NĂM
        ============================== */

        let years =
            now.getFullYear() -
            start.getFullYear();


        let cursor =
            new Date(start);


        cursor.setFullYear(
            cursor.getFullYear() +
            years
        );


        if (
            cursor > now
        ) {

            years--;

            cursor =
                new Date(start);


            cursor.setFullYear(
                cursor.getFullYear() +
                years
            );
        }


        /* ==============================
           THÁNG
        ============================== */

        let months =
            (
                now.getFullYear() -
                cursor.getFullYear()
            ) * 12
            +
            (
                now.getMonth() -
                cursor.getMonth()
            );


        let monthCursor =
            new Date(cursor);


        monthCursor.setMonth(
            monthCursor.getMonth() +
            months
        );


        if (
            monthCursor > now
        ) {

            months--;

            monthCursor =
                new Date(cursor);


            monthCursor.setMonth(
                monthCursor.getMonth() +
                months
            );
        }


        cursor =
            monthCursor;


        /* ==============================
           NGÀY / GIỜ / PHÚT / GIÂY
        ============================== */

        let remaining =
            now.getTime() -
            cursor.getTime();


        const DAY =
            24 *
            60 *
            60 *
            1000;


        const HOUR =
            60 *
            60 *
            1000;


        const MINUTE =
            60 *
            1000;


        const SECOND =
            1000;


        const days =
            Math.floor(
                remaining / DAY
            );


        remaining %=
            DAY;


        const hours =
            Math.floor(
                remaining / HOUR
            );


        remaining %=
            HOUR;


        const minutes =
            Math.floor(
                remaining / MINUTE
            );


        remaining %=
            MINUTE;


        const seconds =
            Math.floor(
                remaining / SECOND
            );


        setCounter(
            years,
            months,
            days,
            hours,
            minutes,
            seconds
        );
    }


    update();


    counterTimer =
        setInterval(
            update,
            1000
        );
}


/* =========================================
   UPDATE COUNTER UI
========================================= */

function setCounter(
    years,
    months,
    days,
    hours,
    minutes,
    seconds
) {

    document.getElementById(
        "years"
    ).textContent =
        years;


    document.getElementById(
        "months"
    ).textContent =
        months;


    document.getElementById(
        "days"
    ).textContent =
        days;


    document.getElementById(
        "hours"
    ).textContent =
        hours;


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes)
            .padStart(2,"0");


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds)
            .padStart(2,"0");
}


/* =========================================
   SHOW PAGE
========================================= */

function showStoryPage() {

    const opening =
        document.getElementById(
            "openingPage"
        );


    const story =
        document.getElementById(
            "storyPage"
        );


    opening.classList.remove(
        "active"
    );


    story.classList.add(
        "active"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   INITIALIZE STORY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const data =
            getGiftData();


        /*
           Không có dữ liệu:
           Không phải trang quà
        */

        if (!data) {
            return;
        }


        /* Người nhận */

        document.getElementById(
            "openingReceiver"
        ).textContent =
            data.receiver;


        /* Nút mở quà */

        document.getElementById(
            "openStoryButton"
        ).addEventListener(
            "click",
            function() {

                loadStory(
                    data
                );


                showStoryPage();

            }
        );

    }
);