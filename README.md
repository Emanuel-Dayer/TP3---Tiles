# Actividad

Desarrollar un videojuego que cuente con un laberinto implementado en forma de mapa de mosaicos.

Colocar elementos recolectables y un elemento que indique la posición de llegada.

Condición para GANAR: al colisionar con punto de llegada, corroborar que se cumpla la condición de haber juntado al menos 5 elementos.

Mejora 1: Al llegar al punto final, si cuenta con la cantidad de elementos recolectados indicados, permite pasar de nivel. Se deberá iniciar un nuevo mapa, donde además, se transportarán los puntajes de las escenas anteriores.

Mejora 2: Construir un tercer nivel que sea de dimensiones más amplias que las del monitor para permitir el movimiento de cámara.

Mejora 3: Agregar enemigos con dos tipos de movimientos: vertical u horizontal, de acuerdo a la ubicación inicial de los mismos. OPCIONAL

# GDD

1.Concepto: 
El personaje recolecta items en un laberinto

2.Premisa: 
Un joven explorador, cuyo sueño es convertirse en el mejor explorador del mundo, decide aventurarse en una legendaria y peligrosa mazmorra para probar su valentía y conseguir los tesoros que allí se ocultan. Pero logrará sortear las trampas y enemigos que lo custodian.

3.Control de versiones:
Versión 0.1(08/06/2022).
Cambio 1: Agregado de escenas y botones.

4.Datos técnicos:
Género: Aventura.
Modos de juego: Un solo jugador local.
Plataforma: Web.
Target: Niños.
Objetivo: Colaborar en el aprendizaje.

5.Descripción del juego:
Es un juego de aventura con un arte Pixel Art donde el objetivo del jugador es recolectar los ítems en el mapa que le permitan abrir la puerta al siguiente nivel, evitando los enemigos que rondan la mazmorra. 

6.Escena de juego:
6. Al comienzo del juego, el personaje aparecerá en la esquina superior del mapa laberíntico donde aparecerán objetos recolectables.
6.1 En la esquina superior izquierda aparecerá un contador que representará la cantidad de objetos recolectados por el jugador hasta el momento.
6.2 Una vez que el jugador colisione con la salida y se cumpla la condición de haber recolectado al menos 5 objetos del mapa, pasará al siguiente nivel.

7.Escena de victoria:

8.Controles:
8. El personaje podrá moverse utilizando las flechas del teclado.

9.Elementos de la escena:
9. Paredes.
9.1 Llegada
9.2 Items.
9.3 Personaje.
9.4 Enemigos.
