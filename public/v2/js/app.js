function V2() {

}
//: 



var _v2 = new V2()

//============================= SORT ACCEPTED TESTS BY DATE
var FromSortAcceptedTestsByDate = "tt"
var ToSortAcceptedTestsByDate = ""
setTimeout(function() {
    //var SortAcceptedTestsByDate = document.getElementById("SortAcceptedTestsByDate")
   
    $(document).on("click", "#SortAcceptedTestsByDate", function(){
        //alert(8884)

        FromSortAcceptedTestsByDate = $("#FromSortAcceptedTestsByDate").val()
        ToSortAcceptedTestsByDate = $("#ToSortAcceptedTestsByDate").val()
        
        var _datatable_id = "#list-accepted-tests"
        var url = getAPI("master", "ListAcceptedTests")
        //console.log(data)
        var type = "json"
        var data =  {"from_data": FromSortAcceptedTestsByDate, "to_data": ToSortAcceptedTestsByDate}
        server(url,data, type, function(res) {

            if ($.fn.DataTable.isDataTable(_datatable_id)) {
               
                
                    
                    var dd = $(_datatable_id).DataTable()
                    dd.destroy()
                    var options = {
                        ajax: {
                          url: url,
                          type: "post",
                          data: data
                        },
                        "order": [[ 0, "desc" ]]
                      }
                      $(_datatable_id).DataTable(options)


              

              }
          
               // $(_datatable_id).DataTable().ajax.reload()
            
        })
        
    })

}, 500);
//============================ END SORT ACCEPTED TESTS BY DATE