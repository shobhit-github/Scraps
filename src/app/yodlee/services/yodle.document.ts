// tslint:disable:max-line-length
export const yodleeDocument = `
<!DOCTYPE html>
<html>
<head>
	<title>Fast Link</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
</head>
<body>
<form action="/finapp/10003600/?brand=10010352&amp;id=10003600&amp;appId=3A4CAE9B71A1CCD7FF41F51006E9ED00&amp;channelId=-1&amp;version=19000.02&amp;status=published&amp;c=csit_key_0:Ezs8ADxj1MDYF5lk3Vs0cS3E/RE=&amp;finappCDNURL=&amp;resturl=https%3A%2F%2F172.17.25.88%2Fservices%2Fsrest%2Frestserver&amp;l=&amp;capp=restserver&amp;userId=10188126" method="post" id='form'>
	<input type='hidden' name ='rdata' value ='08062013_2:fc80ef8fd92f6e4c9a5b582d9835c9db9b7f33b68b69cdbf2afbe76801212008238ef6e280aa557a04d4da7d390f4dad6381f94074a75057a8b3040e2f6244f2' />
	<input type='hidden' name ='firmId' value ='' />
	<input type='hidden' name ='docObj' value ='' />
</form>
<div class="inline-spinner"></div>
<script>

function getCookie(k){var v=document.cookie.match('(^|;) ?'+k+'=([^;]*)(;|$)');return v?v[2]:false};
	var error = false;
	var isCookieSupported = getCookie('isCookie');
	var whichBrowser = "CHROME";
	if (typeof isCookieSupported != 'undefined' && !isCookieSupported){
        try{
        	sessionStorage.setItem("rdata", "08062013_2:fc80ef8fd92f6e4c9a5b582d9835c9db9b7f33b68b69cdbf2afbe76801212008238ef6e280aa557a04d4da7d390f4dad6381f94074a75057a8b3040e2f6244f2");
        	sessionStorage.setItem('prefs', '{&quot;currencyCode&quot;:&quot;USD&quot;,&quot;dateFormat&quot;:&quot;MM/dd/yyyy&quot;,&quot;timeZone&quot;:&quot;PST&quot;,&quot;decimalSeparator&quot;:&quot;.&quot;,&quot;groupingSeparator&quot;:&quot;,&quot;,&quot;groupPattern&quot;:&quot;###,##0.##&quot;,&quot;groupSize&quot;:0,&quot;currencyNotation&quot;:&quot;SYMBOL&quot;,&quot;locale&quot;:&quot;en_US&quot;,&quot;segmentId&quot;:&quot;-1&quot;}');
        }
        catch(e){
        	var isOLB = ""
        	var ssoDomain = ""
        	var postSource = ""
	        var query = 'errorCode=1012&brand=' + 10010352 +'&app='+ 10003600 + '&appId=' + '3A4CAE9B71A1CCD7FF41F51006E9ED00' + '&cookieDisabled=true'
	        			+ '&version=' + '19000.02' +'&status=' + 'published';

	        if (isOLB !=""){
        		query= query + '&isOLB=true';
        	}

	        if (ssoDomain !=""){
        		query= query + '&ssoDomain=' + ssoDomain;
        	}
        	if (postSource !=""){
        		query= query + '&postSource=' + postSource;
        	}
	        window.location.href='/apperror/?' + query;
	        var error = true;
        }
	}
	//sessionStorage.setItem("capp", "restserver");
	sessionStorage.removeItem("hideIntertialPage");
	if (!error){
		document.getElementById("form").submit();
	}
</script>



</body>
</html>

`;
