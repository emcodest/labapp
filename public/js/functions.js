/* NOTIFICATIONS */

function alertError(title, message) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "5000",
        "hideDuration": "5000",
        "timeOut": "5000",
        "extendedTimeOut": "5000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr["error"](message, title)


}

function alertSuccess(title, message) {

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "5000",
        "hideDuration": "5000",
        "timeOut": "5000",
        "extendedTimeOut": "5000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr["success"](message, title)



}

function alertInfo(title, message) {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "5000",
        "hideDuration": "5000",
        "timeOut": "5000",
        "extendedTimeOut": "5000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    toastr["info"](message, title)



}

function genForm(form) {
    var ff = ["<div class = 'row'>"]
    for (var i in form) {

        if (form[i].type == "textfield") {

            ff.push("<div class = 'col-md-6'><input class = 'form-control' name='" + form[i].name + "' type='text' placeholder='" + form[i].placeholder + "' value = '" + form[i].val + "'  />")
            ff.push("</div>")
        }
        if (form[i].type == "password") {

            ff.push("<div class = 'col-md-6'><input class = 'form-control' name='" + form[i].name + "' type='password' placeholder='" + form[i].placeholder + "' value = '" + form[i].val + "'  />")
            ff.push("</div>")
        }
        if (form[i].type == "textarea") {

            ff.push("<div class = 'col-md-6'><textarea class = 'form-control' name='" + form[i].name + "' placeholder='" + form[i].placeholder + "'>" + form[i].val + "</textarea>")
            ff.push("</div>")
        }
        if (form[i].type == "select") {

            ff.push("<div class = 'col-md-6'><select class = 'form-control' name='" + form[i].name + "'>" + form[i].options + "</select>")
            ff.push("</div>")
        }


    }
    ff.push("</div>")
    return ff.join(" ")
}

function genForm2(form, col) {
    var ff = ["<div class = 'row'>"]
    for (var i in form) {

        if (form[i].type == "textfield") {

            ff.push("<div class = '" + col + "'><input class = 'form-control' name='" + form[i].name + "' type='text' placeholder='" + form[i].placeholder + "' value = '" + form[i].val + "'  />")
            ff.push("</div>")
        }
        if (form[i].type == "password") {

            ff.push("<div class = '" + col + "'><input class = 'form-control' name='" + form[i].name + "' type='password' placeholder='" + form[i].placeholder + "' value = '" + form[i].val + "'  />")
            ff.push("</div>")
        }
        if (form[i].type == "textarea") {

            ff.push("<div class = '" + col + "'><textarea class = 'form-control' name='" + form[i].name + "' placeholder='" + form[i].placeholder + "'>" + form[i].val + "</textarea>")
            ff.push("</div>")
        }
        if (form[i].type == "select") {

            ff.push("<div class = '" + col + "'><select class = 'form-control' name='" + form[i].name + "'>" + form[i].options + "</select>")
            ff.push("</div>")
        }


    }
    ff.push("</div>")
    return ff.join(" ")
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function myalert(msg) {
    $.sweetModal(msg);
}

function custom_format_1(num) {
    var today = new Date(num);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear().toString().substr(-2);

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
            // mm = '0'+mm
    }


    return dd + "-" + mm + "-" + yyyy;
}

function custom_format(num) {
    var today = new Date(num);
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yyyy = today.getFullYear().toString();

    if (dd < 10) {
        dd = '0' + dd
    }

    // if(mm<10) {
    //     mm = '0'+mm
    //     // mm = '0'+mm
    // } 
    var mmx = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return dd + "-" + mmx[mm] + "-" + yyyy;
}

function get_today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear().toString().substr(-2);

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return yyyy + mm + dd;
}

function calculateAge(birthday) {
    // birthday is a date
    birthday = new Date(birthday)
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function NewAge(str) {
    // birthday is a date
    var birthday = new Date(str)
    var ageDifMs = Date.now() - birthday.getTime();
   // var ageDate = new Date(ageDifMs); // miliseconds from epoch

    // var days = ageDate.getSeconds() / 86400
    // return "Year: " + Math.abs(ageDate.getUTCFullYear() - 1970) + " Month: " + ageDate.getMonth() + " Day: " + Math.ceil(days);
    var seconds =  ageDifMs / 1000
    var numyears = Math.floor(seconds / 31536000)
    var nummonths = Math.floor((seconds % 31536000) / 2628000)
    var numdays = Math.floor(((seconds % 31536000) % 2628000) / 86400)
    //var numhours = Math.floor((((seconds % 31536000) % 2628000) % 86400) / 3600)
   // var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
    return "Year: " + numyears + " Month: " +nummonths + " Day: " +numdays
 

}



function check_object_index2(ar, ky) {
    for (var i in ar) {
        if (ar[i].cat == ky)
            return true
    }
    return false
}

function check_object_index(ar, ky) {
    for (var i in ar) {
        if (ar[i].name == ky)
            return true
    }
    return false
}

function check_object_index3(ar, ky) {
    for (var i in ar) {
        if (ar[i].name == ky)
            return i
    }
    return -1
}

function server(url, data, type, cb) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: type,
        success: function(res) {
            // alert(res)
            cb(res)
            if (res.error) {
                toastr.error(res.message)
                return
            }
            if (res.success) {

                toastr.success(res.message)
            }


        },
        error: function(e) {
            alert("Error: " + e.status)

        }
    });
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function getAPI(root, action) {
    return "api/" + root + "/" + action
}

function dialog(view, data) {


    $(".modal-body").load(view, function(text) {


        _modal = new Vue({
            el: '#modal-id',
            data: {
                culture_test: {
                    ftype: 'text'
                },
                culture_test_list: [{
                    microscopy: []
                }, {
                    culture: []
                }, {
                    antibacterial: []
                }, {
                    antifungal: []
                }],
                set_count: 0,
                account: {},
                test_ref_data: {
                    sex: "M",
                    date_type: "Y",
                    from: 0,
                    to: 0,
                    lb_1: 0,
                    lb_2: 0,
                    up_1: 0,
                    up_2: 0,
                    unit_1: "",
                    unit_2: "",
                    out_1: "",
                    out_2: ""
                },
                test_references: [],
                edit_new_test_fd: {
                    report_type: 'Tabular'
                },
                add_new_test_fd: {
                    report_type: 'Tabular'
                },
                report_type: ['Tabular', 'Paragraph'],
                count: [1, 2, 3],
                predefined_test: {
                    ftype: 'text'
                },
                predefined_test_list: [{
                    default: []
                }],
                add_new_profile_fd: {},
                edit_new_profile_fd: {},
                patient: {}
            },
            methods: {
                
                InitRefRanges: function(){

                   
                    var url = getAPI("master", "ListRefRanges")
                    var type = "json"
                    var data = {
                        test_id: $("[name=idd]").val()
                    }

                  
                    var _this = this
                    server(url, data, type, function (res) {
                      
                        _this.test_references = res
                       
                        
                    })

                },
                NewRefRanges: function() {

                    var _inc = this.test_references.length //this.set_count++
                        var new_data = {}
                    var mkeys = Object.keys(this.test_ref_data)
                    var mvalues = Object.values(this.test_ref_data)
                    for (var i in mkeys) {
                         new_data[mkeys[i]] = mvalues[i]
                        //new_data[mkeys[i] + "_" + _inc] = mvalues[i]
                    }
                    console.log(new_data)
                    this.test_references.push(new_data)
                },
                SaveReference: function(ii) {
                    var idd = $("[name=idd]").val()
                    if(this.test_references[ii].id)
                    var main_id = this.test_references[ii].id
                    else
                    var main_id = -1
                    //alert(JSON.stringify(this.test_references))
                   // alert(idd)
                    var url = getAPI("master", "AddNewReferenceRange") 
                    var data = {} 
                    for(var i in this.test_references) {
                        data["em_"+i] = this.test_references[i]  
                    }   
                    data["len"] = this.test_references.length
                    data["test_id"] = idd
                    data["main_id"] = main_id
                   // console.log(data)             
                    var type = "json"
                    server(url, data, type, function(res) {
                      //  console.log(res)
                        
                    })



                    //alert(i)
                    //alert($("[name=idd]").val())
                   // alert(this.test_references.length)
                   // console.log(this.test_references)
                   
                },
                RemoveReference: function(i) {
                  
                    var idd = this.test_references[i].id
                    if(! idd){
                        return
                    }
                    var url = getAPI("master", "DeleteMaster")
                    //alert(url)
                    var type = "json"
                    var data = {
                        id: idd,
                        master_name: "ref_ranges"
                    }
                    var _this = this
                    server(url, data, type, function (res) {

                        _this.test_references.splice(i, 1)
                    })

                },
                AddCultureTest: function(ty) {
                    switch (ty) {

                        case "micro":
                            var fmicro = this.culture_test.field_name
                            var ftype = this.culture_test.ftype
                            var fpresets = this.culture_test.presets
                            if (!fmicro) {
                                alertError("Field is empty")
                                return
                            }

                            this.culture_test_list[0].microscopy.push({
                                field_name: fmicro,
                                ftype: ftype,
                                presets: fpresets
                            })

                            alertSuccess("Added successfully")
                            this.culture_test.field_name = ''
                            this.culture_test.ftype = 'text'
                            this.culture_test.presets = ''
                            break;

                        case "culture":
                            var fmicro = this.culture_test.field_name
                            var ftype = this.culture_test.ftype
                            var fpresets = this.culture_test.presets
                            if (!fmicro) {
                                alertError("Field is empty")
                                return
                            }

                            this.culture_test_list[1].culture.push({
                                field_name: fmicro,
                                ftype: ftype,
                                presets: fpresets
                            })

                            alertSuccess("Added successfully")
                            this.culture_test.field_name = ''
                            this.culture_test.ftype = 'text'
                            this.culture_test.presets = ''
                            break;

                        case "antibacterial":
                            var fmicro = this.culture_test.field_name
                            var ftype = this.culture_test.ftype
                            var fpresets = this.culture_test.presets
                            if (!fmicro) {
                                alertError("Field is empty")
                                return
                            }

                            this.culture_test_list[2].antibacterial.push({
                                field_name: fmicro,
                                ftype: ftype,
                                presets: fpresets
                            })

                            alertSuccess("Added successfully")
                            this.culture_test.field_name = ''
                            this.culture_test.ftype = 'text'
                            this.culture_test.presets = ''

                            break;

                        case "antifungal":
                            var fmicro = this.culture_test.field_name
                            var ftype = this.culture_test.ftype
                            var fpresets = this.culture_test.presets
                            if (!fmicro) {
                                alertError("Field is empty")
                                return
                            }

                            this.culture_test_list[3].antifungal.push({
                                field_name: fmicro,
                                ftype: ftype,
                                presets: fpresets
                            })

                            alertSuccess("Added successfully")
                            this.culture_test.field_name = ''
                            this.culture_test.ftype = 'text'
                            this.culture_test.presets = ''


                            break;
                        case "predefined_test":
                            var fmicro = this.predefined_test.field_name
                            var ftype = this.predefined_test.ftype
                            var fpresets = this.predefined_test.presets
                            if (!fmicro) {
                                alertError("Field is empty")
                                return
                            }

                            this.predefined_test_list[0].default.push({
                                field_name: fmicro,
                                ftype: ftype,
                                presets: fpresets
                            })

                            alertSuccess("Added successfully")
                            this.predefined_test.field_name = ''
                            this.predefined_test.ftype = 'text'
                            this.predefined_test.presets = ''


                            break;

                    }

                },
                RemoveCulture: function(type, index) {

                    switch (type) {

                        case "micro":
                            this.culture_test_list[0].microscopy.splice(index, 1)
                            break;

                        case "culture":
                            this.culture_test_list[1].culture.splice(index, 1)
                            break;

                        case "antibacterial":
                            this.culture_test_list[2].antibacterial.splice(index, 1)
                            break;

                        case "antifungal":
                            this.culture_test_list[3].antifungal.splice(index, 1)

                            break;
                        case "predefined_test":

                            this.$delete(this.predefined_test_list[0].default, index)

                            //this.predefined_test_list[0].default = ee.slice(index, 1)
                            console.log("###", this.predefined_test_list[0].default)
                            break;

                    }
                },
                LoadPredefined: function() {
                    // setTimeout(() => {
                    var idd = $("[name=idd]").val().trim() // test id
                    var jstr = $("[name=custom]").val()
                    jstr = JSON.parse(jstr)

                    this.predefined_test.idd = idd
                        //alert(this.predefined_test.idd )

                    if (jstr["predefined_test[code]"]) {
                        this.predefined_test.code = jstr["predefined_test[code]"]
                    }
                    if (jstr["predefined_test[name]"]) {
                        this.predefined_test.name = jstr["predefined_test[name]"]
                    }
                    if (jstr["predefined_test[test_cat_id]"]) {
                        this.predefined_test.test_cat_id = jstr["predefined_test[test_cat_id]"]
                    }
                    if (jstr["predefined_test[rate]"]) {
                        this.predefined_test.rate = jstr["predefined_test[rate]"]
                    }
                    var split = Object.keys(jstr)
                    var process_stp = []
                    for (var i in split) {
                        var ssplit = split[i].split("[default]")

                        if (ssplit.length > 1) {
                            //var vsplit = Object.values(jstr)
                            process_stp.push(ssplit)

                        }
                    }
                  
                    var len = process_stp.length / 3
                        // console.log(jstr)
                    var farray = []
                    for (var j = 0; j < len; j++) {
                        var c_val = jstr["predefined_test_list[0][default][" + j + "][field_name]"]
                        var c_type = jstr["predefined_test_list[0][default][" + j + "][ftype]"]
                        var presets = jstr["predefined_test_list[0][default][" + j + "][presets]"]

                        farray.push({
                            field_name: c_val,
                            ftype: c_type,
                            presets: presets
                        })
                    }
                    //console.log("#######", process_stp)
                    this.predefined_test_list[0].default = farray
                        //alert("nn")

                    // }, 500);

                },
                LoadCulture: function() {

                    var idd = $("[name=idd]").val().trim() // test id
                    var jstr = $("[name=custom]").val()
                    jstr = JSON.parse(jstr)

                    this.culture_test.idd = idd
                        //alert(this.predefined_test.idd )

                    if (jstr["culture_test[code]"]) {
                        this.culture_test.code = jstr["culture_test[code]"]
                    }
                    if (jstr["culture_test[name]"]) {
                        this.culture_test.name = jstr["culture_test[name]"]
                    }
                    if (jstr["culture_test[test_cat_id]"]) {
                        this.culture_test.test_cat_id = jstr["culture_test[test_cat_id]"]
                    }
                    if (jstr["culture_test[rate]"]) {
                        this.culture_test.rate = jstr["culture_test[rate]"]
                    }
                    var split = Object.keys(jstr)
                    console.log(split)
                    var process_stp = []
                    var process_stp_culture = []
                    var process_stp_bacterial = []
                    var process_stp_fungal = []
                    for (var i in split) {
                        var ssplit = split[i].split("[microscopy]")

                        var ssplit_culture = split[i].split("[culture]")

                        var ssplit_bact = split[i].split("[antibacterial]")

                        var ssplit_fungal = split[i].split("[antifungal]")


                        if (ssplit.length > 1) {
                            //var vsplit = Object.values(jstr)
                            process_stp.push(ssplit)

                        }

                        if (ssplit_culture.length > 1) {
                            //var vsplit = Object.values(jstr)
                            process_stp_culture.push(ssplit_culture)

                        }

                        if (ssplit_bact.length > 1) {
                            //var vsplit = Object.values(jstr)
                            process_stp_bacterial.push(ssplit_bact)

                        }

                        if (ssplit_fungal.length > 1) {
                            //var vsplit = Object.values(jstr)
                            process_stp_fungal.push(ssplit_fungal)

                        }




                    }

                    var len = process_stp.length / 3
                        // console.log(jstr)
                    var farray = []
                    for (var j = 0; j < len; j++) {
                        var c_val = jstr["culture_test_list[0][microscopy][" + j + "][field_name]"]
                        var c_type = jstr["culture_test_list[0][microscopy][" + j + "][ftype]"]
                        var fpresets = jstr["culture_test_list[0][microscopy][" + j + "][presets]"]

                        farray.push({
                            field_name: c_val,
                            ftype: c_type,
                            presets: fpresets
                        })
                    }

                    //console.log("#######", process_stp)
                    this.culture_test_list[0].microscopy = farray

                    // culture 
                    var len = process_stp_culture.length / 3

                    var farray = []
                    for (var j = 0; j < len; j++) {
                        var c_val = jstr["culture_test_list[1][culture][" + j + "][field_name]"]
                        var c_type = jstr["culture_test_list[1][culture][" + j + "][ftype]"]

                        var fpresets = jstr["culture_test_list[1][culture][" + j + "][presets]"]

                        farray.push({
                            field_name: c_val,
                            ftype: c_type,
                            presets: fpresets
                        })
                    }


                    this.culture_test_list[1].culture = farray



                    // antibacterial
                    var len = process_stp_bacterial.length / 3

                    var farray = []
                    for (var j = 0; j < len; j++) {
                        var c_val = jstr["culture_test_list[2][antibacterial][" + j + "][field_name]"]
                        var c_type = jstr["culture_test_list[2][antibacterial][" + j + "][ftype]"]
                        var fpresets = jstr["culture_test_list[2][antibacterial][" + j + "][presets]"]

                        farray.push({
                            field_name: c_val,
                            ftype: c_type,
                            presets: fpresets
                        })
                    }


                    this.culture_test_list[2].antibacterial = farray

                    // antifungal
                    var len = process_stp_fungal.length / 3

                    var farray = []
                    for (var j = 0; j < len; j++) {
                        var c_val = jstr["culture_test_list[3][antifungal][" + j + "][field_name]"]
                        var c_type = jstr["culture_test_list[3][antifungal][" + j + "][ftype]"]
                        var fpresets = jstr["culture_test_list[3][antifungal][" + j + "][presets]"]

                        farray.push({
                            field_name: c_val,
                            ftype: c_type,
                            presets: fpresets
                        })
                    }


                    this.culture_test_list[3].antifungal = farray




                }

            }

        })

        $("#modal-id").modal("show")
        var kk = Object.keys(data)
        var vv = Object.values(data)
        for (var i in kk) {
            $("[name='" + kk[i] + "']").val(vv[i])
        }



    })

}

//! - - - - - - - - - -- - - - - - -DASHBOARD FUNCTIONS
function selectdt(opt, dt, dtid, cb, test_id_dt) {

    if ($.fn.DataTable.isDataTable(dtid)) {

        dt.destroy();
        dt = $(dtid).DataTable(opt)

    } else {
        dt = $(dtid).DataTable(opt)
    }

    //opt.initComplete = function( settings, json ) {

    $(dtid).on('click', 'tr', function() {

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            dt.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        window.department_list_dt = dt
        $.map(dt.rows('.selected').data(), function(item) {


            if ($(test_id_dt).DataTable()) {

                $(test_id_dt).DataTable().clear().draw().destroy()

            }

            // if(test_cat_dt)
            // test_cat_dt.destroy();

            var tab_id = item[4]
                //var datx = {dept_id: tab_id}   
            cb(tab_id, dtid)

        });





    });


    // }



}

function getUserInfo($scope) {

    //: current logged user


    $scope.get_user_info = window.localStorage.getItem("user")
    $scope.get_user_info = JSON.parse($scope.get_user_info)
    if ($scope.get_user_info.user_type == "admin") {
        $scope.is_admin = true
    }



}

function add_new_patient_info(scope, dt_id) {

    //! - - - - - - - - - -- - - - - - -

    scope.patient = {}
    scope.toggleState = false

    scope.toggle = function() {
        if (!scope.toggleState)
            scope.toggleState = true
        else
        if (scope.toggleState == true) {
            scope.toggleState = false
        } else {
            scope.toggleState = true
        }


    }
    scope.getToggle = function() {

            return scope.toggleState
        }
        //scope.patient.first_name = ""
    scope.add_new_patient_info = function() {
        var url = getAPI("patient", "AddPatientRecord")
        var data = scope.patient
        var type = "json"
        server(url, data, type, function(res) {
            if (res.success) {
                $("#" + dt_id).DataTable().ajax.reload()
            }
        })

    }




}

function input_data(params) {
    var data = {}
    var input = params.split(",")
    for (var i in input) {
        var ii = input[i].trim()
        var val = $("[name='" + ii + "']").val()
        data[ii] = val
    }
    return data
}

//! - - - - - - - - - -- - - - - - -
function DepartmentMasterScope(scope) {


    scope.department_master_data = {}


    //- ADD DEPARTMENT   
    scope.add_department = function() {

        //: validations
        if (!scope.department_master_data.code) {
            alertError("Empty code")
            return
        }
        if (scope.department_master_data.code) {
            scope.department_master_data.code = scope.department_master_data.code.toUpperCase()
        }
        if (!scope.department_master_data.department_name) {
            alertError("Empty name")
            return
        }
        // add to database
        var url = getAPI("department", "AddDepartment")
        var data = scope.department_master_data
        server(url, data, "json", function(res) {
            if (res.success) {
                $("#departmentdt").DataTable().ajax.reload()
                scope.department_master_data = {}
            }
        })



    }


}

function TestMasterScope(scope) {

    scope.AddCategoryToDepartment = function() {
        if (!window.department_list_dt) {
            alertError("Error Message", "Please select department")
            return
        }
        var cnt_dpt = window.department_list_dt.rows(".selected").data().length

        if (cnt_dpt < 1) {
            alertError("Error Message", "You need to select department")
            return
        } else {

            $.map(window.department_list_dt.rows('.selected').data(), function(item) {
                //alert(item[4])
                dialog("views/add-category-department.html", {
                    department: item[1],
                    department_id: item[4]
                })
                return
            });

        }

    }


}

function ProfileMasterScope(scope) {


    scope.OpenProfile = function() {

        dialog("dialogs/add-profile.html", {})
    }



    // scope.AddCategoryToDepartment = function(){
    //   if(! window.department_list_dt){
    //     alertError("Error Message", "Please select department")
    //     return
    //   }
    //   var cnt_dpt = window.department_list_dt.rows(".selected").data().length

    //   if( cnt_dpt< 1){
    //     alertError("Error Message", "You need to select department")
    //     return
    //   }else{

    //     $.map(window.department_list_dt.rows('.selected').data(), function (item) {
    //       //alert(item[4])
    //       dialog("views/add-category-department.html", {department: item[1], department_id: item[4]})
    //       return
    //   });

    //   }

    // }
    // alert("C profile master")

}

//! - - - - - - - - - -- - - - - - -DEPARTMENT SCOPE
function UpdateDepartment(params) {
    var data = input_data(params)
    var url = getAPI("department", "EditDepartment")
    var type = "json"
    server(url, data, type, function(res) {
        if (res.success) {
            $("#departmentdt").DataTable().ajax.reload()
        }
    })


}

function AddCategory(params) {
    var data = input_data(params)
    var url = getAPI("department", "AddCategoryToDepartment")
    var type = "json"
    server(url, data, type, function(res) {
        if (res.success) {
            $("[name=cat_code]").val("")
            $("[name=cat_name]").val("")
            $("#categorydt_test").DataTable().ajax.reload()
        }
    })


}

function EditCategory(params) {
    var data = input_data(params)
    var url = getAPI("department", "EditCategory")
    var type = "json"
    server(url, data, type, function(res) {
        if (res.success) {
            // $("[name=cat_code]").val("")
            // $("[name=cat_name]").val("")
            $("#categorydt_test").DataTable().ajax.reload()
        }
    })


}

function DepartmentMaster(params, _this) {

    if (params) {
        // alert(params)
        var func = params.split(",")
        switch (func[1].trim()) {
            case "preview":
                var idd = func[0].trim()
                    //var dt = departmentdt.rows().data()
                var code = _this.parent().parent().find("td:nth-child(1)").text()
                var name = _this.parent().parent().find("td:nth-child(2)").text()

                var mdata = {
                    code: code,
                    department_name: name,
                    id: idd
                }


                dialog("views/preview-department-master.html", mdata)

                break;

            case "remove":
                if (confirm("Are you sure ?") == false) {
                    return
                }
                var iid = func[0]
                var data = {
                    id: iid
                }
                var url = getAPI("department", "DeleteDepartment")
                var type = "json"
                server(url, data, type, function(res) {
                    if (res.success) {
                        $("#departmentdt").DataTable().ajax.reload()
                    }
                })

                break;
        }

    }

}

function CategoryMaster(params, _this) {

    if (params) {

        var func = params.split(",")
        switch (func[1].trim()) {
            case "preview":
                var idd = func[0].trim()

                var code = _this.parent().parent().find("td:nth-child(1)").text()
                var name = _this.parent().parent().find("td:nth-child(2)").text()

                //: GET DEPARTMENT ID
                var dt = window.department_list_dt
                if (!dt) {
                    alert("Enable to get Dept ID")
                    return
                }

                $.map(dt.rows('.selected').data(), function(item) {
                    var dept_id = item[4]

                    var mdata = {
                        cat_code: code,
                        cat_name: name,
                        department_id: dept_id,
                        cat_id: idd
                    }


                    dialog("views/preview-category-master.html", mdata)
                })


                break;

            case "remove":
                var idd = func[0].trim()
                    // remove from category and test_category
                if (confirm("Are you sure  ?") == false) {
                    return
                }
                var iid = func[0]
                var data = {
                    id: iid
                }
                var url = getAPI("department", "RemoveCategoryFromDepartment")
                var type = "json"
                server(url, data, type, function(res) {
                    if (res.success) {
                        $("#categorydt_test").DataTable().ajax.reload()
                    }
                })

                break;
        }

    }

}

function TestMaster(params, _this) {

    if (params) {

        var func = params.split(",")
        switch (func[1].trim()) {
            case "tabular":
                dialog("dialogs/new-test.html", {})
                break
            case "paragraph":
                dialog("dialogs/new-paragraph-test.html", {})
                break
            case "culture":
                dialog("dialogs/culture-test.html", {})
                break
            case "predefined":
                dialog("dialogs/predefined-test.html", {})
                break
            case "add_test_profile":
                var profile_id = $("[name=idd]").val()
                var test_order = $("[name=test_order]").val()
                var test_id = func[0]
                var data = {
                        test_id: test_id,
                        profile_id: profile_id,
                        test_order: test_order
                    }
                    //  console.log(data)
                var url = getAPI("department", "AddTestToProfile")
                var type = "json"
                server(url, data, type, function(res) {
                    if (res.success) {
                        $("[name=test_order]").val("0")
                        $("#test-profiledt").DataTable().ajax.reload()
                    }
                })



                break
            case "add-test-to-profile":
               
                dialog("dialogs/display-tests.html", {})
                break;
            case "preview-profile":

                var idd = func[0].trim()

                var code = _this.parent().parent().find("td:nth-child(1)").text()
                var name = _this.parent().parent().find("td:nth-child(2)").text()
                    // get test
                var url = getAPI("department", "ListProfileById")
                var type = "json"


                server(url, {
                    id: idd
                }, type, function(res) {
                    var mdata = res // {code: code, name: name, id: idd}
                    mdata.idd = mdata.id
                    dialog("dialogs/edit-profile.html", mdata)

                })

                break;
            case "preview":

                if (func[2].trim() == "predefined_test") {
                    var idd = func[0].trim()

                    var code = _this.parent().parent().find("td:nth-child(1)").text()
                    var name = _this.parent().parent().find("td:nth-child(2)").text()
                        // get test
                    var url = getAPI("department", "ListTestById")
                    var type = "json"


                    server(url, {
                        id: idd
                    }, type, function(res) {
                        var mdata = res // {code: code, name: name, id: idd}
                        mdata.idd = mdata.id
                        dialog("dialogs/edit-predefined-test.html", mdata)

                    })

                } else if (func[2].trim() == "culture") {
                    var idd = func[0].trim()

                    var code = _this.parent().parent().find("td:nth-child(1)").text()
                    var name = _this.parent().parent().find("td:nth-child(2)").text()
                        // get test
                    var url = getAPI("department", "ListTestById")
                    var type = "json"


                    server(url, {
                        id: idd
                    }, type, function(res) {
                        var mdata = res // {code: code, name: name, id: idd}
                        mdata.idd = mdata.id
                        console.log(mdata)
                        dialog("dialogs/edit-culture-test.html", mdata)

                    })

                } else {
                    var idd = func[0].trim()

                    var code = _this.parent().parent().find("td:nth-child(1)").text()
                    var name = _this.parent().parent().find("td:nth-child(2)").text()
                        // get test
                    var url = getAPI("department", "ListTestById")
                    var type = "json"


                    server(url, {
                        id: idd
                    }, type, function(res) {
                        var mdata = res // {code: code, name: name, id: idd}
                        mdata.idd = mdata.id
                        //console.log("##", mdata)
                        //alert(mdata.rate)
                        dialog("dialogs/edit-test.html", mdata)

                    })

                }



                break;

            case "remove":

                if (confirm("Are you sure ?") == false) {
                    return
                }
                var iid = func[0]
                var data = {
                    id: iid
                }
                var url = getAPI("department", "RemoveTestFromCategory")
                var type = "json"
                server(url, data, type, function(res) {
                    if (res.success) {
                        $("#testdt_test").DataTable().ajax.reload()
                    }
                })

                break;
            case "remove-profile":

                if (confirm("Are you sure ?") == false) {
                    return
                }
                var iid = func[0]
                var data = {
                    id: iid
                }
                var url = getAPI("department", "RemoveProfile")
                var type = "json"
                server(url, data, type, function(res) {
                    if (res.success) {
                        $("#profiledt").DataTable().ajax.reload()
                    }
                })

                break;
            case "remove-test-profile":

                if (confirm("Are you sure ?") == false) {
                    return
                }
                var iid = func[0]
                var data = {
                    id: iid
                }
                var url = getAPI("department", "RemoveTestFromProfile")
                var type = "json"
                server(url, data, type, function(res) {
                    if (res.success) {
                        $("#test-profiledt").DataTable().ajax.reload()
                    }
                })

                break;

            case "add_test":
                var cat_id = $("#add-test-cat-select").val()
                var iid = func[0]
                var data = {
                    test_id: iid,
                    category_id: cat_id
                }
                var url = getAPI("department", "AddTestToCategory")
                var type = "json"
                server(url, data, type, function(res) {
                    if (res.success) {
                        $("#testdt_test").DataTable().ajax.reload()
                    }
                })

                break;



        }

    }

}

function AddNewTest(add_new_test_fd) {

    //console.log(add_new_test_fd)
    //alert($("#add-test-cat-select").val())
    add_new_test_fd.category_id = $("#add-test-cat-select").val()
    var url = getAPI("department", "AddTest")
    var type = "json"
    var data = add_new_test_fd
    data["summary"] = CKEDITOR.instances["editor1"].getData()
    data["summary_2"] = CKEDITOR.instances["editor2"].getData()
    data["summary_3"] = CKEDITOR.instances["editor3"].getData()
    data["summary_4"] = CKEDITOR.instances["editor4"].getData()
        //console.log(datax)
    server(url, data, type, function(res) {
        if (res.success) {

            $("#testdt_test").DataTable().ajax.reload()

        }
    })

}

function EditMainMaster(params, _this) {
    var master_name = _this.attr("master_name")
    var master_dt_id = _this.attr("master_dt_id")
    var pstr = input_data(params)
    var url = getAPI("master", "EditMaster")
    var type = "json"
    var data = pstr
    data.master_name = master_name
    data.skips = "id"

    server(url, data, type, function(res) {

        if (res.success) {

            $("#" + master_dt_id).DataTable().ajax.reload()

            if ($("#" + master_name).val() !== undefined) {

                angular.element(document.body).scope().EmitSearchMaster(master_name)
            }

        }
    })

}

function EditPatient(params) {

    var pstr = input_data(params)
    var url = getAPI("master", "EditMaster")
    var type = "json"
    var data = pstr
    data.master_name = "patient_master"
    data.skips = "id"
        //console.log(pstr)



    server(url, data, type, function(res) {

        if (res.success) {

            $("#patientdt").DataTable().ajax.reload()

            if ($("#patient_master").val() !== undefined) {

                angular.element(document.body).scope().EmitSearchPatient(pstr)
            }

        }
    })

}

function EditTest(params) {

    var pstr = input_data(params)
    var url = getAPI("department", "EditTest")
    var type = "json"
    var data = pstr
    //console.log(pstr)

    data["summary"] = CKEDITOR.instances["editor1"].getData()
    data["summary_2"] = CKEDITOR.instances["editor2"].getData()
    data["summary_3"] = CKEDITOR.instances["editor3"].getData()
    data["summary_4"] = CKEDITOR.instances["editor4"].getData()

    server(url, data, type, function(res) {

        if (res.success) {

            $("#testdt_test").DataTable().ajax.reload()

        }
    })

}

function LoadTest() {

    alert("learn another")
}

function LoadTestList() {
    var url = getAPI("department", "ListAllTest")

    var options = {
            ajax: {
                url: url,
                type: "post"
            }
        }
        // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
    if (!$.fn.DataTable.isDataTable('#testlist_dt')) {
        $("#testlist_dt").DataTable(options)
    }
}

function LoadProfileTestList() {
    var url = getAPI("department", "ListAllProfileTest")

    var options = {
            ajax: {
                url: url,
                type: "post"
            }
        }
        // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
    if (!$.fn.DataTable.isDataTable('#testlist_dt')) {
        $("#testlist_dt").DataTable(options)
    }
}

function SaveCultureTest(culture_test, culture_test_list) {
    // console.log(culture_test)
    // console.log(culture_test_list)
    var test_cat_id = $("#add-test-cat-select").val()
    culture_test.test_cat_id = test_cat_id
        ///alert(test_cat_id)
    if (!culture_test.code) {
        alertError("Please enter code")
        return
    }
    //alert(culture_test.name)
    if (!culture_test.name) {
        alertError("Name is empty")
        return
    }
    var url = getAPI("department", "SaveCultureTest")
    var type = "json"
    var data = {
        culture_test,
        culture_test_list
    }
    server(url, data, type, function(res) {

        if (res.success) {

            $("#testdt_test").DataTable().ajax.reload()

        }
    })

}

function UpdateCultureTest(culture_test, culture_test_list) {

    if (!culture_test.code) {
        alertError("Please enter code")
        return
    }
    //alert(culture_test.name)
    if (!culture_test.name) {
        alertError("Name is empty")
        return
    }
    var url = getAPI("department", "UpdateCultureTest")
    var type = "json"
    var data = {
        culture_test,
        culture_test_list
    }
    server(url, data, type, function(res) {

        if (res.success) {

            $("#testdt_test").DataTable().ajax.reload()

        }
    })


}

function SavePredefinedTest(predefined_test, predefined_test_list) {
    // console.log(culture_test)
    // console.log(culture_test_list)
    var test_cat_id = $("#add-test-cat-select").val()
    predefined_test.test_cat_id = test_cat_id
    if (!predefined_test.code) {
        alertError("Please enter code")
        return
    }
    if (!predefined_test.name) {
        alertError("Name is empty")
        return
    }
    var url = getAPI("department", "SavePredefinedTest")
    var type = "json"
    var data = {
        predefined_test,
        predefined_test_list
    }
    server(url, data, type, function(res) {

        if (res.success) {

            $("#testdt_test").DataTable().ajax.reload()

        }
    })

}

function UpdatePredefinedTest(predefined_test, predefined_test_list) {


    if (!predefined_test.code) {
        alertError("Please enter code")
        return
    }
    if (!predefined_test.name) {
        alertError("Name is empty")
        return
    }
    var url = getAPI("department", "UpdatePredefinedTest")
    var type = "json"
    var data = {
        predefined_test,
        predefined_test_list
    }
    server(url, data, type, function(res) {

        if (res.success) {

            $("#testdt_test").DataTable().ajax.reload()

        }
    })

}

// PROFILE
function AddNewProfile(add_new_profile_fd) {

    var url = getAPI("department", "AddNewProfile")
    var type = "json"
    var data = add_new_profile_fd
    data["profile_summary"] = CKEDITOR.instances["editor1"].getData()
        //console.log(datax)
    server(url, data, type, function(res) {
        if (res.success) {

            $("#profiledt").DataTable().ajax.reload()

        }
    })
}

function EditNewProfile(params) {
    //console.log(edit_new_profile_fd)

    var pstr = input_data(params)

    var url = getAPI("department", "EditNewProfile")
    var type = "json"
    var data = pstr
    data["summary"] = CKEDITOR.instances["editor1"].getData()
        //console.log(datax)
    server(url, data, type, function(res) {
        if (res.success) {

            $("#profiledt").DataTable().ajax.reload()

        }
    })
}

function RenderTestProfile(profile_id) {

    //: destroy the table if it exists
    if (window.test_profiledt) {

        if ($("#test-profiledt").DataTable()) {

            //alert("set")

            $(("#test-profiledt")).DataTable().clear().draw().destroy()

        }

    }

    //alert(profile_id)

    //$("#test-profiledt")
    var url = getAPI("department", "ListTestProfile")

    var options = {
            ajax: {
                url: url,
                type: "post",
                data: {
                    id: profile_id
                }
            }
        }
        // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
    if (!$.fn.DataTable.isDataTable('#test-profiledt')) {
        window.test_profiledt = $("#test-profiledt").DataTable(options)
    }


}
//: ADD MASTERS - HANDLES ANY CLIENT INSERT OPERATION
function RefreshMaster(server_res, master_name, scope) {

    switch (master_name) {

        case "medicine_master":

            if (server_res.success) {
                //: refresh the datatable
                if (scope)
                    scope.master_data = {}
                $("#medicine-master-dt").DataTable().ajax.reload()

            }

            break;

        case "staff_master":
            // alert("callback after adding")
            if (server_res.success) {
                //: refresh the datatable
                if (scope)
                    scope.master_data = {}
                $("#staff-master-dt").DataTable().ajax.reload()

            }

            break;
        case "center_master":

            if (server_res.success) {
                //: refresh the datatable
                if (scope)
                    scope.master_data = {}
                $("#referral-center-master-dt").DataTable().ajax.reload()

            }

            break;
        case "person_master":

            if (server_res.success) {
                //: refresh the datatable
                if (scope)
                    scope.master_data = {}
                $("#referral-person-master-dt").DataTable().ajax.reload()

            }

            break;
        case "guardian_master":

            if (server_res.success) {
                //: refresh the datatable
                if (scope)
                    scope.master_data = {}
                $("#guardian-master-dt").DataTable().ajax.reload()

            }

            break;
        case "patient_master":
            $("#patientdt").DataTable().ajax.reload()
            break

        case "accepted_tests":

            $("#list-accepted-tests").DataTable().ajax.reload()

            break;


    }

}

function DeleteMaster(params) {
    if (confirm("Are you sure ?") == false)
        return
    var get_id = params.split(",")
    var idd = get_id[0]
    var master_name = get_id[1].trim()
        //alert(master_name)
    var url = getAPI("master", "DeleteMaster")
        //alert(url)
    var type = "json"
    var data = {
        id: idd,
        master_name: master_name
    }
    server(url, data, type, function(res) {


            RefreshMaster(res, master_name, null)

        })
        //console.log(idd)

}

function AddMaster(master_name, skips, master_data, api_route, server_method, cb, $scope) {

    //alert(api_route)
    //alert(master_name)
    //alert(cb)
    master_data.master_name = master_name // table_name
    master_data.skips = skips // skip data
    var url = getAPI(api_route, server_method)
        //alert(url)
    var type = "json"
    var data = master_data
    server(url, data, type, function(res) {



        if (cb) {
            RefreshMaster(res, master_name, $scope)
        }
        // LISTEN FOR MASTER
        if (master_name == "accepted_tests" && res.success) {
            window.location.href = "users#!/accept_test_list/Accept Test List"
        }


    })


}
// EDIT PATIENT MASTER
function EditMaster(params, _this) {

    if (params) {

        var func = params.split(",")

        switch (func[1].trim()) {
            case "edit_patient_master":

                var url = getAPI("master", "ListPatientMaster")
                var type = "json"
                var data = {
                    id: func[0]
                }
                server(url, data, type, function(res) {
                    //   console.log(res)
                    // console.log(res[0])

                    dialog("dialogs/edit-patient-master.html", res)
                })

                break
            case "edit_master":

                var url = getAPI("master", "ListMasterByID")
                var type = "json"
                var data = {
                    id: func[0],
                    master_name: func[2]
                }
                var master_dialog = func[3].trim()

                server(url, data, type, function(res) {

                    dialog("dialogs/" + master_dialog + ".html", res)
                })

                break



        }

    }

}

function AddToAcceptTest(params) {

    var _id = params.split(",")
    var idd = _id[0]

    var master = _id[1]
    var url = getAPI("master", "ListMasterByID")
    var data = {
        id: idd,
        master_name: master
    }
    var type = "json"
    server(url, data, type, function(res) {

        // process
        var mobject = Object.keys(res)
        var mval = Object.values(res)
        var dyn_data = ""
        for (var i in mobject) {



            dyn_data += "<div class = 'col-md-2'><b>" + mobject[i].replace("_", " ").toUpperCase() + "</b></div><div class = 'col-md-2'>" + mval[i] + "</div>"


        }
        if (master.trim() == "patient_master") {
            $("#accept-test-info-record").find("#" + master.trim()).html("<button params = '" + master.trim() + "'  func = 'CloseMaster' class = 'pull-right btn btn-sm btn-danger click'><i class = 'fa fa-times'></i></button><button params = '" + idd + ",edit_patient_master'  func = 'EditMaster' class = 'pull-right btn btn-sm bg-blue text-white click'><i class = 'fa fa-edit'></i></button><p><b>" + master.replace("_", " ").toUpperCase() + "</b></p><div class = 'row'>" + dyn_data + "</div>").css({ "border": "1px solid #fff", "padding": "5px" })
                //: STORE FOR PREVIEW
            angular.element(document.body).scope().EmitPreviewHtml($("#accept-test-info-record").find("#" + master.trim()).html(), 'patient_master_view')

        } else {
            var master_dialog = ""
            if (master.trim() == "center_master") {
                master_dialog = "edit-center-master"
            }
            if (master.trim() == "person_master") {
                master_dialog = "edit-referral-person-master"
            }
            if (master.trim() == "guardian_master") {
                master_dialog = "edit-guardian-master"
            }


            $("#accept-test-info-record").find("#" + master.trim()).html("<button params = '" + master.trim() + "'  func = 'CloseMaster' class = 'pull-right btn btn-sm btn-danger click'><i class = 'fa fa-times'></i></button><button params = '" + idd + ",edit_master, " + master.trim() + ", " + master_dialog + "'  func = 'EditMaster' class = 'pull-right btn btn-sm bg-blue text-white click'><i class = 'fa fa-edit'></i></button><p><b>" + master.replace("_", " ").toUpperCase() + "</b></p><div class = 'row'>" + dyn_data + "</div>").css({ "border": "1px solid #fff", "padding": "5px" })

            if (master.trim() == "center_master") {



                var preview_html = $("#accept-test-info-record").find("#" + master.trim()).html()

                angular.element(document.body).scope().EmitPreviewHtml(preview_html, 'center_master_view')

            }

            if (master.trim() == "person_master") {
                angular.element(document.body).scope().EmitPreviewHtml($("#accept-test-info-record").find("#" + master.trim()).html(), 'person_master_view')
            }
            if (master.trim() == "guardian_master") {
                angular.element(document.body).scope().EmitPreviewHtml($("#accept-test-info-record").find("#" + master.trim()).html(), 'guardian_master_view')
            }





        }


        //$("#accept-test-info-record").find("#" + master.trim()).html("<button params = '"+master.trim()+"'  func = 'CloseMaster' class = 'pull-right btn btn-sm btn-danger click'><i class = 'fa fa-times'></i></button><button params = 'edit_master, "+idd+", "+master.trim()+", edit_patient_master'  func = 'EditMaster' class = 'pull-right btn btn-sm bg-blue text-white click'><i class = 'fa fa-edit'></i></button><p><b>" + master.replace("_", " ").toUpperCase() + "</b></p><div class = 'row'>" + dyn_data + "</div>").css({"border": "1px solid #fff", "padding": "5px"})



        $(".ngdialog-close").trigger("click")
        alertSuccess("Record Added")
            //$("."+master.trim()).val(res.code)
        switch (master.trim()) {

            case "patient_master":
                AppScope("master_data", "patient_code", res.code)

                break;
            case "center_master":
                AppScope("master_data", "ref_code_center", res.code)
                break;
            case "person_master":
                AppScope("master_data", "ref_code_person", res.code)
                break;
            case "guardian_master":
                AppScope("master_data", "ref_code_guardian", res.code)
                break;

            default:
                break;
        }

    })


}

function AppScope(prop1, prop2, val) {

    // from my_server controller
    angular.element(document.body).scope().Emit(prop1, prop2, val)
        //angular.element(document.body).scope().$apply()
}

function AddtestToDialog(params) {

    var code = params

    angular.element(document.body).scope().EmitTestToSearch(code)
    $(".ngdialog-close").trigger("click")


}

function CloseMaster(a) {
    // $("."+a).val("")
    switch (a) {

        case "patient_master":
            AppScope("master_data", "patient_code", "")

            break;
        case "center_master":
            AppScope("master_data", "ref_code_center", "")
            break;
        case "person_master":
            AppScope("master_data", "ref_code_person", "")
            break;
        case "guardian_master":
            AppScope("master_data", "ref_code_guardian", "")
            break;

        default:
            break;
    }

    //angular.element(document.body).scope().$apply();
    $("#accept-test-info-record").find("#" + a.trim()).html("").css("border", "none")
}
 
   
// PROCESS TEST - ACCEPT, PREVIEW, PERFORM, APPROVE, PRINT, EMAIL TEST, SMS TEST 
function EditAcceptedTest(params) {
    var id = params
    angular.element(document.body).scope().EmitEditAcceptedTest(id)
} 

function PerformTest(params) {
        //alert(params)
        // load the test from the server
        var url = getAPI("master", "GetTestsToPerform")
        var data = {
            lab_no: params.trim()
        }
        var type = "json"
        server(url, data, type, function (res) {
            //console.log(res)
            
            window.load_perform_test = res
            dialog("dialogs/view-new-performed-test.html", {})
        })

        

}

function PreviewTest(params) {
     $("#modal-id").modal("hide")
     dialog("dialogs/view-new-performed-test-preview.html", {})

}



function ApproveTest(params) {



}

function PrintTest(params) {



}

function EmailTest(params) {



}

function SMSTest(params) {





}

// normalize array
function NormalizeArray(arr, key, key_check, len){
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

// function getEditorValue(){
//     // return "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores ut est quae esse recusandae aspernatur expedita repellendus minima qui accusamus deserunt ratione similique, facilis quisquam iure dignissimos? Aut, consequatur unde?"
// }
//! - - - - - - - - - -- - - - - - -
$(document).on("click", ".click", function() {

    var func = $(this).attr("func")
    var params = $(this).attr("params")
    var fn = window[func]
    if (typeof fn != "function") {
        alert("Not Implemented")
        return
    }
    fn.apply(null, [params, $(this)])

})

$(document).on("change", "[name=dob], #dob", function() {
    var val = $(this).val()
    val = NewAge(val)
    $("[name=age], #age").val(val)
})