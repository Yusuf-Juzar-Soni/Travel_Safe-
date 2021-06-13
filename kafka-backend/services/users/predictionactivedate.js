const User = require('../../models/UserModel');
const Prediction = require('../../models/PredictionModel');
const code= {
    Afghanistan: 'af',
    Albania: 'al',
    Algeria: 'dz',
    Andorra: 'ad',
    Angola: 'ao',
    'Antigua and Barbuda': 'ag',
    Argentina: 'ar',
    Armenia: 'am',
    Australia: 'au',
    Austria: 'at',
    Azerbaijan: 'az',
    Bahamas: 'bs',
    Bahrain: 'bh',
    Bangladesh: 'bd',
    Barbados: 'bb',
    Belarus: 'by',
    Belgium: 'be',
    Belize: 'bz',
    Benin: 'bj',
    Bhutan: 'bt',
    Bolivia: 'bo',
    'Bosnia and Herzegovina': 'ba',
    Botswana: 'bw',
    Brazil: 'br',
    Brunei: 'bn',
    Bulgaria: 'bg',
    'Burkina Faso': 'bf',
    Burma: 'mm',
    Burundi: 'bi',
    'Cabo Verde': 'cv',
    Cambodia: 'kh',
    Cameroon: 'cm',
    Canada: 'ca',
    'Central African Republic': 'cf',
    Chad: 'td',
    Chile: 'cl',
    China: 'cn',
    Colombia: 'co',
    Comoros: 'km',
    'Congo (Brazzaville)': 'cg',
    'Congo (Kinshasa)': 'cd',
    'Costa Rica': 'cr',
    "Cote d'Ivoire": 'ci',
    Croatia: 'hr',
    Cuba: 'cu',
    Cyprus: 'cy',
    Czechia: 'cz',
    Denmark: 'dk',
    Djibouti: 'dj',
    Dominica: 'dm',
    'Dominican Republic': 'do',
    Ecuador: 'ec',
    Egypt: 'eg',
    'El Salvador': 'sv',
    'Equatorial Guinea': 'gq',
    Eritrea: 'er',
    Estonia: 'ee',
    Eswatini: 'sz',
    Ethiopia: 'et',
    Fiji: 'fj',
    Finland: 'fi',
    France: 'fr',
    Gabon: 'ga',
    Gambia: 'gm',
    Georgia: 'ge',
    Germany: 'de',
    Ghana: 'gh',
    Greece: 'gr',
    Greenland: 'gl',
    Grenada: 'gd',
    Guatemala: 'gt',
    Guinea: 'gn',
    'Guinea-Bissau': 'gw',
    Guyana: 'gy',
    Haiti: 'ht',
    'Holy See': 'va',
    Honduras: 'hn',
    Hungary: 'hu',
    Iceland: 'is',
    India: 'in',
    Indonesia: 'id',
    Iran: 'ir',
    Iraq: 'iq',
    Ireland: 'is',
    Israel: 'il',
    Italy: 'it',
    Jamaica: 'jm',
    Japan: 'jp',
    Jordan: 'jo',
    Kazakhstan: 'kz',
    Kenya: 'ke',
    Kosovo: 'xk',
    Kuwait: 'kw',
    Kyrgyzstan: 'kg',
    Laos: 'la',
    Latvia: 'lv',
    Lebanon: 'lb',
    Lesotho: 'ls',
    Liberia: 'lr',
    Libya: 'ly',
    Liechtenstein: 'li',
    Lithuania: 'lt',
    Luxembourg: 'lu',
    Madagascar: 'mg',
    Malawi: 'mw',
    Malaysia: 'my',
    Maldives: 'mv',
    Mali: 'ml',
    Malta: 'mt',
    Mauritania: 'mr',
    Mauritius: 'mu',
    Mexico: 'mx',
    Moldova: 'md',
    Monaco: 'mc',
    Mongolia: 'mn',
    Montenegro: 'me',
    Morocco: 'ma',
    Mozambique: 'mz',
    Namibia: 'na',
    Nepal: 'np',
    Netherlands: 'nl',
    'New Zealand': 'nz',
    Nicaragua: 'ni',
    Niger: 'ne',
    Nigeria: 'ng',
    'North Macedonia': 'mk',
    Norway: 'no',
    Oman: 'om',
    Pakistan: 'pk',
    Panama: 'pa',
    'Papua New Guinea': 'pg',
    Paraguay: 'py',
    Peru: 'pe',
    Philippines: 'ph',
    Poland: 'pl',
    Portugal: 'pt',
    Qatar: 'qa',
    Romania: 'ro',
    'Russian Federation': 'ru',
    Rwanda: 'rw',
    'Saint Kitts and Nevis': 'kn',
    'Saint Lucia': 'lc',
    'Saint Vincent and the Grenadines': 'vc',
    'San Marino': 'sm',
    'Sao Tome and Principe': 'st',
    'Saudi Arabia': 'sa',
    Senegal: 'sn',
    Serbia: 'rs',
    Seychelles: 'sc',
    'Sierra Leone': 'sl',
    Singapore: 'sg',
    Slovakia: 'sk',
    Slovenia: 'si',
    Somalia: 'so',
    'South Africa': 'za',
    'South Korea': 'kr',
    'South Sudan': 'ss',
    Spain: 'es',
    'Sri Lanka': 'lk',
    Sudan: 'sd',
    Suriname: 'sr',
    Sweden: 'se',
    Switzerland: 'ch',
    Syria: 'sy',
    Taiwan: 'tw',
    Tajikistan: 'tj',
    Tanzania: 'tz',
    Thailand: 'th',
    'Timor-Leste': 'tl',
    Togo: 'tg',
    'Trinidad and Tobago': 'tt',
    Tunisia: 'tn',
    Turkey: 'tr',
    US: 'us',
    Uganda: 'ug',
    Ukraine: 'uk',
    'United Arab Emirates': 'ae',
    'United Kingdom': 'gb',
    Uruguay: 'uy',
    Uzbekistan: 'uz',
    Venezuela: 've',
    Vietnam: 'vn',
    'West Bank and Gaza': 'ps',
    'Western Sahara': 'eh',
    Yemen: 'ye',
    Zambia: 'zm',
    Zimbabwe: 'zw'
  }

const sortLimit = (predict, limit) => {
    predict.sort((a, b) => (parseInt(a.Active) > parseInt(b.Active)) ? 1 : -1)
    return predict.slice(predict.length-limit, predict.length)
}
const handle_request = async (msg, callback) => {
    console.log("inside predict date service");
    const res = {};
    console.log("--------check service-----",msg)
    User.findById(msg.userId)
        .exec((err,user)=>{
            if(user){
                // console.log("inside user");
                // db.vehicleinformation.find({}).sort({"Pscore":-1}).limit(10)
                Prediction.find({$and:[{ Date: msg.date}]})
                    .exec((err,predict)=>{
                        console.log(predict)
                        if(predict){
                            predict = sortLimit(predict,20)
                            let set = [];
                            for(let i in predict){
                                set.push({
                                    country: code[predict[i].Country],
                                    value: predict[i].Active
                                })
                            }
                            console.log("-----checking set-------", set);
                            res.data={
                                message:"Passed",
                                set: set
                            };
                            res.status = 200;
                            callback(null, res);
                        }
                        else {
                            console.log(err);
                            res.status = 201;
                            res.data = {
                                message:"",
                                response:err
                            };
                            callback(null, res);
                          }

                    })
            }
            else{
                console.log(err);
                res.status = 201;
                res.data = {
                    message:"",
                    response:err
                };
                callback(null, res);
            }
        })
};

exports.handle_request = handle_request;
