import {Scripts} from '../../interfaces/scripts.interface';

const devmode = true;
const url = (() =>
    `https://api.autopilothq.com/anywhere/473b59552c6d4d06a0df87e8c2b773bb1df39f25f6384ca68874540df9811714?t=${encodeURIComponent(
        document.title || '',
    )}&u=${encodeURIComponent(
        document.location.href || '',
    )}&r=${encodeURIComponent(document.referrer || '')}${
        devmode ? '&devmode=true' : ''
        }`)();
const autoPilot = (window.AutopilotAnywhere = {
    _runQueue: [],
    run: function () {
        this._runQueue.push(arguments);
    },
});
if (!window.Autopilot) {
    window.Autopilot = autoPilot;
}
export const ScriptStore: Array<Scripts> = [
    {
        name: 'plaid',
        src: 'https://cdn.plaid.com/link/v2/stable/link-initialize.js',
    },
    {
        name: 'jquery',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js',
    },
    {
        name: 'autopilot',
        src: url,
    },
];
