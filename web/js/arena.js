Arena = function(game) {
    // Appel des variables nécéssaires
    this.game = game;
    var scene = game.scene;

    // Création de notre lumière principale
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Créons une sphère 
    //var sphere = BABYLON.Mesh.CreateSphere("sphere1", 32, 2, scene);

    // Creation de cube


    // Remontons le sur l'axe y de la moitié de sa hauteur
    //sphere.position.y = 1;

    // Material pour le sol
    var materialGround = new BABYLON.StandardMaterial("groundTexture", scene);
    materialGround.diffuseTexture = new BABYLON.Texture("assets/images/groundPebble.jpg", scene);
    materialGround.diffuseTexture.uScale = 4.0;
    materialGround.diffuseTexture.vScale = 4.0;

    // Material pour les 4 colonnes en bois
    var materialColonne = new BABYLON.StandardMaterial("groundTexture", scene);
    materialColonne.diffuseTexture = new BABYLON.Texture("assets/images/wood.jpg", scene);
    materialColonne.diffuseTexture.uScale = 4.0;
    materialColonne.diffuseTexture.vScale = 4.0;

    var materialSphere = new BABYLON.StandardMaterial("spheretexture", scene);
    materialSphere.diffuseTexture = new BABYLON.Texture("assets/images/cible.jpg", scene);
    materialSphere.diffuseTexture.uScale = 4.0;
    materialSphere.diffuseTexture.vScale = 4.0;

    // Material pour le cylindre
    var materialCyl = new BABYLON.StandardMaterial("groundTexture", scene);
    materialCyl.diffuseTexture = new BABYLON.Texture("assets/images/iron.jpg", scene);
    materialCyl.diffuseTexture.uScale = 4.0;
    materialCyl.diffuseTexture.vScale = 4.0;

    var mainBox = BABYLON.Mesh.CreateBox("box1", 3, scene);
    mainBox.scaling.y = 1;
    mainBox.position = new BABYLON.Vector3(5, ((3 / 2) * mainBox.scaling.y), 5);
    mainBox.rotation.y = (Math.PI * 45) / 180;
    mainBox.material = materialColonne;
    mainBox.checkCollisions = true;
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 32, 5, scene);
    sphere.position = new BABYLON.Vector3(5, ((3 / 2) * (mainBox.scaling.y + 7)), 5);
    sphere.material = materialSphere;


    var mainBox2 = mainBox.clone("box2");
    mainBox2.scaling.y = 2;
    mainBox2.position = new BABYLON.Vector3(5, ((3 / 2) * mainBox2.scaling.y), -5);
    mainBox2.checkCollisions = true;
    var sphere2 = BABYLON.Mesh.CreateSphere("sphere2", 32, 5, scene);
    sphere2.position = new BABYLON.Vector3(5, ((3 / 2) * (mainBox2.scaling.y + 7)), -5);
    sphere2.material = materialSphere;

    var mainBox3 = mainBox.clone("box3");
    mainBox3.scaling.y = 3;
    mainBox3.position = new BABYLON.Vector3(-5, ((3 / 2) * mainBox3.scaling.y), -5);
    mainBox3.checkCollisions = true;
    var sphere3 = BABYLON.Mesh.CreateSphere("sphere3", 32, 5, scene);
    sphere3.position = new BABYLON.Vector3(-5, ((3 / 2) * (mainBox2.scaling.y + 9)), -5);
    sphere3.material = materialSphere;

    var mainBox4 = mainBox.clone("box4");
    mainBox4.scaling.y = 4;
    mainBox4.position = new BABYLON.Vector3(-5, ((3 / 2) * mainBox4.scaling.y), 5);
    mainBox4.checkCollisions = true;
    var sphere4 = BABYLON.Mesh.CreateSphere("sphere4", 32, 5, scene);
    sphere4.position = new BABYLON.Vector3(-5, ((3 / 2) * (mainBox4.scaling.y + 9)), 5);
    sphere4.material = materialSphere;

    var cylinder = BABYLON.Mesh.CreateCylinder("cyl1", 20, 5, 5, 20, 4, scene);
    cylinder.position.y = 20 / 2;
    cylinder.material = materialCyl;
    cylinder.checkCollisions = true;

    var boxArena = BABYLON.Mesh.CreateBox("boxArena", 100, scene, false, BABYLON.Mesh.BACKSIDE);
    boxArena.material = materialGround;
    boxArena.position.y = 50 * 0.3;
    boxArena.scaling.y = 0.3;
    boxArena.scaling.z = 0.8;
    boxArena.scaling.x = 3.5;
    boxArena.checkCollisions = true;

};


// Arena = function(game) {
//     // Appel des variables nécéssaires
//     this.game = game;
//     var scene = game.scene;

//     // Création de notre lumière principale
//     var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 10, 0), scene);
//     var light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, -1, 0), scene);
//     light2.intensity = 0.8;

//     // Material pour le sol
//     var materialGround = new BABYLON.StandardMaterial("wallTexture", scene);
//     materialGround.diffuseTexture = new BABYLON.Texture("assets/images/mur.jpg", scene);
//     materialGround.diffuseTexture.uScale = 8.0;
//     materialGround.diffuseTexture.vScale = 8.0;

//     // Material pour les objets
//     var materialWall = new BABYLON.StandardMaterial("groundTexture", scene);
//     materialWall.diffuseTexture = new BABYLON.Texture("assets/images/pilone.jpg", scene);

//     var boxArena = BABYLON.Mesh.CreateBox("box1", 100, scene, false, BABYLON.Mesh.BACKSIDE);
//     boxArena.material = materialGround;
//     boxArena.position.y = 50 * 0.3;
//     boxArena.scaling.y = 0.3;
//     boxArena.scaling.z = 0.8;
//     boxArena.scaling.x = 3.5;

//     var columns = [];
//     var numberColumn = 6;
//     var sizeArena = 100 * boxArena.scaling.x - 50;
//     var ratio = ((100 / numberColumn) / 100) * sizeArena;
//     for (var i = 0; i <= 1; i++) {
//         if (numberColumn > 0) {
//             columns[i] = [];
//             let mainCylinder = BABYLON.Mesh.CreateCylinder("cyl0-" + i, 30, 5, 5, 20, 4, scene);
//             mainCylinder.position = new BABYLON.Vector3(-sizeArena / 2, 30 / 2, -20 + (40 * i));
//             mainCylinder.material = materialWall;
//             columns[i].push(mainCylinder);

//             if (numberColumn > 1) {
//                 for (let y = 1; y <= numberColumn - 1; y++) {
//                     let newCylinder = columns[i][0].clone("cyl" + y + "-" + i);
//                     newCylinder.position = new BABYLON.Vector3(-(sizeArena / 2) + (ratio * y), 30 / 2, columns[i][0].position.z);
//                     columns[i].push(newCylinder);
//                 }
//             }
//         }
//     }
// };