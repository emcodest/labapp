app.controller("PatientMaster", function ($scope, $route, $compile, $rootScope) {

  $rootScope.show_bar = true

    $scope.ActivateMode2 = function () {
           
        
        setTimeout(function () {

          $("#patientdt tr td:nth-child(12)").remove()
          $("#patientdt thead tr th:nth-child(12)").remove()
          $("#patientdt tr td:nth-child(11)").remove()
          $("#patientdt thead tr th:nth-child(11)").remove()
          
        }, 200);

    }
    //: COMING FROM NGDIALOG IN ACCEPTTEST CONTROLLER
    if($scope.$parent.show_bar_2){
        $scope.ActivateMode2()
    } 
    // $rootScope.$on('OpenPatientMaster', function(e, args){
    //   $rootScope.show_bar = args
    //   alert(args)
    //   $rootScope.ActivateMode2()

    // });
    

  
  //! - - - - - - - - - -- - - - - - -LIST PATIENT RECORD
  $(document).ready(function () {

    var url = getAPI("patient", "PatientRecords")

    var options = {
      ajax: {
        url: url,
        type: "post"
      }
    }
    // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
    if (!$.fn.DataTable.isDataTable('#patientdt')) {
      $("#patientdt").DataTable(options)
    }
    
    





  })

  //! - - - - - - - - - -- - - - - - -






})
app.controller("DepartmentMaster", function ($scope, $rootScope, $route, $compile, ngDialog) {
  DepartmentMasterScope($scope)
  //! - - - - - - - - - -- - - - - - -LIST DEPARTMENT RECORD
  $scope.test1 = function () {
    $scope.open_dailog()
  }
  $scope.open_dailog = function () {
    $(".modal-body").load("views/preview-department-master.html", function (text) {


      $("#modal-id").modal("show")

      $compile($("#modal-id"))($scope);

    })
  }
  //console.log("master")

  $(document).ready(function () {


    var url = getAPI("department", "ListDepartment")

    var options = {
      ajax: {
        url: url,
        type: "post"
      }
    }

    //     // {data: [ [name, code, ...], [] ]} = {ajax: url}
    if (!$.fn.DataTable.isDataTable('#departmentdt')) {
      departmentdt = $("#departmentdt").DataTable(options)
    }
    //      //alert()
    //      //: compile to angular
    //      $compile($("#departmentdt"))($scope);  

  })
  //    console.log("hdhd")
  //

  //DepartmentMaster($scope, null)

  //    $scope.preview_department = function() {

  //     //$rootScope.show_bar = true
  //     $(".modal-body").load("views/patient-master.html",  function(text) {


  //             $("#modal-id").modal("show")

  //             $compile($("#modal-id"))($scope);  

  //       })

  //     }
  //! - - - - - - - - - -- - - - - - -



})
app.controller("TestMaster", function ($scope, $rootScope, $route, $compile, ngDialog) {
  TestMasterScope($scope)

  $(document).ready(function () {
    //! - - - - - - - - - -- - - - - - -DEPARTMENT
    var url = getAPI("department", "ListDepartment")
    var dept_list_dt = ""
    var dept_list_id = "#departmentdt_test"

    var options = {
      ajax: {
        url: url,
        type: "post"
      }
    }
    var url2 = getAPI("department", "ListTestDialog")

    var options2 = {
      ajax: {
        url: url2,
        type: "post"
      }
    }

    if (!$.fn.DataTable.isDataTable('#testlist_dt_dialog')) {
      var profiledt = $("#testlist_dt_dialog").DataTable(options2)

    }

    var test_id_dt = "#testdt_test"
    selectdt(options, dept_list_dt, dept_list_id, Render, test_id_dt)

    //: RUN ON SELECTED
    function Render(tab_id, render_id) {

      //: OPTIONS TO RENDER TEST CATEGORY
      var test_cat_url = getAPI("department", "ListCategory")
      var test_cat_options = {
        ajax: {
          url: test_cat_url,
          type: "post",
          data: {
            dept_id: tab_id
          }
        }
      }
      //var test_cat_dt = ""
      var test_cat_id = "#categorydt_test"
      if ($.fn.DataTable.isDataTable(test_cat_id)) {

        test_cat_dt.destroy();
        test_cat_dt = $(test_cat_id).DataTable(test_cat_options)

      } else {
        test_cat_dt = $(test_cat_id).DataTable(test_cat_options)
      }

      //! - - - - - - - - - -- - - - - - -LISTEN
      $(test_cat_id).on('click', 'tr', function () {

        if ($(this).hasClass('selected')) {
          // $(this).removeClass('selected');
        } else {
          test_cat_dt.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
        }
        window.test_category_list_dt = test_cat_dt
        $.map(test_cat_dt.rows('.selected').data(), function (item) {

          var tab_id = item[4] //  test category id

          RenderTest(tab_id)


        });



      });


    }

    function RenderTest(cat_id) {
      //alert("render test "+cat_id)

      var test_url = getAPI("department", "ListTest")
      var test_options = {
        ajax: {
          url: test_url,
          type: "post",
          data: {
            dept_id: cat_id
          }
        }
      }

      var test_id = "#testdt_test"

      if ($.fn.DataTable.isDataTable(test_id)) {

        test_id_dt.destroy();
        test_id_dt = $(test_id).DataTable(test_options)

      } else {


        test_id_dt = $(test_id).DataTable(test_options)
      }




    }




  })

  //! - - - - - - - - - -- - - - - - -



})

app.controller("ProfileMaster", function ($scope, $rootScope, $route, $compile, ngDialog) {
  ProfileMasterScope($scope)

  $(document).ready(function () {



    //! - - - - - - - - - -- - - - - - -PROFILE LIST
    var url = getAPI("department", "ListProfile")

    var options = {
      ajax: {
        url: url,
        type: "post"
      }
      
    }

    if (!$.fn.DataTable.isDataTable('#profiledt')) {

      var profiledt = $("#profiledt").DataTable(options)

    }

    var url2 = getAPI("department", "ListProfileDialog")

    var options2 = {
      ajax: {
        url: url2,
        type: "post"
      }
    }

    if (!$.fn.DataTable.isDataTable('#profiledt_dialog')) {
      
      var profiledt_dial = $("#profiledt_dialog").DataTable(options2)

    }

    $("#profiledt").on('click', 'tr', function () {
      
      if ($(this).hasClass('selected')) {
       // alert(99)
        $(this).removeClass('selected');
    } else {
     // alert(990)
      profiledt.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }

      window.profile_dt = profiledt
      //(profiledt.rows('.selected').data().length)
     
      $.map(profiledt.rows('.selected').data(), function (item) {
        
        //: destroy the table if it exists
        var tab_id = item[4] // profile id       
        // class a function to render the test profile
        RenderTestProfile(tab_id)
      });



    });

    //! - - - - - - - - - -- - - - - - -



  })

})
app.controller("MedicineMaster", function ($scope) {

  var url = getAPI("master", "ListMaster")

  var options = {
    ajax: {
      url: url,
      type: "post",
      data: {
        master_name: "medicine_master",
        master_dialog: "edit-medicine-master"
      }
    }
  }
  // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
  if (!$.fn.DataTable.isDataTable('#medicine-master-dt')) {
    $("#medicine-master-dt").DataTable(options)
  }
  $scope.master_data = {}
  $scope.AddMaster = function (master_name, skips, master_data, api_route, server_method, callback) {
    AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
  }

})


app.controller("StaffMaster", function ($scope) {
  // alert("staff master")
  var url = getAPI("master", "ListStaffMaster")

  var options = {
    ajax: {
      url: url,
      type: "post",
      data: {
        master_name: "staff_master",
        master_dialog: "edit-staff-master"
      }
    }
  }

  if (!$.fn.DataTable.isDataTable('#staff-master-dt')) {
    $("#staff-master-dt").DataTable(options)
  }
  $scope.master_data = {}
  $scope.AddMaster = function (master_name, skips, master_data, api_route, server_method, callback) {
    AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
  }

})

app.controller("ReferralCenterMaster", function ($scope, $rootScope) {


$scope.ActivateMode2 = function () {


  setTimeout(function () {

    $("#referral-center-master-dt tr td:nth-child(17)").remove()
    $("#referral-center-master-dt thead tr th:nth-child(17)").remove()
    $("#referral-center-master-dt tr td:nth-child(16)").remove()
    $("#referral-center-master-dt thead tr th:nth-child(16)").remove()
  }, 200);



}
if ($scope.$parent.show_bar_2) {
  $scope.ActivateMode2()
}
  $(document).ready(function () {
    var url = getAPI("master", "ListRefCenterMaster")

    var options = {
      ajax: {
        url: url,
        type: "post",
        data: {
          master_name: "center_master",
          master_dialog: "edit-center-master"
        }
      }
    }
    // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
    if (!$.fn.DataTable.isDataTable('#referral-center-master-dt')) {
      $("#referral-center-master-dt").DataTable(options)
    }
    
    $scope.master_data = {}
    $scope.AddMaster = function (master_name, skips, master_data, api_route, server_method, callback) {
      AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
    }

  })

  $scope.ShowNav = function (a) {
    //alert(a)
    $scope[a] = true
  }

})

app.controller("ReferralPersonMaster", function ($scope, $rootScope) {

  $scope.ActivateMode2 = function () {

    
    setTimeout(function () {
      $("#referral-person-master-dt tr td:nth-child(18)").remove()
      $("#referral-person-master-dt thead tr th:nth-child(18)").remove()
      $("#referral-person-master-dt tr td:nth-child(17)").remove()
      $("#referral-person-master-dt thead tr th:nth-child(17)").remove()

    }, 200);



  }
  if ($scope.$parent.show_bar_2) {
    $scope.ActivateMode2()
  }
  //alert("test ref person")
  $(document).ready(function () {
    var url = getAPI("master", "ListRefPersonMaster")

    var options = {
      ajax: {
        url: url,
        type: "post",
        data: {
          master_name: "person_master",
          master_dialog: "edit-referral-person-master"
        }
      }
    }
    // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
    if (!$.fn.DataTable.isDataTable('#referral-person-master-dt')) {
      $("#referral-person-master-dt").DataTable(options)
    }

    
    $scope.master_data = {}
    $scope.AddMaster = function (master_name, skips, master_data, api_route, server_method, callback) {
      AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
    }

  })
  $scope.ShowNav = function (a) {
    //alert(a)
    $scope[a] = true
  }

})
app.controller("GuardianMaster", function ($scope, $rootScope) {

 $scope.ActivateMode2 = function () {




   setTimeout(function () {

     $("#guardian-master-dt tr td:nth-child(17)").remove()
     $("#guardian-master-dt thead tr th:nth-child(17)").remove()
     $("#guardian-master-dt tr td:nth-child(16)").remove()
     $("#guardian-master-dt thead tr th:nth-child(16)").remove()
   }, 200);



 }

 if ($scope.$parent.show_bar_2) {
   $scope.ActivateMode2()
 }

  // alert("test guardian")
  $(document).ready(function () {

    var url = getAPI("master", "ListGuardianMaster")

    var options = {
      ajax: {
        url: url,
        type: "post",
        data: {
          master_name: "guardian_master",
          master_dialog: "edit-guardian-master"
        }
      }
    }
    // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
    if (!$.fn.DataTable.isDataTable('#guardian-master-dt')) {
      $("#guardian-master-dt").DataTable(options)
    }

   


  })
  $scope.ShowNav = function (a) {
    //alert(a)
    $scope[a] = true
  }

  $scope.master_data = {}
  $scope.AddMaster = function (master_name, skips, master_data, api_route, server_method, callback) {
    AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
  }



})
app.controller("AcceptTest", function ($scope, ngDialog, $rootScope, $location) {

  alert(window.booking_id)
  var url = getAPI("master", "AcceptTest")

  var options = {
    ajax: {
      url: url,
      type: "post",
      data: {
        master_name: "accepted_tests"
      }
    },
    pagLength: 200
  }

  if (!$.fn.DataTable.isDataTable('#accepted-test-dt')) {
    $("#accepted-test-dt").DataTable(options)
  }
  $scope.master_data = {}
  $scope.AddMaster = function (master_name, skips, master_data, api_route, server_method, callback) {
    setTimeout(function () {
      // master_data = JSON.stringify(master_data).toString()
      // console.log(master_data)
      //alert("hdhdhdhdh")
      AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
    }, 500);


  }

  // ---------------- MODEL ACCEPT TEST
  $scope.MasterData = function () {
    return {
      lab_no: "",
      patient_info: "",
      clinical_info: "",
      ref_code_center: "",
      ref_code_person: "",
      ref_code_guardian: "",
      test_info: [
        // {type: "test", code: "EXAMPLE-KFC", test_id: "id", test_name: "example-test-name", rate: "20", discount: "0", discount_amount: "0", tax_per: "0", tax_amount: "0", total: "0" }, {type: "profile", code: "EXAMPLE-KFC", test_id: "id", test_name: "example-test-name", rate: "1", discount: "0", discount_amount: "0", tax_per: "0", tax_amount: "0", total: "0" }
      ],
      total_test: "0",
      test_amount: "0",
      concession: "0",
      home_collection: "No",
      tax_amount: "0",
      net_amount: "0",
      balance: "0",
      paid: "No",
      pay_channel: [],
      //pay_channel: [{name: "cash", amount: "0" }],
      paid_type: "part",
      receipt_no: ""


    }
  }
  $scope.master_data = $scope.MasterData()

  $scope.Calculate = function (data) {
    var _horizontal_total = 0
    var _tax_amount = 0
    var _concession = 0
    var _net_amount = 0
    var _balance = 0
    for (var i in data.test_info) {
      var rate = data.test_info[i].rate
      var discount = data.test_info[i].discount
      var discount_amount = data.test_info[i].discount_amount
      var tax = data.test_info[i].tax_per
      var tax_amount = data.test_info[i].tax_amount
      var total = data.test_info[i].total

      if (!tax) {
        tax = 0
      }
      if (isNaN(tax))
        tax = 0

      if (!tax_amount) {
        tax_amount = 0
      }

      if (isNaN(tax_amount))
        tax_amount = 0

      if (isNaN(discount))
        discount = 0

      if (isNaN(discount_amount))
        discount_amount = 0


      //: update discount amount

      //data.test_info[i].discount_amount = data.test_info[i].rate*discount


      //data.test_info[i].discount = data.test_info[i].discount_amount/rate
      // update tax

      //data.test_info[i].tax_amount = data.test_info[i].rate*tax


      //data.test_info[i].tax_per = data.test_info[i].tax_amount/rate

      data.test_info[i].total = parseFloat(data.test_info[i].rate) - (parseFloat(data.test_info[i].discount_amount) + parseFloat(data.test_info[i].tax_amount))



      // _horizontal_total += data.test_info[i].total
      _tax_amount += parseFloat(data.test_info[i].tax_amount)
      _net_amount += parseFloat(data.test_info[i].rate)
      _horizontal_total += parseFloat(data.test_info[i].total)
    }
    // amount paid
    var amount_paid = 0
    for (var ii in data.pay_channel) {
      amount_paid += parseFloat(data.pay_channel[ii].amount)
    }
    data.test_amount = _net_amount
    data.tax_amount = _tax_amount
    data.net_amount = _horizontal_total
    data.balance = _horizontal_total - amount_paid
    data.amount_paid = amount_paid
    //: set to full if payment is complete
    if (data.amount_paid > 0) {
      data.paid = "Part"
    }
    if (data.balance <= 0 && data.amount_paid > 0) {
      data.paid = "Full"
    }
  }

  //: AUTO UPDATER
  var minterval = setInterval(function () {
    //alert("")
    //console.log("ea")
    $scope.Calculate($scope.master_data)
  }, 500);
  $scope.convert_disc = function (rate, test) {

    test.discount_amount = rate * (test.discount / 100)
  }
  $scope.convert_disc_amt = function (rate, test) {

    test.discount = test.discount_amount / rate
  }
  $scope.pays = []
  $scope.PayType = function (a) {


    if ($scope.pays.indexOf(a) == -1) {
      $scope.pays.push(a)
      $scope.master_data.pay_channel.push({
        name: a,
        amount: 0
      })
    }


  }
  $scope.RemovePay = function (i) {

    $scope.master_data.pay_channel.splice(i, 1)
  }
  $scope.removed_test = []
  $scope.RemoveTest = function () {
    //console.log($scope.master_data.test_info)
    for (var i in $scope.master_data.test_info) {
      if ($scope.master_data.test_info[i].selected_checkbox) {
        $scope.removed_test.push(i)
      }
    }
    for (var i in $scope.removed_test) {

      $scope.master_data.test_info.splice($scope.removed_test[i], $scope.removed_test.length)
    }
  }

  $scope.Search = function (type, data) {


    var s_data = !data ? "" : data
    $rootScope.show_bar = false

    switch (type) {

      case "patient_code":

        $rootScope.show_bar = true
        // check if the search is 1

        var data = {
          code: s_data,
          master_name: "patient_master"
        }
        var url = getAPI("master", "ListMasterByCode")

        var type = "json"
        server(url, data, type, function (res) {

          if (res.length === 1) {

            $scope.master_data.patient_code = res[0].code
            var params = res[0].id + "," + "patient_master"
            AddToAcceptTest(params)


          } else {
          
            
              $scope.show_bar_2 = true
              //$rootScope.$emit('OpenPatientMaster', true);
              //alert("ee")
              ngDialog.open({
                template: 'views/patient-master.html',
                className: 'ngdialog-theme-default custom-width',
                closeByNavigation: true,
                scope: $scope
              });
           
           
            

          }

        })


        break;

      case "ref_code_center":

        $rootScope.show_bar = true

        // check if the search is 1

        var data = {
          code: s_data,
          master_name: "center_master"
        }
        var url = getAPI("master", "ListMasterByCode")

        var type = "json"
        server(url, data, type, function (res) {

          if (res.length === 1) {

            $scope.master_data.ref_code_center = res[0].code
            var params = res[0].id + "," + "center_master"
            AddToAcceptTest(params)


          } else {
            $scope.show_bar_2 = true
            ngDialog.open({
              template: 'views/center-master.html',
              className: 'ngdialog-theme-default custom-width',
              closeByNavigation: true,
              scope: $scope
            });
          }

        })



        break;
      case "ref_code_person":

        $rootScope.show_bar = true
        // check if the search is 1

        var data = {
          code: s_data,
          master_name: "person_master"
        }
        var url = getAPI("master", "ListMasterByCode")

        var type = "json"
        server(url, data, type, function (res) {

          if (res.length === 1) {

            $scope.master_data.ref_code_person = res[0].code
            var params = res[0].id + "," + "person_master"
            AddToAcceptTest(params)


          } else {
            $scope.show_bar_2 = true

            ngDialog.open({
              template: 'views/ref-master.html',
              className: 'ngdialog-theme-default custom-width',
              closeByNavigation: true,
              scope: $scope
            });
          }

        })



        break;
      case "ref_code_guardian":
        $rootScope.show_bar = true
        // check if the search is 1

        var data = {
          code: s_data,
          master_name: "guardian_master"
        }
        var url = getAPI("master", "ListMasterByCode")

        var type = "json"
        server(url, data, type, function (res) {

          if (res.length === 1) {

            $scope.master_data.ref_code_guardian = res[0].code
            var params = res[0].id + "," + "guardian_master"
            AddToAcceptTest(params)


          } else {
            $scope.show_bar_2 = true
            ngDialog.open({
              template: 'views/guardian-master.html',
              className: 'ngdialog-theme-default custom-width',
              closeByNavigation: true,
              scope: $scope
            });
          }

        })



        break;

      case "test":

        ngDialog.open({
          template: 'dialogs/test-list.html',
          className: 'ngdialog-theme-default custom-width',
          controller: "TestMaster",
          closeByNavigation: true
        });

        break;
      case "profile":
        //alert("profile")
        ngDialog.open({
          template: 'dialogs/profile-list.html',
          className: 'ngdialog-theme-default custom-width',
          closeByNavigation: true
        });

        break;

    }


  }

  $scope.GetLocationCode = function () {

    return "A"
  }
  $scope.get_today = function () {
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
  $scope.LabNo = function () {
    var url = getAPI("master", "ListTodaySerial")
    var type = "json"
    var today = $scope.get_today()
    var data = {
      today: today
    }

    server(url, data, type, function (res) {
      var code = $scope.GetLocationCode()

      var labno = code + today + res.sno
      $scope.master_data.lab_no = labno
    })



  }
  $scope.RemoveInfo = function (type, mdata) {
    $scope.master_data[mdata] = ""

    $("." + type).html("")
  }

  $rootScope.$on('AddToAcceptTest', function (event, args) {

    $scope.master_data[args[1]] = args[2]
    if (args[1] == 'patient_code') {
      $scope.master_data.patient_info = args[2]
    }
    $scope.$apply()


  });
  $scope.CheckTestCode = function (arr, code) {
    for (var i in arr) {
      if (arr[i].code.toLowerCase() == code.toLowerCase()) {
        return true
      }
    }
    return false
  }
  $scope.SearchTest = function (data) {

    if (data) {

      var s_data = data // test code or profile code
      var data = {
        code: s_data
      }
      if ($scope.CheckTestCode($scope.master_data.test_info, s_data)) {
        alertError("Code already exist")
        return
      }
      var url = getAPI("master", "ListTestByCode")

      var type = "json"
      server(url, data, type, function (res) {

        if (res.length === 1) {
          var c_test = res[0]

          $scope.master_data.test_info.push({
            type: c_test.test_type,
            code: c_test.code,
            test_id: c_test.id,
            test_name: c_test.name,
            rate: c_test.rate,
            discount: "0",
            discount_amount: "0",
            tax_per: "0",
            tax_amount: "0",
            total: "0"
          })
          $scope.test_code = ""


        } else {
          myalert("Test code or profile does not exist")
        }

      })

    } else {
      myalert("Enter test code or profile")
    }


  }

  $rootScope.$on('EmitTestToSearch', function (event, args) {
    var code = args.trim()

    $scope.SearchTest(code)


  });
  $rootScope.$on('EmitSearchPatient', function (event, args) {
    // var code = args.trim()

    $("#modal-id").modal("hide")
    setTimeout(function () {
      $(".ngdialog-close").trigger("click")
      $scope.Search('patient_code', $scope.master_data.patient_code)

    }, 200);



  });
  $rootScope.$on('EmitSearchMaster', function (event, args) {
    var master = args.trim()

    $("#modal-id").modal("hide")
    setTimeout(function () {
      $(".ngdialog-close").trigger("click")

      if (master == "center_master")
        $scope.Search('ref_code_center', $scope.master_data.ref_code_center)

      if (master == "person_master")
        $scope.Search('ref_code_person', $scope.master_data.ref_code_person)

      if (master == "guardian_master")
        $scope.Search('ref_code_guardian', $scope.master_data.ref_code_guardian)

    }, 200);

  });
  $rootScope.$on('EmitPreviewHtml', function (event, args) {

    //  PREVIEW HTML
    $scope[args[1]] = args[0]
  });

  $scope.clear_form = function () {
    $scope.master_data = $scope.MasterData()
    $("#patient_master, #center_master, #person_master, #guardian_master").html("")
    $scope.LabNo()


  }
  // PREVIEW ACCEPT TEST

  $scope.PreviewAcceptTest = function () {

    // $location.path("/accept_test_preview/Preview Test")
    $scope.PreviewTest = true
  }
  $scope.CancelPreviewAcceptTest = function () {

    if ($scope.master_data.patient_info) {
      $scope.Search('patient_code', $scope.master_data.patient_code)

    }
    if ($scope.master_data.ref_code_center) {
      $scope.Search('ref_code_center', $scope.master_data.ref_code_center)

    }
    if ($scope.master_data.ref_code_person) {
      $scope.Search('ref_code_person', $scope.master_data.ref_code_person)

    }
    if ($scope.master_data.ref_code_guardian) {
      $scope.Search('ref_code_guardian', $scope.master_data.ref_code_guardian)

    }

    $scope.PreviewTest = false
  }





})

app.controller("AcceptTestList", function ($scope, $route, $compile, $rootScope, $location) {


  //! - - - - - - - - - -- - - - - - -LIST PATIENT RECORD
  $(document).ready(function () {

    var url = getAPI("master", "ListAcceptedTests")
    //alert(url)
    var options = {
      ajax: {
        url: url,
        type: "post"
      }
    }
    // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
    if (!$.fn.DataTable.isDataTable('#list-accepted-tests')) {
      $("#list-accepted-tests").DataTable(options)
    }

  })

  

  // END EDIT TEST

  //! - - - - - - - - - -- - - - - - -
  $rootScope.$on('EmitEditAcceptedTest', function (event, args) {
    var id = args
     //alert(id)
     $scope.EditBooking = true
     $location.path("/accept_test/Accept Test")

  });






})
app.controller("AcceptTestUnPartial", function ($scope, $route, $compile, $rootScope, $location) {

  var master_switch = ""
  var mlocate = $location.path()
  var msplit_locate = mlocate.split("\/")
  if(msplit_locate[1].trim() == "approve_tests"){
    master_switch = "ListAcceptedTestsFull_2"
  }else{
    master_switch = "ListAcceptedTestsUnpartial"
  }
  //alert(master_switch)
  //! - - - - - - - - - -- - - - - - -COLORIZE APPROVE TESTS
 
    setInterval(function() {

      ColorTests("list-accepted-tests-unpartial")
      //alert(99)
    }, 1000);
 

  if ($route.current.params.department)
    $scope.department_name = $route.current.params.department
  $scope.ListAcceptedTestsUnpartial = function () {
    $("#list-accepted-tests-unpartial").DataTable().destroy()
    var url = getAPI("master", master_switch)
    // alert(url)
    var options = {
      ajax: {
        url: url,
        type: "post"
      },
      fnDrawCallback: function (oSettings) {


        $('.pop').webuiPopover({
          trigger: "hover",
          closeable: true,
          backdrop: false,
          dismissible: false
        })
      },
      pageLength: 200
    }

    if (!$.fn.DataTable.isDataTable('#list-accepted-tests-unpartial')) {
      $("#list-accepted-tests-unpartial").DataTable(options)
    }

  }


  $(document).ready(function () {

    //: if department ID is sent
    if ($route.current.params.id) {
      //alert($route.current.params.id)
      $scope.SortDepartments($route.current.params.id)
    } else {
      $scope.ListAcceptedTestsUnpartial()
    }

    // Select all elements with data-toggle="popover" in the 
    //$('a').webuiPopover({title:'Title',content:'Content',placement:'bottom', trigger: "hover"});
    // $('a').webuiPopover('show');




  })

  $scope.ListDepartments = function () {

    var url = getAPI("department", "ListDepartmentSelect")
    var data = {}
    var type = "json"

    server(url, data, type, function (res) {

      for (var i in res) {
        $(".list_dept").append("<option value = '" + res[i].id + "'>" + res[i].name + "</option>")
      }
    })

    $(".list_dept").change(function () {
      var dept_id = $(this).val()
      if (dept_id)
        $scope.SortDepartments(dept_id)
      else
        $scope.ListAcceptedTestsUnpartial()
    })


  }
  $scope.ListDepartments()
  $scope.SortDepartments = function (id) {
    var url = getAPI("master", "SortDepartment")
    var data = {
      dept_id: id
    }
    $("#list-accepted-tests-unpartial").DataTable().destroy()
    var options = {
      ajax: {
        url: url,
        type: "post",
        data: data
      },
      fnDrawCallback: function (oSettings) {


        $('.pop').webuiPopover({
          trigger: "hover",
          closeable: true,
          backdrop: false,
          dismissible: false
        })
      },
      pageLength: 200
    }

    if (!$.fn.DataTable.isDataTable('#list-accepted-tests-unpartial')) {
      $("#list-accepted-tests-unpartial").DataTable(options)
    }

    // var type = "json"
    // server(url, data, type, function(res) {

    //   alert(res)

    // })   

  }



  //! - - - - - - - - - -- - - - - - -
  $rootScope.$on('EmitEditAcceptedTest', function (event, args) {
    var id = args
     alert(id)
    $location.path("/accept_test/Accept Test")

  });






})
app.controller("AcceptTestFull", function ($scope, $route, $compile, $rootScope, $location) {

  $(document).ready(function () {

    var url = getAPI("master", "ListAcceptedTestsFull")
    // alert(url)
    var options = {
      ajax: {
        url: url,
        type: "post"
      }
    }

    if (!$.fn.DataTable.isDataTable('#list-accepted-tests-full')) {
      $("#list-accepted-tests-full").DataTable(options)
    }

  })
})

app.controller("PerformTest", function ($scope, $route, $compile, $rootScope, $location) {

  //$scope.ChooseDepartment  = [{name: "Clinical", id: 1}]

  $(document).ready(function () {

    var data = {}
    var url = getAPI("master", "ChooseDepartment")

    var type = "json"
    server(url, data, type, function (res) {
      $scope.show_department = true
      $scope.ChooseDepartment = res
    })



  })
  $scope.GoToUnPartialTest = function (id, name) {

    window.location.href = 'users#!/perform_test_list_dept/Perform Test By Department/' + name + "/" + id

  }

})
app.controller("SettingMaster", function ($scope, $route, $compile, $rootScope, $location) {

  $scope.email_settings = {}
  $scope.sms_settings = {}
  $scope.business_settings = {}
  $scope.upload_settings = {}
  $(document).ready(function () {

    //----------------------

    $("#fileuploader").uploadFile({
      url: "api/upload-file",
      fileName: "myfile"
    });




    //------------------------

    //: fetch all the settings info

    var data = {}
    var url = getAPI("master", "ListSettings")

    var type = "json"
    server(url, data, type, function (res) {

      for (var i in res) {

        var str_val = JSON.parse(res[i].value)

        if (str_val.type == "email") {
          $scope.email_settings = str_val


        }

        if (str_val.type == "sms") {

          $scope.sms_settings = str_val
        }

        if (str_val.type == "business") {
          $scope.business_settings = str_val
        }


      }


    })

    $scope.SaveEmailSettings = function (email_settings) {


      var url = getAPI("master", "AddSettings")
      email_settings.type = "email"
      var data = email_settings
      var type = "json"
      server(url, data, type, function (res) {
        //alert(res)
        // console.log(res)


      })

    }
    $scope.SaveSMS = function (sms_settings) {


      var url = getAPI("master", "AddSettings")
      sms_settings.type = "sms"
      var data = sms_settings
      var type = "json"
      server(url, data, type, function (res) {

        //console.log(res)


      })
    }
    $scope.SaveBusinessSettings = function (business_settings) {

      var url = getAPI("master", "AddSettings")
      business_settings.type = "business"
      var data = business_settings
      var type = "json"
      server(url, data, type, function (res) {

        //console.log(res)


      })

    }
    $scope.SaveUploadLogo = function (logo_settings) {
      //alert(logo_settings)

    }



  })

})