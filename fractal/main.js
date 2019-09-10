
let ilkkare = [
    {x: 350, y:400},
    {x: 450, y:400},
    {x: 450, y:500},
    {x: 350, y:500},
]

let cizilecekler = [ilkkare]

let iterasyon = 0

function setup() {
    createCanvas(800, 600)
    frameRate(2)

    let renk = color( renkVer() )
    fill(renk)
    stroke(renk)
    rect(350, 500, 100, 100)
}

function draw() {

    hepsiniCiz()
    sonrakileriHesapla()
    iterasyon++

    if (iterasyon > 30) {
        noLoop()
    }
    
}

function karedenUcgene(a, b, c, d) {
    let e = cikarma(b, d)
    e = katsayi(e, .5)
    e = toplama(a, e)

    return [a, b, e]
}

function ucgendenKarelere(a, b, e) {
    let f = cikarma(e, b)
    f = toplama(a, f)

    let g = cikarma(e, b)
    g = toplama(e, g)

    let h = cikarma(e, a)
    h = toplama(e, h)

    let i = cikarma(e, a)
    i = toplama(b, i)

    return [[f, g, e, a], [h, i, b, e]]
}

function toplama(a, b) {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    }
}
function cikarma(a, b) {
    return {
        x: a.x - b.x,
        y: a.y - b.y
    }
}
function katsayi(a, k) {
    return {
        x: a.x * k,
        y: a.y * k
    }
}

function renkVer () {
    if (iterasyon <= 5) {
        return [160-iterasyon*12, 80-iterasyon*12, 0]
    }
    else if (iterasyon > 5 && iterasyon <= 20) {
        return [80-iterasyon*4, 250-iterasyon*4, 0]
    }
    else {
        return [0, 250-iterasyon*4, 0]
    }
}


function hepsiniCiz() {
    for (let i = 0; i<cizilecekler.length; i++) {
        let simdiki = cizilecekler[i]
        
        let renk = color( renkVer() )
        fill(renk)
        stroke(renk)

        // ucgense
        if (simdiki.length == 3) {
            triangle( simdiki[0].x, simdiki[0].y,
                simdiki[1].x, simdiki[1].y,
                simdiki[2].x, simdiki[2].y)
        }
        // kareyse
        else {
            quad( simdiki[0].x, simdiki[0].y,
                simdiki[1].x, simdiki[1].y,
                simdiki[2].x, simdiki[2].y,
                simdiki[3].x, simdiki[3].y)
        }

    }
}

function sonrakileriHesapla() {
    let yeniler = []

    for (let i = 0; i<cizilecekler.length; i++) {
        let simdiki = cizilecekler[i]

        // kareyse bir ucgen ver
        if (simdiki.length == 4) {
            yeniler[ yeniler.length ] = karedenUcgene( simdiki[0], simdiki[1], simdiki[2], simdiki[3] )
        }
        
        // ucgense iki kare ver
        else {
            let kareler = ucgendenKarelere( simdiki[0], simdiki[1], simdiki[2] )
            yeniler [ yeniler.length ] = kareler[0]
            yeniler [ yeniler.length ] = kareler[1]
        }
    }

    cizilecekler = yeniler
}