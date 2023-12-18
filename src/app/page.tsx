import Link from "next/link";
import React from "react";
import './globals.css'

export default function Home() {
  return (
      <>
          <div className="card w-120 bg-primary text-primary-content" >
              <div className="card-body">
                  <h2 className="card-title">Выберите что хотите сделать с текстом или файлом!</h2>
                  <p>Для шифрования и дешифрования используется алгоритм RC4Drop</p>
                  <div className="card-actions justify-end">
                      <Link href={'/PageHome/Encription'}  className="btn btn-block">Шифрование</Link>
                      <Link href={'/PageHome/Decription'} className="btn btn-block">Дешифрование</Link>
                  </div>
              </div>
         </div>
      </>
  )
}
