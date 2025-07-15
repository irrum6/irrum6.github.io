const SUPPORTED_TRANSLATIONS = ["ქართული", "English", "Deutsch"];
const translateData = {
    "title": {
        "English": "Reported Screen Resolution is : ",
        "ქართული": "ამოცნობილი ეკრანის გარჩევადობა არის :",
        "Deutsch": "Bildschirmauflösung:"        
    },
    "width": {
        "English": "Width",
        "ქართული": "სიგანე",
        "Deutsch": "Breite"
    },
    "height": {
        "English": "Height",
        "ქართული": "სიმაღლე",
        "Deutsch": "Höhe"
    },
    "pixels": {
        "English": "pixels *",
        "ქართული": "პიქსელი",
        "Deutsch": "pixel"
    },
    "pixels1": {
        "English": "pixels *",
        "ქართული": "პიქსელი",
        "Deutsch": "pixel"
    },
    "report-notice": {
        "English": `* Reported width and height might be affected by toolbars,
         status panels, and browsers taking space for their own.`,
        "ქართული": `ხელსაწყოების დაფამ, სტატუსთა დაფამ და ვებ ბრაუზერის მიერ
         დაკავებულმა სივრცემ შეიძლება გავლენა იქონიოს ამოცნობილ ეკრანის გარჩევადობაზე`,
        "Deutsch": `* Die gemeldete Breite und Höhe kann durch Symbolleisten, 
        Statusfenster und Browser beeinflusst werden, die Platz für ihre eigenen Elemente beanspruchen.`
    },
    "pixel-ratio": {
        "English": "Device Pixel Ratio",
        "ქართული": "Device Pixel Ratio",
        "Deutsch": "Device Pixel Ratio"
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