const SUPPORTED_TRANSLATIONS = ['eng', 'geo'];

const TRANSLATE_DATA = {
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