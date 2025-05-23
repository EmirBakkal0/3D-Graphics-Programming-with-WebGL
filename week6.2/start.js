function start() {
	const canvas = document.getElementById("my_canvas");


//Inicialize the GL contex
	const gl = canvas.getContext("webgl2");
	if (gl === null) {
	alert("Unable to initialize WebGL. Your browser or machine may not support it.");
	return;

	
}
	//*****************pointer lock object forking for cross browser*************
	canvas.requestPointerLock = canvas.requestPointerLock ||
	canvas.mozRequestPointerLock;
	document.exitPointerLock = document.exitPointerLock ||
	document.mozExitPointerLock;
	canvas.onclick = function() {
	canvas.requestPointerLock();
	};
	// Hook pointer lock state change events for different browsers
	document.addEventListener('pointerlockchange', lockChangeAlert, false);
	document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
	
	function lockChangeAlert() {
	if (document.pointerLockElement === canvas ||
	document.mozPointerLockElement === canvas) {
	console.log('The pointer lock status is now locked');
	document.addEventListener("mousemove", set_camera_mouse, false);
	
	} else {
	console.log('The pointer lock status is now unlocked');  
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

	const vsSource = 
			`#version 300 es
			precision highp float;
			in vec3 position;
			in vec3 color;
			uniform mat4 model;
			uniform mat4 view;
			uniform mat4 proj;
			in vec2 aTexCoord;
			out vec2 TexCoord;
			out vec3 Color;
			void main(void)
			{
			TexCoord = aTexCoord;
			Color = color;
			gl_Position = proj * view * model * vec4(position, 1.0);
			}`;
   

			const fsSource = 
			`#version 300 es
		   precision highp float;
		   in vec3 Color;
		   out vec4 frag_color;
		   in vec2 TexCoord;
		   	uniform sampler2D texture1;
			uniform sampler2D texture2;
		   void main(void)
	   	{
		   //frag_color = texture(texture1, TexCoord);
		   	frag_color = mix(texture(texture1, TexCoord),texture(texture2, TexCoord),0.5) ;
	   	}
			`;


//compilation vs
		gl.shaderSource(vs, vsSource);		
		gl.compileShader(vs);
		if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
                {
                    alert(gl.getShaderInfoLog(vs));
                }

//compilation fs
		gl.shaderSource(fs, fsSource);     
		gl.compileShader(fs);
		if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
                {
                    alert(gl.getShaderInfoLog(fs));
                }

	gl.attachShader(program,vs);
	gl.attachShader(program,fs);
	gl.linkProgram(program);

	if(!gl.getProgramParameter(program, gl.LINK_STATUS))
	{
		alert(gl.getProgramInfoLog(program));
	}

   gl.useProgram(program);

   function kostka() {

	let punkty_ = 36;

	var vertices = [
		-0.5, -0.5, -0.5,  0.0, 0.0, 0.0,  0.0, 0.0,
		0.5, -0.5, -0.5,  0.0, 0.0, 1.0,  1.0, 0.0,
		0.5,  0.5, -0.5,  0.0, 1.0, 1.0,  1.0, 1.0,
		0.5,  0.5, -0.5,  0.0, 1.0, 1.0,  1.0, 1.0,
	   -0.5,  0.5, -0.5,  0.0, 1.0, 0.0,  0.0, 1.0,
	   -0.5, -0.5, -0.5,  0.0, 0.0, 0.0,  0.0, 0.0,

	-0.5, -0.5,  0.5,  0.0, 0.0, 0.0,	0.0, 0.0,
	 0.5, -0.5,  0.5,  1.0, 0.0, 1.0,	1.0, 0.0,
	 0.5,  0.5,  0.5,  1.0, 1.0, 1.0,	1.0, 1.0,
	 0.5,  0.5,  0.5,  1.0, 1.0, 1.0,	1.0, 1.0,
	-0.5,  0.5,  0.5,  0.0, 1.0, 0.0,	0.0, 1.0,
	-0.5, -0.5,  0.5,  0.0, 0.0, 0.0,	0.0, 0.0,

	-0.5,  0.5,  0.5,  1.0, 0.0, 1.0,	0.0, 0.0,
	-0.5,  0.5, -0.5,  1.0, 1.0, 1.0,	1.0, 0.0,
	-0.5, -0.5, -0.5,  0.0, 1.0, 0.0,	1.0, 1.0,
	-0.5, -0.5, -0.5,  0.0, 1.0, 0.0,	1.0, 1.0,
	-0.5, -0.5,  0.5,  0.0, 0.0, 0.0,	0.0, 1.0,
	-0.5,  0.5,  0.5,  1.0, 0.0, 1.0,	0.0, 0.0,

	 0.5,  0.5,  0.5,  1.0, 0.0, 1.0,	0.0, 0.0,
	 0.5,  0.5, -0.5,  1.0, 1.0, 1.0,	1.0, 0.0,
	 0.5, -0.5, -0.5,  0.0, 1.0, 0.0,	1.0, 1.0,
	 0.5, -0.5, -0.5,  0.0, 1.0, 0.0,	1.0, 1.0,
	 0.5, -0.5,  0.5,  0.0, 0.0, 0.0,	0.0, 1.0,
	 0.5,  0.5,  0.5,  1.0, 0.0, 1.0, 	0.0, 0.0,

	-0.5, -0.5, -0.5,  0.0, 1.0, 0.0,	0.0, 0.0,
	 0.5, -0.5, -0.5,  1.0, 1.0, 1.0,	1.0, 0.0,
	 0.5, -0.5,  0.5,  1.0, 0.0, 1.0,	1.0, 1.0,
	 0.5, -0.5,  0.5,  1.0, 0.0, 1.0,	1.0, 1.0,
	-0.5, -0.5,  0.5,  0.0, 0.0, 0.0,	0.0, 1.0,
	-0.5, -0.5, -0.5,  0.0, 1.0, 0.0,	0.0, 0.0,

	-0.5,  0.5, -0.5,  0.0, 1.0, 0.0,	0.0, 0.0,
	 0.5,  0.5, -0.5,  1.0, 1.0, 1.0,	1.0, 0.0,
	 0.5,  0.5,  0.5,  1.0, 0.0, 1.0,	1.0, 1.0,
	 0.5,  0.5,  0.5,  1.0, 0.0, 1.0,	1.0, 1.0,
	-0.5,  0.5,  0.5,  0.0, 0.0, 0.0,	0.0, 1.0,
	-0.5,  0.5, -0.5,  0.0, 1.0, 0.0,	0.0, 0.0
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	
	n_draw=punkty_;
}
	const model = mat4.create();
	const kat_obrotu = -25 * Math.PI / 180; // in radians
	mat4.rotate(model, model, kat_obrotu, [0, 0, 0]);

	let uniModel = gl.getUniformLocation(program, 'model');
	gl.uniformMatrix4fv( uniModel, false, model);

	const view = mat4.create();
	mat4.lookAt(view, [0,0,3], [0,0,-1], [0,1,0]);
	let uniView = gl.getUniformLocation(program, 'view');
	gl.uniformMatrix4fv( uniView, false, view);

	const proj = mat4.create();
 	mat4.perspective(proj, 60 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1,100.0 );
 	let uniProj = gl.getUniformLocation(program, 'proj');
 	gl.uniformMatrix4fv( uniProj, false, proj);

const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

	var n_draw=3;
	kostka();

	const positionAttrib = gl.getAttribLocation(program, "position");
 	gl.enableVertexAttribArray(positionAttrib);
 	gl.vertexAttribPointer(positionAttrib, 3, gl.FLOAT, false, 8*4, 0);

 	const colorAttrib = gl.getAttribLocation(program, "color");
 	gl.enableVertexAttribArray(colorAttrib);
 	gl.vertexAttribPointer(colorAttrib, 3, gl.FLOAT, false, 8*4, 3*4);

	 const texCoord = gl.getAttribLocation(program, "aTexCoord");
	 gl.enableVertexAttribArray(texCoord);
	 gl.vertexAttribPointer(texCoord, 2, gl.FLOAT, false, 8*4, 6*4);

let counter=0;
const fpsElem = document.getElementById("fps");
let startTime = 0;
let elapsedTime = 0;
let tryb = 0;
let seperation = 0.05;
function draw(){

	elapsedTime = performance.now() - startTime;
	startTime = performance.now(); 
	counter++;
	let fFps = 1000/elapsedTime;
	if(counter >fFps){
		fpsElem.textContent = fFps.toFixed(1);
		counter = 0;
	}
	set_camera();
	gl.clearColor(0, 0, 0, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);

	/*gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture2);
	gl.drawArrays(gl.TRIANGLES, 0, 12);

	gl.bindTexture(gl.TEXTURE_2D, texture1);
	//gl.activeTexture(gl.TEXTURE1);
	gl.drawArrays(gl.TRIANGLES, 12, 24);*/
	window.requestAnimationFrame(draw);

	switch (tryb){

		case 0:
			gl.viewport(0, 0, canvas.width, canvas.height);
			StereoProjection(-6.0, 6.0, -4.8, 4.8, 12.99, -100.0, 0.0, 13, -seperation);

			gl.colorMask(true,false,false,false);
			gl.activeTexture(gl.TEXTURE0);

			gl.bindTexture(gl.TEXTURE_2D, texture2);
			gl.drawArrays(gl.TRIANGLES, 0, 12);
			gl.bindTexture(gl.TEXTURE_2D, texture1);
			gl.drawArrays(gl.TRIANGLES, 12, 24);

			gl.clear(gl.DEPTH_BUFFER_BIT);

			StereoProjection(-6.0, 6.0, -4.8, 4.8, 12.99, -100.0, 0.0, 13, seperation);
			gl.colorMask(false,false,true,false);
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, texture1);
			gl.drawArrays(gl.TRIANGLES, 0, 12);
			gl.bindTexture(gl.TEXTURE_2D, texture2);
			gl.drawArrays(gl.TRIANGLES, 12, 24);
			gl.colorMask(true,true,true,true);
			break;
		case 1:
			gl.viewport(0, 0, canvas.width/2, canvas.height);
			StereoProjection(-6.0, 6.0, -4.8, 4.8, 12.99, -100.0, 0.0, 13, -seperation);

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, texture2);
			gl.drawArrays(gl.TRIANGLES, 0, 12);
			gl.bindTexture(gl.TEXTURE_2D, texture1);
			gl.drawArrays(gl.TRIANGLES, 12, 24);

			gl.viewport(canvas.width/2, 0, canvas.width/2, canvas.height);
			StereoProjection(-6.0, 6.0, -4.8, 4.8, 12.99, -100.0, 0.0, 13, seperation);//0.05 i değişcen
			
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, texture2);
			gl.drawArrays(gl.TRIANGLES, 0, 12);
			gl.bindTexture(gl.TEXTURE_2D, texture1);
			gl.drawArrays(gl.TRIANGLES, 12, 24);
			break;
		case 2:
			gl.viewport(0, 0, canvas.width, canvas.height);
			StereoProjection(-6.0, 6.0, -4.8, 4.8, 12.99, -100.0, 0.0, 13, 0);

			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, texture2);
			gl.drawArrays(gl.TRIANGLES, 0, 12);
			gl.bindTexture(gl.TEXTURE_2D, texture1);
			gl.drawArrays(gl.TRIANGLES, 12, 24);
			break;	

	}
	}
	window.requestAnimationFrame(draw);

//texture1   *****************************************************************************
const texture1 = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture1);
const level = 0;
const internalFormat = gl.RGBA;
const width = 1;
const height = 1;
const border = 0;
const srcFormat = gl.RGBA;
const srcType = gl.UNSIGNED_BYTE;
const pixel = new Uint8Array([0, 0, 255, 255]);
gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,width, height, border, srcFormat, srcType, pixel);
const image = new Image();
image.onload = function() {
  gl.bindTexture(gl.TEXTURE_2D, texture1);
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,srcFormat, srcType, image);
  
	 gl.generateMipmap(gl.TEXTURE_2D);   
	 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);          
};
image.crossOrigin = ""; 
image.src = "https://cdn.pixabay.com/photo/2013/09/22/19/14/brick-wall-185081_960_720.jpg";
//****************************************************************

//texture1   *****************************************************************************
const texture2 = gl.createTexture();

gl.bindTexture(gl.TEXTURE_2D, texture2);
gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,width, height, border, srcFormat, srcType, pixel);

const image2 = new Image();
image2.onload = function() {
  gl.bindTexture(gl.TEXTURE_2D, texture2);
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,srcFormat, srcType, image2);
  
	 gl.generateMipmap(gl.TEXTURE_2D);   
	 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	 gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);          
};
image2.crossOrigin = ""; 
image2.src = "https://cdn.pixabay.com/photo/2016/11/21/17/58/green-1846861_1280.jpg";
//****************************************************************


function StereoProjection(_left, _right, _bottom, _top, _near, _far, _zero_plane, _dist, _eye)
{
	//    Perform the perspective projection for one eye's subfield.
	//    The projection is in the direction of the negative z-axis.
			//            _left=-6.0;
			//            _right=6.0;
			//            _bottom=-4.8;
		   //             _top=4.8;
	//    [default: -6.0, 6.0, -4.8, 4.8]
	//    left, right, bottom, top = the coordinate range, in the plane of zero parallax setting,
	//         which will be displayed on the screen.
	//         The ratio between (right-left) and (top-bottom) should equal the aspect
	//    ratio of the display.


		   //                  _near=6.0;
		   //                  _far=-20.0;
	//    [default: 6.0, -6.0]
	//    near, far = the z-coordinate values of the clipping planes.

		   //                  _zero_plane=0.0;
	//    [default: 0.0]
	//    zero_plane = the z-coordinate of the plane of zero parallax setting.

	//    [default: 14.5]
		  //                     _dist=10.5;
	//   dist = the distance from the center of projection to the plane of zero parallax.

	//    [default: -0.3]
		  //                 _eye=-0.3;
	//    eye = half the eye separation; positive for the right eye subfield,
	//    negative for the left eye subfield.

	let   _dx = _right - _left;
	let   _dy = _top - _bottom;

	let   _xmid = (_right + _left) / 2.0;
	let   _ymid = (_top + _bottom) / 2.0;

	let   _clip_near = _dist + _zero_plane - _near;
	let   _clip_far = _dist + _zero_plane - _far;

	let  _n_over_d = (_clip_near / _dist);

	let   _topw = _n_over_d * _dy / 2.0;
	let   _bottomw = -_topw;
	let   _rightw = _n_over_d * (_dx / 2.0 - _eye); 
	let   _leftw = _n_over_d * (-_dx / 2.0 - _eye);

  const proj = mat4.create();
    
  	mat4.frustum(proj, _leftw, _rightw, _bottomw, _topw, _clip_near, _clip_far)
	mat4.translate(proj, proj, [-_xmid - _eye, -_ymid, 0]);  

   let uniProj = gl.getUniformLocation(program, 'proj');       
	gl.uniformMatrix4fv( uniProj, false, proj);	
}

gl.uniform1i(gl.getUniformLocation(program, "texture1"), 0); 
gl.uniform1i(gl.getUniformLocation(program, "texture2"), 1);


var pressedKey = {};
window.onkeyup = function (e) { pressedKey[e.keyCode] = false; }
window.onkeydown = function (e) { pressedKey[e.keyCode] = true; }

let cameraPos = glm.vec3(0, 0, 3);
let cameraFront = glm.vec3(0, 0, -1);
let cameraUp = glm.vec3(0, 1, 0);
let obrot = 0.0;

let yaw =-90;  //rotation around the X axis
	let pitch=0;   //rotation around the Y axis
function set_camera_mouse(e) {
	//Determine the change in mouse position, relative to the last frame
	
	let xoffset = e.movementX;
	let yoffset = e.movementY;
	let sensitivity = 0.1; 
	let cameraSpeed = 0.05*elapsedTime;
	xoffset *= sensitivity;
	yoffset *= sensitivity;

	///Update the angles
yaw += xoffset * cameraSpeed;
pitch -= yoffset*cameraSpeed;
//Limitations for the camera
if (pitch > 89.0)
pitch = 89.0;
if (pitch < -89.0)
pitch = -89.0;
//Euler angles
let front = glm.vec3(1,1,1);
front.x = Math.cos(glm.radians(yaw))*Math.cos(glm.radians(pitch));
front.y = Math.sin(glm.radians(pitch));
front.z = Math.sin(glm.radians(yaw)) * Math.cos(glm.radians(pitch));
cameraFront = glm.normalize(front);

	
}


function set_camera() {
	let cameraSpeed = 0.02;
	
	if (pressedKey["38"]) {
		cameraPos.x += cameraSpeed * cameraFront.x;
		cameraPos.y += cameraSpeed * cameraFront.y;
		cameraPos.z += cameraSpeed * cameraFront.z;
	}
	if (pressedKey["40"]) {
		cameraPos.x -= cameraSpeed * cameraFront.x;
		cameraPos.y -= cameraSpeed * cameraFront.y;
		cameraPos.z -= cameraSpeed * cameraFront.z;
	}
	if (pressedKey["37"]) {
		let cameraPos_tmp = glm.normalize(glm.cross(cameraFront, cameraUp));
	cameraPos.x-=cameraPos_tmp.x * cameraSpeed;
	cameraPos.y-=cameraPos_tmp.y * cameraSpeed;
	cameraPos.z-=cameraPos_tmp.z * cameraSpeed;
	}
	if (pressedKey["39"]) {
		let cameraPos_tmp = glm.normalize(glm.cross(cameraFront, cameraUp));
	cameraPos.x+=cameraPos_tmp.x * cameraSpeed;
	cameraPos.y+=cameraPos_tmp.y * cameraSpeed;
	cameraPos.z+=cameraPos_tmp.z * cameraSpeed;
	}
	if(pressedKey["27"]){ //esc to close the program
		pressedKey["27"]= false; //it was constantly asking without this line
		if (confirm(`Are you sure you want to close the window?`))
		window. close(``, `_parent`, ``); 
	}

	if(pressedKey["90"]){
		tryb=0;
	}
	if(pressedKey["88"]){
		tryb=1;
	}
	if(pressedKey["67"]){
		tryb=2;
	}
	if(pressedKey["107"]){
		seperation+=0.1;
	}
	if(pressedKey["109"]){
		seperation-=0.1;
	}

	let cameraFront_tmp = glm.vec3(
		cameraPos.x + cameraFront.x,
		cameraPos.y + cameraFront.y,
		cameraPos.z + cameraFront.z
	);

	mat4.lookAt(view, cameraPos, cameraFront_tmp, cameraUp);
	gl.uniformMatrix4fv( uniView, false, view);
}

}
