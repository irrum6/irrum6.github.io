const SUPPORTED_TRANSLATIONS = ["ქართული", "English", "Deutsch", "Русский"];
const translateData = {
    "title": {
        "English": "Reported Screen Resolution is : ",
        "ქართული": "ამოცნობილი ეკრანის გარჩევადობა არის :",
        "Deutsch": "",
        "Русский": ""
    },
    "width": {
        "English": "Width",
        "ქართული": "სიგანე",
        "Deutsch": "",
        "Русский": ""
    },
    "height": {
        "English": "Height",
        "ქართული": "სიმაღლე",
        "Deutsch": "",
        "Русский": ""
    },
    "pixels": {
        "English": "pixels *",
        "ქართული": "პიქსელი",
        "Deutsch": "",
        "Русский": ""
    },
    "pixels1": {
        "English": "pixels *",
        "ქართული": "პიქსელი",
        "Deutsch": "",
        "Русский": ""
    },
    "report-notice": {
        "English": "* Reported width and height might be affected by toolbars, status panels, and browsers taking space for their own.",
        "ქართული": "ხელსაწყოების დაფა, სტატუსთა დაფამ და ვებ ბრაუზერის მიერ დაკავებულმა სივრცემ შეიძლება გავლენა იქონიოს ამოცნობილ ეკრანის გარჩევადობაზე",
        "Deutsch": "",
        "Русский": ""
    },
    "pixel-ratio": {
        "English": "Device Pixel Ratio",
        "ქართული": "მოწყობილობის პიქსელ-ფარდობა",
        "Deutsch": "",
        "Русский": ""
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