'use client'

// const CryptoJS = require("crypto-js");
import React from 'react';
import '../PageHome.css'
import {observer} from "mobx-react-lite";
import cryptoFormState from "../../lib/store/crypto-form-state";
import {PickAFile} from "../../pickAFile";
import {ConvertWordArrayToUint8Array} from "../../../convertWordArrayToUint8Array";
import {Download} from "../../download";

const Decription = observer(() => {

    const onClickerText = () => {

        if (!cryptoFormState.keyTextDecr && !cryptoFormState.textDecr) return alert('Введите ключ и текст для дешифрования')
        else if(!cryptoFormState.keyTextDecr) return alert('Введите ключ для дешифрования')
        else if(!cryptoFormState.textDecr) return alert('Введите текст для дешифрования');

        cryptoFormState.setValueDecr(CryptoJS.RC4Drop.decrypt(cryptoFormState.textDecr, cryptoFormState.keyTextDecr).toString(CryptoJS.enc.Utf8))
    }

    const onClickerFile = () => {

        if (!cryptoFormState.keyFileDecr) return alert('Введите ключ');
        const pass = CryptoJS.SHA3(cryptoFormState.keyFileDecr);

        PickAFile(false).then((file) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const decrypted = CryptoJS.RC4Drop.decrypt(e.target.result as string, pass);
                    const typedArray: any = ConvertWordArrayToUint8Array(decrypted);
                    Download(typedArray, `decrypted-${file.name}`, file.type);
                } catch (error) {
                    console.log('Неправильный ключ');
                }
            };

            reader.readAsText(file);
        });
    }

    return (
        <div className='decr'>
            <div className='text'>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Дешифрование текста</span>
                    </div>
                    <input type="text" placeholder="Введите ключ" className="input input-bordered w-full max-w-xs"
                           value={cryptoFormState.keyTextDecr}
                           onChange={(e) => cryptoFormState.setKeyTextDecr(e.target.value)}/>

                    <input type="text" placeholder="Введите текст" className="input input-bordered w-full max-w-xs"
                           value={cryptoFormState.textDecr}
                           onChange={(e) => cryptoFormState.setTextDecr(e.target.value)}/>

                    <textarea className="textarea textarea-bordered " defaultValue={cryptoFormState.valueDecr} placeholder="Результат"/>
                </label>
                <button className="btn btn-primary"
                        onClick={()=>onClickerText()}>Дешифровать текст</button>
            </div>
            <div className='file'>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Дешифрование файла</span>
                    </div>
                    <input type="text" placeholder="Введите ключ" className="input input-bordered w-full max-w-xs"
                           value={cryptoFormState.keyFileDecr}
                           onChange={(e) => cryptoFormState.setKeyFileDecr(e.target.value)}/>
                </label>

                <button className="btn btn-primary"
                        onClick={()=>onClickerFile()}>Дешифровать файл</button>
            </div>
        </div>
    );
})

export default Decription;