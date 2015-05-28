(function () {
    //modo estrito evita erros variados como não declarar uma variável
    "use  strict";

    //apelidamos o objeto WinJS.Application só pra facilitar a digitação
    var app = WinJS.Application;
    //apelidamos o objeto WinJS.Navigation só pra facilitar a digitação -- Referência nav
    var nav = WinJS.Navigation;

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
                element.style.background = "cyan";
            }
        }),



        //elemento visual
        model: WinJS.Binding.as({
            hora: new Date().toLocaleTimeString()

        })


    });

    // definir evento nav através da função
    nav.onnavigating = function navigating(args) {
        var location = args.detail.location;
        var state = args.detail.state;
        //limpar informações do DivConteudo
        DivConteudo.textContent = "";

        WinJS.UI.Pages.render(location, DivConteudo, state).then(function () {
            WinJS.Utilities.query("a", DivConteudo).listen("click", function (e) {
                nav.navigate(e.srcElement.href);
                e.preventDefault();
            });
        });



    };


    app.onactivated = function (e) {
        var DivPrincipal = MVAHTML5.id("DivPrincipal");
        var DivConteudo = MVAHTML5.id("DivConteudo");

        DivPrincipal.textContent = "Olá mundo MVA HTML5 Windows 8.1!";
        //instanciar a classe texto
        //new MVAHTML5.ClasseTexto(DivPrincipal)

        // vinculo do elemento visual com a div principal
        MVAHTML5.model.bind("hora", function (value) {
            DivPrincipal.textContent = value;

        });

        //intervalo para atualizar a div principal 1/4 de segundo
        setInterval(function () {
            MVAHTML5.model.hora = new Date().toLocaleTimeString();
        }, 250);

        WinJS.UI.processAll();

        //NAVEGAÇÃO PARA SEGUNDA PÁGINA no body
        //WinJS.UI.Pages.render("/PaginaConteudo.html", document.body);
        //NAVEGAÇÃO PARA SEGUNDA PÁGINA no Div
        //WinJS.UI.Pages.render("/PaginaConteudo.html", DivConteudo);
        nav.navigate("/pagina1.html");
    };

    app.start();







    // encapsulamento e cóigo java script ()
})();