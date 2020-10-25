$(document).ready(() => {
    // request para pegar os dados da api
    var HttpClient = function() {
        this.getDataFromApi = function(url, callback) {
            var request = new XMLHttpRequest();

            request.onreadystatechange = function() { 
                if (this.readyState == 4 && this.status == 200) {
                    callback(JSON.parse(this.responseText));
                }
            }

            request.open( "GET", url, true );            
            request.send( null );
        }
    }

    // depois que retorna da api
    var client = new HttpClient();
        client.getDataFromApi('http://www.mocky.io/v2/5d6fb6b1310000f89166087b', function (response) {
            var vagas = response.vagas
            var txt = "<table class=\"table-vagas table-hover\">"
            vagas.forEach(vaga => {
                if(vaga.ativa){
                    var localizacao = ""
                    if(vaga.localizacao == null){
                        localizacao = "Remoto"
                    }else{
                        localizacao = vaga.localizacao.bairro + " - " + vaga.localizacao.cidade + ", " + vaga.localizacao.pais
                    }

                    txt += "<tr><td class=\"nome-cargo\">" + vaga.cargo + "</td>" + "<td class=\"localizacao-cargo\">" + localizacao + "</td>" + "</tr>"
                }
            })
            txt += "</table>"
            document.getElementById("vagas").innerHTML = txt
        });

    document.getElementById("vaga-link").addEventListener('click',()=>{
        document.getElementById("vagas").scrollIntoView()
    })
    
})