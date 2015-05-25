(function () {
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
        })

    });

    app.onactivated = function (e) {
        var DivPrincipal = MVAHTML5.id("DivPrincipal");
        DivPrincipal.textContent = "Olá mundo MVA HTML5 Windows 8.1!";
        //instanciar a classe texto
        //new MVAHTML5.ClasseTexto(DivPrincipal)


        WinJS.UI.processAll();
    };

    app.start();







// encapsulamento e cóigo java script ()
})();