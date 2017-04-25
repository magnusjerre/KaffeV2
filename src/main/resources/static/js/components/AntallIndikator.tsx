import * as React from "react"
let bean = require("../../images/coffee_bean.png")

declare function require(name: string) : any

export interface IKarakterComponent {
    value: number
}

const AntallIndikator : React.StatelessComponent<IKarakterComponent> = ({value}) => {
    let classesArray : string[] = []
    for (let i = 0; i < value; i++) {
        classesArray.push("antallBean")
    }
    return (
        <div className="antallHolder">
            {
                classesArray.map((classes: string) => (
                    <img src={bean} alt="Bean" className={classes} />
                ))
            }
        </div>
    )
}

export default AntallIndikator