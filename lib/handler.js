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
    createFile: function(file_path, content)
        {

        return new Promise((resolve, reject) => {
            var fs = require("fs")
            fs.writeFile(file_path, content, function (err) {
                if (err) throw err
                resolve(true)
            }) 
        
         })
        
        },
        deleteFile: (file_path) => {

            return new Promise((resolve, reject) => {
                 // include node fs module
                 var fs = require('fs');

                 // delete file named 'sample.txt'
                 fs.unlink(file_path, function (err) {
                     if (err) throw err;
                     
                     resolve('File deleted!');
                 });
            
             })
        },
        readFile: function(file_path){
    
            return new Promise((resolve, reject) => {
                 
            
            
                const fs = require('fs');
               
                fs.readFile(file_path, function read(err, data) {
                    if (err) {
                        throw err;
                    }
                    resolve(data)
                })
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
},
AgeType: (str) => {
    
    var ars = str.split(" ")
    // 1, 3, 5
    //console.log("PPPPPPP", ars)
    if(parseInt(ars[1]) > 0){
        if(ars[1] == 1){
            return "Y"
        }
        return "Y"

    }else if(parseInt(ars[3]) > 0){

        if(ars[3] == 1){
            return "M"
        }
        return "M"
    }else{

        
            if(ars[5] == 1)
            return "D"
            return "D"
        
    }
    return 900

},
AgeValue: (str) => {
    
    var ars = str.split(" ")
    // 1, 3, 5
    //console.log("PPPPPPP", ars)
    if(parseInt(ars[1]) > 0){
        if(ars[1] == 1){
            return ars[1]
        }
        return ars[1]

    }else if(parseInt(ars[3]) > 0){

        if(ars[3] == 1){
            return ars[3]
        }
        return ars[3]
    }else{

        
            if(ars[5] == 1)
            return ars[5]
            return ars[5]
        
    }
    return 900

}, 
ProcessAge: (str) => {
    
    var ars = str.split(" ")
    // 1, 3, 5
    //console.log("PPPPPPP", ars)
    if(parseInt(ars[1]) > 0){
        if(ars[1] == 1){
            return ars[1]+"Yr"
        }
        return ars[1]+"Yrs"

    }else if(parseInt(ars[3]) > 0){

        if(ars[3] == 1){
            return ars[3]+"month"
        }
        return ars[3]+"months"
    }else{

        
            if(ars[5] == 1)
            return ars[5]+"day"
            return ars[5]+"days"
        
    }
    return 900

}, 
GetTestInfo: async (test_id, patient_id) => {
   // console.log("################", patient_id)
    //: get the sex and age of the patient
    var patient_info = await module.exports.bindRawQuery("select id, sex, dob from patient_master where code = $code collate nocase", {code: patient_id})
    var sex = patient_info[0]["sex"].substr(0, 1).toUpperCase()
    var age = module.exports.Age(patient_info[0]["dob"])
    var age_type = module.exports.AgeType(age)
    var age_val = module.exports.AgeValue(age)
    //: select reference range
    var is_ref_range = await module.exports.bindRawQuery("select * from ref_ranges where (sex = $sex and date_type = $age_type and test_id = $test_id and from_age <= $age_val and to_age >= $age_val)", {test_id: test_id, age_type: age_type, sex: sex, age_val: age_val})
    //console.log(sex, "##", age, "###", age_type)
    var test_info = await module.exports.bindRawQuery("select test_code, test_name as name, ('') as value_1, ('') as value_2, unit_1, unit_2, lower_limit_1 as range_1_1, upper_limit_1 as range_2_1, lower_limit_2 as range_1_2, upper_limit_2 as range_2_2, formula_1, formula_2, report_type, summary, summary_2, summary_3, summary_4, ('') as prev_result_1, ('') as prev_result_2, ('') as value_1, ('') as value_2, ('') as para_value, custom from test where id = $id", {id: test_id})
    if(is_ref_range.length > 0){
        //: pick the first match
        test_info[0]["unit_1"] = is_ref_range[0]["unit_1"]
        test_info[0]["unit_2"] = is_ref_range[0]["unit_2"]
        test_info[0]["range_1_1"] = is_ref_range[0]["lower_limit_1"]
        test_info[0]["range_1_2"] = is_ref_range[0]["lower_limit_2"]
        test_info[0]["range_2_1"] = is_ref_range[0]["upper_limit_1"]
        test_info[0]["range_2_2"] = is_ref_range[0]["upper_limit_2"]
        test_info[0]["formula_1"] = is_ref_range[0]["formula_1"]
        test_info[0]["formula_2"] = is_ref_range[0]["formula_2"]
    }

    //console.log("((((((", test_info)


    return test_info

}, 
GroupCategory: async  (test) => {
    var rcat = [] // final cat

    //SKIP PROFILE  FIRST
    
    for(var el of test){
       // console.log("@@@@@@@@@", el.accepted_test_id)
        if(el.test_type == "test"){
        
        //: test info
        var mtests = []
        var get_tst = await module.exports.GetTestInfo(el.test_id, el.patient_id)
        //: get category name
        var catx = await module.exports.bindRawQuery("select category_id, (select cat_name from category where id = x.category_id) as cat_name from test_category x where test_id = $test_id", {test_id: el.test_id})
        //console.log("$$$$$$", catx)
        //console.log("$$$$$$", catx[0].cat_name)
        //: if the category already exist push the test inside

        for(var ii in rcat){


           

            if(! rcat[ii].tests){
                rcat[ii].tests = []
            }
            if(rcat[ii].category_name.trim() == catx[0].cat_name.trim()){
               
                rcat[ii].tests.push(get_tst[0])
               // rcat[ii].tests.push({test_id: el.test_id, name: "XX"})

            }else{
                //: if the category exist skip
                if(! module.exports.CheckIfCatExist(catx[0].cat_name, rcat)){
                    mtests.push(get_tst[0])
                    rcat.push({
                        show: false,
                        category_name: catx[0].cat_name,
                        accepted_test_id: el.accepted_test_id
                    })
                    var len = rcat.length - 1
                    rcat[len].tests = mtests
                }

                
            }


        }
        if(rcat.length == 0){
            //: init
            mtests.push(get_tst[0])
            rcat.push({
                show: false,
                category_name: catx[0].cat_name,
                accepted_test_id: el.accepted_test_id
            })
            var len = rcat.length - 1
            rcat[len].tests = mtests

        }


       
        //console.log("###", mtests)
       // rcat.push({show: false, category_name: catx[0].cat_name, tests: mtests})
       // var len = rcat.length - 1
       // rcat[len] = []

        }
        
    }
    // WORK ON PROFILE
    for(var elx of test){

        if(elx.test_type == "profile"){

            // list the test in the profile
           // console.log("$$$", elx.test_id)
            if(elx.test_type == "profile"){

                var get_profile_tests = await module.exports.bindRawQuery("select test_id, (select name from profile where id = x.profile_id) as profile_name from test_profile x where profile_id = $pid order by test_order asc", {pid: elx.test_id})
                let mtests_x = []
                for(let prof of get_profile_tests){

                   // console.log(prof.test_id)
                    let get_tst_x = await module.exports.GetTestInfo(prof.test_id, elx.patient_id)
                    //console.log("##", get_tst_x)
                    mtests_x.push(get_tst_x[0])

                }
                
                rcat.push({
                    show: false,
                    category_name: get_profile_tests[0].profile_name,
                    accepted_test_id: elx.accepted_test_id
                })
                var len_x = rcat.length - 1
                rcat[len_x].tests = mtests_x
                //console.log(get_profile_tests)
            

            }   

        }

    }

    //console.log(el.test_id)
    //console.log("**######**", rcat)


    return rcat
},
CheckIfCatExist: (cat_name, cat_array) => {
    var check = false
    for(var o of cat_array){
        if(o.category_name == cat_name){
            check = true
        }
    }

    return check
},
GetDepartmentIdbyTestId: async (test_id) => {

    var dept_id = await module.exports.bindRawQuery("select department_id from category where id = (select category_id from test_category where test_id = $test_id) ", {test_id: test_id})
    return dept_id[0].department_id

},
GetPrintingHost:  () => {

    return "http://localhost:3000/printing/print-result.html"

},
ModifyPDF: (original_path, modified_path) => {
        var hummus = require("hummus")
        var pdfInserPageNumber = hummus.createWriterToModify(original_path, {
            modifiedFilePath: original_path
        });
        var getFont = pdfInserPageNumber.getFontForFile('mfonts/OpenSans-Light.ttf');
        var textOptions = {
            font: getFont,
            size: 8,
            colorspace: 'gray',
            color: '#333'
        };
        
        var totalPages = pdfInserPageNumber.getModifiedFileParser().getPagesCount() //hummus.createReader(original_path).getPagesCount();

        var pageNumber;
        for (pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            var pageModifier = new hummus.PDFPageModifier(pdfInserPageNumber, pageNumber - 1, true);
            pageModifier.startContext().getContext().writeText('Page ' + String(pageNumber) + ' of ' + String(totalPages), 500, 10, textOptions);
            //pageModifier.startContext().getContext().writeText('Page ' + String(pageNumber) + ' of ' + String(totalPages), 460, 38, textOptions);
            pageModifier.endContext().writePage();
        }
        pdfInserPageNumber.end(); 
} 
 
 

}