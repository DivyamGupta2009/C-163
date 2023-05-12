AFRAME.registerComponent("paintball", {
    init: function(){
        this.shootPaintball();
    },

    shootPaintball: function(){
        window.addEventListener("keydown", (e) => {
            if(e.key == "z"){
                var paintball = document.createElement("a-entity")
                paintball.setAttribute("geometry", {
                    primitive: 'sphere',
                    radius: "0.1"
                })

                paintball.setAttribute("material", "color", "blue")
                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")
                paintball.setAttribute("position", {
                    x: pos.x,
                    y: pos.y,
                    z: pos.z
                })

                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)
                paintball.setAttribute("velocity", direction.multiplyScalar(-10))
                var scene = document.querySelector("#scene");

                paintball.setAttribute("dynamic-body", {
                    shape: "sphere",
                    mass: 0
                })

                paintball.setAttribute("visible", false)
                paintball.addEventListener("collide", this.removePaintball)
                scene.appendChild(paintball)
                this.shootSound()
            }
        })
    },

    removePaintball: function(e){
        var scene = document.querySelector("#scene")
        var element = e.detail.target.el;
        var elementHit = e.detail.body.el

        var paintSplash = document.createElement("a-entity")
        var pos = element.getAttribute("position")
        var rotate = elementHit.getAttribute("rotation")

        paintSplash.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z
        });

        paintSplash.setAttribute("rotation", {
            x: rotate.x,
            y: rotate.y,
            z: rotate.z
        });

        paintSplash.setAttribute("scale", {
            x: 2,
            y: 2,
            z: 2
        });

        var colorNum = parseInt(Math.random() * 8 + 1)
        paintSplash.setAttribute("material", {
            opacity: 1,
            transparent: true,
            src: "./images/paint splash-0" + colorNum + ".png"
        })

        paintSplash.setAttribute("geometry", {
            primitive: "plane",
            width: 0.5,
            height: 0.5
          });

          scene.appendChild(paintSplash)
          element.removeEventListener("collide", this.removePaintball);    
          scene.removeChild(element);
    },

    shootSound: function(){
        var entity = document.querySelector("#sound1")
        entity.components.sound.playSound()
    }
})