import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ElementOptions, StripeService, Token, TokenResult} from 'ngx-stripe';
import {Observable} from 'rxjs';
import {map, mergeMap, pluck} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CardService {
    public form: HTMLElement;
    public onError = new EventEmitter<boolean>();
    public onPending = new EventEmitter<boolean>();
    public savedErrors = {};

    constructor(
        private stripeService: StripeService,
        private router: Router,
        private http: HttpClient,
    ) {
    }

    registerElements(elements, className) {
        const formClass = '.' + className;
        const stripeForm = document.querySelector(formClass);

        this.form = stripeForm.querySelector('form');
        const error = this.form.querySelector('.error');
        const errorMessage = error.querySelector('.message');
        elements.forEach((element, idx) => {
            element.on('change', event => {
                if (event.error) {
                    this.onError.emit(true);
                    error.classList.add('visible');
                    this.savedErrors[idx] = event.error.message;
                    (<HTMLElement>errorMessage).innerText = event.error.message;
                } else {
                    this.onError.emit(false);
                    this.savedErrors[idx] = null;

                    // Loop over the saved errors and find the first one, if any.
                    const nextError = Object.keys(this.savedErrors)
                        .sort()
                        .reduce((maybeFoundError, key) => {
                            return maybeFoundError || this.savedErrors[key];
                        }, null);

                    if (nextError) {
                        // Now that they've fixed the current error, show another one.
                        (<HTMLElement>errorMessage).innerText = nextError;
                    } else {
                        // The user fixed the last error; no more errors.
                        error.classList.remove('visible');
                    }
                }
            });
        });

        // Listen on the form's 'submit' handler...
        this.form.addEventListener('submit', e => {
            e.preventDefault();

            // Trigger HTML5 validation UI on the form if any of the inputs fail
            // validation.
            let plainInputsValid = true;
            Array.prototype.forEach.call(
                this.form.querySelectorAll('input'),
                input => {
                    if (input.checkValidity && !input.checkValidity()) {
                        plainInputsValid = false;
                        return;
                    }
                },
            );
            if (!plainInputsValid) {
                this.triggerBrowserValidation(this.form);
                return;
            }

            // Show a loading screen...
            stripeForm.classList.add('submitting');

            // Disable all inputs.
            this.disableInputs(this.form);

            // Gather additional customer data we may have collected in our form.
            const name: HTMLInputElement = this.form.querySelector('#name');
            const address1: HTMLInputElement = this.form.querySelector(
                '#address-line1',
            );
            const address2: HTMLInputElement = this.form.querySelector(
                '#address-line2',
            );
            const city: HTMLInputElement = this.form.querySelector('#city');
            const state: HTMLInputElement = this.form.querySelector('#state');
            const zip: HTMLInputElement = this.form.querySelector('#zip');
            const additionalData = {
                name: name ? name.value : undefined,
                address_line1: address1 ? address1.value : undefined,
                address_line2: address2 ? address2.value : undefined,
                address_city: city ? city.value : undefined,
                address_state: state ? state.value : undefined,
                address_zip: zip ? zip.value : undefined,
            };
            // console.log(additionalData);

            // Use Stripe.js to create a token. We only need to pass in one Element
            // from the Element group in order to create a token. We can also pass
            // in the additional customer data we collected in our form.
            this.onPending.emit(true);
            this.stripeService
                .createToken(elements[0], additionalData)
                .subscribe((result: TokenResult) => {
                    // Stop loading!
                    stripeForm.classList.remove('submitting');
                    // console.log(result.token);

                    if (result.token) {
                        stripeForm.classList.add('submitted');
                        this.sendToken(result.token).subscribe(
                            resp => {
                                this.onPending.emit(false);
                                this.router.navigate(['/invest', 'buy']);
                            },
                            () => this.onPending.emit(false),
                        );
                    } else {
                        this.onPending.emit(false);
                        // Otherwise, un-disable inputs.
                        this.enableInputs(this.form);
                    }
                });
        });
    }

    enableInputs(form: HTMLElement) {
        Array.prototype.forEach.call(
            form.querySelectorAll(
                `input[type='text'], input[type='email'], input[type='tel']`,
            ),
            input => {
                input.removeAttribute('disabled');
            },
        );
    }

    disableInputs(form: HTMLElement) {
        Array.prototype.forEach.call(
            form.querySelectorAll(
                `input[type='text'], input[type='email'], input[type='tel']`,
            ),
            input => {
                input.setAttribute('disabled', 'true');
            },
        );
    }

    triggerBrowserValidation(form: HTMLElement) {
        // The only way to trigger HTML5 form validation UI is to fake a user submit
        // event.
        const submit = document.createElement('input');
        submit.type = 'submit';
        submit.style.display = 'none';
        form.appendChild(submit);
        submit.click();
        submit.remove();
    }

    init(
        elementStyles,
        elementClasses,
        selectors: {
            numberId: string;
            expiryId: string;
            cardCvcId: string;
            formClass: string;
        },
    ): Observable<any> {
        return this.http.get(`${environment.baseUrl}/checkout/stripe/info`)
            .pipe(
                pluck('stripe_public_key'),
                mergeMap((key: string) => {
                    this.stripeService.setKey(key);
                    return this.stripeService
                        .elements({
                            locale: 'auto',
                        })
                        .pipe(
                            map(elements => {
                                // console.log(this);

                                const cardNumber = elements.create('cardNumber', <
                                    ElementOptions
                                    >{
                                    style: elementStyles,
                                    classes: elementClasses,
                                });
                                cardNumber.mount(selectors.numberId);

                                const cardExpiry = elements.create('cardExpiry', <
                                    ElementOptions
                                    >{
                                    style: elementStyles,
                                    classes: elementClasses,
                                });
                                cardExpiry.mount(selectors.expiryId);

                                const cardCvc = elements.create('cardCvc', <ElementOptions>{
                                    style: elementStyles,
                                    classes: elementClasses,
                                });
                                cardCvc.mount(selectors.cardCvcId);

                                this.registerElements(
                                    [cardNumber, cardExpiry, cardCvc],
                                    selectors.formClass,
                                );
                            }),
                        );
                }),
            );
    }

    public sendToken(
        tokenInfo: Token,
    ): Observable<any> {
        return this.http.post(`${environment.baseUrl}/checkout/stripe/add-card-to-stripe`, {stripe_id: tokenInfo.id});
    }
}
