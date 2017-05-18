import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import * as _ from 'ramda';
import './App.css';
import isMobile from 'ismobilejs'
import FlareCard from './FlareCard';
import AlienSheet from './AlienSheet';

const cosmicFlaresData = [{"name":"Amoeba","color":"Yellow","power":"Wild","who":"Main","when":"Planning","text":"Ennen yhteenottokorttien valintaa, voit lisätä tai vähentää yhteenotossa olevien alustesi määrää enintään neljällä. Sinulla voi näin olla enemmän kuin neljä alusta yhteenotossa."},
{"name":"Amoeba","color":"Yellow","power":"Super","who":"Ally","when":"Planning","text":"Voit käyttää kykyäsi ollessasi liittolainen"},
{"name":"Anti-Matter","color":"Yellow","power":"Wild","who":"Main, Ally","when":"Any","text":"Ollessasi pääpelaaja tai liittolainen, kun toinen pelaaja yrittää käyttää yleisflarea, voit estää tämän. Voi käyttää vain yhtä flarea vastaan per yhteenotto."},
{"name":"Anti-Matter","color":"Yellow","power":"Super","who":"Any","when":"Any","text":"Kun toinen pelaaja yrittää käyttää yleis- tai superflarea, voit estää tämän. Käytä vain yhtä flarea vastaan per yhteenotto."},
{"name":"Barbarian","color":"Green","power":"Wild","who":"Main, Ally","when":"Resolution","text":"Kun saat joko hyvitystä tai palkinnon, voit katsoa kaikki saamasi kortit ja pistää pois ne kortit, mitä et halua"},
{"name":"Barbarian","color":"Green","power":"Super","who":"Offensive ally","when":"Resolution","text":"Voit käyttää kykyäsi hyökkäyksen liittolaisena, jos puolesi voittaa. Voit silloin ryöstää puolustavan pelaajan kortit."},
{"name":"Calculator","color":"Yellow","power":"Wild","who":"Main","when":"Planning","text":"Pääpelaajana, yhteenottokorttien valitsemisen jälkeen, mutta ennen niiden paljastamista, voit sanoa joko 'pariton' tai 'parillinen'. Jos molemmat kortit paljastuvat hyökkäyskorteiksi ja arvasit niiden summan parillisuuden tai parittomuuden oikein, vastustajasi kortin arvo vähennetään sinun korttisi arvolla. Jos olit väärässä, sinun korttisi arvosta vähennetään vastustajan kortin arvo."},
{"name":"Calculator","color":"Yellow","power":"Super","who":"Ally","when":"Planning","text":"Voit käyttää kykyäsi ollessasi liittolainen."},
{"name":"Chosen","color":"Green","power":"Wild","who":"Main","when":"Planning","text":"Ennen yhteenottokorttien valintaa, voit ottaa kortin pakasta."},
{"name":"Chosen","color":"Green","power":"Super","who":"Main","when":"Reveal","text":"Kun nostat pakasta apukortteja, voit halutessasi ottaa kortteihisi muita kuin yhteenottokortteja."},
{"name":"Citadel","color":"Voit kertoa hyökkäyskorttisi arvon kaikkien puolellasi olevien alusten lukumäärällä (ei pelkästään omien alustesi määrällä).","power":"Wild","who":"Main, Ally","when":"Reveal","text":"Kun yhteenottokortit on paljastettu, voit lisätä 5 puolustuksen tulokseen."},
{"name":"Citadel","color":"Red","power":"Super","who":"Any","when":"Planning","text":"Kun aktivoit linnoituksesi, ne voivat joko lisätä puolustuksen tulokseen tai vähentää siitä. Linnoitukset laitetaan edelleen pois, jos puolustus häviää, vaikka niitä käytettäisiinkin vähentämään."},
{"name":"Clone","color":"Green","power":"Wild","who":"Any","when":"Any","text":"Sinun ei tarvitse heittää pois juuri pelaamaasi artifaktia. Voit pitää sen ja pelata myöhemmässä yhteenotossa."},
{"name":"Clone","color":"Green","power":"Super","who":"Main","when":"Resolution","text":"Hyvitystä ottaessasi voit halutessasi ottaa vastustajan kortteja enintään tuplamäärän (jos vastustajan kortit riittävät)."},
{"name":"Cudgel","color":"Green","power":"Wild","who":"Offense","when":"Resolution","text":"Kun hyökkääjänä saat uuden siirtokunnan, voit lähettää kaikki planeetalla olevat alukset warppiin. Tämä ei koske yhteenotossa olleiden liittolaisten aluksia."},
{"name":"Cudgel","color":"Green","power":"Super","who":"Main","when":"Resolution","text":"Kun käytät kykyäsi pelaajaan, se vaikuttaa myös valitsemiisi tämän pelaajan liittolaisiin. Jokainen heistä menettää yhteenotossa olleiden alustesi verran aluksia."},
{"name":"Dictator","color":"Red","power":"Wild","who":"Not Offense","when":"Destiny","text":"Kun destiny-kortti on katsottu, voit pakottaa hyökkääjän laittamaan destiny-kortin pois ja nostamaan uuden. Käytä tätä flarea vain kerran yhdessä yhteenotossa."},
{"name":"Dictator","color":"Red","power":"Super","who":"Offense","when":"Destiny","text":"Voit käyttää kykyäsi hyökkääjänä."},
{"name":"Fido","color":"Yellow","power":"Wild","who":"Main","when":"Planning","text":"Ennen yhteenottokorttien valitsemista voit pakottaa vastustajasi ottamaan poistopakan päällimmäisen kortin käteensä. Voit sitten ottaa pakasta kortin."},
{"name":"Fido","color":"Yellow","power":"Super","who":"Any","when":"Resolution","text":"Voit ottaa ottaa vaikka kaikki yhteenotossa käytetyt yhteenottokortit ja tarjota niitä yksi kerrallaan toisille pelaajille missä tahansa järjestyksessä."},
{"name":"Filch","color":"Green","power":"Wild","who":"Any","when":"Any","text":"Jos on pelattu artifakti tai flare, voit voit anastaa sen (yhden) laittamalla neuvottelu-kortin kädestäsi poistopakkaan. Anastetun kortin vaikutus peruuntuu ja se menee sinun käteesi."},
{"name":"Filch","color":"Green","power":"Super","who":"Any","when":"Resolution","text":"Voit anastaa toisen pelaajan käytetyn yhteenottokortin, vaikka et itse olisi mukana yhteenotossa."},
{"name":"Fodder","color":"Yellow","power":"Wild","who":"NOT Main, NOT Ally","when":"Reveal","text":"Yhteenottokorttien paljastamisen jäkeen, jos sinut kutsuttiin liittolaiseksi ja kieltäydyit, voit liittoutua yhdellä aluksella sen puolen kanssa, joka kutsui sinut."},
{"name":"Fodder","color":"Yellow","power":"Super","who":"Main","when":"Reveal","text":"Kun käytät kykyäsi, voit laittaa pois (ja lisätä) kaikki hyökkäykorttisi, jotka ovat vastustajasi korttia pienempiä, riippumatta siitä, mikä oma hyökkäyskorttisi oli."},
{"name":"Gambler","color":"Red","power":"Wild","who":"Main","when":"Reveal","text":"Ennen yhteenottokorttien paljastamista, voit lausua haluamasi suuruisen 'hajonnan'. Jos paljastetut kortit ovat molemmat hyökkäyskortteja, ja niiden erotus on vähintään se, mitä sanoit, lisää 'hajonta' korttisi arvoon."},
{"name":"Gambler","color":"Red","power":"Super","who":"Main","when":"Reveal","text":"Kun sanot, mikä korttisi on, voit 'nostaa panoksia' sanomalla kuinka monta ylimääräistä alusta on vaakalaudalla (1-20). Haasteen seuraamus kasvaa vastaavasti yhtä monella aluksella."},
{"name":"Grudge","color":"Red","power":"Wild","who":"Main","when":"Resolution","text":"Pääpelaajana, jos vastustajasi voittaa yhteenoton, liittolaiset eivät saa mitään voitosta, sen sijaan he palauttavat aluksensa siirtokuntiinsa."},
{"name":"Grudge","color":"Red","power":"Super","who":"Main","when":"Resolution","text":"Voit pakottaa jokaisen pelaajan, joka poistaa grudge merkin, menettämään neljä alusta warppiin riippumatta siitä, voititko yhteenoton."},
{"name":"Hacker","color":"Green","power":"Wild","who":"Main","when":"Resolution","text":"Voit estää sen, että vastustajasi ottaa sinulta hyvityksen."},
{"name":"Hacker","color":"Green","power":"Super","who":"Main","when":"Resolution","text":"Sen jälkeen, kun olet ottanut hyvityksen valitsemaltasi pelaajalta, voit halutessasi antaa hänelle saman määrän kortteja omasta kädestäsi."},
{"name":"Hate","color":"Yellow","power":"Wild","who":"Main","when":"Planning","text":"Ennen yhteenottokorttien valintaa voit pakottaa vastustajasi heittämään pois satunnaisen kortin kädestään. Jos hänen käteensä ei jää yhteenottokortteja, voitat yhteenoton."},
{"name":"Hate","color":"Yellow","power":"Super","who":"Offense","when":"Start turn","text":"Sen sijaan, että käyttäisit kykyäsi laittamalla kortin pois, voit näyttää kortin muille ja sitten palauttaa sen käteesi."},
{"name":"Healer","color":"Yellow","power":"Wild","who":"Any","when":"Any","text":"Sinua vastaan pelattu kosminen tuho (ZAP) on halutessasi tehoton."},
{"name":"Healer","color":"Yellow","power":"Super","who":"Any","when":"Any","text":"Voit nostaa maksua toisten parantamisesta yhteen korttiin parannettua alusta kohden."},
{"name":"Human","color":"Yellow","power":"Wild","who":"Main","when":"Reveal","text":"Yhteenottokorttien paljastamisen jälken, jos vastustajasi ei ole Human, voit käyttää tätä flarea muuttamaan yhteenottokorttisi hyökkäys 42:ksi. Anna tämä flare Human-pelaajalle käytön jälkeen (tai laita pois, jos Human ei ole pelissä mukana)."},
{"name":"Human","color":"Yellow","power":"Super","who":"Main, Ally","when":"Reveal","text":"Voit käyttää voimaasi lisäämään 8 oman puolesi tulokseen (4:n sijaan). Voit myös laittaa tämän flaren pois tuhotaksesi (ZAP) oman kykysi."},
{"name":"Kamikaze","color":"Yellow","power":"Wild","who":"Main","when":"Planning","text":"Ennen yhteenottokorttien valitsemista, mutta ennen paljastamista, voit lähettää enintään neljä yhteenoton ulkopuolista alusta warppiin ja siten lisätä oman puolesi tulokseen 3 jokaista uhrattua alusta kohti."},
{"name":"Kamikaze","color":"Yellow","power":"Super","who":"Offense","when":"Regroup","text":"Voit ottaa kolme alusta (yhden sijaan) warpista."},
{"name":"Loser","color":"Green","power":"Wild","who":"Main","when":"Planning","text":"Ennen yhteenottokorttien valintaa voit sanoa, että molemmat puolet häviävät ja kaikki mukana olleet alukset joutuvat warppiin."},
{"name":"Loser","color":"Green","power":"Super","who":"Main","when":"Reveal","text":"Voit odottaa kunnes yhteenottokortit on valittu mutta ei vielä paljastettu ja vasta sen jälkeen julistaa upsetin (häiriö / yllätysvoitto). Näin ollen ei kummankaan puolen ei ole pakko pelata hyökkäyskorttia."},
{"name":"Machine","color":"Red","power":"Wild","who":"Offense","when":"Resolution","text":"Voit aloittaa toisen yhteenoton, vaikka ensimmäinen olisi epäonnistunut tai sinulla ei ole enää yhteenottokortteja. Jos sinulla ei ole yhteenotttokortteja, laita tämä flare sivuun ja nosta uusi käsi. Sen jälkeen tämä flare palaa takaisin käteesi."},
{"name":"Machine","color":"Red","power":"Super","who":"Offense","when":"Regroup","text":"Regroupin aikana voit nostaa kortin pakasta sen sijaan, että haet aluksen warpista."},
{"name":"Macron","color":"Green","power":"Wild","who":"Main, Ally","when":"Reveal","text":"Jos sinun puolesi paljastaa hyökkäyskortin, voit lisätä tulokseen +1 jokaista yhteenotossa olevaa alustasi kohti."},
{"name":"Macron","color":"Green","power":"Super","who":"Offense, Ally","when":"Launch,Alliance","text":"Voit lähettää enintään neljä alusta yhteenottoon."},
{"name":"Masochist","color":"Red","power":"Wild","who":"Any","when":"Regroup","text":"Regroup-vaiheessa voit valita toisen pelaajan (ei hyökkääjä). Tämä pelaaja noutaa aluksen warpista hyökkääjän sijaan. Et voi käyttää tätä korttia, jos hyökkääjä ei sitten pysty asettamaan alusta hyperavaruusportille."},
{"name":"Masochist","color":"Red","power":"Super","who":"Offence","when":"Regroup","text":"Regroupin aikana voit poistaa pelistä yhden warpissa olevista aluksistasi sen sijaan, että ottaisit sen normaalisti peliin."},
{"name":"Mind","color":"Yellow","power":"Wild","who":"Any","when":"Any","text":"Voit käyttä tätä flarea, kun joku pelaaja ottaa pakasta kortin. Yhteenoton loppuun saakka voit tarkastaa jokaisen kortin, jonka tuo pelaaja pakasta ottaa ja antaa sitten hänelle. Et voi kertoa toisille näkemästäsi kortista."},
{"name":"Mind","color":"Yellow","power":"Super","who":"NOT Main","when":"Alliance","text":"Kun käytät kykyäsi, voit katsoa kummankin pääpelaajan kortit."},
{"name":"Mirror","color":"Yellow","power":"Wild","who":"Main","when":"Reveal","text":"Yhteenottokorttien paljastamisen jälkeen voit vaihtaa yhteenottokorttisi täsmälleen samanlaiseen korttiin kuin vastustajasi kortti."},
{"name":"Mirror","color":"Yellow","power":"Super","who":"Main","when":"Planning","text":"Kun määräät numeroiden vaihdon, voit päättää koskeeko se sinun vai vastustajasi korttia."},
{"name":"Miser","color":"Green","power":"Wild","who":"Any","when":"Any","text":"Kun nostat uuden käden tai toinen pelaaja ottaa sinulta hyvityksen, voit laittaa tämän kortin ja kaksi muuta arvopuoli alaspäin eteesi myöhempää käyttöä varten. Jos sinulta otetaan hyvitys, näitä kortteja ei voida ottaa. Jos nostat uuden käden, saat täydet 8 korttia edessäsi olevien korttien lisäksi."},
{"name":"Miser","color":"Green","power":"Super","who":"Offense","when":"Regroup","text":"Yhteenoton alkuvaiheessa voit nostaa yhden kortin pakasta kätköösi."},
{"name":"Mite","color":"Yellow","power":"Wild","who":"Main","when":"Alliance","text":"Kun liittolaisuudet on selvitetty ja vastustajallasi on enemmän liittolaisaluksia kuin sinulla voit pakottaa kaikki liittolaisalukset palaamaan siirtokuntiinsa."},
{"name":"Mite","color":"Yellow","power":"Super","who":"Offense","when":"Launch","text":"Kun käytät kykyäsi, voit tarkistaa jokaisen kortin, jonka vastustajasi laittaa pois ja voit pitää haluamasi. Laita muut pois."},
{"name":"Mutant","color":"Green","power":"Wild","who":"Main","when":"Resolution","text":"Jos voitat yhteenoton tai neuvottelet onnistuneesti, voit ottaa satunnaisen kortin vastustajaltasi ja tämän liittolaisilta."},
{"name":"Mutant","color":"Green","power":"Super","who":"Main","when":"Alliance","text":"Voit laittaa enintään kolme korttia pois kädestäsi, ennen kuin voisit käyttää kykyäsi kätesi täydentämiseen."},
{"name":"Observer","color":"Green","power":"Wild","who":"Main","when":"Alliance","text":"Kun liittolaisuudet on selvitetty, voit sallia, että jokainen liittolaisesi saa ottaa yhden kortin pakasta."},
{"name":"Observer","color":"Green","power":"Super","who":"Offense, Ally","when":"Launch,Alliance","text":"Kun lähetät aluksia yhteenottoon, yksi aluksistasi voi tulla warpista. Normaalia alusten enimmäismäärää ei voi ylittää."},
{"name":"Oracle","color":"Green","power":"Wild","who":"Main","when":"Planning","text":"Ennen yhteenottokorttien valintaa voit sekoittaa omat ja vastustajasi kortit, ottaa satunnaisesti niin monta korttia kuin sinulla oli ennen sekoittamista ja antaa loput vastustajallesi."},
{"name":"Oracle","color":"Green","power":"Super","who":"Main","when":"Planning","text":"Voit päättää yhteenoton siihen, kun vastustajasi on valinnut korttinsa ja näyttänyt sen. Vastustajasi ottaa korttinsa takaisin, hyökkääjän ja liittolaisten alukset palaavat siirtokuntiinsa ja peli jatkuu aivan kuin olisi neuvoteltu onnistunesti."},
{"name":"Pacifist","color":"Green","power":"Wild","who":"Main","when":"Reveal","text":"Kun paljastat neuvottelukortin ja vastustajasi taas hyökkäyskortin, voit muuttaa neuvottelukorttisi hyökkäys-15:ksi."},
{"name":"Pacifist","color":"Green","power":"Super","who":"Main","when":"Resolution","text":"Jos neuvottelu epäonnistuu, menetät kaksi alusta vähemmän warppiin ja voit pakottaa vastustajasi menettämään kaksi enemmän."},
{"name":"Parasite","color":"Green","power":"Wild","who":"Any","when":"Any","text":"Kun toinen pelaaja menettää kykynsä, koska hänellä on liian vähän kotisiirtokuntia, voit heti perustaa yhden aluksen siirtokunnan jollekin hänen kotiplaneetoistaan. (Jos pelaaja saa myöhemmin takaisin kykynsä ja taas menettää sen, voit jälleen perustaa siirtokunnan.)"},
{"name":"Parasite","color":"Green","power":"Super","who":"Ally","when":"Alliance","text":"Liittolaisena voit lähettää yhteenottoon niin monta alusta kuin haluat."},
{"name":"Philanthropist","color":"Yellow","power":"Wild","who":"Any","when":"Regroup","text":"Voit aina yhteenoton alussa lähettää yhden aluksistasi warpiin ja lainata kykyäsi toiselle pelaajalle koko yhteenoton ajaksi. Yhteenoton loppuun saakka tämä pelaaja voi käyttää sinun kykyäsi, ei omaansa. Et voi käyttää kykyäsi itse, kun se on lainattu. Toinen pelaaja ei voi kieltäytyä lainasta."},
{"name":"Philanthropist","color":"Yellow","power":"Super","who":"Main, Ally","when":"Planning","text":"Ennen yhteenottokorttien valintaa, jos käytit kykyäsi ja annoit toiselle yhteenottokortin, voit pakottaa hänet pelaamaan sen, jos hän voi."},
{"name":"Reincarnator","color":"Yellow","power":"Wild","who":"Any","when":"Resolution","text":"Jos toinen pelaaja (ei Reincarnator) on häviämässä yhteenoton, tai epäonninstuu neuvottelussa, voit antaa tämän kortin hänelle. Heti tämän yhteenoton päätyttyä, tuon pelaajan täytyy vaihtaa alien-kykynsä uuteen satunnaiseen. Jos alienia ei voi jostakin syystä pelata nykyisessä pelissä, pelaajaan täytyy vaihtaa se uuteen."},
{"name":"Reincarnator","color":"Yellow","power":"Super","who":"Main, Ally","when":"Resolution","text":"Sinun ei ole pakko syntyä uudelleen, jos sinun puolesi häviää tai epäonnistut neuvottelussa."},
{"name":"Remora","color":"Yellow","power":"Wild","who":"Any","when":"Any","text":"Kun joku käyttää flare-korttia, voit ottaa kortin pakasta."},
{"name":"Remora","color":"Yellow","power":"Super","who":"Any","when":"Any","text":"Kun toinen saa siirtokunnan, voit joko ottaa kortin pakasta tai aluksen warpista. Jos useat pelaajat saavat siirtokunnan, saat aluksen warpista tai kortin pakasta jokaista kohti."},
{"name":"Reserve","color":"Green","power":"Wild","who":"Any","when":"Any","text":"Kun toinen pelaaja laittaa pois vahvistuskortin (olipa pelannut sen tai ei), voit ottaa sen käteesi. Jos itse pelaat vahvistuskortteja, ne laitetaan pois normaalisti."},
{"name":"Reserve","color":"Green","power":"Super","who":"Main, Ally","when":"Reveal","text":"Voit käyttää kykyäsi ja pelata yhden hyökkäyskortin arvoltaan enintään 9 vahvistuskorttina."},
{"name":"Shadow","color":"Yellow","power":"Wild","who":"Defense","when":"Resolution","text":"Kun häviät yhteenoton, jossa vastustajasi pelasi hyökkäyskortin, voit lähettää yhden yhteenoton ulkopuolisen aluksesi warpiin ja lähettää sen mukana kaikki vastapuolen alukset warpiin. Vaikka vastapuoli voittikin, siirtokuntia se ei saa."},
{"name":"Shadow","color":"Yellow","power":"Super","who":"Offense","when":"Destiny","text":"Kun teloitat aluksen vuorollasi, voit ottaa yhden aluksistasi warpista."},
{"name":"Sorcerer","color":"Green","power":"Wild","who":"Any","when":"Planning","text":"Kun Sorcerer ei ole pääpelaaja, voit ennen yhteenottokorttien valintaa pakottaa pääpelaajat vaihtamaan alien-kykyjä keskenään. Vaihto pysyy voimassa yhteenoton jälkeenkin. Anna tämä kortti Sorcerer-pelaajalle käytön jälkeen, tai pistä pois, jos Sorcerer ei ole pelissä mukana."},
{"name":"Sorcerer","color":"Green","power":"Super","who":"Ally","when":"Planning","text":"Voit käyttää kykyäsi liittolaisena ja vaihtaa pääpelaajien kortit."},
{"name":"Spiff","color":"Green","power":"Wild","who":"Defense","when":"Resolution","text":"Kun häviät yhteenoton, voit jättää yhden aluksen planeetalle, kun muut menevät warpiin."},
{"name":"Spiff","color":"Green","power":"Super","who":"Offense","when":"Resolution","text":"Voit käyttää kykyäsi tehdä pakkolasku jos häviät vähintään viidellä."},
{"name":"Tick-Tock","color":"Yellow","power":"Wild","who":"Any","when":"Any","text":"Kun poistopakka sekoitetaan uudeksi pakaksi, voit välittömästi perustaa enintään neljän aluksen siirtokunnan toisen pelaajan planeetalle."},
{"name":"Tick-Tock","color":"Yellow","power":"Super","who":"Main","when":"Resolution","text":"Kun voitat yhteenoton tai neuvottelet onnistuneesti, voit lähettää yhden aluksistasi warpiin ja ottaa pois yhden pelimerkin alien-arkin päältä. Tämä tapahtuu sen lisäksi, että ottaisit pelimerkkejä pois kykysi avulla."},
{"name":"Trader","color":"Green","power":"Wild","who":"Main","when":"Alliance","text":"Voit ottaa ennen liittolaisuuksien muodostamista yhden satunnaisen kortin vastustajasi kädestä. Anna sitten jokin kortti vastustajalle (voit antaa juuri ottamasi kortin)."},
{"name":"Trader","color":"Green","power":"Super","who":"Main","when":"Planning","text":"Voit vaihtaa korttikäden kenen tahansa pelaajan kanssa, ei ainoastaan vastustajan."},
{"name":"Tripler","color":"Red","power":"Wild","who":"Main","when":"Reveal","text":"Kun vastustajasi paljastaa 15 tai sitä suuremman hyökkäyskortin, voit jakaa kyseisen kortin arvon kolmella (pyöristä ylöspäin) ennen kuin muita pelitoimintoja käytetään."},
{"name":"Tripler","color":"Red","power":"Super","who":"Main","when":"Reveal","text":"Kun käytät kykyä, voit kolminkertaistaa hyökkäyskorttisi arvon, jos sen arvo on 13 tai pienempi sen sijaan, että se olisi 10 tai pienempi."},
{"name":"Vacuum","color":"Green","power":"Wild","who":"Any","when":"Reveal","text":"Jokaista pääpelaajaa (sinua ei lasketa) kohti, joka paljastaa hyökkäyskortin, voit ottaa yhden aluksen warpista."},
{"name":"Vacuum","color":"Green","power":"Super","who":"Any","when":"Any","text":"Kun käytät kykyäsi, voit valita, mitkä alukset joutuvat warpiin."},
{"name":"Virus","color":"Red","power":"Wild","who":"Main","when":"Reveal","text":"Pääpelaajana voit kertoa alustesi lukumäärän niiden alusten määrän mukaan, jotka ovat liittoutuneita puolellesi, eikä lisätä niitä."},
{"name":"Virus","color":"Red","power":"Super","who":"Main","when":"Reveal","text":"Voit kertoa hyökkäyskorttisi arvon kaikkien puolellasi olevien alusten lukumäärällä (ei pelkästään omien alustesi määrällä)."},
{"name":"Void","color":"Red","power":"Wild","who":"Any","when":"Any","text":"Kerran yhteenotossa voit lähettää jonkin aluksesi, joka ei ole yhteenotossa, warppiin peruuttamaan minkä tahansa Artifacti-kortin vaikutuksen. Artifact-kortti poistetaan tavalliseen tapaan."},
{"name":"Void","color":"Red","power":"Super","who":"Ally","when":"Resolution","text":"Voit käyttää kykyäsi liittolaisena, jos puolesi voittaa."},
{"name":"Vulch","color":"Green","power":"Wild","who":"Main","when":"Resolution","text":"Jos voitat yhteenoton tai onnistut neuvottelussa, voit pakottaa vastustajasi antamaan sinulle kätensä kortti kerrallaan. Pistä kortit poistopakkaan, kunnes saat mieluisen. Laita tämä kortti käteesi, ja vastustajasi pitää loput (jos hänelle jäi)."},
{"name":"Vulch","color":"Green","power":"Super","who":"Any","when":"Any","text":"Voit käyttää kykyäsi ja ottaa talteen toisten pelaajien poisheittämät flaret (artifaktien lisäksi)."},
{"name":"Warpish","color":"Red","power":"Wild","who":"Main","when":"Reveal","text":"Pääpelaajana, kun yhteenottokortit ovat paljastettu, voit lisätä summaan 1 jokaista alusta kohden, joka sinulla on warpissa."},
{"name":"Warpish","color":"Red","power":"Super","who":"Main","when":"Reveal","text":"Pääpelaajana, kun yhteenottokortit paljastuvat, voit pakottaa vastustajasi vähentämään tuloksestaan 1 jokaista alusta kohden, joka hänellä on warpissa."},
{"name":"Warrior","color":"Green","power":"Wild","who":"Defense","when":"Resolution","text":"Heti yhteenoton päätyttyä voit ottaa yhteen hyökkääjän kanssa tämän kotigalaksissa. Tämän yhteenoton jälkeen peli jatkuu siitä, mihin jäätiin."},
{"name":"Warrior","color":"Green","power":"Super","who":"Ally","when":"Reveal","text":"Voit käyttää kykyäsi liittolaisena ja lisätä pelimerkit oman puolesi tulokseen."},
{"name":"Will","color":"Green","power":"Wild","who":"Offense","when":"Destiny","text":"Kun käännät jonkun toisen pelaajan värin kohdepakasta, voit ottaa yhteen tuon pelaajan kanssa missä galaksissa tahansa, ei vain hänen kotigalaksissaan."},
{"name":"Will","color":"Green","power":"Super","who":"Offense","when":"Destiny","text":"Voit katsoa kenen tahansa (yhden) pelaajan käden ennen kuin päätät kenen kanssa otat yhteen."},
{"name":"Zombie","color":"Green","power":"Wild","who":"Any","when":"Any","text":"Kun menetät aluksia warpiin, voit palauttaa yhden aluksesi ja laittaa sen johonkin omaan siirtokuntaasi."},
{"name":"Zombie","color":"Green","power":"Super","who":"Main","when":"Alliance","text":"Voit sanoa, että jokainen tässä yhteenotossa kanssasi liittoutuva voi ottaa yhden aluksistaan warpista mukaan yhteenottoon. Tätä alusta ei lasketa mukaan neljän aluksen enimmäismäärään."}];


const cosmicAliensData = [{"name":"Amoeba","color":"yellow","summary":"Rajoittamaton alusten liikkuminen","who":"Main","mandatory":"optional","when":"Planning","text":"**Sinulla on kyky valua kuin lima.** Yhteenottokorttien valitsemisen jälkeen, ennen paljastamista, jos sinulla on ainakin yksi alus yhteenotossa, sinä **_voit käyttää_** tätä kykyä lisäämään tai vähentämään yhteenotossa olevien alustesi määrää. Voit siirtää jotkut tai kaikki aluksesi omiin siirtokuntiisi tai voit lisätä haluamasi määrän aluksia siirtokunnistasi (saat ylittää neljän maksimimäärän).<br><br>_Nähtyään ensi valonsa täysin nestemäisellä planeetalla, Ameebat aistivat värähdyksiä erityisen herkästi. Ne vetäytyvät nopeasti vaaran uhatessa ja sopivien turbulenssien tullen ne aivan yhtä vikkelästi valuvat uhkaavina suoraan taisteluun. Ameebat säälivät niitä, jotka eivät näin voi vastata olosuhteiden haasteisiin ja niistä tulee herkkiä Universumin valtiaita._"},
{"name":"Anti-Matter","color":"yellow","summary":"Pienempi tulos voittaa","who":"Main","mandatory":"mandatory","when":"Reveal","text":"**Sinulla on negaation kyky.** Jos sekä sinä, että vastustajasi paljastavat hyökkäyskortin **_käytä_** tätä voimaa siihen, että pienempi tulos voittaa. Lisäksi, kun tätä kykyä **_käytetään_**, sekä sinun, että hyökkäävien ja puolustavien liittolaisten alusten määrä vähennetään aina kunkin puolen tuloksesta. Vastustajasi tulos lasketaan kuitenkin normaalisti."},
{"name":"Barbarian","color":"green","summary":"Tuhoaa vastustajan käden","who":"Offense","mandatory":"mandatory","when":"Resolution","text":"**Sinulla on kyky ryöstellä.** Jos voitat yhteenoton hyökkääjänä, ennen (mahdollisen) hyvityksen keräämistä, **_käytä_** tätä kykyä vastustajasi korttien ryöstämiseen. Katso vastustajasi käsi ja ota kortti jokaista yhteenotossa ollutta alustasi kohti. Pistä loput kädestä poistopakkaan."},
{"name":"Calculator","color":"yellow","summary":"Vähentää suurempiarvoisesta hyökkäyskortista","who":"Main","mandatory":"optional","when":"Planning","text":"**Sinulla on kyky tasoittaa tilanne.** Yhteenottokorttien valitsemisen jälkeen, ennen paljastamista, **_voit käyttää_** tätä kykyä ja julistaa 'tasoituksen'. Jos teet näin, ja kortit paljastuvat *eriarvoisiksi* hyökkäyskorteiksi, suuremmasta kortista vähennetään pienemmän arvo. Jos siis kortit olivat 15 ja 08, kortti 15 muuttuu 07:ksi ja 08 pysyy ennallaan. Yhteenoton tulos ratkaistaan tämän jälkeen normaalisti."},
{"name":"Chosen","color":"green","summary":"Ottaa uuden yhteenottokortin","who":"Main","mandatory":"optional","when":"Reveal","text":"**Sinulla on kyky kutsua yliluonnollista apua.** Yhteenottokorttien paljastamisen jälkeen **_voit käyttää_** tätä kykyä ja pyytää apua korkeammalta yhden kerran jokaisessa yhteenotossa. Ota kolme korttia pakasta. Jos yksikään ei ole yhteenottokortti, pistä kortit poistopakkaan (apua ei tule). Jos nostat yhteenottokortin, voit korvata alkuperäisen paljastamasi kortin sillä (alkuperäinen menee poistopakkaan). Jos alkuperäinen korttisi on hyökkäys ja valitset toisen hyökkäyskortin avuksi, tämä yliluonnollinen apu voi joko korvata tai sen arvon voi lisätä alkuperäiseen korttiisi (saat valita). Kaikki muut avuksi nostetut kortit laitetaan poistopakkaan ja yhteenotto ratkaistaan uuden kortin tai uuden yhteistuloksen avulla."},
{"name":"Citadel","color":"red","summary":"Rakentaa planeetoille linnoituksia","who":"Any","mandatory":"optional","when":"Planning","text":"**Sinulla on kyky linnoittaa.** Jokaisessa yhteenotossa, kun kohtalokortti on katsottu, voit pelata kädestäsi hyökkäyskortin arvopuoli ylöspäin minkä tahansa planeetan viereen linnoitukseksi. Jos planeetta, jolla on yksi tai useampi linnoitus, joutuu kohteeksi, **_voit käyttää_** kykyäsi ennen yhteenottokorttien paljastamista ja aktivoida kaikki kohdeplaneetan linnoitukset. Jos teet niin, lisää linnoitusten arvot puolustuksen tulokseen tässä yhteenotossa. Jos aktivoit planeetan linnoitukset ja puolustus häviää, laita linnoitukset poistopakkaan. Muussa tapauksessa ne jäävät paikoilleen. Jos planeetta tuhoutuu tai alien-arkki poistuu pelistä, pistä *kaikki* linnoitukset poistopakkaan."},
{"name":"Clone","color":"green","summary":"Pitää oman yhteenottokorttinsa","who":"Main","mandatory":"optional","when":"Resolution","text":"**Sinulla on kyky monistua.** Kun yhteenoton tulos on selvillä (ennen korvauksen ottamista), **_voit käyttää_** tätä kykyä ja lisätä sinun puolesi yhteenottokortin käteesi, sen sijaan, että se laitettaisiin poistopakkaan."},
{"name":"Cudgel","color":"green","summary":"Vastustaja menettää enemmän aluksia","who":"Main","mandatory":"mandatory","when":"Resolution","text":"**Sinulla on kyky murskata.** Kun voitat yhteenoton, jossa pelasit hyökkäyskortin, **_käytä_** tätä kykyä ja pakota vastustajasi menettämään yhtä monta itse valitsemaansa alusta, kuin sinulla oli yhteenotossa. Hän menettää nämä alukset sekä ne, jotka normaalisti menettäisi."},
{"name":"Dictator","color":"red","summary":"Hallitsee Destiny-pakkaa","who":"Not Offense","mandatory":"mandatory","when":"Destiny","text":"**Sinulla on kyky olla komentaja.** Ennen destiny-kortin nostamista, **_käytä_** tätä kykyä: ota destiny-pakka, katso se läpi ja valitse yksi kortti. Tuo kortti pelataan aivan kuin hyökkääjä olisi itse sen nostanut. Sinun vuorollasi, tai milloin vain kykysi zap'ätään, jäljellä olevat destiny-kortit sekoitetaan ja pelataan satunnainen kortti."},
{"name":"Fido","color":"yellow","summary":"Noutaa pois heitetyt kortit","who":"Any","mandatory":"optional","when":"Resolution","text":"**Sinulla on kyky noutaa.** Kun yhteenottokortit laitetaan poistopakkaan yhteenoton lopuksi, **_voit käyttää_** tätä kykyä ja ottaa yhden poisheitetyn yhteenottokortin ja tarjota sitä toiselle pelaajalle. Jos hän ei hyväksi voit pitää sen tai laittaa poistopakkaan. Jos hän hyväksyy kortin, hän pitää sen ja sinä voit ottaa joko yhden aluksesi warpista tai kortin pakasta. (Voit noutaa vain yhteenottokortin, jota käytettiin yhteenoton ratkaisemisessa, et sellaista, joka pistettiin pois muusta syystä)."},
{"name":"Filch","color":"green","summary":"Ottaa vastustajan käytetyn kortin","who":"Main","mandatory":"optional","when":"Resolution","text":"**Sinulla on kyky varastaa.** Kun yhteenotto kortit laitetaan poistopakkaan yhteenoton lopuksi, **_voit käyttää_** tätä kykyä ja ottaa vastustajasi kortin poistopakasta käteesi. (Jos vastustajasi yhteenottokortti vaihtui johonkin toiseen, voit ottaa kortin, jonka hän pelasi viimeisimpänä.)"},
{"name":"Fodder","color":"yellow","summary":"Pelaa lisäksi pieniä kortteja","who":"Main","mandatory":"optional","when":"Reveal","text":"**Sinulla on kyky kukistaa.** **_Voit käyttää_** tätä kykyä, jos sekä sinä että vastustajasi paljastatte hyökkäyskortin. Voit poistaa kädestäsi yhden tai useampia hyökkäyskortteja, jotka ovat arvoltaan suurempia kuin itse pelaamasi ja pienempiä kuin vastustajasi pelaama kortti. Poislaitettujen korttien arvo lisätään sinun tulokseesi."},
{"name":"Gambler","color":"red","summary":"Hämää korteillaan.","who":"Main","mandatory":"optional","when":"Reveal","text":"**Sinulla on kyky hämätä.** Kun vastustajasi on paljastanut yhteenottokorttinsa, **_voit käyttää_** tätä kykyä ja pitää oman korttisi arvopuoli alaspäin, ja sanoa (ja vaikka valehdella), mikä se on. Jos vastustajasi ei haasta tätä, yhteenotto päättyy sen mukaan, mitä sanoit korttisi olevan. Laita tämän jälkeen korttisi pakkansa alimmaiseksi (ei poistopakkaan). Jos vastustajasi haastaa sinut, paljasta korttisi. Jos valehtelit, menetät yhtä monta alusta, kuin sinulla oli yhteenotossa. Jos kerroit totuuden, vastustajasi menettää vastaavasti aluksia. Menetetyt alukset täytyy ottaa yhtenoton ulkopuolelta. Yhteenotto ratkaistaan tämän jälkeen normaalisti paljastettujen korttien avulla. <br><br> Jos joku toinen vaihtaa kortit (kuten Sorcerer), voit edelleen hämätä alunperin pelaamallasi kortilla, ja vastustajasi täytyy joko hyväksyä tai haastaa kortti, jonka olisi paljastamassa (paljastetaan, vain jos haastetaan). Jos joku pakottaa näyttämään korttisi aikaisemmin (kuten Oracle tekisi), **_voit käyttää_** kykyäsi silloin."},
{"name":"Grudge","color":"red","summary":"Rankaisee, jos kutsuttu ei liittoudu","who":"Main","mandatory":"mandatory","when":"Alliance","text":"**Sinulla on kyky kostaa.** Liittoutumien muodostumisen jälkeen, **_käytä_** tätä kykyä ja anna kaunamerkki jokaiselle pelaajalle, jonka kutsuit liittolaiseksesi, mutta joka kieltäytyi. Jos voitat yhteenoton (tai neuvottelet sopimuksen), jokainen kaunamerkin saanut pelaaja pistää merkin pois ja menettää yhden aluksistaan warpiin. Jos häviät yhteenoton (tai neuvottelu epäonnistuu), jokainen kaunamerkin saanut pistää merkin pois ja menettää neljä valitsemaansa alusta. Muussa tapauksessa kaunamerkit laitetaan pois ilman seuraamuksia. Alukset, jotka menetetään, täytyy tulla muualta kuin vastapuolen liittolaisina olleiden joukosta."},
{"name":"Hacker","color":"green","summary":"Valitsee hyvityksen.","who":"Main","mandatory":"optional","when":"Resolution","text":"**Sinulla on kyky hakkeroida.** Kun otat hyvityksen, **_voit käyttää_** tätä kykyä ja valita, keneltä otat hyvityksen, olipa tuo pelaaja vastustajasi tai ei. Voit katsoa tuon pelaajan kortteja ja valita hyvityksen.<br><br>Kun vastustajasi ottaa sinulta hyvityksen, **_voit käyttää_** tätä kykyä ja valita kortit, jotka hän saa."},
{"name":"Hate","color":"yellow","summary":"Vastustajat menettävät kortteja tai aluksia.","who":"Offense","mandatory":"mandatory","when":"Start Turn","text":"**Sinulla on kyky raivota.** Vuorosi alussa (tarvittaessa uuden käden nostamisen jälkeen), **_käytä_** tätä kykyä ja pakota kaikki muut pelaajat joko poistamaan kortin kädestään tai menettämään aluksia. Poista ensin kädestäsi kortti. Muiden pelaajien täytyy sitten valita: he joko pistävät pois samantyyppisen kortin (hyökkäys, neuvottelu, artifakti jne) tai menettävät kolme valitsemaasi alusta warpiin. Jos poistat kädestäsi hyökkäyskortin, muiden täytyy poistaa samanarvoinen tai suurempi. Jos pelaajalla ei ole oikeantyyppistä korttia, hän menettää aluksia. Jos sinulla ei tämän jälkeen ole yhteenottokortteja kädessäsi, nosta uudet käsikortit."},
{"name":"Healer","color":"yellow","summary":"Voi pelastaa muiden aluksia warpista.","who":"Any","mandatory":"optional","when":"Any","text":"**Sinulla on kyky parantaa.** Kun toinen pelaaja menettää aluksia warpiin, **_voit käyttää_** tätä kykyä ja parantaa kaikki menetetyt alukset ja tienata kortin pakasta. Se, että tulee parannetuksi, ei estä ottamasta hyvitystä, eikä muita etuja, mitkä liittyvät menetettyihin aluksiin. Parannettu pelaaja voi laittaa yhden tai useampia parannetuista aluksista siirtokuntiinsa. Yhteenoton aikana voit parantaa useita pelaajia ja ottaa kortin joka kerta."},
{"name":"Human","color":"yellow","summary":"Enimmäkseen harmiton.","who":"Main, Ally","mandatory":"mandatory","when":"Reveal","text":"**Sinulla on kyky olla ihminen.** Kun yhteenottokortit on paljastettu, **_käytä_** tätä kykyä ja lisää 4 oman puolesi tulokseen. Jos tämä kyky zap'ätään, sinun puolesi voittaa yhteenoton heti.<br><br> _Sotaisina ja Kosmisten mittapuiden mukaan melko vähä-älyisinä pidettyjä ihmisiä ei yleisesti nähdä kovinkaan suurena uhkana. Jos ihmisen kuitenkin altistaa Kosmiselle energialle, voi päästää liikkeelle mitä suurimpia voimia. Muut rodut ovat yhteisesti sitä mieltä, että tällaista tulisi välttää viimeiseen saakka._"},
{"name":"Kamikaze","color":"yellow","summary":"Uhraa aluksia ja saa kortteja","who":"Main","mandatory":"optional","when":"Planning","text":"**Sinulla on kyky uhrata.** Ennen yhteenottokorttien valitsemista, **_voit käyttää_** tätä kykyä ja lähettää enintään neljä alusta siirtokunnistasi warpiin. Jokaista uhrattua alusta kohti voit nostaa kaksi korttia pakasta.<br><br>_Kamikazet elävät tiiviinä yhteiskuntana ja ovat tehneet ylevästä itsensä uhraamisesta taidetta. Heitä pelätään taistelussa suuresti, sillä he kykenevät halutessaan kuolemaan räjähtäen. Kamikazet kuitenkin tietävät, että kun heidän rotunsa nousee Universumin herruuteen, nuo matkan varrella henkensä antaneet muistetaan iäti._"},
{"name":"Loser","color":"green","summary":"Voittaja häivää ja häviäjä voittaa","who":"Main","mandatory":"optional","when":"Planning","text":"**Sinulla on kyky kääntää tilanne ylösalaisin.** Ennen yhteenottokorttien valitsemista **_voit käyttää_** tätä kykyä ja määrätä tilanteen ylösalaisin. Kun näin on tehty, molempien täytyy pelata hyökkäyskortti, jos mahdollista. Korttien paljastamisen jälkeen voittava puoli häviää ja häviävä voittaa. Tämä tapahtuu sen jälkeen, kun kaikki muut tapahtumat on selvitetty (esimerkiksi se, että Human'in kyky zap'ätään).<br><br>_Arvoitukselliset Häviäjät ovat osoittautuneet varsin viekkaiksi taistelussa. Vahvuuksista tulee heikkouksia ja heikkouksista vahvuuksia, kun Häviäjä, katse lasittuneena, näyttää vastustajalleen, että kiltit tyypit voittavat aina._"},
{"name":"Machine","color":"red","summary":"Voi jatkaa vuoroaan","who":"Offense","mandatory":"optional","when":"Resolution","text":"**Sinulla on kyky olla pysähtymätä.** Sinun vuorosi ei rajoitu kahteen yhteenottoon. Jokaisen yhteenoton jälkeen (onnistuivatpa ne tai eivät), **_voit käyttää_** tätä kykyä ja aloittaa uuden niin kauan, kun sinulla on ainakin yksi yhteenottokortti kädessäsi.<br><br>_Jo kauan sitten historian hämäriin hävinnyt rotu oli niin kauaskatseinen, että rakensi valtavan Koneen planeettansa ytimeen. Kaataen kaiken tietonsa ja kunnianhimonsa sen muistipankkeihin, he ohjelmoivat sen suorittamaan yhden tehtävän: "},
{"name":"Macron","color":"green","summary":"Jokainen alus on 4:n arvoinen","who":"Main, Ally","mandatory":"mandatory","when":"Launch, Alliance, Reveal","text":"**Sinulla on paljouden kyky.** Kun olet joko pääpelaaja tai liittolainen, **_käytä_** tätä kykyä, kun lähetät aluksia yhteenottoon. Voit lähettää vain yhden aluksen.<br><br>Kun yhteenottokortit on paljastettu, **_käytä_** tätä kykyä. Jokainen aluksesi lisää puolesi tulokseen 4, ei 1.<br><br>Kun otat hyvityksen tai palkkion, jokainen aluksesi vastaa kahta."},
{"name":"Masochist","color":"red","summary":"Yrittää hävitä omia aluksiaan","who":"Any","mandatory":"mandatory","when":"Regroup","text":"**Sinulla on kyky satuttaa itseäsi.** Aina, kun Regroup-vaihe alkaa (ennen kuin hyökkääjä ottaa aluksen warpista), **_käytä_** tätä kykyä pelin voittamiseen, jos olet menettänyt kaikki aluksesi. Menetettyihin luetaan ne, jotka ovat warpissa, poissa pelistä tai toisten pelaajien kaappaamia. Et menetä kykyä, vaikka sinulla olisi liian vähän kotisiirtokuntia ja voit voittaa pelin myös normaalisti. **Älä käytä kykyä Healerin kanssa.**"},
{"name":"Mind","color":"yellow","summary":"Näkee toisten pelaajien kädet","who":"Any","mandatory":"optional","when":"Alliance","text":"**Sinulla on kyky saada tietoa.** Ennen liittolaisten kutsumista, **_voit käyttää_** tätä kykyä ja nähdä jomman kumman pääpelaajan käden. Jos olet pääpelaaja, voit kastoa vastustajasi käden. Et voi kertoa toisille, mitä kortteja näet, kun käytät tätä kykyä."},
{"name":"Mirror","color":"yellow","summary":"Vaihtaa hyökkäyskortin numeroiden paikkaa","who":"Main","mandatory":"optional","when":"Planning","text":"**Sinulla on kyky kääntää tilanne päinvastaiseksi.** Yhteenottokorttien valitsemisen jälkeen, mutta ennen paljastamista, **_voit käyttää_** tätä kykyä ja kääntää tilanteen. Jos toinen tai kumpikin pelasi hyökkäyskortin, pelattujen hyökkäyskorttien numerot vaihdetaan toisinpäin. Näin esimerkiksi 15 muuttuu 51:ksi, 20 muuttuu 02:ksi ja 08 muuttuu 80:ksi. Yhteenoton tulos ratkaistaan näin saatujen arvojen avulla."},
{"name":"Miser","color":"green","summary":"Saa toisen käden","who":"Any","mandatory":"optional","when":"Any","text":"**Pelin valmistelu:** Sinulle annetaan kaksi erillistä kahdeksan kortin kättä. Katso ne läpi ja valitse kummasta tulee 'aarrekätkö'. Laita aarrekätkö tämän alustan päälle.<br><br>**Sinulla on kyky koota kalleuksia.** Milloin vain haluat pelata kortin, **_voit käyttää_** tätä kykyä ja pelata kortin kätköstäsi. Et voi lisätä saamiasi kortteja kätköön eivätkä toiset pelaajat voi katsoa tai nostaa kortteja sieltä. Jos kätkössäsi ei ole yhtään yhteenottokorttia, voit halutessasi näyttää sen sisällön, laittaa poistopakkaan ja ottaa uudet kahdeksan korttia kätköön. Kätköstä pelatut kortit, jotka palaavat käteesi (esim flaret), täytyy myös palauttaa kätköön."},
{"name":"Mite","color":"yellow","summary":"Vaatii siirtokunnan tai poistaa kortteja","who":"Offence","mandatory":"mandatory","when":"Launch","text":"**Sinulla on kyky mahtailla.** Ennenkuin lähetät aluksia hyperavaruusportille, jos vastustajalla on enemmän kuin kolme korttia kädessään, **_käytä_** tätä kykyä ja mahtaile. Puolustajan täytyy joko valita satunnaisesti kolme korttia kädestään ja heittää muut pois _tai_ antaa sinun perustaa siirtokunta hyökkäyksen kohdeplaneetalle. Jos puolustus antaa sinulle siirtokunnan, siirrä kaikki portilla olevat aluksesi kohdeplaneetalle ja yhteenotto päättyy heti - onnistuneesti. Jos puolustaja heittää kortteja pois, kunnes jää kolme, yhteenotto jatkuu normaalisti.<br><br>_Kauan aikaa muut leimasivat Punkit tuholaisiksi, mutta sitten mikroskooppisten Punkkien parvet oppivat käyttämään kaikkialla olevia joukkojaan edistämään yhteistä unelmaansa: olla hyväksyttyjä ja arvostettuja Kosmisessa yhteisössä._"},
{"name":"Mutant","color":"green","summary":"Ylläpitää 8 korttia","who":"Main","mandatory":"optional","when":"Alliance","text":"**Sinulla on kyky uudistua.** Pääpelaajana, ennen kuin liittolaiset on kutsuttu, jos sinulla on alle kahdeksan korttia, **_voit käyttää_** tätä kykyä ja täyttää kätesi. Nosta kortit yksi kerrallaan, satunnaisesti, muiden pelaajan/pelaajien kädestä ja/ tai pakasta. Nosta, kunnes sinulla on täysi käsi."},
{"name":"Observer","color":"green","summary":"Liittolaiset eivät mene warppiin","who":"Main, Ally","mandatory":"mandatory","when":"Resolution","text":"**Sinulla on kyky suojata.** Liittoutuneena, kun menetät aluksia warppiin, **_käytä_** tätä kykyä ja palautakin ne siirtokuntiisi ja käytä niitä.<br><br>Pääpelaajana, kun joku liittolaisistasi menettäisi aluksia warppiin, **_käytä_** tätä kykyä ja salli sen sijaan liittolaisten palauttaa alukset siirtokuntiinsa."},
{"name":"Oracle","color":"green","summary":"Ennakoi vihollisen kortin","who":"Main","mandatory":"mandatory","when":"Planning","text":"**Sinulla on kyky ennakoida.** Pääpelaajana, kun valitaan yhteenottokortteja, **_käytä_** tätä kykyä ja pakota vastustajasi pelaamaan yhteenottokorttinsa arvopuoli ylöspäin. Vasta kun olet nähnyt vastustajan kortin, valitset ja pelaat korttisi."},
{"name":"Pacifist","color":"green","summary":"Voittaa neuvottelukortilla","who":"Main","mandatory":"mandatory","when":"Reveal","text":"**Sinulla on rauhan kyky.** Jos paljastat neuvottelukortin ja vastustajasi paljastaa hyökkäyskortin, **_käytä_** tätä kykyä ja voitat yhteenoton."},
{"name":"Parasite","color":"green","summary":"Liittyy liittolaiseksi tahtonsa mukaan","who":"Not Main ","mandatory":"optional","when":"Alliance","text":"**Sinulla on kyky elää loisena.** Kun on sinun vuorosi liittoutua, **_voit käyttää_** tätä kykyä ja liittoutua (tavalliseen tapaan lähettämällä yhdestä neljään alusta) jomman kumman puolelle, vaikka sinua ei olisi kutsuttukaan."},
{"name":"Philanthropist","color":"yellow","summary":"Antaa kortteja pois","who":"Main, Ally","mandatory":"optional","when":"Alliance","text":"**Sinulla on kyky antaa.** Pääpelaajana tai liittolaisena, liittoutumien muodostumisen jälkeen, **_voit käyttää_** tätä kykyä ja antaa yhden kortin kädestäsi toiselle pääpelaajista (vastustajallesi, jos olet pääpelaaja). Tämä pelaaja lisää välittömästi kortin käteensä. Jos käytät tätä kykyä pääpelaajana ja sinulla ei ole yhteenottokortteja kädessäsi, nostat uuden käden."},
{"name":"Reincarnator","color":"yellow","summary":"Käyttää kykyjä, jotka eivät ole pelissä","who":"Main, Ally","mandatory":"mandatory","when":"Resolution","text":"**Sinulla on kyky syntyä uudelleen.**  Pääpelaajana tai liittolaisena, kun puolesi häviää yhteenoton (tai neuvottelu epäonnistuu), **_käytä_** tätä kykyä ja synny uudelleen. Nosta satunnainen käyttämättön alienkyky ja tulet siksi alieniksi. Jos alienilla on 'Pelin valmistelu' tai sitä ei ole sallittu nykyisessä pelissä, nosta uusi. Jos puolesi uudelleen häviää tai neuvottelu epäonnistuu, nosta jälleen uusi alien. Tämä kyky pysyy sinulla muiden lisäksi. Pelaajat, jotka kopioivat tai varastavat kykysi, käyttävät sekä uudelleensyntymisen kykyä että mitä tahansa kykyä, johon olet uudelleensyntynyt. Jos näin tehdessään heidän puolensa häviää yhteenoton tai he eivät onnistu neuvotteluissa, heidän täytyy syntyä uudelleen ja menettää alkuperäinen kykynsä."},
{"name":"Remora","color":"yellow","summary":"Saa kortteja tai aluksia muiden kanssa","who":"Any","mandatory":"optional","when":"Any","text":"**Sinulla on kyky takertua.** Kun toinen pelaaja noutaa yhden tai useamman aluksen warpista, **_voit käyttää_** tätä kykyä ja ottaa myös aluksen warpista. Et saa käyttää tätä kykyä noutaaksesi alusta saman yhteenoton aikana, jossa se meni warppiin.<br><br>\nAina kun toinen pelaaja nostaa yhden tai useamman kortin pakasta, **_voit_** käyttää tätä kykyä ja nostaa myös kortin."},
{"name":"Reserve","color":"green","summary":"Voi käyttää hyökkäyskortteja vahvistuskortteina","who":"Main, Ally","mandatory":"optional","when":"Reveal","text":"**Sinulla on kyky kartuttaa.** Pääpelaajana tai liittolaisena, kun yhteenottokortit on paljastettu, **_voit käyttää_** tätä kykyä ja pelata kädestäsi yhden tai useamman hyökkäyskorttin, joiden arvo on 06 tai vähemmän kuin ne olisivat sen arvoisia vahvistuskortteja.<br><br>\nPääpelaajana tai liittolaisena, kun toinen pelaaja pelaa vahvistuskortin, **_voit käyttää_** tätä kykyä ja peruuttaa tuon vahvistuskortin laittamalla neuvottelukortin pois kädestäsi."},
{"name":"Shadow","color":"yellow","summary":"Hävittää toisten aluksia","who":"Any","mandatory":"mandatory","when":"Destiny","text":"**Sinulla on kyky teloittaa.** Aina, kun nostetaan jonkun toisen pelaajan väri tai nostetaan erityinen Destiny-kortti, joka tekee toisesta pelaajasta kohteen, **_käytä_** tätä kykyä valitsemalla yksi tämän pelaajan aluksista mistä tahansa siirtokunnasta ja lähetä se warpiin. Wild Destiny-kortin noustua voit teloittaa yhden minkä tahansa muun pelaajan aluksen riippumatta siitä, kenet hyökkääjä valitsee yhteenoton vastapuoleksi."},
{"name":"Sorcerer","color":"green","summary":"Voi vaihtaa pelatut kortit keskenään","who":"Main","mandatory":"optional","when":"Planning","text":"**Sinulla on taikuuden kyky.** Pääpelaajana, kun yhteenottokortit on valittu, mutta ennen niiden paljastamista, **_voit käyttää_** tätä kykyä vaihtamaan kortit vastustajan kanssa niin, että hän paljastaa korttisi ja sinä paljastat vastustajan kortin."},
{"name":"Spiff","color":"green","summary":"Saa siirtokunnan, jos häviää","who":"Offence","mandatory":"optional","when":"Resolution","text":"**Sinulla on kyky tehdä hätälasku.** Hyökkääjänä, jos molemmat pelaajat paljastivat hyökkäyskorttit ja hävisit yhteenoton 10:llä tai enemmällä, **_voit käyttää_** kykyä ja  laskeutua yhdellä aluksella, jotka muutoin menettäisit warpiin, kohteena olevalle planeetalle."},
{"name":"Tick-Tock","color":"yellow","summary":"Rajoittaa pelin kestoa","who":"Any","mandatory":"mandatory","when":"Resolution","text":"**Pelin valmistelu:** Aseta kymmenen pelimerkkiä tälle alustalle (kahdeksan, jos joka pelaajalla on neljä planeettaa).<br><br>**Sinulla on kärsivällisyyden kyky.** Aina kun joku pelaaja voittaa puolustuksena tai käydään onnistunut neuvottelu, **_käytä_** tätä kykyä ja poista yksi merkki tältä alustalta. Jos alustalla ei ole enää merkkejä, voitat pelin heti. Voit silti voittaa pelin normaaliin tapaan.<br><br>_Väijyen aika-avaruuden syvyyksissä aina warpin itsensä tuolla puolen, tämä mekaaninen rotu odottaa kärsivällisesti Universumin lämpökuolemaa, kunnes jäljellä on vain outoja syövereitä, joita se saa hallita. Sillä välin ne salavihkaa kääntävät muut rodut toisiaan vastaan, jotta ne eivät huomaisi sitä, mikä väistämättä tapahtuu._"},
{"name":"Trader","color":"green","summary":"Vaihtaa käsiä vastustajan kanssa","who":"Main","mandatory":"optional","when":"Planning","text":"**Sinulla on kyky vaihtaa osia.** Pääpelaajana, ennen kuin yhteenottokortit on valittu, **_voit käyttää_** tätä kykyä vaihtaa käsiä vastustajan kanssa. Kumpikin pitää uuden käden.<br><br>Puolustajana, jos sinun pitää nostaa uusi käsi, sinun on tehtävä se ennen kuin vaihdat käsiä vastustajasi kanssa."},
{"name":"Tripler","color":"red","summary":"Pienet kortit kolminkertaistuvat, isot jaetaan kolmella","who":"Main","mandatory":"mandatory","when":"Reveal","text":"**Sinulla on kolmen kyky.** Kun paljastat hyökkäyskortin, **_käytä_** tätä kykyä säätääksesi sen arvoa. Jos kortin arvo on 10 tai pienempi, kerro sen arvo kolmella. Jos kortin arvo on suurempi kuin 10, jaa sen arvo kolmella (pyöristä ylöspäin).<br><br>_Vuosituhansien pakonomainen urheilu ja vedonlyönti on antanut Triplaajille taidon tehdä tyhjästä jotakin. Moiten silmänkääntötemppujen ikävä sivuvaikutus on, että aivan yhtä helposti ne tekevät tyhjäksi mitä vain. Nyt Triplaajat haluavat määrätä, että Universumi on paikka heidän viimeiselle kilpailulleen, pakottaen kaikki muut olennot pistämään kaikki viimeisen pikajuoksun varaan, juoksun, joka pingotaan halki koko Kosmoksen._"},
{"name":"Vacuum","color":"green","summary":"Vie muiden aluksia warppiin","who":"Any","mandatory":"mandatory","when":"Any","text":"**Sinulla on katarsiksen kyky.** Aina kun menetät aluksia warpiin, **_käytä_** tätä kykyä ja vie mukanasi yhtä monta muiden pelaajien alusta. Määrität, kuka menettää ne ja kuinka monta kukin menettää. Valitut pelaajat päättävät, mistä siirtokunnista ottavat alukset. Alukset, jotka menetetään warpiin tällä tavoin, menetetään tavallisesti menetettyjen alusten lisäksi."},
{"name":"Virus","color":"red","summary":"Moninkertaistuu hyökätessään","who":"Main","mandatory":"mandatory","when":"Reveal","text":"**Sinulla on kyky moninkertaistua.** Pääpelaajana, kun paljastat hyökkäyskortin, **_käytä_** tätä kykyä ja kerro korttisi arvo yhteenotossa olevien alustesi lukumäärällä sen sijaan, että lisäät ne yhteen. Liittolaisesi alukset lisätään tulokseen tavalliseen tapaan."},
{"name":"Void","color":"red","summary":"Tuhoaa vihollisen alukset","who":"Main","mandatory":"mandatory","when":"Resolution","text":"**Sinulla on kyky tuhota.** Kun voitat yhteenoton pääpelaajana, **_käytä_** tätä kykyä ja poista häviävän puolen alukset pelistä sen sijaan, että ne menisivät warpiin. Tämä tapahtuu ennen muita pelitoimintoja, jotka vaikuttavat warpiin meneviin aluksiin. Pelaajalta ei voida poistaa aluksia vähemmäksi, kuin pelin voittamiseen tarvittava siirtokuntien määrä - tämän luvun alle jäävät tuhotut alukset menevät normaalisti warpiin.<br><br>_Aivan pienestä pyörteestä alkaen oli opetettu, ettei muuta älyllistä elämää ollut olemassa ja siten Tyhjiöt pahastuivat syvästi, kun he kuulivat toisten rotujen olemassaolosta. Nyt he käyvät pyhää sotaa puhdistaakseen taivaat kaikistä ällöttävistä, aineellisista olennoista._"},
{"name":"Vulch","color":"green","summary":"Kerää poislaitetut artefaktit","who":"Any","mandatory":"mandatory","when":"Any","text":"**Sinulla on kyky kerätä talteen.** Aina kun joku muu pelaaja laittaa pois Artifact-kortin (pelasipa sen tai ei), **_käytä_** tätä kykyä ja lisää Artifact-kortti käteesi. Kaikki pelaamasi Artifact-kortit laitetaan normaalisti poistopakkaan, eikä niitä voi ottaa talteen. Jos nostat uuden käden, pidä vanhat Artifact-korttisi, kun olet paljastanut ne, uusien korttien lisäksi."},
{"name":"Warpish","color":"red","summary":"Lisää warpin alukset tulokseensa","who":"Main","mandatory":"mandatory","when":"Reveal","text":"**Sinulla on kyky manata henkiä.** Kun paljastat hyökkäyskortin, **_käytä_** tätä kykyä ja lisää tulokseesi 1  jokaista alusta kohden (sinun tai muiden), jotka ovat warpissa."},
{"name":"Warrior","color":"green","summary":"Kerää kokemuspisteitä","who":"Main","mandatory":"mandatory","when":"Reveal","text":"**Sinulla on kyky kehittyä.** Yhteenoton jälkeen, mikäli olit pääpelaaja, lisää yksi merkki tämän alustan päälle, jos voitit (tai teit sopimuksen) tai kaksi merkkiä jos hävisit (tai epäonnistuit sopimuksen tekemisessä). Kummassakin tapauksessa lisää yksi ylimääräinen merkki, jos pelaatte neljällä planeetalla / pelaajalla.<br><br>Pääpelaajana, kun paljastat hyökkäyskortin, **_käytä_** tätä kykyä ja lisää tulokseesi 1 jokaista tämän alustan merkkiä kohden. Merkkejä ei poisteta tältä alustalta sen jälkeen."},
{"name":"Will","color":"green","summary":"Ei kohtalon hallittavissa","who":"Offence","mandatory":"mandatory","when":"Destiny","text":"**Sinulla on kyky valita.** Hyökkääjänä, kun Destiny-kortti on nostettu, **_käytä_** tätä kykyä ja ilmoita, kuka muista pelaajista on puolustaja (riippumatta Destiny-kortista). Voit sen jälkeen hyökätä minkä tahansa tuon pelaajan siirtokunnan tai kotiplaneetan kimppuun sen sijaan, että tottelisit nostettua Destiny-korttia (esimerkiksi voit hyökätä Viruksen siirtokuntaa vastaan Mindin planeetalla, vaikka Destiny-kortti olisi ohjannut sinut Oraclea vastaan). Kaikki muut Destiny-kortin vaikutukset tapahtuvat edelleen tavalliseen tapaan."},
{"name":"Zombie","color":"green","summary":"Ei ikinä mene warppiin","who":"Any","mandatory":"mandatory","when":"Any","text":"**Sinulla on kuolemattomuuden kyky.** Aina kun menetät aluksia warpiin, **_käytä_** tätä kykyä palauttamaan alukset siirtokuntiisi ja jatka niiden käyttämistä. Lisäksi voit vapauttaa minkä tahansa pelaajan aluksia warpista (takaisin tämän omiiin siirtokuntiin) osana sopimusta.<br><br>**Sääntöehdotus:** Zombie ottaa hyvityksen normaalisti, vaikka se ei aluksia menetäkään."}];




// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  const wildFlares = _.filter(_.propEq('power', 'Wild'), cosmicFlaresData);
  return wildFlares.filter(flare => regex.test(flare.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class CosmicDataContainer extends Component {

  getAlienSheet = () => {
    let alienDataResult = _.filter(_.propEq("name", this.props.alienName), cosmicAliensData);
    if (alienDataResult.length === 0) return (<div></div>);

    return (
      <AlienSheet
        alienData={alienDataResult[0]}
      />
    );
  }

  render() {

    if (this.props.alienName == null) return (<div></div>);

    let isWild = _.whereEq({ "name": this.props.alienName, "power": "Wild" });
    let isSuper = _.whereEq({ "name": this.props.alienName, "power": "Super" });

    let wildFlareCard = _.filter(isWild, cosmicFlaresData)[0];
    let superFlareCard = _.filter(isSuper, cosmicFlaresData)[0];
   
    return (
      <div>
        <FlareCard
          wildFlare={wildFlareCard}
          superFlare={superFlareCard}
        />
        {this.getAlienSheet()}
      </div>
    );
  }
}


class App extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      cardShown: null
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestionValue }) => {
    this.setState({
      flareCardShown: suggestionValue
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Kosminen haku",
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          focusInputOnSuggestionClick={!isMobile}
        />


        <CosmicDataContainer alienName={this.state.flareCardShown} />

      </div>

    );
  }
}

export default App;
