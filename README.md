# Comienzo de WebGL

## Propietario: Andrea Santana López

En el curso 2025/2026 empiezo a comprender como funciona WebGL realizando la asignatura informatica grafica en la ULPGC(Universidad de las palmas de Gran Canarias)

## Primera practica 

Antes que nada el profesor nos dio información para realizar la primera practica y luego nosotros la retocamos,pero antes explicaremos
que se hizo en la clase.

Nos enseño conceptos relacionados con WegGL como por ejemplo qué es y el proceso para dibujar con
WebGL.

WebGL es es una API de JavaScript que permite renderizar contenido 3D y 2D de alto rendimiento directamente 
en los navegadores web, utilizando la unidad de procesamiento gráfico (GPU) del ordenador.

El proceso para dibujar comienzo con lo siguiente:
## Primer Paso crear un canvas en la función init
### ¿Qué es canvas?
Es un elemento HTML5 que funciona como un lienzo o espacio de dibujo rectangular donde se renderizan 
gráficos 2D y 3D de alto rendimiento utilizando la potencia de la unidad de procesamiento gráfico (GPU) de la computadora, a través de la API de JavaScript WebGL
```JavaScript
function init() {
  canvas = document.getElementById("my_Canvas");
  gl = canvas.getContext("webgl2");
}
```
## Segundo Paso Crear y Compilar Shaders
### ¿Qué son Shaders?
los shaders son pequeños programas que se ejecutan en la GPU para definir la apariencia de los objetos 3D. 
```Javascript
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
```

 ## Tercer Paso Crear un  buffer de objectos y  associarlo a los shaders
 
 ```JavaScript
 
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
```

## Cuarto paso Crear la geometria y dibujar

Una vez explicado esto diré que cambios he realizado pues mira he añadido 6 reptangulos dinamicos,1 rectangulo estatico y 1 poligono en forma de deltoide.Estos rectángulos tienen la capacidad de subir cuando se encuentran en el extremo inferior del canvas y de bajar cuando están en el extremo superior. Además, su tamaño varía según la ordenada ya que, aumentan de altura cuando la ordenada es igual a 0.1 y se reducen cuando la ordenada llega a -1.0 o a 0.8.
