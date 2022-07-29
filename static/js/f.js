function _cpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf == "") return false;
    if (
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999"
    )
        return false;
    add = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
}
function validarCPF(el) {
    if (!_cpf(el.value)) {
        alert("CPF inválido!");
        el.value = "";
    }
}
function _cnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");
    if (cnpj == "") return false;
    if (cnpj.length != 14) return false;
    if (
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999"
    )
        return false;
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;
    return true;
}
function validarCNPJ(el) {
    if (!_cnpj(el.value)) {
        alert("CNPJ inválido!");
        el.value = "";
    }
}
function selecionarCPF(){
    document.getElementById("cpf").required = true;
    document.getElementById("rg").required = true;
    document.getElementById("dataNascimento").required = true;
    document.getElementById("cnpj").required = false;
    document.getElementById("ie").required = false;
}
function selecionarCNPJ(){
    document.getElementById("cpf").required = false;
    document.getElementById("rg").required = false;
    document.getElementById("dataNascimento").required = false;
    document.getElementById("cnpj").required = true;
    document.getElementById("ie").required = true;
}
function MascaraInteiro(num) {
    var er = /[^0-9]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        ///verifica se é string, caso seja então apaga
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
        return false;
    } else {
        return true;
    }
}
function MascaraFloat(num) {
    var er = /[^0-9.,]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        ///verifica se é string, caso seja então apaga
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
        return false;
    } else {
        return true;
    }
}
//formata de forma generica os campos
function formataCampo(campo, Mascara) {
    var er = /[^0-9/ (),.-]/;
    er.lastIndex = 0;

    if (er.test(campo.value)) {
        ///verifica se é string, caso seja então apaga
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
    }
    var boleanoMascara;
    var exp = /\-|\.|\/|\(|\)| /g;
    var campoSoNumeros = campo.value.toString().replace(exp, "");
    var posicaoCampo = 0;
    var NovoValorCampo = "";
    var TamanhoMascara = campoSoNumeros.length;
    for (var i = 0; i <= TamanhoMascara; i++) {
        boleanoMascara = Mascara.charAt(i) == "-" || Mascara.charAt(i) == "." || Mascara.charAt(i) == "/";
        boleanoMascara = boleanoMascara || Mascara.charAt(i) == "(" || Mascara.charAt(i) == ")" || Mascara.charAt(i) == " ";
        if (boleanoMascara) {
            NovoValorCampo += Mascara.charAt(i);
            TamanhoMascara++;
        } else {
            NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
            posicaoCampo++;
        }
    }
    campo.value = NovoValorCampo;
    ////LIMITAR TAMANHO DE CARACTERES NO CAMPO DE ACORDO COM A MASCARA//
    if (campo.value.length > Mascara.length) {
        var texto = $(campo).val();
        $(campo).val(texto.substring(0, texto.length - 1));
    }
    //////////////
    return true;
}

function MascaraMoeda(i) {
    var v = i.value.replace(/\D/g, "");
    v = (v / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    i.value = v;
}

//function MascaraGenerica(seletor, tipoMascara) {
//    setTimeout(function () {
//        if (tipoMascara == "CPFCNPJ") {
//            if (seletor.value.length <= 14) {
                //cpf
//                formataCampo(seletor, "000.000.000-00");
//            } else {
                //cnpj
//                formataCampo(seletor, "00.000.000/0000-00");
//            }
//        } else if (tipoMascara == "DATA") {
//            formataCampo(seletor, "00/00/0000");
//        } else if (tipoMascara == "CEP") {
//            formataCampo(seletor, "00.000-000");
//        } else if (tipoMascara == "TELEFONE") {
//            formataCampo(seletor, "(00) 000000000");
//        } else if (tipoMascara == "INTEIRO") {
//           MascaraInteiro(seletor);
//        } else if (tipoMascara == "FLOAT") {
//            MascaraFloat(seletor);
//        } else if (tipoMascara == "CPF") {
//            formataCampo(seletor, "000.000.000-00");
//        } else if (tipoMascara == "CNPJ") {
//            formataCampo(seletor, "00.000.000/0000-00");
//        } else if (tipoMascara == "MOEDA") {
//            MascaraMoeda(seletor);
//        }
//    }, 200);
//}
(function( $ ) {
    $(function() {
      $('.date').mask('00/00/0000');
      $('.time').mask('00:00:00');
      $('.date_time').mask('00/00/0000 00:00:00');
      $('.cep').mask('00000-000');
      $('.phone').mask('0000-0000');
      $('.phone_with_ddd').mask('(00) 0000-0000');
      $('.phone_us').mask('(000) 000-0000');
      $('.mixed').mask('AAA 000-S0S');
      $('.ip_address').mask('099.099.099.099');
      $('.percent').mask('##0,00%', {reverse: true});
      $('.clear-if-not-match').mask("00/00/0000", {clearIfNotMatch: true});
      $('.placeholder').mask("00/00/0000", {placeholder: "__/__/____"});
      $('.fallback').mask("00r00r0000", {
        translation: {
          'r': {
            pattern: /[\/]/,
            fallback: '/'
          },
          placeholder: "__/__/____"
        }
      });
  
      $('.selectonfocus').mask("00/00/0000", {selectOnFocus: true});
  
      $('.cep_with_callback').mask('00000-000', {onComplete: function(cep) {
          console.log('Mask is done!:', cep);
        },
         onKeyPress: function(cep, event, currentField, options){
          console.log('An key was pressed!:', cep, ' event: ', event, 'currentField: ', currentField.attr('class'), ' options: ', options);
        },
        onInvalid: function(val, e, field, invalid, options){
          var error = invalid[0];
          console.log ("Digit: ", error.v, " is invalid for the position: ", error.p, ". We expect something like: ", error.e);
        }
      });
  
      $('.crazy_cep').mask('00000-000', {onKeyPress: function(cep, e, field, options){
        var masks = ['00000-000', '0-00-00-00'];
          mask = (cep.length>7) ? masks[1] : masks[0];
        $('.crazy_cep').mask(mask, options);
      }});
  
      $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
      $('.cpf').mask('000.000.000-00', {reverse: true});
      $('.money').mask('#.##0,00', {reverse: true});
  
      var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
      },
      spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
          }
      };
  
      $('.sp_celphones').mask(SPMaskBehavior, spOptions);
  
      $(".bt-mask-it").click(function(){
        $(".mask-on-div").mask("000.000.000-00");
        $(".mask-on-div").fadeOut(500).fadeIn(500)
      })
  
      $('pre').each(function(i, e) {hljs.highlightBlock(e)});
    });
  })(jQuery);