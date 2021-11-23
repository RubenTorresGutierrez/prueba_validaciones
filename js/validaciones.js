/**
*   @file Validación Formulario | Examen
*   @description Realizar una validación de un formulario
*   @version 1.0.0
*   @author Rubén Torres <rtorresgutierrez.guadalupe@alumnado.fundacionloyola.net>
*   @license GPL-3.0-or-later
*   Ref: https://spdx.org/licenses/
*
*   Ref JSDoc: https://jsdoc.app/
*/
'use strict'

window.onload = iniciar;

function iniciar(){

    //SELECT
    let select = document.getElementById('sCurso');
    select.onchange = selectAsignaturas;
    
    //CÁLCULOS
    //iCalculo1
    let iCalculo1 = document.getElementById('iCalculo1');
    iCalculo1.onblur = comprobarNumero;
    //iCalculo2
    let iCalculo2 = document.getElementById('iCalculo2');
    iCalculo2.onblur = comprobarNumero;
    //iCalculo3
    let iCalculo3 = document.getElementById('iCalculo3');
    iCalculo3.onblur = comprobarNumero;

    //Poner a 0
    let btnCero = document.getElementById('btnCero');
    btnCero.onclick = ponerCero;

    //Enviar
    let enviar = document.getElementById('enviar');
    enviar.onclick = comprobarSuma;

}

function comprobarSuma(){

    // Array suma
    let suma = [];
    
    //iCalculo1
    suma.push(parseInt(document.getElementById('iCalculo1').value));
    //iCalculo2
    suma.push(parseInt(document.getElementById('iCalculo2').value));
    //iCalculo3
    suma.push(parseInt(document.getElementById('iCalculo3').value));

    // Sumarlo todo
    let resultado = suma.reduce((x, y) => x + y);

    // Comprobar si está entre 10 y 20
    if(resultado < 10 || resultado > 20){

        // Recoger divError
        let divError = document.getElementById('divError');

        // Crear nodo de texto con el mensaje del error
        let nodoError = document.createTextNode('La suma de los 3 valores no está entre 10 y 20');

        //Hacer divError visible
        divError.style.display = 'block';

        // Añadir el nodo de texto al divError
        divError.appendChild(nodoError);

    }else divError.style.display = 'none';

}

function ponerCero(){

    //iCalculo1
    document.getElementById('iCalculo1').value = 0;
    //iCalculo2
    document.getElementById('iCalculo2').value = 0;
    //iCalculo3
    document.getElementById('iCalculo3').value = 0;

    let patron = /^\d{4}-[A-Z]{3}|(CC|BA)-\d{4}-[A-Z]{1,2}$/;
    let exp = new RegExp(patron);

    if(!exp.test(document.getElementById('iMatricula').value)){

        // Recoger divError
        let divError = document.getElementById('divError');

        // Crear nodo de texto con el mensaje del error
        let nodoError = document.createTextNode('La matrícula es incorrecta');

        //Hacer divError visible
        divError.style.display = 'block';

        // Añadir el nodo de texto al divError
        divError.appendChild(nodoError);

    }else divError.style.display = 'none';

}

function comprobarNumero(){

    //Borrar el contenido que haya en spanMedia
    if(document.getElementById('spanValor'))
        document.getElementById('spanValor').remove();

    //spanMedia
    let spanMedia = document.getElementById('spanMedia');

    //spanValor
    let spanValor = document.createElement('span');
    spanValor.id = 'spanValor';

    //iCalculo1
    let iCalculo1 = parseInt(document.getElementById('iCalculo1').value);
    //iCalculo2
    let iCalculo2 = parseInt(document.getElementById('iCalculo2').value);
    //iCalculo3
    let iCalculo3 = parseInt(document.getElementById('iCalculo3').value);

    //Media
    let media = document.createTextNode((iCalculo1 + iCalculo2 + iCalculo3) / 3);

    if(!isNaN(iCalculo1) && !isNaN(iCalculo2) && !isNaN(iCalculo3))
        spanValor.appendChild(media);
    else{
        let nan = document.createTextNode('N/A');
        spanValor.appendChild(nan);
    }

    spanMedia.appendChild(spanValor);


}

function selectAsignaturas(){

    if(document.getElementById('dAsignaturas'))
        document.getElementById('dAsignaturas').remove();

    // Obtener etiqueta p que he creado
    let p = document.getElementById('asignaturas');

    //DIV class=row
    let div = document.createElement('div');
    div.id = 'dAsignaturas';
    p.appendChild(div);

    //LABEL
    let label = document.createElement('label');
    let textolabel = document.createTextNode('Asignaturas');
    label.htmlFor = 'sAsignaturas';
    label.appendChild(textolabel);
    div.appendChild(label);

    //SELECT
    let select = document.createElement('select');
    select.id = 'sAsignaturas';
    div.appendChild(select);

    //OPTION
    let option = [];
    let textoselect = [];
    textoselect.push(document.createTextNode('-- Seleccionar Asignatura --'));

    // Variable para indicarle el tamaño del array de option
    let tamanyo;

    if(document.getElementById('sCurso').value == '1DAW'){

        textoselect.push(document.createTextNode('Bases de Datos'));
        textoselect.push(document.createTextNode('Programación'));
        textoselect.push(document.createTextNode('Entorno de Desarrollo'));
        textoselect.push(document.createTextNode('Lenguaje de Marcas'));
        textoselect.push(document.createTextNode('Sistemas Informáticos'));
        tamanyo = 6;
        
    }else if(document.getElementById('sCurso').value == '2DAW'){

        textoselect.push(document.createTextNode('DWEC'));
        textoselect.push(document.createTextNode('DWES'));
        textoselect.push(document.createTextNode('DEAPW'));
        textoselect.push(document.createTextNode('DIW'));
        tamanyo = 5;

    }

    for(let i = 0; i < tamanyo; i++){
        option.push(document.createElement('option'));
        option[i].value = i;
        option[i].appendChild(textoselect[i]);
        select.appendChild(option[i]);
    }

}