function cabecera(){
    let main$$ = document.querySelector('main');
    let cabecera$$ = document.createElement('div');
    const imagencabecera = document.createElement('img')
    imagencabecera.src ="./img/cabecera.png";
    imagencabecera.className="cabecera";
    cabecera$$.appendChild(imagencabecera);
    main$$.appendChild(cabecera$$);
};
function clearMain() {
    document.querySelector('article').innerHTML = "";
  }

function carga (url){
    const article$$ = document.querySelector('article');
    
    const NewUl = document.createElement("ul");
    clearMain();

    article$$.appendChild(NewUl);

    fetch(url).then((response) => {
        return response.json();
    }).then((myJson) => {
        for (let i = 0; i < myJson.results.length; i++) {
            console.log(myJson.results[i].name);
            let NewLi = document.createElement('li');
            let NewA = crearEnlace( myJson.results[i].name,   function(){
                seccion(myJson.results[i])
            });
            NewLi.appendChild(NewA);
            NewUl.appendChild(NewLi);
        };
    });

      
}

function seccion(data){

    console.log(data);
    const article$$ = document.querySelector('article');
    clearMain();

    for (const property in data) {
        console.log(`${property}: ${data[property]}`);
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        let p = document.createElement('p');
        div.classList.add('link');

        p.innerHTML=data[property];;
        h1.innerHTML=property;

        div.appendChild(h1);
        div.appendChild(p);
        article$$.appendChild(div);


      }
      
    


}

function crearEnlace(data, callback){
    let a = document.createElement('a');
    const link = document.createTextNode(data);
    a.appendChild(link);
 
    a.classList.add('link');
    a.setAttribute('href', '#');

    a.addEventListener("click", function (event) {
        console.log('tito');
        event.preventDefault();
        callback();

    });
    
    return a ;

}

function navegador(){
    const main$$ = document.querySelector('main');
    const nav$$= document.createElement("div");
    let menu =[];
    const datos = {
        categorias: 
    [
        {
            text: "Personajes",
            path: "/personajes",
            url: "https://swapi.dev/api/people/",
          },
          {
            text: "Planetas",
            path: "/planetas",
            url: "https://swapi.dev/api/planets/",
          }
    ]
    
    };
    
        for (let index = 0; index < datos.categorias.length; index++) {

            let enlace = crearEnlace (
                datos.categorias[index].text,
                function(){
                    carga(datos.categorias[index].url)
                }
            );
            nav$$.appendChild(enlace);
            console.log (enlace);
            
        }

        main$$.appendChild(nav$$);
        const article$$= document.createElement("article");
        main$$.appendChild(article$$);


}





window.onload   = function (){
    cabecera();
    navegador();

};

