
var __cov_wemJQuNdmcro4OzHx3MnNQ = (Function('return this'))();
if (!__cov_wemJQuNdmcro4OzHx3MnNQ.__coverage__) { __cov_wemJQuNdmcro4OzHx3MnNQ.__coverage__ = {}; }
__cov_wemJQuNdmcro4OzHx3MnNQ = __cov_wemJQuNdmcro4OzHx3MnNQ.__coverage__;
if (!(__cov_wemJQuNdmcro4OzHx3MnNQ['api/apiv1.js'])) {
   __cov_wemJQuNdmcro4OzHx3MnNQ['api/apiv1.js'] = {"path":"api/apiv1.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0,"33":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0]},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":30,"loc":{"start":{"line":30,"column":21},"end":{"line":30,"column":40}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":1,"column":34}},"2":{"start":{"line":2,"column":0},"end":{"line":2,"column":31}},"3":{"start":{"line":3,"column":0},"end":{"line":3,"column":32}},"4":{"start":{"line":5,"column":0},"end":{"line":7,"column":2}},"5":{"start":{"line":9,"column":0},"end":{"line":10,"column":104}},"6":{"start":{"line":11,"column":0},"end":{"line":11,"column":25}},"7":{"start":{"line":13,"column":0},"end":{"line":18,"column":1}},"8":{"start":{"line":14,"column":1},"end":{"line":16,"column":54}},"9":{"start":{"line":17,"column":1},"end":{"line":17,"column":54}},"10":{"start":{"line":20,"column":0},"end":{"line":28,"column":1}},"11":{"start":{"line":21,"column":1},"end":{"line":23,"column":2}},"12":{"start":{"line":22,"column":2},"end":{"line":22,"column":22}},"13":{"start":{"line":24,"column":1},"end":{"line":26,"column":2}},"14":{"start":{"line":25,"column":2},"end":{"line":25,"column":34}},"15":{"start":{"line":27,"column":1},"end":{"line":27,"column":7}},"16":{"start":{"line":30,"column":0},"end":{"line":61,"column":1}},"17":{"start":{"line":31,"column":1},"end":{"line":31,"column":26}},"18":{"start":{"line":32,"column":1},"end":{"line":32,"column":34}},"19":{"start":{"line":34,"column":1},"end":{"line":34,"column":16}},"20":{"start":{"line":35,"column":1},"end":{"line":35,"column":21}},"21":{"start":{"line":37,"column":1},"end":{"line":39,"column":2}},"22":{"start":{"line":38,"column":2},"end":{"line":38,"column":53}},"23":{"start":{"line":41,"column":1},"end":{"line":41,"column":68}},"24":{"start":{"line":43,"column":1},"end":{"line":60,"column":2}},"25":{"start":{"line":50,"column":3},"end":{"line":57,"column":4}},"26":{"start":{"line":51,"column":4},"end":{"line":51,"column":47}},"27":{"start":{"line":52,"column":10},"end":{"line":57,"column":4}},"28":{"start":{"line":53,"column":4},"end":{"line":53,"column":20}},"29":{"start":{"line":54,"column":4},"end":{"line":54,"column":44}},"30":{"start":{"line":56,"column":4},"end":{"line":56,"column":55}},"31":{"start":{"line":58,"column":3},"end":{"line":58,"column":50}},"32":{"start":{"line":63,"column":0},"end":{"line":63,"column":45}},"33":{"start":{"line":65,"column":0},"end":{"line":65,"column":23}}},"branchMap":{"1":{"line":21,"type":"if","locations":[{"start":{"line":21,"column":1},"end":{"line":21,"column":1}},{"start":{"line":21,"column":1},"end":{"line":21,"column":1}}]},"2":{"line":21,"type":"binary-expr","locations":[{"start":{"line":21,"column":5},"end":{"line":21,"column":21}},{"start":{"line":21,"column":25},"end":{"line":21,"column":55}}]},"3":{"line":24,"type":"if","locations":[{"start":{"line":24,"column":1},"end":{"line":24,"column":1}},{"start":{"line":24,"column":1},"end":{"line":24,"column":1}}]},"4":{"line":37,"type":"if","locations":[{"start":{"line":37,"column":1},"end":{"line":37,"column":1}},{"start":{"line":37,"column":1},"end":{"line":37,"column":1}}]},"5":{"line":50,"type":"if","locations":[{"start":{"line":50,"column":3},"end":{"line":50,"column":3}},{"start":{"line":50,"column":3},"end":{"line":50,"column":3}}]},"6":{"line":52,"type":"if","locations":[{"start":{"line":52,"column":10},"end":{"line":52,"column":10}},{"start":{"line":52,"column":10},"end":{"line":52,"column":10}}]}}};
}
__cov_wemJQuNdmcro4OzHx3MnNQ = __cov_wemJQuNdmcro4OzHx3MnNQ['api/apiv1.js'];
__cov_wemJQuNdmcro4OzHx3MnNQ.s['1']++;const express=require('express');__cov_wemJQuNdmcro4OzHx3MnNQ.s['2']++;const router=express.Router();__cov_wemJQuNdmcro4OzHx3MnNQ.s['3']++;var REQUEST=require('request');__cov_wemJQuNdmcro4OzHx3MnNQ.s['4']++;var request=REQUEST.defaults({strictSSL:false});__cov_wemJQuNdmcro4OzHx3MnNQ.s['5']++;const WEATHER_API='http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=imperial';__cov_wemJQuNdmcro4OzHx3MnNQ.s['6']++;const COUNTRY_CODE='US';__cov_wemJQuNdmcro4OzHx3MnNQ.s['7']++;const getWeatherConditions=weatherReport=>{__cov_wemJQuNdmcro4OzHx3MnNQ.s['8']++;const weather=`Conditions are ${weatherReport.weather[0].main}`+` and temperature is ${weatherReport.main.temp} F`;__cov_wemJQuNdmcro4OzHx3MnNQ.s['9']++;return{city:weatherReport.name,weather:weather};};__cov_wemJQuNdmcro4OzHx3MnNQ.s['10']++;const checkInputZip=zipCode=>{__cov_wemJQuNdmcro4OzHx3MnNQ.s['11']++;if((__cov_wemJQuNdmcro4OzHx3MnNQ.b['2'][0]++,zipCode===null)||(__cov_wemJQuNdmcro4OzHx3MnNQ.b['2'][1]++,typeof zipCode==='undefined')){__cov_wemJQuNdmcro4OzHx3MnNQ.b['1'][0]++;__cov_wemJQuNdmcro4OzHx3MnNQ.s['12']++;return'zip missing';}else{__cov_wemJQuNdmcro4OzHx3MnNQ.b['1'][1]++;}__cov_wemJQuNdmcro4OzHx3MnNQ.s['13']++;if(zipCode.length!==5){__cov_wemJQuNdmcro4OzHx3MnNQ.b['3'][0]++;__cov_wemJQuNdmcro4OzHx3MnNQ.s['14']++;return'invalid zip code length';}else{__cov_wemJQuNdmcro4OzHx3MnNQ.b['3'][1]++;}__cov_wemJQuNdmcro4OzHx3MnNQ.s['15']++;return;};__cov_wemJQuNdmcro4OzHx3MnNQ.s['16']++;exports.getWeather=function(req,res){__cov_wemJQuNdmcro4OzHx3MnNQ.f['1']++;__cov_wemJQuNdmcro4OzHx3MnNQ.s['17']++;const zip=req.query.zip;__cov_wemJQuNdmcro4OzHx3MnNQ.s['18']++;const errMsg=checkInputZip(zip);__cov_wemJQuNdmcro4OzHx3MnNQ.s['19']++;let respPayload;__cov_wemJQuNdmcro4OzHx3MnNQ.s['20']++;let statusCode=400;__cov_wemJQuNdmcro4OzHx3MnNQ.s['21']++;if(errMsg){__cov_wemJQuNdmcro4OzHx3MnNQ.b['4'][0]++;__cov_wemJQuNdmcro4OzHx3MnNQ.s['22']++;return res.status(statusCode).send({msg:errMsg});}else{__cov_wemJQuNdmcro4OzHx3MnNQ.b['4'][1]++;}__cov_wemJQuNdmcro4OzHx3MnNQ.s['23']++;const weatherApiQuery=`${WEATHER_API}&zip=${zip},${COUNTRY_CODE}`;__cov_wemJQuNdmcro4OzHx3MnNQ.s['24']++;request({method:'GET',url:weatherApiQuery,json:true},(err,resp,body)=>{__cov_wemJQuNdmcro4OzHx3MnNQ.s['25']++;if(err){__cov_wemJQuNdmcro4OzHx3MnNQ.b['5'][0]++;__cov_wemJQuNdmcro4OzHx3MnNQ.s['26']++;respPayload={msg:'Failed to get data'};}else{__cov_wemJQuNdmcro4OzHx3MnNQ.b['5'][1]++;__cov_wemJQuNdmcro4OzHx3MnNQ.s['27']++;if(body.cod===200){__cov_wemJQuNdmcro4OzHx3MnNQ.b['6'][0]++;__cov_wemJQuNdmcro4OzHx3MnNQ.s['28']++;statusCode=200;__cov_wemJQuNdmcro4OzHx3MnNQ.s['29']++;respPayload=getWeatherConditions(body);}else{__cov_wemJQuNdmcro4OzHx3MnNQ.b['6'][1]++;__cov_wemJQuNdmcro4OzHx3MnNQ.s['30']++;respPayload={msg:`No weather data for ${zip}`};}}__cov_wemJQuNdmcro4OzHx3MnNQ.s['31']++;return res.status(statusCode).send(respPayload);});};__cov_wemJQuNdmcro4OzHx3MnNQ.s['32']++;router.get('/getWeather',exports.getWeather);__cov_wemJQuNdmcro4OzHx3MnNQ.s['33']++;exports.router=router;
