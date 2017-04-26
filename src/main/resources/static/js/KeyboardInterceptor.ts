let obj : any = {}
let body = document.getElementsByTagName("body")[0]

export function addKeyUpListener(keyCode: number, action: VoidFunction) {
    removeKeyUpListener(keyCode)
    let func = function(ev: any){
        if (ev.keyCode === keyCode && ev.altKey) {
            ev.preventDefault()
            ev.stopPropagation()
            action()
        }
    }
    obj[keyCode] = func
    body.addEventListener("keyup", func)
}

export function removeKeyUpListener(keyCode: number) {
    let action = obj[keyCode]
    if (action) {
        body.removeEventListener("keyup", action)
        obj[keyCode] = null
    }
}
