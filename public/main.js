
const electron = require("electron");

const url = require("url");

const path = require("path");

const os = require('os');

const storage = require('electron-json-storage');

const fs = require('fs');
const fse = require('fs-extra');

const shell = electron.shell

const {app, BrowserWindow, Menu, ipcMain} = electron;

//: doc path
const app_doc_path = app.getPath("documents")+"\\bio-labmaster";
const print_html = app_doc_path+"\\printing.html";
const report_folder = app_doc_path+"\\reports";
//: create the directory if not exist
try {
    fs.statSync(app_doc_path);
  } catch(e) {
    fs.mkdirSync(app_doc_path);
 
}
try {
    fs.statSync(report_folder);
  } catch(e) {
    fs.mkdirSync(report_folder);
 
}



//: if css resource is not found
if (! fs.existsSync(app_doc_path+"\\css")) {
    // Do something
    try {
    fs.statSync(app_doc_path+"\\css");
  } catch(e) {
    fs.mkdirSync(app_doc_path+"\\css");
 
}
    
    fse.copy(__dirname+"\\css", app_doc_path+"\\css", function (err) {
  
  if (err) {

    console.error(err);

  } else {

    console.log("success!");
  }

}); 
    
 }
//: if img resource is not found
if (! fs.existsSync(app_doc_path+"\\img")) {
  try {
    fs.statSync(app_doc_path+"\\img");
  } catch(e) {
    fs.mkdirSync(app_doc_path+"\\img");
 
}
fse.copy(__dirname+"\\img", app_doc_path+"\\img", function (err) {
  if (err) {
    console.error(err);
  
  } else {
    console.log("success!");
  }
}); 

}

let mainWindow, loadingScreen, logonScreen, printingWindow,
loadingWindowParams = {
  width: 500,
  height: 250,
  frame: false,
  show: false
}, logonWindowParams = {
  width: 500,
  height: 250,
  frame: false,
  show: false,
  backgroundColor: '#f9f9f9', 
  title: "BioSystems", 
  titleBarStyle: "hidden"  
}, activateScreen, setUpScreen;



//: create mene template
const menu_template = [
{
  label: "Masters", 
  submenu: [
    {
      label: "Department Master",
      click: () => {
       app_functions.nav("department_master/Department Master");
       
  
      }
    },
    {
      label: "Test Master",
      click: () => {
        app_functions.nav("test_master/Test Master");
        
   
       }
    },
    {
      label: "Profile  Master",
      click: () => {
        app_functions.nav("profile_master/Profile Master");
        
   
       }
    },
    {
      label: "Medicine Group Master"
    },
    {
      type: "separator"
    },
    {
      label: "Medicine Master",
       click: () => {
       app_functions.nav("medicine_master/Medicine Master");
       
  
      }
    },
    {
      label: "Package Master"
    },
    {
      label: "Patient Master"
    },
    {
      label: "Panel Master"
    },
    {
      type: "separator"
    },
    {
      label: "Consultant Master"
    },
    {
      label: "PRO Master"
    },
    {
      label: "Sample Master"
    },
    {
      label: "Item Master"
    },
    {
      label: "Sample Type Master"
    },
    {
      type: "separator"
    },
    {
      label: "Collection Center"
    },
    {
      label: "Concession Authority Master"
    },
   
    {
      label: "Sample Type"
    },
    {
      label: "Sample Groups"
    },
    {
      label: "Department Serial No. Setting"
    },
    {
      label: "Consultant Cuts",
      submenu:
      [
        {label: "Referred by consultant Cuts"},
        {label: "Test wise reffered by Cuts"},
      ]
    },
    {
      label: "Item Group"
    },
    {
      type: "separator"
    },
    {
      label: "Source of Blood"
    },
    {
      label: "Vendor"
    },

    {
      label: "Exit",
      click: () => {
        app_functions.quit()
      },
      accelerator: "Ctrl+Q"
    }
  ]

},
{
  label: "Booking", 
    submenu: [
      {
        label: "Undo", 
        click(){
         
        }
      }
    ]
},
{
  label: "Test Perform", 
    submenu: [
      {
        label: "Undo", 
        click(){
         
        }
      }
    ]
},
{
  label: "Printing", 
    submenu: [
      {
        label: "Undo", 
        click(){
         
        }
      }
    ]
},
{
  label: "Transaction", 
    submenu: [
      {
        label: "Undo", 
        click(){
         
        }
      }
    ]
},
{
  label: "Lab Reports", 
    submenu: [
      {
        label: "Undo", 
        click(){
         
        }
      }
    ]
},
{
  label: "Settings", 
    submenu: [
    {
      label: "Result Settings",
       click: () => {
       mainWindow.webContents.send("result-settings-dialog:view");    
       
  
      }
    },
    {
      label: "Social Settings",
       click: () => {
       app_functions.nav("social_settings/Social Settings");
       
  
      }
    },
    {
      label: "Business Settings",
       click: () => {
       app_functions.nav("business_settings/Business Settings");
       
  
      }
    },

     {
      label: "Units",
       click: () => {
       app_functions.nav("unit_master/Manage Units");
       
  
      }
    },
      {
        label: "Database Configuration", 
        click(){
         
        }
      },
      {
        label: "Backup Remote DB", 
        click(){
         
        }
      }


      


    ]
},
{
  label: "Utilities", 
    submenu: [
      {
        label: "Undo", 
        click(){
         
        }
      }
    ]
},
{
  label: "Inventory", 
    submenu: [
      {
        label: "Stock", 
        click(){
         
        }
      },
       {
        label: "Vendors", 
        click(){
         
        }
      }
    ]
},
{
  label: "Help", 
    submenu: [
    {
        label: "Documentation", 
        click(){
         
        }
      }, 

      {
        label: "About", 
        click(){
         
        }
      },
      {
        label: "Contact Developer", 
        click(){
         
        }
      },
      {
        label: "Upgrade", 
        click(){
         
        }
      }

    ]
}

]


//: app have to be ready
//run app

app.on("ready", function(){

  
  
    //: splash screen loading
    createLoadingScreen();
    //createLogonScreen();
    //createActivateScreen();
    //createSetupScreen();
    //: create new window

    mainWindow = new BrowserWindow({show: false, backgroundColor: '#f9f9f9', title: "BioSystems", titleBarStyle: "hidden"})
    // mainWindow.maximize();
    // mainWindow.show();
    //: load html into window
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protocol: "file",
      slashes: "true"
    }));

//: wait for window to completely load
    mainWindow.webContents.on('did-finish-load', () => {
      
      //: check if user is logged in
       check_user_logged_in();
       
     
          });

    //: create menu
    const main_menu = Menu.buildFromTemplate(menu_template);
    Menu.setApplicationMenu(main_menu);

    
 // Emitted when the window is closed.
 mainWindow.on('closed', function () {
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  
  mainWindow = null;
  app.quit();
 
})

});

//: catch exit app
ipcMain.on("exit:app", function(){
  
    app_functions.quit();
    
  })
  //: catch logout app
ipcMain.on("logged_out:app", function(){
     user_logout();
 
    
  })
  //: login client from renderer logon.html on success
  ipcMain.on("login:client", function(e, data){

    //: do a one time remote authentication
    storage.set('user-logged-in', data, function(error) {
      if (error) throw error;
       //: check user logged in 
       
       check_user_logged_in();
      
    });
   
   
  })
 ipcMain.on("open-report", function(event, data){ 
  shell.openExternal("file://"+data)
 })

ipcMain.on("print-to-printer", function(event, data){
  //: create a printing file
  
  fs.writeFile(print_html, data, function (err) {
 // fs.writeFile(__dirname+'/printing.html', data, function (err) {
  if (err) throw err;
  //console.log('Saved!');
  });

  let win = new BrowserWindow({width: 500, height: 600})
  win.loadURL("file://" +print_html);
  //win.loadURL("file://" + __dirname + "/printing.html");
  //win.webContents.send("printPDF", data)
  win.hide()
  win.webContents.on('did-finish-load', () => {
   
   win.webContents.print({marginType: 1}, function(error, data){
        if(error)
        {
          return console.log(error.message)
        }
       
        win = null

        })
      })


})

ipcMain.on("print-to-pdf", function(event, data){
  //const pdfPath = path.join(os.tmpdir(), 'print.pdf')
  
  const pdfPath =  report_folder+"\\"+data.file_name+'.pdf'
 // const pdfPath =  __dirname+'/reports/'+data.file_name+'.pdf'
  var datax = data.h
  //: create a printing file
  fs.writeFile(print_html, data.h, function (err) {
 // fs.writeFile(__dirname+'/printing.html', data.h, function (err) {
  if (err) throw err;
 // console.log('Saved!');
  });

  let win = new BrowserWindow({width: 500, height: 600})
  win.loadURL("file://" +print_html);
  //win.loadURL("file://" + __dirname + "/printing.html");
  win.webContents.send("printPDF", data.h)
  win.hide()
  win.webContents.on('did-finish-load', () => {
   
   win.webContents.printToPDF({silent: true, printBackground: true}, function(error, datax){
        if(error)
        {
          return console.log(error.message)
        }
        fs.writeFile(pdfPath, datax, function(error){
           if(error)
        {
          return console.log(error.message)
        }

       shell.openExternal("file://"+pdfPath)
        event.sender.send("wrote-pdf", pdfPath)
        win = null

        })
      })


  })

    
    //const pdfPath = path.join(os.tmpdir(), "print.pdf")

    //const win = BrowserWindow.fromWebContents(event.sender)

    

      // win.webContents.print({}, function(error, data){
      //   if(error)
      //   {
      //     return console.log(error.message)
      //   }
      //   fs.writeFile(pdfPath, data, function(error){
      //      if(error)
      //   {
      //     return console.log(error.message)
      //   }
      //   shell.openExternal("file://"+pdfPath)
      //   event.sender.send("wrote-pdf", pdfPath)

      //   })
      // })
  })

//: functions
const app_functions = {}
app_functions.quit = function(){
  app.quit()
}
app_functions.nav = function(nav_name){
  mainWindow.webContents.send("nav", nav_name);
}

function createLoadingScreen() {
  loadingScreen = new BrowserWindow(Object.assign(loadingWindowParams, {parent: mainWindow}));
  loadingScreen.loadURL(url.format({
    pathname: path.join(__dirname, "splash.html"),
    protocol: "file",
    slashes: "true"
  }));
  //loadingScreen.loadURL('file://' + __dirname + '/loading.html');
  loadingScreen.on('closed', () => loadingScreen = null);
  loadingScreen.webContents.on('did-finish-load', () => {
  loadingScreen.show();
  });
}

function createLogonScreen() {
  logonScreen = new BrowserWindow(logonWindowParams);
  logonScreen.loadURL(url.format({
    pathname: path.join(__dirname, "logon.html"),
    protocol: "file",
    slashes: "true"
  }));
  //loadingScreen.loadURL('file://' + __dirname + '/loading.html');
  logonScreen.on('closed', () => logonScreen = null);
  logonScreen.webContents.on('did-finish-load', () => {  
  if(loadingScreen){
    loadingScreen.close();
  } 
  logonScreen.show();
  });
}
function createActivateScreen() {
  activateScreen = new BrowserWindow(Object.assign(loadingWindowParams, {parent: mainWindow}));
  activateScreen.loadURL(url.format({
    pathname: path.join(__dirname, "activate.html"),
    protocol: "file",
    slashes: "true"
  }));
  //loadingScreen.loadURL('file://' + __dirname + '/loading.html');
  activateScreen.on('closed', () => loadingScreen = null);
  activateScreen.webContents.on('did-finish-load', () => {
  activateScreen.show();
  });
}
function createSetupScreen() {
  setUpScreen = new BrowserWindow(Object.assign(loadingWindowParams, {parent: mainWindow}));
  setUpScreen.loadURL(url.format({
    pathname: path.join(__dirname, "setup.html"),
    protocol: "file",
    slashes: "true"
  }));
  //loadingScreen.loadURL('file://' + __dirname + '/loading.html');
  setUpScreen.on('closed', () => loadingScreen = null);
  setUpScreen.webContents.on('did-finish-load', () => {
    setUpScreen.show();
  });
}

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
//logout user
function user_logout()
{
  storage.remove('user-logged-in', function(error) {
    if (error) throw error;
    
    if(mainWindow){
      mainWindow.hide();     
      check_user_logged_in();
    }
  });
}

function check_user_logged_in()
{
  
  storage.get('user-logged-in', function(error, data) {

    if (error) throw error;
  
    //mainWindow.webContents.send("user-logged-in", data);
    if(isEmpty(data))
    {
      createLogonScreen();
      
    }else{
      
    if (loadingScreen) {
               
              loadingScreen.close();
            }

            if (logonScreen) {
               
              logonScreen.close();
            }
      mainWindow.webContents.send("reload:app");    
      mainWindow.show();
      mainWindow.maximize();

        
      
    }
    
           
    
  });

}
//: end functions
//: os check
if(process.platform == "darwin")
{
  main_menu.unshift({})
}

//:add dev tools if not in production
//process.env.NODE_ENV = "production";
 if(process.env.NODE_ENV !== "production"){
  menu_template.push({
    label: "Developer Tools",
    submenu:[
      {
        label: "Developer Tools",
        click(item, focusedWindow){
      focusedWindow.toggleDevTools();
    }
      },
      {
        role: "reload"
      }
    ]
    
  })

} 


