Armes = function(Player) {
    // On permet d'accéder à Player n'importe où dans Armes
    this.Player = Player;

    // Positions selon l'arme utilisée
    this.bottomPosition = new BABYLON.Vector3(0.5, 10, 1);

    // Changement de Y quand l'arme est séléctionnée
    this.topPositionY = -0.7;

    // Créons notre arme
    this.rocketLauncher = this.newArme(Player);

    /// Definition de toutes les variables necessaires aux tirs
    // Cadence de tir
    this.fireRate = 100;

    // Delta de calcul pour savoir quand le tir est a nouveau disponible
    this._deltaFireRate = this.fireRate;

    // Variable qui va changer selon le temps
    this.canFire = true;

    // Variable qui changera à l'appel du tir depuis le Player
    this.launchBullets = false;

    // _this va nous permettre d'acceder à l'objet depuis des fonctions que nous utiliserons plus tard
    var _this = this;

    // Engine va nous être utile pour la cadence de tir
    var engine = Player.game.scene.getEngine();

    Player.game.scene.registerBeforeRender(function() {
        if (!_this.canFire) {
            _this._deltaFireRate -= engine.getDeltaTime();
            if (_this._deltaFireRate <= 0 && _this.Player.isAlive) {
                _this.canFire = true;
                _this._deltaFireRate = _this.fireRate;
            }
        }
    });
};

Armes.prototype = {
    newArme: function(Player) {
        var newArme;
        newArme = BABYLON.Mesh.CreateBox('rocketLauncher', 0.5, Player.game.scene);

        // Nous faisons en sorte d'avoir une arme d'apparence plus longue que large
        newArme.scaling = new BABYLON.Vector3(1, 0.7, 2);

        // On l'associe à la caméra pour qu'il bouge de la même facon
        newArme.parent = Player.camera;

        // On positionne le mesh APRES l'avoir attaché à la caméra
        newArme.position = this.bottomPosition.clone();
        newArme.position.y = this.topPositionY;

        // Ajoutons un material Rouge pour le rendre plus visible
        var materialArme = new BABYLON.StandardMaterial("rocketLauncherMat", Player.game.scene);
        materialArme.diffuseTexture = new BABYLON.Texture("assets/images/arme.jpg", Player.game.scene);
        materialArme.diffuseTexture.uScale = 4.0;
        materialArme.diffuseTexture.vScale = 4.0;

        newArme.material = materialArme;

        return newArme
    },
    fire: function() {
        this.launchBullets = true;
    },
    stopFire: function() {
        this.launchBullets = false;
    },
    launchFire: function() {
        if (this.canFire) {
            var renderWidth = this.Player.game.engine.getRenderWidth(true);
            var renderHeight = this.Player.game.engine.getRenderHeight(true);

            var direction = this.Player.game.scene.pick(renderWidth / 2, renderHeight / 2);
            direction = direction.pickedPoint.subtractInPlace(this.Player.camera.position);
            direction = direction.normalize();

            this.createRocket(this.Player.camera, direction)
            this.canFire = false;
        } else {
            // Nothing to do : cannot fire
        }
    },
    createRocket: function(playerPosition, direction) {
        var positionValue = this.rocketLauncher.absolutePosition.clone();
        var rotationValue = playerPosition.rotation;
        var newRocket = BABYLON.Mesh.CreateBox("rocket", 1, this.Player.game.scene);
        var Player = this.Player;
        newRocket.direction = new BABYLON.Vector3(
            Math.sin(rotationValue.y) * Math.cos(rotationValue.x),
            Math.sin(-rotationValue.x),
            Math.cos(rotationValue.y) * Math.cos(rotationValue.x)
        )
        newRocket.position = new BABYLON.Vector3(
            positionValue.x + (newRocket.direction.x * 1),
            positionValue.y + (newRocket.direction.y * 1),
            positionValue.z + (newRocket.direction.z * 1));
        newRocket.rotation = new BABYLON.Vector3(rotationValue.x, rotationValue.y, rotationValue.z);
        newRocket.scaling = new BABYLON.Vector3(0.5, 0.5, 1);
        newRocket.isPickable = false;


        var materialTir = new BABYLON.StandardMaterial("rocketLauncherMat", Player.game.scene);
        materialTir.diffuseTexture = new BABYLON.Texture("assets/images/rockety.jpg", Player.game.scene);
        materialTir.diffuseTexture.uScale = 4.0;
        materialTir.diffuseTexture.vScale = 4.0;
        newRocket.material = materialTir;

        newRocket.registerAfterRender(function() {
            // On bouge la roquette vers l'avant
            newRocket.translate(new BABYLON.Vector3(0, 0, 1), 1, 0);

            // On crée un rayon qui part de la base de la roquette vers l'avant
            var rayRocket = new BABYLON.Ray(newRocket.position, newRocket.direction);

            // On regarde quel est le premier objet qu'on touche
            var meshFound = newRocket.getScene().pickWithRay(rayRocket);

            // Si la distance au premier objet touché est inférieure a 10, on détruit la roquette
            if (!meshFound || meshFound.distance < 10) {
                // On vérifie qu'on a bien touché quelque chose
                if (meshFound.pickedMesh) {
                    // On crée une sphere qui représentera la zone d'impact
                    var explosionRadius = BABYLON.Mesh.CreateSphere("sphere", 5.0, 20, Player.game.scene);
                    // On positionne la sphère là où il y a eu impact
                    explosionRadius.position = meshFound.pickedPoint;
                    // On fait en sorte que les explosions ne soient pas considérées pour le Ray de la roquette
                    explosionRadius.isPickable = false;
                    // On crée un petit material orange
                    explosionRadius.material = new BABYLON.StandardMaterial("textureExplosion", Player.game.scene);
                    explosionRadius.material.diffuseTexture = new BABYLON.Texture("assets/images/explosion.jpg", Player.game.scene);
                    explosionRadius.material.diffuseTexture.uScale = 4.0;
                    explosionRadius.material.diffuseTexture.vScale = 4.0;
                    explosionRadius.material.specularColor = new BABYLON.Color3(0, 0, 0);
                    explosionRadius.material.alpha = 0.8;

                    // Chaque frame, on baisse l'opacité et on efface l'objet quand l'alpha est arrivé à 0
                    explosionRadius.registerAfterRender(function() {
                        explosionRadius.material.alpha -= 0.02;
                        if (explosionRadius.material.alpha <= 0) {
                            explosionRadius.dispose();
                        }
                    });
                }
                newRocket.dispose();
            }

        })
    },

};