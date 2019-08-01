//import { debug } from 'util';

//: NODE JS
// var request = require('request');
// var fs = require('fs');
//: ANGULAR JS
var app = angular.module("myApp", ["ngRoute", "ngDialog", "moment-picker", "ui.bootstrap", "ngSanitize"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/start.html"
        })
        .when("/accept_test/:title", {
            templateUrl: "views/accept-test.html",
            controller: "AcceptTest"
        })
        .when("/accept_test_list/:title", {
            templateUrl: "views/accept-test-list.html",
            controller: "AcceptTestList"
        })
        .when("/masters", {

            templateUrl: "views/masters.html"
        })
        .when("/staff_master/staff-master", {

            templateUrl: "views/staff-master.html",
            controller: "StaffMaster"
        })
        .when("/patient_master/patient-master", {

            templateUrl: "views/patient-master.html",
            controller: "PatientMaster"
        })
        .when("/guardian/guardian-master", {

            templateUrl: "views/guardian-master.html",
            controller: "GuardianMaster"
        })
        .when("/upload/upload-master", {

            templateUrl: "views/upload-master.html",
            controller: "UploadMaster"
        })
        .when("/center/center-master", {

            templateUrl: "views/center-master.html",
            controller: "ReferralCenterMaster"
        })
        .when("/doctor_master/doctor-master", {

            templateUrl: "views/doctor-master.html",
            controller: "DoctorMaster"
        })
        .when("/ref/ref-master", {

            templateUrl: "views/ref-master.html",
            controller: "ReferralPersonMaster"
        })        
        .when("/accept_edit_test/:title/:id", {
            templateUrl: "views/accept-edit-test.html",
            controller: "AcceptTest"
        })
        .when("/accept_test_list_unpartial/:title", {
            templateUrl: "views/accept-test-list-unpartial.html",
            controller: "AcceptTestUnPartial"
        })

        .when("/accept_test_list_full/:title", {
            templateUrl: "views/accept-test-list-full.html",
            controller: "AcceptTestUnPartial"
        })
        
        .when("/accept_test_preview/:title", {
            templateUrl: "views/accept-test-preview.html",
            controller: "AcceptTest"
        })

        .when("/perform_test/:title", {
            templateUrl: "views/perform-test.html",
            controller: "PerformTest"
        })

        .when("/perform_test_list_dept/:title/:department/:id", {
            templateUrl: "views/accept-test-list-dept.html",
            controller: "AcceptTestUnPartial"
        })        
        
        .when("/settings/settings-master", {
            templateUrl: "views/settings-master.html",
            controller: "SettingMaster"
        })
        
        .when("/inventory/:title", {
            templateUrl: "views/inventory-master.html"
        }).when("/inventory_setup/:title", {
            templateUrl: "views/inventory-setup.html"
        }).when("/purchase_order/:title", {
            templateUrl: "views/purchase-order.html"
        }).when("/receive_order/:title", {
            templateUrl: "views/receive-order.html"
        }).when("/track_inventory/:title", {
            templateUrl: "views/track-inventory.html"
        }).when("/report/:title", {
            templateUrl: "views/report-master.html"
        }).when("/report_revenue/:title", {
            templateUrl: "views/report-revenue.html"
        }).when("/department_master/:title", {
            templateUrl: "views/department-master.html",
            controller: "DepartmentMaster",
            cache: false
        }).when("/medicine_master/:title", {
            templateUrl: "views/medicine-master.html",
            controller: "MedicineMaster"
        }).when("/social_settings/:title", {
            templateUrl: "views/social-settings.html"
        }).when("/business_settings/:title", {
            templateUrl: "views/business-settings.html"
        }).when("/approve_tests/:title", {
            templateUrl: "views/accept-test-list-full.html",
            controller: "AcceptTestUnPartial"

        }).when("/unit_master/:title", {
            templateUrl: "views/units-master.html"
        }).when("/user_login", {
            templateUrl: "views/user-login.html"
        }).when("/test_master/:title", {
            templateUrl: "views/test-master.html",
            controller: "TestMaster"
        }).when("/profile_master/:title", {
            templateUrl: "views/profile-master.html",
            controller: "ProfileMaster"
        }).when("/manage_assigned_stock/:title", {
            templateUrl: "views/manage-assigned-stock.html"
        }).when("/manage_assigned_stock_profile/:title", {
            templateUrl: "views/manage-assigned-stock-profile.html"
        }).when("/inventory_logs/:title", {
            templateUrl: "views/inventory-logs.html"
        });


}).directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
}).directive("myForm", function () {
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
            if (scope.form.type == "text") {
                var el = angular.element('<div class = "form-group"><label><b>' + scope.form.placeholder + '</b></label><br><input class = "form-control" type="text" placeholder = "' + scope.form.placeholder + '" data-ng-model = "' + scope.form.model + '"></div>')
                element.append(el);
                $compile(el)(scope);

            }

            //: support textarea
            if (scope.form.type == "textarea") {
                var el = angular.element('<div class = "form-group"><label><b>' + scope.form.placeholder + '</b></label><br><textarea class = "form-control" type="text" placeholder = "' + scope.form.placeholder + '" data-ng-model = "' + scope.form.model + '" /></div>')
                element.append(el);
                $compile(el)(scope);
            }

            //: support select box drop down
            if (scope.form.type == "select") {

                var el = angular.element('<div class = "form-group"><label><b>' + scope.form.placeholder + '</b></label><br><select class = "form-control" ng-options="option.name for option in ' + scope.form.select + '.availableOptions track by option.id" ng-model="' + scope.form.model + '"><option  value = "">--select--</option></select></div>')
                element.append(el);
                $compile(el)(scope);
            }

            //: custom button and text fied
            if (scope.form.type == "textbtn") {
                var el = angular.element('<div class = "form-group form-inline"><label><b>' + scope.form.placeholder + '</b></label><br><input class = "form-control " type="text" placeholder = "' + scope.form.placeholder + '" data-ng-model = "' + scope.form.model + '" ng-enter = "' + scope.form.func + '"> <button class = "my-btn btn-sm" ng-click = "' + scope.form.func + '">search</button></div>')
                element.append(el);
                $compile(el)(scope);

            }

            if (scope.form.type == "date") {
                var el = angular.element('<label><b>' + scope.form.placeholder + '</b></label><br><div class="input-group"  moment-picker="' + scope.form.model + '"  format="MM/DD/YYYY"  start-view="year" min-view = "decade"><span class="input-group-addon"> <i></i></span><input class="form-control" placeholder="Select a date" ng-model="' + scope.form.model + '" ng-model-options="{ updateOn: ' + "'blur'" + ' }" ng-blur="' + scope.form.call_back + '" ng-enter = "' + scope.form.call_back + '"></div>')
                element.append(el);
                $compile(el)(scope);



            }

            if (scope.form.type == "datex") {
                var el = angular.element('<label><b>' + scope.form.placeholder + '</b></label><br><div class="input-group"  moment-picker="' + scope.form.model + '"  format="MM/DD/YYYY"  start-view="year" min-view = "decade"><span class="input-group-addon"> <i>{{' + scope.form.age + '}} yrs</i></span><input class="form-control" placeholder="Select a date" ng-model="' + scope.form.model + '" ng-model-options="{ updateOn: ' + "'blur'" + ' }" ng-blur="' + scope.form.call_back + '" ng-change = "' + scope.form.call_back + '" ng-enter = "' + scope.form.call_back + '"></div>')
                element.append(el);
                $compile(el)(scope);



            }

        }
    }
}).directive('myCurrentTime', ['$interval', 'dateFilter', function ($interval, dateFilter) {

    function link(scope, element, attrs) {
        var format,
            timeoutId;

        function updateTime() {
            var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            var d = new Date();
            var n = d.getDay();
            element.text(daysOfWeek[n] + ", " + dateFilter(new Date(), format));
        }

        scope.$watch(attrs.myCurrentTime, function (value) {
            format = value;
            updateTime();
        });

        element.on('$destroy', function () {
            $interval.cancel(timeoutId);
        });

        // start the UI update process; save the timeoutId for canceling
        timeoutId = $interval(function () {
            updateTime(); // update DOM
        }, 1000);
    }

    return {
        link: link
    };
}]);

//: parent controller
app.controller("my_server", function ($scope, $rootScope, ngDialog, $compile, $location) {
    
    $scope.Emit = function (obj, key, val) {

        $rootScope.$emit('AddToAcceptTest', [obj, key, val]);

    }
    $scope.EmitTestToSearch = function (code) {

        $rootScope.$emit('EmitTestToSearch', code);

    }
    $scope.EmitSearchPatient = function (code) {

        $rootScope.$emit('EmitSearchPatient', code);

    }
    $scope.EmitSearchMaster = function (master) {

        $rootScope.$emit('EmitSearchMaster', master);

    }
    $scope.EmitEditAcceptedTest = function (id) {

        $rootScope.$emit('EmitEditAcceptedTest', id)

    }
    $scope.EmitPreviewHtml = function (html, place) {

        $rootScope.$emit('EmitPreviewHtml', [html, place])

    }
    //! - - - - - - - - - -- - - - - - -#################   VERSION 3
    //: detect url change
    $scope.$on('$routeChangeStart', function ($event, next, current) {
        // ... you could trigger something here ..
        $rootScope.show_bar = false
        //? userinf
        getUserInfo($scope)

        $scope.panel_title = next.pathParams["title"]

        $scope.TemplateURL(next.templateUrl)




    });
    //! - - - - - - - - - -- - - - - - -

    $scope.TemplateURL = function (url) {

        switch (url) {
            case "views/patient-master.html":


                break;

        }
    }
    //! - - - - - - - - - -- - - - - - -
    $scope.patient_form = () => {

        $rootScope.show_bar = true
        $(".modal-body").load("views/patient-master.html", function (text) {


            $("#modal-id").modal("show")

            $compile($("#modal-id"))($scope);

        })

    }

    $scope.ref_center_form = () => {
        $rootScope.show_bar = true
        ngDialog.open({
            template: 'views/center-master.html',
            className: 'ngdialog-theme-default custom-width',
            closeByNavigation: true
        });
    }
    $scope.ref_person_form = () => {
        $rootScope.show_bar = true
        ngDialog.open({
            template: 'views/ref-master.html',
            className: 'ngdialog-theme-default custom-width',
            closeByNavigation: true
        });
    }
    $scope.guardian_form = () => {
        $rootScope.show_bar = true
        ngDialog.open({
            template: 'views/guardian-master.html',
            className: 'ngdialog-theme-default custom-width',
            closeByNavigation: true
        });
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
    //: detect url change
    $scope.$on('$routeChangeStart', function ($event, next, current) {
        // ... you could trigger something here ..

        $scope.panel_title = next.pathParams["title"]

    });
    //: get user is logged in data
    $scope.is_admin = false
    $scope.home = function () {
        // $location.path("/")
        window.history.back()
        // $scope.clear_form()
    }
    $scope.homex = function () {

        $location.path("/")
        //$scope.clear_form()
    }

    //: ### UI NAV COMMANDS
    $scope.accept_test_ui = function () {
        //  alert("Good to go!")
        //alertError("Good to go!")
        // alert(window.location.href)
        $location.path("/accept_test/Accept Test")
    }
    $scope.perform_test_ui = function () {

        $location.path("/perform_test/Perform Test By Department")
    }
    $scope.report_ui = function () {

        $location.path("/report/ Accounting")
    }
    $scope.report_revenue_ui = function () {

        $location.path("/report_revenue/ Revenue Report")
    }
    $scope.approve_tests_ui = function () {

        $location.path("/approve_tests/ Approve Tests")
    }

    $scope.accept_test_list_ui = function () {

        $location.path("/accept_test_list/Accept Test List")
    }
    $scope.accept_test_list_unpartial_ui = function () {

        $location.path("/accept_test_list_unpartial/Unperformed | Partial List")
    }
    $scope.accept_test_list_full_ui = function () {

        $location.path("/accept_test_list_full/Full List")
    }

    $scope.inventory_ui = function () {

        $location.path("/inventory/Inventory Master")
    }
    $scope.inventory_logs_ui = function () {

        $location.path("/inventory_logs/Inventory Logs")
    }
    $scope.inventory_setup_fxn = function () {

        $location.path("/inventory_setup/Inventory Setup")
    }

    $scope.profile_master_nav = function () {

        $location.path("/profile_master/Profile Master")
    }

    $scope.test_master_nav = function () {

        $location.path("/test_master/Test Master")
    }
    $scope.department_master_nav = function () {

        $location.path("/department_master/Department Master")
    }
    $scope.manage_assigned_stock_ui = function () {

        $location.path("/manage_assigned_stock/Manage Assigned Stock to tests")
    }
    $scope.manage_assigned_stock_profile_ui = function () {

        $location.path("/manage_assigned_stock_profile/Manage Assigned Stock to profile")
    }

    $scope.purchase_order_ui = function () {

        $location.path("/purchase_order/Create Purchase Order")
    }
    $scope.receive_order_ui = function () {

        $location.path("/receive_order/Receive Order")
    }
    $scope.track_inventory_ui = function () {

        $location.path("/track_inventory/Track Inventory")
    }



})