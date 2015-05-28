﻿(function () {
    //modo estrito evita erros variados como não declarar uma variável
    "use  strict";

    //apelidamos o objeto WinJS só pra facilitar a digitação
    var app = WinJS.Application;

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

    app.onactivated = function (e) {
        var DivPrincipal = MVAHTML5.id("DivPrincipal");
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

        //NAVEGAÇÃO PARA SEGUNDA PÁGINA
        WinJS.UI.Pages.render("/PaginaConteudo.html", document.body);
    };

    app.start();







    // encapsulamento e cóigo java script ()
})();