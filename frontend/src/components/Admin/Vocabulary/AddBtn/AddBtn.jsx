import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { MdAddCircleOutline } from 'react-icons/md'
import s from "./style.module.css"
import AddForm from '../AddForm/AddForm'
function AddBtn({list, setList}) {
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
            <AddForm 
                list={list} 
                setList={setList}
                setShowForm={setShowForm}
            />
            </div>
        )
        : 
        (<div className='right'>
            <button
                type='button'
                className='btn'
                onClick={onClickHandler}
            >
                Ajouter <MdAddCircleOutline />
            </button>
        </div>)
        }
    </div>
  )
}


export default AddBtn