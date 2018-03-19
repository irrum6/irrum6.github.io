var TranslateData = {
    english: {
        diagonal: 'diagonal',
        inch: 'inches',
        centimetre: 'centimetres',
        millimetre: 'millimetres',
        in: 'in',
        cm: 'cm',
        mm: 'mm',
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
        off:'Off',
        on:'On'
    },
    georgian: {

    }
};


var language = "english"
class Translate {
    /**
     * translate
     * @param {string} lang 
     * @return {void}
     */
    static TranslateApp(lang) {
        let translatableItems = document.querySelectorAll('[data-app-translate=1]');
        for (let i = 0, len = translatableItems.length; i < len; i++) {

        }
    }
    static SetLanguage(lang) {
        language = lang;
        Translate.TranslateApp(lang);
    }
}
