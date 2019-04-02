app.controller("PatientMaster", function($scope, $route, $compile){
    

        //! - - - - - - - - - -- - - - - - -LIST PATIENT RECORD
        $(document).ready(function(){

          var url = getAPI("patient", "PatientRecords")

        var options = {
            ajax: {
                url: url,
                type: "post"
            }
        }
        // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
        if ( ! $.fn.DataTable.isDataTable( '#patientdt' ) ) {
            $("#patientdt").DataTable(options)
          }
         



        })               
        
        //! - - - - - - - - - -- - - - - - -
  
    
    
    
    

})
app.controller("DepartmentMaster", function($scope, $rootScope, $route, $compile, ngDialog){
    DepartmentMasterScope($scope)
    //! - - - - - - - - - -- - - - - - -LIST DEPARTMENT RECORD
    $scope.test1 = function(){
        $scope.open_dailog()
    }
    $scope.open_dailog = function() {
        $(".modal-body").load("views/preview-department-master.html",  function(text) {
          
            
            $("#modal-id").modal("show")
            
            $compile($("#modal-id"))($scope);  

      })
    }
   //console.log("master")

    $(document).ready(function(){
   
     var url = getAPI("department", "ListDepartment")

     var options = {
         ajax: {
             url: url,
             type: "post"
         }
     }
//     // {data: [ [name, code, ...], [] ]} = {ajax: url}
    if ( ! $.fn.DataTable.isDataTable( '#departmentdt' ) ) {
        departmentdt = $("#departmentdt").DataTable(options)        
     }
//      //alert()
//      //: compile to angular
//      $compile($("#departmentdt"))($scope);  
     
   })
//    console.log("hdhd")
   //
   
   //DepartmentMaster($scope, null)

//    $scope.preview_department = () => {
    
//     //$rootScope.show_bar = true
//     $(".modal-body").load("views/patient-master.html",  function(text) {
          
            
//             $("#modal-id").modal("show")
            
//             $compile($("#modal-id"))($scope);  

//       })

//     }
   //! - - - - - - - - - -- - - - - - -



})
app.controller("TestMaster", function($scope, $rootScope, $route, $compile, ngDialog){
    TestMasterScope($scope)    
    
    $(document).ready(function(){
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

   if ( ! $.fn.DataTable.isDataTable( '#testlist_dt_dialog' ) ) {
       var profiledt = $("#testlist_dt_dialog").DataTable(options2)
       
     }
     
     var test_id_dt = "#testdt_test"
     selectdt(options, dept_list_dt, dept_list_id,  Render, test_id_dt)

     //: RUN ON SELECTED
     function Render(tab_id, render_id){
     
             //: OPTIONS TO RENDER TEST CATEGORY
             var test_cat_url = getAPI("department", "ListCategory")
             var test_cat_options = {
                 ajax: {
                     url: test_cat_url,
                     type: "post",
                     data: {dept_id: tab_id}
                 }
             }
             //var test_cat_dt = ""
             var test_cat_id = "#categorydt_test"
             if ($.fn.DataTable.isDataTable( test_cat_id ) ) {
          
                test_cat_dt.destroy();
                test_cat_dt = $(test_cat_id).DataTable(test_cat_options)       
              
          }else{
            test_cat_dt = $(test_cat_id).DataTable(test_cat_options) 
          }
          
          //! - - - - - - - - - -- - - - - - -LISTEN
          $(test_cat_id).on( 'click', 'tr', function () {
            
            if ( $(this).hasClass('selected') ) {
               // $(this).removeClass('selected');
            }
            else {
                test_cat_dt.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
            window.test_category_list_dt = test_cat_dt
           $.map(test_cat_dt.rows('.selected').data(), function (item) {
            
                var tab_id = item[4] //  test category id
                 
                RenderTest(tab_id)
               
               
            });
                  
      
      
        } ); 
             

    }
    function RenderTest(cat_id){
        //alert("render test "+cat_id)
       
        var test_url = getAPI("department", "ListTest")
        var test_options = {
            ajax: {
                url: test_url,
                type: "post",
                data: {dept_id: cat_id}
            }
        }
        
        var test_id = "#testdt_test"

        if ($.fn.DataTable.isDataTable( test_id ) ) {
           
           test_id_dt.destroy();
           test_id_dt = $(test_id).DataTable(test_options)       
         
        }else{
        
        
            test_id_dt = $(test_id).DataTable(test_options) 
        }
     

     

    }

    


   })

   //! - - - - - - - - - -- - - - - - -



})

app.controller("ProfileMaster", function($scope, $rootScope, $route, $compile, ngDialog){
    ProfileMasterScope($scope)    
    
    $(document).ready(function(){


        
        //! - - - - - - - - - -- - - - - - -PROFILE LIST
        var url = getAPI("department", "ListProfile")

        var options = {
            ajax: {
                url: url,
                type: "post"
            }
        }
        
        if ( ! $.fn.DataTable.isDataTable( '#profiledt' ) ) {

            var profiledt = $("#profiledt").DataTable(options)
            
          }

          var url2 = getAPI("department", "ListProfileDialog")

          var options2 = {
            ajax: {
              url: url2,
              type: "post"
            }
          }

        if ( ! $.fn.DataTable.isDataTable( '#profiledt_dialog' ) ) {
            var profiledt = $("#profiledt_dialog").DataTable(options2)
            
          }

          $("#profiledt").on( 'click', 'tr', function () {
            
            if ( $(this).hasClass('selected') ) {
               $(this).removeClass('selected');
            }
            else {
                profiledt.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }

           window.profile_dt = profiledt
           $.map(profiledt.rows('.selected').data(), function (item) {
            
                //: destroy the table if it exists
    
                var tab_id = item[4]  // profile id
                // class a function to render the test profile
                RenderTestProfile(tab_id)
               
               
            });
                  
      
      
        } ); 

        //! - - - - - - - - - -- - - - - - -



    })

 })
 app.controller("MedicineMaster", function($scope){

             var url = getAPI("master", "ListMaster")

            var options = {
              ajax: {
                url: url,
                type: "post",
                data: {master_name: "medicine_master"}
              }
            }
            // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
            if (!$.fn.DataTable.isDataTable('#medicine-master-dt')) {
              $("#medicine-master-dt").DataTable(options)
            }
    $scope.master_data = {}
    $scope.AddMaster = function(master_name, skips, master_data, api_route, server_method, callback ){
        AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
    }

})


app.controller("StaffMaster", function($scope){
   // alert("staff master")
    var url = getAPI("master", "ListStaffMaster")

    var options = {
      ajax: {
        url: url,
        type: "post",
        data: {master_name: "staff_master"}
      }
    }
  
    if (!$.fn.DataTable.isDataTable('#staff-master-dt')) {
      $("#staff-master-dt").DataTable(options)
    }
    $scope.master_data = {}
    $scope.AddMaster = function(master_name, skips, master_data, api_route, server_method, callback ){
    AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
    }

})

app.controller("ReferralCenterMaster", function($scope){

    
    $(document).ready(function(){
    var url = getAPI("master", "ListRefCenterMaster")

    var options = {
      ajax: {
        url: url,
        type: "post",
        data: {master_name: "center_master"}
      }
    }
    // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
    if (!$.fn.DataTable.isDataTable('#referral-center-master-dt')) {
      $("#referral-center-master-dt").DataTable(options)
    }
    $scope.master_data = {}
    $scope.AddMaster = function(master_name, skips, master_data, api_route, server_method, callback ){
    AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
    }

    })

})

app.controller("ReferralPersonMaster", function($scope){

    //alert("test ref person")
    $(document).ready(function(){
    var url = getAPI("master", "ListRefPersonMaster")

    var options = {
      ajax: {
        url: url,
        type: "post",
        data: {master_name: "person_master"}
      }
    }
    // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
    if (!$.fn.DataTable.isDataTable('#referral-person-master-dt')) {
      $("#referral-person-master-dt").DataTable(options)
    }
$scope.master_data = {}
$scope.AddMaster = function(master_name, skips, master_data, api_route, server_method, callback ){
AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
}

    })

})
app.controller("GuardianMaster", function($scope){
  $(document).ready(function(){
       // alert("test guardian")
    $(document).ready(function(){

      var url = getAPI("master", "ListGuardianMaster")

      var options = {
        ajax: {
          url: url,
          type: "post",
          data: {master_name: "guardian_master"}
        }
      }
      // {data: [ [code, name, sex, no, ...], [] ]} = {ajax: url}
      if (!$.fn.DataTable.isDataTable('#guardian-master-dt')) {
        $("#guardian-master-dt").DataTable(options)
      }


    })
   
$scope.master_data = {}
$scope.AddMaster = function(master_name, skips, master_data, api_route, server_method, callback ){
AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
}

})

})
app.controller("AcceptTest", function($scope, ngDialog){

  
  var url = getAPI("master", "AcceptTest")
 
  var options = {
    ajax: {
      url: url,
      type: "post",
      data: {master_name: "accepted_tests"}
    }
  }

  if (!$.fn.DataTable.isDataTable('#accepted-test-dt')) {
  $("#accepted-test-dt").DataTable(options)
  }
  $scope.master_data = {}
  $scope.AddMaster = function(master_name, skips, master_data, api_route, server_method, callback ){
    setTimeout(function() {
      // master_data = JSON.stringify(master_data).toString()
      // console.log(master_data)
      //alert("hdhdhdhdh")
      AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
    }, 500);

  
  }

    // ---------------- MODEL ACCEPT TEST
    $scope.master_data = {
      lab_no: "748785858",
      patient_info: "id-of-patient",
      clinical_info: "text of clinical info",
      ref_code_center: "code of ref center",
      ref_code_person: "code of ref person",
      ref_code_guardian: "code of guardian",
      test_info: [
        {type: "test", code: "EXAMPLE-KFC", test_id: "id", test_name: "example-test-name", rate: "20", discount: "0", discount_amount: "0", tax_per: "0", tax_amount: "0", total: "0" }, {type: "profile", code: "EXAMPLE-KFC", test_id: "id", test_name: "example-test-name", rate: "1", discount: "0", discount_amount: "0", tax_per: "0", tax_amount: "0", total: "0" }
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
      receipt_no: this.lab_no


    }

    $scope.Calculate = function(data){
     var _horizontal_total = 0
     var _tax_amount = 0
     var _concession = 0
     var _net_amount = 0
     var _balance = 0
     for(var i in data.test_info){
        var rate = data.test_info[i].rate
        var discount = data.test_info[i].discount
        var discount_amount = data.test_info[i].discount_amount
        var tax = data.test_info[i].tax_per
        var tax_amount = data.test_info[i].tax_amount 
        var total = data.test_info[i].total

        if(! tax){
          tax = 0
        }
        if(isNaN(tax))
        tax = 0

        if(! tax_amount){
          tax_amount = 0
        }    

        if(isNaN(tax_amount))
        tax_amount = 0       

        if(isNaN(discount))
        discount = 0

        if(isNaN(discount_amount))
        discount_amount = 0

        
          //: update discount amount
       
          //data.test_info[i].discount_amount = data.test_info[i].rate*discount
        
       
          //data.test_info[i].discount = data.test_info[i].discount_amount/rate
          // update tax
         
          //data.test_info[i].tax_amount = data.test_info[i].rate*tax

         
          //data.test_info[i].tax_per = data.test_info[i].tax_amount/rate

          data.test_info[i].total = parseFloat(data.test_info[i].rate) - ( parseFloat(data.test_info[i].discount_amount) + parseFloat(data.test_info[i].tax_amount) )
      

        
       // _horizontal_total += data.test_info[i].total
        _tax_amount += parseFloat(data.test_info[i].tax_amount)
        _net_amount += parseFloat(data.test_info[i].rate)
        _horizontal_total += parseFloat(data.test_info[i].total)
     }
     // amount paid
     var amount_paid = 0
     for(var ii in data.pay_channel){
      amount_paid += parseFloat(data.pay_channel[ii].amount)
     }
      data.test_amount = _net_amount
      data.tax_amount = _tax_amount
      data.net_amount = _horizontal_total
      data.balance =  _horizontal_total - amount_paid
      data.amount_paid =  amount_paid
      //: set to full if payment is complete
      if(data.amount_paid > 0){
        data.paid = "Part"
      }
      if(data.balance <= 0){
        data.paid = "Full"
      }
    }

    //: AUTO UPDATER
    var minterval = setInterval(function(){
      //alert("")
      //console.log("ea")
      $scope.Calculate($scope.master_data)
    }, 500);
    $scope.convert_disc = function(rate, test){
     
      test.discount_amount = rate*(test.discount/100) 
    }
    $scope.convert_disc_amt = function(rate, test){
     
      test.discount = test.discount_amount / rate
    }
    $scope.pays = []
    $scope.PayType = function(a){

      
      if($scope.pays.indexOf(a) == -1){
        $scope.pays.push(a)
        $scope.master_data.pay_channel.push({name: a, amount: 0})
      }
      

    }
    $scope.RemovePay = function(i){
      
      $scope.master_data.pay_channel.splice(i, 1)
    }
    $scope.removed_test = []
    $scope.RemoveTest = function(){
      //console.log($scope.master_data.test_info)
      for(var i in $scope.master_data.test_info){
        if($scope.master_data.test_info[i].selected_checkbox){
          $scope.removed_test.push(i)
        }
      }
      for(var i in $scope.removed_test){
      
        $scope.master_data.test_info.splice($scope.removed_test[i], $scope.removed_test.length)
      }
    }

    $scope.Search = function(type, data){
      //alert(data)
      switch(type){

        case "patient_code":
        ngDialog.open({ template: 'views/patient-master.html', className: 'ngdialog-theme-default custom-width', controller: "PatientMaster", closeByNavigation: true});

        break;

        case "ref_code_center":

        ngDialog.open({ template: 'views/center-master.html', className: 'ngdialog-theme-default custom-width', controller: "ReferralCenterMaster", closeByNavigation: true});

        break;
        case "ref_code_person":

      
        ngDialog.open({ template: 'views/ref-master.html', className: 'ngdialog-theme-default custom-width', controller: "ReferralPersonMaster", closeByNavigation: true});

        break;
        case "ref_code_guardian":

        ngDialog.open({ template: 'views/guardian-master.html', className: 'ngdialog-theme-default custom-width', controller: "GuardianMaster", closeByNavigation: true});

        break;

        case "test":
     
        ngDialog.open({ template: 'dialogs/test-list.html', className: 'ngdialog-theme-default custom-width', controller: "TestMaster", closeByNavigation: true});

        break;
        case "profile":
        //alert("profile")
        ngDialog.open({ template: 'dialogs/profile-list.html', className: 'ngdialog-theme-default custom-width', controller: "ProfileMaster", closeByNavigation: true});

        break;

      }
      

    }
  
    $scope.GetLocationCode = function(){

      return "A"
    }
    $scope.get_today = function(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear().toString().substr(-2);
      
      if(dd<10) {
          dd = '0'+dd
      } 
      
      if(mm<10) {
          mm = '0'+mm
      } 
      
      return yyyy+mm+dd;
    }
    $scope.LabNo = function(){
      var url = getAPI("master", "ListTodaySerial")
      var type = "json"
      var today = $scope.get_today()
      var data = {today: today}
     
      server(url, data, type, function (res) {
        var code = $scope.GetLocationCode()
        
        var labno = code+today+res.sno
        $scope.master_data.lab_no = labno
      })
      
     

    }
    $scope.RemoveInfo = function(type, mdata){
     $scope.master_data[mdata] = ""
      
      $("."+type).html("")
    }

})
