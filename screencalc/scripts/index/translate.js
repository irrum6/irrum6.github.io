const CURRENT_SUPPORTED_TRANSLATIONS = ['eng', 'geo'];
Object.freeze(CURRENT_SUPPORTED_TRANSLATIONS);

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
    physical_dims_label: {
        geo: 'სიგრძე და სიგანე',
        eng: 'Width and Height'
    },
    resolutions: {
        geo: 'გაფართოება',
        eng: 'Resolution'
    },
    pixels_per_unit: {
        geo: 'პიქსელები',
        eng: 'Pixels'
    },
    popup_text: {
        geo: 'გამოიყენეთ ღილაკები ბოქლომით რათა ველის მნიშვნელობა უცვლელი '
            .concat('გახადოთ, დააჭირეთ ღილაკს ისრებით  ველების ერთმანეთთან ')
            .concat('დასაკავშირებლად (განსაკავშირებლად).\n')
            .concat('პიქსელები აღნიშნავს პიქსელების რაოდენობას არჩეულ ')
            .concat('სიგრძის ერთეულზე'),
        eng: 'Use Lock icons to freeze input\'s value, click button with arrows '
            .concat('to link (unlink) on input values (width to height for example); ')
            .concat('so they change together.\n')
            .concat('Pixels indicate number of pixels per user chosen length unit')
    }
}

Object.freeze(TRANSLATE_DATA);