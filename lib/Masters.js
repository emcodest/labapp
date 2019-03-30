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