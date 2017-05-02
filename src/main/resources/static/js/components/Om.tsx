import * as React from "react"

const Om : React.StatelessComponent<any> = () => (
    <div className="verticalContainer content om">
        <h1>Om denne siden</h1>
        <p>jerre.no (aka. Den Store Kaffesiden) er et hobbyprosjekt ment for å teste ut og lære litt forskjellige teknologier. Siden brukes til å registrere hvilken kaffe vi brygger og for å vurdere kvaliteten på dagens brygg. I tillegg til å vurdere brygget skal man også prøve å gjette hvilken kaffe det er man får servert.</p>
        <h2>Tastatursnarveier</h2>
        <p>For å gjøre det enklere å navigere på nettsiden ved hjelp av tastaturet, er det lagt inn støtte for snarveier på enkelte funksjoner. Det er også mulig å bruke "tab" og "shift + tab" for navigere frem og tilbake mellom inputelementer.</p>
        <h3>Navigering blant hovedelementene</h3>
        <p>For Chrome og Edge funker følgende snarveier. For Firefox må man bruke "Ctrl + Alt" eller "AltGr".</p>
            <ul>
                <li>
                    Registrering : Alt + R
                </li>
                <li>
                    Historikk : Alt + H
                </li>
                <li>
                    Kaffe registrering : Alt + K
                </li>
                <li>
                    Kaffeliste : Alt + L
                </li>
                <li>
                    Statistikk : Alt + S
                </li>
                <li>
                    Om: Alt + O
                </li>
            </ul>
        <h3>Lukking av historisk brygg</h3>
        <p>Om man er inne på historikk-fanen og har valgt et brygg, kan dette enkelt lukkes ved å trykke på "Escape"</p>
        <h2>Teknologier</h2>
        <p>Følgende teknologier er brukt for å utvikle nåværende versjon av jerre.no</p>
        <ul>
            <li>Kotlin</li>
            <li>SpringBoot</li>
            <li>Gradle</li>
            <li>Sass</li>
            <li>React</li>
            <li>Redux</li>
            <li>Typescript</li>
            <li>Node</li>
            <li>Webpack</li>
        </ul>
    </div>
)

export default Om