(function () {
    //modo estrito evita erros variados como não declarar uma variável
    "use  strict";

    //apelidamos o objeto WinJS.Application só pra facilitar a digitação
    var app = WinJS.Application;
    //apelidamos o objeto WinJS.Navigation só pra facilitar a digitação -- Referência nav
    var nav = WinJS.Navigation;
    // brincadeira de add robôs(contador)
    var i = 0;

    //Definir o Namespace  
    WinJS.Namespace.define("MVAHTML5", {
        id: function (id) {
            return document.getElementById(id);
        },

        // Definir uma classe para editar o texto
        ClasseTexto: WinJS.Class.define(function (element, options) {
            element.style.fontSize = "72px";
            element.wincontrol = this;
        }),

        // associação de páginas ao código
        PaginaPadrao: WinJS.UI.Pages.define("/PaginaConteudo.html", {
            processed: function (element, option) {
                element.style.background = 'cyan';
                WinJS.Binding.processAll(element, MVAHTML5.model);

                ////add robô - acrescentar item no array
                //element.querySelector(".add").onclick = function () {
                //    MVAHTML5.model.pessoas.push({
                //        nome: "Robô" + (++i),
                //        idade: i
                //    })
                //}
            }
        }),

        //elemento visual 
        model: WinJS.Binding.as({
            hora: new Date().toLocaleTimeString(),

            pessoas: new WinJS.Binding.List([
                { nome: "Danilo", idade: 25 },
                { nome: "João", idade: 28 },
                { nome: "Neo", idade: 30 }
            ])
        })

    });

    // definir evento nav através da função
    nav.onnavigating = function navigating(args) {
        var location = args.detail.location;
        var state = args.detail.state;

        //limpar informações do DivConteudo
        DivNav.textContent = "";
        WinJS.UI.Pages.render(location, DivNav, state).then(function () {
            WinJS.Utilities.query("a", DivNav).listen("click", function (e) {
                nav.navigate(e.srcElement.href);
                e.preventDefault();
            });
        });
    };

    app.onactivated = function (e) {
        var DivPrincipal = MVAHTML5.id("DivPrincipal");
        var DivConteudo = MVAHTML5.id("DivConteudo");
        //add robô - acrescentar item no array
        document.body.querySelector("#add").onclick = function () {
            MVAHTML5.model.pessoas.push({
                nome: "Robô " + (++i),
                idade: i
            })
        }


        var DivNav = MVAHTML5.id("DivNav");

        DivPrincipal.textContent = "Olá mundo MVA HTML5 Windows 8.1!";
        //instanciar a classe texto
        //new MVAHTML5.ClasseTexto(DivPrincipal)

        // vinculo do elemento visual com a div principal --Forma imperativa
        //MVAHTML5.model.bind("hora", function (value) {
        //    DivPrincipal.textContent = value;
        //});


        //intervalo para atualizar a div principal 1/4 de segundo
        setInterval(function () {
            MVAHTML5.model.hora = new Date().toLocaleTimeString();
        }, 250);

        //varre todo código procurando data-win-control
        WinJS.UI.processAll();
        //varre todo código procurando data-bind-control
        WinJS.Binding.processAll(document.rootElement, MVAHTML5.model);



        //NAVEGAÇÃO PARA SEGUNDA PÁGINA no body
        //WinJS.UI.Pages.render("/PaginaConteudo.html", document.body);
        //NAVEGAÇÃO PARA SEGUNDA PÁGINA no Div
        WinJS.UI.Pages.render("/PaginaConteudo.html", DivConteudo);
        nav.navigate("/pagina1.html");
    };

    app.start();







    // encapsulamento e cóigo java script ()
})();