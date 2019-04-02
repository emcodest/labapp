//import { debug } from 'util';

//: NODE JS
// var request = require('request');
// var fs = require('fs');
//: ANGULAR JS
var app = angular.module("myApp", ["ngRoute", "ngDialog", "moment-picker", "ui.bootstrap", "ngSanitize"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/start.html"
    }).when("/masters", {
        
        templateUrl : "views/masters.html"
    })
    .when("/staff_master/staff-master", {
        
        templateUrl : "views/staff-master.html",
        controller: "StaffMaster"
    })
    .when("/patient_master/patient-master", {
        
        templateUrl : "views/patient-master.html",
        controller: "PatientMaster"
    })
    .when("/guardian/guardian-master", {
        
        templateUrl : "views/guardian-master.html",
        controller: "GuardianMaster"
    })
    .when("/upload/upload-master", {
        
        templateUrl : "views/upload-master.html",
        controller: "UploadMaster"
    })
    .when("/center/center-master", {
        
        templateUrl : "views/center-master.html",
        controller: "ReferralCenterMaster"
    })
    .when("/doctor_master/doctor-master", {
        
        templateUrl : "views/doctor-master.html",
        controller: "DoctorMaster"
    })
    .when("/ref/ref-master", {
        
        templateUrl : "views/ref-master.html",
        controller: "ReferralPersonMaster"
    })
    .when("/accept_test/:title", {
        templateUrl : "views/accept-test.html",
        controller: "AcceptTest"
    }).when("/accept_test_preview/:title", {
        templateUrl : "views/accept-test-preview.html"
    }).when("/perform_test/:title", {
        templateUrl : "views/perform-test.html",
        controller: "list_ctrl"
    }).when("/accept_test_list/:title", {
        templateUrl : "views/accept-test-list.html",
        controller: "list_ctrl"
    }).when("/inventory/:title", {
        templateUrl : "views/inventory-master.html"
    }).when("/inventory_setup/:title", {
        templateUrl : "views/inventory-setup.html"
    }).when("/purchase_order/:title", {
        templateUrl : "views/purchase-order.html"
    }).when("/receive_order/:title", {
        templateUrl : "views/receive-order.html"
    }).when("/track_inventory/:title", {
        templateUrl : "views/track-inventory.html"
    }).when("/report/:title", {
        templateUrl : "views/report-master.html"
    }).when("/report_revenue/:title", {
        templateUrl : "views/report-revenue.html"
    }).when("/department_master/:title", {
        templateUrl : "views/department-master.html",
        controller: "DepartmentMaster",
        cache: false
    }).when("/medicine_master/:title", {
        templateUrl : "views/medicine-master.html",
        controller: "MedicineMaster"
    }).when("/social_settings/:title", {
        templateUrl : "views/social-settings.html"
    }).when("/business_settings/:title", {
        templateUrl : "views/business-settings.html"
    }).when("/approve_tests/:title", {
        templateUrl : "views/approve-tests.html"
    }).when("/unit_master/:title", {
        templateUrl : "views/units-master.html"
    }).when("/user_login", {
        templateUrl : "views/user-login.html"
    }).when("/test_master/:title", {
        templateUrl : "views/test-master.html",
        controller: "TestMaster"
    }).when("/profile_master/:title", {
        templateUrl : "views/profile-master.html",
        controller: "ProfileMaster"
    }).when("/manage_assigned_stock/:title", {
        templateUrl : "views/manage-assigned-stock.html"
    }).when("/manage_assigned_stock_profile/:title", {
        templateUrl : "views/manage-assigned-stock-profile.html"
    }).when("/inventory_logs/:title", {
        templateUrl : "views/inventory-logs.html"
    });

    
}).directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                    scope.$apply(function(){
                            scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
            }
        });
    };
}).directive("myForm", function(){
   return {
       templateUrl: "form.html"
   } 
}).directive('myBootForm', function ($compile) {
    return {
               
      restrict: "E",
     replace: true,
      template: '<div class = "col-md-4 col-sm-6"></div>',
      link: function (scope, element, attrs) {
        //: support text
        if(scope.form.type == "text")
        {
            var el = angular.element('<div class = "form-group"><label><b>'+scope.form.placeholder+'</b></label><br><input class = "form-control" type="text" placeholder = "'+scope.form.placeholder+'" data-ng-model = "'+scope.form.model+'"></div>')            
            element.append(el);
            $compile(el)(scope);
         
        }

        //: support textarea
        if(scope.form.type == "textarea")
        {
             var el = angular.element('<div class = "form-group"><label><b>'+scope.form.placeholder+'</b></label><br><textarea class = "form-control" type="text" placeholder = "'+scope.form.placeholder+'" data-ng-model = "'+scope.form.model+'" /></div>')            
            element.append(el);
            $compile(el)(scope);
        }

        //: support select box drop down
        if(scope.form.type == "select")
        {
        
         var el = angular.element('<div class = "form-group"><label><b>'+scope.form.placeholder+'</b></label><br><select class = "form-control" ng-options="option.name for option in '+scope.form.select+'.availableOptions track by option.id" ng-model="'+scope.form.model+'"><option  value = "">--select--</option></select></div>')            
            element.append(el);
            $compile(el)(scope);
        }

        //: custom button and text fied
        if(scope.form.type == "textbtn")
        {
            var el = angular.element('<div class = "form-group form-inline"><label><b>'+scope.form.placeholder+'</b></label><br><input class = "form-control " type="text" placeholder = "'+scope.form.placeholder+'" data-ng-model = "'+scope.form.model+'" ng-enter = "'+scope.form.func+'"> <button class = "my-btn btn-sm" ng-click = "'+scope.form.func+'">search</button></div>')            
            element.append(el);
            $compile(el)(scope);
            
        }

      if(scope.form.type == "date")
        {
     var el = angular.element('<label><b>'+scope.form.placeholder+'</b></label><br><div class="input-group"  moment-picker="'+scope.form.model+'"  format="MM/DD/YYYY"  start-view="year" min-view = "decade"><span class="input-group-addon"> <i></i></span><input class="form-control" placeholder="Select a date" ng-model="'+scope.form.model+'" ng-model-options="{ updateOn: '+"'blur'"+' }" ng-blur="'+scope.form.call_back+'" ng-enter = "'+scope.form.call_back+'"></div>') 
             element.append(el);
            $compile(el)(scope);
                      
          
            
        }

        if(scope.form.type == "datex")
        {
     var el = angular.element('<label><b>'+scope.form.placeholder+'</b></label><br><div class="input-group"  moment-picker="'+scope.form.model+'"  format="MM/DD/YYYY"  start-view="year" min-view = "decade"><span class="input-group-addon"> <i>{{'+scope.form.age+'}} yrs</i></span><input class="form-control" placeholder="Select a date" ng-model="'+scope.form.model+'" ng-model-options="{ updateOn: '+"'blur'"+' }" ng-blur="'+scope.form.call_back+'" ng-change = "'+scope.form.call_back+'" ng-enter = "'+scope.form.call_back+'"></div>') 
             element.append(el);
            $compile(el)(scope);
                      
          
            
        }
        
      }
    }
  }).directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
    
      function link(scope, element, attrs) {
        var format,
            timeoutId;
    
        function updateTime() {
            var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var d = new Date();
            var n = d.getDay();
          element.text(daysOfWeek[n]+", "+dateFilter(new Date(), format));
        }
    
        scope.$watch(attrs.myCurrentTime, function(value) {
          format = value;
          updateTime();
        });
    
        element.on('$destroy', function() {
          $interval.cancel(timeoutId);
        });
    
        // start the UI update process; save the timeoutId for canceling
        timeoutId = $interval(function() {
          updateTime(); // update DOM
        }, 1000);
      }
    
      return {
        link: link
      };
    }]);

//: parent controller
app.controller("my_server", function($scope, $http, $location, $window, $rootScope, $q, ngDialog, R_SERVICE, LAB, $compile){ 
 //! - - - - - - - - - -- - - - - - -#################   VERSION 3
//: detect url change
$scope.$on('$routeChangeStart', function($event, next, current) { 
    // ... you could trigger something here ..
    $rootScope.show_bar = false
    //? userinf
    getUserInfo($scope)

    $scope.panel_title = next.pathParams["title"]

    $scope.TemplateURL(next.templateUrl)

   
    
  
  });
  //! - - - - - - - - - -- - - - - - -
  
  $scope.TemplateURL = function(url){
     
      switch(url){
          case "views/patient-master.html":
               
                
          break;

      }
  }
//! - - - - - - - - - -- - - - - - -
$scope.patient_form = () => {
    
    $rootScope.show_bar = true
    $(".modal-body").load("views/patient-master.html",  function(text) {
          
            
            $("#modal-id").modal("show")
            
            $compile($("#modal-id"))($scope);  

      })

    }

// $scope.patient_form = () => {
    

//     $(".modal-body").load("views/patient-master.html",  function(text) {
//         var el = angular.element(text);            
//             //alert(text)
//             $compile(el)($scope);
            
//             $rootScope.show_bar = true
//         $("#modal-id").modal("show")

//       })
    //alert($("#modal-id").html())
    
    //ngDialog.open({ template: 'views/patient-master.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true, controller: 'PatientMaster'});
//}
$scope.ref_center_form = () => {
    $rootScope.show_bar = true
    ngDialog.open({ template: 'views/center-master.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
}
$scope.ref_person_form = () => {
    $rootScope.show_bar = true
    ngDialog.open({ template: 'views/ref-master.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
}
$scope.guardian_form = () => {
    $rootScope.show_bar = true
    ngDialog.open({ template: 'views/guardian-master.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
}
//! - - - - - - - - - -- - - - - - -
add_new_patient_info($rootScope, "patientdt")


//! - - - - - - - - - -- - - - - - -
    
//! - - - - -END #################   VERSION 3 
   

    $scope.formatDate = (date) => {
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];
      date = new Date(date)
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
  
        return day + ' ' + monthNames[monthIndex] + ', ' + year;
      }
      
    //: format timer
    $scope.format = 'd MMM yyyy h:mm:ss a';

    
    //: post url
    $scope.post_url = 'http://localhost/emcodeweb/electron-post.php'
    //: accept test object
    $scope.accept_test = {}

    //const electron = require("electron");
    //const {ipcRenderer} = electron;
    //: listen to menu navigations
    // ipcRenderer.on("nav", function(e, payload){
       
    //     //alertError("Good to go!")
    //    // alert(window.location.href);     
    //     window.location.href = "#!/"+payload  
      
    // })
    //: view dialog from ipc main
    //  ipcRenderer.on("result-settings-dialog:view", function(){

    //   db.get("result_report_settings", function(err, doc){

    //     if(doc)
    //     {
            
            
    //       $rootScope.result_settings_config = doc.settings
    //     }


    //   })
    //      ngDialog.open({ template: 'dialogs/result-settings.html', className: 'ngdialog-theme-default custom-width', closeByDocument: false, closeByNavigation: true, closeByEscape: true, appendTo: "body" });

    //  })
  //: get user is logged in data
  $scope.is_admin = false

    // ipcRenderer.on("reload:app", function(){
       
    //     //alert("bingo")
    //     //var remote = require("electron").remote
    //    // remote.getCurrentWindow().reload();
    //    const os = require('os');
       
    //    const storage = require('electron-json-storage');
     
       
    //  storage.get('user-logged-in', function(error, data) {
       
    //        if (error) throw error;
    //  //debug(data)
    //        $scope.software_user = data.username+", "+data.f_name
    //        if(data.username == "admin")
    //        {
    //         $scope.is_admin = true
    //        }
    //  })
    //      })


// ipcRenderer.on("software_user:app", function(e, payload){
//       // debug(payload)
//     $scope.software_user = payload.username
      
//     })

//   ipcRenderer.on("initial-setup-is-activated", function(e, payload){
       
//     alert(isEmpty(payload))
      
//     })
  
    
    
    //: ### FUNCTIONAL COOMANDS
    //- ACCEPT TEST COMMANDS
    $scope.accept_test_data = {}  
    $scope.accept_test_data.doc_source = "port-harcout"
    $scope.accept_test_data.doc_branch = "GRA"
    $scope.accept_test_data.doc_branch_code = "01"
    $scope.$on('$routeChangeStart', function($event, next, current) { 
        //: update the software branch
        $scope.accept_test_data.doc_branch_code = "01"
        //: update the lab no.
        $scope.get_lab_no()
      
        
            })
   
    $scope.accept_test_data.patient_id = $scope.accept_test_data.doc_branch_code+"-"+window.uid()
     //: lab no
     $scope.accept_test_data.lab_no = get_today()+"/"+window.uid()
     $scope.change_pay = (p) => {
      
      $rootScope.make_pay = p
     }
   
     //: get lab no. 4  d day
     $scope.get_lab_no = () => {
        // db.find({
        //     selector: {table_name: "perform_the_test",
        //  today: {"$eq": get_today()}
        // }
        //   }).then(function (result) {
        //       var mmlen = result.docs.length + 1
        //     $scope.accept_test_data.lab_no = get_today()+mmlen
        //   })

    }
    $scope.today_date = get_today()
    
    
    $scope.accept_test = function(){
        
//        //: start with lab no. for today
//         db.find({
//             selector: {table_name: "perform_the_test",
//          today: {"$eq": get_today()}
//         }
//           }).then(function (result) {
//             var mmlen = result.docs.length + 1
//             $scope.accept_test_data.lab_no = get_today()+mmlen
//              //: validations
//            //: check if there is a patient
//            //: get the code id of the patient
//            if(! $rootScope.patient_data_ui)
//            {
//                alertError("Please add a patient in New Booking button.")
//                return
//            }
           
      
//        R_SERVICE.get_doc($rootScope.patient_data_ui.id).then(function(res){
           
//            // required checks
//           //: check if there are no tests 
//            if(! $rootScope.table_test_list)
//            {
//                alertError("Please add test")
//                   return
//            }

//            //: make sure there is test
//            if($rootScope.table_test_list.length < 1)
//            {
//                alertError("Please enter a test")
//                return
//            }
//            //: now check if lab no is entered
//             if(! $scope.accept_test_data.lab_no)
//             {
//                  alertError("Please enter lab number")
//                   return
//             }
// //debug($scope.accept_pay)
//             //: now check if payment is made
           
//             if(! $rootScope.make_pay)
//             {
//               alertError("Please accept payment")
//                   return
//             }

//             if($rootScope.make_pay == "No")
//             {
//               alertError("Please accept payment")
//                   return
//             }



//             // optional checks
// //-  get referred by center
// //- get referred by person
// // - i.e ref data
// //debug($rootScope.patient_data_ui)
// //debug($rootScope.ref_data_ui)
// //debug($scope.table_test_list)
// //debug($scope.accept_test_data.paid)

// //: iterate the test and deplete stock - create a depletion log
// // - log - test code, date, amount,
// //var inventory_log = {perform_test_code: "some id", test_type: "department_master_test_list", "test_code": "hbc", date: new Date().toJSON(), branch_code: $scope.accept_test_data.doc_branch_code, inventory_code: "mcode", qty: "12"}
// var inventory_log = []

//       for(var i in $rootScope.table_test_list)
//       {
          
//        var ptest_code = $scope.accept_test_data.doc_branch_code+"_"+window.uid()

//           var slist = $scope.get_stock_assigned_per_branch  ($scope.accept_test_data.doc_branch_code, $rootScope.table_test_list[i].stock_list)

//           for(var y in slist)
//           {
//              inventory_log.push({_id: ""+new Date().toJSON(), perform_test_code: ptest_code, test_type: $rootScope.table_test_list[i].id, test_code: $rootScope.table_test_list[i].code, date: new Date().toJSON(), branch_code: $scope.accept_test_data.doc_branch_code, inventory_code: slist[y].code, qty: slist[y].qty, test_performed: "nill", table_name: "inventory_log"})      
//           }
//           //debug(slist)
//       }
//      //: log the inventory to deduct
//       bulk_doc(inventory_log)

//      //: accept the test
//   //    var accepted_the_test = {
//   //       _id:"patient_"+$rootScope.patient_data_ui.id,
//   //       table_name: "accept_the_test",
//   //       accepted_tests: [],
//   //       performed_tests: [],
//   //       emailed_tests: [],
//   //       printed_tests: []
//   // }
//      db.get(""+"patient_"+$rootScope.patient_data_ui.id, function(err, doc) {
        
      

//       //: tests to perform 
//       var tests_to_performo = {

//         _id: ""+new Date().toJSON(),
//         table_name: "perform_the_test",
//         today: ""+get_today(),
//         lab_no: $scope.accept_test_data.lab_no,
//         patient_id: $rootScope.patient_data_ui.id, 
//         my_doc: [{patient: $rootScope.patient_data_ui}, {ref_center: $rootScope.ref_data_ui}, {ref_person: ""}, {test: $rootScope.table_test_list}],
//         tests: $rootScope.table_test_list,
//         branch_code: $scope.accept_test_data.doc_branch_code,
//         perform_test_code: ptest_code,
//         paid: $rootScope.make_pay,
//         accept_pay: $scope.accept_pay,
//         clinical_info: "No clinical information"      

//       }

//       //: attach clinical info if selected
//       //$scope.is_clinical_box_data = $("#is_clinical_box_data").val()
//       $scope.is_clinical_box_data = $rootScope.is_clinical_box_data_x
      

//       if($scope.is_clinical_box_data)
//       {
         
       
//           tests_to_performo.clinical_info = $scope.is_clinical_box_data
//       }
   
   
//     if($rootScope.ref_data_ui)
//       {
//           if($rootScope.ref_data_ui.attached_ref)
//           {
//             tests_to_performo.my_doc[2].ref_person = $rootScope.ref_data_ui.attached_ref
//           }
        
//       }

//        add_doc2(tests_to_performo);
      
//     //$scope.closeThisDialog()
//    //ngDialog.open({ template: 'dialogs/print-receipt.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
//    //reset payment
//       $scope.accept_pay =  []
//       $rootScope.make_pay =  "No"
//       $scope.accept_test_data.pay_type = ''
//       $scope.clear_form()
//      $location.path("/accept_test_list/Accept Test List")
    


//     })
    

//        }, function(err){
//            alertError("Please select add a patient")
//            return
//        })
       
       

//      }) 
        
       
    }
//: print receipt dialog
$rootScope.a4_receipt = {}
$rootScope.print_receipt_dialog = function(item){
  //log(item)
  log(item)
  $rootScope.a4_receipt.lab_no = item.lab_no
  $rootScope.a4_receipt.date = custom_format(new Date().getTime())
  var pbio = R_SERVICE.get_patient_bio(item.my_doc[0].patient.data)
  $rootScope.a4_receipt.full_name = pbio.name
  $rootScope.a4_receipt.age = pbio.age
  $rootScope.a4_receipt.sex = pbio.sex
  $rootScope.a4_receipt.tests = item.tests

   ngDialog.open({ template: 'dialogs/print-receipt.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});

}

//: get the stocks assigned per branch
$scope.get_stock_assigned_per_branch = (code, stock_list) => {
    var mcodes = []
   
       for(var i in stock_list)
       {
           if(stock_list[i].branch_code)
           {
               if(stock_list[i].branch_code == code)
               {
                   mcodes.push(stock_list[i])
               }
           }
       }
     return mcodes
}


  
     //: select department
     $scope.select_department = function(id){
        $scope.department_master_data = {}
        db.get(""+id, function(err, doc) {
            
            if(doc)
            {
               
                $scope.department_master_data = doc.my_doc
                 $scope.department_master_data._rev = doc._rev
            }
            
            
            if (err) { 
        
               alert("Department not found")
            
            }
          
        
          });
        

     }

   //: select department cat test list
     //: select department tests
     $scope.test_sel_status = false
     $scope.select_department_test_catlist = (id) => {
        
         //: find the name in test cat list.
         for(var i in $scope.department_test_cat_list)
         {
             
             //: get the code if matched find the the list cat in dep
            // $scope.department_id = ""
             if($scope.department_test_cat_list[i].id == id)
             {

                //: now do a search of all test in this cat
                 $rootScope.department_test_list = []
                 $rootScope.department_catlist_id = id
                
                 $scope.dep_test_catlist_name = $scope.department_test_cat_list[i].name
                 //: find the tests test cats           
                  $scope.department_test_list_fxn()
              
 
                    
               
             }
         }

         $scope.test_sel_status = true
      
     }
    
    //: delete department
    $scope.delete_department = (id) =>{

        if(confirm("Are you sure?") == false){
          return
        }
        db.get(id).then(function (doc) {
          alertSuccess("completed.")
        db.remove(doc._id, doc._rev);
     
         for(var i in $scope.department_list)
         {
            if($scope.department_list[i].id == id)
            {
              $scope.department_list.splice(i, 1)
            }
         }
         
         return false
        });
    }
       
       $scope.edit_test_cat = (id) => {
        db.get(id, function(err, doc){
          if(doc)
          {

            $rootScope.edit_test_category_fd = {}
       
            $scope.edit_test_category_fd.code = doc.my_doc.code 
            $scope.edit_test_category_fd.name = doc.my_doc.name 
           
              ngDialog.open({ template: 'dialogs/save-test-category.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});

          }
        })
       
       }

       $scope.edit_new_category = () =>{

        

        if(! $scope.edit_test_category_fd.code)
        {
            alertError("Empty code")
            return
        }

        if(! $scope.edit_test_category_fd.name)
        {
            alertError("Empty name")
            return
        }

        if(! $rootScope.department_id)
        {
            alertError("Please select department ID ")
            return
        }
       // debug($scope.add_new_category_fd)
       // $scope.add_new_category_fd
        var table_name = "department_master_test_cat"
       
        var _id = table_name+"_"+$scope.edit_test_category_fd.code.toUpperCase()

      
        $scope.edit_test_category_fd.id = _id
        db.get(_id, function(err, doc){
          if(doc)
          {
        $scope.edit_test_category_fd.sno =  doc.my_doc.sno
        var table = {
            _id: ""+_id,
            _rev: doc._rev,
            table_name: table_name,
            department_id: $rootScope.department_id,
            my_doc: $scope.edit_test_category_fd
          }
           
            add_doc2(table);

            $scope.$emit('pushChanges', table.my_doc);
       

          }

        })
   
           

       }

    //: delete test cat
    $scope.delete_test_cat = (id) => {

        if(confirm("Are you sure?") == false){
          return
        }
        db.get(id).then(function (doc) {
          alertSuccess("completed.")
        db.remove(doc._id, doc._rev);
     
         for(var i in $scope.department_test_cat_list)
         {
            if($scope.department_test_cat_list[i].id == id)
            {
              $scope.department_test_cat_list.splice(i, 1)
            }
         }
         
         return false
        });
    }
    

    //: generate forms
    //: hold form input
    $rootScope.custom_static_form_patient = []
    $rootScope.custom_static_form_refcenter = []
    $rootScope.custom_static_form_refperson = []
    //:  direct description
     $rootScope.custom_static_form_patient_desc = "Patient Data"
    $rootScope.custom_static_form_refcenter_desc = "Referral Center"
    $rootScope.custom_static_form_refperson_desc = "Referral Person"
    //: hold  custom list
     $rootScope.custom_static_form_patient_list = []
    $rootScope.custom_static_form_refcenter_list = []
    $rootScope.custom_static_form_refperson_list = []
    $scope.mLab = {}
    $scope.mLab.patient_custom_data = LAB.patient_custom_data
    $scope.mLab.patient_custom_field = LAB.patient_custom_field
    

    //: accept test form
    //{placeholder: "Patient ID", model: "accept_test_data.patient_id", type: "textbtn", func: "custom_form_data(accept_test_data.patient_id, custom_static_form_patient, custom_static_form_patient_desc, custom_static_form_patient_list, true,'"+LAB.patient_custom_data+"', '"+LAB.patient_custom_field+"' )"},
    // {placeholder: "Date of birth", model: "accept_test_data.birthday", type: "datex", call_back: "calc_age()", age: "accept_test_data.age"}

    $scope.accept_test_form = [{placeholder: "Lab No.", model: "accept_test_data.lab_no", type: "text"}, {placeholder: "Referred By Center Code", model: "accept_test_data.referred_by_center_id_code", type: "textbtn", func: "custom_form_data(accept_test_data.referred_by_center_id_code, custom_static_form_refcenter, custom_static_form_refcenter_desc, custom_static_form_refcenter_list, false, '"+LAB.ref_center_custom_data+"', '"+LAB.ref_center_data_custom_fields+"')"}, {placeholder: "Referred By Person Code", model: "accept_test_data.referred_by_person_name", type: "textbtn",  func: "custom_form_data(accept_test_data.referred_by_person_name, custom_static_form_refperson, custom_static_form_refperson_desc, custom_static_form_refperson_list, false, '"+LAB.ref_person_custom_data+"', '"+LAB.ref_person_data_custom_fields+"')"}]

    $rootScope.$watch('patient_data_ui', function() {
        if($rootScope.patient_data_ui)
        {
            db.get(""+$rootScope.patient_data_ui.id, function(err, doc) {
                
                if(doc)
                {
                    if(doc.birthday)
                    {
                        var age = calculateAge(doc.birthday)
                    
                        $scope.accept_test_data.birthday = doc.birthday
                        $scope.accept_test_data.age = doc.age
                   
                    if(age != doc.age) 
                    {
                          
        var table_doc = {
            _id: doc._id,
            table_name: LAB.patient_custom_data,
            my_doc: doc.my_doc,
            _rev: doc._rev, 
            new_edits: false,
            age: age,
            birthday: doc.birthday
          } 
          for(var i in doc.my_doc)
          {
             
              if(doc.my_doc[i].name == "Age")
              {
                 //: updated age
                  doc.my_doc[i].val = age
               
              }

          }
          add_doc2(table_doc);
         
          $rootScope.patient_data_ui.id = doc._id

          $rootScope.patient_data_ui.data = doc.my_doc   
          
          
                    } 

                    }
            
                }

            })
         
            
        }

    });
    $rootScope.get_age_number = (birthday) => {
      return  calculateAge(birthday)
    }
     $scope.calc_age = function(){
         if(! $rootScope.patient_data_ui)
         {
             alertError("Add a patient first")
             return
         }
         //: update the date of birth and age of the patient
         
         var age = calculateAge($scope.accept_test_data.birthday)
      
           $scope.accept_test_data.age = age
           if(isNaN($scope.accept_test_data.age))
           {
               alertInfo("please select age")
               return
           }
           db.get(""+$rootScope.patient_data_ui.id, function(err, doc) {
            
            if(doc)
            {
             //   $rootScope.data_form._rev = doc._rev 
             doc.age = $scope.accept_test_data.age
             doc.birthday = $scope.accept_test_data.birthday
             var found_rec = false
             var found_rec2 = false
             for(var i in doc.my_doc)
             {
                 if(doc.my_doc[i].name == "Birthday")
                 {
                     found_rec = true
                     doc.my_doc[i].val = $scope.accept_test_data.birthday
                 }
                 if(doc.my_doc[i].name == "Age")
                 {
                     found_rec2 = true
                     doc.my_doc[i].val = $scope.accept_test_data.age
                 }

             }
             if(found_rec == false)
             {
                doc.my_doc.push({name: "Birthday", type: "text", val: $scope.accept_test_data.birthday}) 
             }
             if(found_rec2 == false)
             {
                doc.my_doc.push({name: "Age", type: "text", val: $scope.accept_test_data.age}) 
             }
             
            
        var table_doc = {
                _id: doc._id,
                table_name: LAB.patient_custom_data,
                my_doc: doc.my_doc,
                _rev: doc._rev, 
                new_edits: false,
                age: $scope.accept_test_data.age,
                birthday: $scope.accept_test_data.birthday
              } 
              add_doc2(table_doc);
              $rootScope.patient_data_ui.id = doc._id
              $rootScope.patient_data_ui.data = doc.my_doc  
            }
        })
     }
   

    //: department master
    $scope.department_master_data = {}
    
    $scope.department_master_form = [{placeholder: "Code", model: "department_master_data.code", type: "text"}, {placeholder: "Department Name", model: "department_master_data.department_name", type: "text"}]
    //: generate select select binding
    $scope.prefix_title_data = {
        availableOptions: [
          {id: 'Mr.', name: 'Mr'},
          {id: 'Mrs.', name: 'Mrs'},
           {id: 'Miss.', name: 'Miss'},
           {id: 'Dr.', name: 'Dr'},
           {id: 'Engr.', name: 'Engr'},
           
        ]
    }
    //: sex/gender
    $scope.prefix_select_data = {
        availableOptions: [
          {id: 'F', name: 'Female'},
          {id: 'M', name: 'Male'}
        //   {id: '3', name: 'Option C'}
        ],
        selectedOption: {id: '3', name: 'Option C'} 
        //This sets the default value of the select in the ui
        };
        //: report type
         $scope.report_type_select = {
        availableOptions: [
          {id: 'tabular', name: 'Tabular'},
          {id: 'paragraph', name: 'Paragraph'}       
        ]
        };
        //: end here


        //: end generate forms
//: ### FUNCTIONS
    //: scope functions - with naming conventions
    //: list departments 
    //$scope.department_list = []
 //$rootScope.department_test_cat_list = []
 $scope.$on('pushChanges', function( event, data ){
     $rootScope.department_test_cat_list = []
    $scope.department_test_cat_list_fxn()
  });
  $scope.$on('pushChanges_2', function( event, data ){
     $rootScope.department_test_list = []
    $scope.department_test_list_fxn()
  });
    //: test lists
    // $scope.department_test_list = []
    $scope.list_departments = function(){
        //: get the list of departments
      $scope.department_list = [] // refresh
       
    //     $scope.spinner = 0
    //     db.find({
    //        selector: {table_name: "department_master"},
    //    sort: [{'_id': 'asc'}],
    //       include_docs: true,
    //        attachments: true, 
    //        limit: 1000
    //      }).then(function (result) {
           
    //        result.docs.map(function(row) { 
             
    //         // debug(row.my_doc)
    //         $scope.department_list.push(row.my_doc)
          
           
    //        })
    //        $scope.spinner = 1
    //    })


    }
    $scope.list_departments()

    //: go home
    $scope.home = function(){
      // $location.path("/")
        window.history.back()
      // $scope.clear_form()
    }
    $scope.homex = function(){

           $location.path("/")         
         $scope.clear_form()
      }
    $scope.exitApp = function(){
        $window.close();
    }
        //: testing
        $scope.test = function(){
            alert("get all doc")
            get_docs()
        }
        $scope.test2 = function(){
            alert("create test data")
            createTable("tests", _id())
        }
        $scope.deleteAll = function(){
            db_doc_delete()
        }

        //: logout
        $scope.logout = function(){
           
            //    if(confirm("Are you sure you want to logout?") == false)
            //    return
            //  ipcRenderer.send("logged_out:app");
            window.location.href = "/users/logout"
          
        }
        //: get free available com port
    $scope.get_free_com_port = function(){

        const getPort = require('get-port');
        
       getPort().then(port => {
           alert(JSON.stringify(port));
         
       });
    }
//: upload file to remote
    $scope.upload_file = function(){
        var formData = {
            // Pass a simple key-value pair
            post_file: 'yes',
            // Pass data via Buffers
           // my_buffer: new Buffer([1, 2, 3]),
            // Pass data via Streams
           // my_file: fs.createReadStream(__dirname + '/unicycle.jpg'),
            // Pass multiple values /w an Array
            //attachments: [
             // fs.createReadStream(__dirname + '/attachment1.jpg'),
             // fs.createReadStream(__dirname + '/attachment2.jpg')
            //],
            // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
            // Use case: for some types of streams, you'll need to provide "file"-related information manually.
            // See the `form-data` README for more information about options: https://github.com/form-data/form-data
            custom_file: {
              value:  fs.createReadStream(__dirname+'/report-uploads/LabReport_180116011_EMANOVWEEMMANUEL.pdf'),
              options: {
                filename: 'LabReport_180116011_EMANOVWEEMMANUEL.pdf',
                contentType: 'application/pdf'
              }
            }
          };
          request.post({url:'http://localhost/emcodeweb/electron-nodejs-upload.php', formData: formData}, function optionalCallback(err, httpResponse, body) {
            if (err) {
              return console.error('upload failed:', err);
            }
            console.log('Upload successful!  Server responded with:', body);
            alert(JSON.stringify(body))
          });
    }
//: order save

$scope.order_arrangement = []
  $scope.save_order_to_profile = () => {
   


    db.get($scope.profile_list_id, function(err, doc){

      if(doc)
      {

        var arranged = []
        
        var order = 999
       

        for(var ii in $scope.order_arrangement)
        {

            //debug($scope.order_arrangement[ii])
             if($scope.order_arrangement[ii].order)
             {
            
          
          order = $scope.order_arrangement[ii].order

          var name = ""

          if($scope.order_arrangement[ii].name)
          {
            name = $scope.order_arrangement[ii].name.split("_").pop().toUpperCase()

          }else{

            name = $scope.order_arrangement[ii].code.toUpperCase()
          }

                    
         
                 
          arranged.push({order: order, name: LAB.test_table+"_"+name})

             }else{
              

              $scope.order_arrangement[ii].order = parseInt(ii) + 1
              if($scope.order_arrangement[ii].code)
              {
                  $scope.order_arrangement[ii].name = LAB.test_table+"_"+$scope.order_arrangement[ii].code.toUpperCase()
                }else{
                  var ccode = $scope.order_arrangement[ii].name.split("_").pop().toUpperCase()
                   $scope.order_arrangement[ii].name = LAB.test_table+"_"+ccode
                }
            

              arranged.push({order: $scope.order_arrangement[ii].order, name: $scope.order_arrangement[ii].name})
             }

            
        }

     //  debug($scope.order_arrangement)       
      //  debug($scope.order_arrangement)
      

     arranged =   arranged.sort(function(a, b){

      if(parseInt(a.order) < parseInt(b.order))
       return -1
      if(parseInt(a.order) > parseInt(b.order))
      return 1
    return 0
         
         })


     var nprof = []

     for(var a in arranged)
     {
        // for(var i in doc.my_doc.profiled_tests)
        // {
          
        //   if(nprof.indexOf(doc.my_doc.profiled_tests[i]) == -1 && arranged[a].name == doc.my_doc.profiled_tests[i])
        //    {
        //       nprof.push(arranged[a].name)
        //   }
        // }
        nprof.push(arranged[a].name)
     }
    // debug(nprof.length)
       
      doc.my_doc.profiled_tests = nprof
     var table2 = {
      _id: $scope.profile_list_id,
      new_edits: doc.new_edits,
      _rev: doc._rev,
      my_doc: doc.my_doc,
      table_name: "profile_master",
      profiled_tests_order: arranged
     }
 //debug(arranged)
    add_doc2(table2)
    $scope.profile_test_list_fxn()



      }
      if(err)
      {
        alert("Not found")
      }

    })

  //  debug($scope.profile_test_list[0])
  // $scope.order_arrangement.map(function(row){
  //  debug(row)
  // })
   
    // var ee = [{name: "PCV", order: 2}, {name: "RBC", order: 1}] 
    
    // debug(ee.sort(function(a, b){
    //   if(a.order < b.order)
    //     return -1
    //   if(a.order > b.order)
    //     return 1
    //   return 0
         
    // }))  


  }
   //: medicine master
      $scope.medicine_master = {}
     
      $scope.add_medicine = function(){

        if(! $scope.medicine_master.med_code)
        {
          alertError("Please enter code");
          return
        }
         if(! $scope.medicine_master.med_name)
        {
          alertError("Please enter name");
          return
        }

        var ccode = $scope.medicine_master.med_code.toUpperCase() 
        var table = {
      _id: "medicine_master_"+ccode,
      name: $scope.medicine_master.med_name,
      code: ccode,
      group: $scope.medicine_master.med_group,
      table_name: "medicine_master"   
     }
     add_doc2(table)
    $scope.medicine_master_list()
       $scope.medicine_master = {}
      }
      $scope.medicine_master_list = function(){
       


      }
     $rootScope.selected_medicine_list = []
     $scope.sel_med_model = {}
      $rootScope.select_medicine = function(){
       // debug($scope.sel_med_model)
        if(! $scope.sel_med_model)
        {
          alertError("Select a valid medicine")
          return
        }
        if(check_object_index($rootScope.selected_medicine_list, $scope.sel_med_model.name) == false)
        {
           $rootScope.selected_medicine_list.push($scope.sel_med_model)
        }

        $scope.add_new_test_fd.selected_medicine_list = $rootScope.selected_medicine_list
      
      }

        $rootScope.remove_medicine_item = function($index, ar){
          
           for(var i in ar)
           {
              if(i == $index)
              {
                ar.splice(i, 1)
              }

           }

            $scope.add_new_test_fd.selected_medicine_list = ar  
          
          }

      //: get a culture test
      $rootScope.get_a_culture = function(id, m){

        return $q(function(resolve, reject) {
        db.get(""+id, function(err, doc){
          if(doc)
          {
           m.med_lists = doc.my_doc.selected_medicine_list
          
          }
          if(err)
          {
            reject("Error")
          }

        })
        })

       
      }

     


    //: add test to profile
    $scope.add_test_to_profile = function(){
       
         ngDialog.open({ template: 'dialogs/test-profile.html', className: 'ngdialog-theme-default custom-width', closeByDocument: false, closeByNavigation: true, closeByEscape: true, appendTo: "body" });
    }

     $scope.add_test_to_list = function(){
       
         ngDialog.open({ template: 'dialogs/test-list.html', className: 'ngdialog-theme-default custom-width', closeByDocument: false, closeByNavigation: true, closeByEscape: true, appendTo: "body"});
    }

      $scope.add_profile_to_list = function(){
       
         ngDialog.open({ template: 'dialogs/profile-list.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: false, closeByDocument: false, closeByNavigation: true, closeByEscape: true, appendTo: "body"});
    }
    //: create new test
    $scope.add_new_profile = function(){
        ngDialog.open({ template: 'dialogs/add-profile.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true });
    }

    $scope.add_new_test_category = () => {
         ngDialog.open({ template: 'dialogs/add-new-category.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
    }
    $scope.add_new_test_ui = () => {
        
        ngDialog.open({ template: 'dialogs/new-test.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
   }
   //: preview accept test record
    $scope.preview_test_record = () => {
         $location.path("/accept_test_preview/Preview Accept Test")
       // ngDialog.open({ template: 'dialogs/preview-accept-test.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
   }
   $rootScope.test_references = []
   $rootScope.test_references_fxn = () => {

    var code = $rootScope.view_test_fd.code.toUpperCase()
   // alert(""+LAB.test_table+"_"+code)
    db.get(""+LAB.test_table+"_"+code, function(err, doc) {
        
        if(doc)
        {

          //  debug(doc)
            //:  found and ref not found
            if(! doc.ref)
            {
             $rootScope.test_references.push({"age_range_1":"1", "age_range_2":"2","formula_1":"","formula_2":"","lower_bound_1":"", "lower_bound_2":"","month_years":"","sex":"","unit_1"
    :"","unit_2":"","upper_band_1":"","upper_band_2":""})   
            }

            if(doc.ref)
            {
               $rootScope.test_references = doc.ref
               if(confirm("Do you want to add new reference?") == true)
               {
                 $rootScope.test_references.push({"age_range_1":"1", "age_range_2":"2","formula_1":"","formula_2":"","lower_bound_1":"", "lower_bound_2":"","month_years":"","sex":"","unit_1"
               :"","unit_2":"","upper_band_1":"","upper_band_2":""})  
               }
               
            }

        }


    })

    // $rootScope.test_references.push({"age_range_1":"1", "age_range_2":"2","formula_1":"","formula_2":"","lower_bound_1":"", "lower_bound_2":"","month_years":"","sex":"","unit_1"
    // :"","unit_2":"","upper_band_1":"","upper_band_2":""})

    //console.log($rootScope.test_references)


   }
   $scope.reference_range_ui = function(){
     $rootScope.ref_range_sex = {}
     //: check if test exist before adding reference
     if(! $scope.view_test_fd.code)
     {
         alertError("Please add test first")
         return
     }
     alert($scope.view_test_fd.code)
      ngDialog.open({ template: 'dialogs/reference-ranges.html', className: 'ngdialog-theme-default custom-width', closeByDocument: false, closeByNavigation: true, closeByEscape: true, appendTo: "body" });
 }
    //: department cat list function
    $scope.show_view_all_dep_test_cat = false
$scope.view_all_department_test_cat_list_fxn = () => {
    $rootScope.department_test_cat_list = []
    $scope.department_test_cat_list_fxn()
    $scope.show_view_all_dep_test_cat = true
}
    $scope.department_test_cat_list_fxn = () => {
       
        // db.find({
        //     selector: {table_name: "department_master_test_cat", department_id: $rootScope.department_id},
        //     sort: [{'_id': 'desc'}],
        //    include_docs: true,
        //     attachments: true, 
        //    limit: 1000
        //   }).then(function (result) {
            
               
          
        //     result.docs.map(function(row) { 
        
        //     $rootScope.department_test_cat_list.push(row.my_doc)
           
            
        //     })
           
        // })
    }
    //: get all the categories of test irrespective of dep.
   $scope.get_test_cats = () => {
    //    $rootScope.all_dep_cats = []
    //     db.find({
    //         selector: {table_name: "department_master_test_cat"},
    //         sort: [{'_id': 'desc'}],
    //        include_docs: true,
    //         attachments: true, 
    //        limit: 1000
    //       }).then(function (result) {
            
               
          
    //         result.docs.map(function(row) { 
        
    //         $rootScope.all_dep_cats.push({dep_id: row.department_id, data: row.my_doc})
           
            
    //         })
    //       // debug($rootScope.all_dep_cats)
    //     })
    }
    
  //: select test list function
  $scope.department_test_list_fxn = () => {
    
    //  db.find({
    //      selector: {table_name: "department_master_test_list", category_id: $rootScope.department_catlist_id},
    //      sort: [{'_id': 'desc'}],
    //     include_docs: true,
    //      attachments: true, 
    //     limit: 1000
    //    }).then(function (result) {
         
          
       
    //      result.docs.map(function(row) { 
     
    //      $rootScope.department_test_list.push(row.my_doc)
        
         
    //      })
        
    //  })
 }
    //: select department test
    $scope.test_cat_sel_status = false
    $scope.select_department_test_cat = (id) => {
        //: find the name in department list and list cat in the dep.
        for(var i in $scope.department_list)
        {
            
            //: get the code if matched find the the list cat in dep
           // $scope.department_id = ""
            if($scope.department_list[i].id == id)
            {
                $rootScope.department_test_cat_list = []
                $rootScope.department_id = id
               
               // alert($scope.department_list[i].id)
                $scope.dep_test_cat_name = $scope.department_list[i].department_name
                //: find the test cats in d dep.           
                $scope.department_test_cat_list_fxn()
             

                   
              
            }
        }
        $scope.test_cat_sel_status = true
     
    }

    //: add new category to dep. test cat
    $scope.add_new_category_fd = {}
   
    $scope.add_new_category = () => {
        if(! $scope.add_new_category_fd.sno)
        {
            //alertError("Empty name")
           // return
        }
        if(! $scope.add_new_category_fd.code)
        {
            alertError("Empty code")
            return
        }
        if(! $scope.add_new_category_fd.name)
        {
            alertError("Empty name")
            return
        }
        if(! $rootScope.department_id)
        {
            alertError("Please select department ID ")
            return
        }
       // debug($scope.add_new_category_fd)
       // $scope.add_new_category_fd
        var table_name = "department_master_test_cat"
        var _id = table_name+"_"+$scope.add_new_category_fd.code.toUpperCase()
        $scope.add_new_category_fd.sno =  $rootScope.department_test_cat_list.length + 1
        $scope.add_new_category_fd.id = _id
        var table = {
            _id: ""+_id,
            table_name: table_name,
            department_id: $rootScope.department_id,
            my_doc: $scope.add_new_category_fd
          }
        
          
            // handle result
                 //: createindex
          db.createIndex({
            index: {
              fields: [{department_id: $rootScope.department_id, table_name: "department_master_test_cat"}]
            }
          }, function (err, result) {
            if (err) { return console.log(err); }
                       
             add_doc2(table)
             
             $rootScope.department_test_cat_list.push(table.my_doc)
             $scope.$emit('pushChanges', table.my_doc);
            $scope.add_new_category_fd = {}
           
             
          })
               
    }

    //: culture test
    $scope.m_report_type = function(){

      if($rootScope.view_test_fd)
      {
    
         if($rootScope.view_test_fd.report_type == "Culture")
      {
          $scope.closeThisDialog()
   ngDialog.open({ template: 'dialogs/culture-test.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});

      }

      }else  if($scope.add_new_test_fd)
      {
         if($scope.add_new_test_fd.report_type == "Culture")
      {
          $scope.closeThisDialog()
   ngDialog.open({ template: 'dialogs/culture-test.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
   
      }

      }

      


    }
    

    //: add new test
    $scope.add_new_test_fd = {}
   
    $scope.add_new_test = () => {
        if(! $scope.add_new_test_fd.sno)
        {
            //alertError("Empty name")
           // return
        }
        if(! $scope.add_new_test_fd.code)
        {
            alertError("Empty code")
            return
        }
        if(! $scope.add_new_test_fd.name)
        {
            alertError("Empty name")
            return
        }
        if(! $rootScope.department_catlist_id)
        {
            alertError("Please select test category ID ")
            return
        }
       // alert("testcat id: "+$rootScope.department_catlist_id)
      // debug($scope.add_new_test_fd)
       // $scope.add_new_category_fd
        var table_name = "department_master_test_list"
        var _id = table_name+"_"+$scope.add_new_test_fd.code.toUpperCase()
        $scope.add_new_test_fd.sno =  $rootScope.department_test_list.length + 1
        $scope.add_new_test_fd.id = _id
        var table = {
            _id: ""+_id,
            table_name: table_name,
            category_id: $rootScope.department_catlist_id,
            my_doc: $scope.add_new_test_fd
          }
        
          
            // handle result
                 //: createindex
          db.createIndex({
            index: {
              fields: [{category_id: $rootScope.department_catlist_id, table_name: "department_master_test_list"}]
            }
          }, function (err, result) {
            if (err) { return console.log(err); }
                       
             add_doc2(table)
             
             $rootScope.department_test_list.push(table.my_doc)
             $scope.$emit('pushChanges_2', table.my_doc);
            $scope.add_new_test_fd = {}
           
             
          })
               
    }

 //: ### UI NAV COMMANDS
     $scope.accept_test_ui = function(){
      //  alert("Good to go!")
       //alertError("Good to go!")
      // alert(window.location.href)
        $location.path("/accept_test/Accept Test")
    }
    $scope.perform_test_ui = function(){
        
          $location.path("/perform_test/Perform Test List")
      }
      $scope.report_ui = function(){
        
          $location.path("/report/ Accounting")
      }
      $scope.report_revenue_ui = function(){
        
          $location.path("/report_revenue/ Revenue Report")
      }
      $scope.approve_tests_ui = function(){
        
          $location.path("/approve_tests/ Approve Tests")
      }

      $scope.accept_test_list_ui = function(){
        
          $location.path("/accept_test_list/Accept Test List")
      }

      $scope.inventory_ui = function(){
        
           $location.path("/inventory/Inventory Master")
       }
       $scope.inventory_logs_ui = function(){
        
           $location.path("/inventory_logs/Inventory Logs")
       }
        $scope.inventory_setup_fxn = function(){
        
           $location.path("/inventory_setup/Inventory Setup")
       }

    $scope.profile_master_nav = function(){
    
          $location.path("/profile_master/Profile Master")
      } 
      
    $scope.test_master_nav = function(){
    
          $location.path("/test_master/Test Master")
      }   
    $scope.department_master_nav = function(){
    
          $location.path("/department_master/Department Master")
      } 
       $scope.manage_assigned_stock_ui = function(){
    
          $location.path("/manage_assigned_stock/Manage Assigned Stock to tests")
      } 
       $scope.manage_assigned_stock_profile_ui = function(){
    
          $location.path("/manage_assigned_stock_profile/Manage Assigned Stock to profile")
      } 

      $scope.purchase_order_ui = function(){
        
        $location.path("/purchase_order/Create Purchase Order")
    }
    $scope.receive_order_ui = function(){
        
        $location.path("/receive_order/Receive Order")
    }
    $scope.track_inventory_ui = function(){
        
        $location.path("/track_inventory/Track Inventory")
    }
    //: post data to remote server
    $scope.post_data = function(object,  post_url){
        request.post(
            post_url,
            { form: object },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   var res =  JSON.parse(body) || []
                

                    alertSuccess(res.name)
                   // alert(JSON.stringify(body))
                }
            }
        );
    }

//: ## PROFILE MASTER

$scope.$on('pushChanges_profile', function( event, data ){
    $rootScope.profile_list = []
   $scope.profile_list_fxn()
 });
$rootScope.profile_list = []

$scope.profile_list_fxn = () => {
    
    //  db.find({
    //      selector: {table_name: "profile_master"},
    //      sort: [{'_id': 'desc'}],
    //     include_docs: true,
    //      attachments: true, 
    //     limit: 1000
    //    }).then(function (result) {
         
            
       
    //      result.docs.map(function(row) { 
     
    //      $rootScope.profile_list.push(row.my_doc)
        
         
    //      })
        
    //  })
 }

 $scope.profile_list_fxn()
//: add new profile btn fxn
$scope.add_new_profile_fd = {}

 $scope.add_new_profile_btn = () => {

     if(! $scope.add_new_profile_fd.sno)
     {
       
     }
     if(! $scope.add_new_profile_fd.code)
     {
         alertError("Empty code")
         return
     }
     if(! $scope.add_new_profile_fd.name)
     {
         alertError("Empty name")
         return
     }
     //: base 64 encode
    $scope.add_new_profile_fd.profile_summary = btoa($scope.add_new_profile_fd.profile_summary)

     var table_name = "profile_master"
     var _id = table_name+"_"+$scope.add_new_profile_fd.code.toUpperCase()
     $scope.add_new_profile_fd.sno =  $rootScope.profile_list.length + 1
     $scope.add_new_profile_fd.id = _id
     $scope.add_new_profile_fd.code = $scope.add_new_profile_fd.code.toUpperCase()
     var table = {
         _id: ""+_id,
         table_name: table_name,
         my_doc: $scope.add_new_profile_fd
       }      
       
         // handle result
              //: createindex
       db.createIndex({
         index: {
           fields: ["profile_name"]
         }
       }, function (err, result) {
         if (err) { return console.log(err); }
                    
     add_doc2(table)
      table.my_doc.profile_summary = ""
          $rootScope.profile_list.push(table.my_doc)
          
          $scope.$emit('pushChanges_profile', table.my_doc);
   
   
         $scope.add_new_profile_fd = {}
         $scope.add_new_profile_fd.profile_summary = ""
          
       })
            
 }

//: ### SELECT PROFILE AND ADD TESTS TO IT 
$scope.profile_sel_status = false

$scope.select_profile_catlist = (id) => {

 $scope.order_arrangement = []
    //: find the name in profile list.
    for(var i in $scope.profile_list)
    {
        
        if($scope.profile_list[i].id == id)
        {

           //: now do a search of all test in this cat
            $rootScope.profile_test_list = []
            $rootScope.profile_test_id = id
             
            $scope.profile_list_name = $scope.profile_list[i].name
            $scope.profile_list_code = $scope.profile_list[i].code
            $scope.profile_list_id = id
            //: find the tests tied to this profile           
            $scope.profile_test_list_fxn()


                      
          
        }
    }

    $scope.profile_sel_status = true
 
}

//: display all test in general
$rootScope.display_all_test_scope = []

$scope.display_all_test = () => {

    // db.find({
    //     selector: {table_name: "department_master_test_list"},
    //     sort: [{'_id': 'desc'}],
    //    include_docs: true,
    //     attachments: true, 
    //    limit: 1000
    //   }).then(function (result) {
              
      
    //     result.docs.map(function(row) { 
    
    //     $rootScope.display_all_test_scope.push(row.my_doc)
       
        
    //     })
       
    // })


}

$scope.display_all_test()

//: get bulk doc ids: test ids get docs
$scope.get_all_tests_in_profile = (ar) => {
   //: make sure all codes are capital
   var ccode = []
   for(var i in ar)
   {
      var codex = ar[i].split("_").pop().toUpperCase()
      ccode.push(LAB.test_table+"_"+codex)
   }
   
    
        //db.bulkDocs(ar).then(function () {
   
           // return db.allDocs({include_docs: true, keys: ar)
    db.allDocs({include_docs: true, keys: ccode}).then(function(r){

        r.rows.map(function(row) { 
            
               //console.log(row.doc.my_doc.code)
              
               $rootScope.profile_test_list.push(row.doc.my_doc)
              
                
                })
   
    
            })
     
    }
    

//: select tests and add to  profile
$scope.test_checkboxes = []
$scope.add_test_to_profile_list = () => {
   $scope.test_checkboxes = [] 
     for(var i in $scope.display_all_test_scope)
     {
         if($scope.display_all_test_scope[i].emma)
         {
             //:  all the ids to attach to profile
            $scope.test_checkboxes.push("department_master_test_list_"+$scope.display_all_test_scope[i].code.toUpperCase());
         }
     }
     //: use these ids go to selected profile if not there put it
     //: select profile = $rootScope.profile_test_id
     //: get the doc of the selected profile
     db.get(""+$rootScope.profile_test_id, function(err, doc) {
        
        if(doc)
        {
           
           var prev_doc =  doc.my_doc
           var prev_rev = doc._rev
           var table_name = "profile_master"
           var table = {
            _id: ""+$rootScope.profile_test_id,
            _rev: prev_rev,
            new_edits: false,
            table_name: table_name,
            my_doc: prev_doc
          }
           if(doc.my_doc.profiled_tests)
           {
               //: loop tru the selected and add the missing ones
               for(var i in $scope.test_checkboxes)
               {
                   //: not found
             if(doc.my_doc.profiled_tests.indexOf($scope.test_checkboxes[i]) == -1){
                doc.my_doc.profiled_tests.push($scope.test_checkboxes[i])
             }
               }
               
            table.my_doc.profiled_tests = doc.my_doc.profiled_tests

           }else{
               //: add new one
               table.my_doc.profiled_tests = $scope.test_checkboxes
           }

           add_doc2(table)


        }
        
        
        if (err) { 
    
           alert("Profile not found")
        
        }
     //: async 
     $scope.profile_test_list_fxn()

      });

  
  
}



$scope.add_test_to_test_list = () => {
    
   $scope.test_checkboxes = [] 
   
     for(var i in $scope.display_all_test_scope)
     {
         if($scope.display_all_test_scope[i].emma)
         {
             //:  all the ids to attach to profile
         $scope.test_checkboxes.push($scope.display_all_test_scope[i].code.toUpperCase());
        
         }
     }

     
        // $scope.$rootScope.table_test_list = $rootScope.table_test_list
for(var xx in $scope.test_checkboxes)
        {
   
     var chk = false
    for(var ii in $rootScope.table_test_list)
    {
        if($scope.test_checkboxes[xx].toUpperCase() == $rootScope.table_test_list[ii].code.toUpperCase()){

     chk = true
        }
    } 
    
    if(! chk)
    {
        $rootScope.add_tests_to_form_ui.code = $scope.test_checkboxes[xx]
        $scope.add_tests_to_form()
       
    }
   
        }

    $rootScope.close_dialog()
  
        
  
 
  
}

//: assign inventory to test
$scope.assign_stock_to_test_list = () => {
    
   $scope.test_checkboxes = [] 
   
     for(var i in $scope.display_all_test_scope)
     {
         if($scope.display_all_test_scope[i].emma)
         {
             //:  all the ids to attach to profile
         $scope.test_checkboxes.push("department_master_test_list_"+$scope.display_all_test_scope[i].code.toUpperCase());
        
         }
     }
     
     //: make sure qty codes are filled
     for(var y in $rootScope.inventory_codes)
     {
         
         if(! $rootScope.inventory_codes[y].qty)
         {
             alertError("Assign quantity to deduct")
             return
         }
         if(isNaN($rootScope.inventory_codes[y].qty)){

            alertError("Quantity should be number")
            return
         }
     }

// for(var xx in $scope.test_checkboxes)
//         {


//         }
   
         //: tests
     //debug($scope.test_checkboxes)
        // debug($rootScope.inventory_codes)
   //: start
   db.allDocs({include_docs: true, keys: $scope.test_checkboxes}).then(function(r){
    r.rows.map(function(row) { 
    
        if(row.doc)
        {
          
           var prev_doc =  row.doc.my_doc
           var prev_rev = row.doc._rev
           var table_name = "department_master_test_list"
           var table = {
            _id: ""+row.doc._id,
            _rev: prev_rev,
            new_edits: false,
            table_name: table_name,
            my_doc: prev_doc
          }
           if(row.doc.my_doc.stock_list)
           {
               //: loop tru the selected and add the missing ones
               for(var i in $rootScope.inventory_codes)
               {
                   //: collect the codes first
                   var foundx = []
                 for(var iii in row.doc.my_doc.stock_list)
                 {
                     foundx.push(row.doc.my_doc.stock_list[iii].code)
                 }
    
             if(foundx.indexOf($rootScope.inventory_codes[i].code) == -1){
                row.doc.my_doc.stock_list.push($rootScope.inventory_codes[i])
             }
               }
               
            table.my_doc.stock_list = row.doc.my_doc.stock_list
    
           }else{
               //: add new one
              
               table.my_doc.stock_list = $rootScope.inventory_codes
           }
    
            add_doc2(table)
    
         
        }
        


    })
    $rootScope.display_all_test_scope = []
    $scope.display_all_test()
   })

  

    // end 
        
    
    $rootScope.close_dialog()
 
  
}

//: assign inventory to profile
$scope.assign_stock_to_profile_list = () => {
    
   $scope.test_checkboxes = [] 
   
     for(var i in $scope.profile_list)
     {
         if($scope.profile_list[i].emma)
         {
             //:  all the ids to attach to profile
         $scope.test_checkboxes.push("profile_master_"+$scope.profile_list[i].code.toUpperCase());
        
         }
     }
     //: make sure qty codes are filled
     for(var y in $rootScope.inventory_codes)
     {
         if(! $rootScope.inventory_codes[y].qty)
         {
             alertError("Assign quantity to deduct")
             return
         }
         if(isNaN($rootScope.inventory_codes[y].qty)){

            alertError("Quantity should be number")
            return
         }
     }

   //: start
 
   db.allDocs({include_docs: true, keys: $scope.test_checkboxes}).then(function(r){
    r.rows.map(function(row) { 
    
        if(row.doc)
        {
          
           var prev_doc =  row.doc.my_doc
           var prev_rev = row.doc._rev
           var table_name = "profile_master"
           var table = {
            _id: ""+row.doc._id,
            _rev: prev_rev,
            new_edits: false,
            table_name: table_name,
            my_doc: prev_doc
          }
           if(row.doc.my_doc.stock_list)
           {
               //: loop tru the selected and add the missing ones
               for(var i in $rootScope.inventory_codes)
               {
                   //: collect the codes first
                   var foundx = []
                 for(var iii in row.doc.my_doc.stock_list)
                 {
                     foundx.push(row.doc.my_doc.stock_list[iii].code)
                 }
    
             if(foundx.indexOf($rootScope.inventory_codes[i].code) == -1){
                row.doc.my_doc.stock_list.push($rootScope.inventory_codes[i])
             }
               }
               
            table.my_doc.stock_list = row.doc.my_doc.stock_list
    
           }else{
               //: add new one
              
               table.my_doc.stock_list = $rootScope.inventory_codes
           }
    
            add_doc2(table)
    
         
        }
        


    })
    $rootScope.profile_list = []
    $scope.profile_list_fxn()
   })

  

    // end 
        
    
    $rootScope.close_dialog()
 
  
}



$scope.add_profile_to_test_list = () => {
    
   $scope.test_checkboxes = [] 
   
   
     for(var i in $scope.profile_list)
     {
         if($scope.profile_list[i].emma)
         {
             //:  all the ids to attach to profile
         $scope.test_checkboxes.push($scope.profile_list[i].code.toUpperCase());
        
         }
     }

    
        // $scope.$rootScope.table_test_list = $rootScope.table_test_list
for(var xx in $scope.test_checkboxes)
        {
   
     var chk = false
    for(var ii in $rootScope.table_test_list)
    {
        if($scope.test_checkboxes[xx].toUpperCase() == $rootScope.table_test_list[ii].code.toUpperCase()){

     chk = true
        }
    } 
    
    if(! chk)
    {
        $rootScope.add_tests_to_form_ui.code = $scope.test_checkboxes[xx]
        $scope.add_tests_to_form()
       
    }
   
        }
      

    $rootScope.close_dialog()
  
        
  
 
  
}


  



//: list of test tied to a profile
$scope.profile_test_list_fxn = () => {
    var id = $rootScope.profile_test_id
   // alert(id) 
   // $rootScope.profile_test_list =[{sno: 1, name: "test test", code: "ttt"}]
   //: get this profile
   db.get(""+id, function(err, doc) {
    
    if(doc)
    {
       
        //$scope.department_master_data = doc.my_doc
       //  $scope.department_master_data._rev = doc._rev
       if(doc.my_doc.profiled_tests)
       {
           $rootScope.profile_test_list = []
     // get all docs using ids of test in profile
         $scope.get_all_tests_in_profile(doc.my_doc.profiled_tests)
 
         //: arrangement
         //debug(doc.profiled_tests_order)
         if(doc.profiled_tests_order)
         {
          $scope.order_arrangement = doc.profiled_tests_order
          //debug( $scope.order_arrangement)
         }
          


       }

    }
    
    
    if (err) { 

       alert("Profile not found")
    
    }
  

  });

}

//: view test => save changes and delete

$scope.launch_view_test_ui = (id) => {

     
        db.get(""+id, function(err, doc) {
            
            if(doc)
            {
              
                // debug(doc.my_doc)
                 $rootScope.view_test_fd = {}
                 $rootScope.view_test_fd = doc.my_doc
      if($rootScope.view_test_fd.report_type == "Culture")
      {

        $rootScope.selected_medicine_list_x = doc.my_doc.selected_medicine_list
         $rootScope.edit_culture = doc.my_doc
   ngDialog.open({ template: 'dialogs/save-culture-test.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
   
      }else{
        ngDialog.open({ template: 'dialogs/view-test.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
      }

                   
            }
            
            
            if (err) { 
        
               alert("Test not found")
            
            }
          
        
          });
 
}

//: save changes in view test
$scope.launch_view_test_ui_save_changes = () => {
  var code = ""+$rootScope.view_test_fd.code.toUpperCase()
  
  //: find the test
  
  db.get(LAB.test_table+"_"+code, function(err, doc) {
    
    if(doc)
    {
        var revid = doc._rev
       
        if(! $rootScope.view_test_fd.code)
        {
            alertError("Empty code")
            return
        }
        if(! $rootScope.view_test_fd.name)
        {
            alertError("Empty name")
            return
        }
        
      $rootScope.view_test_fd.code = code
        var table_name = LAB.test_table
    
        $rootScope.view_test_fd.sno =  doc.my_doc.sno
         var table = {
             _id: LAB.test_table+"_"+code,
            _rev: revid, 
            category_id: doc.category_id,
            my_doc: $rootScope.view_test_fd,
            table_name: doc.table_name,
            ref: ! doc.ref ? [] : doc.ref
          }  
          
          //: save test references if available
           if($rootScope.test_references.length > 0)
           {
               table.ref = $rootScope.test_references
           }            
             add_doc2(table)                

    }
    
    
    if (err) { 

       alert("Test not found")
    
    }
  

  });

  //: use the revision id to update
  
}
//: delete test
$scope.launch_view_test_ui_delete = (id) => {
   if(confirm("Are you sure?") == false){
          return
        }
        db.get(id).then(function (doc) {
          alertSuccess("completed.")
         // alert(doc._id)
         // alert(doc._rev)
         // remove from test category
         // remove from profile

         // db.remove(doc._id, doc._rev);
      
         var remote = require("electron").remote
         remote.getCurrentWindow().reload();
         //return false
        });

}

$scope.remove_test_from_profile = function(id){
  if(confirm("Are you sure?") == false)
  {
    return
  }
   db.get("profile_master_"+$scope.profile_list_code, function(err, doc){
      if(doc)
      {
        

        var prof_tests = doc.my_doc.profiled_tests
        for(var i in prof_tests)
        {
          if(prof_tests[i] == id)
          {
            prof_tests.splice(i, 1)
          } 
        }
        //log(prof_tests)
        //: save the changes back
        doc.my_doc.profiled_tests = prof_tests
       // add_doc2(doc)
        // finally remove from list
        for(var ii in $scope.profile_test_list)
        {
           if($scope.profile_test_list[ii].id == id)
           {
              $scope.profile_test_list.splice(ii, 1)
           }
        }
        add_doc2(doc)

      }
   })
}


//: one to many relationship form
$scope.create_form = (name) => {
    $rootScope.form_name = name
    ngDialog.open({ template: 'dialogs/create-form.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
}
//: create custom forms for patient, ref center and refer person data
//e.g custom_form_data(accept_test_data.patient_id, custom_static_form_patient, custom_static_form_patient_desc, custom_static_form_patient_list)
$scope.custom_form_data = (id, static_form_input, static_form_desc, static_form_list, is_self_id, table_namex, table_name_custom_fields) => {
    
  
    //: if patient data is set
    if(is_self_id == true)
    {
       id =  $scope.accept_test_data.doc_branch_code+"-"+window.uid() 
    }
    
    if(! id)
    {
      //  alertError("Enter a value")
        if(confirm("Empty value. Do you still want to proceed") == true)
        {
                id = "Guest"
        }else{
            return
        }
    
        
        
    }
    // alert(id)
    // debug(static_form_input)
    // debug(static_form_desc)
    //debug(static_form_list)
    // alert(is_self_id)
    // debug(table_namex)
    // debug(table_name_custom_fields)


      $rootScope.is_self_id = is_self_id
       $rootScope.form_code = id
     
       $rootScope.form_code_desc = static_form_desc

       $rootScope.m_table_id = table_name_custom_fields
       $rootScope.m_table_id_data = table_namex
        //$rootScope.patient_data_form  = []
        static_form_input = []
        $rootScope.data_form = static_form_input

        $rootScope.data_form_list = []
        //: get the saved form in db
        var my_id = ""
        if(is_self_id == true)
        {
            my_id = ""+id
        }else{
        my_id = table_namex+"_"+""+id.toUpperCase()
        }
        
        $rootScope.form_code = my_id
        
        // db.get(my_id, function(err, doc) {
            
        //     if(doc)
        //     {
        //        // $rootScope.patient_data_form  = doc.my_doc
        //        static_form_input = doc.my_doc
        //        $rootScope.data_form = static_form_input
               
        //         $rootScope.custom_data_found = true
        //         //: include search index
        //          $rootScope.form_search_idex = []
        //         for(var i in doc.my_doc)
        //         {
        //             if(doc.my_doc[i].is_search)
        //             {
        //                 $rootScope.form_search_idex.push(doc.my_doc[i].name)
        //             }
        //         }
        //         $rootScope.form_search_idex = $rootScope.form_search_idex.join(",")
        //        // $rootScope.patient_data_form._rev = doc._rev
        //        static_form_input._rev = doc._rev
        //        $rootScope.data_form._rev = static_form_input._rev
               
        //        if(is_self_id == true)
        //        {
        //            $rootScope.patient_data_ui = {id: my_id, data: $rootScope.data_form}
        //        }else{

                   
        //   var ccv =  {id: $rootScope.form_code, data: $rootScope.data_form} 
          
        //   // $rootScope.ref_data_ui = ccv
        //    if($rootScope.ref_data_ui)
        //    {
        //  var mid = $rootScope.ref_data_ui.id.split('_').slice(0, -1).join('_');
        //      var mids = ccv.id.split('_').slice(0, -1).join('_');
        //      if(mid != mids)
        //      {
        //       $rootScope.ref_data_ui.attached_ref = ccv
        //       $rootScope.ref_data_ui.attached_ref.scope = 'ref_data_uix'   
        
        //      }
             
 
        //    }else{
        //        $rootScope.ref_data_ui = ccv 
        //        $rootScope.ref_data_ui.scope = 'ref_data_ui'
              
        //    }
                      
        //            // $rootScope.ref_data_ui = {id: my_id, data: $rootScope.data_form}
                    
        //             //: set discount if any
        //             $scope.calc_discount()
        //        }
               
           
        //        $rootScope.close_dialog()
               
        //     }
            
            
        //     if (err) {
                
        //         //: IF NOT FOUND  
        //         //: look for table_name = patient_custom_data all patient
        //         $rootScope.custom_data_found = false  
        //         $rootScope.record_count = 200
        //         db.find({
        //             selector: {table_name: table_namex},
        //             //selector: {table_name: LAB.patient_custom_data},
        //             sort: [{'_id': 'desc'}],
        //            include_docs: true,
        //             limit: $rootScope.record_count
        //           }).then(function (result) {
        //              $rootScope.form_search_idex = []
        //             // $rootScope.patient_data_list = []
        //             static_form_list = []
        //             $rootScope.data_form_list = []
        //           //  $rootScope.data_form_list = static_form_list
        //             $rootScope.patient_data_list_headers = []
                
        //             result.docs.map(function(row) { 
        //          //: list                 
        //          // $rootScope.patient_data_list.push(row.my_doc)
        //          //console.log(row._id)
        //          //return
                
        //          static_form_list.push({id: row._id, data: row.my_doc}) 
              
        //          $rootScope.data_form_list.push({id: row._id, data: row.my_doc})  
              
        //                 //: include search index                
        //              for(var ii in row.my_doc)
        //              {

        //             if(row.my_doc[ii].is_search)
        //              {
        //                  if($rootScope.form_search_idex.indexOf(row.my_doc[ii].name) == -1)
        //          $rootScope.form_search_idex.push(row.my_doc[ii].name)
        //              } 
                   
        //                 if(row.my_doc[ii].name)
        //                     {
        //                         if($rootScope.patient_data_list_headers.indexOf(row.my_doc[ii].name) == -1)
        //                         {
        //                         $rootScope.patient_data_list_headers.push(row.my_doc[ii].name) 
                             

        //                         }
                        
        //                     } 
                          
                     
        //              }

                   
                    
        //             })

        //              R_SERVICE.angular_js_autofield(static_form_list)
        //              $rootScope.form_search_idex = $rootScope.form_search_idex.join(", ")
                
                  
        //         })        
        
        
              
            
        //     }
          
        
        //   });







        ngDialog.open({  template: 'dialogs/form.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true,  closeByDocument: true});

        //: clear inputs
        $scope.accept_test_data.referred_by_center_id_code = ""
        $scope.accept_test_data.referred_by_person_name = ""
 }

 $scope.open_input_form = (form_id_table) => {
    $rootScope.hide_add_field_btn = false
    $rootScope.custom_data_found = true 
    //db.get(LAB.patient_custom_field, function(err, doc) {
       
    db.get(form_id_table, function(err, doc) {
            
            if(doc)
            {
                //$rootScope.patient_data_form  = doc.my_doc
                
             
                $rootScope.data_form  = doc.my_doc
              
             // $rootScope.patient_data_form._rev = doc._rev
             $rootScope.data_form._rev = doc._rev
                    //: clear
                    for(var i in $rootScope.data_form)
                    {
                        $rootScope.data_form[i].val = ""
                       
                    }


            }
            
            
            if (err) { 
        
               alert("Form fields are not created yet or synced")
            
            }
          
        
          });
                 
 }


//: update select box value
$scope.save_changes_values_p_data = (id, data) => {
    for(var i in $rootScope.data_form)
    {
        if($rootScope.data_form[i].name == id)
        {
            $rootScope.data_form[i].values = data.split(",")
        }
    }
    alertInfo("changes saved.")
}

//: add custom form field
$scope.custom_form_field = {}

$scope.add_custom_form_field = (scope) => {
   
        if(isEmpty($scope.custom_form_field))
        {
        alertError("Please enter field name and type")
        return
        }
        if(! $scope.custom_form_field.name)
        {
        alertError("Please enter field name")
        return
        }
        if(! $scope.custom_form_field.type)
        {
        alertError("Please enter field type")
        return
        }
    if($scope.custom_form_field.type == "select")
    {
        $scope.custom_form_field.values = ["item 1", "item 2"]
    }
   
        //: don't enter a field already entered
   
    for(var i in $rootScope.data_form)
    {
        if($rootScope.data_form[i].name)
        {            
        if($rootScope.data_form[i].name.toLowerCase() == $scope.custom_form_field.name.toLowerCase())
        {
        alertError("Field name already exist")
        return
        }
    
        }
    }

    //: there can only be one field disc & and cut
    var get_disc = []
    var get_cut = []
    for(var i in $rootScope.data_form)
    {
        if($rootScope.data_form[i].is_discount && $scope.custom_form_field.is_discount)
        {            
           get_disc.push($rootScope.data_form[i].name)
    
        }
        if($rootScope.data_form[i].is_cut && $scope.custom_form_field.is_cut)
        {            
           get_cut.push($rootScope.data_form[i].name)
    
        }
    }
    if(get_disc.length > 0)
    {
        alertError(get_disc[0]+" is already a Discount field");
        
        return
    }
    if(get_cut.length > 0)
    {
        alertError(get_cut[0]+" is already a Consultant Cut field");
        return
    }
        
        $rootScope.data_form.push($scope.custom_form_field)
        alertSuccess("Added successfully.")
        $scope.custom_form_field = {}
        //: save in db: data_form
    
}

//: save patient data changes
$scope.save_changes_patient_data = (cust_data, cust_field, form_id_code, is_self_id) => {
   
        //: make sure all fields not null are field
        for(var i in $rootScope.data_form)
        {
            if($rootScope.data_form[i].not_null)
            {
            
            if(! $rootScope.data_form[i].val)
            {
                alertError($rootScope.data_form[i].name+" must not be empty")
                 return 
            }
       
        }
    }
   
    //: patient id = $rootScope.form_code
  //var table_name_1 = LAB.patient_custom_data //"patient_custom_data"
    var table_name_1 = cust_data 
    // var table_name_2 = LAB.patient_custom_field //"patient_data_custom_fields"
    var table_name_2 = cust_field 
    var my_id = form_id_code
   
   // if($rootScope.is_self_id == true)
    //{
      //  my_id = ""+form_id_code
   // }else{
    //my_id = cust_data+"_"+""+form_id_code.toUpperCase()
    //}
    //alert(my_id)
    var table = {
        _id: ""+my_id,
        table_name: table_name_1,
        my_doc: $rootScope.data_form
      } 
      table.branch_code = $scope.accept_test_data.doc_branch_code
      //alert($rootScope.data_form._rev)
      //: incase of edit of prev data
   
      db.get(my_id, function(err, doc) {
        
        if(doc)
        {

              if($rootScope.data_form._rev)

                {
                table._rev = doc._rev
                table.new_edits = false

                 }
            //: update record
         
        add_doc2(table);
               

        }
        
        
        if (err) { 
    
         //: new record
      
        add_doc2(table);
        }
      
    
      });
//: get custfield revision
db.get(""+table_name_2, function(err, doc) {
    
    if(doc)
    {
        $rootScope.data_form._rev = doc._rev 
        
var table2 = {
        _id: table_name_2,
        table_name: table_name_2,
        my_doc: $rootScope.data_form
      } 
      table2.branch_code = $scope.accept_test_data.doc_branch_code
      if($rootScope.data_form._rev)
      {
          table2._rev = $rootScope.data_form._rev
          table2.new_edits = false
      }
      //debug(table2)
      add_doc2(table2);

        
    }
})
    table2 = {
        _id: table_name_2,
        table_name: table_name_2,
        my_doc: $rootScope.data_form
      } 
      table2.branch_code = $scope.accept_test_data.doc_branch_code
      if($rootScope.data_form._rev)
      {
          table2._rev = $rootScope.data_form._rev
          table2.new_edits = false
      }
      //debug(table2)
      add_doc2(table2);

       alertInfo("Changes saved")
       $rootScope.close_dialog()
       if(is_self_id == true)
       {
           $rootScope.patient_data_ui = {id: my_id, data: $rootScope.data_form}
       }else{
        var mids = my_id.split('_').slice(0, -1).join('_');
       // alert(mids)
        if($rootScope.ref_data_ui)
        {
           if($rootScope.ref_data_ui.scope == 'ref_data_ui')
           {
                if($rootScope.ref_data_ui.id == my_id)
                {
          //  $rootScope.ref_data_ui = {id: my_id, data: $rootScope.data_form}
                    
                    $rootScope.ref_data_ui.data = $rootScope.data_form
                }
                 
           }
           if($rootScope.ref_data_ui.attached_ref.scope == 'ref_data_uix')
           {
                if($rootScope.ref_data_ui.attached_ref.id == my_id)
                {
                    $rootScope.ref_data_ui.attached_ref.data = $rootScope.data_form   
                }
                 
           }


        }
      
         
             
       }
       
  
       
         

       
}


 $rootScope.close_dialog = () => {
$scope.closeThisDialog("")
 }
    //:select_data_from_list
  $rootScope.select_patient_from_list = (d, id, is_self_id, formcode) => {
      
//       debug(id)
//       debug(d)
//       debug(is_self_id)
//    debug(formcode)
    $rootScope.data_form = d
    $rootScope.form_code = id
    $rootScope.custom_data_found = true
    //: only for patient data
    
    if(is_self_id == true)
    {
        $rootScope.patient_data_ui = {id: $rootScope.form_code, data: $rootScope.data_form}
    }else{

          var ccv =  {id: $rootScope.form_code, data: $rootScope.data_form} 
         
         // $rootScope.ref_data_ui = ccv
          if($rootScope.ref_data_ui)
          {
            var mid = $rootScope.ref_data_ui.id.split('_').slice(0, -1).join('_');
            var mids = ccv.id.split('_').slice(0, -1).join('_');
            if(mid != mids)
            {
             $rootScope.ref_data_ui.attached_ref = ccv
             $rootScope.ref_data_ui.attached_ref.scope = 'ref_data_uix'   
       
            }
            

          }else{
              $rootScope.ref_data_ui = ccv 
              $rootScope.ref_data_ui.scope = 'ref_data_ui'
             
          }
         
   
      //  debug($rootScope.ref_data_ui)
        //debug($rootScope.ref_data_uix)
    }
    
     $rootScope.close_dialog()
 //$rootScope.closeThisDialog("")
  }

 $rootScope.ref_data_uix = {} 

  //: search custom data
  $rootScope.list_all_data_after_search_state = true

  //: global search
  $scope.call_searches = () => {
    ngDialog.open({template: 'dialogs/global-search.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true, closeByDocument: true});
  }
  $rootScope.custom_data_search_fieldx = {}
  $rootScope.global_search = () => {
     
      if(! $rootScope.custom_data_search_fieldx.search){
          
        alertError("Empty search")
        return

    }
   
    
    db.search({
      query: $rootScope.custom_data_search_fieldx.search,
      fields:  ['my_doc.val', '_id'],
      include_docs: true,
      limit: $rootScope.record_count
 
    }).then(function (result) {
     
      if(result.rows.length > 0) 
      {
        $rootScope.form_code_desc = "Patient Data"
       $rootScope.data_form_list = []   
    
      }         
      else{
          alertInfo("No record found.")
          return
      }
      
      
   //debug($rootScope.patient_data_list_headers)
     result.rows.map(function(row) { 
         
   
    if(row.doc.table_name == LAB.patient_custom_data)
    $rootScope.data_form_list.push({id: row.id, data: row.doc.my_doc} )

     })
    if($rootScope.data_form_list.length > 1)
    {
         $rootScope.is_self_id = true
         $scope.call_searches()
        
    }else if($rootScope.data_form_list.length == 1) {
     $rootScope.patient_data_ui = $rootScope.data_form_list[0]
     alertSuccess("Patient found.") 
    }else{
         alertError("Patient not found.")
    }
    
    }).catch(function (err) {
      // handle error
     // debg(err)
    });
      
  }


  $rootScope.custom_data_search_field = {}
  
  $rootScope.search_custom_data = () => {

    // alert($rootScope.m_table_id_data)
      //: get the index
     
      if(! $rootScope.custom_data_search_field.search){
        
          alertError("Empty search")
          return

      }
     
    
      db.search({
        query: $rootScope.custom_data_search_field.search,
        fields:  ['my_doc.val', '_id'],
        include_docs: true,
        limit: $rootScope.record_count
    //     filter: function (doc) {
          
    //    // only index table_name 
    //    if(doc.table_name){ 
    //    if(doc.table_name == ""+$rootScope.m_table_id_data.trim()) 
    //    {
    //        return  true
    //    }else{
    //        return false
    //    }
    //       }
    //     }
      }).then(function (result) {
        
        if(result.rows.length > 0) 
        {
         $rootScope.data_form_list = []   
         alertSuccess("showing result...")
        }         
        else
        alertInfo("No record found.")
        
     //debug($rootScope.patient_data_list_headers)
       result.rows.map(function(row) { 
        // debug(row.doc.my_doc)
        //    debug(row.doc.table_name)
        //    alert(row.id)
      //: filter
      if(row.doc.table_name == $rootScope.m_table_id_data)
      $rootScope.data_form_list.push({id: row.id, data: row.doc.my_doc} )

       })
      // debug($rootScope.patient_data_list)
      R_SERVICE.angular_js_autofield(static_form_list)
       

      }).catch(function (err) {
        // handle error
       // debg(err)
      });
     
  }
//: 
  $scope.check_duplicate_test = (id) => {

    return $q(function(resolve, reject) {
      
      //: if profile, get all the test in that profile
      var typeofx = id.split('_').slice(0, -1).join('_')
      switch(typeofx)
      {
          case "profile_master":
 //: make sure its not added in the test list
 
 db.get(""+id, function(err, doc) {
    
    if(doc)
    {
        
        var ptests = doc.my_doc.profiled_tests
         $rootScope.table_test_list.map(function(row){
              if(ptests.indexOf(row.id) != -1)
              {
               
                reject(row.id.split('_').pop()+" exist in profile")
                return  

              }
      })
      resolve("ok")
    }
    
  });



          break;

          case "department_master_test_list":

         
              $rootScope.table_test_list.map(function(row){

            if(row.id.split('_').slice(0, -1).join('_') == "profile_master")
            {
                //: get the tests in the profile
                db.get(""+row.id, function(err, doc) {
                    
                    if(doc)
                    {
                        
                //: look for test inside this profile
                 if(doc.my_doc.profiled_tests.indexOf(id) != -1)
                 {
                   var testcode = id.split('_').pop()
                   alertError("Test - "+id.split('_').pop()+" already exist in Profile - "+row.id.split('_').pop())
                  // alert("Test - "+id.split('_').pop()+"already exist in Profile - "+row.id.split('_').pop())
                  //: remove the affected code
                  for(var ii in $rootScope.table_test_list)
                  {
                      if($rootScope.table_test_list[ii].code == testcode)
                      {
                         $rootScope.table_test_list.splice(ii, 1)
                      }
                  }
                   return
                  }
                  
                    }

                })
         
            }
          }) 
          resolve("ok")
         
          break;
      }

     
   
    })
}

//: add tests to form
$rootScope.add_tests_to_form_ui = {} 


$scope.add_tests_to_form = () => {

  if(! $rootScope.table_test_list )
   $rootScope.table_test_list = []  

    if(! $rootScope.add_tests_to_form_ui.code)
    {
        alertError("Please enter test or profile code")
        return
    }
  
$rootScope.add_tests_to_form_ui.code = $rootScope.add_tests_to_form_ui.code.toUpperCase()
    //: find the test or profile code   
   
   
    var ar = ["department_master_test_list_"+$rootScope.add_tests_to_form_ui.code, "profile_master_"+$rootScope.add_tests_to_form_ui.code]
    
    db.allDocs({include_docs: true, keys: ar}).then(function(r){
      
         var cnt = 0
         var temp_l = []
        r.rows.map(function(row) { 

            if(row.doc)
            {
                cnt++
       
            }
                              
           })


                if(cnt < 1)
                {
                    alertInfo("Code is not valid")
                    return
                }
              if(cnt > 1)
                {
                    alertInfo("Profile & Test Code is conflicting")
                    return
                }


                //: check if code is already added
                for(var iii in $rootScope.table_test_list)
                {
                    if($rootScope.table_test_list[iii].code.toUpperCase() == $rootScope.add_tests_to_form_ui.code)
                    {
                        alertError("Code already exist")
                        return
                    }
                }

                r.rows.map(function(row) { 
                    
          if(row.doc)
         {
     $scope.check_duplicate_test(row.doc.my_doc.id).then(function(res){         
                                 
     temp_l.push(row.doc.my_doc)  
                 //: populate 
                     for(var ii in temp_l)
                        {
                                                 
                                    
                    $rootScope.table_test_list.push(temp_l[ii])
                                    
                        }
                                    
                    $scope.calc_test_amount()
                     $rootScope.add_tests_to_form_ui.code = ""
                                    
                        $scope.calc_discount()                                 
                                                                       
                     }, function(err){
                         
                       alertError(err)
                                                    
                         })        


                           
             }
                                                  
             })

            })

           
}

//: calculate test amount
if(! $rootScope.total_test_amountxx)
 $rootScope.total_test_amountxx = 0
 if(! $rootScope.total_discount_amountxx)
 $rootScope.total_discount_amountxx = 0
 if(! $rootScope.total_tax_amountxx)
 $rootScope.total_tax_amountxx = 0
$scope.calc_test_amount = () => {
   $scope.total_test_amount = 0
   $scope.total_discount_amount = 0 
   $scope.total_tax_amount = 0 
     for(var i in $rootScope.table_test_list)
     {
         if($rootScope.table_test_list[i].rate)
         {
             //: remove ,
        $rootScope.table_test_list[i].rate =     $rootScope.table_test_list[i].rate.replace(",", "")

             if(! isNaN($rootScope.table_test_list[i].rate))
             {
            //: include rate, disc amount and taxamt
        var disc_amt = $rootScope.table_test_list[i].discount_amount != null ? parseFloat($rootScope.table_test_list[i].discount_amount) : 0

        var tax_amt = $rootScope.table_test_list[i].tax_amount != null ? parseFloat($rootScope.table_test_list[i].tax_amount) : 0

           if($rootScope.table_test_list[i].tax_per)
           {
           tax_amt = $rootScope.table_test_list[i].tax_amount = (parseFloat($rootScope.table_test_list[i].tax_per)  / 100)*parseFloat($rootScope.table_test_list[i].rate)
           }
              $scope.total_test_amount  =   $scope.total_test_amount + ( parseFloat($rootScope.table_test_list[i].rate) + parseFloat(tax_amt)   - ( disc_amt )  ) 
               //: calculate concession or discount
                 $scope.total_discount_amount  =   $scope.total_discount_amount + $rootScope.table_test_list[i].discount_amount
                 //: calculate tax
                 $scope.total_tax_amount  =   $scope.total_tax_amount + $rootScope.table_test_list[i].tax_amount            

             }
        
         }

     }

    $rootScope.total_test_amountxx = R_SERVICE.moneyFormat(parseFloat($scope.total_test_amount))
    $rootScope.total_discount_amountxx = R_SERVICE.moneyFormat(parseFloat($scope.total_discount_amount))
    $rootScope.total_tax_amountxx = R_SERVICE.moneyFormat(parseFloat($scope.total_tax_amount))


    $scope.get_accept_test_balance()

  

}



    //: remove test
    $scope.remove_test = () => {
        for(var i in $rootScope.table_test_list)
        {
            if($rootScope.table_test_list[i].selected_checkbox)
            {
               $rootScope.table_test_list.splice(i, 1)
               
            }
   
        } 
        $scope.calc_test_amount()
    }

    //: edit form data
    $scope.edit_form_data = (id, is_self_id) => {
    
// debug($rootScope.patient_data_ui)
//alert(is_self_id)
// alert($rootScope.patient_data_ui.id)
 //alert(id)
 if(is_self_id == false)
 {
    if(id.split('_').slice(0, -1).join('_') == LAB.ref_center_custom_data)
{
    $rootScope.form_code_desc = "Referral Center"
}
if(id.split('_').slice(0, -1).join('_') == LAB.ref_person_custom_data)
{
    $rootScope.form_code_desc = "Referral Person"
} 
 }else{
      $rootScope.form_code_desc = "Patient Data"
 }

$rootScope.hide_add_field_btn = true

        db.get(""+id, function(err, doc) {
           
            if(doc)
            {
              
               
               $rootScope.data_form = doc.my_doc
               
                $rootScope.custom_data_found = true
               
              
               $rootScope.data_form._rev = doc._rev
             
               $rootScope.is_self_id = is_self_id
               $rootScope.form_code = id
             
              
               
            }
            
            
            if (err) {
               
            //  debug(err)
            
            }
          
        
          });







        ngDialog.open({  template: 'dialogs/form.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true,  closeByDocument: true});
    } 

    
    

    //: clear form
    $scope.clear_form = () => {
        $rootScope.ref_data_ui = null
       
        $rootScope.patient_data_ui = null
        $rootScope.table_test_list = []
        $scope.accept_test_data = {}  
        $scope.custom_data_search_field = {}

        $rootScope.total_test_amountxx = 0
        $rootScope.total_discount_amountxx = 0
    }

    //: calculate discount: from ref data, event add test or ref data
    $scope.calc_discount = () => {
     
        if($rootScope.ref_data_ui)
        {
            for(var i in $rootScope.ref_data_ui.data)
            {
             
                if($rootScope.ref_data_ui.data[i].is_discount)
                {
                  ///  debug($rootScope.ref_data_ui.data[i].val)
                    //: apply to disc % and amount
                    for(var y in $rootScope.table_test_list)
                    {
                        $rootScope.table_test_list[y].discount = $rootScope.ref_data_ui.data[i].val
                        //: disc amount
                        $rootScope.table_test_list[y].discount_amount =  $rootScope.table_test_list[y].rate * ($rootScope.ref_data_ui.data[i].val / 100)
                    }
                  //  debug($rootScope.table_test_list.length)
                }
            }
        }
        $scope.calc_test_amount()
    }

    $scope.reactive_update = (val, component_name, index) => {

     var per = 100          
                switch(component_name)
                {
                    case "discount":
//alert($rootScope.table_test_list[index].rate)
     var cur_disc = (parseFloat(val) / per)

     var mdisc = cur_disc * $rootScope.table_test_list[index].rate

    // var disc_amt = ($rootScope.table_test_list[index].rate - mdisc)

     //$rootScope.table_test_list[index].rate = disc_amt

     $rootScope.table_test_list[index].discount_amount = mdisc

     //: update the test amount
     $scope.calc_test_amount()    

     
     
                    break;

                    case "discount_amount":                   

     
     var cur_disc = (val / $rootScope.table_test_list[index].rate) * 100
        
     $rootScope.table_test_list[index].discount = cur_disc
     
          //: update the test amount
          $scope.calc_test_amount()    
     

                    break;

                    case "tax_per":
//alert($rootScope.table_test_list[index].rate)
var cur_tax = (parseFloat(val) / 100)

     var mtax = cur_tax * $rootScope.table_test_list[index].rate

    

     $rootScope.table_test_list[index].tax_amount = mtax

     //: update the test amount
     $scope.calc_test_amount()    


                    break;

                    case "tax_amount":
 
                    var cur_tax = (val / $rootScope.table_test_list[index].rate) * 100
                    
                 $rootScope.table_test_list[index].tax_amount = cur_tax
                 
                      //: update the test amount
                      $scope.calc_test_amount()    
                 
                    break;
                }
    }
 $scope.select_css_row = (ar, index) => {
        // for(var i in ar)
        // {
        //     if(i == index)
        //     {
        //         ar[i].selectedrow = true
              
        //     }else{
        //         ar[i].selectedrow = false
        //     }
        // }
 }
    //: CHOOSE TESTS IN DEPARTMENT
    $scope.select_department_x = {}
    //:select test in cat
    $scope.select_test_in_cats = (d, index) => {
    //   var cat_id = d.id
    //   $scope.select_css_row($rootScope.all_dep_cats, index)
    //   d.selectedrow = true
    // //  alert(cat_id)
    //   db.find({
    // selector: {table_name: "department_master_test_list", category_id: cat_id},
    //     sort: [{'_id': 'desc'}],
    //    include_docs: true,
    //     attachments: true, 
    //    limit: 1000
    //   }).then(function (result) {
        
    //      $rootScope.display_all_test_scope = []
      
    //     result.docs.map(function(row) { 
    
    //     $rootScope.display_all_test_scope.push(row.my_doc)
       
        
    //     })
       
    // })

    }

    //: INVENTORY
    $scope.inventory_master = {}
    
    $scope.inventory_master_list = []
   

    $scope.add_inventory_item = () => {
    
     //: make sure code and name are filled
     if(! $scope.inventory_master.item_code)
     {
         alertError("Empty item code")
         return 
     }
     if(! $scope.inventory_master.item_name)
     {
         alertError("Empty item name")
         return
     }
     
     
     $scope.inventory_master.general_code = $scope.inventory_master.item_code.toUpperCase()
     //: include the branch code
     $scope.inventory_master.item_code = $scope.inventory_master.item_code.toUpperCase()+"_"+$scope. accept_test_data.doc_branch_code
     //: make sure the item code is unique

     
     db.get(""+LAB.inventory+$scope.inventory_master.item_code, function(err, doc) {
        
        if(doc)
        {
          alertInfo("Code already exist") 
          return
            
        }
        
        
        if (err) { 
            //: 
            
            var table = {
                _id: ""+LAB.inventory+$scope.inventory_master.item_code,
                table_name: LAB.inventory,
                my_doc: $scope.inventory_master,
                branch_code: $scope.accept_test_data.doc_branch_code
              }
               
              
              add_doc2(table);
              $scope.inventory_master_list.push($scope.inventory_master)
        
        }
      
    
      });
           
    }
   
    $scope.list_inventory = () => {
        
        // $scope.inventory_master_list = []
     
        // db.find({
        //     selector: {table_name: LAB.inventory, branch_code: $scope.accept_test_data.doc_branch_code},
        //         sort: [{'_id': 'desc'}],
        //        include_docs: true
        //       }).then(function (result) {
                
        //          $scope.inventory_master_list = []
              
        //         result.docs.map(function(row) { 
            
        //             $scope.inventory_master_list.push(row.my_doc)
               
                
        //         })

             
               
        //     })

    }
$scope.list_inventory_logs = () => {
        
        // $scope.inventory_master_list_logs = []
       
        // db.find({
        //     selector: {table_name: "inventory_log", branch_code: $scope.accept_test_data.doc_branch_code},
        //     sort: [{'_id': 'asc'}],
        //        include_docs: true
        //       }).then(function (result) {
                
        //          $scope.inventory_master_list_logs = []
            
        //         result.docs.map(function(row) { 
            
        //             $scope.inventory_master_list_logs.push(row)
               
                
        //         })

             
               
        //     })

    }
    
    $scope.list_perform_test_logs = () => {
        
        // $scope.perform_test_list_logs = []
       
        // db.find({
        //     selector: {table_name: "perform_the_test", branch_code: $scope.accept_test_data.doc_branch_code},
        //     sort: [{'_id': 'desc'}],
        //        include_docs: true
        //       }).then(function (result) {
                
        //          $scope.perform_test_list_logs = []
            
        //         result.docs.map(function(row) { 
            
        //             $scope.perform_test_list_logs.push(row)
               
                
        //         })

             
               
        //     })

    }
    

    $scope.assign_stock_to_test = () => {
        var checkboxes = []
        for(var i in $scope.inventory_master_list)
        {
            if($scope.inventory_master_list[i].emma)
            {
               // alert($scope.inventory_master_list[i].item_code)
                checkboxes.push({code: $scope.inventory_master_list[i].item_code})
            }
        }
        if(checkboxes.length > 0)
        {
            $rootScope.inventory_codes = checkboxes
            ngDialog.open({ template: 'dialogs/inventory-to-test.html', className: 'ngdialog-theme-default custom-width', closeByDocument: false, closeByNavigation: true, closeByEscape: true, appendTo: "body"});

        }else
        alertInfo("select inventory")
    }
    $scope.assign_stock_to_profile = () => {
        var checkboxes = []
        for(var i in $scope.inventory_master_list)
        {
            if($scope.inventory_master_list[i].emma)
            {
               // alert($scope.inventory_master_list[i].item_code)
                checkboxes.push({code: $scope.inventory_master_list[i].item_code})
            }
        }
        if(checkboxes.length > 0)
        {
            $rootScope.inventory_codes = checkboxes
            ngDialog.open({ template: 'dialogs/inventory-to-profile.html', className: 'ngdialog-theme-default custom-width', closeByDocument: false, closeByNavigation: true, closeByEscape: true, appendTo: "body"});

        }else
        alertInfo("select inventory")
    }

    $scope.convert_group_inventory = (txt, val) => {
       
        switch(txt)
        {
            case "gcost":
            $scope.inventory_master.cost = parseFloat(val) / parseFloat($scope.inventory_master.conv_value)
          

            break;

            case "uconversion":
            $scope.inventory_master.cost = parseFloat($scope.inventory_master.gcost) / parseFloat(val)
            $scope.inventory_master.qty = parseFloat($scope.inventory_master.conv_value) * parseFloat(val)

          

            break;

            case "gqty":
            
            $scope.inventory_master.qty = parseFloat($scope.inventory_master.conv_value) * parseFloat(val)          

            break;


        }

    }
    //: remove pay
    $scope.remove_pay = (index) => {
      
                $scope.accept_pay.splice(index, 1)
                $scope.get_accept_test_balance ()
    }
    //: get accept test balance
    if(! $rootScope.total_test_paid)
    $rootScope.total_test_paid = 0
    $scope.get_accept_test_balance = () => {
        //: amount paid 
        $rootScope.total_test_paid = 0
        $scope.accept_pay.map(function(row){

           var amt = row.amount.replace(",", "")
           $rootScope.total_test_paid = parseFloat($rootScope.total_test_paid) +  parseFloat(amt) 
        })
     
    }
    //: update bal
    $scope.update_bal = () => {
       $scope.get_accept_test_balance ()
    }

     //: format numfield
    $scope.format_num = (model, index) =>  {
      model[index].amount.replace(",", "")
      model[index].amount = parseFloat(model[index].amount)      
       
     model[index].amount = R_SERVICE.moneyFormat(model[index].amount)     
     
    
    }

    //: accept payments
    $scope.accept_pay = [{name: "Cash", amount: ""}]
    $scope.update_payment_type = () => {
        var chk = false
        $scope.accept_pay.map(function(row){
            if(row.name == $scope.accept_test_data.pay_type)
            {
                chk = true
            }
        })
        if(chk == false)
        $scope.accept_pay.push({name: $scope.accept_test_data.pay_type, amount: ""})

     
    }

    $scope.remove_pat_ref_data = (d) => {
        
         if(d.scope == 'ref_data_uix')
         {
             
            $rootScope.ref_data_ui.attached_ref = null
         }
         if(d.scope == 'ref_data_ui')
         {
           
             $rootScope.ref_data_ui = null
         }
    }
//    $scope.myMapFunction = (doc) => {
//   if (doc.table_name === "department_master_test_list") {

//     if(doc.ref)
//     {
//       if(doc.ref[0].age_range_2 == 12)
//       {
//        emit(doc._id) 
//       }
      
//     }
    
//   }
// }
      $rootScope.get_my_ref_ranges =  function (test_code_id) {
       $rootScope.rref_range = {}  
      return $q(function(resolve, reject) {

    //     db.query($scope.myMapFunction, {
    //        key: test_code_id,
    //       include_docs : true
    //     }).then(function (result) {
    //       // handle result
    //       console.log(result)
    // }).catch(function (err) {
    //   // handle errors
    //   console.warn(err)
    // });




    //     db.find({
    //     selector: {
    //        table_name: "department_master_test_list", _id: test_code_id
    //     }

    //     }).then(function (result) {
           
    //        result.docs.map(function(row) { 
    //             if(row.ref)
    //             {
    //               //console.log(row._id)
    //               //console.log(row.ref)
    //              // console.log($rootScope.age)
    //              // console.log($rootScope.sex)
    //               for(var i in row.ref)
    //               {
    //                  if(row.ref[i].sex.trim() == $rootScope.sex.trim())
    //                  {
    //                   //: find the age range
    //                   if(row.ref[i].month_years == "Years")
    //                   {
    //                      if($rootScope.age > row.ref[i].age_range_1 && $rootScope.age <= row.ref[i].age_range_2)
    //                      {
    //                         resolve(row.ref[i])
    //                         break
    //                      }
    //                   }

    //                  }
    //               }

    //             }

    //        })

    //    })

         
    // db.search({
    //   query: "1",
    //   fields:  ['ref[0].age_range_1'],
    //   include_docs: true,
    //   limit: 10
    //       }).then(function (result) {
    //         console.log(result)

    //       })
           
      // db.get(test_code_id, function(err, doc){

      //   if(doc)
      //   { 
      //     if(! doc.ref) 
      //     {
          
      //       resolve("false")           
            
      //     }else
      //     {
      //       //$rootScope.rref_range[test_code_id] = doc.ref

      //     resolve(doc.ref)
      //     }
      //   }

     

      //  })

      })

    }
   
   $scope.get_d_particular_ref = (ar, id) => {

    for(var i in ar)
    {
      if(ar[i].id == id)
      {
        return ar[i].data
      }
    }
    return false

   }

    //: get the name of test cat, profile name and test name
    $rootScope.sub_profiled_tests = []
    $scope.get_name_testcat_profname = (code, index) => {
      
            db.get(""+code, function(err, doc) {
                
            if(doc)
            {
               $rootScope.rref_range_x = [] 
               // alert($rootScope.age)
               // alert($rootScope.sex)
             $rootScope.we_perform_tests[index].custom_name = doc.my_doc.name 
            if(code.split('_').slice(0, -1).join('_') == "department_master_test_list")
            {

             //  console.log($rootScope.we_perform_tests[index].id)
              
            

            $scope.get_my_ref_ranges($rootScope.we_perform_tests[index].id).then(function(e){
              
              $rootScope.rref_range_x.push({id: $rootScope.we_perform_tests[index].id , data: e})
              // console.log($rootScope.we_perform_tests[index].id)
            // console.log(e)


             
             })

           
                
             db.get(""+doc.category_id, function(err, doc) {
                    
                if(doc)
                {
                    $rootScope.we_perform_tests[index].custom_name_x = doc.my_doc.name 
                    
                }

                   })
                  
          
                
            }
           
            if(code.split('_').slice(0, -1).join('_') == "profile_master")
            {
                
              $rootScope.count_profile_test.push(index)
                
              // alert("profile")
              //debug(doc.my_doc.profiled_tests)
       
               db.allDocs({include_docs: true, keys: doc.my_doc.profiled_tests}).then(function(r){
               $rootScope.we_profiled_tests = []
               $rootScope.mcnt = $rootScope.mcnt + 1
             
                r.rows.map(function(row) { 
                    
                     //console.log(row.doc.my_doc.code)
                     //  debug(row.doc.my_doc)
                    $rootScope.we_profiled_tests.push(row.doc.my_doc)
                       
                        
                    })

                    $rootScope.sub_profiled_tests.push($rootScope.we_profiled_tests)
                    $rootScope.we_profiled_tests = $rootScope.sub_profiled_tests[$rootScope.mcnt]

              // debug($rootScope.we_profiled_tests)
             // alert($rootScope.mcnt)
             //: get the internal tests in profile
            
             $rootScope.sub_profiled_tests[$rootScope.mcnt].forEach(function(item, i) {

                   $scope.get_my_ref_ranges($rootScope.sub_profiled_tests[$rootScope.mcnt][i].id).then(function(e){
              
                // $rootScope.rref_range[$rootScope.sub_profiled_tests[$rootScope.mcnt][i].id] = e

              $rootScope.rref_range_x.push({id: $rootScope.sub_profiled_tests[$rootScope.mcnt][i].id, data: e })

              //console.log($rootScope.sub_profiled_tests[$rootScope.mcnt][i].id)
              //console.log(e)
             })

            });
             //  for(var em in $rootScope.sub_profiled_tests[$rootScope.mcnt])
             //  {
             
             //  //console.log($rootScope.sub_profiled_tests[$rootScope.mcnt][em].id)
             //  $scope.get_my_ref_ranges($rootScope.sub_profiled_tests[$rootScope.mcnt][em].id).then(function(e){
              
             //     $rootScope.rref_range[$rootScope.sub_profiled_tests[$rootScope.mcnt][em].id] = e

             //  // console.log($rootScope.rref_range)
             // })
             //  }
             // $scope.get_my_ref_ranges($rootScope.sub_profiled_tests[$rootScope.mcnt][0].id).then(function(e){
             //  console.log(e)
             // })
             //console.log($rootScope.mcnt)
             //console.log($rootScope.sub_profiled_tests[$rootScope.mcnt][0].id)
             //console.log($rootScope.rref_range)
             
            
              // $rootScope.we_profiled_tests = $rootScope.sub_profiled_tests[$rootScope.mcnt]
            
                    })





            }




            }
                
                
                if (err) { 
            
                  alert("Not found.")
                
                }
              
            
              });
            
        
        

    }
   
    $scope.naive_key = (val, array) => {
        var cnt  = -1
        for(var i in array)
        {
            cnt++
            if(val == array[i])
            {
              return cnt  
            }
            
        }
            return cnt
    }
     
    $scope.enter_perform_test = (id) => {

        $rootScope.mcnt = -1 // cnt profile
        $rootScope.count_profile_test  = []
        $rootScope.sub_profiled_tests = []
        $rootScope.g_model = []
        $rootScope.push_formulas = []

        $rootScope.grouped_tests = {tests: [], profiles: []}

        $rootScope.all_pef_id = id
        $rootScope.we_perform_tests = id.tests
        $rootScope.real_patient_id = id.patient_id
        $rootScope.real_lab_no = id.lab_no
        db.get(id.patient_id, function(err, doc){
            if(doc)
            { 
                 var age = 0
                 var sex = ""
                 var phone = ""
              for(var i in doc.my_doc) 
              {
                  if(doc.my_doc[i].name.toLowerCase() == "age")
                  {
                     age = doc.my_doc[i].birth_age
                     continue
                  }
                  if(doc.my_doc[i].name.toLowerCase() == "sex")
                  {
                     sex = doc.my_doc[i].val
                  }
                  if(doc.my_doc[i].name.toLowerCase() == "phone number")
                  {
                     sex = doc.my_doc[i].val
                  }
              } 
             $rootScope.age =  age
             $rootScope.sex = sex
             $rootScope.phone = phone

             if(sex.toUpperCase().trim() == "M")
             {

              $rootScope.sex = "Male"

             }
             if(sex.toUpperCase().trim() == "F")
             {

              $rootScope.sex = "Female"
              
             }
              $rootScope.is_p_test_exist = false
    //          db.find({
    //         selector: {table_name: $rootScope.real_patient_id, lab_no: $rootScope.real_lab_no},
    //             include_docs: true,
    //             limit: 1
    //       }).then(function (result) {

    //         if(result.docs.length > 0)
    //         {

    //            result.docs.map(function(row) { 
               
    //         var tests = row.tests

    //         $rootScope.grouped_tests = tests
    //          $rootScope.is_p_test_exist = true

    //    ngDialog.open({ template: 'dialogs/view-new-performed-test.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});

         
    //            })
               

    //         }else{
    //           $rootScope.is_p_test_exist = false
    //            ngDialog.open({ template: 'dialogs/view-new-performed-test.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
    //         }


        
    //   })


               
               // ngDialog.open({ template: 'dialogs/view-performed-test.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});

            }
            if(err)
            {
            alert("Invalid patient")
            }
        })
       
        
    }
     $rootScope.g_model = []
     $rootScope.push_formulas = []

    //: save reference ranges
    $scope.calc_formulas = (id, formula, all_tests, code, thisval) => {
        // debug(id)
        //debug(code)
        // debug(formula)
        // debug(all_tests)
        //alert(thisval)
        // debug($rootScope.g_model)
        var flevel = code.split("_").pop()


        //: search for tests with formulas
        for(var k in all_tests)
        {

           //: first level
           switch(flevel)
           {
            case "1":
                //: get the test code that have a formula
                if(all_tests[k].formula_1)
                {
                 
                 all_tests[k].formula_1 = all_tests[k].formula_1.toUpperCase()
                  //: update this index
                  var is_there = false
                  for(var emm in $rootScope.push_formulas)
                  {
                     if($rootScope.push_formulas[emm].str == '['+code+']')
                     {
                      $rootScope.push_formulas[emm].val = thisval
                      is_there = true
                     }
                  }
                  if(is_there == false)
                  $rootScope.push_formulas.push({str: '['+code+']', val: thisval})

                  var formulax = $rootScope.push_formulas
                 // debug(formulax)
                 var ans = $scope.find_matches(all_tests[k].formula_1, formulax)
                // alert(ans)
                try{
               var mans = eval(ans)
               //alert(mans)

               //: store ans in this all_tests[k].id
               for(var em in $rootScope.g_model)
               {
                  if($rootScope.g_model[em].id == all_tests[k].id)
                  {

                    $rootScope.g_model[em].val_1 = mans
                  
                $("."+all_tests[k].id+"_1").css("border", "1px solid green")
                                 

                   
                  }
               }


                 }catch(ex)
                 {
                // debug(ex)
                  //alert("error")
                 }
                 //alert(ans)



                }


            break;

            case "2":
           
              //: get the test code that have a formula
                if(all_tests[k].formula_2)
                {
                 
                 
                  //: update this index
                  var is_there = false
                  for(var emm in $rootScope.push_formulas)
                  {
                     if($rootScope.push_formulas[emm].str == '['+code+']')
                     {
                      $rootScope.push_formulas[emm].val = thisval
                      is_there = true
                     }
                  }
                  if(is_there == false)
                  $rootScope.push_formulas.push({str: '['+code+']', val: thisval})

                  var formulax = $rootScope.push_formulas
                 // debug(formulax)
                 var ans = $scope.find_matches(all_tests[k].formula_2, formulax)
                 alert(ans)
                
                try{
               
               var mans = eval(ans)
               //alert(mans)

               //: store ans in this all_tests[k].id
               for(var em in $rootScope.g_model)
               {
                  if($rootScope.g_model[em].id == all_tests[k].id)
                  {

                    $rootScope.g_model[em].val_2 = mans
                  
                $("."+all_tests[k].id+"_2").eq(0).css("border", "1px solid green")
                                 

                   
                  }
               }


                 }catch(ex)
                 {
                // debug(ex)
                  //alert("error")
                 }
                 //alert(ans)



                }





            break;


           }

        }
        
         
          //: PARSES A STRING AND MATCH
        // var mystring = "([p_2]*[q_1]) / ([z_2] * [t_1])"

       
        // var matches = mystring.match(/\[(.*?)\]/g);
        // //var matches = mystring.match(/\([^)^a-zA-Z]+\)/g)
        // if (matches) {
        //     var mm = []
        //     for(var i in matches)
        //     {
        //         var vmatch =  matches[i]
        //         var vv = 0
        //         switch(vmatch)
        //         {
        //             case "[p_2]":
        //         vv = 90
        //      mystring =  mystring.replace(vmatch, vv)
              

        //             break;
        //             case "[q_1]":
        //              vv = 100
        //              mystring =  mystring.replace(vmatch, vv)
        //             break;
                    
        //             case "[t_1]":
                    
        //             vv = 300
        //             mystring =  mystring.replace(vmatch, vv)
        //             break;

        //             case "[z_2]":
        //             vv = 500
        //             mystring =  mystring.replace(vmatch, vv)          
        //             break;

        //         }
           
        //     }
        //     alert(mystring)
        //    var ee = eval(mystring)
        //     alert(ee)
            
        // }
    }

    $rootScope.find_matches = (strx, formulax) => {

       var mystring = strx //"([p_2]*[q_1]) / ([z_2] * [t_1])"

       
        var matches = mystring.match(/\[(.*?)\]/g);
        //var matches = mystring.match(/\([^)^a-zA-Z]+\)/g)
        if (matches) {

            
            for(var i in matches)
            {
                var vmatch =  matches[i]

                for(var ii in formulax)
                {

                if(vmatch.toUpperCase() == formulax[ii].str.toUpperCase())
                {
                    var vv = formulax[ii].val

               
                    mystring =  mystring.replace(vmatch, vv) 
                }


                }
                          
           }


         }
              
         
            //alert(mystring)
           //var ee = eval(mystring)
            //return (ee)

            return mystring
            
        
    }

   
    //$rootScope.global_units = ['mg/L', 'Litre', 'mMol', 'kMol'] 
      //: setting for units, sms and email
      $scope.business_settings = {}
      $scope.social_settings = {}
      $scope.units_settings = {}

      $scope.settings_sms_social_units = function(type, data, table_name)
      {
         var mdata = {
          table_name: table_name,
          my_doc: data
         }
         var id = "global_settings_"+type
         mdata._id = id
         db.get(id, function(err, doc){
            if(doc)
            {
              var revid = doc._rev
              mdata._rev = revid
              add_doc2(mdata)             

            }

            if(err)
            {

              add_doc2(mdata)  


            }
          })

      }
      //: get address
      $rootScope.get_business_address = function(id)
      {

          db.get(id, function(err, doc){
            if(doc)
            {

              $rootScope.address_per_branch = doc.my_doc.address
            }

          })

      }
      
         $scope.settings_sms_social_units_get = function(id, type){
         
        //   db.get(id, function(err, doc){
        //     if(doc)
        //     {

        //       switch(type)
        //       {
        //         case "business":
        //         $scope.business_settings = doc.my_doc
                

        //         break;

        //         case "social":
        //         $scope.social_settings = doc.my_doc
        //         break;

        //         case "units":
        //         $scope.units_settings = doc.my_doc
        //       //  debug($scope.units_settings)
        //         $rootScope.global_units = $scope.units_settings.units.split("\n")
        //         break;


        //       }

        //     }

            
        //   })


         }

     //: load units
    $scope.settings_sms_social_units_get('global_settings_units', 'units')
   // var gset = $scope.units_settings
   
    //: display css reference
      $rootScope.property_reference = function(){

         ngDialog.open({ template: 'dialogs/css-reference.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});

      }

      //: SAVE SETTINGS FOR RESULT
      
      $rootScope.save_settings = () => {

    //   $(".test-header").css($rootScope.result_settings_config.test_header)
    //   $(".all-tests").css($rootScope.result_settings_config.test_profile)
    //   $(".all-profiles").css($rootScope.result_settings_config.test_profilep)

    // $(".preview-test-new tr td").css($rootScope.result_settings_config.result_general)
    // $(".cat_name").css($rootScope.result_settings_config.result_general_h)

    //    // //: header padding setting
    //    if($rootScope.result_settings_config.test_header_padding)
    //      $(".test-header td").css($rootScope.result_settings_config.test_header_padding)
        
    //    //  //:header width setting
    //    if($rootScope.result_settings_config.test_header_width)
    //     $(".test-header td").css($rootScope.result_settings_config.test_header_width)

    //    //  //: header font settings
    //    if($rootScope.result_settings_config.test_header_font)
    //    $(".test-header td").css($rootScope.result_settings_config.test_header_font)  

       //: GRID SETTINGS - HEADER
        if($rootScope.result_settings_config.grid_header0)
       {
        var mparse = $rootScope.result_settings_config.grid_header0.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
         
         $(".test-header").css(css_style) 
       }
       if($rootScope.result_settings_config.grid_header1)
       {
        var mparse = $rootScope.result_settings_config.grid_header1.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
         
         $(".bio-row-1").css(css_style) 
       }
      
  
       if($rootScope.result_settings_config.grid_r1_c1) 
       {
        var mparse = $rootScope.result_settings_config.grid_r1_c1.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
          // debug(css_style)
         
        $(".bio-row-1 .bio-col-1").css(css_style) 
       }
       
       if($rootScope.result_settings_config.grid_r1_c2)
       {

          var mparse = $rootScope.result_settings_config.grid_r1_c2.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }

          $(".bio-row-1 .bio-col-2").css(css_style) 
       }
       
      if($rootScope.result_settings_config.grid_r1_c3)
      {

       
          var mparse = $rootScope.result_settings_config.grid_r1_c3.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
          $(".bio-row-1 .bio-col-3").css(css_style) 
      }
      
      
      if($rootScope.result_settings_config.grid_r1_c4)
      {


          var mparse = $rootScope.result_settings_config.grid_r1_c4.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
          $(".bio-row-1 .bio-col-4").css(css_style) 

      }
       
      
      if($rootScope.result_settings_config.grid_header2)
      {

          var mparse = $rootScope.result_settings_config.grid_header2.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
          $(".bio-row-2").css(css_style) 
      }
      


        if($rootScope.result_settings_config.grid_r2_c1)
        {

          var mparse = $rootScope.result_settings_config.grid_r2_c1.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
         
           $(".bio-row-2 .bio-col-1").css(css_style) 
        }
    
        if($rootScope.result_settings_config.grid_r2_c2)
        {
           var mparse = $rootScope.result_settings_config.grid_r2_c2.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
         
           

          $(".bio-row-2 .bio-col-2").css(css_style) 
        }
       
        if($rootScope.result_settings_config.grid_r2_c3)
        {
            var mparse = $rootScope.result_settings_config.grid_r2_c3.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
         
           

         $(".bio-row-2 .bio-col-3").css(css_style) 

        }
     
        if($rootScope.result_settings_config.grid_r2_c4)
        {
          var mparse = $rootScope.result_settings_config.grid_r2_c4.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
            
           $(".bio-row-2 .bio-col-4").css(css_style)
        }
      
        if($rootScope.result_settings_config.grid_header3)
        {

          var mparse = $rootScope.result_settings_config.grid_header3.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
        
          $(".bio-row-3").css(css_style)
        }

        if($rootScope.result_settings_config.grid_r3_c1)
        {

           var mparse = $rootScope.result_settings_config.grid_r3_c1.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
        
          
           $(".bio-row-3 .bio-col-1").css(css_style)
        }
      
       if($rootScope.result_settings_config.grid_r3_c2)
       {


           var mparse = $rootScope.result_settings_config.grid_r3_c2.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
        
         
        $(".bio-row-3 .bio-col-2").css(css_style)
       }
       
        if($rootScope.result_settings_config.grid_header4)
        {

          var mparse = $rootScope.result_settings_config.grid_header4.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
                $(".bio-row-4").css(css_style) 
        }
       
       if($rootScope.result_settings_config.grid_r4_c1)
       {


           var mparse = $rootScope.result_settings_config.grid_r4_c1.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
         
           

        
                $(".bio-row-4 .bio-col-1").css(css_style) 

       }
       
        if($rootScope.result_settings_config.grid_r4_c2)
        {

           var mparse = $rootScope.result_settings_config.grid_r4_c2.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
         
           

        
                $(".bio-row-4 .bio-col-2").css(css_style) 
        }


        //: GRID SETTINGS - test tables and profile
      //: each rows for test or profile
    if($rootScope.result_settings_config.grid_tr)
       {
        var mparse = $rootScope.result_settings_config.grid_tr.split(",")
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }
         
         $(".test_, .test_ td").css(css_style) 
       }
       //: for test profile col headers and body
       var tp_colh = [
       {model: "grid_test_prof_header", css: ".preview-test-new tr.header, .preview-test-new tr.header"},
       {model: "grid_th1", css: ".preview-test-new tr.header .bio-col-1"}, {model: "grid_th2", css: ".preview-test-new tr.header .bio-col-2"}, {model: "grid_th3", css: ".preview-test-new tr.header .bio-col-3"}, {model: "grid_th4", css: ".preview-test-new tr.header .bio-col-4"}, {model: "grid_th5", css: ".preview-test-new tr.header .bio-col-5"},  {model: "grid_test_prof_title", css: ".cat_name"}, {model: "grid_tc1", css: ".preview-test-new tr.test_ .bio-col-1"}, {model: "grid_tc2", css: ".preview-test-new tr.test_ .bio-col-2"}, {model: "grid_tc3", css: ".preview-test-new tr.test_ .bio-col-3"}, {model: "grid_tc4", css: ".preview-test-new tr.test_ .bio-col-4"}, {model: "grid_tc5", css: ".preview-test-new tr.test_ .bio-col-5"}, {model: "grid_th_col", css: ".preview-test-new tr.header, .preview-test-new tr.header td"}
       ]
       for(var em in tp_colh)
       {

      
       if($rootScope.result_settings_config[tp_colh[em].model])
       {

        var mparse = $rootScope.result_settings_config[tp_colh[em].model].split(",")
      
        var css_style = {}
        for(var i in mparse)
        {
          
            var ssplit = mparse[i].split(":")
            css_style[ssplit[0].trim()] = ssplit[1].trim()
        
        }

       

         $(""+tp_colh[em].css).css(css_style) 
       }

     }
        
      
      

       var table = {
        _id: "result_report_settings",
        modified: new Date().getTime(),
        settings:$rootScope.result_settings_config  
                    }

           
      //: before save 
      db.get("result_report_settings", function(err, doc){

        if(doc)
        {
            
            table._rev = doc._rev

             add_doc2(table)

        }

        if(err)
        {
         
           add_doc2(table)
        }
        alertInfo("Setting saved successfully")
      


      })
     


        
      }
      // $rootScope.email_sender = {}
      // $rootScope.sms_sender = {}
      $scope.approve_test = function(test)
      {
          if(confirm("Are you sure?") == false)
          {
            return false
          }
           db.get(test._id, function(err, doc){

            if(doc)
            {

              var old_doc = doc
              old_doc.approved = "yes"
              old_doc.css = "approved"
              test.css = old_doc.css
               add_doc2(old_doc)

            }


           })
      }
      $scope.email_sms = function(test)
      {
        
       // log(test.my_doc[0].patient)
      $rootScope.email_sender = {}
      $rootScope.sms_sender = {}
      var pbio = R_SERVICE.get_patient_bio(test.my_doc[0].patient.data)
       //log(pbio)
      $rootScope.email_sender.patient_full_name = pbio.name
      $rootScope.email_sender.recipient_email = pbio.email
      var appxx = require("electron").remote;
     
      var rep = appxx.app.getPath("documents")+"\\bio-labmaster\\reports"
        $rootScope.email_sender.attachment = rep+"\\"+test.lab_no+".pdf"
      //  $rootScope.email_sender.attachment = __dirname+"/reports/"+test.lab_no+".pdf"
        $rootScope.sms_sender.phone_number = pbio.phone
        $rootScope.sms_sender.sender_name = "Biosystems"
         $rootScope.email_sender.subject = "Investigation Report"
         $rootScope.email_sender.message = "Please find attached"
         db.get("global_settings_social", function(err, doc){
            if(doc)
            {
            $rootScope.sms_sender.message =  doc.my_doc.test_result_format
            }

          })
        ngDialog.open({ template: 'dialogs/email-sms.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
      }
      $scope.show_email = function()
      {
        $scope.toggle_email_sms = false
      }
      $scope.show_sms = function()
      {
        $scope.toggle_email_sms = true
      }

      $rootScope.processing = true
      $scope.send_email_now = function(){

        $rootScope.processing = false
       // debug($scope.email_sender)
        //alert("ok good to go")
        //: make a post request to a remote server and send email
        var formData = {
            // Pass a simple key-value pair
            post_file: 'yes',
            message: $rootScope.email_sender.message == null ? "" : $rootScope.email_sender.message,
            email: $rootScope.email_sender.recipient_email,
            name: $rootScope.email_sender.patient_full_name,
            ref_name: "",
            subject: $rootScope.email_sender.subject,
            custom_file: {
              value:  fs.createReadStream($rootScope.email_sender.attachment),
              options: {
                filename: 'test-result.pdf',
                contentType: 'application/pdf'
              }
            }
          };
          request.post({url: LAB.post_url, formData: formData}, function optionalCallback(err, httpResponse, body) {
            $rootScope.processing = true
            if (err) {
              return console.error('upload failed:', err);
            }
         // console.log('Upload successful!  Server responded with:', body);
          alertInfo(body);
           // alert(JSON.stringify(body))
          });
        
      }
      $scope.send_sms_now = function(){
        $rootScope.processing = false
       // debug($scope.sms_sender)
         db.get("global_settings_social", function(err, doc){
            if(doc)
            {
              //: construct the get request
             // log(doc.my_doc)
              var host = doc.my_doc.sms_host
              var post_body = {}
              post_body[doc.my_doc.message_key] = $scope.sms_sender.message.replace("{name}", $rootScope.email_sender.patient_full_name)
              post_body[doc.my_doc.sender_name_key] = $scope.sms_sender.sender_name
              post_body[doc.my_doc.phone_number_key] = $scope.sms_sender.phone_number.replace(/^0+/, '+234');
              //post_body.sms_host = host
            //: make a post request to deliver SMS

             request.post({url: host, formData: post_body}, function optionalCallback(err, httpResponse, body) {
            $rootScope.processing = true
            if (err) {
              return console.error('Error:', err);
            }
        
             alertInfo(body);
        
          });
            
            }

          })
        //: get the parameters
        
//        request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
// });
        
        }
      $scope.openResult = function(){
         ipcRenderer.send("open-report", $rootScope.email_sender.attachment)
        //alert("about to open file")
      }

      //: edit profile
      $scope.edit_profile = function(id){
          db.get(id, function(err, doc){
            if(doc)
            {
              $rootScope.save_profile_edit = {}
             
               $rootScope.save_profile_edit = doc.my_doc
               $rootScope.save_profile_edit.profile_summary = atob($rootScope.save_profile_edit.profile_summary)
             //  log()
                 ngDialog.open({ template: 'dialogs/save-profile.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true });

            }
          })
      }
       //: save changes to profile
       $scope.save_changes_to_profile = (id) => {

         db.get(id, function(err, doc){
            if(doc)
            {

             //debug($rootScope.save_profile_edit) 

               //: base 64 encode
    $rootScope.save_profile_edit.profile_summary = btoa($rootScope.save_profile_edit.profile_summary)

     var table_name = "profile_master"
     var _id = table_name+"_"+$rootScope.save_profile_edit.code.toUpperCase()
     $rootScope.save_profile_edit.sno =  doc.my_doc.sno
     //alert(_id)
    
     var table = {
         _id: ""+_id,
         _rev: doc._rev,
         table_name: table_name,
         my_doc: $rootScope.save_profile_edit
       }      
       add_doc2(table)
            }

          })
       }
       $scope.delete_many_tests = function()
       {
           if(confirm("Do you still want to delete?") == false)
           return
        $rootScope.list_m_tests.map(function(row){
        if(row.emma)
         {
           

            db.remove(row.id, row.rev);
            $rootScope.list_m_tests = $rootScope.list_m_tests.filter(function(el) {
                return el.code !== row.code
            });
            
           

         }

        })

       }
       $scope.delete_tests = function(){
        // db.find({
        //     selector: {table_name: "department_master_test_list"},
        //         sort: [{'_id': 'desc'}],
        //        include_docs: true,
        //         attachments: true, 
        //        limit: 5000
        //       }).then(function (result) {
        //           $rootScope.list_m_tests = []
        //           result.docs.map(function(row){
        //             $rootScope.list_m_tests.push({id: row._id, rev: row._rev, name: row.my_doc.name, code: row.my_doc.code.toUpperCase()})
        //           })

        //     ngDialog.open({ template: 'dialogs/delete-tests.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
        //       })
                
        
       
       }
      //: delete profile
      $scope.delete_profile = function(id){
        if(confirm("Are you sure?") == false){
          return
        }
        db.get(id).then(function (doc) {
          alertSuccess("completed.")
        db.remove(doc._id, doc._rev);
       // log($scope.profile_list)
         for(var i in $scope.profile_list)
         {
            if($scope.profile_list[i].id == id)
            {
              $scope.profile_list.splice(i, 1)
            }
         }
         //var remote = require("electron").remote
         // remote.getCurrentWindow().reload();
         return false
        });

      }

      //:add po
      $scope.add_po = function(model){
        model.push({name: ["Bread", "Sugar"], category: "Custom" })
      }
      $scope.po = []
      $scope.remove_po = function(i){
       
        for($i = 0; $i <  $scope.po.length; $i++)
        {
            if($i == i)
            {
                $scope.po.splice($i, 1)
                console.log($i)
            }
        }
        
      }


     

      
  
    



})
//: child controller for listing
app.controller("list_ctrl", function($scope, $location, $compile){ 
  
    $scope.tinymceOptions = {
        plugins: 'link image code table preview pagebreak print preview media textcolor imagetools fullscreen advlist autolink lists',
        toolbar: 'bold italic underline | bullist numlist  outdent indent | alignleft aligncenter alignright alignjustify fontname forecolor backcolor | table | pagebreak | imagetools | fullscreen | print | code',
        pagebreak_separator: "<div class = 'page-break'></div>",
        forced_root_block: 'p'


      };
      var view =  $location.path().split("/")[1]
      
      switch(view)
      {
         case "perform_test":
         //: list all tests
         $scope.perform_test_list = []
         $scope.spinner = 0
        //  db.find({
        //     selector: {table_name: "accept_test"},
        //     sort: [{'_id': 'desc'}],
        //    include_docs: true,
        //     attachments: true, 
        //     limit: 1000
        //   }).then(function (result) {
            
        //     result.docs.map(function(row) { 
              
          
        //      $scope.perform_test_list.push(row.my_doc)
           
            
        //     })
        //     $scope.spinner = 1
        // })
            
      
         
          break;




      }
 $scope.spinnerx = 0
$scope.accept_test_list_fxn = function(){

  $scope.accept_test_list = []
 
  
        // db.find({
        //     selector: {table_name: "perform_the_test", branch_code: $scope.accept_test_data.doc_branch_code},
        //     sort: [{'_id': 'desc'}],
        //        include_docs: true,
        //        limit: 200
        //       }).then(function (result) {
        //          $scope.spinnerx = 1
        //          $scope.accept_test_list = []
            
        //         result.docs.map(function(row) { 
            
        //             $scope.accept_test_list.push(row)
               
                
        //         })

             
               
        //     })
}




})

app.controller("test_performed", function($scope, $rootScope, $location, $q, $timeout, ngDialog, $sce, $compile){ 
    
    $scope.parseHtml = function(html){
        return $sce.trustAsHtml(html);
    }
$scope.tinymceOptions = {
        plugins: 'link image code table preview pagebreak print preview media textcolor imagetools fullscreen advlist autolink lists tabfocus',
        toolbar: 'bold italic underline | bullist numlist  outdent indent | alignleft aligncenter alignright alignjustify | fontselect fontsizeselect |  forecolor  backcolor | table | pagebreak | imagetools | fullscreen | print | code',
        pagebreak_separator: "<div class = 'page-break'></div>",
        forced_root_block: 'p'

      };
if($rootScope.grouped_tests)
   {
    
     $rootScope.grouped_tests = $rootScope.grouped_tests
   }else{
    $rootScope.grouped_tests = {tests: [], profiles: []}
   }

  //: algo - loop tru tests, get ref range, find similar cat, group
  //then find profile, get the tests inside and ref range
  $scope.sep_profile = []
  $scope.sep_test = []
  $scope.sep_test_cat = []
  for(var i in $rootScope.we_perform_tests)
  {
      //: separate profiles
       if($rootScope.we_perform_tests[i].id.split('_').slice(0, -1).join('_') == "profile_master")
            {

              $scope.sep_profile.push($rootScope.we_perform_tests[i].id)

            }

            if($rootScope.we_perform_tests[i].id.split('_').slice(0, -1).join('_') == "department_master_test_list")
            {
                 
              //: get the category in async
              
              $scope.sep_test.push($rootScope.we_perform_tests[i].id)


            }
     
  }

    //: get data for tests
      db.allDocs({include_docs: true, keys: $scope.sep_test}).then(function(r){
      
         var track_test_cat = []

        r.rows.map(function(row) { 

            if(row.doc)
            {

            ///   alert(row.doc._id)
//: FIND BASED ON REF RANGE
        //         db.find({
        // selector: {
        //    table_name: "department_master_test_list", _id: row.doc._id
        // }

        // }).then(function (result) {
           
           //result.docs.map(function(rowx) { 

                if(row.doc.ref)
                {
              
                  for(var i in row.doc.ref)
                  {

                     if(row.doc.ref[i].sex.trim() == $rootScope.sex.trim())
                     {
                      //: find the age range
                      if(row.doc.ref[i].month_years == "Years")
                      {
                         if($rootScope.age > row.doc.ref[i].age_range_1 && $rootScope.age <= row.doc.ref[i].age_range_2)
                         {
                            var resolve = row.doc.ref[i]

           row.doc.my_doc.lower_bound_1 = resolve.lower_bound_1
            row.doc.my_doc.lower_bound_2 = resolve.lower_bound_2
            row.doc.my_doc.upper_band_1 = resolve.upper_band_1
            row.doc.my_doc.upper_band_2 = resolve.upper_band_2
            row.doc.my_doc.formula_1 = resolve.formula_1
            row.doc.my_doc.formula_2 = resolve.formula_2
          

                            break
                         }


                      }
                     }
                  }
  track_test_cat.push({cat: ! row.doc.category_id ? "Default" : row.doc.category_id, data: []})
  
                $scope.sep_test_cat.push({cat: ! row.doc.category_id ? "Default" : row.doc.category_id, id: row.doc._id, test_code: row.doc.my_doc.code, test_name: row.doc.my_doc.name, range_1: row.doc.my_doc.lower_bound_1, range_2: row.doc.my_doc.lower_bound_2, formula_1: row.doc.my_doc.formula_1, formula_2: row.doc.my_doc.formula_2, type: row.doc.my_doc.report_type, prev_result: {val_1: "", val_2: "", date: ""}, unit_1: row.doc.my_doc.unit_1, unit_2: row.doc.my_doc.unit_2, result_1: "", result_2: "", h_range_1: row.doc.my_doc.upper_band_1, h_range_2: row.doc.my_doc.upper_band_2})







                }else
                {
               
    
  track_test_cat.push({cat: ! row.doc.category_id ? "Default" : row.doc.category_id, data: []})
                $scope.sep_test_cat.push({cat: ! row.doc.category_id ? "Default" : row.doc.category_id, id: row.doc._id, test_code: row.doc.my_doc.code, test_name: row.doc.my_doc.name, range_1: row.doc.my_doc.lower_bound_1, range_2: row.doc.my_doc.lower_bound_2, formula_1: row.doc.my_doc.formula_1, formula_2: row.doc.my_doc.formula_2, type: row.doc.my_doc.report_type, prev_result: {val_1: "", val_2: "", date: ""}, unit_1: row.doc.my_doc.unit_1, unit_2: row.doc.my_doc.unit_2, result_1: "", result_2: "", h_range_1: row.doc.my_doc.upper_band_1, h_range_2: row.doc.my_doc.upper_band_2})

                }


         $scope.new_groupped_test = []
         $scope.new_groupped_test_test = []
        $scope.new_groupped_test_profile = []
       

        for(var io in $scope.sep_test_cat)
        {

          if(check_object_index3($scope.new_groupped_test, $scope.sep_test_cat[io].cat) >  -1)
             {
               var index = check_object_index3($scope.new_groupped_test, $scope.sep_test_cat[io].cat)
                //alert($scope.sep_test_cat[io].cat)              
              $scope.new_groupped_test[index].data.push($scope.sep_test_cat[io])
         
                
             }else
             {

             $scope.new_groupped_test.push({name: $scope.sep_test_cat[io].cat, data: [$scope.sep_test_cat[io]] })
      

             }        

          
            
        } 

        $scope.new_groupped_test_test = $scope.new_groupped_test
        
        if($rootScope.is_p_test_exist == false)         
        $rootScope.grouped_tests.tests = $scope.new_groupped_test_test
          //debug($scope.new_groupped_test_test) 
         
          // })

       //})
      
       
        
            }

           })

      })

       $scope.new_groupped_test_profile = []
       $scope.sep_test_cat = []

      //: profile
      db.allDocs({include_docs: true, keys: $scope.sep_profile}).then(function(r){
      
       
        r.rows.map(function(row) { 

            if(row.doc)
            {
            
            var prof_namex = row.doc.my_doc.name 
           var prof_summary = atob(row.doc.my_doc.profile_summary)
            

         
          $scope.p_test_array = row.doc.my_doc.profiled_tests


          //: START HERE
           //: get data for tests
      db.allDocs({include_docs: true, keys: $scope.p_test_array}).then(function(r){


      
         var track_test_cat = []
          $scope.sep_test_cat = []

        r.rows.map(function(row) { 


            if(row.doc)
            { 
           row.ref = row.doc.ref


       if(row.ref)
      {

    //   if(rowx.ref)
        for(var i in row.ref)
        {


           if(row.ref[i].sex.trim() == $rootScope.sex.trim())
           {
            //: find the age range
            if(row.ref[i].month_years == "Years")
            {
               if($rootScope.age > row.ref[i].age_range_1 && $rootScope.age <= row.ref[i].age_range_2)
               {
                  var resolve = row.ref[i]

 row.doc.my_doc.lower_bound_1 = resolve.lower_bound_1
  row.doc.my_doc.lower_bound_2 = resolve.lower_bound_2
  row.doc.my_doc.upper_band_1 = resolve.upper_band_1
  row.doc.my_doc.upper_band_2 = resolve.upper_band_2
  row.doc.my_doc.formula_1 = resolve.formula_1
  row.doc.my_doc.formula_2 = resolve.formula_2


                  break
               }


            }
           }
        }



track_test_cat.push({cat: ! row.doc.category_id ? "Default" : row.doc.category_id, data: []})
      $scope.sep_test_cat.push({cat: ! row.doc.category_id ? "Default" : row.doc.category_id, id: row.doc._id, test_code: row.doc.my_doc.code, test_name: row.doc.my_doc.name, range_1: row.doc.my_doc.lower_bound_1, range_2: row.doc.my_doc.lower_bound_2, formula_1: row.doc.my_doc.formula_1, formula_2: row.doc.my_doc.formula_2, type: row.doc.my_doc.report_type, prev_result: {val_1: "", val_2: "", date: ""}, unit_1: row.doc.my_doc.unit_1, unit_2: row.doc.my_doc.unit_2, result_1: "", result_2: "", h_range_1: row.doc.my_doc.upper_band_1, h_range_2: row.doc.my_doc.upper_band_2})


      }else
      {
     

track_test_cat.push({cat: ! row.doc.category_id ? "Default" : row.doc.category_id, data: []})
 $scope.sep_test_cat.push({cat: ! row.doc.category_id ? "Default" : row.doc.category_id, id: row.doc._id, test_code: row.doc.my_doc.code, test_name: row.doc.my_doc.name, range_1: row.doc.my_doc.lower_bound_1, range_2: row.doc.my_doc.lower_bound_2, formula_1: row.doc.my_doc.formula_1, formula_2: row.doc.my_doc.formula_2, type: row.doc.my_doc.report_type, prev_result: {val_1: "", val_2: "", date: ""}, unit_1: row.doc.my_doc.unit_1, unit_2: row.doc.my_doc.unit_2, result_1: "", result_2: "", h_range_1: row.doc.my_doc.upper_band_1, h_range_2: row.doc.my_doc.upper_band_2})

      }


$scope.new_groupped_test = []
$scope.new_groupped_test_test = []



for(var io in $scope.sep_test_cat)
{

if(check_object_index3($scope.new_groupped_test, $scope.sep_test_cat[io].cat) >  -1)
   {
     var index = check_object_index3($scope.new_groupped_test, $scope.sep_test_cat[io].cat)
      //alert($scope.sep_test_cat[io].cat)              
    $scope.new_groupped_test[index].data.push($scope.sep_test_cat[io])

      
   }else
   {

   $scope.new_groupped_test.push({name: $scope.sep_test_cat[io].cat, data: [$scope.sep_test_cat[io]] })


   }        


  
} 


      
       
    } // if doc
                              
           })
 
      $scope.new_groupped_test_profile.push({name: prof_namex, summary: prof_summary, data: $scope.new_groupped_test}) 
      //: update profile if empty
      if($rootScope.is_p_test_exist == false) 
      {
        $rootScope.grouped_tests.profiles = $scope.new_groupped_test_profile

      }
      
   //alert(prof_namex)
  
       
     
           
      }) // end test profile data

          //: END HERE     

            }

          })

         //debug($scope.new_groupped_test_profile)


      })
       
      
  //debug($scope.sep_profile)
  //debug($scope.sep_test)
  //
  //start model
  //: sample model
   //$rootScope.grouped_tests = {tests: [{name: "Biochemistry", data: [{test_code: "RBC", test_name: "RED BLOOD CELL", range_1: "120", range_2: "1000", formula_1: "[RBC_2] * 100", formula_2: "[RBC_1] / 100", type: "Tabular", prev_result: {val_1: "9000", val_2: "1000", date: "3rd March, 2018"}, unit_1: "MMol", unit_2: "kMol", result_1: "null", result_2: "null", h_range_1: "6000", h_range_2: "8000"}, {test_code: "ABC", test_name: "ABC  CELL", range_1: "120", range_2: "1000", formula_1: "[abc_2]*2", formula_2: "[RBC_1] + [RBC_2]", type: "Tabular", prev_result: {val_1: "9000", val_2: "1000", date: "3rd March, 2018"}, unit_1: "MMol", unit_2: "kMol", result_1: "null", result_2: "null", h_range_1: "6000", h_range_2: "8000"}]}], profiles: [{name: "FULL BLOOD COUNT", data:[{name: "Biochemistry", data: [{test_code: "PCV", test_name: "PACK CELL VOLUME", range_1: "30", range_2: "300", formula_1: "[PCV_2]*100", formula_2: "[RBC_1]", type: "Tabular", prev_result: {val_1: "9000", val_2: "300",  date: "3rd March, 2018"}, unit_1: "Litre", unit_2: "Kg", result_1: "null", result_2: "null", h_range_1: "3800", h_range_2: "30000" }]}] }]}

   //debug($rootScope.grouped_tests.tests)
  // debug($rootScope.grouped_tests.profiles)
   //
   //end model
   // if($rootScope.grouped_tests)
   // {

   //   $rootScope.grouped_tests = $rootScope.grouped_tests
   // }else{
   //  $rootScope.grouped_tests = {tests: [], profiles: []}
   // }
  


   $scope.get_test_cat_name = (id) => {

          return $q(function(resolve, reject) {

               db.get(id, function(err, doc){
                if(doc)
                {

                  resolve(doc.my_doc.name) 
                    
                }
                if(err)
                reject(false)

                   })

             })


   }
$scope.get_test_cat_name_1 = (id) => {
     $rootScope.getres = []
      $scope.get_test_cat_name(id).then(function(r){
       $rootScope.getres.push({id: id, name: r}) 
      }) 

   }


   $scope.get_formula_result = (code, type, val) => {

    var c_code = code.toUpperCase()+''+type
    //alert(c_code)
  
   //: testing
   $(event.currentTarget).closest(".view-test").find("input").each(function(e){
      if(this == event.currentTarget)
      {
         var eq = (e + 1)

          $(event.currentTarget).closest(".view-test").find("input").eq(eq).focus()
      }
      
   })
   
    
    //: update this index
    var is_there = false

    for(var emm in $rootScope.push_formulas)
    {
       if($rootScope.push_formulas[emm].str == '['+c_code+']')
       {
        $rootScope.push_formulas[emm].val = val
        is_there = true
       }
    }
    if(is_there == false)
    {
       $rootScope.push_formulas.push({str: '['+c_code+']', val: val})
    }
   

      var formulax = $rootScope.push_formulas



    //: calculate formula
    //: push in this value, run tru all formulas in textfied
    //: if a particular subs is completed place the result in that formaula
    //: check tests
    if($rootScope.grouped_tests.tests)
    {


      for (var i in  $rootScope.grouped_tests.tests)
      {
       
        for(var ii in $rootScope.grouped_tests.tests[i].data)
        {
          
            //: if formula, compute
            if($rootScope.grouped_tests.tests[i].data[ii].formula_1)
            {
              // debug(formulax)
            var ans = $scope.find_matches($rootScope.grouped_tests.tests[i].data[ii].formula_1, formulax)
        // alert(ans)
            try
            {
             var mans = eval(ans)
             $rootScope.grouped_tests.tests[i].data[ii].result_1 = parseFloat(mans).toFixed(2)
            // $rootScope.grouped_tests.tests[i].data[ii].result_1 = "emma"
            }catch($ex)
            {

            }
             
            
            }
            if($rootScope.grouped_tests.tests[i].data[ii].formula_2)
            {
              
               // debug(formulax)
            var ans = $scope.find_matches($rootScope.grouped_tests.tests[i].data[ii].formula_2, formulax)
        // alert(ans)
            try
            {
             var mans = eval(ans)
             $rootScope.grouped_tests.tests[i].data[ii].result_2 = parseFloat(mans).toFixed(2)
            // $rootScope.grouped_tests.tests[i].data[ii].result_1 = "Jnr"
            }catch($ex)
            {

            }
              
            }

        }
        
      }

    }

    //: check profile
    
     if($rootScope.grouped_tests.profiles)
    {

      for (var i in  $rootScope.grouped_tests.profiles)
      {
       
        for(var ii in $rootScope.grouped_tests.profiles[i].data)
        {

          for(var iii in $rootScope.grouped_tests.profiles[i].data[ii].data)
          {
         
            //: if formula, compute
            if($rootScope.grouped_tests.profiles[i].data[ii].data[iii].formula_1)
            {

              // debug(formulax)
            var ans = $scope.find_matches($rootScope.grouped_tests.profiles[i].data[ii].data[iii].formula_1, formulax)
        // alert(ans)
            try
            {
             var mans = eval(ans)
             $rootScope.grouped_tests.profiles[i].data[ii].data[iii].result_1 = parseFloat(mans).toFixed(2)
            // $rootScope.grouped_tests.tests[i].data[ii].result_1 = "emma"
            }catch($ex)
            {

            }
             
            
            }
            if($rootScope.grouped_tests.profiles[i].data[ii].data[iii].formula_2)
            {
              
               // debug(formulax)
            var ans = $scope.find_matches($rootScope.grouped_tests.profiles[i].data[ii].data[iii].formula_2, formulax)
        // alert(ans)
            try
            {
             var mans = eval(ans)
             $rootScope.grouped_tests.profiles[i].data[ii].data[iii].result_2 = parseFloat(mans).toFixed(2)
            // $rootScope.grouped_tests.tests[i].data[ii].result_1 = "Jnr"
            }catch($ex)
            {

            }
              
            }


          }

        }
        
      }

    }
    //  angular.element(event.currentTarget).css("border", "1px solid green")
      //angular.element(event.currentTarget).val(val)
      var _this = event.currentTarget
     $timeout(function(){

  $("input").css("border", "1px solid #ddd")   
  angular.element(_this).css("border", "1px solid orange")
  angular.element(_this).val(val)
 
     }, 500)
   

   }

   //: get patient previous result
   $rootScope.mee = {code: ""}
   $rootScope.get_patient_previous_result = (code, rst) =>
   {

      return $q(function(resolve, reject){

        
          db.get("resultchain__"+$rootScope.real_patient_id, function(err, doc){
              if(doc)
              {
                var index = -1
                var index2 = -1
                var store_prev_1 = []
                var store_prev_2 = []
                var all_tests = doc.all_tests
                for(var i in all_tests)
                {
                  for(var ii in all_tests[i].data)
                  {
                        if(all_tests[i].data[ii].test_code == code)
                        {
                          index = i
                          index2 = ii 
                          store_prev_1.push(i)
                          store_prev_2.push(ii)

                        }
                  }
                }
                //: get result_1, result_2 and date
                // if there is a previous result
                if(index != -1 && index2 != -1)
                {
                  if(store_prev_1.length > 0)
                  {
                    index = store_prev_1[store_prev_1.length - 2]
                  }
                  if(store_prev_2.length > 0)
                  {
                    index2 = store_prev_2[store_prev_2.length - 2]
                  }
                  if(all_tests[index])
                  {
                var rs1 = all_tests[index].data[index2].result_1
                var rs2 = all_tests[index].data[index2].result_2
                 var dte = custom_format_1(all_tests[index].data[index2].date)
                  if(rs1 != "" || rs2 != "")
                  {
                  // rst.result_1 = rs1
                  
                  // rst.result_2 = rs2
                  
                  // rst.date = dte

                  rst[code] = [rs1, rs2, dte]
                  //debug(rst)
                  resolve(rst)

                  }

                  }else{
                    var rs1 = null
                    var rs2 = null

                  }
                
               
                 
                }
                
              }

              if(err)
              {
                reject(false)
              }


          })

          })

   }

   //: get test summary
    $rootScope.test_summary_load = {}
   $rootScope.get_test_summary_load = function(id, code){
   //console.log(id)
   //console.log(code)
    
    db.get(id, function(err, doc){
      if(doc)
      {
         $rootScope.test_summary_load[code] = doc.my_doc.summary
      }
    })

   }

   //: compare abnormal result
   $scope.compare_abnormal_result = function(result, lower, higher){
       if(! isNaN(result))
       {
           result = parseFloat(result)
           lower = parseFloat(lower)
           higher = parseFloat(higher)

       if(result >= lower && result <= higher)
       {
        return true
       }else{
           return false
       }

        }
        return true
   }


   //: preview  result
   $scope.preview_test_result = () =>
   {
       
       
     
//      db.find({
//             selector: {table_name: $rootScope.real_patient_id, lab_no: $rootScope.real_lab_no},
//                 include_docs: true,
//                 limit: 1
//           }).then(function (result) {

//             if(result.docs.length > 0)
//             {
              
//                result.docs.map(function(row) { 
             
//             var tests = row.tests
//             $rootScope.grouped_tests = tests
//             $rootScope.is_p_test_exist = true
         

//             //: get the patient info
//           db.get($rootScope.real_patient_id, function(err, doc){
//               if(doc)
//               {
//                   for(var ix in doc.my_doc)
//                   {
                    
//                     if(doc.my_doc[ix].name.toLowerCase() == "first name")
//                     {
//                      $rootScope.real_p_first_name = doc.my_doc[ix].val.substr(0, 1).toUpperCase()+doc.my_doc[ix].val.substr(1, doc.my_doc[ix].val.length -1)
//                     }
//                     if(doc.my_doc[ix].name.toLowerCase() == "last name")
//                     {
//                       $rootScope.real_p_last_name = doc.my_doc[ix].val.toUpperCase() 
//                     }

//                     if(doc.my_doc[ix].name.toLowerCase() == "title")
//                     {
//                       $rootScope.real_p_title = doc.my_doc[ix].val.toUpperCase() 
//                     }


//                   if(doc.my_doc[ix].type.toLowerCase() == "age")
//                     {
//                       $rootScope.real_p_age = calculateAge(doc.my_doc[ix].val)
//                     }

//                     if(doc.my_doc[ix].name.toLowerCase() == "sex")
//                     {
//                       $rootScope.real_p_sex = doc.my_doc[ix].val
//                     }
//                     if(doc.my_doc[ix].name.toLowerCase() == "phone number")
//                     {
                       
//                       $rootScope.real_p_phone = doc.my_doc[ix].val
//                     }
                    

//                   }
//                   $rootScope.real_p_refcenter = ""
//                   $rootScope.real_p_refperson = ""
//                   $rootScope.real_p_is_clinical = ""

//                   $rootScope.real_p_test_modified_date = custom_format(row.modified)
//               if($rootScope.all_pef_id.my_doc[1].ref_center){
//                   if($rootScope.all_pef_id.my_doc[1].ref_center.data)
//                   {

//                       for(var iix in $rootScope.all_pef_id.my_doc[1].ref_center.data)
//                       {
//                         if($rootScope.all_pef_id.my_doc[1].ref_center.data[iix].name.toLowerCase() == "centre name"){

//                           $rootScope.real_p_refcenter = $rootScope.all_pef_id.my_doc[1].ref_center.data[iix].val == "n/a" ? false : $rootScope.all_pef_id.my_doc[1].ref_center.data[iix].val


//                         }
//                       }
//                   }

//                 }

//                   if($rootScope.all_pef_id.my_doc[2].ref_person){
//                   if($rootScope.all_pef_id.my_doc[2].ref_person.data)
//                   {


//                       for(var iix in $rootScope.all_pef_id.my_doc[2].ref_person.data)
//                       {
//                         if($rootScope.all_pef_id.my_doc[2].ref_person.data[iix].name.toLowerCase() == "first name"){

//                           $rootScope.real_p_refperson = $rootScope.all_pef_id.my_doc[2].ref_person.data[iix].val 

//                         }
//                       }
//                   }

//                 }

//                   //: show clinical info
//                     //: show clinical info
//                  db.find({
//             selector: {table_name: "perform_the_test", lab_no: $rootScope.real_lab_no},
//                 include_docs: true,
//                 limit: 1
//           }).then(function (result) {

//                result.docs.map(function(rowz) { 
//                   if(rowz){
//                      // console.log(rowz)
//                     if(rowz.clinical_info)
//                     {
//                       $rootScope.real_p_is_clinical = rowz.clinical_info
//                     }
//                   }

//                 })

//              })




                  

//               }

//               if(err){
//                 alert("No patient record")
//               }
//           })

//             //alert($rootScope.real_patient_id)

//    $scope.closeThisDialog()
//    ngDialog.open({ template: 'dialogs/preview-result.html', className: 'ngdialog-theme-default custom-width', closeByNavigation: true});
     
         
//                })
               

//             }else{
//               alertError("Please save test result")
//             }
         
//    })

        }

$scope.get_abnormal_val  =  function(){

    var _this = event.currentTarget
    var mval = angular.element(_this).val()
    if(! isNaN(mval))
    {
   // var val = angular.element(_this).parent().parent().parent().parent().find(".range1").text()
   var val = $(_this).parent().parent().parent().parent().find(".range1").text()
   var val2 = $(_this).parent().parent().parent().parent().find(".range2").text()
   val = parseFloat(val)
   val2 = parseFloat(val2)
   mval = parseFloat(mval)// val type
//    alert(val)
//    alert(val2)
//    alert(mval)
     if(mval >= val && mval <= val2)
    {
     angular.element(_this).css("color", "black")
   }else{
      
       angular.element(_this).css("color", "red")
    }

    }
}
   
   //: save result
   $scope.save_test_result = () => 
   {

       //: lets setup tests to beable to get prev result 
             var al_tests = []

             if($rootScope.grouped_tests.tests)
             {
              for(var i in $rootScope.grouped_tests.tests)
              {
                for(var ii in $rootScope.grouped_tests.tests[i].data)
                {
                    al_tests.push({lab_no: $rootScope.real_lab_no, test_code: $rootScope.grouped_tests.tests[i].data[ii].test_code, test_name: $rootScope.grouped_tests.tests[i].data[ii].test_name, result_1: $rootScope.grouped_tests.tests[i].data[ii].result_1, result_2: $rootScope.grouped_tests.tests[i].data[ii].result_2, date: new Date().getTime()})
                }
                
              
              }
             // log(al_tests)
             // log(JSON.stringify($rootScope.grouped_tests.tests))

             }
             if($rootScope.grouped_tests.profiles)
             {

                for(var i in $rootScope.grouped_tests.profiles)
                {
                 
                  for(var ii in $rootScope.grouped_tests.profiles[i].data)
                  {


                for(var iii in $rootScope.grouped_tests.profiles[i].data[ii].data)
                {
                    al_tests.push({lab_no: $rootScope.real_lab_no, test_code: $rootScope.grouped_tests.profiles[i].data[ii].data[iii].test_code, test_name: $rootScope.grouped_tests.profiles[i].data[ii].data[iii].test_name, result_1: $rootScope.grouped_tests.profiles[i].data[ii].data[iii].result_1, result_2: $rootScope.grouped_tests.profiles[i].data[ii].data[iii].result_2, date: new Date().getTime()})
                }

                  }

                }

             }

            // log(al_tests)

           
//       db.find({
//             selector: {table_name: $rootScope.real_patient_id, lab_no: $rootScope.real_lab_no},
//                 include_docs: true,
//                 limit: 1
//           }).then(function (result) {

//             if(result.docs.length > 0)
//             {
//              //  debug(result)
//                result.docs.map(function(row) { 
               
//                 var revid = row._rev
//                 var mid = row._id
//                 var tday = row.today
//                 var labno = row.lab_no
//                 var patientid = row.patient_id
//                 var modified = new Date().getTime()
//                 var tname = row.table_name
//                 var tests = $rootScope.grouped_tests

//                 var table = {
//               _id: ""+mid,
//               _rev: revid,
//               today: tday,
//               modified: modified,
//               lab_no: labno,
//               patient_id: patientid,
//               table_name: tname,
//               tests: tests
//                     }

//         add_doc2(table)


//                })
               

//             }
          
//             if(result.docs.length < 1)
//             {
//                //: save the result if not found
              
//         var table = {

//         _id: ""+new Date().toJSON(),
//         today: new Date().getTime(),
//         modified: new Date().getTime(),
//         lab_no: $rootScope.real_lab_no,
//         patient_id: $rootScope.real_patient_id,
//         table_name: $rootScope.real_patient_id,
//         tests: $rootScope.grouped_tests
//                     }

//             add_doc2(table)
   


//              }

         
//           alertInfo("Saved...")


   
// //: find the result chain first
//  var table_chain = {

//         _id: "resultchain__"+$rootScope.real_patient_id,
//         today: new Date().getTime(),
//         modified: new Date().getTime(),
//         patient_id: $rootScope.real_patient_id,
//         table_name: "result_chain",
//         all_tests: []

//              }        

//   db.get("resultchain__"+$rootScope.real_patient_id, function(err, doc){

//     var prevdoc = doc

//       if(doc)
//       {
//         prevdoc._rev = doc._rev
//         prevdoc._id = doc._id

//         var track = false
//         for(var i in prevdoc.all_tests)
//         {
//           if(prevdoc.all_tests[i].lab_no == $rootScope.real_lab_no)
//           {
        
//             prevdoc.all_tests[i].data = al_tests
//             track = true
//           }
//         }

//         if(track == false)
//         {
//           prevdoc.all_tests.push({lab_no: $rootScope.real_lab_no, data: al_tests})
//         }


//     add_doc2(prevdoc)

//       }

//       if(err)
//       {

//         table_chain.all_tests  = [{lab_no: $rootScope.real_lab_no, data: al_tests}]
         
//          add_doc2(table_chain)

//       }

//   })       


//             })
            
   }
    
   $scope.generate_pdf_x = function(){
    
        //------------------START HERE--------------------------
        var setpages  = 0
     	var pages  = ""
         var cnt_page  = 1
         var sum = 0
         var page_height = 40
     	 var is_skipped = false
     	
        //: calculate average height of generated pages
        var avg = []
        $(".track-page").each(function(i){
            avg.push($(this).height())
            sum += $(this).height()
           
        })
        var avg_height = sum / avg.length
        // alert(avg)
        // alert(avg.length)
        // alert(sum)
        // alert(avg_height)
     	//: get the height of page
     	$(".track-page").each(function(i){
             if(i == 0)
             {
               pages +=  "<div class = 'pagex' style = 'position: absolute; font-size: 0.5em; top: 0; right: 7.5%'>Page "+cnt_page+"</div>"
               pages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
               pages += "<div class = 'is-clinical'>"+$(".clinical").html()+"</div>"
             }
// a4 size: 595 width and 842 height in px
			var height = $(this).height()
     	    setpages +=  height
           // alert(height)
           
                 //alert(setpages)
           var page_offset = 0
           var offset = parseFloat(avg_height) + parseFloat(page_offset)
           offset = parseFloat(offset.toFixed(2))
           alert("mean offset: "+offset)
            
            var c_sum = 0
     	   if(setpages > offset)
     	   {
            //: get all children
            var children = $(this).children()
            children.each(function(j){
            c_sum += $(this).height()
            alert($(this).text())
            alert($(this).height())
            is_skipped = false
            if(c_sum > offset)
            { 
               
                pages += "<div class = 'page-break'> <span class = 'pagex' style = 'float: right; font-size: 0.5em'>Page "+cnt_page+"</span><div><div class = 'clearfix'></div>"
                pages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
               pages += $(this).wrap('<p/>').parent().html() 
               c_sum = 0
               cnt_page++
               setpages  = 0 
               is_skipped = true
               $(this).unwrap();
            }else{
                pages += $(this).html() 
            }
            
             })
            
             if(! is_skipped)
             {
                 
                cnt_page++
                pages += "<div class = 'track-page'>"+$(this).html()+"</div>"
     	   	    pages += "<div class = 'page-break'> <span class = 'pagex' style = 'float: right; font-size: 0.5em'>Page "+cnt_page+"</span><div><div class = 'clearfix'></div>"
                pages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
                setpages  = 0

             }
                
                
     	   }else{
                
              
                
                   pages += "<div class = 'track-page'>"+$(this).html()+"</div>" 
                
     	    	
     	   }  



     	})
         var header = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><meta name="author" content=""><link href="css/bootstrap.css" rel="stylesheet"><link href="css/style.css" rel="stylesheet"> <link rel="stylesheet" href="css/ngDialog.min.css"><link rel="stylesheet" href="css/ngDialog-theme-default.min.css">  <link rel="stylesheet" href="css/ngDialog-custom-width.css" media = "all"><link href="css/ubuntufont.css" rel="stylesheet" media = "all"></head><body>'+'<div style="margin-right: auto; margin-left: auto; margin-top: 50px; width: 85%">'+"<div style = 'position: fixed; top: 0; right: 7.5%; left: 7.5%'><h3  class = 'header'><img style = 'float: right' src='img/logo.png' width='20%'  /></h3></div>"

     	//var divContents = $("#wrapper").html()
     	var divContents = pages+"<div style = 'position: fixed; bottom: 10; right: 7.5%; left: 7.5%'><img src='img/address-print.png' width='100%'  /></div>"
         ipcRenderer.send("print-to-pdf", {h: ''+header+divContents+'</body></html>', file_name: $rootScope.real_lab_no})



        //--------------------- END HERE
    
      }
      $scope.is_space_available = function(page_height, start_track, static_page){
          if((start_track + page_height) <= static_page )
          {
              return true
          }else{
              return false
          }
      }
      $scope.keep_breaking  = function($this, upto_apage, _page_header, embody, cnt_page)
      {
         // $(this)  = $this
         var kheight = 0
          $this.find("div, .MsoNormal, p").each(function(l){
            if(! $this.is(".divTable, .divTableCell, .divTableRow, .test-info, .group-test-profile, .group-test-category, .a-profilex, .test_,.track_row, .pf-summary, .track_row, .track-page, .enter-testxx, .tabular, .preview-test-new, .all-tests") && ! $this.is(":empty"))
            {
                var minheight = $this.height()
             //: skip higher values, they are invalids
             if(minheight > 500)
             {
                //  $(this).css("border", "1px solid green")
                //  console.log( $(this))
             }else{
                
                kheight += minheight
                if(kheight > upto_apage)
                {
                    //: reset
                    kheight = 0
                    //: add page break
                    cnt_page++ 
                    _page_header =  "<div class = 'pagex' style = 'font-size: 0.5em; top: 0; right: 7.5%'>Page "+cnt_page+"</div>"
                    _page_header += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
                    embody += "<div class = 'track-page'>"+_page_header+$this.html()+"</div>"+"<div class = 'page-break'></div>"



                    //: end here
                }
               // console.log(minheight)
             }
            
             
          
            }
           
               
              
  
              })

              return embody

      }
    $scope.generate6 = function(){

        // $(".ema").contents().filter(function() {
        //     if(this.nodeType === 3)
        //     {
        //         //: wrap  text node with span
        //          $(this).wrap("<span></span>") 

        //     }
        
        // })
     // var ee =   $(".ema").find("*")  
      //console.log(ee)
     // console.log($(".ema").height())
    //   var seed = true // add to height if block
    //   var total_height = 0
    //   var inline_offset = 0

    //   $(".ema").contents().filter(function() {
    //       //: assumes every element exists

    //            var thisheight = $(this).height()
    //           // alert("mm "+thisheight)
    //            //: inline offset
    //             if($(this).css("display") != "block")
    //             {
                   
    //                 //: reset based on inline
    //                 if(seed == true)
    //                 {
    //                     total_height = total_height + thisheight
                        
    //                     seed = false
    //                 }
                   
                   
    //             }

    //         //    if($(this).css("display") == "block")
    //         //     {
    //                 if($(this).css("display") == "block")
    //                 {
    //                    total_height = total_height + thisheight 
    //                    seed = true                     

    //                 }
                    

                    

    //              //alert($(this).height())
    //            // }
           
    //   });
    //  $(".ema").find("*").each(function(i, d){
    //    var rr =  $(this).css('display')
         
    //  }) 
   
      //var html = $(".test-body").html()
      var my_pages = ""
      $(".track-page").each(function(i){
          
          //: iterate all cat or profile track-page
          //: get cat name and set headers if page break
       // alert("HHH "+$(this).height())
        //: wrap all free text node in span
        // $(this).contents().filter(function() {
        //     if(this.nodeType === 3)
        //     {
               
        //         //: wrap  text node with span
        //          $(this).wrap("<span></span>") 

        //     }
        
        // })
        //---------------
        // var seed = true // add to height if block
        // var total_height = 0
        // var inline_offset = 0
        // var page_height_now = 600
        //-----------------
        
       // alert(typeof $(this).contents)
        // $(this).find("*").each(function(){
            
        //          console.log("JS--- "+this.clientHeight)
        // })
        // $(this).find("*").contents().filter(function() {
           
        //     if(typeof this.innerHTML == "string")
        //     {
        //          //: assumes every element exists  
        //          var thisheight = $(this).height()
                 
        //         // alert(thisheight)
            
        //           if($(this).css("display") != "block")
        //           {
                     
        //               //: reset based on inline
        //               if(seed == true)
        //               {
        //                   total_height = total_height + thisheight
        //                   if(total_height > page_height_now)
        //                   {
        //                       total_height = 0
        //                       $(this).append("<div class = 'page-break'></div>") 
        //                   }
                          
        //                   seed = false
        //               }
                     
                     
        //           }

        //               if($(this).css("display") == "block")
        //               {
        //                  total_height = total_height + thisheight 
        //                  seed = true 
        //                  if(total_height > page_height_now)
        //                   {
        //                       total_height = 0
        //                       $(this).append("<div class = 'page-break'></div>") 
        //                   }    

  
        //               }

        //     }
          
        // })
       // $(this).contents().filter(function() {
            //: assumes every element exists  
               //  var thisheight = $(this).height()
            
                //   if($(this).css("display") != "block")
                //   {
                     
                //       //: reset based on inline
                //       if(seed == true)
                //       {
                //           total_height = total_height + thisheight
                          
                //           seed = false
                //       }
                     
                     
                //   }

                    //   if($(this).css("display") == "block")
                    //   {
                    //      total_height = total_height + thisheight 
                    //      seed = true                     
  
                    //   }
                    
               // });
               // alert(total_height)
               // var diff = $(this).height() - total_height
               // alert("Diff "+diff)
        //--------------------
            my_pages += $(this).html()
      })
      var header = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><meta name="author" content=""><link href="css/style.css" rel="stylesheet" />'+'</head><body><div style="margin-right: auto; margin-left: auto; margin-top: 50px; width: 85%"><div style = "position: fixed; top: 0; right: 7.5%; left: 7.5%"><h3  class = "header"><img style = "float: right" src="img/logo.png" width="20%"/></h3></div>'

      var hheader = "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
      hheader += "<div class = 'is-clinical'>"+$(".clinical").html()+"</div>"

        var body =  hheader+my_pages       //$(".test-body").html()
        var emfooter = "<div  style = 'position: fixed; bottom: 10; right: 7.5%; left: 7.5%;'><img src='img/address-print.png' width='100%'  /></div>"
        var footer = emfooter+'</div></body></html>'
        
        ipcRenderer.send("print-to-pdf", {h: ''+header+body+footer, file_name: $rootScope.real_lab_no})


    }
      
      $scope.generate5 = function(){
          //: init page number
          
          var cnt_page = 0
          var _page_header = ""
          var embody = ""
          //: based on emalgo
          var static_page = 530
          var upto_apage = static_page - 100

    //       $scope.txt = $(".emma").height();
    //    console.log($scope.txt)
    //    console.log("----------------")
    //    return
    //    var html = $compile($scope.txt)($scope);
    //    // $(".track-page").html(html)
    //     console.log(html)
    //    return
     $(".track-page").each(function(i){



    // cnt_page++ 
    var find_cat_name = $(this).find(".cat_name").html()
    var thispage = $(this).height()

     if(i == 0)
      {
          //: if the track-page catcan enter a page
        if(thispage < static_page)
        {
            cnt_page++ 
         _page_header +=  "<div class = 'pagex' style = 'position: absolute;font-size: 0.5em; top: 0; left: 7.5%'>Page "+cnt_page+"</div>"
        _page_header += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
        _page_header += "<div class = 'is-clinical'>"+$(".clinical").html()+"</div>"
        embody += "<div class = 'track-page'>"+_page_header+$(this).html()+"</div>"+"<div class = 'page-break'></div>"
        }else{

            //: this canot enter, lets keep breaking
            // var $this = $(this)
            // var upto_apage = static_page
            // var emb = $scope.keep_breaking($this, upto_apage, _page_header, embody, cnt_page)
            // embody = emb
            //------- start 
              // $(this)  = $this
         var kheight = 0
         var more_page = ""
         $(this).find("div, .MsoNormal, p").each(function(l){
           if(! $(this).is(".divTable, .divTableCell, .divTableRow, .test-info, .group-test-profile, .group-test-category, .a-profilex, .test_,.track_row, .pf-summary, .track_row, .track-page, .enter-testxx, .tabular, .preview-test-new, .all-tests") && ! $(this).is(":empty"))
           {
               
               var minheight = $(this) .height()
            //: skip higher values, they are invalids
            
            if(minheight > 500)
            {
               //  $(this).css("border", "1px solid green")
               //  console.log( $(this))
            }else{
               
               kheight += minheight
               more_page += "<div class = ''>"+$(this).html()+"<div><br>"
             
               if(kheight > upto_apage)
               {
                   
                   //: add page break
                   cnt_page++ 
                   _page_header =  "<div class = 'pagex' style = 'font-size: 0.5em; top: 0; right: 7.5%'>Page "+cnt_page+"</div>"
                   _page_header += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"+"<div style = 'font-size: 1.2em; padding: 20px; font-weight: 600; text-align: center'>"+find_cat_name+"</div>"
                   embody += "<div class = 'track-page'>"+_page_header+more_page+"</div>"+"<div class = 'page-break'></div>"
                    //: reset
                   kheight = 0
                   more_page = ""


                   //: end here
               }
               //console.log(more_page)
            }
           
            
         
           }
          
              
             
 
             })





            //: ------- end 
            

        }
       
      }else
      {
            //: if the track-page catcan enter a page
        if(thispage < static_page)
        {
            cnt_page++ 
        _page_header =  "<div class = 'pagex' style = 'font-size: 0.5em; top: 0; right: 7.5%'>Page "+cnt_page+"</div>"
        _page_header += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
        embody += "<div class = 'track-page'>"+_page_header+$(this).html()+"</div>"+"<div class = 'page-break'></div>"
        }else{

             //: this canot enter, lets keep breaking
            //  var $this = $(this)
            //  var upto_apage = static_page
            //  var emb = $scope.keep_breaking($this, upto_apage, _page_header, embody, cnt_page)
            // embody = emb
             //------- start 
              // $(this)  = $this
         var kheight = 0
         var more_page = ""
         $(this).find("div, .MsoNormal, p").each(function(l){
           if(! $(this).is(".divTable, .divTableCell, .divTableRow, .test-info, .group-test-profile, .group-test-category, .a-profilex, .test_,.track_row, .pf-summary, .track_row, .track-page, .enter-testxx, .tabular, .preview-test-new, .all-tests") && ! $(this).is(":empty"))
           {
               var minheight = $(this) .height()
            //: skip higher values, they are invalids
            if(minheight > 500)
            {
               //  $(this).css("border", "1px solid green")
               //  console.log( $(this))
            }else{
               
               kheight += minheight
               more_page += "<div class = ''>"+$(this).html()+"<div><br>"
               if(kheight > upto_apage)
               {
                   
                   //: add page break
                   cnt_page++ 
                   _page_header =  "<div class = 'pagex' style = 'font-size: 0.5em; top: 0; right: 7.5%'>Page "+cnt_page+"</div>"
                   _page_header += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"+"<div style = 'font-size: 1.2em; padding: 20px; font-weight: 600; text-align: center'>"+find_cat_name+"</div>"
                   embody += "<div class = 'track-page'>"+_page_header+more_page+"</div>"+"<div class = 'page-break'></div>"
                    //: reset
                   kheight = 0
                   more_page = ""


                   //: end here
               }
              // console.log(minheight)
            }
           
            
         
           }
          
              
             
 
             })





            //: ------- end 

        }

      }
    //   embody += "<div class = 'track-page'>"+_page_header+$(this).html()+"</div>"+"<div class = 'page-break'></div>"

 
     
        })
     
        var header = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><meta name="author" content=""><link href="css/style.css" rel="stylesheet" />'+'</head><body><div style="margin-right: auto; margin-left: auto; margin-top: 50px; width: 85%"><div style = "position: fixed; top: 0; right: 7.5%; left: 7.5%"><h3  class = "header"><img style = "float: right" src="img/logo.png" width="20%"/></h3></div>'

        var body =   embody       //$(".test-body").html()
        var emfooter = "<div  style = 'position: fixed; bottom: 10; right: 7.5%; left: 7.5%;'><img src='img/address-print.png' width='100%'  /></div>"
        var footer = emfooter+'</div></body></html>'
        
        ipcRenderer.send("print-to-pdf", {h: ''+header+body+footer, file_name: $rootScope.real_lab_no})
        
     

      }
$scope.generate4 = function(){
    //: ALGO: TRACK  track-page, if big track a-profilex, if big track trac_row
    //: total height of page
    //var total_height  = 0
   // var ctrl_height = 2050
    var one_pagex = 900
    var cnt  = 0
    var pages  = ""
    var cnt_page  = 1
    var ispage1 = false
    $(".track-page").each(function(i){
        //: replace tables with div
$(this).find("table").each(function(jr){

            //  $(this).replaceWith("<div class = 'divTable'>"+$(this).html()+"</div>")
            $(this).wrap("<div class = 'jnr'></div>")

           var mhtml =  $(this).parent().html()
           mhtml = $('<textarea />').html(mhtml).text()
           
            mhtml = mhtml.replace('<table class="MsoNormalTable"', '<div class = "divTable"')
            mhtml = mhtml.replaceAll('</table>', '</div>')

            mhtml = mhtml.replaceAll('<tr', '<div class = "divTableRowx"')

            mhtml = mhtml.replaceAll('</tr>', '</div>')
            
            mhtml = mhtml.replaceAll('<td', '<div class = "divTableCellx"')
            mhtml = mhtml.replaceAll('</td>', '</div>')
            mhtml = mhtml.replaceAll('<tbody></tbody>', "")
            mhtml = mhtml.replaceAll('</tbody>', "")
          // alert(mhtml)
            $(this).parent().html(mhtml)
            $(this).append("<div class = 'clearfix'></div>")

          //  console.log("table -----")
           // console.log($(this).html())
})
//: find msnormal class in table cell and remove to prevent error in breaking
$(this).find(".divTableCellx").each(function(y){
    $(this).find(".MsoNormal").removeClass("MsoNormal")
})
//: start here
var broken = false
        cnt++
        if(cnt == 1)
        {
            ispage1 = true
            pages +=  "<div class = 'pagex' style = 'position: absolute; font-size: 0.5em; top: 0; left: 7.5%'>Page "+cnt_page+"</div>"
           // pages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
           // pages += "<div class = 'is-clinical'>"+$(".clinical").html()+"</div>"
           
        }
        //: find the cat_name incase if need
        var find_cat_name = $(this).find(".cat_name").html()
//: end here

        var last_this = false
        var page_height = $(this).height()
        
        //: if category page height > one page. track-page is big
        if(page_height > one_pagex)
        {
       
        var c_page = 0      
        //: get desc
        var getdesc = $(this).find(".a-profilex")
          
      
        getdesc.each(function(i){
        
            var dheight = $(this).height()
           
            var one_page = one_pagex
            c_page += dheight
            //: a-profilex is too big
            if(c_page > one_page)
            {
                 
               var row_height = 0 // offset
             // : move deep more
             var innerdesc = $(this).find(".track_row")
                //: track each row
             innerdesc.each(function(ii){
                
                row_height += $(this).height()
                
               //console.log("ProfieX R "+row_height)

                var bias = 375  //: one page

                if(row_height > bias)
                {

                    ///: long document, still break down
                   // console.log("rrrrororo "+row_height)
                var last_breaker = 900
                
                if($(this).height() > last_breaker)
                {
                   var innermsword = $(this).find(".MsoNormal")
                   var last_bheight = row_height
                   innermsword.each(function(kk){
                    last_bheight += $(this).height()
                    if(last_bheight > 1800)
                    {
                        //: last breaker
                         //: break page
                    // $(this).append("<div class = 'clearfix'></div>")
                     cnt_page++
                     var mpages = "<div><span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span></div><div class = 'clearfix'></div>";
                    mpages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"+"<div style = 'font-size: 1.2em; padding: 20px; font-weight: 600; text-align: center'>"+find_cat_name+"</div>"
      
                     $("<br><br><br><br><div class = 'page-break'></div>"+mpages).appendTo($(this)) 
                     row_height = 0 
                     c_page = 0
                     last_bheight = 0


                    }
                      // console.log("Inner Word "+$(this).height())
                   })
                }else
                {

                     //: break page
                     $(this).append("<div class = 'clearfix'></div>")
                     cnt_page++
                     var mpages = "<div><span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span></div><div class = 'clearfix'></div>";
                    mpages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"+"<div style = 'font-size: 1.2em; padding: 20px; font-weight: 600; text-align: center'>"+find_cat_name+"</div>"
      
                     $("<div class = 'page-break'></div>"+mpages).appendTo($(this)) 
                     row_height = 0 
                     c_page = 0


                }

                   
                }
      

             })
             

            }


      
      })

        // if(last_this != false)
        // {
        //    $(this).append("<div class = 'clearfix'></div>")
     
        //     $("<div class = 'page-break'></div>").appendTo(last_this) 
        // }
        


        }else{
        //console.log("////////////////////////   "+i) 
        //: put each category or profile in different page
        // alert($(this).height()) 
         if(ispage1 == true)
         {
            var mpages = "<div><span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span></div><div class = 'clearfix'></div>";
            mpages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"//+"<div style = 'font-size: 1.2em; padding: 20px; font-weight: 600; text-align: center'>"+find_cat_name+"</div>"
              $(this).append("<div class = 'page-break'></div>"+mpages)
           //  $(this).append("<div class = 'page-break'></div>")
         }else
         {
             cnt_page++
             var mpages = "<div><span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span></div><div class = 'clearfix'></div>";
            mpages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"+"<div style = 'font-size: 1.2em; padding: 20px; font-weight: 600; text-align: center'>"+find_cat_name+"</div>"
              $(this).append("<div class = 'page-break'></div>"+mpages)
         }
         
               
         

        }
      
          
     
    })
    
    pages = pages+""+$(".test-body").html()
   var header = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><meta name="author" content=""><link href="css/style.css" rel="stylesheet"></head><body>'+'<div style="margin-right: auto; margin-left: auto; margin-top: 50px; width: 85%">'+"<div style = 'position: fixed; top: 0; right: 7.5%; left: 7.5%'><h3  class = 'header'><img style = 'float: right' src='img/logo.png' width='20%'  /></h3></div>"
   
   var divContents = pages+"<div  style = 'position: fixed; bottom: 10; right: 7.5%; left: 7.5%;'><img src='img/address-print.png' width='100%'  /></div>"
ipcRenderer.send("print-to-pdf", {h: ''+header+divContents+'</body></html>', file_name: $rootScope.real_lab_no})

}
$scope.generate3 = function()
{

    var normal_page_height = 600
    var start_height = 0
    var setpages  = 0
    var pages  = ""
    var cnt_page  = 1
    var sum = 0
    var cnt = 0
    var ispage1 = false
    var control_height = normal_page_height //screen.height*0.80 + 0
    var mini_break = 0.90

    $(".track-page").each(function(i){
    
        var broken = false
        cnt++
        if(cnt == 1)
        {
            ispage1 = true
            pages +=  "<div class = 'pagex' style = 'position: absolute; font-size: 0.5em; top: 0; left: 7.5%'>Page "+cnt_page+"</div>"
            pages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
            pages += "<div class = 'is-clinical'>"+$(".clinical").html()+"</div>"
           
        }
        //: find the cat_name incase if need
        var find_cat_name = $(this).find(".cat_name").html()
       
        var height_of_page = $(this).height()
        //console.log("HPage "+height_of_page)
        //console.log("----------emma-------------")
        
        if(height_of_page > normal_page_height)
        {
           // var emhtml = $(this).html()
            var get_rows = $(this).find(".track_row")
            
            //: break each row
            var break_h = 0
            get_rows.each(function(j){

            var row_h = $(this).height()
           // console.log($(this).height())
           // console.log("____________________"+j)
            break_h += row_h 
            var mypage = 0
            if(break_h > 600)
            {
                //: get the children
                var getchildren = $(this).find(".test-info").children()
                var child_height = 0
                if(getchildren)
                {
                   getchildren.each(function(k){
                    child_height += $(this).height()
                    if(child_height > 500)
                    {
                        var offsetx = child_height - 500
                        child_height = offsetx
                        // console.log("Height C "+child_height)
                        // console.log("Offset "+offsetx)
                        // console.log("cat name "+find_cat_name)
                        //: break and offset
                 //: testing
                broken = true
               
                var mpages = "<div><span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span></div><div class = 'clearfix'></div>";
               mpages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"+"<div style = 'font-size: 1.2em; padding: 20px; font-weight: 600; text-align: center'>"+find_cat_name+"</div>"
               $(this).append("<div class = 'page-break'></div>"+mpages) 
            
                cnt_page++
                break_h = 0


                    }
                    //console.log("Child height: ")
                    //console.log("========== "+k)
                }) 

                }
                

                //: testing
               // broken = true
               
               // var mpages = "<div><span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span></div><div class = 'clearfix'></div>";
               // mpages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>" 
               //  $(this).append("<tr class = 'page-breakx'><td><div >________________emma---------</div></td></tr>")
                //cnt_page++
               // break_h = 0

            }
           // console.log("H "+row_h)
           // console.log("_____________________")

            })
            
            var emhtml = $(this).html()
            //: process for multiple pages
            if(ispage1 == true)
            {
              //pages += "<div class = 'track-page'>"+emhtml+"</div>"
              //pages += "<div class = 'page-break'></div>" 
              //ispage1 = false // only once 
              //pages += "<div class = 'text-center cat_name'>"+find_cat_name+"</div>"
              pages += "<div class = 'track-page'>"+emhtml+"</div>"

              if(broken == false)
              {
                // pages += "<div class = 'page-break'></div>"
                // cnt_page++ 
              }              

              ispage1 = false // only once           
                

            }else
            {
             // pages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>" 
              //pages += "<div class = 'text-center cat_name'>"+find_cat_name+"</div>"
             // pages += "<div class = 'page-break'></div>" 
             //cnt_page++

            }



        }else
        {
            //: one page of category
            var emhtml = $(this).html()
           
            if(ispage1 == true)
            {

              pages += "<div class = 'track-page'>"+emhtml+"</div>"
              pages += "<div class = 'page-break'></div>" 
              ispage1 = false // only once 
              cnt_page++   
            }else
            {
                 pages += "<div><span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span></div><div class = 'clearfix'></div>";
                 pages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>" 
                 pages += "<div class = 'track-page'>"+emhtml+"</div>"
                pages += "<div class = 'page-break'></div>" 
                cnt_page++  
            }
              
            

        }

    }) //: after each category
    var header = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><meta name="author" content=""><link href="css/bootstrap.css" rel="stylesheet"><link href="css/style.css" rel="stylesheet"> <link rel="stylesheet" href="css/ngDialog.min.css"><link rel="stylesheet" href="css/ngDialog-theme-default.min.css">  <link rel="stylesheet" href="css/ngDialog-custom-width.css"><link href="css/ubuntufont.css" rel="stylesheet"></head><body>'+'<div style="margin-right: auto; margin-left: auto; margin-top: 50px; width: 85%">'+"<div style = 'position: fixed; top: 0; right: 7.5%; left: 7.5%'><h3  class = 'header'><img style = 'float: right' src='img/logo.png' width='20%'  /></h3></div>"
   
        var divContents = pages+"<div  style = 'position: fixed; bottom: 10; right: 7.5%; left: 7.5%;'><img src='img/address-print.png' width='100%'  /></div>"
    ipcRenderer.send("print-to-pdf", {h: ''+header+divContents+'</body></html>', file_name: $rootScope.real_lab_no})



}

$scope.generate2 = () => {
      
        //------------------START HERE--------------------------
        var setpages  = 0
        var pages  = ""
        var cnt_page  = 1
        var sum = 0
        var control_height = screen.height*0.80 + 0
        var mini_break = 0.90
       // alert("Control: "+control_height)
     
        //: get the height of page
$(".track-page").each(function(i){
        
        var broken = false
        if(i == 0)
        {
            pages +=  "<div class = 'pagex' style = 'position: absolute; font-size: 0.5em; top: 0; left: 7.5%'>Page "+cnt_page+"</div>"
            pages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
            pages += "<div class = 'is-clinical'>"+$(".clinical").html()+"</div>"
        }
        //: find the cat_name incase if need
        var find_cat_name = $(this).find(".cat_name").html()
        
        var height = $(this).height()
        
        setpages +=  height
        // alert("First Height: "+height)
        if(setpages > control_height)
        {
        
    var find_test_info =  $(this).find(".test-info")
    
    var breakhtml = ""
        
        if(find_test_info.height())
        {
            //alert("Malice: "+find_test_info.height())
            //: get h of children
            var total_child = 0;
            var ofpage = 0 // setpages - find_test_info.height()
            total_child = ofpage
            find_test_info.children().each(function(jx){
            
                var child_h = $(this).height()

                total_child += child_h 
                
                //alert("Issa Page "+control_height)
                // alert("Mini Page  "+control_height*mini_break)
                if(total_child > control_height*mini_break)
                {
                // alert("Para "+cnt_page)
                    // //: new page
                    cnt_page++ 
                    breakhtml += "<div class = 'page-break'> <span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span><div><div class = 'clearfix'></div>"
                    breakhtml += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
                    breakhtml += "<div style = 'font-size: 1.2em; padding: 20px; font-weight: 600; text-align: center'>"+find_cat_name+"</div>"
                    total_child = 0
                    breakhtml += "<p>"+$(this).html()+"</p>"
                    broken = true
                    
                }else
                {
                total_child += child_h 
                breakhtml += "<p class = 'paragraph'>"+$(this).html()+"</p>"

                }
                
            })
        //: reformat the paragraph
            find_test_info.html(breakhtml)
        
        }



    //--------- end man.
        
        var emhtml = $(this).html() 

        if(broken == false)
        {
        //alert("Normal  "+cnt_page)
            cnt_page++
            //: there was no prev break
            pages += "<div class = 'page-break'> <span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span><div><div class = 'clearfix'></div>"
        pages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
        }
        

        pages += "<div class = 'track-page'>"+emhtml+"</div>"
        setpages  = 0 


        }else{
            
            
            
                pages += "<div class = 'track-page'>"+$(this).html()+"</div>" 
            
            
        }  



}) 
        var header = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><meta name="author" content=""><link href="css/bootstrap.css" rel="stylesheet"><link href="css/style.css" rel="stylesheet"> <link rel="stylesheet" href="css/ngDialog.min.css"><link rel="stylesheet" href="css/ngDialog-theme-default.min.css">  <link rel="stylesheet" href="css/ngDialog-custom-width.css"><link href="css/ubuntufont.css" rel="stylesheet"></head><body>'+'<div style="margin-right: auto; margin-left: auto; margin-top: 50px; width: 85%">'+"<div style = 'position: fixed; top: 0; right: 7.5%; left: 7.5%'><h3  class = 'header'><img style = 'float: right' src='img/logo.png' width='20%'  /></h3></div>"
   
        var divContents = pages+"<div  style = 'position: fixed; bottom: 10; right: 7.5%; left: 7.5%;'><img src='img/address-print.png' width='100%'  /></div>"
    ipcRenderer.send("print-to-pdf", {h: ''+header+divContents+'</body></html>', file_name: $rootScope.real_lab_no})



}
      $scope.generate_pdf = () => {

        var header = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><meta name="author" content=""><link href="css/bootstrap.css" rel="stylesheet"><link href="css/style.css" rel="stylesheet"> <link rel="stylesheet" href="css/ngDialog.min.css"><link rel="stylesheet" href="css/ngDialog-theme-default.min.css">  <link rel="stylesheet" href="css/ngDialog-custom-width.css" media = "all"><link href="css/ubuntufont.css" rel="stylesheet" media = "all"></head><body><div style="margin-right: auto; margin-left: auto; width: 90%">'
        //: get profile heights
        //var prof = $(".test-body").find(".pf-summary")
      // console.log(prof)
        // prof.each(function(i){
        //         //: if the height is more than 600 append a page break
        //        var geth = this.scrollHeight
        //        alert(geth)
        //         if(geth > 400)
        //         {
        //           $(this).append('<div class="page-breaker"></div><div class = "header-logo"></div><span style = "float: right !important; width: 30%; margin-bottom: 28px" class = "pull-right"> <img src = "img/logo.png" width = "100%"  /></span></div><br>')   
        //         }
               

        // })
       
       // var height = $(".test-body").innerHeight()
       // alert(height)
       // alert("print me")
        ipcRenderer.send("print-to-pdf", {h: ''+header+$(".test-body").html()+'</body></html>', file_name: $rootScope.real_lab_no})
       // ipcRenderer.send("print-to-pdf", {h: ''+header+$(".test-body").html()+'<div class = "new-page-footer" style="margin-left: auto; margin-right: auto; width: 90%; position: absolute; bottom: 15px; right: 35px"><img src = "img/address-print.png" width="100%" /></div><div class = "page-breaker"></div></body></html>', file_name: $rootScope.real_lab_no})

      }

    $scope.print_to_printer = () => {
      //: ALGO: TRACK  track-page, if big track a-profilex, if big track trac_row
    //: total height of page
    //var total_height  = 0
   // var ctrl_height = 2050
    var one_pagex = 1200
    var cnt  = 0
    var pages  = ""
    var cnt_page  = 1
    var ispage1 = false
    $(".track-page").each(function(i){
        //: replace tables with div
$(this).find("table").each(function(jr){

            //  $(this).replaceWith("<div class = 'divTable'>"+$(this).html()+"</div>")
            $(this).wrap("<div class = 'jnr'></div>")

           var mhtml =  $(this).parent().html()
           mhtml = $('<textarea />').html(mhtml).text()
           
            mhtml = mhtml.replace('<table class="MsoNormalTable"', '<div class = "divTable"')
            mhtml = mhtml.replaceAll('</table>', '</div>')

            mhtml = mhtml.replaceAll('<tr', '<div class = "divTableRowx"')

            mhtml = mhtml.replaceAll('</tr>', '</div>')
            
            mhtml = mhtml.replaceAll('<td', '<div class = "divTableCellx"')
            mhtml = mhtml.replaceAll('</td>', '</div>')
            mhtml = mhtml.replaceAll('<tbody></tbody>', "")
            mhtml = mhtml.replaceAll('</tbody>', "")
          // alert(mhtml)
            $(this).parent().html(mhtml)
            $(this).append("<div class = 'clearfix'></div>")

          //  console.log("table -----")
           // console.log($(this).html())
})
//: find msnormal class in table cell and remove to prevent error in breaking
$(this).find(".divTableCellx").each(function(y){
    $(this).find(".MsoNormal").removeClass("MsoNormal")
})
//: start here
var broken = false
        cnt++
        if(cnt == 1)
        {
            ispage1 = true
            pages +=  "<div class = 'pagex' style = 'position: absolute; font-size: 0.5em; top: 0; left: 7.5%'>Page "+cnt_page+"</div>"
           // pages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"
           // pages += "<div class = 'is-clinical'>"+$(".clinical").html()+"</div>"
           
        }
        //: find the cat_name incase if need
        var find_cat_name = $(this).find(".cat_name").html()
//: end here

        var last_this = false
        var page_height = $(this).height()
        
        //: if category page height > one page. track-page is big
        if(page_height > one_pagex)
        {
       
        var c_page = 0      
        //: get desc
        var getdesc = $(this).find(".a-profilex")
          
      
        getdesc.each(function(i){
        
            var dheight = $(this).height()
           
            var one_page = one_pagex
            c_page += dheight
            //: a-profilex is too big
            if(c_page > one_page)
            {
                 
               var row_height = 0 // offset
             // : move deep more
             var innerdesc = $(this).find(".track_row")
                //: track each row
             innerdesc.each(function(ii){
                
                row_height += $(this).height()
                
               //console.log("ProfieX R "+row_height)

                var bias = 375  //: one page

                if(row_height > bias)
                {

                    ///: long document, still break down
                   // console.log("rrrrororo "+row_height)
                var last_breaker = 1000
                
                if($(this).height() > last_breaker)
                {
                   var innermsword = $(this).find(".MsoNormal")
                   var last_bheight = row_height
                   innermsword.each(function(kk){
                    last_bheight += $(this).height()
                    if(last_bheight > 1800)
                    {
                        //: last breaker
                         //: break page
                    // $(this).append("<div class = 'clearfix'></div>")
                     cnt_page++
                     var mpages = "<div><span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span></div><div class = 'clearfix'></div>";
                    mpages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"+"<div style = 'font-size: 1.2em; padding: 20px; font-weight: 600; text-align: center'>"+find_cat_name+"</div>"
      
                     $("<br><br><br><br><div class = 'page-break'></div>"+mpages).appendTo($(this)) 
                     row_height = 0 
                     c_page = 0
                     last_bheight = 0


                    }
                      // console.log("Inner Word "+$(this).height())
                   })
                }else
                {

                     //: break page
                     $(this).append("<div class = 'clearfix'></div>")
                     cnt_page++
                     var mpages = "<div><span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span></div><div class = 'clearfix'></div>";
                    mpages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"+"<div style = 'font-size: 1.2em; padding: 20px; font-weight: 600; text-align: center'>"+find_cat_name+"</div>"
      
                     $("<div class = 'page-break'></div>"+mpages).appendTo($(this)) 
                     row_height = 0 
                     c_page = 0


                }

                   
                }
      

             })
             

            }


      
      })

        // if(last_this != false)
        // {
        //    $(this).append("<div class = 'clearfix'></div>")
     
        //     $("<div class = 'page-break'></div>").appendTo(last_this) 
        // }
        


        }else{
        //console.log("////////////////////////   "+i) 
        //: put each category or profile in different page
        // alert($(this).height()) 
         if(ispage1 == true)
         {
            var mpages = "<div><span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span></div><div class = 'clearfix'></div>";
            mpages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"//+"<div style = 'font-size: 1.2em; padding: 20px; font-weight: 600; text-align: center'>"+find_cat_name+"</div>"
              $(this).append("<div class = 'page-break'></div>"+mpages)
           //  $(this).append("<div class = 'page-break'></div>")
         }else
         {
             cnt_page++
             var mpages = "<div><span class = 'pagex' style = 'float: left; font-size: 0.5em'>Page "+cnt_page+"</span></div><div class = 'clearfix'></div>";
            mpages += "<div class = 'nnheader'>"+$(".patient-header-info").html()+"</div>"+"<div style = 'font-size: 1.2em; padding: 20px; font-weight: 600; text-align: center'>"+find_cat_name+"</div>"
              $(this).append("<div class = 'page-break'></div>"+mpages)
         }
         
               
         

        }
      
          
     
    })
    
    pages = pages+""+$(".test-body").html()
   var header = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><meta name="author" content=""><link href="css/bootstrap.css" rel="stylesheet"><link href="css/style.css" rel="stylesheet"> <link rel="stylesheet" href="css/ngDialog.min.css"><link rel="stylesheet" href="css/ngDialog-theme-default.min.css">  <link rel="stylesheet" href="css/ngDialog-custom-width.css"><link href="css/ubuntufont.css" rel="stylesheet"></head><body>'+'<div style="margin-right: auto; margin-left: auto; margin-top: 50px; width: 85%">'+"<div style = 'position: fixed; top: 0; right: 7.5%; left: 7.5%'><h3  class = 'header'><img style = 'float: right' src='img/logo.png' width='20%'  /></h3></div>"
   
   var divContents = pages+"<div  style = 'position: fixed; bottom: 10; right: 7.5%; left: 7.5%;'><img src='img/address-print.png' width='100%'  /></div>"
ipcRenderer.send("print-to-printer", header+divContents+'</body></html>')  
 
      } 

      $scope.print_a4 = () => {

        var header = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><meta name="author" content=""><link href="css/bootstrap.css" rel="stylesheet" media = "all"><link href="css/style.css" rel="stylesheet" media = "all"> <link rel="stylesheet" href="css/ngDialog.min.css" media = "all"><link rel="stylesheet" href="css/ngDialog-theme-default.min.css" media = "all">  <link rel="stylesheet" href="css/ngDialog-custom-width.css" media = "all"></head><body>'

        ipcRenderer.send("print-to-printer", header+$("#a4").html()+"</body></html>")

      } 

      $scope.print_pos = () => {

        var header = '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><meta name="description" content=""><meta name="author" content=""><link href="css/bootstrap.css" rel="stylesheet" media = "all"><link href="css/style.css" rel="stylesheet" media = "print"> <link rel="stylesheet" href="css/ngDialog.min.css" media = "all"><link rel="stylesheet" href="css/ngDialog-theme-default.min.css" media = "all">  <link rel="stylesheet" href="css/ngDialog-custom-width.css" media = "all"></head><body>'

        ipcRenderer.send("print-to-printer", header+$("#pos").html()+"</body></html>")

      }  
 





      //: result settings
      // $scope.result_settings = () => {

      //    db.get("result_report_settings", function(err, doc){

      //   if(doc)
      //   {
            
            
      //     $rootScope.result_settings_config = doc.settings
      //   }


      // })
      //    ngDialog.open({ template: 'dialogs/result-settings.html', className: 'ngdialog-theme-default custom-width', closeByDocument: false, closeByNavigation: true, closeByEscape: true, appendTo: "body" });

      // }

      $rootScope.result_settings_config = {}      
      $rootScope.result_settings_config.test_header = {}
      $rootScope.result_settings_config.test_header_font = {}
      $rootScope.result_settings_config.test_header_width = {} 
      $rootScope.result_settings_config.test_header_padding = {}
      $rootScope.result_settings_config.test_profile = {}
      $rootScope.result_settings_config.test_profilep = {}
      $rootScope.result_settings_config.result_general = {}
     
     //: grid settings for test results
     // $rootScope.result_settings_config.grid = {}
      $scope.load_settings = () => {
      
             db.get("result_report_settings", function(err, doc){

        if(doc)
        {
            
            
        $rootScope.result_settings_config = doc.settings
      //     $(".test-header").css($rootScope.result_settings_config.test_header)
      // $(".all-tests").css($rootScope.result_settings_config.test_profile)
      // $(".all-profiles").css($rootScope.result_settings_config.test_profilep)
      //  $(".preview-test-new tr td").css($rootScope.result_settings_config.result_general)
      //   $(".cat_name").css($rootScope.result_settings_config.result_general_h)
      //   //: header padding setting
      //   if($rootScope.result_settings_config.test_header_padding)
      //   $(".test-header td").css($rootScope.result_settings_config.test_header_padding)
        
      //   //:header width setting
      //   if($rootScope.result_settings_config.test_header_width)
      //    $(".test-header td").css($rootScope.result_settings_config.test_header_width)

      //   //: header font settings
        
      //    if($rootScope.result_settings_config.test_header_font)
      //    $(".test-header td").css($rootScope.result_settings_config.test_header_font)

         $rootScope.save_settings()
        }
        

      })
        
      }



     

      //: listen to pdf if generated
      ipcRenderer.on("wrote-pdf", function(event, path){
        alertInfo("PDF generated")
        //alert(path)
      })
       

  })

//: ELECTRON
// const electron = require("electron");
// const {ipcRenderer} = electron;
//const appxx =  electron.remote

//: JQUERY
$(document).ready(function(){
    /* const electron = require("electron");
    const {ipcRenderer} = electron;
    //: listen to menu navigations
    ipcRenderer.on("nav", function(e, payload){
       alert(payload)
    }) */
   
    $(".exit_app").click(function(){
        //const electron = require("electron");
        //const {ipcRenderer} = electron;
      //  app.quit();
       // ipcRenderer.send("exit:app");
       window.close();
    })



      
    
 

})
app.constant('LAB', {
  activated: false,
  notactivated: false,
  apptoken: "32340095955",  
  patient_custom_field: "patient_data_custom_fields",
  patient_custom_data: "patient_custom_data",
  ref_center_custom_data: "ref_center_custom_data",
  ref_center_data_custom_fields: "ref_center_data_custom_fields",
  ref_person_custom_data: "ref_person_custom_data",
  ref_person_data_custom_fields: "ref_person_data_custom_fields",
  inventory: "inventory_stock_item_",
  test_table: "department_master_test_list",
  post_url: "http://biosystemsdiagnostics.com/email/post.php"
})
app.service('R_SERVICE', function(LAB, $http, $q, $rootScope){

	
	//: store the user tree locally
	var getRequest = function(link){


return $q(function(resolve, reject) {
	//: load data from restful api
	  $http.get(link).success(function(res)
	  {




					resolve(res)





	}).error(function(er){

	//	alert("error")
	reject(JSON.stringify(er))


	});


	 });

};

var checkAlphaNumericChar = function(inputtxt){

  var letters = /^[0-9a-zA-Z \-]+$/;

  if (letters.test(inputtxt)) {
    //alert('accepted');
    return true;
  } else {
    //alert('Please input alphanumeric characters only');
    return false;
  }

};

//: set local storage
var setLocalStorage = function(k, v){
  window.localStorage.setItem(k, v)
}

//: get local storage
var getLocalStorage = function(k){

    var reg = window.localStorage.getItem(k)
				return reg
}


var generateUUID = function (){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

//: make a post request
// obj = {key : value, ss : settoval }
var makePostRequest = function(link, obj){

return $q(function(resolve, reject) {

  $http.post(link, obj).then(function (res){


	resolve(res)



        }, function(err){

           reject(JSON.stringify(err))

        });


							}); // end promise

};



Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

var moneyFormat = function(money){

var myMoney = money;
return myMoney.formatMoney(2,',','.'); //

//return formattedMoney;

};
var validateEmail = function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

var get_doc = (id) => {

    return $q(function(resolve, reject) {
     
        db.get(""+id, function(err, doc) {
            
            if(doc)
            {
               
             resolve([doc.my_doc, doc._rev])   
            }
            
            
            if (err) { 
        
              reject([]) 
            
            }
          
        
          });
    
         });

   
}

var angular_js_autofield = (static_form_list) => {
    
//for(var ema in $rootScope.patient_data_list)
for(var ema in $rootScope.data_form_list)
{

for(var treasure in $rootScope.patient_data_list_headers)
{

var sskip  = false

//var mres = check_object_index($rootScope.patient_data_list[ema], 
var mres = check_object_index($rootScope.data_form_list[ema].data, $rootScope.patient_data_list_headers[treasure])  


if(mres == false)
{
//$rootScope.patient_data_list[ema].push({name: $rootScope.patient_data_list_headers[treasure], val: "n/a"})    
$rootScope.data_form_list[ema].data.push({name: $rootScope.patient_data_list_headers[treasure], val: "n/a"})
//$rootScope.data_form_list[ema].push({name: $rootScope.patient_data_list_headers[treasure], val: "n/a"})

sskip  = true
}


}



}



//: re arrange based on col
// var temp_p_list = $rootScope.patient_data_list
var temp_p_list = static_form_list

var tempstr = []
//$rootScope.patient_data_list = []
static_form_list = []
$rootScope.data_form_list = []
//$rootScope.data_form_list = static_form_list

for(var i in temp_p_list)
{


tempstr = []

for(var iii in $rootScope.patient_data_list_headers)
{


for(var b in temp_p_list[i].data)
{


if(temp_p_list[i].data[b].name)
{


if(temp_p_list[i].data[b].name.trim() == $rootScope.patient_data_list_headers[iii].trim())
{
// console.log(temp_p_list[i])
//return
//tempstr.push({id: temp_p_list[i].id,  data: temp_p_list[i].data})
tempstr = temp_p_list[i] //tempstr.push(temp_p_list[i])

}

}

}

}
//$rootScope.patient_data_list.push(tempstr)
//  static_form_list.push(tempstr)

$rootScope.data_form_list.push(tempstr)

}

}

var get_patient_bio = function(name_data)
{
    var fname  = ""
    var title  = ""
    var lname  = ""
    var email  = ""
    var phone  = ""
    var age  = ""
    var sex  = ""
    for(var i in name_data)
    {
      if(name_data[i].name.toLowerCase() == "title")
      {
        title = name_data[i].val
      }
      if(name_data[i].name.toLowerCase() == "first name")
      {
        fname = name_data[i].val
      }
      if(name_data[i].name.toLowerCase() == "last name")
      {
        lname = name_data[i].val
      }

      if(name_data[i].name.toLowerCase() == "email address")
      {
          email = name_data[i].val
        
      }

      if(name_data[i].name.toLowerCase() == "phone number")
      {
        phone = name_data[i].val
      }

      if(name_data[i].name.toLowerCase() == "age")
      {
        age = name_data[i].birth_age
      }

      if(name_data[i].name.toLowerCase() == "sex")
      {
        sex = name_data[i].val

      }



    }

    return {name: title+" "+fname+" "+lname, phone: phone, email: email, age: age, sex: sex}
}



	return {
	getRequest: getRequest,
	setLocalStorage: setLocalStorage,
	getLocalStorage: getLocalStorage,
	generateUUID: generateUUID,
	makePostRequest:makePostRequest,
	moneyFormat: moneyFormat,
    validateEmail: validateEmail,
    get_doc: get_doc,
    angular_js_autofield: angular_js_autofield,
    get_patient_bio: get_patient_bio
	}


});