let historico = []  // cria um array chamado historico vazio
//  DECIMAL 

let input1 = document.getElementById("num1");      // pega o elemento do html id e deixa ela guardada numa variavel js
let input2 = document.getElementById("num2");
let resultado = document.getElementById("resultado");

function pegarNumeros() {
    let num1 = parseFloat(input1.value.replace(",", "."));   // transforma em numero com virgula e ajusta se o usuario colocar ponto ou virgula, vai pegar.
    let num2 = parseFloat(input2.value.replace(",", "."));
    return { num1, num2 };
}

function calcular(operacao) {         // recebe o nome da operacao como parametro e executa o calculo correspondente
    let { num1, num2 } = pegarNumeros();  // aq tem a função  ai eu pego num1 e num2 e eles recebem a outra funcao que fiz de pegarNumeros para se eles se tornem pasefloat

    if (isNaN(num1) || isNaN(num2)) {               // aqui validacao se o valor é  numeros e n letras como exemplo
        resultado.value = "Digite um valor válido";
        return;
    }

    let res;                                        // crio a variavel res

    if (operacao === "soma") res = num1 + num2;            // aqui fiz todas as operações decimail
    if (operacao === "subtrair") res = num1 - num2;            // lembrando q oque faz a conta acontecer é o sinal -,+....
    if (operacao === "multiplicar") res = num1 * num2;

    if (operacao === "dividir") {                                // aqui igual o outro mas se for dividido por 0 vai mostrar erro por divisao
        if (num2 === 0) {
            resultado.value = "Erro: divisão por zero";
            return;
        }
        res = num1 / num2;
    }

    resultado.value = res;                  // aqui falo q meu resultado q foi como chamei a variavel de resultado vai receber agora a variavel res
    const item = {                          // aqui tem a parte onde vou colocar no array pq vou usar em historico   
        tipo: "decimal",                    
        operacao: operacao,
        valor1: num1,
        valor2: num2,
        resultado: res
    } 
    historico.push(item)               // aqui eu mando pra o array, salvo e mostro
    salvarNumeros()
    mostrarHistorico()
}

document.getElementById("btnSomar").addEventListener("click", () => calcular("soma"));             // todos esses aq vao pegar o id la do html e vai atribuir uma funcao click e o nome da operacao
document.getElementById("btnSubtrair").addEventListener("click", () => calcular("subtrair"));     
document.getElementById("btnMultiplicar").addEventListener("click", () => calcular("multiplicar"));   // então quando aperta no botao vai acontecer oq ta dentro da funcao calcular e a operacao
document.getElementById("btnDividir").addEventListener("click", () => calcular("dividir"));


// BINÁRIO 

let bnum1 = document.getElementById("bin1");   // pega o elemento do html id e deixa ela guardada numa variavel js
let bnum2 = document.getElementById("bin2");
let resultadoBin = document.getElementById("resultadobin");

function inputValido(valor) {                            //  pecorre o array e se o valor for diferente de 1 ou 0 vai retorna false se nao true
    if (valor.length === 0) return false;

    for (let i = 0; i < valor.length; i++) {
        if (valor[i] !== "0" && valor[i] !== "1") return false;
    }
    return true;
}

function pegarNumerosBin() {                    // vai pegar o bin1 e bin2 e vai transformar eles em numero inteiro e vai colocar a base 2 ja q é em binario 
    let bin1 = parseInt(bnum1.value, 2);
    let bin2 = parseInt(bnum2.value, 2);
    return { bin1, bin2 };                      // retorna bin1 e bin2 
}

function calcularBin(operacao) {                                               

    if (!inputValido(bnum1.value) || !inputValido(bnum2.value)) {           //valida se vai ter numero diferente  de 0 e 1
        resultadoBin.value = "Apenas 0 e 1!";
        return;
    }

    let { bin1, bin2 } = pegarNumerosBin();          // aq vai pegar as 2 variaveis que recebe a função pegarNumeroBin

    if (isNaN(bin1) || isNaN(bin2)) {                       // mais uma verificao de segurança
        resultadoBin.value = "Erro interno";
        return;
    }

    let res;                                       // crio a variavel res

    if (operacao === "soma") res = bin1 + bin2;                     // aqui tem as opercao 
    if (operacao === "subtrair") res = bin1 - bin2;
    if (operacao === "multiplicar") res = bin1 * bin2;

    if (operacao === "dividir") {
        if (bin2 === 0) {
            resultadoBin.value = "Erro: divisão por zero";
            return;
        }
        res = Math.floor(bin1 / bin2);           // o math pra deixar o numero inteiro sem varias casas decimas e virulas.
    }

    if (operacao === "resto") {
        if (bin2 === 0) {
            resultadoBin.value = "Erro: divisão por zero";
            return;
        }
        res = bin1 % bin2;
    }


   let negativo = res < 0;                                  // Verifica se o resultado é negativo. Se res for menor que 0, negativo fica true, senão fica false.
let overflow = Math.abs(res) > 255;                               // Math.abs pega o valor sem sinal e verifica se o resultado passa de 255, que é o máximo de 8 bits, se passar overflow fica verdadeiro
res = Math.abs(res) & 0xFF;                                 // O & 0xFF é uma operação binária que limita o resultado a 8 bits, corta tudo q passar de 255
let binario = res.toString(2).padStart(8, "0");              //toString(2) converte o número pra binário, padStart(8, "0") garante que sempre vai ter 8 dígitos entao completa com zero

resultadoBin.value = negativo ? "-" + binario : binario;       // se o resultado for negativo, exibe o sinal de - antes do binário, caso contrário exibe só o binário
if (overflow) resultadoBin.value += " (overflow 8 bits)";  // se o resultado ultrapassar 8 bits, adiciona um aviso de overflow no resultado

  
    const item2 = {
        tipo: "binario",
        operacao: operacao,
        valor1: bnum1.value,
        valor2: bnum2.value,
        resultado: binario
    }
    historico.push(item2)        
    salvarNumeros()
    mostrarHistorico()
}

document.getElementById("binSomar").addEventListener("click", () => calcularBin("soma"));
document.getElementById("binSubtrair").addEventListener("click", () => calcularBin("subtrair"));
document.getElementById("binMultiplicar").addEventListener("click", () => calcularBin("multiplicar"));
document.getElementById("binDividir").addEventListener("click", () => calcularBin("dividir"));
document.getElementById("binResto").addEventListener("click", () => calcularBin("resto"));

function salvarNumeros() {
    localStorage.setItem("historico", JSON.stringify(historico))  // salva as operacoes ja feita no localstorage em formato de json

}
function carregarHistorico() {                       // busca o historico salvo no localStorage e carrega no array
    const dados = localStorage.getItem("historico");

    if (dados) {
        historico = JSON.parse(dados);
    }
}
function mostrarHistorico() {                     // percorre o array historico e exibe cada operacao na tela

    let guardar = document.getElementById("historico");
    guardar.innerHTML = "";
    historico.forEach((item) => {
        let simbolo = ""
        if (item.operacao === "soma") {
            simbolo = "+"
        }
        else if (item.operacao === "subtrair") {
            simbolo = "-"
        }
        else if (item.operacao === "multiplicar") {
            simbolo = "*"
        }
        else if (item.operacao === "dividir") {
            simbolo = "/"
        }
       else if (item.operacao === "resto") {
    simbolo = "%"
}
        let texto = "[" + item.tipo + "] " + item.valor1 + " " + simbolo + " " + item.valor2 + " = " + item.resultado;
        guardar.innerHTML += texto + "<br>";
    })
}



function limparLista() {            // esvazia o array historico, atualiza a tela e salva no localStorage
    historico.length = 0
    mostrarHistorico()  
      salvarNumeros()
}


window.onload = function() {
    carregarHistorico()
    mostrarHistorico()
}
