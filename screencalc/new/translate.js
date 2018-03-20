var TranslateData = {
    english: {
        diagonal: 'diagonal',
        inch: 'inches',
        centimetre: 'centimetres',
        millimetre: 'millimetres',
        in: 'In',
        cm: 'CM',
        mm: 'MM',
        pixels_per_inch: 'Pixels/Inch',
        pixels_per_cm: 'Pixels/CM',
        pixels_per_mm: 'Pixels/MM',
        toggle_instruction: 'use these red/green toggles, switch on to use computed value, switch off to input and compute other field. Applies to all toggles',
        aspect_ratio: 'Aspect Ratio',
        squarish: 'squarish',
        wide: 'wide',
        wider: 'wider',
        ultrawide: 'ultrawide',
        computed: 'computed',
        width: 'width',
        height: 'height',
        off: 'Off',
        on: 'On'
    },
    georgian: {
        diagonal: 'დიაგონალი',
        inch: 'დუიმი',
        centimetre: 'სანტიმეტრი',
        millimetre: 'მილიმეტრი',
        in: 'დმ',
        cm: 'სმ',
        mm: 'მმ',
        pixels_per_inch: 'პიქსელი/დმ',
        pixels_per_cm: 'პიქსელი/სმ',
        pixels_per_mm: 'პიქსელი/მმ',
        toggle_instruction: 'გადართეთ წითელიდან მწვანეზე გადამრთველები, ჩართვა- გამოთვლილი მნიშვნელობის გამოყენება, გამორთვა- ველის შევსება',
        aspect_ratio: 'შეფარდება',
        squarish: 'კვადრატული',
        wide: 'ფართო',
        wider: 'უფრო ფართო',
        ultrawide: 'ულტრაფართო',
        computed: 'გამოთვლილი',
        width: 'სიგანე',
        height: 'სიმაღლე',
        off: 'გამორთვა',
        on: 'ჩართვა'
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
            elem.textContent = TranslateData[language][textToTranslate];
        }
    }
    static SetLanguage(lang) {
        language = lang;
        Translate.TranslateApp(lang);
    }
}

//Translate.SetLanguage('georgian');