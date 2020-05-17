const SUPPORTED_TRANSLATIONS = ['eng', 'geo'];

const TRANSLATE_DATA = {
    languages: {
        geo: "ქართული",
        eng: "English"
    },
    inches: {
        geo: 'დუიმი',
        eng: 'Inches'
    },
    millimetres: {
        geo: 'მილიმეტრი',
        eng: 'Millimetre'
    },
    centimetres: {
        geo: 'სანტიმეტრი',
        eng: 'Centimetres'
    },
    diagonal: {
        geo: 'დიაგონალი',
        eng: 'Diagonal'
    },
    aspect_ratio: {
        geo: 'შეფარდება',
        eng: 'Aspect Ratio'
    },
    physical_dims_label: {
        geo: 'ფიზიკური ზომები',
        eng: 'Physical Dimmension'
    },
    width: {
        geo: 'სიგანე',
        eng: 'Width'
    },
    height: {
        geo: 'სიმაღლე',
        eng: 'Height'
    },
    resolutions: {
        geo: 'გაფართოება',
        eng: 'Resolution'
    },
    pixels: {
        geo: 'პიქსელები',
        eng: 'Pixels'
    },
    lock: {
        geo: 'გამუდმივება',
        eng: 'Lock'
    },
    popup_text: {
        geo: `გამოიყენეთ ღილაკები ბოქლომით რათა ველის მნიშვნელობა უცვლელი
        გახადოთ.\n პიქსელები აღნიშნავს პიქსელების რაოდენობას არჩეულ
        სიგრძის ერთეულზე`,
        eng: `Use Lock icons to freeze input\'s value.\n
        Pixels indicate number of pixels per user chosen length unit`
    },
    unblock_phys: {
        geo: `გთხოვთ მოხსნათ ფიზიკური ზომების ბლოკი`,
        eng: `Please, unlock physical width and height`
    },
    unblock_res: {
        geo: `გთხოვთ მოხსნათ გარჩევადობის ბლოკი`,
        eng: `Please, unlock resolution width and height`
    },
    unblock_pixels: {
        geo: `გთხოვთ მოხსნათ პიქსელების  ბლოკი`,
        eng: `Please, unlock pixels`
    },
    unblock_ratio: {
        geo: `გთხოვთ მოხსნათ შეფარდების ბლოკი`,
        eng: `Please, unlock ratio`
    },
    unblock_diag: {
        geo: `გთხოვთ მოხსნათ დიაგონალის ბლოკი`,
        eng: `Please, unlock diagonal`
    }
}

class Translator {
    static getTranslation(word, lang) {
        //debugger;
        if (!lib.isString(word, lang)) {
            throw new Error("Not a string");
        }
        if (!SUPPORTED_TRANSLATIONS.includes(lang)) {
            throw new Error('invalid value, language not supported');
        }
        //debugger;
        if (TRANSLATE_DATA[word] === undefined) {
            throw new Error("word not found in dictionary");
        }
        if (TRANSLATE_DATA[word][lang] === undefined) {
            throw new Error("Translation not found for language");
        }
        return TRANSLATE_DATA[word][lang];
    }
}

Object.freeze(SUPPORTED_TRANSLATIONS);
Object.freeze(TRANSLATE_DATA);
Object.freeze(Translator);