// DEPARTMENT CONTROLLER
// - add dept, add category and add test to category
const model = require('../models/index')
const handler = require("./handler")

module.exports = _this = this
this.AddDepartment = async (req, res) => {

    var {
        code,
        department_name
    } = req.body

    if (!code) {
        handler.Error(res, "Code is empty")
        return
    }
    if (!department_name) {
        handler.Error(res, "Department name is empty")
        return
    }
    // make sure code is ok 
    var is_code_ok = await handler.bindRawQuery("select code from department where code = $code", {
        code: code
    })
    if (is_code_ok.length > 0) {

        handler.Error(res, "Code already exist")
        return
    }
    // add code name to database
    var add_code = await handler.genInsert({
        code: code,
        name: department_name
    }, "department")

    if (add_code) {
        handler.Success(res, "Department added")
        return
    } else {
        handler.Error(res, "Unable to add department")
        return
    }

}
this.ListDepartmentSelect = async (req, res) => {
   
    var dresult = []
    var list_dept = await handler.bindRawQuery("select * from department order by name asc limit 1000", {})
    console.log("##", list_dept)
    for (let r of list_dept) {
        dresult.push({id: r.id, name: r.name})
    }

    res.json(dresult)

}

this.ListDepartment = async (req, res) => {

    var dresult = []
    var list_dept = await handler.bindRawQuery("select * from department order by name asc limit 1000", {})
    for (let r of list_dept) {
        dresult.push([r.code, r.name, "<button params = '"+r.id+", preview' func = 'DepartmentMaster' class = \"my-btn click\"><i class = \"fa fa-edit \"></i></button>", "<button params = '"+r.id+", remove' func = 'DepartmentMaster'  class = \"my-btn click\"><i class = \"fa fa-times\"></i></button>", r.id])
    }

    res.json({
        data: dresult

    })

}
this.EditCategory = async (req, res) => {

    var {
        cat_id,
        cat_code,
        department_id,
        cat_name
    } = req.body
    
    // if (! code) {
    //     handler.Error(res, "Code is empty")
    //     return
    // }
    if (! department_id) {
        handler.Error(res, "Please select department")
        return
    }
    if (! cat_id) {
        handler.Error(res, "Please select category")
        return
    }
    // make sure code is ok 
    // var is_code_ok = await handler.bindRawQuery("select * from department  where lower(name) = $name", {
    //     name: department_name.toLowerCase()
    // })
    // if (is_code_ok.length > 0) {

    //     handler.Error(res, "Department Name already exist")
    //     return
    // }

    //: update
    var update = await handler.genUpdate({
        code: cat_code,
        cat_name: cat_name,
        department_id
    }, "category", {
        id: cat_id
    })

    if (update) {
        handler.Success(res, "Category updated")
        return
    } else {
        handler.Error(res, "Unable to update Category")
        return
    }





}
this.EditDepartment = async (req, res) => {

    var {
        id,
        code,
        department_name
    } = req.body
    
    if (!code) {
        handler.Error(res, "Code is empty")
        return
    }
    if (!department_name) {
        handler.Error(res, "Department name is empty")
        return
    }
    if (! id) {
        handler.Error(res, "No existing department selected")
        return
    }
    // make sure code is ok 
    // var is_code_ok = await handler.bindRawQuery("select * from department  where lower(name) = $name", {
    //     name: department_name.toLowerCase()
    // })
    // if (is_code_ok.length > 0) {

    //     handler.Error(res, "Department Name already exist")
    //     return
    // }

    //: update
    var update = await handler.genUpdate({
        code: code,
        name: department_name
    }, "department", {
        id: id
    })

    if (update) {
        handler.Success(res, "Department updated")
        return
    } else {
        handler.Error(res, "Unable to update department")
        return
    }





}
this.DeleteDepartment = async (req, res) => {

    var {
        id
    } = req.body
    var del = await handler.genDelete("department", {
        id: id
    })
    if (del) {
        handler.Success(res, "Department deleted")
        return
    }


}
this.ListCategory = async (req, res) => {

    var dresult = []
    var {dept_id} = req.body
  
    var list_dept = await handler.bindRawQuery("select * from category where department_id = $dept_id order by cat_name asc limit 1000", {dept_id: dept_id})
    for (let r of list_dept) {
        dresult.push([r.code, r.cat_name, "<button params = '"+r.id+", preview' func = 'CategoryMaster' class = \"my-btn click\"><i class = \"fa fa-edit \"></i></button>", "<button params = '"+r.id+", remove' func = 'CategoryMaster'  class = \"my-btn click\"><i class = \"fa fa-times\"></i></button>", r.id])
    }

    res.json({
        data: dresult

    })

}
this.ListTest = async (req, res) => {

    var dresult = []
    var {dept_id} = req.body
    //console.log("#ff", req.body)
   // var list_cat = await handler.bindRawQuery("select id, (select test_name from test where category = x.id) as test_name, (select test_code from test where category = x.id) as test_code, (select id from test where category = x.id) as test_id from category x where id = $cat_id and (select test_name from test where category = x.id) != ''", {cat_id: dept_id})
    var list_cat = await handler.bindRawQuery("select id, (select test_name from test where id = x.test_id) as test_name, (select test_code from test where id = x.test_id) as test_code, (select id from test where id = x.test_id) as test_id, (select report_type from test where id = x.test_id) as report_type from test_category x where category_id = $cat_id and (select test_name from test where id = x.test_id) != '' order by x.test_order asc", {cat_id: dept_id})
    for (let r of list_cat) {
        dresult.push([r.test_code, r.test_name, "<button params = '"+r.test_id+", preview, "+r.report_type+"' func = 'TestMaster' class = \"my-btn click\"><i class = \"fa fa-edit \"></i></button>", "<button params = '"+r.test_id+", remove' func = 'TestMaster'  class = \"my-btn click\"><i class = \"fa fa-times\"></i></button>", r.id])
    }

    res.json({
        data: dresult

    })

}
this.ListTestDialog = async (req, res) => {

    
    var dresult = []
  
    var list_cat = await handler.bindRawQuery("select id as test_id, test_code, test_name from test x", {})
    for (let r of list_cat) {
        dresult.push([r.test_code, r.test_name,  "<button params = '"+r.test_code+"' func = 'AddtestToDialog'  class = \"my-btn click\"><i class = \"fa fa-plus-circle\"></i></button>", r.id])
    }

    res.json({
        data: dresult

    })

}
this.ListAllTest = async (req, res) => {

    var dresult = []
  
    var list_cat = await handler.bindRawQuery("select id as test_id, test_code, test_name from test x", {})
    for (let r of list_cat) {
        dresult.push([r.test_code, r.test_name,  "<button params = '"+r.test_id+", add_test' func = 'TestMaster'  class = \"my-btn click\"><i class = \"fa fa-plus\"></i></button>", r.id])
    }

    res.json({
        data: dresult

    })

}
this.ListAllProfileTest = async (req, res) => {

    var dresult = []
  
    var list_cat = await handler.bindRawQuery("select id as test_id, test_code, test_name from test x", {})
    for (let r of list_cat) {
        dresult.push([r.test_code, r.test_name,  "<button params = '"+r.test_id+", add_test_profile' func = 'TestMaster'  class = \"my-btn click\"><i class = \"fa fa-plus\"></i></button>", r.id])
    }

    res.json({
        data: dresult

    })

}
this.ListTestById = async (req, res) => {

    var {id} = req.body
    var list = await handler.bindRawQuery("select *, test_code as code, test_name as name from test x where id = $id", {id: id})
    //console.log(list[0])
    res.json(list[0])

}
this.ListProfileById = async (req, res) => {

    var {id} = req.body
    var list = await handler.bindRawQuery("select * from profile x where id = $id", {id: id})
    //console.log(list[0])
    res.json(list[0])

}
this.AddCategoryToDepartment = async (req, res) => {
    var {
        department_id,
        cat_code,
        cat_name
    } = req.body

    if (!department_id) {
        handler.Error(res, "Department is not selected")
        return
    }
    if (!cat_name) {
        handler.Error(res, "Category name is empty")
        return
    }
    var is_cat_ok = await handler.bindRawQuery("select id from category where lower(cat_name) = $cat_name collate nocase", {
        cat_name: cat_name.toLowerCase()
    })
    if (is_cat_ok.length > 0) {

        handler.Error(res, "Category name already exist")
        return
    }
    //: add category
    var add_category = await handler.genInsert({
        department_id,
        code: cat_code,
        cat_name
    }, "category")

    if (add_category) {
        handler.Success(res, "Category added")
        return
    } else {
        handler.Error(res, "Unable to add category")
        return
    }




}
this.RemoveCategoryFromDepartment = async (req, res) => {

    var {
        id
    } = req.body
    var del = await handler.genDelete("category", {
        id: id
    })
    //: also delete from test category
    try{
        var del2 = await handler.genDelete("test_category", {
            category_id: id
        })
    }catch(ex){

    }
   
    if (del) {
        handler.Success(res, "Category  deleted")
        return
    }

}
this.AddTestToCategory = async (req, res) => {
    var {
        test_id,
        category_id
    } = req.body

    if (!test_id) {
        handler.Error(res, "Test is not selected")
        return
    }
    if (!category_id) {
        handler.Error(res, "Category is not selected")
        return
    }
    // make sure code is ok 
    var is_test_cat = await handler.bindRawQuery("select id from test_category where test_id = $test_id and category_id = $category_id", {
        test_id,
        category_id
    })
    if (is_test_cat.length > 0) {

        handler.Error(res, "Test already exist in category")
        return
    }
    // add code name to database
    var add_test_cat = await handler.genInsert({
        test_id,
        category_id
    }, "test_category")

    if (add_test_cat) {
        handler.Success(res, "Test added to category")
        return
    } else {
        handler.Error(res, "Unable to add test category")
        return
    }


}
this.RemoveTestFromCategory = async (req, res) => {


    var {
        id
    } = req.body
    var del = await handler.genDelete("test_category", {
        test_id: id
    })
    if (del) {
        handler.Success(res, "Test Category deleted")
        return
    }


}
this.AddTest = async (req, res) => {


    var {
        code,formula_1,formula_2,lower_bound_1,lower_bound_2,name,rate,report_type,summary, summary_2, summary_3, summary_4,tax_per,unit_1,unit_2,upper_band_1,upper_band_2, category_id
    } = req.body
    if(! code){
        handler.Error(res, "Test code is empty")
        return
    }
    if(! name){
        handler.Error(res, "Test name is empty")
        return
    }
    // check if code exist
    var tst_code =  await handler.bindRawQuery("select test_code from test where  lower(test_code) = $code", {code: code.toLowerCase()})
    if(tst_code.length > 0){
        handler.Error(res, "Test code already exist")
        return
    }
    
    var mdata = {test_code: code, test_name: name, unit_1, unit_2, lower_limit_1: lower_bound_1, lower_limit_2: lower_bound_2, upper_limit_1: upper_band_1, upper_limit_2: upper_band_2, 	formula_1, formula_2, rate, report_type, summary, summary_2, summary_3, summary_4, tax_per}
    //console.log("###", mdata)
    var test = await handler.genInsert(mdata, "test")
    if(test){

        
       // var test_id = await handler.bindRawQuery("select id from test where test_code = $code", {code: test_code.toUpperCase()})
        // setup the test category
        var tdata = {test_id: test.id, category_id: category_id}
        //var tdata = {test_id: test_id[0].id, category_id: category_id}
        //console.log(tdata)
        await handler.genInsert(tdata, "test_category")
        handler.Success(res, "Test added successfully") 
        return
    }else{
        handler.Error(res, "Unable to add test")
        return
    }


}
this.EditTest = async (req, res) => {

   
    var {
        idd, code,formula_1,formula_2,lower_bound_1,lower_bound_2,name,rate,report_type,summary, summary_2, summary_3, summary_4,tax_per,unit_1,unit_2,upper_band_1,upper_band_2,test_order,test_cat_id
    } = req.body
    //console.log(req.body)
    //var mdata = {}
    if(! code){

        handler.Error(res, "Test code is empty")
        return
    }
    if(code === ''){
        handler.Error(res, "Test code is empty")
        return
    }
    if(! name){
        handler.Error(res, "Test name is empty")
        return
    }
    if(! rate){
        rate = "0"
    }
    // check if code exist
    var tst_code =  await handler.bindRawQuery("select test_code, (select test_code from test where id = $idd) as ttcode from test x where  test_code = $code", {code: code, idd})
    //console.log("###########", tst_code.length)
    
    var mdata = {test_name: name, unit_1, unit_2, lower_limit_1: lower_bound_1, lower_limit_2: lower_bound_2, upper_limit_1: upper_band_1, upper_limit_2: upper_band_2, formula_1: formula_1, formula_2: formula_2, rate: rate, report_type: report_type, summary: summary, summary_2: summary_2, summary_3: summary_3, summary_4: summary_4, tax_per: tax_per}
    // console.log("Mdata", mdata)
    if(tst_code.length > 0){
   
        //mdata.test_code = code
        if(tst_code[0].ttcode != code){
            handler.Error(res, "Code already exist")
        return
        }
       
    }else{

        mdata["test_code"] = code
    }

    var test = await handler.genUpdate(mdata, "test", {id: idd})
    //var test = await handler.genUpdate(mdata, "test", {id: idd})

    if(test){
     
        handler.Success(res, "Updated successfully") 

        //: update the test order in the category of test
        await handler.genUpdate({test_order: test_order}, "test_category", {test_id: idd, category_id: test_cat_id})

        
    }else{
        handler.Error(res, "Unable to update test")
        return
    }


}
this.SaveCultureTest = async (req, res) => {
   // console.log(req.body)
    var test_cat_id = req.body["culture_test[test_cat_id]"]
    var code = req.body["culture_test[code]"]
    var name = req.body["culture_test[name]"]
    var rate = req.body["culture_test[rate]"]
    var custom = JSON.stringify(req.body)

    if(! code){
        handler.Error(res, "Test code is empty")
        return
    }
    if(! name){
        handler.Error(res, "Test name is empty")
        return
    }
    // check if code exist
    var tst_code =  await handler.bindRawQuery("select test_code from test where  lower(test_code) = $code", {code: code.toLowerCase()})
    if(tst_code.length > 0){
        handler.Error(res, "Test code already exist")
        return
    }
    
    var mdata = {test_code: code, test_name: name, custom: custom, report_type: "culture", rate: rate}
    
    var test = await handler.genInsert(mdata, "test")
    if(test){

        
       // var test_id = await handler.bindRawQuery("select id from test where test_code = $code", {code: test_code.toUpperCase()})
        // setup the test category
        var tdata = {test_id: test.id, category_id: test_cat_id}
       
        await handler.genInsert(tdata, "test_category")
        handler.Success(res, "Test added successfully") 
        return
    }else{
        handler.Error(res, "Unable to add test")
        return
    }


}
this.SavePredefinedTest = async (req, res) => {
   // console.log(req.body)
    var test_cat_id = req.body["predefined_test[test_cat_id]"]
    var code = req.body["predefined_test[code]"]
    var name = req.body["predefined_test[name]"]
    var rate = req.body["predefined_test[rate]"]
    var custom = JSON.stringify(req.body)

    if(! code){
        handler.Error(res, "Test code is empty")
        return
    }
    if(! name){
        handler.Error(res, "Test name is empty")
        return
    }
    // check if code exist
    var tst_code =  await handler.bindRawQuery("select test_code from test where  lower(test_code) = $code", {code: code.toLowerCase()})
    if(tst_code.length > 0){
        handler.Error(res, "Test code already exist")
        return
    }
    
    var mdata = {test_code: code, test_name: name, custom: custom, report_type: "predefined_test", rate: rate}
    
    var test = await handler.genInsert(mdata, "test")
    if(test){

        
       // var test_id = await handler.bindRawQuery("select id from test where test_code = $code", {code: test_code.toUpperCase()})
        // setup the test category
        var tdata = {test_id: test.id, category_id: test_cat_id}
       
        await handler.genInsert(tdata, "test_category")
        handler.Success(res, "Test added successfully") 
        return
    }else{
        handler.Error(res, "Unable to add test")
        return
    }


}
this.UpdatePredefinedTest = async (req, res) => {
     //console.log(req.body)
     var idd = req.body["predefined_test[idd]"]
     var code = req.body["predefined_test[code]"]
     var name = req.body["predefined_test[name]"]
     var rate = req.body["predefined_test[rate]"]
     var custom = JSON.stringify(req.body)
 
     if(! code){
         handler.Error(res, "Test code is empty")
         return
     }
     if(! name){
         handler.Error(res, "Test name is empty")
         return
     }
  
    // check if code exist
    var tst_code =  await handler.bindRawQuery("select test_code, (select test_code from test where id = $idd) as ttcode from test x where  test_code = $code", {code: code, idd})
    
    if(tst_code.length > 0){
   
        //mdata.test_code = code
        if(tst_code[0].ttcode != code){
            handler.Error(res, "Code already exist")
        return
        }


    }
     
     var mdata = {test_code: code, test_name: name, custom: custom, report_type: "predefined_test", rate: rate}
     
     var test = await handler.genUpdate(mdata, "test", {id: idd})
     if(test){
 
         handler.Success(res, "Test saved successfully") 
         return
     }else{
         handler.Error(res, "Unable to save test")
         return
     }
 
 
 }
 this.UpdateCultureTest = async (req, res) => {
    //console.log(req.body)
    var idd = req.body["culture_test[idd]"]
    var code = req.body["culture_test[code]"]
    var name = req.body["culture_test[name]"]
    var rate = req.body["culture_test[rate]"]
    var custom = JSON.stringify(req.body)

    if(! code){
        handler.Error(res, "Test code is empty")
        return
    }
    if(! name){
        handler.Error(res, "Test name is empty")
        return
    }
 
   // check if code exist
   var tst_code =  await handler.bindRawQuery("select test_code, (select test_code from test where id = $idd) as ttcode from test x where  test_code = $code", {code: code, idd})
   
   if(tst_code.length > 0){
  
       //mdata.test_code = code
       if(tst_code[0].ttcode != code){
           handler.Error(res, "Code already exist")
       return
       }


   }
    
    var mdata = {test_code: code, test_name: name, custom: custom, report_type: "culture", rate: rate}
    
    var test = await handler.genUpdate(mdata, "test", {id: idd})
    if(test){

        handler.Success(res, "Test saved successfully") 
        return
    }else{
        handler.Error(res, "Unable to save test")
        return
    }


}
this.ListProfile= async (req, res) => {

    var dresult = []
    var list_dept = await handler.bindRawQuery("select * from profile order by name asc limit 1000", {})
    for (let r of list_dept) {
        dresult.push([r.code, r.name, "<button params = '"+r.id+", preview-profile' func = 'TestMaster' class = \"my-btn click\"><i class = \"fa fa-edit \"></i></button>", "<button params = '"+r.id+", remove-profile' func = 'TestMaster'  class = \"my-btn click\"><i class = \"fa fa-times\"></i></button>", r.id])
    }

    res.json({
        data: dresult

    })

}
this.ListProfileDialog= async (req, res) => {

    var dresult = []
    var list_dept = await handler.bindRawQuery("select * from profile order by name asc limit 1000", {})
    for (let r of list_dept) {
        dresult.push([r.code, r.name, "<button params = '"+r.code+"' func = 'AddtestToDialog'  class = \"my-btn click\"><i class = \"fa fa-plus-circle\"></i></button>", r.id])
    }

    res.json({
        data: dresult

    })

}
this.ListTestProfile= async (req, res) => {
    var profile_id = req.body.id
    var dresult = []
    var list_pro = await handler.bindRawQuery("select *, (select test_name from test where id = x.test_id ) as name, (select test_code from test where id = x.test_id ) as code from test_profile x where profile_id = $profile_id order by test_order asc limit 1000", {profile_id: profile_id})
    for (let r of list_pro) {
        dresult.push([r.test_order, r.code, r.name,"<button params = '"+r.id+", remove-test-profile' func = 'TestMaster'  class = \"my-btn click\"><i class = \"fa fa-times\"></i></button>", "<button params = '"+r.id+", preview-test-profile' func = 'TestMaster' class = \"my-btn click\"><i class = \"fa fa-edit \"></i></button>", r.id])
    }

    res.json({
        data: dresult

    })

}

this.AddNewProfile = async (req, res) => {

    var {
        code,
        name,
        rate,
        summary
    } = req.body

    if (! code) {
        handler.Error(res, "Code is empty")
        return
    }
    if (! name) {
        handler.Error(res, "Profile name is empty")
        return
    }
  
    var is_code_ok = await handler.bindRawQuery("select code from profile where code = $code", {
        code: code
    })
    if (is_code_ok.length > 0) {

        handler.Error(res, "Code already exist")
        return
    }
    // add code name to database
    var add_code = await handler.genInsert({
        code: code,
        name: name,
        rate: rate,
        summary: summary
    }, "profile")

    if (add_code) {
        handler.Success(res, "Profile added")
        return
    } else {
        handler.Error(res, "Unable to add profile")
        return
    }

}
this.EditNewProfile = async (req, res) => {

    var {
        code,
        name,
        rate,
        idd,
        summary
    } = req.body
    console.log("#########", req.body)
    if(! code){
        handler.Error(res, "Profile code is empty")
        return
    }
    if(! name){
        handler.Error(res, "Profile name is empty")
        return
    }
 
   // check if code exist
   var tst_code =  await handler.bindRawQuery("select code from profile x where  code = $code", {code: code.toLowerCase()})
   
   if(tst_code.length > 0){
  
       //mdata.test_code = code
       if(tst_code[0].code != code){
           handler.Error(res, "Code already exist")
       return
       }


   }
    
    var mdata = {code: code, name: name, custom: summary, summary, rate: rate}
    
    var test = await handler.genUpdate(mdata, "profile", {id: idd})
    if(test){

        handler.Success(res, "Profile saved successfully") 
        return
    }else{
        handler.Error(res, "Unable to save profile")
        return
    }


}
this.RemoveProfile = async (req, res) => {

    var {
        id
    } = req.body
    var del = await handler.genDelete("profile", {
        id: id
    })
    
   
    if (del) {
        try{
            var del2 = await handler.genDelete("test_profile", {
                profile_id: id
            })
        }catch(ex){
            console.log("Error on deleting profile")
        }
        handler.Success(res, "Profile  deleted")
        return
    }

}
this.AddTestToProfile = async (req, res) => {

    var {
        test_id,
        profile_id,
        test_order
    } = req.body

    
    if (! test_id) {
        handler.Error(res, "Please select test")
        return
    }
    if (! profile_id) {
        handler.Error(res, "Please select profile")
        return
    }
    if(! test_order){
        test_order = 0
    }
    var rst = await handler.bindRawQuery("select id from test_profile where profile_id = $p and test_id = $t", {p: profile_id, t: test_id})
    if(rst.length > 0){
        handler.Error(res, "Test already exist")
        return
    }
    
    
    var add_code = await handler.genInsert({
        test_id: test_id,
        profile_id: profile_id,
        test_order: test_order

    }, "test_profile")

    if (add_code) {
        handler.Success(res, "Test added to profile")
        return
    } else {
        handler.Error(res, "Unable to add test")
        return
    }

}
this.RemoveTestFromProfile = async (req, res) => {

    var {
        id
    } = req.body
    var del = await handler.genDelete("test_profile", {
        id: id
    })
    
   
    if (del) {
        handler.Success(res, "Category  deleted")
        return
    }

}
