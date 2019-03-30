var remoteCouch = 'http://18.188.75.63:5984/biosystems/';
var db = new PouchDB(remoteCouch, {
    ajax: {
      cache: false,
      timeout: 4000,
      headers: {
        'referer': 'http://18.188.75.63:5984/biosystems'
      },
    },
    auth: {
      username: 'biosystems',
      password: '!!!biosystems!!!'
    }
  })
  //add_software_user();
  function add_software_user()
  {
     //: dev username and password
  var table = {
    _id: "software_users_"+"admin",
    username: "admin",
    password: "admin",
    f_name: "BioSystems Lab"
  };
  db.put(table, function callback(err, result) {
    if (!err) {
       
      alert('Username added successfully');

    }else{
        console.log(err)
    }
  });  
  }
 
