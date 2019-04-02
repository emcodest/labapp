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
this.ListMaster = async (req, res) => {
    var {master_name} = req.body
    var dresult = []
    var list_master = await handler.bindRawQuery("select * from "+master_name+" order by name asc limit 1000", {})
    for (let r of list_master) {
        dresult.push([r.code, r.name, r.group, "<button params = '"+r.id+", "+master_name+"'  func = 'DeleteMaster' class = \"my-btn click\"><i class = \"fa fa-times \"></i></button>"])
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

this.ListStaffMaster = async (req, res) => {
    var {master_name} = req.body
    var dresult = []
    var list_master = await handler.bindRawQuery("select * from "+master_name+" order by last_name asc", {})
    for (let r of list_master) {
        dresult.push([r.code, r.password, r.title, r.first_name, r.last_name, r.sex, r.dob, r.age, r.phone, r.email, r.marital_status, r.nationality, r.religion, r.office_location, "<button params = '"+r.id+", "+master_name+"'  func = 'DeleteMaster' class = \"my-btn click\"><i class = \"fa fa-times \"></i></button>"])
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
        dresult.push([r.code, r.name, r.contact_person, r.primary_specialty, r.other_specialty, r.mobile_no, r.office_no, r.email, r.director_name, r.address, r.region, r.lga, r.discount, r.cut, "<button params = '"+r.id+", "+master_name+"'  func = 'DeleteMaster' class = \"my-btn click\"><i class = \"fa fa-times \"></i></button>"])
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
this.ListRefPersonMaster = async (req, res) => {
    var {master_name} = req.body
    var dresult = []
    var list_master = await handler.bindRawQuery("select * from "+master_name+" order by last_name asc", {})
    for (let r of list_master) {
        dresult.push([r.code, r.title, r.first_name, r.last_name, r.sex, r.age, r.phone_no, r.email, r.marital_status, r.religion, r.nationality, r.state, r.designation, r.primary_specialty, r.sub_specialty, "<button params = '"+r.id+", "+master_name+"'  func = 'DeleteMaster' class = \"my-btn click\"><i class = \"fa fa-times \"></i></button>"])
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
this.ListGuardianMaster = async (req, res) => {
    var {master_name} = req.body
    var dresult = []
    var list_master = await handler.bindRawQuery("select * from "+master_name+" order by last_name asc", {})
    for (let r of list_master) {
        dresult.push([r.code, r.title, r.first_name, r.last_name, r.sex, r.dob, r.age, r.phone_no, r.email, r.marital_status, r.religion, r.nationality, r.state, r.discount, "<button params = '"+r.id+", "+master_name+"'  func = 'DeleteMaster' class = \"my-btn click\"><i class = \"fa fa-times \"></i></button>"])
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
    var {lab_no, patient_info, ref_code_center, ref_code_guardian, ref_code_center, amount_paid, clinical_info, amount_paid, balance, concession, home_collection, net_amount, paid, paid_type, pay_channel, pay_type, receipt_number, tax_amount, test_amount, ref_code_person} = master_data
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
    var is_lb = await handler.bindRawQuery("select lab_no from accepted_tests where lab_no = $l", {l: lab_no})
    if(is_lb.length > 0){
        handler.Error(res, "Lab No. already exist")
        return
    }
    var data = {user_id: handler.getUser(req), lab_no: lab_no, test_raw: JSON.stringify(master_data), patient_id: patient_info, ref_center_id: ref_code_center, ref_person_id: ref_code_person, ref_guardian_id: ref_code_guardian, clinical_info, balance, concession, home_collection, net_amount, paid, paid_type, pay_channel, pay_type, receipt_number, tax_amount, test_amount }
    var is_test = await handler.genInsert(data, "accepted_tests")
    if(is_test){
        handler.Success(res, "Test accepted")
      
    }else{
        handler.Error(res, "Unable to accept test")
    }

    //console.log(master_data)
    //! - - - - - - - - - -- - - - - - -
    //var obj = "pay_channel"
    //var obj_cnt = 2
    //var key = "amount"
    //var process_body = handler.GetJsonKey(master_data, obj, obj_cnt, key)
    
   // console.log(master_data)
    //! - - - - - - - - - -- - - - - - -


   // master_data = JSON.parse(master_data)
    //console.log("MASTER DATA ", master_data)
    // if (! master_data.skips) {
    //     //handler.Error(res, "Skip is empty")
    //     //return
    //     master_data.skips = ""
    // }
    // if (! master_data.code) {
    //     handler.Error(res, "Code is empty")
    //     return
    // }
    // if (! master_data.name) {
    //     handler.Error(res, "Name is empty")
    //     return
    // }
    // // make sure code is ok 
    // var is_code_ok = await handler.bindRawQuery("select code from "+master_data.master_name+" where code = $code collate nocase", {
    //     code: master_data.code })
    // if (is_code_ok.length > 0) {

    //     handler.Error(res, "Code already exist")
    //     return
    // }
    // // add code name to database
    // var f_obj  = this.Skip(master_data, master_data.skips)
    // console.log("Final", f_obj)
    // var add_master = await handler.genInsert(f_obj, master_data.master_name)

    // if (add_master) {
    //     handler.Success(res, "Added successfully")
    //     return
    // } else {
    //     handler.Error(res, "Unable to add master data")
    //     return
    // }
    //handler.Error(res, "Good to go!", master_data)
}
this.ListTodaySerial = async (req, res) => {
    var {today} = req.body
    
    var list_master = await handler.bindRawQuery("select count(1) as cnt from accepted_tests where strftime('%Y%m%d', date(created_at)) = $today", {today: today})
    var ccnt = list_master[0].cnt + 1
    if(ccnt < 10){
        ccnt = "0"+ccnt
    }
    res.json({sno: ccnt})

}
