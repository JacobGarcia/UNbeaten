    /* 
     * creación de ña base de datos
     */
    function creaDB() {
        db.transaction(creaNuevaDB, errorDB, creaSuccess);
    }

    function creaNuevaDB(tx) {

        tx.executeSql('DROP TABLE IF EXISTS videogame');
        tx.executeSql('DROP TABLE IF EXISTS categoria');

        var sql = "CREATE TABLE IF NOT EXISTS videogame ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "name VARCHAR(120), " +
            "players VARCHAR(3), " +
            "genres VARCHAR(100), " +
            "release_date DATETIME, " +
            "platform VARCHAR(10), " +
            "developer VARCHAR(100), " +
            "time_playing VARCHAR(8), " +
            "complete_time VARCHAR(8), " +
            "notes TEXT, " +
            "rating FLOAT, " +
            "banner VARCHAR(150), " +
            "date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP, " +
            "category VARCHAR(50), " +
            "FOREIGN KEY(category) REFERENCES categoria(name))";

        var categoriaSql = "CREATE TABLE IF NOT EXISTS categoria ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "name VARCHAR(50))";

        tx.executeSql(categoriaSql);
        tx.executeSql(sql);
        
        alert("Both tables have been created");

        tx.executeSql("INSERT INTO categoria (id,name) VALUES (1,'Unbeaten')");
        tx.executeSql("INSERT INTO categoria (id,name) VALUES (2,'Not 100%')");
        tx.executeSql("INSERT INTO categoria (id,name) VALUES (3,'Unplayed')");
        tx.executeSql("INSERT INTO categoria (id,name) VALUES (4,'Unbeatable')");

        tx.executeSql("INSERT INTO videogame (id,name,players,genres,release_date,platform,developer,time_playing,complete_time,notes,rating,banner,category) VALUES (1,'Silent Hills','No','Horror, Puzzle','2014-08-14 00:00:00','PS4','Kojima Productions','00h:00m','01h:39m','Sample Note',5.0,'http://static.giantbomb.com/uploads/scale_large/0/6087/2669677-2669609-2114550608-fropq.jpg','Unbeaten')");

        tx.executeSql("INSERT INTO videogame (id,name,players,genres,release_date,platform,developer,time_playing,complete_time,notes,rating,banner,category) VALUES (2,'Resident Evil','No','Action-Adventure','1996-03-22 00:00:00','PS1','Capcom','00h:00m','06h:37m','Test',4.5,'http://static.giantbomb.com/uploads/scale_large/13/139866/2558376-3273635912-62096.png','Not 100%')");

        tx.executeSql("INSERT INTO videogame (id,name,players,genres,release_date,platform,developer,time_playing,complete_time,notes,rating,banner,category) VALUES (3,'The Witcher 3: Wild Hunt','No','Role-Playing','2015-05-19 00:00:00','PC','CD Projekt RED Sp. z o.o.','00h:00m','43h:37m','Wolf Note',4.5,'http://static.giantbomb.com/uploads/scale_large/25/252703/2759851-2015-06-17_00004.jpg','Unplayed')");

        tx.executeSql("INSERT INTO videogame (id,name,players,genres,release_date,platform,developer,time_playing,complete_time,notes,rating,banner,category) VALUES (4,'Bishi Bashi Special','Yes','Action','1998-12-31 00:00:00','PS1','Konami Computer Entertainment Sapporo Co., Ltd','00h:00m','01h:53m','Japan',-1.0,'http://static.giantbomb.com/uploads/scale_large/0/1220/213448-bishi_bashi_special_front.jpg','Unbeatable')");
        
        alert("All INSERTS are ok");

    }

    function creaSuccess() {
        //window.localStorage.setItem("existeDB", 1);
        cargaDatos();
    }

    function errorDB(err) {
        alert("Error processing SQL " + err.code);
    }

    function cargaDatos() {
        db.transaction(cargaRegistros, errorDB);
        db.transaction(loadCategories, errorDB);
    }

    function cargaRegistros(tx) {
        tx.executeSql('SELECT * FROM videogame;', [], cargaDatosSuccess, errorDB);
    }

    function loadCategories(tx) {
        tx.executeSql('SELECT * FROM categoria;', [], loadCategoriesSuccess, errorDB);
    }

    function cargaDatosSuccess(tx, results) {
        alert("Recieved " + results.rows.length + " from the DB");
        if (results.rows.length == 0) {
            alert("There are no registers in the DB");
        }

        window.readToField(results);
    }

    function loadCategoriesSuccess(tx, results) {
           alert("Recieved " + results.rows.length + " categories from the DB");
           window.setCategories(results.rows);
    }