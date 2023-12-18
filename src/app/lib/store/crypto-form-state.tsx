import {makeAutoObservable} from "mobx";


export interface ICryptoFormState {
    textEncr: string
    keyTextEncr: string
    textDecr: string
    keyTextDecr: string
    valueEncr: string
    valueDecr: string
    keyFileEncr: string
    keyFileDecr: string
}

export class CryptoFormState implements ICryptoFormState {
    textEncr = ''
    keyTextEncr = ''
    textDecr = ''
    keyTextDecr = ''
    valueEncr = ''
    valueDecr = ''
    keyFileEncr = ''
    keyFileDecr = ''

    constructor() {
        makeAutoObservable(this)
    }

    setTextEncr(val: string) {
        this.textEncr = val
    }

    setKeyTextEncr(val: string) {
        this.keyTextEncr = val
    }

    setTextDecr(val: string) {
        this.textDecr = val
    }

    setKeyTextDecr(val: string) {
        this.keyTextDecr = val
    }

    setValueEncr(val: string) {
        this.valueEncr = val
    }

    setValueDecr(val: string) {
        this.valueDecr = val
    }

    setKeyFileEncr(val: string) {
        this.keyFileEncr = val
    }

    setKeyFileDecr(val: string) {
        this.keyFileDecr = val
    }
}

export default new CryptoFormState()