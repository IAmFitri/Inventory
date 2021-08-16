const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//pengaturan cors
app.options('*', cors())

// MySQL
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'mitsubaInventory'
})

// User Account List
app.get('/allUser', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    connection.query('SELECT * from user', (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
                res.send(rows)
      } else {
        console.log(err)
      }
      // if(err) throw err
      console.log('The data from User table are: \n', rows)
    })
  })
})

// Get User for Login
app.post('/userLogin', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    const { user, pass } = req.body
    connection.query('SELECT * FROM user WHERE username = ? and password = ?', [user, pass], (err, rows) => {
      connection.release() // return the connection to pool
      let result = {};
      if (!err) {
        result = rows[0];
        if (result == undefined) {
          res.send()
        } else {
          res.send(result)
        }
      } else {
        console.log(err)
      }
        
      console.log('The data from User table are: \n', result);
    })
  })
});

//Get User Account by ID
app.get('/getUser/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection to pool
      let result = {};
      if (!err) {
        result = rows[0];
        if (result == undefined) {
          res.send()
        } else {
          res.send(result)
        }
      } else {
        console.log(err)
      }
        
      console.log('The data from User table are: \n', result);
    })
  })
});

// Add a User Account
app.post('/addUser', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    const body = req.body
    connection.query('INSERT INTO user SET ?', body, (err, rows) => {
    connection.release() // return the connection to pool
      if (!err) {
        res.send(`User with the record user: ${body.username} has been added.`)
      } else {
          console.log(err)
      }
      console.log('The data from User table are: \n', rows)
    })
  })
});

// Edit a User Account
app.put('/editUser/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)

    const id = req.params.id;
    const { nik, nama, jabatan, user, pass } = req.body

    connection.query('UPDATE user SET nik = ?, nama = ?, jabatan = ?, username = ?, password = ? WHERE id = ?', [nik, nama, jabatan, user, pass, id], (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
        res.send(`Username "${nama}" has been edited.`)
      } else {
        console.log(err)
      }
    })
    console.log(req.body)
  })
})

// Delete a User Account
app.delete('/delUser/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
        res.send('Data has been deleted!');
      } else {
        console.log(err)
      }    
      console.log('The data from User table are: \n', rows)
    })
  })
});


//Schedule Project List
app.get('/allProject', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    connection.query('SELECT * FROM schedule_project', (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
                res.send(rows)
      } else {
        console.log(err)
      }
      // if(err) throw err
      console.log('The data from Schedule Project table are: \n', rows)
    })
  })
})

//Get Schedule Project by ID
app.get('/getProject/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM schedule_project WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection to pool
      let result = {};
      if (!err) {
        result = rows[0];
        if (result == undefined) {
          res.send()
        } else {
          res.send(result)
        }
      } else {
        console.log(err)
      }
        
      console.log('The data from Schedule Project table are: \n', result);
    })
  })
});

// Add a Schedule Project
app.post('/addProject', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    const body = req.body
    connection.query('INSERT INTO schedule_project SET ?', body, (err, rows) => {
    connection.release() // return the connection to pool
      if (!err) {
        res.send(`Schedule with Order Number: ${body.no_order} has been added.`)
      } else {
          console.log(err)
      }
      console.log('The data from Schedule Project table are: \n', rows)
    })
  })
});

// Edit a Schedule Project
app.put('/editProject/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)

    const id = req.params.id;
    const { order, namaDies, namaPart, type, model, process, tgl_finish } = req.body

    connection.query('UPDATE schedule_project SET no_order = ?, nama_dies = ?, nama_part = ?, type = ?, model = ?, process = ?, tgl_target_finish = ? WHERE id = ?', [order, namaDies, namaPart, type, model, process, tgl_finish, id], (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
        res.send(`No Order "${order}" has been edited.`)
      } else {
        console.log(err)
      }
    })
    console.log(req.body)
  })
})

// Delete a Schedule Project
app.delete('/delProject/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('DELETE FROM schedule_project WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
        res.send('Data has been deleted!');
      } else {
        console.log(err)
      }    
      console.log('The data from Schedule Project table are: \n', rows)
    })
  })
});


//Electrude List
app.get('/allElectrude', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    connection.query('SELECT * FROM data_electrude', (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
                res.send(rows)
      } else {
        console.log(err)
      }
      // if(err) throw err
      console.log('The data from Electrude table are: \n', rows)
    })
  })
})

//Get Electrude by ID
app.get('/getElectrude/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM data_electrude WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection to pool
      let result = {};
      if (!err) {
        result = rows[0];
        if (result == undefined) {
          res.send()
        } else {
          res.send(result)
        }
      } else {
        console.log(err)
      }
        
      console.log('The data from Electrude table are: \n', result);
    })
  })
});

// Add a Electrude
app.post('/addElectrude', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    const body = req.body
    connection.query('INSERT INTO data_electrude SET ?', body, (err, rows) => {
    connection.release() // return the connection to pool
      if (!err) {
        res.send(`Data Electrude with Order Number: ${body.no_order} has been added.`)
      } else {
          console.log(err)
      }
      console.log('The data from Electrude table are: \n', rows)
    })
  })
});

// Edit a Electrude
app.put('/editElectrude/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)

    const id = req.params.id;
    const { order, namaDies, namaElectrude, type, model, tglSimpan, no_rak } = req.body

    connection.query('UPDATE data_electrude SET no_order = ?, nama_dies = ?, nama_electrude = ?, type = ?, model = ?, tgl_disimpan_rak = ?, no_rak = ? WHERE id = ?', [order, namaDies, namaElectrude, type, model, tglSimpan, no_rak, id], (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
        res.send(`No Order "${order}" has been edited.`)
      } else {
        console.log(err)
      }
    })
    console.log(req.body)
  })
})

// Delete a Electrude
app.delete('/delElectrude/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('DELETE FROM data_electrude WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
        res.send('Data has been deleted!');
      } else {
        console.log(err)
      }    
      console.log('The data from Electrude table are: \n', rows)
    })
  })
});


//Rak List
app.get('/allRak', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    connection.query('SELECT * FROM data_rak_electrude', (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
                res.send(rows)
      } else {
        console.log(err)
      }
      // if(err) throw err
      console.log('The data from Rak Electrude table are: \n', rows)
    })
  })
})

//Get Rak by ID
app.get('/getRak/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM data_rak_electrude WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection to pool
      let result = {};
      if (!err) {
        result = rows[0];
        if (result == undefined) {
          res.send()
        } else {
          res.send(result)
        }
      } else {
        console.log(err)
      }
        
      console.log('The data from Rak Electrude table are: \n', result);
    })
  })
});

// Add a Rak
app.post('/addRak', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    const body = req.body
    connection.query('INSERT INTO data_rak_electrude SET ?', body, (err, rows) => {
    connection.release() // return the connection to pool
      if (!err) {
        res.send(`Data Rak with Order Number: ${body.no_order} has been added.`)
      } else {
          console.log(err)
      }
      console.log('The data from Rak Electrude table are: \n', rows)
    })
  })
});

// Edit a Rak
app.put('/editRak/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)

    const id = req.params.id;
    const { order, namaDies, namaElectrude, penanggung, update, type, no_rak, model } = req.body

    connection.query('UPDATE data_rak_electrude SET no_order = ?, nama_dies = ?, nama_electrude = ?, penanggung_jawab = ?, last_update = ?, type = ?, no_rak_electrude = ?, model = ? WHERE id = ?', [order, namaDies, namaElectrude, penanggung, update, type, no_rak, model, id], (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
        res.send(`No Order "${order}" has been edited.`)
      } else {
        console.log(err)
      }
    })
    console.log(req.body)
  })
})

// Delete a Rak
app.delete('/delRak/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('DELETE FROM data_rak_electrude WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
        res.send('Data has been deleted!');
      } else {
        console.log(err)
      }    
      console.log('The data from Rak Electrude table are: \n', rows)
    })
  })
});


//Pengambilan List
app.get('/allPengambilan', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    connection.query('SELECT * FROM pengambilan', (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
                res.send(rows)
      } else {
        console.log(err)
      }
      // if(err) throw err
      console.log('The data from Pengambilan table are: \n', rows)
    })
  })
})

//Get Pengambilan by ID
app.get('/getPengambilan/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM pengambilan WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection to pool
      let result = {};
      if (!err) {
        result = rows[0];
        if (result == undefined) {
          res.send()
        } else {
          res.send(result)
        }
      } else {
        console.log(err)
      }
        
      console.log('The data from Pengambilan table are: \n', result);
    })
  })
});

// Add a Pengambilan
app.post('/addPengambilan', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    const body = req.body
    connection.query('INSERT INTO pengambilan SET ?', body, (err, rows) => {
    connection.release() // return the connection to pool
      if (!err) {
        res.send(`Data Pengambilan with Order Number: ${body.no_order} has been added.`)
      } else {
          console.log(err)
      }
      console.log('The data from Pengambilan table are: \n', rows)
    })
  })
});

// Edit a Pengambilan
app.put('/editPengambilan/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)

    const id = req.params.id;
    const { order, namaDies, namaElectrude, type, model, tglPengambilan, no_rak, penanggung } = req.body

    connection.query('UPDATE pengambilan SET no_order = ?, nama_dies = ?, nama_electrude = ?, type = ?, model = ?, tgl_pengambilan = ?, no_rak = ?, penanggung_jawab = ?  WHERE id = ?', [order, namaDies, namaElectrude, type, model, tglPengambilan, no_rak, penanggung, id], (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
        res.send(`No Order "${order}" has been edited.`)
      } else {
        console.log(err)
      }
    })
    console.log(req.body)
  })
})

// Delete a Pengambilan
app.delete('/delPengambilan/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('DELETE FROM pengambilan WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
        res.send('Data has been deleted!');
      } else {
        console.log(err)
      }    
      console.log('The data from Pengambilan table are: \n', rows)
    })
  })
});


//Pengembalian List
app.get('/allPengembalian', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('connected as id ' + connection.threadId)
    connection.query('SELECT * FROM pengembalian', (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
                res.send(rows)
      } else {
        console.log(err)
      }
      // if(err) throw err
      console.log('The data from pengembalian table are: \n', rows)
    })
  })
})

//Get Pengembalian by ID
app.get('/getPengembalian/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM pengembalian WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection to pool
      let result = {};
      if (!err) {
        result = rows[0];
        if (result == undefined) {
          res.send()
        } else {
          res.send(result)
        }
      } else {
        console.log(err)
      }
        
      console.log('The data from Pengembalian table are: \n', result);
    })
  })
});

// Add a Pengembalian
app.post('/addPengembalian', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    const body = req.body
    connection.query('INSERT INTO pengembalian SET ?', body, (err, rows) => {
    connection.release() // return the connection to pool
      if (!err) {
        res.send(`Data Pengembalian with Order Number: ${body.no_order} has been added.`)
      } else {
          console.log(err)
      }
      console.log('The data from Pengembalian table are: \n', rows)
    })
  })
});

// Edit a Pengembalian
app.put('/editPengembalian/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)

    const id = req.params.id;
    const { order, namaDies, namaElectrude, type, model, tglPengembalian, no_rak, penanggung } = req.body

    connection.query('UPDATE pengembalian SET no_order = ?, nama_dies = ?, nama_electrude = ?, type = ?, model = ?, tgl_pengembalian = ?, no_rak = ?, penanggung_jawab = ?  WHERE id = ?', [order, namaDies, namaElectrude, type, model, tglPengembalian, no_rak, penanggung, id], (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
        res.send(`No Order "${order}" has been edited.`)
      } else {
        console.log(err)
      }
    })
    console.log(req.body)
  })
})

// Delete a Pengembalian
app.delete('/delPengembalian/:id', cors(), (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('DELETE FROM pengembalian WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release() // return the connection to pool
      if (!err) {
        res.send('Data has been deleted!');
      } else {
        console.log(err)
      }    
      console.log('The data from Pengembalian table are: \n', rows)
    })
  })
});
// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listening on port ${port}`))