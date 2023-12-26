import React from 'react'
import s from "./style.module.css"

function SubscriptionChoice() {
  return (
    <div>
        <h3 className='h3'>Sélectionnez un abonnement</h3>
        <div className={s.boxesContainer}>
            <div className={s.box}>
                <h4>Lite</h4>
                <div>
                    <div className={s.months}>
                        * mois
                    </div>
                    <div className={s.price}>
                        **,**€
                    </div>
                </div>
                <p>
                    équivalent à **,** €/mois
                </p>
            </div>
            <div className={s.box}>
                <h4>Intensive</h4>
                <div>
                    <div className={s.months}>
                        * mois
                    </div>
                    <div className={s.price}>
                        **,**€
                    </div>
                </div>
                <p>
                    équivalent à **,** €/mois
                </p>
            </div>
            <div className={s.box}>
                <h4>Premium</h4>
                <div>
                    <div className={s.months}>
                        * mois
                    </div>
                    <div className={s.price}>
                        **,**€
                    </div>
                </div>
                <p>
                    équivalent à **,** €/mois
                </p>
            </div>
        </div>
        <div className={s.btnContainer}>
            <button className='btn'>Valider</button>
        </div>
    </div>
  )
}

export default SubscriptionChoice