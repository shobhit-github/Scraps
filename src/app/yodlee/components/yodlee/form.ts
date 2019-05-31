import {IYodleeCreds} from '../../reducers/yodlee.reducer';

export function getFormTpl(creds: IYodleeCreds) {
    return `
  <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>Yodlee</title>
    </head>

    <body>
        <div class='center processText'>Processing...</div>
        <div>
            <form action='${creds.NODE_URL}' method='post' id='rsessionPost'>
                <input type='hidden' name='rsession' value='${creds.RSESSION}'/>
                <input type='hidden' name='app' value='${creds.FINAPP_ID}'/>
                <input type='hidden' name='redirectReq' value='true'/>
                <input type='hidden' name='token' placeholder='token' value='${
        creds.TOKEN
        }'
                    id='token' />
                <input type='hidden' name='extraParams' value='${
        creds.EXTRA_PARAMS
        }'/>
            </form>
        </div>
        <script>document.getElementById('rsessionPost').submit();</script>
    </body>

    </html>
  `;
}
