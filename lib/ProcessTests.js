const model = require('../models/index')
const handler = require("./handler")

module.exports = _this = this
this.Skip = (obj, skips) => {
    var ssk = skips.split(",")
    var f_obj = {}
    var s_key = Object.keys(obj)
    var s_val = Object.values(obj)
    for(var i in s_key){
        if(ssk.indexOf(s_key[i]) == -1){
            
            f_obj[s_key[i]] = s_val[i]
        }
    }
    return f_obj
}
