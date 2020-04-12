const SUPPORTED_TRANSLATIONS = ["ქართული", "English", "Deutsch", "Русский"];
const translateData = {
    "title": {
        "English": "Reported Screen Resolution is : ",
        "ქართული": "ამოცნობილი ეკრანის გარჩევადობა არის :",
        "Deutsch": "Bildschirmauflösung:",
        "Русский": "Заявленное разрешение экрана:"
    },
    "width": {
        "English": "Width",
        "ქართული": "სიგანე",
        "Deutsch": "Breite",
        "Русский": "ширина"
    },
    "height": {
        "English": "Height",
        "ქართული": "სიმაღლე",
        "Deutsch": "Höhe",
        "Русский": "Высота"
    },
    "pixels": {
        "English": "pixels *",
        "ქართული": "პიქსელი",
        "Deutsch": "pixel",
        "Русский": "пиксель"
    },
    "pixels1": {
        "English": "pixels *",
        "ქართული": "პიქსელი",
        "Deutsch": "pixel",
        "Русский": "пиксель"
    },
    "report-notice": {
        "English": `* Reported width and height might be affected by toolbars,
         status panels, and browsers taking space for their own.`,
        "ქართული": `ხელსაწყოების დაფა, სტატუსთა დაფამ და ვებ ბრაუზერის მიერ
         დაკავებულმა სივრცემ შეიძლება გავლენა იქონიოს ამოცნობილ ეკრანის გარჩევადობაზე`,
        "Deutsch": `* Die gemeldete Breite und Höhe kann durch Symbolleisten, 
        Statusfenster und Browser beeinflusst werden, die Platz für ihre eigenen Elemente beanspruchen.`,
        "Русский": `* На указанную ширину и высоту могут влиять панели инструментов, 
        панели состояния и браузеры, занимающие место для своих собственных элементов.`
    },
    "pixel-ratio": {
        "English": "Device Pixel Ratio",
        "ქართული": "Device Pixel Ratio",
        "Deutsch": "Device Pixel Ratio",
        "Русский": "Device Pixel Ratio"
    },
}

const ss = (s) => `report-box > span[slot=${s}]`;

const translate = () => {
    let lang = localStorage.lang || 'en';
    if (!SUPPORTED_TRANSLATIONS.includes(lang)) throw "not supported";
    try {
        for (d in translateData) {
            let selector = ss(d);
            q(selector).textContent = translateData[d][lang];
        }
    } catch (e) {
        console.log(e.message);
    } finally {
    }
};