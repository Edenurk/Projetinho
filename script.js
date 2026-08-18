// ========================================
// CONFIGURAÇÃO DA CENA
// ========================================

const container = document.getElementById("canvas-container");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x111827);


// ========================================
// CÂMERA ORTOGRÁFICA
// ========================================

const camera = new THREE.OrthographicCamera(
    -6,
    6,
    6,
    -6,
    0.1,
    100
);

camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);


// ========================================
// RENDERIZADOR
// ========================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(renderer.domElement);


// ========================================
// ILUMINAÇÃO
// ========================================

const luzAmbiente = new THREE.AmbientLight(
    0xffffff,
    0.7
);

scene.add(luzAmbiente);


const luzDirecional = new THREE.DirectionalLight(
    0xffffff,
    1
);

luzDirecional.position.set(5, 10, 5);

scene.add(luzDirecional);


// ========================================
// OBJETO ATUAL
// ========================================

let objetoAtual = null;


// ========================================
// FUNÇÃO PARA REMOVER OBJETO
// ========================================

function removerObjeto() {

    if (objetoAtual !== null) {

        scene.remove(objetoAtual);

        objetoAtual.geometry.dispose();

        objetoAtual.material.dispose();

        objetoAtual = null;
    }
}


// ========================================
// FUNÇÃO PARA CRIAR OBJETO
// ========================================

function criarObjeto(tipo) {

    removerObjeto();

    let geometria;


    if (tipo === "cubo") {

        geometria = new THREE.BoxGeometry(
            3,
            3,
            3
        );

    }


    else if (tipo === "esfera") {

        geometria = new THREE.SphereGeometry(
            2,
            32,
            32
        );

    }


    else if (tipo === "cone") {

        geometria = new THREE.ConeGeometry(
            2,
            4,
            32
        );

    }


    else if (tipo === "cilindro") {

        geometria = new THREE.CylinderGeometry(
            2,
            2,
            4,
            32
        );

    }


    else if (tipo === "toro") {

        geometria = new THREE.TorusGeometry(
            2,
            0.7,
            16,
            32
        );

    }


    else if (tipo === "prisma") {

        const forma = new THREE.Shape();

        forma.moveTo(-2, -1.5);
        forma.lineTo(2, -1.5);
        forma.lineTo(0, 2);
        forma.lineTo(-2, -1.5);

        geometria = new THREE.ExtrudeGeometry(
            forma,
            {
                depth: 3,
                bevelEnabled: false
            }
        );

        geometria.center();
    }


    const material = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.1,
        roughness: 0.5
    });


    objetoAtual = new THREE.Mesh(
        geometria,
        material
    );


    scene.add(objetoAtual);
}


// ========================================
// VISTAS
// ========================================

function vista3D() {

    camera.position.set(
        7,
        7,
        7
    );

    camera.lookAt(0, 0, 0);
}


function vistaFrontal() {

    camera.position.set(
        0,
        0,
        10
    );

    camera.lookAt(0, 0, 0);
}


function vistaSuperior() {

    camera.position.set(
        0,
        10,
        0
    );

    camera.lookAt(0, 0, 0);
}


function vistaLateral() {

    camera.position.set(
        10,
        0,
        0
    );

    camera.lookAt(0, 0, 0);
}


// ========================================
// BOTÕES DOS OBJETOS
// ========================================

document.getElementById("cubo")
    .addEventListener("click", function () {

        criarObjeto("cubo");

    });


document.getElementById("esfera")
    .addEventListener("click", function () {

        criarObjeto("esfera");

    });


document.getElementById("cone")
    .addEventListener("click", function () {

        criarObjeto("cone");

    });


document.getElementById("cilindro")
    .addEventListener("click", function () {

        criarObjeto("cilindro");

    });


document.getElementById("toro")
    .addEventListener("click", function () {

        criarObjeto("toro");

    });


document.getElementById("prisma")
    .addEventListener("click", function () {

        criarObjeto("prisma");

    });


// ========================================
// BOTÕES DAS VISTAS
// ========================================

document.getElementById("vista3d")
    .addEventListener("click", vista3D);


document.getElementById("frontal")
    .addEventListener("click", vistaFrontal);


document.getElementById("superior")
    .addEventListener("click", vistaSuperior);


document.getElementById("lateral")
    .addEventListener("click", vistaLateral);


// ========================================
// OBJETO INICIAL
// ========================================

criarObjeto("cubo");


// ========================================
// ANIMAÇÃO
// ========================================

function animar() {

    requestAnimationFrame(animar);

    if (objetoAtual !== null) {

        objetoAtual.rotation.y += 0.005;

    }

    renderer.render(
        scene,
        camera
    );
}

animar();


// ========================================
// REDIMENSIONAMENTO
// ========================================

window.addEventListener(
    "resize",
    function () {

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

    }
);