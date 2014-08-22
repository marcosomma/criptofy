var ALGORITHM = 'AES-256-CBC',
    PRE_KEY = "your_private_key_here";

exports.encrypt = function (plain_text) {

    var random_KEY = crypto.randomBytes(Math.ceil(32 / 2)).toString('hex').slice(0, 32);

    var cipher_KEY = crypto.createCipher(ALGORITHM,PRE_KEY);
    var KEY = cipher_KEY.update(random_KEY,'utf8','hex');
    KEY += cipher_KEY.final('hex');

    var cipher = crypto.createCipher(ALGORITHM,random_KEY);
    var crypted = cipher.update(plain_text,'utf8','hex');
    crypted += cipher.final('hex');

    return crypted + "$" + KEY;
};

exports.decrypt = function (cipher_text) {

    var cipher_blob = cipher_text.split("$");

    var decipher_key = crypto.createDecipher(ALGORITHM,PRE_KEY);
    var KEY = decipher_key.update(cipher_blob[1],'hex','utf8');
    KEY += decipher_key.final('utf8');

    var decipher = crypto.createDecipher(ALGORITHM,KEY);
    var dec = decipher.update(cipher_blob[0],'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
};