
const model = require('../models/index')
const handler = require("./handler")

module.exports = _this = this
_this.addtest = [["EMA", "EMMA", "M", "080", "<button class = \"my-btn\"><i class = \"fa fa-plus\"></i></button>", "<button class = \"my-btn\"><i class = \"fa fa-list\"></i></button>"]]


_this.AddPatientRecord = async (req, res) => {

    var {code, first_name, last_name, title, sex, dob, age, phone_number, email, marital_status, religion, nationality, state, discount} = req.body
    //console.log("Who are u", req.body)
    if(! title){

        handler.Error(res, "Title is empty")
        return
    }
    if(! first_name){

        handler.Error(res, "First name is required")
        return
    }
    if(! last_name){

        handler.Error(res, "Last name is required")
        return
    } 
    if(! sex){

        handler.Error(res, "Sex is required")
        return
    } 
    if(! age){

        handler.Error(res, "Age is required")
        return
    } 
    if(! phone_number){

        handler.Error(res, "Phone number is required")
        return
    } 
    if(! marital_status){

        handler.Error(res, "Marital status is required")
        return
    } 
    // if(! religion){

    //     handler.Error(res, "Religion is required")
    //     return
    // } 
    // if(! nationality){

    //     handler.Error(res, "Nationality is required")
    //     return
    // } 
    // if(! state){

    //     handler.Error(res, "State of origin is required")
    //     return
    // } 
    if(! dob){

        dob = "n/a"
    }
    if(! discount){
        discount = "n/a"
    }
    if(! email){ 
        email = "n/a"
    }
    var code = await handler.GenCode("patient_master", "GRA-PH")
    var mdata = {code, first_name, last_name, title, sex, dob, age, phone_number, email, marital_status, religion, nationality, state, discount}

    var isI = await handler.genInsert(mdata, "patient_master")
    //console.log("Length#################", isI.dataValues) // get records

    if(isI){

        handler.Success(res, "Record added")

    }else{
        handler.Error(res, "Unable to add patient record")
        
    }

   // _this.addtest.push(["EMAX", "EMMA", "M", "080", "<button class = \"my-btn\"><i class = \"fa fa-plus\"></i></button>", "<button class = \"my-btn\"><i class = \"fa fa-list\"></i></button>"])
   
   // handler.Success(res, "Emma", [{code: "EMA", name: "Emanovwe E Jr", sex: "Male",  contact: "08064642044"}])
   //: LIST PATIENTS
   
  
 
}
_this.PatientRecords = async (req, res) => {


    return new Promise((resolve, reject) => {
        var dresult  = []
        handler.bindRawQuery("select * from patient_master order by first_name asc limit 10000", {}).then(rows => {

            for(let r of rows){
                dresult.push([r.code, r.first_name+" "+r.last_name, r.sex, r.phone_number, "<button = \"alert('baddest')\" class = \"my-btn click\" params = '"+r.id+"' func = 'AddToAceeptTest'><i class = \"fa fa-plus\"></i></button>", "<button class = \"my-btn\"><i class = \"fa fa-list\"></i></button>" ])
            }
            // console.log({
            //     data: dresult
                
            // })
            res.json( {
                data: dresult
                
            })
           // resolve(rows)
            
        })

    
     })
    
    // res.json( {
    //     data: _this.addtest
        
    // })


}