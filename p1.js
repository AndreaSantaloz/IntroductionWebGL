function moveObject() {}

// Vertex shader source
const vertexShaderSource = `#version 300 es
      precision mediump float;
      in vec2 aCoordinates;

      void main(void) {
        gl_Position = vec4(aCoordinates, 0, 1);
        gl_PointSize = 10.0;
      }
`;

// Fragment shader source
const fragmentShaderSource = `#version 300 es
        precision mediump float;

        out vec4 fragColor;
        uniform vec4 uColor;
        

        void main(void) {
           fragColor = uColor;
          //fragColor = vec4(0,0,1,1);
      }
`;

var gl;
var colorLocation;
var canvas;
var vertex_buffer;
var y1 = 0.8;
var y2 = -1.0;
var y3 = 0.8;
var y4 = -1.0;
var y5 = 0.8;
var y6 = -1.0;

function render() {
  // Clear the canvas
  gl.clearColor(0.8, 1.0, 0.5, 1.0);

  // Clear the color buffer bit
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Set the view port
  gl.viewport(0, 0, canvas.width, canvas.height);

  // Bind appropriate array buffer to it
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  drawRectangle(-0.25, -0.5, 0.4, 1, [1, 1, 1, 1]);
  var verticiesRombo = [-0.25, 0.1, -0.05, 0.35, 0.16, 0.1];
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(verticiesRombo),
    gl.STATIC_DRAW
  );
  gl.uniform4fv(colorLocation, [0, 0, 1, 1]);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  var verticiesRombo = [-0.25, 0.1, 0.16, 0.1, -0.05, -0.5];
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(verticiesRombo),
    gl.STATIC_DRAW
  );
  gl.uniform4fv(colorLocation, [0, 0, 1, 1]);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  y1 -= 0.01;
  if (y1 == -1.0 || y1 < -1.0) {
    drawRectangle(-0.6, -1.0, 0.2, 0.2, [0, 0, 1, 1]);
  } else {
    if (y1 == 0.1 || y1 < 0.1) {
      drawRectangle(-0.6, y1, 0.2, 0.3, [0, 0, 1, 1]);
    } else {
      drawRectangle(-0.6, y1, 0.2, 0.2, [0, 0, 1, 1]);
    }
  }

  y2 += 0.01;
  if (y2 == 0.8 || y2 > 0.8) {
    drawRectangle(0.2, 0.8, 0.2, 0.2, [0, 0, 1, 1]);
  } else {
    if (y2 == 0.1 || y2 > 0.1) {
      drawRectangle(0.2, y2, 0.2, 0.3, [0, 0, 1, 1]);
    } else {
      drawRectangle(0.2, y2, 0.2, 0.2, [0, 0, 1, 1]);
    }
  }

  y3 -= 0.01;
  if (y3 == -1.0 || y3 < -1.0) {
    drawRectangle(-0.2, -1.0, 0.2, 0.2, [0, 1, 1, 1]);
  } else {
    if (y3 == 0.1 || y3 < 0.1) {
      drawRectangle(-0.2, y3, 0.2, 0.3, [0, 1, 1, 1]);
    } else {
      drawRectangle(-0.2, y3, 0.2, 0.2, [0, 1, 1, 1]);
    }
  }

  y4 += 0.01;
  if (y4 == 0.8 || y4 > 0.8) {
    drawRectangle(-0.2, 0.8, 0.2, 0.2, [0, 1, 1, 1]);
  } else {
    if (y4 == 0.1 || y4 > 0.1) {
      drawRectangle(-0.2, y4, 0.2, 0.3, [0, 1, 1, 1]);
    } else {
      drawRectangle(-0.2, y4, 0.2, 0.2, [0, 1, 1, 1]);
    }
  }

  y5 -= 0.01;
  if (y5 == -1.0 || y5 < -1.0) {
    drawRectangle(0.2, -1.0, 0.2, 0.2, [1, 1, 1, 1]);
  } else {
    if (y5 == 0.1 || y5 < 0.1) {
      drawRectangle(0.2, y5, 0.2, 0.3, [1, 1, 1, 1]);
    } else {
      drawRectangle(0.2, y5, 0.2, 0.2, [1, 1, 1, 1]);
    }
  }

  y6 += 0.01;
  if (y6 == 0.9 || y6 > 0.9) {
    drawRectangle(-0.6, 0.8, 0.2, 0.2, [1, 1, 1, 1]);
  } else {
    if (y6 == 0.1 || y6 > 0.1) {
      drawRectangle(-0.6, y6, 0.2, 0.3, [1, 1, 1, 1]);
    } else {
      drawRectangle(-0.6, y6, 0.2, 0.2, [1, 1, 1, 1]);
    }
  }
  window.requestAnimationFrame(render);
}
function drawRectangle(x, y, width, height, color) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
    gl.STATIC_DRAW
  );
  gl.uniform4fv(colorLocation, color);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function init() {
  // ============ STEP 1: Creating a canvas=================
  canvas = document.getElementById("my_Canvas");
  gl = canvas.getContext("webgl2");

  //========== STEP 2: Create and compile shaders ==========

  // Create a vertex shader object
  const vertShader = gl.createShader(gl.VERTEX_SHADER);

  // Attach vertex shader source code
  gl.shaderSource(vertShader, vertexShaderSource);

  // Compile the vertex shader
  gl.compileShader(vertShader);
  if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    console.log("vertShader: " + gl.getShaderInfoLog(vertShader));
  }

  // Create fragment shader object
  const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

  // Attach fragment shader source code
  gl.shaderSource(fragShader, fragmentShaderSource);

  // Compile the fragmentt shader
  gl.compileShader(fragShader);
  if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
    console.log("fragShader: " + gl.getShaderInfoLog(fragShader));
  }

  // Create a shader program object to store
  // the combined shader program
  const shaderProgram = gl.createProgram();

  // Attach a vertex shader
  gl.attachShader(shaderProgram, vertShader);

  // Attach a fragment shader
  gl.attachShader(shaderProgram, fragShader);

  // Link both programs
  gl.linkProgram(shaderProgram);

  // Use the combined shader program object
  gl.useProgram(shaderProgram);

  //======== STEP 3: Create buffer objects and associate shaders ========

  // Create an empty buffer object to store the vertex buffer
  vertex_buffer = gl.createBuffer();

  // Bind vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  // Get the attribute location
  const coordLocation = gl.getAttribLocation(shaderProgram, "aCoordinates");

  // Point an attribute to the currently bound VBO
  gl.vertexAttribPointer(coordLocation, 2, gl.FLOAT, false, 0, 0);

  // Enable the attribute
  gl.enableVertexAttribArray(coordLocation);

  // Unbind the buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  colorLocation = gl.getUniformLocation(shaderProgram, "uColor");

  //========= STEP 4: Create the geometry and draw ===============
}

init();
render();
