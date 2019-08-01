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
this.AddMaster = async (req, res) => {
    // master_name === table name
    var master_data = req.body
    //console.log("Test", req.body)
    if (! master_data.skips) {
        //handler.Error(res, "Skip is empty")
        //return
        master_data.skips = ""
    }
    if (! master_data.code) {
        handler.Error(res, "Code is empty")
        return
    }
    if (! master_data.name) {
        handler.Error(res, "Name is empty")
        return
    }
    // make sure code is ok 
    var is_code_ok = await handler.bindRawQuery("select code from "+master_data.master_name+" where code = $code collate nocase", {
        code: master_data.code })
    if (is_code_ok.length > 0) {

        handler.Error(res, "Code already exist")
        return
    }
    // add code name to database
    var f_obj  = this.Skip(master_data, master_data.skips)
    //console.log("Final", f_obj)
    var add_master = await handler.genInsert(f_obj, master_data.master_name)

    if (add_master) {
        handler.Success(res, "Added successfully")
        return
    } else {
        handler.Error(res, "Unable to add master data")
        return
    }

}
this.ListPatientMaster = async (req, res) => {
    var {id} = req.body
 
    var list_master = await handler.bindRawQuery("select * from patient_master where id = $id", {id: id})
    console.log(list_master[0])
    res.json(list_master[0])

}
this.ListMasterByID = async (req, res) => {

    var {id, master_name} = req.body 
    var list_master = await handler.bindRawQuery("select * from "+master_name+" where id = $id", {id: id})
   // console.log("##########",list_master[0])
    res.json(list_master[0])
    

}
this.ListRefRanges = async (req, res) => {

    var {test_id} = req.body 
    var list_master = await handler.bindRawQuery("select id, test_id, unit_1, unit_2, lower_limit_1 as lb_1, lower_limit_2 as lb_2, upper_limit_1 as up_1, upper_limit_2 as up_2, sex, date_type, from_age, to_age, formula_1, formula_2  from ref_ranges where test_id = $test_id", {test_id})
    for(var ii in list_master){
        list_master[ii]["from"] = list_master[ii]["from_age"]
        list_master[ii]["to"] = list_master[ii]["to_age"]
        list_master[ii]["out_1"] = list_master[ii]["formula_1"]
        list_master[ii]["out_2"] = list_master[ii]["formula_2"]
    }
   
    res.json(list_master)
    

}
this.ListTestByCode = async (req, res) => {

    var {code} = req.body 
    var list_test = await handler.bindRawQuery("select *, test_name as name, test_code as code from test where test_code = $code collate nocase", {code: code})
    if(list_test.length === 1){
        list_test[0].test_type = "test"
        res.json(list_test)
        return
    }

    if(list_test.length !== 1){ 

        //: try profile
        var list_profile = await handler.bindRawQuery("select * from profile where code = $code collate nocase", {code: code})
        if(list_profile.length === 1){
            list_profile[0].test_type = "profile"
            res.json(list_profile)
            return
        }

    }
    
  
        res.json([])
    
    

}

this.ListMasterByCode = async (req, res) => {

    var {code, master_name} = req.body 
    var list_master = await handler.bindRawQuery("select * from "+master_name+" where code = $code collate nocase", {code: code})
    
    res.json(list_master)
    

}
this.ListMaster = async (req, res) => {
    var {master_name} = req.body
    var dresult = []
    var list_master = await handler.bindRawQuery("select * from "+master_name+" order by name asc limit 1000", {})
    for (let r of list_master) {
        dresult.push([r.code, r.name, r.group, "<button params = '"+r.id+", edit_master, "+master_name+", "+req.body.master_dialog+"'  func = 'EditMaster' class = \"my-btn click\"><i class = \"fa fa-edit \"></i></button>", "<button params = '"+r.id+", "+master_name+"'  func = 'DeleteMaster' class = \"my-btn click\"><i class = \"fa fa-times \"></i></button>"])
    }

    res.json({
        data: dresult

    })

}
this.EditMaster = async (req, res) => {
    var  master_data  = req.body
    var f_obj  = this.Skip(master_data, master_data.skips)

    await handler.genUpdate(f_obj, master_data.master_name, {id: master_data.id})
    handler.Success(res, "Update successfully")
    return

}
this.DeleteMaster = async (req, res) => {
    
    var {
        id, master_name
    } = req.body
    var del = await handler.genDelete(master_name, {
        id: id
    })
    if (del) {
        handler.Success(res, "Master data deleted")
        return
    }


}
this.AddStaffMaster = async (req, res) => {
    // master_name === table name
    var master_data = req.body
    var dob2 = master_data.dob
    master_data.dob = handler.DateTime(master_data.dob)

    master_data.age = handler.Age(dob2)
    //console.log( master_data.dob)
    //console.log("Test", req.body)
    if (! master_data.skips) {
        //handler.Error(res, "Skip is empty")
        //return
        master_data.skips = ""
    }
    if (! master_data.code) {
        handler.Error(res, "Code is empty")
        return
    }
    if (! master_data.first_name) {
        handler.Error(res, "First name is empty")
        return
    }
    // make sure code is ok 
    var is_code_ok = await handler.bindRawQuery("select code from "+master_data.master_name+" where code = $code collate nocase", {
        code: master_data.code })
    if (is_code_ok.length > 0) {

        handler.Error(res, "Code already exist")
        return
    }
    // add code name to database
    var f_obj  = this.Skip(master_data, master_data.skips)
    console.log("Final", f_obj)
    var add_master = await handler.genInsert(f_obj, master_data.master_name)

    if (add_master) {
        handler.Success(res, "Added successfully")
        return
    } else {
        handler.Error(res, "Unable to add master data")
        return
    }

}
this.AddCenterMaster = async (req, res) => {
    // master_name === table name
    var master_data = req.body
   // master_data.dob = handler.DateTime(master_data.dob)
  //  master_data.age = handler.Age(master_data.dob)
    //console.log("??????????????", master_data)
    //console.log("Test", req.body)
    if (! master_data.skips) {
        //handler.Error(res, "Skip is empty")
        //return
        master_data.skips = ""
    }
    if (! master_data.code) {
        handler.Error(res, "Code is empty")
        return
    }
    if (! master_data.name) {
        handler.Error(res, "Name is empty")
        return
    }
    // make sure code is ok 
    var is_code_ok = await handler.bindRawQuery("select code from center_master where code = $code collate nocase", {
        code: master_data.code })
    if (is_code_ok.length > 0) {

        handler.Error(res, "Code already exist")
        return
    }
    // add code name to database
    var f_obj  = this.Skip(master_data, master_data.skips)
    console.log("Final", f_obj)
    var add_master = await handler.genInsert(f_obj, "center_master")

    if (add_master) {
        handler.Success(res, "Added successfully")
        return
    } else {
        handler.Error(res, "Unable to add master data")
        return
    }

}

this.ListStaffMaster = async (req, res) => {
    var {master_name} = req.body
    var dresult = []
    var list_master = await handler.bindRawQuery("select * from "+master_name+" order by last_name asc", {})
    for (let r of list_master) {
        dresult.push([r.code, r.password, r.title, r.first_name, r.last_name, r.sex, r.dob, r.age, r.phone, r.email, r.marital_status, r.nationality, r.religion, r.office_location,  "<button params = '"+r.id+", edit_master, "+master_name+", "+req.body.master_dialog+"'  func = 'EditMaster' class = \"my-btn click\"><i class = \"fa fa-edit \"></i></button>", "<button params = '"+r.id+", "+master_name+"'  func = 'DeleteMaster' class = \"my-btn click\"><i class = \"fa fa-times \"></i></button>"])
    }

    res.json({
        data: dresult 

    })

}
this.ListRefCenterMaster = async (req, res) => {
    var {master_name} = req.body
    var dresult = []
    var list_master = await handler.bindRawQuery("select * from "+master_name+" order by name asc", {})
    for (let r of list_master) {
        dresult.push([r.code, r.name, r.contact_person, r.primary_specialty, r.other_specialty, r.mobile_no, r.office_no, r.email, r.director_name, r.address, r.region, r.lga, r.discount, r.cut, "<button class = \"my-btn click\" params = '"+r.id+", center_master' func = 'AddToAcceptTest'><i class = \"fa fa-plus\"></i></button>",  "<button params = '"+r.id+", edit_master, "+master_name+", "+req.body.master_dialog+"'  func = 'EditMaster' class = \"my-btn click\"><i class = \"fa fa-edit \"></i></button>", "<button params = '"+r.id+", "+master_name+"'  func = 'DeleteMaster' class = \"my-btn click\"><i class = \"fa fa-times \"></i></button>"])
    }

    res.json({
        data: dresult 

    })

}
this.AddRefPersonMaster = async (req, res) => {
    // master_name === table name
    var master_data = req.body
    master_data.dob = handler.DateTime(master_data.dob)
  //  master_data.age = handler.Age(master_data.dob)
    //console.log( master_data.dob)
    //console.log("Test", req.body)
    if (! master_data.skips) {
        //handler.Error(res, "Skip is empty")
        //return
        master_data.skips = ""
    }
    if (! master_data.code) {
        handler.Error(res, "Code is empty")
        return
    }
    if (! master_data.first_name) {
        handler.Error(res, "First Name is empty")
        return
    }
    // make sure code is ok 
    var is_code_ok = await handler.bindRawQuery("select code from person_master where code = $code collate nocase", {
        code: master_data.code })
    if (is_code_ok.length > 0) {

        handler.Error(res, "Code already exist")
        return
    }
    // add code name to database
    var f_obj  = this.Skip(master_data, master_data.skips)
    console.log("Final", f_obj)
    var add_master = await handler.genInsert(f_obj, "person_master")

    if (add_master) {
        handler.Success(res, "Added successfully")
        return
    } else {
        handler.Error(res, "Unable to add master data")
        return
    }

}
this.ListRefPersonMaster = async (req, res) => {
    var {master_name} = req.body
    var dresult = []
    var list_master = await handler.bindRawQuery("select * from "+master_name+" order by last_name asc", {})
    for (let r of list_master) {
        dresult.push([r.code, r.title, r.first_name, r.last_name, r.sex, r.dob, r.phone_no, r.email, r.marital_status, r.religion, r.nationality, r.state, r.designation, r.primary_specialty, r.sub_specialty, "<button class = \"my-btn click\" params = '"+r.id+", person_master' func = 'AddToAcceptTest'><i class = \"fa fa-plus\"></i></button>", "<button params = '"+r.id+", edit_master, "+master_name+", "+req.body.master_dialog+"'  func = 'EditMaster' class = \"my-btn click\"><i class = \"fa fa-edit \"></i></button>", "<button params = '"+r.id+", "+master_name+"'  func = 'DeleteMaster' class = \"my-btn click\"><i class = \"fa fa-times \"></i></button>"])
    }

    res.json({
        data: dresult 

    })

}

this.AddGuardianMaster = async (req, res) => {
    // master_name === table name
    var master_data = req.body
    master_data.dob = handler.DateTime(master_data.dob)
  
    if (! master_data.skips) {
        
        master_data.skips = ""
    }
    if (! master_data.code) {
        handler.Error(res, "Code is empty")
        return
    }
    if (! master_data.first_name) {
        handler.Error(res, "First Name is empty")
        return
    }
    // make sure code is ok 
    var is_code_ok = await handler.bindRawQuery("select code from guardian_master where code = $code collate nocase", {
        code: master_data.code })
    if (is_code_ok.length > 0) { 

        handler.Error(res, "Code already exist")
        return
    }
    // add code name to database
    var f_obj  = this.Skip(master_data, master_data.skips)
    console.log("Final", f_obj)
    var add_master = await handler.genInsert(f_obj, "guardian_master")

    if (add_master) {
        handler.Success(res, "Added successfully")
        return
    } else {
        handler.Error(res, "Unable to add master data")
        return
    }

}
this.ListGuardianMaster = async (req, res) => {
    var {master_name} = req.body
    var dresult = []
    var list_master = await handler.bindRawQuery("select * from "+master_name+" order by last_name asc", {})
    for (let r of list_master) {
        dresult.push([r.code, r.title, r.first_name, r.last_name, r.sex, r.dob, r.age, r.phone_no, r.email, r.marital_status, r.religion, r.nationality, r.state, r.discount, "<button class = \"my-btn click\" params = '"+r.id+", guardian_master' func = 'AddToAcceptTest'><i class = \"fa fa-plus\"></i></button>", "<button params = '"+r.id+", edit_master, "+master_name+", "+req.body.master_dialog+"'  func = 'EditMaster' class = \"my-btn click\"><i class = \"fa fa-edit \"></i></button>","<button params = '"+r.id+", "+master_name+"'  func = 'DeleteMaster' class = \"my-btn click\"><i class = \"fa fa-times \"></i></button>"])
    }

    res.json({
        data: dresult 

    })

}
//! - - - - - - - - - -- - - - - - -ACCEPT TEST
this.AcceptTest = async (req, res) => {
    
    //console.log(req.user)
    // master_name === table name
    var master_data = req.body
    var {lab_no, patient_info, ref_code_center, ref_code_guardian, ref_code_center, amount_paid, clinical_info, amount_paid, balance, concession, home_collection, net_amount, paid, paid_type, pay_channel, pay_type, receipt_number, tax_amount, test_amount, ref_code_person, master_raw, booking_id} = master_data
    //console.log("##########", master_raw)
    if(! lab_no){
        handler.Error(res, "Lab no. is empty")
        return
    }
    if(! patient_info){
        handler.Error(res, "Please select a patient")
        return
    }
    //: make sure test is selected
    var obj = "test_info"
    var obj_cnt = 10
    var key = "type"
    var process_body = handler.GetJsonKey(master_data, obj, obj_cnt, key)
    if(process_body.length < 1){
        handler.Error(res, "Please select a test")
        return
    }
    if(amount_paid < 1){
        handler.Error(res, "Please enter amount paid")
        return
    }
    //: IF NOT IN EDITING MODE
    if(! booking_id){
        var is_lb = await handler.bindRawQuery("select lab_no from accepted_tests where lab_no = $l", {l: lab_no})
    if(is_lb.length > 0){
        handler.Error(res, "Lab No. already exist")
        return
    }
    }
    
    // var is_pcode = await handler.bindRawQuery("select code from patient_master where code = $pcode", {pcode: patient_info})
    // if(is_pcode.length > 0){
    //     handler.Error(res, "Patient No. already exist")
    //     return
    // }


    var data = {user_id: handler.getUser(req), lab_no: lab_no, test_raw: JSON.stringify(master_data), patient_id: patient_info, ref_center_id: ref_code_center, ref_person_id: ref_code_person, ref_guardian_id: ref_code_guardian, clinical_info, balance, concession, home_collection, net_amount, paid, paid_type, pay_channel, pay_type, receipt_number, tax_amount, test_amount, master_raw }

    if(! booking_id){

        var is_test = await handler.genInsert(data, "accepted_tests")
        if(is_test){
            //: setup the tests to be performed
            var accepted_test_id = is_test.id
            
            // extract tests
            var key_len = 10
            var list_test = handler.NormalizeArray(JSON.parse(data.test_raw), "test_info", ["test_id", "test_name", "type"], key_len) 
            
            for(var i in list_test){
                var dept_idx = await handler.GetDepartmentIdbyTestId(list_test[i].test_id) // stored in data column
                await handler.genInsert({accepted_test_id: accepted_test_id, test_id: list_test[i].test_id, status_approve: "no", status_partial: "no", status_full: "no", status: "unapproved", test_type: list_test[i].type, data: dept_idx}, "perform_tests")
            }
            handler.Success(res, "Test accepted")
          
        }else{
            handler.Error(res, "Unable to accept test")
        }


    }else{
        var accepted_test_id = booking_id
             
        // extract tests
        var key_len = 10
        var list_test = handler.NormalizeArray(JSON.parse(data.test_raw), "test_info", ["test_id", "test_name", "type"], key_len) 
        await handler.genDelete("perform_tests", {accepted_test_id})
        
        for(var i in list_test){
            var dept_idx = await handler.GetDepartmentIdbyTestId(list_test[i].test_id) // stored in data column
            await handler.genInsert({accepted_test_id: accepted_test_id, test_id: list_test[i].test_id, status_approve: "no", status_partial: "no", status_full: "no", status: "unapproved", test_type: list_test[i].type, data: dept_idx}, "perform_tests")
        }
        
        await handler.genUpdate(data, "accepted_tests", {id: booking_id})
        handler.Success(res, "Changes saved.")

    }


}
this.ListBookingByID = async (req, res) => {
    var {accepted_test_id} = req.body
    //today = "20"+today
    //console.log("########################", today)
    
    var list_master = await handler.bindRawQuery("select master_raw from accepted_tests where id = $accepted_test_id", {accepted_test_id: accepted_test_id})
   
    res.json(list_master[0].master_raw)

}
this.ListTodaySerial = async (req, res) => {
    var {today} = req.body
    today = "20"+today
    //console.log("########################", today)
    
    var list_master = await handler.bindRawQuery("select count(1) as cnt from accepted_tests where strftime('%Y%m%d', date(created_at)) = $today", {today: today})
    var ccnt = list_master[0].cnt + 1
    if(ccnt < 10){
        ccnt = "0"+ccnt
    }
    res.json({sno: ccnt})

}
this.ListAcceptedTests = async (req, res) => {
   // var {master_name} = req.body
   console.log("-----", req.body)
    var dresult = []

    var list_master = await handler.bindRawQuery("select *, strftime('%d-%m-%Y %H:%S', created_at) as date, (select sex from patient_master where code = x.patient_id) as sex, (select age from patient_master where code = x.patient_id) as age  from accepted_tests x order by id desc limit 1000", {})
    
    // SORTING BY DATE IF TRIGGERED
    if(req.body.from_data && req.body.to_data){

        list_master = await handler.bindRawQuery("select *, strftime('%d-%m-%Y %H:%S', created_at) as date, (select sex from patient_master where code = x.patient_id) as sex, (select age from patient_master where code = x.patient_id) as age  from accepted_tests x where created_at between '"+req.body.from_data+"' and '"+req.body.to_data+"' order by id desc limit 1000", {})
    }
    for (let r of list_master) {

        var all_test_raw = JSON.parse(r.test_raw)        
        var mtests = handler.NormalizeArray(all_test_raw, "test_info", ["code", "test_id", "test_name"], 10)
        var save_info = "<div>"
        for(var ii in mtests){
            save_info += "<span class ='badge'>"+mtests[ii].test_name+" <b>("+mtests[ii].code+")</b>"+"</span>"
        }
        save_info += "</div>"
        r.code = save_info  
        r.age = handler.ProcessAge(r.age)
        dresult.push([r.date, r.lab_no, r.patient_id, r.sex, r.age, r.code, "<button func = 'SendMessage' params = '"+r.id+",accept_test' class = 'btn btn-sm btn-primary click'><i class = 'fa fa-envelope'></i></button>", "<button func = 'PrintReceipt' params = '"+r.id+",accept_test' class = 'btn btn-sm btn-primary click'><i class = 'fa fa-print'></i></button>", "<button params = '"+r.id+"'  func = 'EditAcceptedTest' class = \"my-btn click\"><i class = \"fa fa-edit \"></i></button>"])
       // dresult.push([r.date, r.lab_no, r.patient_id, r.sex, r.age, r.code, "<button class = 'btn btn-sm btn-primary'><i class = 'fa fa-envelope'></i></button>", "<button class = 'btn btn-sm btn-primary'><i class = 'fa fa-print'></i></button>", "<button params = '"+r.id+"'  func = 'EditAcceptedTest' class = \"my-btn click\"><i class = \"fa fa-edit \"></i></button>", "<button params = '"+r.id+", accepted_tests'  func = 'DeleteMaster' class = \"my-btn click\"><i class = \"fa fa-times \"></i></button>"])


    }
   
    res.json({
        data: dresult

    })

}
this.ListAcceptedTestsFull_2 = async (req, res) => {
    //var {master_name} = req.body
    var dresult = []
    var list_master = await handler.bindRawQuery("select *, x.accepted_test_id as acc_id, ( select test_raw from accepted_tests where lab_no = (select lab_no from accepted_tests where id = x.accepted_test_id ) ) as test_raw, strftime('%d-%m-%Y %H:%S', x.created_at) as date, ( select lab_no from accepted_tests where id = x.accepted_test_id) as lab_no, ('Male') as sex, ( ( select ref_center_id from accepted_tests where id = x.accepted_test_id   ) || '<br>' || ( select ref_person_id from accepted_tests where id = x.accepted_test_id   ) ||  '<br>' || ( select ref_guardian_id from accepted_tests where id = x.accepted_test_id   ) ) as ref, ('dhdhd, djdjdj') as code, (select sex from patient_master where code = ( select patient_id from accepted_tests where id = x.accepted_test_id  ) ) as sex, (select age from patient_master where code = ( select patient_id from accepted_tests where id = x.accepted_test_id  ) ) as age, x.status_approve as is_approved from perform_tests x inner join test_category y on x.test_id = y.test_id where x.status_full = 'yes' group by x.accepted_test_id order by x.id desc")
    
    for (var r of list_master) {
        var all_test_raw = JSON.parse(r.test_raw)        
        var mtests = handler.NormalizeArray(all_test_raw, "test_info", ["code", "test_id", "test_name"], 10)
        var save_info = "<div>"
        for(var ii in mtests){
            save_info += "<span class ='badge'>"+mtests[ii].test_name+" <b>("+mtests[ii].code+")</b>"+"</span>"
        }
        save_info += "</div>"
        r.code = save_info

        //dresult.push([r.date, r.lab_no, r.sex, '<a class = "pop" href="#"  data-title="Age" data-content="'+r.age+'" data-placement="right"><i class = "fa fa-history"> view</a>', '<a class = "pop" href="#"  data-title="Referred By" data-content="'+r.ref+'" data-placement="right"><i class = "fa fa-history"> view</a>', '<a class = "pop" href="#"  data-title="Tests" data-content="'+r.code+'" data-placement="right"><i class = "fa fa-history"> view</a>', "<button params = '"+r.acc_id+"'  func = 'PerformTest' class = \"my-btn click\"><i class = \"fa fa-history \">Perform</i></button>", "Performed <input style = 'width: 20px; height: 20px; display: block;' type = 'checkbox' />"])
        r.age = handler.ProcessAge(r.age)
        dresult.push([r.date, r.lab_no, r.sex, r.age, r.ref, r.code, "<button is_approved = '"+r.is_approved+"' params = '"+r.lab_no+"'  func = 'PerformTest' class = \"app-btn bg-blue click\">perform</button>", "<button params = '"+r.acc_id+",approve_test'  func = 'SendMessage' class = \"app-btn bg-blue click\"><i class = 'fa fa-envelope'></button>"])
    }
    

    res.json({
        data: dresult

    })

}
this.ListAcceptedTestsUnpartial = async (req, res) => {
    //var {master_name} = req.body
    var dresult = []
    var list_master = await handler.bindRawQuery("select *, x.accepted_test_id as acc_id, ( select test_raw from accepted_tests where lab_no = (select lab_no from accepted_tests where id = x.accepted_test_id ) ) as test_raw, strftime('%d-%m-%Y %H:%S', x.created_at) as date, ( select lab_no from accepted_tests where id = x.accepted_test_id) as lab_no, ('Male') as sex, ( ( select ref_center_id from accepted_tests where id = x.accepted_test_id   ) || '<br>' || ( select ref_person_id from accepted_tests where id = x.accepted_test_id   ) ||  '<br>' || ( select ref_guardian_id from accepted_tests where id = x.accepted_test_id   ) ) as ref, ('dhdhd, djdjdj') as code, (select sex from patient_master where code = ( select patient_id from accepted_tests where id = x.accepted_test_id  ) ) as sex, (select age from patient_master where code = ( select patient_id from accepted_tests where id = x.accepted_test_id  ) ) as age, x.status_approve as is_approved from perform_tests x inner join test_category y on x.test_id = y.test_id where 1 group by x.accepted_test_id order by x.id desc")
    
    for (var r of list_master) {
        var all_test_raw = JSON.parse(r.test_raw)        
        var mtests = handler.NormalizeArray(all_test_raw, "test_info", ["code", "test_id", "test_name"], 10)
        var save_info = "<div>"
        for(var ii in mtests){
            save_info += "<span class ='badge'>"+mtests[ii].test_name+" <b>("+mtests[ii].code+")</b>"+"</span>"
        }
        save_info += "</div>"
        r.code = save_info

        //dresult.push([r.date, r.lab_no, r.sex, '<a class = "pop" href="#"  data-title="Age" data-content="'+r.age+'" data-placement="right"><i class = "fa fa-history"> view</a>', '<a class = "pop" href="#"  data-title="Referred By" data-content="'+r.ref+'" data-placement="right"><i class = "fa fa-history"> view</a>', '<a class = "pop" href="#"  data-title="Tests" data-content="'+r.code+'" data-placement="right"><i class = "fa fa-history"> view</a>', "<button params = '"+r.acc_id+"'  func = 'PerformTest' class = \"my-btn click\"><i class = \"fa fa-history \">Perform</i></button>", "Performed <input style = 'width: 20px; height: 20px; display: block;' type = 'checkbox' />"])
        r.age = handler.ProcessAge(r.age)
        dresult.push([r.date, r.lab_no, r.sex, r.age, r.ref, r.code, "<button is_approved = '"+r.is_approved+"' params = '"+r.lab_no+"'  func = 'PerformTest' class = \"app-btn bg-blue click\">perform</button>", "<button params = '"+r.acc_id+",approve_test'  func = 'SendMessage' class = \"app-btn bg-blue click\"><i class = 'fa fa-envelope'></button>"])
    }
    

    res.json({
        data: dresult

    })

}

this.SortDepartment = async (req, res) => {
    
    var {dept_id} = req.body
    dept_id = dept_id.trim()
  // console.log("######### "+ dept_id)
    var dresult = []
    //: get the tests that are in a department
    var list_master = await handler.bindRawQuery("select *, ( select test_raw from accepted_tests where lab_no = (select lab_no from accepted_tests where id = x.accepted_test_id ) ) as test_raw, strftime('%d-%m-%Y %H:%S', x.created_at) as date, ( select lab_no from accepted_tests where id = x.accepted_test_id) as lab_no, ('Male') as sex, ( ( select ref_center_id from accepted_tests where id = x.accepted_test_id   ) || '<br>' || ( select ref_person_id from accepted_tests where id = x.accepted_test_id   ) ||  '<br>' || ( select ref_guardian_id from accepted_tests where id = x.accepted_test_id   ) ) as ref, ('dhdhd, djdjdj') as code, (select sex from patient_master where code = ( select patient_id from accepted_tests where id = x.accepted_test_id  ) ) as sex, (select age from patient_master where code = ( select patient_id from accepted_tests where id = x.accepted_test_id  ) ) as age, x.status_approve as is_approved from perform_tests x inner join test_category y on x.test_id = y.test_id where x.data = $dept_id group by x.accepted_test_id order by x.id desc", {dept_id: dept_id})

    for (var r of list_master) {
        var all_test_raw = JSON.parse(r.test_raw)        
        var mtests = handler.NormalizeArray(all_test_raw, "test_info", ["code", "test_id", "test_name"], 10)
        var save_info = "<div>"
        for(var ii in mtests){
            save_info += "<span class ='badge'>"+mtests[ii].test_name+" <b>("+mtests[ii].code+")</b>"+"</span>"
        }
        save_info += "</div>"
        r.code = save_info

        //dresult.push([r.date, r.lab_no, r.sex, '<a class = "pop" href="#"  data-title="Age" data-content="'+r.age+'" data-placement="right"><i class = "fa fa-history"> view</a>', '<a class = "pop" href="#"  data-title="Referred By" data-content="'+r.ref+'" data-placement="right"><i class = "fa fa-history"> view</a>', '<a class = "pop" href="#"  data-title="Tests" data-content="'+r.code+'" data-placement="right"><i class = "fa fa-history"> view</a>', "<button params = '"+r.acc_id+"'  func = 'PerformTest' class = \"my-btn click\"><i class = \"fa fa-history \">Perform</i></button>", "Performed <input style = 'width: 20px; height: 20px; display: block;' type = 'checkbox' />"])
        r.age = handler.ProcessAge(r.age)
        dresult.push([r.date, r.lab_no, r.sex, r.age, r.ref, r.code, "<button is_approved = '"+r.is_approved+"' params = '"+r.lab_no+"'  func = 'PerformTest' class = \"app-btn bg-blue click\">perform</button>", "<button params = '"+r.acc_id+",approve_test'  func = 'SendMessage' class = \"app-btn bg-blue click\"><i class = 'fa fa-envelope'></button>"])
    }

    res.json({
        data: dresult

    })
    

}
this.ListAcceptedTestsFull = async (req, res) => {
    //var {master_name} = req.body
    // var dresult = []
    // var list_master = await handler.bindRawQuery("select strftime('%d-%m-%Y %H:%S', created_at) as date, (select lab_no from accepted_tests where id = x.accepted_test_id) as lab_no, (select sex from patient_master where code = ( select patient_id from accepted_tests where id = x.accepted_test_id  ) ) as sex, ( select age from patient_master where code = ( select patient_id from accepted_tests where id = x.accepted_test_id  ) ) as age, ('ref') as referred_by, ('codes') as test_codes from perform_tests x where status != 'approved'", {})
    // for (let r of list_master) {
    //     dresult.push([r.date, r.lab_no, r.sex, r.age, r.code, "<button params = '"+r.id+"'  func = 'PerformTest' class = \"my-btn click\"><i class = \"fa fa-history \">Perform</i></button>", "<button params = '"+r.id+", accepted_tests'  func = 'DeleteMaster' class = \"my-btn click\"><i class = \"fa fa-times \"></i></button>"])
    // }

    // res.json({
    //     data: dresult

    // })

}
this.GetTestsToPerform = async (req, res) => {
    var {lab_no} = req.body

    //console.log("####", lab_no)
    var get_data = await handler.bindRawQuery("select *, id, test_id, test_type, accepted_test_id, (select patient_id from accepted_tests where lab_no = $labno) as patient_id  from perform_tests where accepted_test_id = (select id from accepted_tests where lab_no = $labno)", {labno: lab_no})

    // var test_category = {

    //     show: false, category_name: "Biochemistry",
    //     tests: [{name: "Full Blood Count", value_1: "", value_2: "", unit_1: "kg", unit_2: "kilo", range_1_1: "1", range_2_1: "4", range_1_2: "1.3", range_2_2: "4.2", prev_result_1: "", prev_result_2: "" }]				
    
    // }

    //console.log("####", get_data)

    var get_tests = await handler.GroupCategory(get_data)
    res.json(get_tests)



}
this.SavePerformedTest = async (req, res) => {

    var {accepted_test_id, data} = req.body
    //data = "fufufu!hg"

    //console.log(req.body)

    var is_i = await handler.bindRawQuery("select id from saved_tests where accepted_test_id = $acc", {acc: accepted_test_id})
   
    if(is_i.length < 1){

        await handler.genInsert({data: data, accepted_test_id: accepted_test_id}, "saved_tests")

        await handler.Success(res, "Saved successfully")

    }else{

        await handler.genUpdate({data: data}, "saved_tests", {accepted_test_id: accepted_test_id})
        handler.Success(res, "Saved successfully")    
    
    } 
    //handler.Success(res, "Saved successfully")   
}
this.LoadSavePerformedTest = async (req, res) => {

    var {accepted_test_id} = req.body

    var is_i = await handler.bindRawQuery("select * from saved_tests where accepted_test_id = $acc", {acc: accepted_test_id})

    res.json(is_i)
    
}

this.AddNewReferenceRange = async (req, res) => {

    console.log("##########", req.body)
    var keys =  Object.keys(req.body)
    //console.log(keys)
    var rst = []
    for(var i = 0; i < req.body.len; i++){

        //: process
        var f_obj = {}

         f_obj["sex"] = req.body["em_"+i+"[sex]"]     
         f_obj["date_type"] = req.body["em_"+i+"[date_type]"]     
         f_obj["from_age"] = req.body["em_"+i+"[from]"]     
         f_obj["to_age"] = req.body["em_"+i+"[to]"]     
         f_obj["unit_1"] = req.body["em_"+i+"[unit_1]"]     
         f_obj["unit_2"] = req.body["em_"+i+"[unit_2]"]     
         f_obj["lower_limit_1"] = req.body["em_"+i+"[lb_1]"]     
         f_obj["lower_limit_2"] = req.body["em_"+i+"[lb_2]"]     
         f_obj["upper_limit_1"] = req.body["em_"+i+"[up_1]"]     
         f_obj["upper_limit_2"] = req.body["em_"+i+"[up_2]"]     
         f_obj["formula_1"] = req.body["em_"+i+"[out_1]"]     
         f_obj["formula_2"] = req.body["em_"+i+"[out_2]"]     
         f_obj["test_id"] = req.body["test_id"]     
              
 
        rst.push(f_obj) 
    }
    for(var i in rst){
        var {from_age, to_age, sex, test_id} = rst[i]
        console.log(rst[i])
        if(! from_age)
        from_age = ""
        if(! to_age)
        to_age = ""
        if(! sex)
        sex = ""

        //console.log(rst[i])
        var is_i = await handler.bindRawQuery("select id from ref_ranges where (test_id = $test_id and sex = $sex and from_age = $from and to_age = $to)", {from: from_age, to: to_age, sex: sex, test_id: test_id})
        if(is_i.length < 1)
        await handler.genInsert(rst[i], "ref_ranges")
        else{
            console.log("##", is_i.length)
            await handler.genUpdate(f_obj, "ref_ranges", {id: req.body["main_id"]})
        }
    }
   
    handler.Success(res, "Added successfully")

}
this.ListSettings = async (req, res) => {

   
        var is_i = await handler.bindRawQuery("select * from settings", {})
        res.json(is_i)
        

}
this.AddSettings = async (req, res) => {
        
        var valx =  JSON.stringify(req.body)
        var is_exist = await handler.bindRawQuery("select type from settings where type = $type", {type: req.body.type})
       
        if(is_exist.length < 1)
        await handler.genInsert({type: req.body.type, value: valx}, "settings")
        else{
            // run update
            await handler.genUpdate({value: valx}, "settings", {type: req.body.type})
        }
        handler.Success(res, "Settings updated successfully")
        

}
this.ChooseDepartment = async (req, res) => {

   
        var is_i = await handler.bindRawQuery("select * from department", {})
        res.json(is_i)
        

}
this.ResultWriter = async (req, res) => {

        var {file_name, content} = req.body
        var html_header = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Test Result</title><link rel="stylesheet" href = "../css/bootstrap.css" /><link rel="stylesheet" href = "../css/style.css" /><link rel="stylesheet" href = "../css/printing.css" /></head><body><div class = "wrapperx" style = "margin: 0 auto; width: 80%">'
        //html_header += '<div><img src = "../img/logo.png" width = "30%" class = "pull-right" /></div><div class="clearfix"></div>'
        content = html_header+ content+'</div><script>window.print()</script></body></html>'
        const path = require("path")
        var path_dir = path.join(__dirname, "..", "public", "printing", file_name+".html")
        await handler.createFile(path_dir, content)
        await this.PDFWriter(handler.GetPrintingHost(), res)
        //handler.Success(res, "Ready for printing")

}
this.PDFWriter = async (url, res) => {
    const path = require("path")
    const puppeteer = require('puppeteer');
 
    (async () => {
      var path_dir = path.join(__dirname, "..", "public", "printing", "print-result.pdf")
      var path_dir_x = path.join(__dirname, "..", "public", "printing", "print-result-x.pdf")
      if(handler.fileExists(path_dir)){
         await handler.deleteFile(path_dir)
        
      }
      if(handler.fileExists(path_dir_x)){
         await handler.deleteFile(path_dir_x)
        
      }
      const browser = await puppeteer.launch({headless: true});
      const page = await browser.newPage();
      
      
      await page.goto(url, {waitUntil: 'networkidle2'});
      await page.pdf({
          path: path_dir, 
          format: 'A4',
          printBackground:true
        });
     
      await browser.close();
      //: add page number to the generated pdf using hummus
      handler.ModifyPDF(path_dir, path_dir_x)
      handler.Success(res, "Saved to PDF")
    })();


}


this.GetPatientInfo = async (req, res) => {
    var {
        accepted_test_id
    } = req.body
    const info = await handler.bindRawQuery("select lab_no as no, strftime('%d/%m/%Y', created_at) as date, clinical_info, (select sex from patient_master where code = x.patient_id collate nocase) as sex, (select last_name || ' ' || first_name from patient_master where code = x.patient_id collate nocase) as name, (select age from patient_master where code = x.patient_id collate nocase) as age, (select ref_center_id || ' ' || ref_person_id from patient_master where code = x.patient_id collate nocase) as referred_by, (select value from settings where type = 'business') as business from accepted_tests x  where x.id = $id", {
        id: accepted_test_id
    })
    //no: "GRA-PH-001", name: "Emma", sex: "F", age: "200yrs", referred_by: "Chika Wabara", address: "No 26, Agbanga Street, Obiaruku", phone: "+2348064642044", email: "info@baddest.com", clinical_info: "Patient complained of chest issue"
    res.json(info[0])
}
this.ApproveResult = async (req, res) => {

    var {accepted_test_id} = req.body
    await handler.genUpdate({status_approve: "yes"}, "perform_tests", {accepted_test_id: accepted_test_id})
    handler.Success(res, "Result approved successfully")

}
this.UnApproveResult = async (req, res) => {

    var {accepted_test_id} = req.body
    await handler.genUpdate({status_approve: "no"}, "perform_tests", {accepted_test_id: accepted_test_id})
    handler.Success(res, "Result unapproved successfully")

}
this.IndicateFullyPerformed = async (req, res) => {

    var {lab_no} = req.body
    //: just get the accepted_test_id
    var accepted_test_id = await handler.bindRawQuery("select id from accepted_tests where lab_no = $lab", {lab: lab_no})
    accepted_test_id = accepted_test_id[0].id
    await handler.genUpdate({status_full: "yes"}, "perform_tests", {accepted_test_id: accepted_test_id})
    handler.Success(res, "Test fully performed")

}
this.RevertFullyPerformed = async (req, res) => {

    var {lab_no} = req.body
    //: just get the accepted_test_id
    var accepted_test_id = await handler.bindRawQuery("select id from accepted_tests where lab_no = $lab", {lab: lab_no})
    accepted_test_id = accepted_test_id[0].id
    await handler.genUpdate({status_full: "no"}, "perform_tests", {accepted_test_id: accepted_test_id})
    handler.Success(res, "Test unperformed")

}
