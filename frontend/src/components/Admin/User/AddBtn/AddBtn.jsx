import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdAddCircleOutline } from 'react-icons/md'
import s from "./style.module.css"
import AddForm from '../AddForm/AddForm'
import AddFormComplete from '../AddFormComplete/AddFormComplete'
function AddBtn({list, setList, complete}) {
    const [showForm, setShowForm] = useState(false)
    function onClickHandler() {
        setShowForm(true)
    }

    function onCloseHandler() {
        setShowForm(false)
    }
  return (
    <div>
        {showForm?
        (
            <div className={s.formContainer}>
            <div className='right'>
                <button
                    type='button'
                    className='btn'
                    onClick={onCloseHandler}
                >
                    Fermer <AiOutlineClose/>
                </button>
            </div>
            {complete?
                (<AddFormComplete 
                    list={list} 
                    setList={setList}
                    setShowForm={setShowForm}
                />
                )
                :
                (<AddForm 
                    list={list} 
                    setList={setList}
                    setShowForm={setShowForm}
                />)
            }
            </div>
        )
        : 
        (<div className='right'>
            <button
                type='button'
                className='btn'
                onClick={onClickHandler}
            >
                Ajouter {complete ? "un abonnement payant" : "un abonnement gratuit"} <MdAddCircleOutline />
            </button>
        </div>)
        }
    </div>
  )
}


export default AddBtn