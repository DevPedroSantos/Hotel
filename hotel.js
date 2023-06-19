var hotel = prompt("Olá! Seja bem-vindo(a)! Qual será o nome do hotel?") || "StarsInSky";
var username = prompt(`Olá! Sistema do Hotel ${hotel}\nQual seu usuário?`);
var password = prompt(`Certo ${username}, digite a sua senha:`);



while(password !== "2678") {
    alert(`Ops! ${username}, não foi possível achar um login válido!`);
    username = prompt(`Digite seu usuário novamente:`);
    password = prompt(`${username}, digite sua senha novamente:`);
}

function inicio() {
    var option = parseInt(prompt(`Bem vindo ao Hotel ${hotel}, ${username}! É um imenso prazer ter você por aqui.\nSelecione uma opção 
    1.) Reserva de Quartos\n 
    2.) Cadastro de Hóspedes\n 
    3.) Cadastro avançado\n
    4.) Evento\n
    5.) Buffet\n
    6.) Auditorio\n
    7.) Restaurante\n
    8.) Abastecer Veiculo\n
    9.) Manutenção do Ar\n
    10.) Sair`));

    switch (option) {
        case 1:
            reserva_quartos();
            break;
        case 2:
            cadastro_hospedes();
            break;
        case 3:
            cadastro_avancado();
            break;
        case 4:
            evento()
            break;
        case 5:
            buffet()
            break;
        case 6:
            auditorios();
            break;
        case 7:
            restaurante();
            break;
        case 8:
            abastecer_carros();
            break;
        case 9:
            manutencao_ar();
            break;
        case 10:
            alert(`Muito obrigado e até logo ${username}`);
            sair();
            break;
        default:
            erro();
            break;
    }

}		

function reserva_quartos() {
    var rateDaily = parseFloat(prompt("Qual o valor padrão da diária?"));
    while(!rateDaily || rateDaily <= 0) {
        rateDaily = parseFloat(prompt(`Ops! 0 valor ${rateDaily} é inválido, ${username}! Tente novamente:`));
    }

    var daily = parseInt(prompt("Quantas diárias serão necessárias?"));
    while(!daily || daily <= 0 || daily > 30) {
        daily = parseInt(prompt(alert(`Ops! A diaria ${daily} é inválida, ${username}! Tente novamente:`)));
    }
    
    alert(`O valor de ${daily} dia${daily > 1 ? "s" : ""} de hospedagem é de: ${Number(daily * rateDaily).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}`);
    var guest = prompt("Qual o nome do hóspede?") || "Não definido";
    var finalize = prompt(`${username}, você confirma a hospedagem para ${guest} por ${daily} dia${daily > 1 ? "s" : ""}? (S/N)`);

    switch(finalize.toLocaleLowerCase()) {
        case 's':
            alert(`Tudo certo, ${username}. A reserva de ${guest} por ${Number(daily * rateDaily).toLocaleString("pt-br", { style: "currency", currency: "BRL" })} foi efetuado com sucesso!`);
            break;
        case "n":
            alert(`Ok, ${username}! O cancelamento da reserva foi efetuado com sucesso.`);
            break;
        default:
            alert(`Ops! Opção invalida, tente novamente.`);
            reserva_quartos();
            break;
    }

    inicio();
}

function cadastro_hospedes() {
    var stop = 1;
    var rateDaily = parseFloat(prompt(`${username}, qual o valor padrão da diária?`));
    while(!rateDaily || rateDaily <= 0) {
        rateDaily = parseFloat(prompt(`Ops! 0 valor ${rateDaily} é inválido, ${username}! Tente novamente:`));
    }

    var free = 0;
    var meia = 0;
    var inteira = 0;


    while(stop) {
        var user = prompt("Qual o nome do Hóspede?");
        if(user.toLocaleLowerCase() == "pare") {
            break;
        } else if (!user) {
            alert(`Ops! Não foi possível cadastrar o hóspede! Tente novamente`);
            cadastro_hospedes();
        }

        var age = parseInt(prompt("Qual a idade do hóspede?"));

        while(!age) {
            age = parseInt(prompt("Digite uma idade válida:"));
        }

        if(age >= 0 && age <=6) {
            free++;
            alert(`${user} cadastrado(a) com sucesso.\n${user} tem gratuidade.`);
        } else if(age >= 60) {
            meia++;
            alert(`${user} cadastrado(a) com sucesso.\n${user} tem direito a meia.`);
        } else {
            inteira++;
            alert(`${user} cadastrado(a) com sucesso..`);
        }
    }

    alert(`${username}, o valor total das hospedagens é: ${((rateDaily * (inteira > 0 ? inteira : 1)) + ((rateDaily / 2) * meia)).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}; ${meia > 0 ? meia : "Nenhuma"} gratuidade(s); ${meia > 0 ? meia : "Nenhuma"} meia(s)`);
    inicio();
}

function cadastro_avancado() {
    var guests = [];
    var option = 0;
    
    while(option !== 4) {
        option = parseInt(prompt(`HOTEL - ${hotel} | Cadastro detalhado\nSelecione uma opção: 1. Cadastrar\n2. Pesquisar\n3. Listar\n4. Sair`)) || 0;

        switch (option) {
            case 1:
                if(guests.length == 15) return alert("Ops! O máximo de cadastros foi atingindo");
                var name = prompt("Qual o nome do Hóspede?");
                while(!name) {
                    name = prompt("Digite um nome válido:");
                }
                guests.push(name);
                alert(`Hópede ${name} cadastrado(a) com sucesso!`);
                break;
            case 2:
                var name = prompt("Qual o nome do Hóspede que deseja pesquisar?");
                while(!name) {
                    name = prompt("Digite um nome válido:");
                }
                alert(guests.filter(guest => guest.toLocaleLowerCase() == name.toLocaleLowerCase())[0] ? `Hóspede ${name} foi encontrado(a)!` : `Hóspede ${name} não foi encontrado(a)!`)
                break;
            case 3:
                alert("Lista dos hóspedes:\n" + guests.join("\n"));
                break;
            default:
                break;
        }
    }

    inicio();
}

function evento() {
    const waiterPerHour = 10.50;
    var waiter = parseInt(prompt(`HOTEL - ${hotel} | Evento\nQuantos garçons serão necessários?`));
    var hours = parseInt(prompt("Qual a duração do evento? Em horas:"));
    while(hours <= 0 || !hours) {
        hours = parseInt(prompt(`Ops! Digite uma quantidade de horas maior que 0:`));
    }
    while(waiter < 0 || !waiter) {
        waiter = parseInt(prompt("Ops! Digite uma quantidade de garçom válida:"))
    }

    if(prompt(`O Custo ficou de: ${Number(waiterPerHour * waiter * hours).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}\nVocê gostaria de efetuar a reserva? (S/N)`).toLocaleLowerCase() == 's') {
        alert(`${username}, reserva efetuada com sucesso.`);
    } else {
        alert(`${username}, reserva cancelada.`);
    }

    inicio();
}

function buffet() {
    var guests = parseInt(prompt(`HOTEL - ${hotel} | Buffet\nQuantos convidados para o evento?`));
    const [amountCoffee, costCoffee] = [0.2, 0.8];
    const [amountWater, costWater] = [0.5, 0.4];
    const [amountSavory, costSavory] = [7, 34];

    while(!guests) {
        guests = parseInt(prompt("Digite uma quantidade de convidados válida:"));
    }

    while(guests > 350 || guests <= 0) {
        guests = parseInt(prompt("Quantidade de convidados superior à capacidade máxima.\Desejas convidar quantas pessoas o evento?"));
    }

    const totalCoffee = amountCoffee * guests;
    const totalWater = amountWater * guests;
    const totalSavory = amountSavory * guests;

    alert(`O evento precisará de ${totalCoffee} litros de café, ${totalWater} litros de água e ${totalSavory} salgados. O custo total será de: ${Number(totalCoffee * costCoffee + totalWater * costWater + (totalSavory / 100) * costSavory).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}`);

    if(prompt("Gostaria de efetuar a reserva? (S/N)").toLocaleLowerCase() == "s") {
        alert(`${username}, reserva efetuava com sucesso!`);
    } else {
        alert(`${username}, reserva cancelada!`);
    }

    inicio()
}

function auditorios() {
    var guests = parseInt(prompt(`HOTEL - ${hotel} | Buffet\nQuantos convidados para o evento?`));

    while(guests > 350 || guests <= 0) {
        guests = parseInt(prompt("Quantidade de convidados superior à capacidade máxima.\Desejas convidar quantas pessoas o evento?"));
    }

    if(guests <= 220) {
        if(prompt(`Use o auditório Laranja (Inclua mais ${guests - 150 < 0 ? (guests - 150) * -1 : guests - 150} cadeiras)\nGostaria de efetuar a reserva? (S/N)`).toLocaleLowerCase() == "s") {
            alert(`${username}, reserva efetuada com sucesso.`);
        } else {
            alert(`${username}, reserva cancelada!`);
        }
    } else if(guests <= 350) {
        if(prompt(`Use o auditório Colorado\nGostaria de efetuar a reserva? (S/N)`).toLocaleLowerCase() == "s") {
            alert(`${username}, reserva efetuada com sucesso.`);
        } else {
            alert(`${username}, reserva cancelada!`);
        }
    }

    inicio()
}

function restaurante() {
    var day = prompt(`HOTEL ${hotel} | Restaurante\nQual o dia do seu evento?`).toLocaleLowerCase();
    while(!day) {
        day = prompt("Digite um dia da semana válida:");
    }
    var hours = parseInt(prompt("Qual o horario do seu evento?"));
    while(!hours || hours <= 0) {
        hours = parseInt(prompt("Digite um horario válido:"));
    }

    if(day == "sabado" || day == "domingo" && hours <= 7 || hours >= 15) {
        alert("Restaurante indiponível.");
        inicio();
    } else if(day !== "sabado" || day !== "domingo" && hours >= 7 || hours <= 23) {
        var company = prompt("Qual o nome da empresa?");
        alert(`Restaurante reservado para ${company}. ${day} às ${hours}hs.`);
    }

    inicio();
}

function abastecer_carros() {
    var wayneAlcool = parseInt(prompt(`HOTEL - ${hotel} | Abastecer\nQual o valor do álcool no posto Wayne Oil?`));
    var wayneGasolina = parseInt(prompt(`Qual o valor da gasolina no posto Wayne Oil?`));
    var StarkAlcool = parseInt(prompt(`Qual o valor do álcool no posto Stark Petrol?`));
    var StarkGasolina = parseInt(prompt(`Qual o valor da gasolina no posto Stark Petrol?`));

    if(wayneAlcool <= 0 || wayneGasolina <= 0 || StarkAlcool <= 0 || StarkGasolina <= 0 || !wayneAlcool || !wayneGasolina || !StarkAlcool || !StarkGasolina) {
        alert("Valor invalido! Tente novamente");
        abastecer_carros()
    }

    const [totalAlcoolWayne, totalGasolinaWayne, totalAlcoolStark, totalGasolinaStark] = [wayneAlcool * 42, wayneGasolina * 42, StarkAlcool * 42, StarkGasolina * 42];
    var type;

    if((wayneAlcool / wayneGasolina) <= 0.7 || (StarkAlcool / wayneGasolina) <= 0.7) {
        type = "álcool";
    } else {
        type = "gasolina";
    }

    var posto;
    if(totalAlcoolWayne + totalGasolinaWayne <= totalAlcoolStark + totalGasolinaStark) {
        posto = "Wayne Oil";
    } else {
        posto = 'Stark Petrol';
    }

    alert(`${username}, é mais barato abastecer com ${type} no posto ${posto}`);
    inicio();
}

function manutencao_ar() {
    var stop = 1;
    var companies = [];

   while(stop) {
        var companie = prompt(`Qual o nome da empresa?`) || `Empresa ${companies.length + 1}`;
        var pricePerDevice = parseFloat(prompt("Qual o valor por aparelho?"));
        while(pricePerDevice < 0 || !pricePerDevice) {
            pricePerDevice = parseFloat(prompt("Ops! Digite um valor valido:"));
        }
        var device = parseInt(prompt("Qual a quantidade de aparelho?"));
        while(device < 0 || !device) {
            device = parseFloat(prompt("Ops! Digite um valor valido:"));
        }
        var discount = parseFloat(prompt("Qual a porcentagem de desconto?")) || 0; 
        var minDeviceDiscount = parseInt(prompt("Qual o número de aparelhos para consegui o desconto?")) || 0;

        var budget = device >= minDeviceDiscount ? (pricePerDevice * device) * ((100 - discount) / 100) : pricePerDevice * device;

        companies.push({companie, budget});
        alert(`O serviço da ${companie} custará ${budget.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}`)
        if(prompt(`Deseja informar novos dados, ${username}? (S/N)`).toLocaleLowerCase() == "n") {
            stop = 0;
        }
   }

   const melhorOrçamento = companies.reduce((a, b) => {
    return a.budget < b.budget ? a : b;
   })

   alert(`O orçamento de menor valor é o: ${melhorOrçamento.companie} por ${melhorOrçamento.budget.toLocaleString("pt-br", {styles: "currency", currency: "BRL"})}`);
   inicio();
}

function erro() {
    alert('Por favor, informe um número entre 1 e 10');
    inicio();
}

function sair() {
    var confirma = confirm('Você deseja sair?');
    if (confirma) {
        window.open("", "_blank", "");
        window.close();
    } else {
        inicio();
    }
}

inicio();