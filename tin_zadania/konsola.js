// zadanie 1
function czyTrojkaPitagorejska(a, b, c) {
    return a * a + b * b === c * c;
}

// zadanie2
function* zadanie2_generator(a, b, c) {
    for (x = 0; x < b; x++) {
        if (x % c === 0) {
            yield x;
        }
    }
}

// zadanie2 - bez generatora
function zadanie2(a, b, c) {
    let result = []
    for (let x = 0; x < b; x++) {
        if (x % c === 0) {
            result.push(x)
        }
    }

    return result;
}

// zadanie3 - tabliczka mnożenia
function tabliczka_mnozenia(a) {
    console.log(tabliczka_naglowek(a))

    for (let y = 1; y <= a; y++) {
        let wiersz = ` ${y} `;

        for (let x = 1; x <= a; x++) {
            wiersz += align(x * y);
        }

        console.log(wiersz)
    }
}

function tabliczka_naglowek(a) {
    let wiersz = "   "
    for (let i = 1; i <= a; i++) {
        wiersz += align(i)
    }

    return wiersz;
}

function align(a, w = 5) {
    let length = a.toString().length;
    let delta = w - length - 1;

    let wiersz = ' ';
    wiersz += a.toString();

    for (let i = 0; i < delta; i++) {
        wiersz += ' ';
    }

    return wiersz;
}
//koniec zadanie 3

//    1   
//   1 1  
//  1 2 1 
// 1 3 3 1

// (h - 1)  * 2 + 1
// zadanie 4 - trojkat pascala

function trojkat_pascala_print(h) {
    let tablica = trojkat_pascala(h);
    let szerokosc = szerokosc_pascal(h);

    for (let i = 0; i < h; i++) {
        let res = "";

        let wiersz = tablica[i]
        let szerokosc_biezaca = szerokosc_pascal(i + 1)
        let spacje = (szerokosc - szerokosc_biezaca) / 2

        res += n_chars(spacje);

        wiersz.forEach(x => res += ` ${x}`);

        res += n_chars(spacje);
        console.log(res);
    }
}

function n_chars(n, c = ' ') {
    let res = "";
    for (let i = 0; i < n; i++) {
        res += c;
    }
    return res;
}

function szerokosc_pascal(i) {
    return (i - 1) * 2 + 1;
}

function trojkat_pascala(h) {
    let result = [
        [1],
        [1, 1]
    ]

    for (let i = 3; i <= h; i++) {
        let wiersz = []
        let poprzedni = result[i - 2]

        for (let n = 0; n < i; n++) {
            let wynik = (poprzedni[n - 1] || 0) + (poprzedni[n] || 0)
            wiersz.push(wynik)
        }

        result.push(wiersz)
    }

    return result;
}

// koniec zadanie 4

// zadanie 5 - choinka
function rysujChoinke(h, noc = false) {
    let max_szerokosc = szerokosc_pascal(h)

    for (let i = 1; i <= h; i++) {
        let szerokosc_biezaca = szerokosc_pascal(i)
        let spacje = (max_szerokosc - szerokosc_biezaca) / 2

        let bg_char = noc ? 'X' : ' '
        let fg_char = noc ? '  ' : 'X '

        let wiersz = n_chars(spacje, bg_char)
        wiersz += n_chars(i, fg_char)
        wiersz += n_chars(spacje, bg_char)
        console.log(wiersz)
    }
}
// koniec zadanie 5

// zadanie 6
// prostokat, trapez, rownoleglobok, trojkat
function policzPole(typ, callback, ...args) {
    let prostokat = (a, b) => a * b;
    let trapez = (a, b, h) => ((a + b) * h) / 2;
    let rownoleglobok = (a, h) => (a * h) / 2;
    let trojkat = (a, h) => (a * h) / 2;

    let wynik = eval(typ)(...args);

    callback(wynik)
}
// koniec zadanie 6

function jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
}

// zadanie 7
function powiekszCene(obj) {
    let mutated = jsonCopy(obj);
    mutated.cena_wyjsciowa += 1000;
    return mutated;
}

function pomniejszOLata(obj) {
    let mutated = jsonCopy(obj);
    const currentYear = new Date().getFullYear();

    mutated.cena_koncowa -= 1000 * (currentYear - mutated.rok);
    return mutated;
}

function pomniejszOPrzebieg(obj) {
    let mutated = jsonCopy(obj);
    const currentYear = new Date().getFullYear();

    mutated.cena_koncowa -= (obj.przebieg / 100000) * 10000;
    return mutated;
}

function dopiszPrzebiegRok(obj, przebieg, rok) {
    let mutated = jsonCopy(obj);
    mutated.rok = rok;
    mutated.przebieg = przebieg;

    mutated = pomniejszOPrzebieg(obj);
    mutated = pomniejszOLata(obj);

    return mutated;
}

let samochody = [
    { rok: 2008, przebieg: 135699, cena_wyjsciowa: 56201, cena_koncowa: 56201 },
    { rok: 2013, przebieg: 105600, cena_wyjsciowa: 26201, cena_koncowa: 26201 }
]

function dopiszJezeliCena(obj) {
    if (obj.cena_koncowa > 10000) {
        samochody.push(obj)
    }
}

function zwiekszRokOJeden() {
    samochody.forEach(s => s.rok += 1);
}

function zbudujTabelke() {
    let tabelka = document.getElementById("samochody");

    tabelka.appendChild(zbudujHeader());
    tabelka.appendChild(zbudujBody());
}

function zbudujHeader() {
    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");

    Object.keys(samochody[0]).forEach(key => {
        let th = document.createElement("th");
        th.innerText = key;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    return thead;
}

function zbudujBody() {
    let tbody = document.createElement("tbody");

    let klucze = Object.keys(samochody[0]);
    samochody.forEach(s => {
        let row = document.createElement("tr");
        tbody.appendChild(row);

        klucze.forEach(x => {
            let td = document.createElement("td");

            td.innerText = s[x];

            row.appendChild(td);
        });
    })

    return tbody;
}


// koniec zadanie 7

rysujChoinke(5);
rysujChoinke(5, true);
zbudujTabelke();