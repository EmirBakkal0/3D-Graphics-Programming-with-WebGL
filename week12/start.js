let buffers = [];
let pointsArray = [];
let textures = [];
let objectNumber = 0  ; // Automatically incremented for each object
let distanceArray = [];
let centerArray = [];
const predefinedTextures = [
  "https://images.unsplash.com/photo-1531685250784-7569952593d2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1673649934365-6bcbe97ffe77?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519606247872-0440aae9b827?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1585747889842-2990e19cd7ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://cdn.eso.org/images/publicationjpg/2018_04_24_ES_Supernova_VT_Outside-CC.jpg",
];

async function loadFile(file) {
  const text = await file.text();
  const arrayCopy = text.replaceAll('/', ' ').replaceAll('\n', ' ').split(' ');

  const vertices = [[]];
  let licz_vertices = 0;
  const normals = [[]];
  let licz_normals = 0;
  const coords = [[]];
  let licz_coords = 0;
  const triangles = [];
  let licz_triangles = 0;

  for (let i = 0; i < arrayCopy.length - 1; i++) {
    if (arrayCopy[i] === 'v') {
      vertices.push([]);
      vertices[licz_vertices].push(parseFloat(arrayCopy[i + 1]));
      vertices[licz_vertices].push(parseFloat(arrayCopy[i + 2]));
      vertices[licz_vertices].push(parseFloat(arrayCopy[i + 3]));
      i += 3;
      licz_vertices++;
    }

    if (arrayCopy[i] === 'vn') {
      normals.push([]);
      normals[licz_normals].push(parseFloat(arrayCopy[i + 1]));
      normals[licz_normals].push(parseFloat(arrayCopy[i + 2]));
      normals[licz_normals].push(parseFloat(arrayCopy[i + 3]));
      i += 3;
      licz_normals++;
    }

    if (arrayCopy[i] === 'vt') {
      coords.push([]);
      coords[licz_coords].push(parseFloat(arrayCopy[i + 1]));
      coords[licz_coords].push(parseFloat(arrayCopy[i + 2]));
      i += 2;
      licz_coords++;
    }

    if (arrayCopy[i] === 'f') {
      triangles.push([]);
      for (let j = 1; j <= 9; j++) {
        triangles[licz_triangles].push(parseFloat(arrayCopy[i + j]));
      }
      i += 9;
      licz_triangles++;
    }
  }

  let center_tmp=glm.vec3(0, 0, 0);
  centerArray[3]=glm.vec3(0, 0, 3);
  centerArray[4]=glm.vec3(0, 0, 3);


  for (let i = 0; i < vertices.length-1; i++) {
    center_tmp[0] += vertices[i][0];
    center_tmp[1] += vertices[i][1];
    center_tmp[2] += vertices[i][2];
  }
  center_tmp[0] /=(vertices.length-1);
  center_tmp[1] /=(vertices.length-1);
  center_tmp[2] /=(vertices.length-1);
  console.log("center tmp :"+center_tmp);

  let vert_array = [];
  for (let i = 0; i < triangles.length; i++) {
    vert_array.push(vertices[triangles[i][0] - 1][0]);
    vert_array.push(vertices[triangles[i][0] - 1][1]);
    vert_array.push(vertices[triangles[i][0] - 1][2]);
    vert_array.push(normals[triangles[i][2] - 1][0]);
    vert_array.push(normals[triangles[i][2] - 1][1]);
    vert_array.push(normals[triangles[i][2] - 1][2]);
    vert_array.push(coords[triangles[i][1] - 1][0]);
    vert_array.push(coords[triangles[i][1] - 1][1]);

    vert_array.push(vertices[triangles[i][3] - 1][0]);
    vert_array.push(vertices[triangles[i][3] - 1][1]);
    vert_array.push(vertices[triangles[i][3] - 1][2]);
    vert_array.push(normals[triangles[i][5] - 1][0]);
    vert_array.push(normals[triangles[i][5] - 1][1]);
    vert_array.push(normals[triangles[i][5] - 1][2]);
    vert_array.push(coords[triangles[i][4] - 1][0]);
    vert_array.push(coords[triangles[i][4] - 1][1]);

    vert_array.push(vertices[triangles[i][6] - 1][0]);
    vert_array.push(vertices[triangles[i][6] - 1][1]);
    vert_array.push(vertices[triangles[i][6] - 1][2]);
    vert_array.push(normals[triangles[i][8] - 1][0]);
    vert_array.push(normals[triangles[i][8] - 1][1]);
    vert_array.push(normals[triangles[i][8] - 1][2]);
    vert_array.push(coords[triangles[i][7] - 1][0]);
    vert_array.push(coords[triangles[i][7] - 1][1]);
  }

  // Create and bind buffer
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert_array), gl.STATIC_DRAW);

  buffers[objectNumber] = buffer;

  pointsArray[objectNumber] = triangles.length * 3;
  centerArray[objectNumber] = center_tmp;
  console.log("points ="+pointsArray[objectNumber]);
  // distanceArray[objectNumber] = Math.sqrt(
  //   Math.pow(center_tmp[0], 2) +
  //     Math.pow(center_tmp[1], 2) +
  //     Math.pow(center_tmp[2], 2)
  // );
  // Load texture
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 255, 255])
  );

  const image = new Image();
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Flip the texture vertically
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      image
    );
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  };
  image.crossOrigin = "";
  image.src = predefinedTextures[objectNumber % predefinedTextures.length];

  textures[objectNumber] = texture;

  objectNumber++; // Increment object number for the next call
}



let points=32;

let gl;




function start() {
  const canvas = document.getElementById("my_canvas");
  //Inicialize the GL contex
  gl = canvas.getContext("webgl2");
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  canvas.requestPointerLock =
    canvas.requestPointerLock || canvas.mozRequestPointerLock;
  document.exitPointerLock =
    document.exitPointerLock || document.mozExitPointerLock;
  canvas.onclick = function () {
    canvas.requestPointerLock();
  };
  // Hook pointer lock state change events for different browsers
  document.addEventListener("pointerlockchange", lockChangeAlert, false);
  document.addEventListener("mozpointerlockchange", lockChangeAlert, false);
  function lockChangeAlert() {
    if (
      document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas
    ) {
      console.log("The pointer lock status is now locked");
      document.addEventListener("mousemove", set_camera_mouse, false);
    } else {
      console.log("The pointer lock status is now unlocked");
      document.removeEventListener("mousemove", set_camera_mouse, false);
    }
  }
  //****************************************************************

  console.log("WebGL version: " + gl.getParameter(gl.VERSION));
  console.log("GLSL version: " + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
  console.log("Vendor: " + gl.getParameter(gl.VENDOR));

  const vs = gl.createShader(gl.VERTEX_SHADER);
  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  const program = gl.createProgram();

  const vsSource = `#version 300 es
			precision highp float;
			in vec3 position;
			//in vec3 color;
			uniform mat4 model;
			uniform mat4 view;
			uniform mat4 proj;
      in vec2 aTexCoord;
      out vec2 TexCoord;
			
      in vec3 aNormal;
      out vec3 Normal;
      out vec3 FragPos;
      
      //out vec3 Color;

			void main(void)
			{
        TexCoord = aTexCoord;
        Normal = aNormal;
				//Color = color;
			  gl_Position = proj * view * model * vec4(position, 1.0);
        FragPos = vec3(model * vec4(position, 1.0));
			}
			`;

  const fsSource = `#version 300 es
		   precision highp float;
		   in vec3 Color;
       in vec2 TexCoord;
		   out vec4 frag_color;

      in vec3 Normal;
      in vec3 FragPos;

      uniform vec3 camPos;
      uniform vec3 lightPos;
      uniform int fogType; // 0 - linear, 1 - exp, 2 - exp2 ,3- no fog
      uniform float fogDensity; // density of the fog, change this value to adjust the intensity of the fog

       uniform sampler2D texture1;
       uniform sampler2D texture2;
		   void main(void)
	   	{

      
    
      // ambient
      float ambientStrength = 0.1; // change this value to adjust the intensity of the ambient light
      vec3 ambientlightColor = ambientStrength* vec3(1.0,1.0,1.0);
      vec4 ambient = vec4(ambientlightColor,1.0);

       // diffuse 
      float diffuseStrength = 1.0;  
      vec3 diffuselightColor = vec3(1.0,1.0,1.0);
      vec3 norm = normalize(Normal);
      vec3 lightDir = normalize(lightPos - FragPos);
      float diff = max(dot(norm, lightDir), 0.0);
      vec3 diffvec = diff * diffuselightColor*diffuseStrength;
      vec4 diffuse = vec4(diffvec,1.0);

      // specular
      float specularStrength = 1.0;
      vec3 specularlightColor = vec3(1.0,1.0,1.0);
      vec3 viewDir = normalize(camPos - FragPos);
      vec3 reflectDir = reflect(-lightDir, norm);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), 128.0); /// changin the 128 value will determine the size of specular light point on the obj
      vec3 spec_final = specularStrength * spec * specularlightColor;  
      vec4 specular = vec4(spec_final,1.0);

      //distance
      float dist= distance(lightPos,FragPos);
      dist = (20.0-dist)/20.0;
      dist = max(dist, 0.0);

       //fog
        vec4 fogColor = vec4(0.3,0.3,0.3,1.0);
        float distFromCamera= distance(camPos,FragPos);
        float fogFactor;
      
        //float fogDensity = 0.1; // density of the fog, change this value to adjust the intensity of the fog
        // Calculate fog factor based on the type of fog
        // and the distance from the camera to the fragment
        
      switch(fogType)
      {
        case 0:
          //-----linear fog
          float startFog = 0.0;
          float endFog = 15.0;
          fogFactor = smoothstep(startFog, endFog, distFromCamera);
          break;
        case 1:
          //------exp
          fogFactor = exp(-fogDensity * distFromCamera);
          fogFactor = 1.0 - clamp(fogFactor,0.0,1.0);
          break;

        case 2:
          //-----exp2
          #define LOG2 1.442695
          fogFactor = 1.0 - exp2(-fogDensity * fogDensity * distFromCamera * distFromCamera * LOG2); 
          fogFactor = clamp(fogFactor,0.0,1.0);
          break;
          
          case 3:
            //-----no fog
            fogFactor = 0.0; // no fog
            break;
          }

          
          
          
          
          //frag_color = mix(texture(texture1, TexCoord), texture(texture2, TexCoord), 0.5); //old 
          //frag_color = texture(texture1, TexCoord);   no light, no fog
          
          // frag_color = (ambient + dist*diffuse+dist*spec) * texture(texture1, TexCoord);   frag without fog with light
          
          frag_color = mix((ambient + dist*diffuse+dist*spec) *  texture(texture1, TexCoord),fogColor,fogFactor);
          }
			`;

  //compilation vs
  gl.shaderSource(vs, vsSource);
  gl.compileShader(vs);
  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(vs));
  }

  //compilation fs
  gl.shaderSource(fs, fsSource);
  gl.compileShader(fs);
  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(fs));
  }

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert(gl.getProgramInfoLog(program));
  }

  gl.useProgram(program);
   // Add fogType variable and uniform location
  let fogType = 1; // Default fog type
  let fogDensity = 0.1; // Default fog density
  let uniFogType = gl.getUniformLocation(program, "fogType");
  let uniFogDensity = gl.getUniformLocation(program, "fogDensity");
  gl.uniform1i(uniFogType, fogType);
  gl.uniform1f(uniFogDensity, fogDensity);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  var n_draw = 3;
  cube();

  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 8 * 4, 0);

  // const color = gl.getAttribLocation(program, "color");
  // gl.enableVertexAttribArray(color);
  // gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 8 * 4, 3 * 4);

  const normalAttrib= gl.getAttribLocation(program,"aNormal");
  gl.enableVertexAttribArray(normalAttrib)
  gl.vertexAttribPointer(normalAttrib, 3, gl.FLOAT, false, 8 * 4, 3 * 4);
  
  
  const texCoord = gl.getAttribLocation(program, "aTexCoord");
  gl.enableVertexAttribArray(texCoord);
  gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 8 * 4, 6 * 4);

  gl.enable(gl.DEPTH_TEST);

  let yaw = -90; //rotation around the X axis
  let pitch = 0; //rotation around the Y axis

  function set_camera_mouse(e) {
    //Determine the change in mouse position, relative to the last frame
    let xoffset = e.movementX;
    let yoffset = e.movementY;
    let sensitivity = 0.1;
    var cameraSpeed = 0.05 * elapsedTime;
    xoffset *= sensitivity;
    yoffset *= sensitivity;
    //Update the angles
    yaw += xoffset * cameraSpeed;
    pitch -= yoffset * cameraSpeed;
    //Limitations for the camera
    if (pitch > 89.0) pitch = 89.0;
    if (pitch < -89.0) pitch = -89.0;
    //Euler angles
    let front = glm.vec3(1, 1, 1);
    front.x = Math.cos(glm.radians(yaw)) * Math.cos(glm.radians(pitch));
    front.y = Math.sin(glm.radians(pitch));
    front.z = Math.sin(glm.radians(yaw)) * Math.cos(glm.radians(pitch));
    cameraFront = glm.normalize(front);
  }

 


  //***************************************************************

  // Set up the orthographic projection matrix
  function OrthoProjection(_left, _right, _bottom, _top, _near, _far){
    const proj = mat4.create();
    mat4.ortho(proj, _left, _right, _bottom, _top, _near, _far);
    let uniProj = gl.getUniformLocation(program, 'proj');       
    gl.uniformMatrix4fv( uniProj, false, proj);
  }
  


  let counter = 0;
  const fpsElem = document.getElementById("fps");
  const fogTypeElem = document.getElementById("fog-type");
  var fogTypes= ["Linear", "Exponential", "Exponential Squared", "No Fog"];
  const fogElem= document.getElementById("fog-density");
  let startTime = 0;
  let elapsedTime = 0;


 // Load objects



  function draw() {

    fogElem.textContent = fogDensity.toFixed(2);
    fogTypeElem.textContent = fogTypes[fogType] ?? "Unknown";

    elapsedTime = performance.now() - startTime;
    startTime = performance.now();
    counter++;
    var cameraSpeed = 0.05 * elapsedTime;
    let fFps = 1000 / elapsedTime;
    // limit the refresh rate of the text to about 1/second
    if (counter > fFps) {
      fpsElem.textContent = fFps.toFixed(1);
      counter = 0;
    }

    set_camera();

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    // Draw all models
    for (let i = 0; i < buffers.length; i++) {      
      drawModel(i);

    }
     
    //Ortho projection (map window)
    gl.viewport(canvas.width*(3.0/4.0), canvas.height*(3.0/4.0), canvas.width*(1.0/4.0), canvas.height*(1.0/4.0));
    OrthoProjection(-30, 30, -20, 20, -20, 20);
    set_camera_ortho();

    // Draw all models again for the minimap
    for (let i = 0; i < buffers.length; i++) {      
      drawModel(i);
    }

    // Reset viewport and projection for main rendering
    gl.viewport(0, 0, canvas.width, canvas.height);
    // Reset perspective projection
    const proj = mat4.create();
    mat4.perspective(
      proj,
      (60 * Math.PI) / 180,
      canvas.width / canvas.height,
      0.1,
      100
    );
    let uniProj = gl.getUniformLocation(program, "proj");
    gl.uniformMatrix4fv(uniProj, false, proj);

    // Reset main camera
    set_camera();


    window.requestAnimationFrame(draw);



    
  }
  window.requestAnimationFrame(draw);

  const model = mat4.create();
  const kat_obrotu = (0 * Math.PI) / 180; // in radians
  mat4.rotate(model, model, kat_obrotu, [0, 0, 1]);

  let uniModel = gl.getUniformLocation(program, "model");
  gl.uniformMatrix4fv(uniModel, false, model);

  const view = mat4.create();
  mat4.lookAt(view, [0, 0, 3], [0, 0, -1], [0, 1, 0]);
  let uniView = gl.getUniformLocation(program, "view");
  gl.uniformMatrix4fv(uniView, false, view);

  const proj = mat4.create();
  mat4.perspective(
    proj,
    (60 * Math.PI) / 180,
    canvas.width / canvas.height,
    0.1,
    100
  );
  let uniProj = gl.getUniformLocation(program, "proj");
  gl.uniformMatrix4fv(uniProj, false, proj);


  let lightPos= [3,2,5];
  var lightPos_loc=gl.getUniformLocation(program,'lightPos');
  gl.uniform3fv(lightPos_loc,new Float32Array(lightPos));

  var uniCamPos= gl.getUniformLocation(program,'camPos');




  //   // Add the event listeners for mousedown, mousemove, and mouseup
  //   window.addEventListener("mousedown", (e) => {
  //     x = e.offsetX;
  //     y = e.offsetY;
  //     alert("x =" + x + " y =" + y);
  //   });

  ///






  var pressedKey = {};
  window.onkeyup = function (e) {
    pressedKey[e.keyCode] = false;
  };
  window.onkeydown = function (e) {
    pressedKey[e.keyCode] = true;

// Add fog type controls
    if (e.keyCode === 49) { // Key '1'
      fogType = 0; // Linear fog
      gl.uniform1i(uniFogType, fogType);
      console.log("Fog type changed to Linear (0)");
    }
    if (e.keyCode === 50) { // Key '2'
      fogType = 1; // Exponential fog
      gl.uniform1i(uniFogType, fogType);
      console.log("Fog type changed to Exponential (1)");
    }
    if (e.keyCode === 51) { // Key '3'
      fogType = 2; // Exponential squared fog
      gl.uniform1i(uniFogType, fogType);
      console.log("Fog type changed to Exponential Squared (2)");
    }if (e.keyCode === 52) { // Key '4'
      fogType = 3; //no fog
      gl.uniform1i(uniFogType, fogType);
      console.log("Fog type changed to no fog (3)");
    }if (e.keyCode === 69) { // Key 'e'
      gl.uniform1f(uniFogDensity, fogDensity += 0.02);
      console.log("Fog density increased to " + fogDensity);
    }
    if (e.keyCode === 81) { // Key 'q'
      if (fogDensity <= 0.05) {
        fogDensity = 0.01; // Prevent fog density from going below 0.1
        return;
      }
      gl.uniform1f(uniFogDensity, fogDensity -= 0.02);
      console.log("Fog density decreased to " + fogDensity);
    }

  
  

  };

  let cameraPos = glm.vec3(0, 0, 3);
  let cameraFront = glm.vec3(0, 0, -1);
  let cameraUp = glm.vec3(0, 1, 0);
  let angleOfRotation = 0.0;

   function set_camera_ortho() {
    mat4.lookAt(view,[cameraPos.x,15,cameraPos.z],[cameraPos.x,0,cameraPos.z],[cameraFront.x,0,cameraFront.z]);
    gl.uniformMatrix4fv( uniView, false, view);
  }

  

  function set_camera() {
    let camera_speed = 0.002 * elapsedTime;
    if (pressedKey[37]|| pressedKey[65]) {
      //left

      let cameraPos_tmp = glm.normalize(glm.cross(cameraFront, cameraUp));
      cameraPos.x -= cameraPos_tmp.x * camera_speed;
      cameraPos.y -= cameraPos_tmp.y * camera_speed;
      cameraPos.z -= cameraPos_tmp.z * camera_speed;
    }
    if (pressedKey[38]|| pressedKey[87]) {
      //up
      cameraPos.x += camera_speed * cameraFront.x;
      cameraPos.y += camera_speed * cameraFront.y;
      cameraPos.z += camera_speed * cameraFront.z;
    }
    if (pressedKey[39]|| pressedKey[68]) {
      //right
      let cameraPos_tmp = glm.normalize(glm.cross(cameraFront, cameraUp));
      cameraPos.x += cameraPos_tmp.x * camera_speed;
      cameraPos.y += cameraPos_tmp.y * camera_speed;
      cameraPos.z += cameraPos_tmp.z * camera_speed;
    }
    if (pressedKey[40]|| pressedKey[83]) {
      //down
      cameraPos.x -= camera_speed * cameraFront.x;
      cameraPos.y -= camera_speed * cameraFront.y;
      cameraPos.z -= camera_speed * cameraFront.z;
    }

    let cameraFront_tmp = glm.vec3(1, 1, 1);
    cameraFront_tmp.x = cameraPos.x + cameraFront.x;
    cameraFront_tmp.y = cameraPos.y + cameraFront.y;
    cameraFront_tmp.z = cameraPos.z + cameraFront.z;

    let cameraPosTmp=[cameraPos.x,cameraPos.y,cameraPos.z];
    gl.uniform3fv(uniCamPos,new Float32Array(cameraPosTmp));

    mat4.lookAt(view, cameraPos, cameraFront_tmp, cameraUp);
    gl.uniformMatrix4fv(uniView, false, view);
  }

  function cube() {
    let punkty_ = 36;

    var vertices = [
      // Front face
      -0.5, -0.5,  0.5,  1.0, 0.0, 0.0,  0.0, 0.0, 
       0.5, -0.5,  0.5,  1.0, 0.0, 1.0,  1.0, 0.0, 
       0.5,  0.5,  0.5,  1.0, 1.0, 1.0,  1.0, 1.0, 
       0.5,  0.5,  0.5,  1.0, 1.0, 1.0,  1.0, 1.0, 
      -0.5,  0.5,  0.5,  1.0, 1.0, 0.0,  0.0, 1.0, 
      -0.5, -0.5,  0.5,  1.0, 0.0, 0.0,  0.0, 0.0,
    
      // Back face
      -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,  0.0, 0.0, 
       0.5, -0.5, -0.5,  0.0, 0.0, 1.0,  1.0, 0.0, 
       0.5,  0.5, -0.5,  0.0, 1.0, 1.0,  1.0, 1.0, 
       0.5,  0.5, -0.5,  0.0, 1.0, 1.0,  1.0, 1.0, 
      -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,  0.0, 1.0, 
      -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,  0.0, 0.0,
    
      // Left face
      -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,  0.0, 0.0, 
      -0.5, -0.5,  0.5,  0.0, 0.0, 1.0,  1.0, 0.0, 
      -0.5,  0.5,  0.5,  0.0, 1.0, 1.0,  1.0, 1.0, 
      -0.5,  0.5,  0.5,  0.0, 1.0, 1.0,  1.0, 1.0, 
      -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,  0.0, 1.0, 
      -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,  0.0, 0.0,
    
      // Right face
       0.5, -0.5, -0.5,  1.0, 0.0, 0.0,  0.0, 0.0, 
       0.5, -0.5,  0.5,  1.0, 0.0, 1.0,  1.0, 0.0, 
       0.5,  0.5,  0.5,  1.0, 1.0, 1.0,  1.0, 1.0, 
       0.5,  0.5,  0.5,  1.0, 1.0, 1.0,  1.0, 1.0, 
       0.5,  0.5, -0.5,  1.0, 1.0, 0.0,  0.0, 1.0, 
       0.5, -0.5, -0.5,  1.0, 0.0, 0.0,  0.0, 0.0,
    
      // Top face
      -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,  0.0, 0.0, 
       0.5,  0.5, -0.5,  1.0, 1.0, 0.0,  1.0, 0.0, 
       0.5,  0.5,  0.5,  1.0, 1.0, 1.0,  1.0, 1.0, 
       0.5,  0.5,  0.5,  1.0, 1.0, 1.0,  1.0, 1.0, 
      -0.5,  0.5,  0.5,  0.0, 1.0, 1.0,  0.0, 1.0, 
      -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,  0.0, 0.0,
    
      // Bottom face
      -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,  0.0, 0.0, 
       0.5, -0.5, -0.5,  1.0, 0.0, 0.0,  1.0, 0.0, 
       0.5, -0.5,  0.5,  1.0, 0.0, 1.0,  1.0, 1.0, 
       0.5, -0.5,  0.5,  1.0, 0.0, 1.0,  1.0, 1.0, 
      -0.5, -0.5,  0.5,  0.0, 0.0, 1.0,  0.0, 1.0, 
      -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,  0.0, 0.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    n_draw = punkty_;
  }
  // Drawing function
  function drawModel(objectNumber) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers[objectNumber]);
    VerticesData();
    gl.bindTexture(gl.TEXTURE_2D, textures[objectNumber]);

    

    gl.drawArrays(gl.TRIANGLES, 0, pointsArray[objectNumber]);
    
   
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers[objectNumber]);
    VerticesData();
    gl.bindTexture(gl.TEXTURE_2D, textures[objectNumber]);
    gl.drawArrays(gl.TRIANGLES, 0, pointsArray[objectNumber]);
    
    
    

  }

  function VerticesData() {
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 8 * 4, 0);

   const normalAttrib= gl.getAttribLocation(program,"aNormal");
  gl.enableVertexAttribArray(normalAttrib)
  gl.vertexAttribPointer(normalAttrib, 3, gl.FLOAT, false, 8 * 4, 3 * 4);

    const texCoord = gl.getAttribLocation(program, "aTexCoord");
    gl.enableVertexAttribArray(texCoord);
    gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 8 * 4, 6 * 4);
  }
}
