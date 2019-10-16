
// Soru:
// Elimizde toplam gecen sureyi saniye cinsinde temsil eden bir saniye degiskeni olsun. Icinde de bir sayi olsun. Bu sureyi, saniye cinsinden saat,dakika,saniye cinsine ceviren program. Amac h (saat), m (dakika), s (saniye) degiskenlerini doldurmak.

// ornegin, saniye = 100 ise, h = 0, m = 1, s = 40

let saniye, h, m, s
saniye = 100

//Cozum:

let kalan

kalan = saniye % 3600
h = ( saniye - kalan ) / 3600

saniye = kalan
kalan = undefined

kalan = saniye % 60
m = ( saniye - kalan ) / 60

s = kalan

