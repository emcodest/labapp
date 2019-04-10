//var helper = require("../lib/Helper") // HELPER FUNCTIONS

//? IMPORT ALL DATABASE MODELS
var model = require('../models/index')
module.exports = {
    error: (message, data = null) => {

        return {error: true, message: message, data: data}
    },
    success: (message, data = null) => {

        return {success: true, message: message, data: data}
    },
    Error: (res, message, data=null) => {

        res.json({ error: true, message: message, data: data })
        
   },
    Success: (res, message, data=null) => {

        res.json({ success: true, message: message, data: data })
      
   },
   GenCode: async (table, location_code) => {
       return new Promise((resolve, reject) => {
           module.exports.bindRawQuery("select id from patient_master where 1 order by id desc limit 1").then(rows => {
               var cnt = ""
               if(rows.length < 1){
                   cnt = location_code+"-"+"01"
               }else{
                   cnt  = rows[0].id + 1
                   cnt = location_code+"-"+cnt
               }
               resolve(cnt)
           }) 
       
        })


   },
    fileExists: function(path)
    {
       var fs = require("fs")
       if(fs.existsSync(path))
       {
           return true
       }else{
           return false
       }

    },
    copy: function(old_path, new_path)
        {
        var fs = require("fs")
        if(fs.existsSync(old_path))
        {
            fs.createReadStream(old_path).pipe(fs.createWriteStream(new_path))
        }

        },
    createFile: function(file_name, content)
        {
        var fs = require("fs")
        fs.writeFile(file_name, content, function (err) {
            if (err) throw err
           return true
        })

        },
    getURLParams: function(req, key)
    {
        
        return req.query[key]

    },

    runCron: function(){
        console.log("Cron started")
        const rcron = "*/1 * * * *" //'* * * * * *'
        var CronJob = require('cron').CronJob
        new CronJob(rcron, function () {

            console.log('You will see this every minute')

        }, null, true, 'Africa/Lagos')
    },
    redirectURL:  function(response, route){
        response.writeHead(302, {
            'Location': route
            //add other headers here...
        })
        response.end()
    },
    rawQuery: query => {

        return new Promise((resolve, reject) => {

        model.sequelize.query(query).spread((results, metadata) => {

                    // Results will be an empty array and metadata will contain the number of affected rows.
                    resolve(results)
                   // resolve([results, metadata])
                })

        })
       
    },
     bindRawQuery:  (query, bind) => {
// query: select * from users where status = $status, bind = {status: 'active'}
         return new Promise((resolve, reject) => {

             model.sequelize.query(query, { bind: bind}).spread((results, metadata) => {

                 // Results will be an empty array and metadata will contain the number of affected rows.
                 resolve(results)
             })

         })

     },
    genQuery: function(query){
     
        return new Promise((resolve, reject) => {

        model.sequelize.query(query, {
                    raw: true,
                    type: model.Sequelize.QueryTypes.SELECT

                }).then(rows => {
                    resolve(rows)
                })

        })
       
    },
    genInsert: function(data, table_name){

      return new Promise((resolve, reject) => {

        model[table_name].create(data).then(function (newData, created) {

            if (! newData) {

                reject("Unable to insert data")

            }

            if (newData) {

                resolve(newData)

            }

        })

        })

    },
    genUpdate: function(data, table_name, cols){

     return new Promise((resolve, reject) => {
        model[table_name].update(data, {where: cols})
            .then(res => {
                
                if (res) {

                    resolve(res)
                }
            }).catch(err => {
               reject(err)
            })     
            
        })

    },

    genDelete: function(table_name, cols){
    
        return new Promise((resolve, reject) => {

            model[table_name].destroy({where: cols})
            .then(res => {
                
                if (res) {

                    resolve(res)
                }else{
                    reject("Unable to delete record")
                }
            }).catch(err => {
               reject(err)
            })     
            
        })

    }, 
    Login: async () => {

        var models = require('../models/index')

var passport = require("passport")

//! - - - - - - - - - -- - - - - - -CONFIGURE PASSPORT
var LocalStrategy = require('passport-local').Strategy

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
   
    done(null, user.id)
})
// used to deserialize the user
passport.deserializeUser(function (id, done) {

     models.users.findOne({
             where: {
                 id: id
             }
         }).then(function (user) {
             if(user)
             {
                  //  console.log(user.dataValues)
                  done(null, user)
             }else{
                done(null, false)
             }

         })
   
})
 
//! - - - - - - - - - -- - - - - - -END CONFIGURE
// INDICATE STRATEGY 
 passport.use('local-signin', new LocalStrategy({
         // by default, local strategy uses username and password, we will override with email
         usernameField: 'username',
         passwordField: 'password',
         passReqToCallback: true // allows us to pass back the entire request to the callback
     },
     function (req, username, password, done) {
     
        models.users.findOne({
            where: {
                username: username,
                password: password
            }
        }).then(function (user) {
            if (user) {
             
               done(null, user)
              
               
            } else {
             
                //req.flash("error","Invalid Email or Password")
                //console.log("error")
                done(null, false)
              
            }

        })

     }))

    },
    authenticated: function (req, res, next) {
        
        
            if (req.isAuthenticated())
            {
                 return next()
            }
               

            res.redirect('/')   
     
       
    },
     TestCodeExist: async function (code) {
        return new Promise((resolve, reject) => {

             module.exports.bindRawQuery("select * from test where test_code = $code", {code: code.toUpperCase()}).then(rows => {
                 resolve(rows)
             });
        
         })
       
      
     },
     AddTest: async (params) => {
         if(! params["test-rate"]){
             params["test-rate"] = 0
         }
      
        return new Promise(async (resolve, reject) => {

              if (params["test-code"] == "") {
                  resolve(module.exports.error("Empty test code"))
                  return
              }
               if (params["test-name"] == "") {
                  resolve(module.exports.error("Empty test name"))
                  return
              }
              if (! params["test-type"]) {
                  resolve(module.exports.error("Empty test type"))
                  return
              }
            var tcode = await module.exports.TestCodeExist(params["test-code"])

            if(tcode.length < 1){
                //: add new test
                var mcode = params["test-code"].toUpperCase()
                var tname = params["test-name"]
                // var tdep = params["test-dep"]
                // var tcat = params["test-cat"]
                //var mdata = {test_code: mcode, test_name: tname}
               var mdata = {test_code: mcode, test_name: params["test-name"], department: params["test-dep"], category: params["test-cat"], unit_1: params["test-u1"], unit_2: params["test-u2"], lower_limit_1: params["test-l1"], lower_limit_2: params["test-l2"], upper_limit_1: params["test-ul1"], upper_limit_2: params["test-ul2"], formula_1: params["test-f1"], formula_2: params["test-f2"], rate: params["test-rate"], test_type: params["test-type"]}
                module.exports.genInsert(mdata, "test")
                resolve({success: true, message: "Success!"}) 
            }else{
                resolve(module.exports.error("Code already exist"))
                return
            }
            
        
         })

     },
     RenderTestType: async (params) => {

        return new Promise((resolve, reject) => {
           
            module.exports.bindRawQuery("select * from test where test_type = $test_type", {test_type: params["list-test-type"]})
            .then(r => {
                for(var i = 0; i < r.length; i++){
                    r[i]["edit"] = "" // "<button class = 'btn btn-warning btn-sm'>Edit</button>"               
                    r[i]["view"] = "<button data-toggle = 'modal' data-target = '#viewTest' class = 'btn btn-primary btn-sm'>View</button>"
                    r[i]["mdelete"] = "<button class = 'btn btn-danger btn-sm'>x</button>"
                    r[i]["profile"] = "<button func = 'AddProfile' params = '[]' inputs = 'test-profile' class = 'btn btn-primary btn-sm click'>+ Profile</button>"
                }
                resolve(r)
            })
        
         })
     },
     LoadProfile: async () => {

        return new Promise((resolve, reject) => {
            module.exports.bindRawQuery("select *, code as text1, name as text2 from profile order by name asc", {}).then(r => {
                for(var i in r){
                    r[i]["text"] = "("+r[i]["text1"] +") "+ r[i]["text2"]
                }
                resolve(r)
            })
        
         })
     },
     AddProfile: async (params) => {
         //: make sure code is not already in the dattabase
       return new Promise(async (resolve, reject) => {
         // _prof_code _prof_name
       //: make sure code and name are sent
        if(params._prof_code == ""){
            resolve(module.exports.error("Empty code"))
            return
        }
        if (params._prof_name == "") {
            resolve(module.exports.error("Empty name"))
            return
        }       


       

             var mres = await module.exports.bindRawQuery("select code from profile where code = $code collate nocase", {
                 code: params._prof_code })
                 if(mres.length > 0){
                     resolve(module.exports.error("Code already exist"))
                     return
                 }

                var mdata = {code: params._prof_code.toUpperCase(), name: params._prof_name, status: 1}

                var isI = await module.exports.genInsert(mdata, "profile")
               
                 resolve(module.exports.success("Profile added!!"))
        })
            

     },
    UpdateProfileName: async (params) => {
         
       return new Promise(async (resolve, reject) => {
       
        if (params.profile_name_upd == "") {
            resolve(module.exports.error("Empty name"))
            return
        }  
        var mres = await module.exports.bindRawQuery("update profile set name = $name where id = $id", {name: params.profile_name_upd, id: params.id })
        if(mres){
        resolve(module.exports.success("Saved!!!", params.profile_name_upd ))                  
        }else{
        resolve(module.exports.error("Unable to save")) 
        }

              
        })
            

     },
     SearchTest: async (params) => {

        return new Promise(async (resolve, reject) => {
              var testorcode = params.search_test
              testorcode = testorcode.toLowerCase()
             
              if (! testorcode) {

                resolve(module.exports.error("Empty search"))
                return


              }
            
           var mytest = await module.exports.bindRawQuery("select * from test where lower(test_code) = $test_code", {test_code: testorcode});
              
           if(mytest.length == "1"){
              resolve(module.exports.success("Completed!", mytest))
           }else{
              
               var mytest2 = await module.exports.genQuery("select * from test where test_name like '" + testorcode + "'");
               resolve(module.exports.success("Completed!!", mytest2))
              
           }


        
         })
       


     },
     AddCategory: async (params) => {
         return new Promise( async (resolve, reject) => {
             if (!params.category_name) {
                 resolve("Empty name")
                 return
             }
             await module.exports.genInsert({name: params.category_name}, "category")
            var cats = await module.exports.LoadCategory()
            resolve(module.exports.success("Saved", cats))
         
          })

     },
     AddDepartment: async (params) => {
        
         return new Promise( async  (resolve, reject) => {
              if (!params.department_name) {
                resolve("Empty name")
                return
              }
             
            var newdata = await module.exports.genInsert({name: params.department_name}, "department")
             var deps = await module.exports.LoadDepartment()
             resolve(module.exports.success("Saved", deps))
            
         
          })

     },
     LoadDepartment: async () => {

         return new Promise(async(resolve, reject) => {
              var deps = await module.exports.genQuery("select id, name as text from department")
              resolve(deps)
         
          })        
     },
     LoadCategory: async () => {
          return new Promise(async(resolve, reject) => {
              var deps = await module.exports.genQuery("select id, name as text from category")
              resolve(deps)

          })
         
     },
    Luxon: () => {
             const {
                 DateTime
             } = require("luxon");
             //https://moment.github.io/luxon/docs/manual/install.html
             //https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
             var myDate = DateTime.local().setZone('Africa/Lagos');
             return myDate
    },
    DateTime: (dob) => {
        var ddob = new Date(dob)
    const {
        DateTime
    } = require("luxon");
    // console.log(lux)
        return DateTime.fromJSDate(ddob).toFormat('dd-MM-yyyy')
    },
    Age: (str) => {
    
    // birthday is a date
    var birthday = new Date(str)
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var days = ageDate.getSeconds() / 86400
    return "Year: "+Math.abs(ageDate.getUTCFullYear() - 1970)+" Month: "+ageDate.getMonth()+" Day: "+Math.ceil(days);
    
    
    },
    GetJsonKey: (master_data, obj, obj_cnt, key) => {
    var get_keys = Object.keys(master_data)
    var get_values = Object.values(master_data)
    var reconstruct_info = []
    var r_data  = obj //"test_info"
    var r_no = obj_cnt //10
    var cnt = 0

    for(var i in get_keys){
        var msplit = get_keys[i].split(r_data)
        if(msplit.length > 1){
            cnt++
            
            reconstruct_info[msplit[1]] = get_values[i]
        }
    }        
    
    var len = cnt / r_no
    
    //var key_s = key//"type"
    var rst = []
    for(var i = 0; i < len; i++){
        
        rst.push({key: reconstruct_info["["+i+"]["+key+"]"]})
    }

    return rst
    },
    getUser: (req) => {

    return -1
    },
    // normalize array
    NormalizeArray: function(arr, key, key_check, len){
    //: change to [{}, {}]  format
    var mkey = [] 
    var fobj = []
    var ars = Object.keys(arr)
    
    for(var i in ars){
        var get_ar = ars[i].split(key)
        if(get_ar.length > 1){
            mkey.push(get_ar[1])
        }
    }
    
    var obj_len = mkey.length / len
   
    
    for(var i = 0; i < obj_len; i++){

        var mobj = {}
      

        for(var j in key_check){

            mobj[key_check[j]] = arr[key+"["+i+"]["+key_check[j]+"]"]

            
        }
        fobj.push(mobj)
      
    }
    
    return fobj
}


}