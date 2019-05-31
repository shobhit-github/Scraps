import {MatDateFormats} from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';

export const SKRAPS_DATE_FORMAT: MatDateFormats = {
    parse: {
        dateInput: 'YYYY-MM-DD hh:mm:ss',
    },
    display: {
        ...MAT_MOMENT_DATE_FORMATS.display,
        dateInput: 'YYYY-MM-DD hh:mm:ss',
    },
};
