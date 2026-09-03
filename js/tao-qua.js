/* =========================================
   TAO-QUA.JS
========================================= */


const QR_API =
    "https://api.qrserver.com/v1/create-qr-code/";


const DEFAULT_LETTER =
`Có lẽ anh không phải là người giỏi nói những lời ngọt ngào.

Nhưng anh muốn em biết rằng, từ ngày chúng ta gặp nhau,
cuộc sống của anh đã có thêm một điều thật đặc biệt.

Cảm ơn em vì đã xuất hiện.
Cảm ơn em vì đã ở bên anh.

Mong rằng chúng ta sẽ còn thật nhiều ngày,
nhiều tháng và nhiều năm nữa cùng nhau.

Anh yêu em. ❤️`;


/* =========================================
   YOUTUBE ID
========================================= */

function getYoutubeId(value) {

    if (!value) {
        return "";
    }


    value =
        value.trim();


    /* Nhập trực tiếp ID */

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


        /* youtu.be */

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


        /* youtube.com */

        if (
            host === "youtube.com" ||
            host === "m.youtube.com"
        ) {

            const v =
                url.searchParams.get("v");


            if (v) {
                return v;
            }


            if (
                url.pathname
                    .startsWith("/shorts/")
            ) {

                return (
                    url.pathname
                        .split("/")[2]
                    || ""
                );
            }


            if (
                url.pathname
                    .startsWith("/embed/")
            ) {

                return (
                    url.pathname
                        .split("/")[2]
                    || ""
                );
            }


            if (
                url.pathname
                    .startsWith("/live/")
            ) {

                return (
                    url.pathname
                        .split("/")[2]
                    || ""
                );
            }

        }

    } catch (error) {

        return "";
    }


    return "";
}


/* =========================================
   SELECT THEME
========================================= */

function getSelectedTheme() {

    const selected =
        document.querySelector(
            'input[name="theme"]:checked'
        );


    return selected
        ? selected.value
        : "pink";
}


/* =========================================
   CREATE GIFT
========================================= */

function createGift() {

    const couple =
        document.getElementById(
            "couple"
        ).value.trim();


    const receiver =
        document.getElementById(
            "receiver"
        ).value.trim();


    const date =
        document.getElementById(
            "date"
        ).value;


    const music =
        document.getElementById(
            "music"
        ).value.trim();


    const letter =
        document.getElementById(
            "letter"
        ).value.trim();


    const theme =
        getSelectedTheme();


    /* =====================================
       KIỂM TRA
    ===================================== */

    if (!couple) {

        alert(
            "Vui lòng nhập tên hai người."
        );

        return;
    }


    if (!receiver) {

        alert(
            "Vui lòng nhập tên người nhận."
        );

        return;
    }


    if (!date) {

        alert(
            "Vui lòng chọn ngày bắt đầu."
        );

        return;
    }


    const start =
        new Date(
            date +
            "T00:00:00"
        );


    if (
        isNaN(
            start.getTime()
        )
    ) {

        alert(
            "Ngày không hợp lệ."
        );

        return;
    }


    if (
        start > new Date()
    ) {

        alert(
            "Ngày bắt đầu không thể ở tương lai."
        );

        return;
    }


    /* Kiểm tra YouTube */

    if (
        music &&
        !getYoutubeId(music)
    ) {

        alert(
            "Link YouTube chưa đúng."
        );

        return;
    }


    /* =====================================
       TẠO URL
    ===================================== */

    const baseUrl =
        new URL(
            "index.html",
            window.location.href
        ).href;


    const params =
        new URLSearchParams();


    params.set(
        "c",
        couple
    );


    params.set(
        "t",
        receiver
    );


    params.set(
        "d",
        date
    );


    params.set(
        "theme",
        theme
    );


    if (music) {

        params.set(
            "m",
            music
        );
    }


    if (letter) {

        params.set(
            "l",
            letter
        );
    }


    const giftUrl =
        baseUrl +
        "?" +
        params.toString();


    /* =====================================
       HIỂN THỊ LINK
    ===================================== */

    document.getElementById(
        "generatedLink"
    ).textContent =
        giftUrl;


    /* =====================================
       QR
    ===================================== */

    const qr =
        document.getElementById(
            "qrCode"
        );


    qr.src =
        QR_API +
        "?size=700x700" +
        "&margin=25" +
        "&data=" +
        encodeURIComponent(
            giftUrl
        );


    /* =====================================
       HIỆN RESULT
    ===================================== */

    document.getElementById(
        "result"
    ).classList.add(
        "show"
    );


    document.getElementById(
        "result"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================================
   COPY
========================================= */

async function copyLink() {

    const link =
        document.getElementById(
            "generatedLink"
        ).textContent;


    if (!link) return;


    try {

        await navigator.clipboard.writeText(
            link
        );


        alert(
            "Đã sao chép link món quà ❤️"
        );

    } catch (error) {

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value =
            link;


        document.body.appendChild(
            textarea
        );


        textarea.select();


        document.execCommand(
            "copy"
        );


        textarea.remove();


        alert(
            "Đã sao chép link món quà ❤️"
        );
    }
}


/* =========================================
   OPEN GIFT
========================================= */

function openGift() {

    const link =
        document.getElementById(
            "generatedLink"
        ).textContent;


    if (!link) return;


    window.open(
        link,
        "_blank"
    );
}


/* =========================================
   BUTTON EVENTS
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        document
            .getElementById(
                "createButton"
            )
            .addEventListener(
                "click",
                createGift
            );


        document
            .getElementById(
                "copyButton"
            )
            .addEventListener(
                "click",
                copyLink
            );


        document
            .getElementById(
                "openButton"
            )
            .addEventListener(
                "click",
                openGift
            );


        /* Preview theme */

        document
            .querySelectorAll(
                'input[name="theme"]'
            )
            .forEach(
                function(input) {

                    input.addEventListener(
                        "change",
                        function() {

                            setTheme(
                                this.value
                            );

                            createHearts();

                        }
                    );

                }
            );

    }
);