app.controller("PatientMaster", function($scope, $route, $compile){
    

      
    
        //! - - - - - - - - - -- - - - - - -LIST PATIENT RECORD
        
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
          // ALLOW VUE JS TO HANDLE
        //   var patient_master = new Vue({
        //     el: '#patient-master',
        //     data: {

        //     },
        //     methods: {

        //         AddToAceeptTest: function(){

        //             alert("test")

        //         }

        //     }

        //     })
        //     alert(patient_master)
                
        
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

    //alert("test center")

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

app.controller("ReferralPersonMaster", function($scope){

    //alert("test ref person")

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
app.controller("GuardianMaster", function($scope){

       // alert("test guardian")
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
$scope.master_data = {}
$scope.AddMaster = function(master_name, skips, master_data, api_route, server_method, callback ){
AddMaster(master_name, skips, master_data, api_route, server_method, callback, $scope)
}

})
