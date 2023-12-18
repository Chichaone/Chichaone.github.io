'use client'
import "../PageHome.css"
import CryptoJS from 'crypto-js';
import React from 'react';
import cryptoFormState from "../../lib/store/crypto-form-state";
import {observer} from "mobx-react-lite";
import {PickAFile} from "../../pickAFile";
import {Download} from "../../download";

const Encription = observer(() => {

        const onClickerText = () => {

            if (!cryptoFormState.keyTextEncr && !cryptoFormState.textEncr) return alert('Введите ключ и текст для шифрования')
                else if(!cryptoFormState.keyTextEncr) return alert('Введите ключ для шифрования')
                    else if(!cryptoFormState.textEncr) return alert('Введите текст для шифрования');

            cryptoFormState.setValueEncr(CryptoJS.RC4Drop.encrypt(cryptoFormState.textEncr, cryptoFormState.keyTextEncr).toString())
        }

        const onClickerFile = () => {

            if (!cryptoFormState.keyFileEncr) return alert('Введите ключ');
            const pass = CryptoJS.SHA3(cryptoFormState.keyFileEncr);

            PickAFile(false).then((file) => {
                const reader = new FileReader();

                reader.onload = (e: any) => {
                    const wordArray = CryptoJS.lib.WordArray.create(e.target.result);
                    const encrypted = CryptoJS.RC4Drop.encrypt(wordArray, pass).toString();
                    Download(encrypted, `encrypted-${file.name}`, file.type);
                };

                reader.readAsArrayBuffer(file);
            });
        }


    return (
        <div className="encr">

            <div className="text">

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Шифрование текста</span>
                    </div>

                    <input type="text" placeholder="Введите ключ" className="input input-bordered  w-full max-w-xs"
                           value={cryptoFormState.keyTextEncr}
                           onChange={(e) => cryptoFormState.setKeyTextEncr(e.target.value)}/>

                    <input type="text" placeholder="Введите текст" className="input input-bordered  w-full max-w-xs"
                           value={cryptoFormState.textEncr}
                           onChange={(e) => cryptoFormState.setTextEncr(e.target.value)}/>

                    <textarea className="textarea textarea-bordered" defaultValue={cryptoFormState.valueEncr} placeholder="Результат"/>
                </label>

                <button className="btn btn-secondary"
                        onClick={()=>onClickerText()}>Зашифровать текст</button>
            </div>

            <div className="file">

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Шифрование файла</span>
                    </div>

                    <input type="text" placeholder="Введите ключ" className="input input-bordered  w-full max-w-xs"
                           value={cryptoFormState.keyFileEncr}
                           onChange={(e) => cryptoFormState.setKeyFileEncr(e.target.value)}/>
                </label>

                <button className="btn btn-secondary"
                        onClick={()=>onClickerFile()}>Зашифровать файл</button>
            </div>
        </div>
    );
}
)

export default Encription;