var TranslateData = {
    diagonal: {
        english: 'diagonal',
        georgian: 'დიაგონალი'
    }, inch: {
        english: 'inches',
        georgian: 'დუიმი'
    }, centimetre: {
        english: 'centimetres',
        georgian: 'სანტიმეტრი'
    }, millimetre: {
        english: 'millimetres',
        georgian: 'მილიმეტრი'
    }, in: {
        english: 'In',
        georgian: 'დმ'
    }, cm: {
        english: 'CM',
        georgian: 'სმ'
    }, mm: {
        english: 'MM',
        georgian: 'მმ'
    }, pixels_per_inch: {
        english: 'Pixels/Inch',
        georgian: 'პიქსელი/დმ'
    }, pixels_per_cm: {
        english: 'Pixels/CM',
        georgian: 'პიქსელი/სმ'
    }, pixels_per_mm: {
        english: 'Pixels/MM',
        georgian: 'პიქსელი/მმ'
    }, aspect_ratio: {
        english: 'Aspect Ratio',
        georgian: 'შეფარდება'
    }, squarish: {
        english: 'Squarish',
        georgian: 'კვადრატული'
    }, wide: {
        english: 'Wide',
        georgian: 'ფართო'
    }, wider: {
        english: 'Wider',
        georgian: 'უფრო ფართო'
    }, ultrawide: {
        english: 'Ultrawide',
        georgian: 'ულტრაფართო'
    }, computed: {
        english: 'Computed',
        georgian: 'გამოთვლილი'
    }, width: {
        english: 'Width',
        georgian: 'სიგანე'
    }, height: {
        english: 'Height',
        georgian: 'სიმაღლე'
    }, off: {
        english: 'Off',
        georgian: 'გამორთვა'
    }, on: {
        english: 'On',
        georgian: 'ჩართვა'
    }, calculate: {
        english: 'Calculate',
        georgian: 'გამოთვლა'
    }, screen_area: {
        english: 'Screen Area',
        georgian: 'ეკრანის ფართობი'
    }, screen_res_pixels: {
        english: 'Screen Resolution : Width and Height (pixels)',
        georgian: 'გაფართოება : სიგრძე/სიგანე (პიქსელებში)'
    }, screen_size: {
        english: 'Screen Size : Width* and Height*',
        georgian: 'ეკრანის ზომები : სიგრძე*/სიგანე*'
    }, compute_field: {
        english: '&#11044; Compute Field',
        georgian: '&#11044; ველის გამოთვლა'
    }, input_field: {
        english: '&#9644; Input Field',
        georgian: '&#9644; ველის შევსება'
    }, pixels: {
        english: 'pixels',
        georgian: 'პიქსელი'
    }
};


var language = "english";

class Translate {
    /**
     * translate
     * @param {string} lang 
     * @return {void}
     */
    static TranslateApp(lang) {
        let translatableItems = document.querySelectorAll('[data-app-translate="1"]');
        for (let i = 0, len = translatableItems.length; i < len; i++) {
            let elem = translatableItems[i];
            let textToTranslate = elem.getAttribute("data-app-text");
            let tag = elem.tagName;
            if (tag === "OPTGROUP") {
                elem.setAttribute("label", TranslateData[textToTranslate][language]);
            } else {
                elem.textContent = TranslateData[textToTranslate][language];
            }
            if (elem.hasAttribute('addhtmlentity') && elem.getAttribute('addhtmlentity') === "1") {
                let chars = elem.getAttribute('charcodes').split(",").map((elem) => {
                    return String.fromCharCode(parseInt(elem));
                }).join("");
                elem.appendChild(document.createTextNode(chars))
            }
        }
    }
    static SetLanguage(lang) {
        language = lang;
        Translate.TranslateApp(lang);
    }
}

//Translate.SetLanguage('georgian');